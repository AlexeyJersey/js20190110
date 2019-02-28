export default class Portfolio {
    constructor({element, balance}) {
        this._el = element;

        this._balance = balance;
        this._portfolioWorth = 0;

        this._render();

        this._portfolioHistoryTable = this._el.querySelector('#portfolioHistory');
    }

    addItem(itemData) {
        let tbody = this._portfolioHistoryTable.tBodies[0];

        this._balance = this._balance - itemData.amount;
        this._portfolioWorth = this._portfolioWorth + itemData.amount;

        let tr = document.createElement('tr');
        tr.innerHTML = `
        <tr>
            <td>${itemData.name}</td>
            <td>${itemData.price}</td>
            <td>${itemData.amount}</td>
        </tr>
        `

        tbody.append(tr);

        tbody.rows.length ? this._portfolioHistoryTable.classList.remove('hidden') : ''
        this._updatePortfolioInfo(this._balance, this._portfolioWorth);
    }

    _updatePortfolioInfo(balanceValue, worthValue) {
        this._portfolioInfo = this._el.querySelector('#portfolioInfo');

        this._portfolioInfo.innerHTML = `
            Current balance: ${balanceValue}
            <br />
            Portfolio Worth: ${worthValue}
        `
    }

    _render() {
        this._el.innerHTML = `
      <div class="card-panel hoverable center-align">
          <p id="portfolioInfo">
              Current balance: ${this._balance}
              <br />
              Portfolio Worth: ${this._portfolioWorth}
          </p>
          <table id="portfolioHistory" class="highlight hidden">
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Amount</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
      </div>
    `
    }
}