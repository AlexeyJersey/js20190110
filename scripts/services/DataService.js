import HttpService from './HttpService.js';

const COINS_URL = 'https://api.coinpaprika.com/v1/coins';
const getSingleCoinUrl = (id) => `https://api.coinpaprika.com/v1/coins/${id}/ohlcv/latest/`;

const DataService = {
    async getCurrencies() {

        try {

            let data = await HttpService.sendRequest(COINS_URL);
            console.log(data)
            data = data.slice(0, 10);
            const coinsUrls = data.map(coin => getSingleCoinUrl(coin.id));

            const coinsPrices = await HttpService.sendMultipleRequests(coinsUrls);
            const dataWithPrice = data.map((item, index) => {
                item.price = coinsPrices[index][0].close;
                return item;
            });

            return dataWithPrice;
        } catch (err) {
            console.log(err);
        }

        // return HttpService.sendRequest(COINS_URL)
        //   .then(data => {
        //     data = data.slice(0, 10);
        //     const coinsUrls = data.map(coin => getSingleCoinUrl(coin.id))
        //
        //     return HttpService.sendMultipleRequests(coinsUrls)
        //       .then(coins => {
        //         const dataWithPrice = data.map((item, index) => {
        //           item.price = coins[index][0].close;
        //           return item;
        //         });
        //
        //         return dataWithPrice;
        //       })
        //
        //   })
    }
}

class MyPromise {
    constructor(behaviourFunction) {
        this._result = null;
        this._status = 'pending';
        this._successCallbacks = [];
        this._errorCallbacks = [];

        behaviourFunction(this._resolve.bind(this), this._reject.bind(this));
    }

    _resolve(data) {
        this._status = 'fulfilled';
        this._result = data;
        this._successCallbacks.forEach(callback => callback(data));
    }

    _reject(error) {
        this._status = 'rejected';
        this._result = error;
        this._errorCallbacks.forEach(callback => callback(error));
    }

    then(successCallback, errorCallback) {
        if (this._status === 'fulfilled') {
            successCallback(this._result);
        } else if (this._status === 'rejected') {
            errorCallback(this._result);
        } else {
            this._successCallbacks.push(successCallback);
            this._errorCallbacks.push(errorCallback);
        }
    }

    catch(errorCallback) {
        if (this._status === 'rejected') {
            errorCallback(this._result);
        } else {
            this._errorCallbacks.push(errorCallback);
        }
    }
};

export default DataService;