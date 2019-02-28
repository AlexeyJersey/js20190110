export default class TradeWidget {
    constructor({element, balance, onConfirm}) {
        this._el = element;
        this._balance = balance;
        this._onConfirmCallback = onConfirm;

        this._el.addEventListener('input', e => {
            if (!e.target.closest('#amount')) return;

            let value = e.target.value;

            if (!isNaN(+value)) {
                this._total = this._currentItem.price * Number(value);

                // if (this._balance >= this._total) {
                    this._updateDisplay(this._total);
                    // console.log('norm')
                // } else {
                //     console.log('NEnorm')
                // }
            } else {
                this._validateErrorShow();
            }
        });

        this._el.addEventListener('click', e => this._onConfirm(e));

        this._el.addEventListener('click', e => {
            if (!e.target.closest('.modal-close')) return;

            if (e.target.getAttribute('id') !== 'tradeWidgetBuy') {
                this.close();
            }
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
            this._validateErrorShow();
        } else {
            this._onConfirmCallback(boughtCurrencyItem);
            this.close();
        }
    }

    _validateErrorShow() {
        this._elInput = this._el.querySelector('.input-field');

        if (this._elInput.querySelector('.validation-error') === null) {
            let errorMessage = document.createElement('span');
            errorMessage.classList.add('helper-text', 'red-text', 'text-darken-2', 'validation-error');
            errorMessage.innerText = 'Amount field can not be empty, less or equal "0", must be number';
            this._elInput.append(errorMessage)
        }
    }

    _validateErrorHide() {
        this._elInput = this._el.querySelector('.input-field');

        if (this._elInput.querySelector('.validation-error')) {
            let errorMessage = this._elInput.querySelector('.validation-error');
            errorMessage.parentNode.removeChild(errorMessage);
        }
    }

    close() {
        let modal = this._el.querySelector('.modal');

        modal.classList.remove('open');
    }

    trade(item) {
        this._currentItem = item;
        this._total = 0;

        this._render(item);
    }

    _updateDisplay(value) {
        //not working after first call - commented
        // this._totalEl = this._totalEl || this._el.querySelector('#item-total');
        this._totalEl = this._el.querySelector('#item-total');
        this._totalEl.textContent = value;

        this._validateErrorHide();
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