import Component from '../Component/Component.js';

export default class Table extends Component {
    constructor({element, data}) {
        super({element});

        this.displayData(data);

        this._el.addEventListener('click', e => {
                this._onRowClick(e);
                this._sort(e);
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

    _sort(e) {
        let target = e.target;
        if (target.nodeName !== 'TH') return;

        let columnDataType = target.dataset.type;
        let tbody = this._el.querySelector('tbody');
        let thead = this._el.querySelector('thead');
        let theadRow = thead.rows[0];
        let tbodyRows = tbody.rows;
        let cellsToSortArr = [];
        let sort;

        for (let th of theadRow.cells) {
            th.classList.remove('active');
        }

        target.classList.add('active');

        for (let tr of tbodyRows) {
            cellsToSortArr.push(tr.cells[target.cellIndex].innerHTML)
        }

        if (columnDataType === 'string') {
            cellsToSortArr.sort(function (a, b) {
                return ('' + a).localeCompare(b);
            });
        } else if (columnDataType === 'number') {
            cellsToSortArr.sort(function (a, b) {
                return a - b;
            });
        }

        if (target.classList.contains('sorted')) {
            sort = function (row) {
                tbody.prepend(row);
            };
            target.classList.toggle('sorted');
        } else {
            sort = function (row) {
                tbody.append(row);
            };
            target.classList.toggle('sorted');
        }

        for (let i = 0; i < cellsToSortArr.length; i++) {
            for (let tr of tbodyRows) {
                if (tr.cells[target.cellIndex].innerHTML === cellsToSortArr[i]) {
                    sort(tr);
                }
            }
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