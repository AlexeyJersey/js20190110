export default class TradeWidget {
    constructor({element, onConfirm}) {
        this._el = element;
        this._onConfirmCallback = onConfirm;

        this._el.addEventListener('input', e => {
            if (!e.target.closest('#amount')) return;

            const value = e.target.value;
            this._total = this._currentItem.price * Number(value);

            this._updateDisplay(this._total);
        });

        this._el.addEventListener('click', e => this._onConfirm(e));

        this._el.addEventListener('click', e => {
            if (!e.target.closest('.modal-close')) return;
            this.close();
        });
    }

    _onConfirm(e) {
        const target = e.target.closest('#tradeWidgetBuy');
        if (!target) return;

        let boughtCurrencyItem = {};
        boughtCurrencyItem.name = this._currentItem.name;
        boughtCurrencyItem.price = this._currentItem.price;
        boughtCurrencyItem.amount = this._total;

        if (isNaN(this._total) || this._total <= 0) {
            let input = this._el.querySelector('.input-field');
            this._validateErrorShow(input);
        } else {
            this._onConfirmCallback(boughtCurrencyItem);
        }
    }

    _validateErrorShow(input) {
        let errorMessage = document.createElement('span');
        errorMessage.classList.add('helper-text', 'red-text', 'text-darken-2', 'validation-error');
        errorMessage.innerText = 'Amount field can not be empty, less or equal "0"';
        input.append(errorMessage)
    }

    _validateErrorHide(input) {
        if (input.querySelector('.validation-error')) {
            let errorMessage = input.querySelector('.validation-error');
            errorMessage.parentNode.removeChild(errorMessage);
        }
    }

    close() {
        let modal = this._el.querySelector('.modal');

        if (!modal.querySelector('.validation-error')) {
            modal.classList.remove('open');
        }
    }

    trade(item) {
        this._currentItem = item;
        this._total = 0;

        this._render(item);
    }

    _updateDisplay(value) {
        this._totalEl = this._totalEl || this._el.querySelector('#item-total');
        this._totalEl.textContent = value;

        let input = this._el.querySelector('.input-field');
        this._validateErrorHide(input);
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
              <a href="#!" id="tradeWidgetBuy" class="modal-close waves-effect waves-teal btn-flat">Buy</a>
              <a href="#!" class="modal-close waves-effect waves-teal btn-flat">Cancel</a>
            </div>
        </div>

    `
    }
}