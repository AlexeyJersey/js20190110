import Component from '../Component/Component.js';

export default class Table extends Component {
    constructor({element, data}) {
        super({element});

        this.displayData(data);

        this._el.addEventListener('click', e => {
                this._onRowClick(e);
        });

        this._el.addEventListener('input', e => {
            if (e.target.getAttribute('id') !== 'searchInput') return;
        });
    }

    displayData(data) {
        this._render(data);
    }

    _onRowClick(e) {
        const target = e.target.closest('tr');
        if (!target) return;

        const id = target.dataset.id;
        if (id) {
            let customEvent = new CustomEvent('rowClick', {
                detail: id,
            });
            this._el.dispatchEvent(customEvent)
        }
    }

    _render(data) {
        this._el.innerHTML = `
    <table class="data-table highlight"> 
        <thead>
        <tr>
            <th data-type="string">Name</th>
            <th data-type="string">Symbol</th>
            <th data-type="number">Rank</th>
            <th data-type="number">Price</th>
        </tr>
        </thead>

        <tbody>
            ${data.map(coin => `
              <tr data-id="${coin.id}">
                  <td>${coin.name}</td>
                  <td>${coin.symbol}</td>
                  <td>${coin.rank}</td>
                  <td>${coin.price.toFixed(2)}</td>
              </tr>
            `).join('')}
        </tbody>
    </table>

    `
    }
}