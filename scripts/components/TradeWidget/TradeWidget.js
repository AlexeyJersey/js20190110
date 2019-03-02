import Component from '../Component/Component.js';

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default class TradeWidget extends Component {
  constructor({ element }) {
    super({ element });

    this._el.addEventListener('click', e => {
      if (e.target.closest('#btn-cancel')) {
        this.close();
      }

      if (e.target.closest('#btn-buy')) {
        let buyEvent = new CustomEvent('buy', {
          detail: {
            item: this._currentItem,
            amount: +this._el.querySelector('#amount').value,
          }
        });
        this._el.dispatchEvent(buyEvent);
        this.close();
      }
    })

    this._el.addEventListener('keydown', e => {
      if (!e.target.closest('#amount')) return;

      const { key } = e;
      
      if (!isNumeric(key) && key !== 'Backspace') {
        e.preventDefault();
      }

    })

    this._el.addEventListener('input', e => {
      if (!e.target.closest('#amount')) return;

      const value = e.target.value;
      this._total = this._currentItem.price * Number(value);

      this._updateDisplay(this._total)
    })
  }

  close() {
    this._el.querySelector('.modal').classList.remove('open');
  }

  trade(item) {
    this._currentItem = item;
    this._total = 0;

    this._render(item);
  }

  _updateDisplay(value) {
    this._totalEl = this._el.querySelector('#item-total');
    this._totalEl.textContent = value;
  }

  _render(item) {
    this._el.innerHTML = `
      <div id="modal" class="modal open">
        <div class="modal-content">
          <h4>Buying ${item.name}:</h4>
          <p>
            Current price: ${item.price}. Total: <span id="item-total">${this._total}</span>
          </p>

          <div class="row">
            <form class="col s12">
                <div class="input-field col s4">
                    <input id="amount" type="text">
                    <label for="amount">Amount</label>
                </div>
            </form>
            </div>
        </div>
        
        <div class="modal-footer">
          <a href="#!" id="btn-buy" class="modal-close waves-effect waves-teal btn-flat">Buy</a>
          <a href="#!" id="btn-cancel" class="modal-close waves-effect waves-teal btn-flat">Cancel</a>
        </div>
    </div>

    `
  }
}