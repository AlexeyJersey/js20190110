import Component from '../Component/Component.js';

export default class Sort extends Component {
    constructor({element}) {
        super({ element });
        this._el = element;
    }

    _toSort(e) {
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

}