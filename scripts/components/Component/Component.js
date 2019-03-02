export default class Component {
    constructor({element}) {
        this._el = element;
    }

    on(eventType, callback) {
        this._el.addEventListener(eventType, callback);
    }

    errorMessage(inputClass, text) {
        this._elInput = this._el.querySelector(inputClass);

        let errorMessage = document.createElement('span');

        if (this._elInput.querySelector('.validation-error') === null) {
            errorMessage.classList.add('helper-text', 'red-text', 'text-darken-2', 'validation-error');
            errorMessage.innerText = text;
            this._elInput.append(errorMessage)
        }
    }

    removeErrorMessage(inputClass) {
        this._elInput = this._el.querySelector(inputClass);

        if (this._elInput.querySelector('.validation-error')) {
            let errorMessage = this._elInput.querySelector('.validation-error');
            errorMessage.remove();
        }

    }

}