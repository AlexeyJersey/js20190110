import Component from '../Component/Component.js';

export default class Filter extends Component {
    constructor({element}) {
        super({ element });
        this._el = element;

        this._render();

        this._el.addEventListener('input', super.debounce(e => {
            let value = e.target.value;
            let filterEvent = new CustomEvent('filter', {detail: value.toLowerCase()});
            this._el.dispatchEvent(filterEvent);
        }, 300))
    }

    _render() {
        this._el.innerHTML = `
           <div class="input-field col s4">
                <input id="first_name" type="text">
                <label for="first_name">Filter</label>
            </div>
        `
    }
}