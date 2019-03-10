var currentRow = '';
var prevCurrentRow = '';
var element = '';

$(document).keydown(function (e) {
    if (currentRow) {
        var activeElement = $(document.activeElement);
        var activeElementType = activeElement.prop("localName");
        var hasNoClear = activeElement.hasClass("no-clearcurrentrow");
        var openModal = $("body").find(".modal.show").attr("id");
        var row = null;

        if (e.keyCode == '13' || e.keyCode == '37' || e.keyCode == '38' || e.keyCode == '39' || e.keyCode == '40') {
            if (activeElementType == 'body' || (activeElementType == 'div' && activeElementType) ||
                activeElementType == 'button' || activeElementType == 'input' || activeElementType == 'textarea' || activeElementType == 'select') {
                e = e || window.event;
                var rowFields = retornaElementosRow(currentRow);
                var index = -1;

                if (event.srcElement.id !== "") {
                    var element = $('#' + event.srcElement.id);
                    index = rowFields.index(element);
                }

                if (e.keyCode == '38' || e.keyCode == '40') {
                    if (e.keyCode == '38') {
                        row = currentRow.prev();
                        nextPrevClassRow(row, e, false);
                        markExecClick(row);
                    }
                    else if (e.keyCode == '40') {
                        row = currentRow.next();
                        nextPrevClassRow(row, e, false);
                        markExecClick(row);
                    }

                    if (index != null && index >= 0) {
                        var prevComp = rowFields.eq(index);
                        rowFields = retornaElementosRow(currentRow);
                        if (rowFields.length > 0) {
                            rowFields.eq(index).focus().select();
                        } else {
                            prevComp.blur();
                        }
                    }
                }

                if (e.keyCode == '37' || e.keyCode == '39' && index != null) {
                    if (e.keyCode == '37') {
                        event.preventDefault();
                        if (index < rowFields.length && (index - 1) > -1) {
                            rowFields.eq(index - 1).focus().select();
                        }
                    } else if (e.keyCode == '39') {
                        event.preventDefault();
                        if (index > -1 && (index + 1) < rowFields.length) {
                            rowFields.eq(index + 1).focus().select();
                        }
                    }
                }

                if (e.keyCode == '13' && currentRow && !hasNoClear && activeElementType != 'button') {
                    markExecEnter(currentRow);
                }
            }
        }
        else if (activeElementType != 'button' || activeElementType != 'input' || activeElementType != 'textarea' || activeElementType != 'select') {
            if (openModal) {
                formFocus(e, '.modal', currentRow.parent().parent().attr('id'));
            }
            else {
                formFocus(e, '#form', currentRow.parent().parent().attr('id'));
            }
        }
    }
});

function tableMarkRow(Id) {
    $("#" + Id).on("click", "td", function () {
        var activeElement = document.activeElement;

        if ($(this).parent().parent().is('tbody') &&
            !$(activeElement).hasClass("btn-table")) {
            if (currentRow) {
                currentRow.removeClass('mark-row');
            }
            currentRow = $(this).parent("tr");
            currentRow.parent().find('tr').removeClass('mark-row');
            currentRow.focus();
            currentRow.addClass('mark-row');

            if (activeElement.tagName.toLowerCase() != "input") {
                rowFocusElements(currentRow, 0);
            }

            markExecClick(currentRow);
        }
    });

    $("#" + Id).on("dblclick", "td", function () {
        currentRow = $(this).parent("tr");
        markExecEnter(currentRow);
    });
}

function markFirstRow(table) {
    setTimeout(function () {
        $('#' + table).find('tr td').eq(0).attr('tabindex', '0');
        $('#' + table).find('tr td').eq(0).focus().click();
        $('#' + table).find('tr td').eq(0).removeAttr('tabindex');
    }, 100);
}

function clearCurrentRow() {
    if (currentRow) {
        currentRow.removeClass('mark-row');
        currentRow = null;
    }
}

function getCurrentRow() {
    if (currentRow != '' && currentRow != null) {
        return true;
    }
    return false;
}

function setPrevCurrentRow(id) {
    if (currentRow) {
        currentRow.removeClass('mark-row');
    }
    prevCurrentRow = currentRow;
    element = id;
    clearCurrentRow();
}

function getPrevCurrentRow() {
    currentRow = prevCurrentRow;
    prevCurrentRow = null;

    if (currentRow) {
        currentRow.addClass('mark-row');
        currentRow.eq(0).find('td').eq(0).attr('tabindex', '0');
        currentRow.eq(0).find('td').eq(0).focus().click();
        currentRow.eq(0).find('td').eq(0).removeAttr('tabindex');
    }
}

function getElement() {
    return element;
}

function isPrevCurrentRow() {
    if (prevCurrentRow)
        return true;
    return false;
}

function retornaElementosRow(row) {
    return $(row).find('td button*[id], td input*[id], td textarea*[id],td select*[id]')
        .not(':hidden')
        .not(':disabled')
        .not('[readonly]')
        .not('.close');
}

function rowFocusElements(row, index) {
    var rowElements = $(row).find('button,input,textarea,select')
        .not(':hidden')
        .not(':disabled')
        .not('[readonly]')
        .not('.close');
    setTimeout(function () {
        rowElements.eq(index).focus().select();
    }, 20);
}

function nextPrevClassRow(row, e, selectFirst = true) {
    var rowFields = retornaElementosRow(row);
    if (row.html() != undefined) {
        currentRow.focus();
        currentRow.removeClass('mark-row');
        row.focus();
        row.addClass('mark-row');
        currentRow = row;

        if (selectFirst) {
            rowFocusElements(row, 0);
        }

        var tableName = row.parent().parent().parent();
        var scrollDiv = $(tableName).scrollTop();
        var heigthDiv = $(tableName).height();
        var heigthRow = row.height();
        var idRow = row.index();
        var rows = row.parent().find('tr');
        var heigth = 0;
        for (var i = 0; i <= idRow; i++) {
            heigth += rows.eq(i).height();
        }
        var heigthRowVisible = heigth - scrollDiv;
        if (heigth > scrollDiv + heigthDiv) {
            $(tableName).scrollTop(heigth - heigthDiv);
        }
        else if (heigth - heigthRowVisible <= scrollDiv && scrollDiv != 0) {
            $(tableName).scrollTop(scrollDiv - (heigthRow - heigthRowVisible));
        }
        e.preventDefault();
    }
    if (rowFields.length > 0) {
        rowFields.eq(0).focus().select();
    }
}