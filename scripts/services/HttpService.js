export default {
  sendRequest(url) {
    return new Promise((resolve, reject) => {
      // 1. Создаём новый объект XMLHttpRequest
      var xhr = new XMLHttpRequest();

      // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
      xhr.open('GET', url);

      // 3. Отсылаем запрос
      xhr.send();

      xhr.onload = () => {
        
        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 200) {
          // обработать ошибку
          reject(new Error(xhr.status + ': ' + xhr.statusText))
          // console.error( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
        } else {
          // вывести результат
          let responseData = JSON.parse(xhr.responseText); // responseText -- текст ответа.
          resolve(responseData);
        }
      }
    })
  },

  sendMultipleRequests(urls) {
    let requests = urls.map(url => this.sendRequest(url))
    return Promise.all(requests);


    // let pendingRequestCount = urls.length;
    // let results = [];

    // urls.forEach(url => {
    //   this.sendRequest(url, data => {
    //     results.push({ url, data });
    //     pendingRequestCount--;

    //     if (!pendingRequestCount) {
    //       callback(results);
    //     }
    //   })
    // })
  },
}