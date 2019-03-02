export default class Portfolio {
  constructor({ element, balance }) {
    this._el = element;
    this._balance = balance;
    this._items = {};

    this._portfolioWorth = 0;


    this._render();
  }

  addItem(item, amount) {
    const currentItem = this._items[item.id] || {
      name: item.name,
      id: item.id,
      amount: 0,
      total: 0,
    };
    currentItem.price = item.price;
    currentItem.amount = currentItem.amount + amount;
    currentItem.total = currentItem.price * currentItem.amount;

    this._items[item.id] = currentItem;
    const purchasePrice = item.price * amount;
    this._balance = this._balance - purchasePrice;

    this._portfolioWorth = Object.values(this._items).reduce((total, item) => {
      return total + item.total;
    }, 0);

    this._render();
  }

  updatedBalance() {
    return this._balance
  }

  _render(data) {
    const items = Object.values(this._items);

    this._el.innerHTML = `
      <div class="card-panel hoverable center-align">
          <p>
              Current balance: ${this._balance.toFixed(2)}
              <br />
              Portfolio Worth: ${this._portfolioWorth.toFixed(2)}
          </p>
          ${
            items.length === 0
              ? ''
              : `
              <table class="highlight striped"> 
                <thead>
                  <tr>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Price</th>
                      <th>Total</th>
                  </tr>
                </thead>
        
                <tbody>
                    ${items.map(item => `
                      <tr data-id="${item.id}">
                          <td>${item.name}</td>
                          <td>${item.amount}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>${item.total.toFixed(2)}</td>
                      </tr>
                    `).join('')
                  }
                  </tbody>
                </table>`
          }
      </div>
    `
  }
}