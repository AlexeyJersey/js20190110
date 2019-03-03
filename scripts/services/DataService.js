const data = [
  {
    "id": "btc-bitcoin",
    "name": "Bitcoin",
    "symbol": "BTC",
    "rank": 1,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 1000
  },
  {
    "id": "eth-ethereum",
    "name": "Ethereum",
    "symbol": "ETH",
    "rank": 2,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 900
  },
  {
    "id": "xrp-xrp",
    "name": "XRP",
    "symbol": "XRP",
    "rank": 3,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 800
  },
  {
    "id": "eos-eos",
    "name": "EOS",
    "symbol": "EOS",
    "rank": 4,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 700
  },
  {
    "id": "ltc-litecoin",
    "name": "Litecoin",
    "symbol": "LTC",
    "rank": 5,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 600
  },
  {
    "id": "bch-bitcoin-cash",
    "name": "Bitcoin Cash",
    "symbol": "BCH",
    "rank": 6,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 500
  },
  {
    "id": "ada-cardano",
    "name": "Cardano",
    "symbol": "ADA",
    "rank": 11,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 400
  },
  {
    "id": "miota-iota",
    "name": "IOTA",
    "symbol": "MIOTA",
    "rank": 14,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 300
  },
  {
    "id": "neo-neo",
    "name": "NEO",
    "symbol": "NEO",
    "rank": 17,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 200
  },
  {
    "id": "xem-nem",
    "name": "NEM",
    "symbol": "XEM",
    "rank": 19,
    "is_new": false,
    "is_active": true,
    "type": "coin",
    "price": 100
  }
];


const COINS_URL = 'https://api.coinpaprika.com/v1/coins';
const getSingleCoinUrl = (id) => `https://api.coinpaprika.com/v1/coins/${id}/ohlcv/latest/`;

const DataService = {
  _sendRequest(url, successCallback, method = 'GET') {
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
    xhr.open(method, url);

    // 3. Отсылаем запрос
    xhr.send();

    xhr.onload = () => {
      // 4. Если код ответа сервера не 200, то это ошибка
      if (xhr.status != 200) {
        // обработать ошибку
        console.error( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
      } else {
        // вывести результат
        let responseData = JSON.parse(xhr.responseText); // responseText -- текст ответа.
        successCallback(responseData);
      }
    }
  },

  _sendMultipleRequests(urls, callback) {
    let pendingRequestCount = urls.length;
    let results = [];

    urls.forEach(url => {
      DataService._sendRequest(url, data => {
        results.push({ url, data });
        pendingRequestCount--;

        if (!pendingRequestCount) {
          callback(results);
        }
      })
    })
  },

  getCurrencies(callback) {
    // return data;

    DataService._sendRequest(COINS_URL, data => {
      const firstTenData = data.slice(0, 20);
      // callback(firstTenData);
      DataService.getCurrenciesPrices(firstTenData, callback)
    })
  },

  getCurrenciesPrices(data, callback) {
    const coinsIds = data.map(coin => coin.id);
    const coinsIdMap = coinsIds.reduce((acc, id) => {
      acc[getSingleCoinUrl(id)] = id;
      return acc;
    }, {})

    DataService._sendMultipleRequests(Object.keys(coinsIdMap), coins => {
      const dataWithPrice = data.map(item => {
        let itemUrl = getSingleCoinUrl(item.id);
        let itemPriceData = coins.find(coin => coin.url === itemUrl).data[0];

        item.price = itemPriceData.close;
        return item;
      });

      callback(dataWithPrice);
    })

  }
}

export default DataService;