;(function () {

    var XTable = function (elem, data, afterCreateRow) {
        if (elem.tagName.toLowerCase() !== 'table') {
            return false;
        }
        this.elem = elem;
        this.data = data;
        this.fields = getFields(elem);
        init(elem, this.fields, data, afterCreateRow);
    }

    function getFields(elem) {
        var fields = [];
        var cells = elem.rows[0].cells;
        for (var i = 0; i < cells.length; i++) {
            fields.push(cells[i].attributes.data ? cells[i].attributes.data.value : i);
        }
        return fields;
    }

    function init(elem, fields, data, afterCreateRow) {
        console.log(elem, fields, data);
        var tbody = document.createElement('tbody');
        for (var i = 0; i < data.length; i++) {
            var tr = document.createElement('tr');
            for (var j = 0; j < fields.length; j++) {
                if (data[i][fields[j]] === undefined) {
                    continue
                }
                var td = document.createElement('td');
                td.innerHTML = data[i][fields[j]] ? data[i][fields[j]].toString() : '';
                tr.appendChild(td);
                tr.dataset[fields[j]] = data[i][fields[j]];
            }
            afterCreateRow && afterCreateRow(tr, i, data[i]);
            console.log(tr.dataset);
            tbody.appendChild(tr);
        }
        elem.appendChild(tbody);
    }
    XTable.prototype.search = function (word) {
        var rows = this.elem.rows;
        var len = rows.length;
        for (var i = 1; i < len; i ++) {
            var flag = false;
            for (var j = 1; j < rows[i].cells.length; j ++) {
                if (!word || rows[i].cells[j].textContent.search(word) >= 0) {
                    rows[i].style.display = 'table-row';
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                rows[i].style.display = 'none';
            }
        }
    };

    window.XTable = XTable;

}());
