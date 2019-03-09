export default class Component {
    constructor({element}) {
        this._el = element;
    }

    on(eventType, callback) {
        this._el.addEventListener(eventType, callback);
    }

    debounce(f, delay) {
        let timerId;
        return function wrapper(...args) {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                f.apply(this, args);
            }, delay);
        }
    }

}