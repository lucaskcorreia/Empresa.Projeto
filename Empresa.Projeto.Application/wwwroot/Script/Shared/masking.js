$(function () {
    inicializeMasking();
});

function inicializeMasking() {
    $('.mask-data').mask("00/00/0000");
    $('.mask-hora').mask("00:00");
    $('.mask-data-mm-yyyy').mask("00/0000");
    $('.mask-cep').mask("00.000-000");
    $('.mask-cnpj').mask("00.000.000/0000-00");
    $('.mask-cpf').mask("000.000.000-00");
    $('.mask-footer').mask("000");
    $('.mask-serie').mask("000");
    $('.mask-bordero').mask("000000000");
    $('.mask-matricula').mask("AAAAAAAAAAAA");
    $('.mask-codigo').mask("AAAAAAAAAA");
    $('.mask-email').mask("a", {
        translation: {
            "a": { pattern: /[\w@\-.+]/, recursive: true }
        }
    });
    $('.mask-integer').mask("0#");


    /* .mask-cpf-cnpj */
    var handlerFocusOutCpfCnpj = function () {
        var val = $(this).val();

        if (val.length < 18 && val.length > 14) {
            $(this).val(val.slice(0, 14));
            $(this).mask('000.000.000-00999');
        }
        else if (val.length < 14) {
            $(this).val(val.slice(0, 9));
            $(this).mask('AAAAAAAAAAA');
        }
    }
    var handlerFocusInCpfCnpj = function () {
        maskCpfCnpj(this);

        var that = this;
        that.selectionStart = that.selectionEnd = 10000;
    }
    var handlerKeyUpCpfCnpj = function (e) {
        maskCpfCnpj(this);

        if (e.which != 37 && e.which != 38 && e.which != 39 && e.which != 40 &&
            e.which != 8 && e.which != 35 && e.which != 36) {
            var that = this;
            that.selectionStart = that.selectionEnd = 10000;
        }
    }

    $(".mask-cpf-cnpj").bind("focusout", handlerFocusOutCpfCnpj);
    $(".mask-cpf-cnpj").bind("focusin", handlerFocusInCpfCnpj);
    $(".mask-cpf-cnpj").bind("keyup", handlerKeyUpCpfCnpj);
    $(".mask-cpf-cnpj").bind("paste", function (e) {
        $(this).unbind("focusout");
        $(this).unbind("focusin");
        $(this).unbind("keyup");

        var val = $(element).val().replace(/\D/g, '');

        if (val.length >= 12) {
            $(element).mask('00.000.000/0000-00');
        } else {
            $(element).mask('000.000.000-00999');
        }

        $(this).bind("focusout", handlerFocusOut);
        $(this).bind("focusin", handlerFocusIn);
        $(this).bind("keyup", handlerKeyUp);
    });

    $(".mask-cpf-cnpj-matricula").mask('00.000.000/0000-00');

    /* .mask-cpf-cnpj-matricula */
    var handlerFocusOut = function () {
        var val = $(this).val();

        if (val.length < 18 && val.length > 14) {
            $(this).val(val.slice(0, 14));
            $(this).mask('000.000.000-00999');
        }
        else if (val.length < 14) {
            $(this).val(val.slice(0, 9));
            $(this).mask('AAAAAAAAAAA');
        }
    }
    var handlerFocusIn = function () {
        maskCpfCnpjMatricula(this);

        var that = this;
        that.selectionStart = that.selectionEnd = 10000;
    }
    var handlerKeyUp = function (e) {
        maskCpfCnpjMatricula(this);

        if (e.which != 37 && e.which != 38 && e.which != 39 && e.which != 40 &&
            e.which != 8 && e.which != 35 && e.which != 36) {
            var that = this;
            that.selectionStart = that.selectionEnd = 10000;
        }
    }

    $(".mask-cpf-cnpj-matricula").bind("focusout", handlerFocusOut);
    $(".mask-cpf-cnpj-matricula").bind("focusin", handlerFocusIn);
    $(".mask-cpf-cnpj-matricula").bind("keyup", handlerKeyUp);
    $(".mask-cpf-cnpj-matricula").bind("paste", function (e) {
        $(this).unbind("focusout");
        $(this).unbind("focusin");
        $(this).unbind("keyup");

        var data = e.originalEvent.clipboardData.getData('Text');

        var reg = new RegExp('^[0-9]+$');
        var val = data.replace(/\D/g, '');

        if (reg.test(val)) {
            if (data.length >= 12)
                $(this).mask('00.000.000/0000-00');
            else if (data.length == 11)
                $(this).mask('000.000.000-00999');
            else if (data.length < 10)
                $(this).mask('AAAAAAAAAAA');
        }

        $(this).bind("focusout", handlerFocusOut);
        $(this).bind("focusin", handlerFocusIn);
        $(this).bind("keyup", handlerKeyUp);
    });

    $(".mask-cpf-cnpj-matricula").mask('AAAAAAAAAAA');

    //Mascara Telefone
    var tel_MaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
        tel_Options = {
            onKeyPress: function (val, e, field, options) {
                field.mask(tel_MaskBehavior.apply({}, arguments), options);
            }
        };
    $('.mask-telefone').mask(tel_MaskBehavior, tel_Options);

    //Unmasking
    $('.unmask-dinheiro').change(function () {
        var name = $(this).attr('id');
        var value = $(this).val();
        var length = $(this).attr('maxlength');
        if (length != undefined) {
            if (value.length > length) {
                value = value.substring(0, length - 1);
                $(this).val(value);
            }
        }
        var valorInteiro = value.replace(/\./g, "").replace(",", "").replace("R$ ", "");
        var valorDecimal = valorInteiro.substring(valorInteiro.length - 2);
        valorInteiro = valorInteiro.substring(0, valorInteiro.length - 2) + ',' + valorDecimal;
        $('#' + name.replace('txt', 'hdf')).val(valorInteiro);
    });
}

function maskCpfCnpj(element) {
    var val = $(element).val().replace(/\D/g, '');

    if (val.length >= 12) {
        $(element).mask('00.000.000/0000-00');
    } else {
        $(element).mask('000.000.000-00999');
    }
}

function maskCpfCnpjMatricula(element) {
    var reg = new RegExp('^[0-9]+$');
    var val = $(element).val().replace(/\D/g, '');

    if (reg.test(val)) {
        if (val.length >= 12) {
            $(element).mask('00.000.000/0000-00');
        } else if (val.length == 11) {
            $(element).mask('000.000.000-00999');
        } else if (val.length < 10) {
            $(element).mask('AAAAAAAAAAA');
        }
    }
}