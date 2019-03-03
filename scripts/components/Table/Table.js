import Component from '../Component/Component.js';

export default class Table extends Component {
    constructor({element, data}) {
        super({element});

        this._render(data);

        this._el.addEventListener('click', e => {
                this._onRowClick(e);
                this._sort(e);
                this.__clearSearchInput(e);
        });

        this._el.addEventListener('input', e => {
            if (e.target.getAttribute('id') !== 'searchInput') return;
            this._search(e);
        });
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

    _search() {
        let input = document.querySelector('#searchInput');
        let filter = input.value.toUpperCase();
        let table = document.querySelector('.data-table');
        let tbody = table.tBodies[0];
        let tr = tbody.rows;

        for (let i = 0; i < tr.length; i++) {
            let cell = tr[i].cells[0];
            let name = cell.textContent || cell.innerText;
            if (name.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

    __clearSearchInput(e) {
        let target = e.target;
        if (target.getAttribute('id') !== 'searchInputClear') return;

        let input = document.querySelector('#searchInput');
        input.value = '';
        this._search();
    }

    _render(data) {
        this._el.innerHTML = `
    <div class="search">
        <input type="text" id="searchInput" placeholder="Search crypto by name">
        <div class="search__clear" id="searchInputClear"></div>
    </div>
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