$(function () {
    inicializeValidation();
});

function inicializeValidation() { /// <summary>
    /// Função que aceita somente alfanumerico
    /// </summary>
    $('.apenasalfanumerico').bind({
        keypress: function (event) {
            var tecla = (window.event) ? event.keyCode : event.which;
            if (String.fromCharCode(tecla).match(/^[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)) {
                return true;
            }
            else {
                if (tecla !== 8) {
                    return false;
                }
                else {
                    return true;
                }
            }
        },
        paste: function () {
            var thisAux = this;
            setTimeout(function () {
                var old = thisAux.value;
                thisAux.value = '';
                for (i = 0; i < old.length; i++) {
                    if (old[i].match(/^[0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)) {
                        thisAux.value = thisAux.value + old[i];
                    }
                }
            }, 100);
        }

    });

    /// <summary>
    /// Função que aceita somente alfabeto
    /// </summary>
    $('.apenasalfabeto').bind({
        keypress: function (event) {
            var tecla = (window.event) ? event.keyCode : event.which;
            if (String.fromCharCode(tecla).match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)) {
                return true;
            }
            else {
                if (tecla !== 8) {
                    return false;
                }
                else {
                    return true;
                }
            }
        },
        paste: function () {
            var thisAux = this;
            setTimeout(function () {
                var old = thisAux.value;
                thisAux.value = '';
                for (i = 0; i < old.length; i++) {
                    if (old[i].match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)) {
                        thisAux.value = thisAux.value + old[i];
                    }
                }
            }, 100);
        }

    });

    /// <summary>
    /// Função que não aceita caracteres especiais
    /// </summary>
    $('.semcaracterespecial').bind({
        keypress: function (event) {
            var tecla = (window.event) ? event.keyCode : event.which;
            if ((tecla > 47 && tecla <= 57) || (tecla >= 65 && tecla <= 90) || (tecla >= 97 && tecla <= 122) || tecla === 13 || tecla === 8 || tecla === 32 || tecla === 112) {
                return true;
            }
            else {
                return false;
            }
        },
        paste: function () {
            var thisAux = this;
            setTimeout(function () {
                var old = thisAux.value;
                thisAux.value = '';
                for (i = 0; i < old.length; i++) {
                    if (old[i].match(/[A-Za-z0-9]+$/)) {
                        thisAux.value = thisAux.value + old[i];
                    }
                }
            }, 100);
        }
    });

    /// <summary>
    /// Função que aceita somente números
    /// </summary>
    $('.apenasnumeros').bind({
        keypress: function (event) {
            var tecla = (window.event) ? event.keyCode : event.which;
            if (tecla > 47 && tecla < 58) {
                return true;
            }
            else {
                if (tecla !== 8) {
                    return false;
                }
                else {
                    return true;
                }
            }
        },
        paste: function () {
            var thisAux = this;
            setTimeout(function () {
                var old = thisAux.value;
                thisAux.value = '';
                for (i = 0; i < old.length; i++) {
                    if (old[i].match(/[0-9]+$/)) {
                        thisAux.value = thisAux.value + old[i];
                    }
                }
            }, 100);
        }
    });

    /// <summary>
    /// Função que bloqueia Ctrl C Ctrl V
    /// </summary>
    $('.bloqueioctrlcctrlv').bind('cut copy paste', function (event) {
        event.preventDefault();
    });

    /// <summary>
    /// Função que valida data
    /// </summary>
    $('.data-valida').change(function () {
        var dateFormated = formatData($(this), true);
        var date = $(this).val();
        if (dateFormated != undefined) {
            date = dateFormated;
        }
        if (date) {
            var campo = $(this).attr('id');
            var reg = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
            if (!reg.test(date)) {
                $("#" + campo).val("");
                modalErro("Data inválida!", true, campo, false);
            }
        }
    });

    /// <summary>
    /// Função que valida se a data é inferior a data atual
    /// </summary>
    $('.data-max-atual').change(function () {
        var date = $(this).val();

        if (date) {
            var campo = $(this).attr('id');
            var objDate = new Date();
            objDate.setYear(date.split("/")[2]);
            objDate.setMonth(date.split("/")[1] - 1);
            objDate.setDate(date.split("/")[0]);

            if (objDate.getTime() > new Date().getTime()) {
                $("#" + campo).val("");
                modalErro("A data deve ser igual ou anterior a atual!", true, campo, false);
            }
        }
    });

    /// <summary>
    /// Função para remover a borda vermelha dos campos input
    /// </summary>
    $('.form-control').focusout(function () {
        $(this).removeClass('has-red');
    });
}

/// <summary>
/// Função para validar datas
/// </summary>
function isValidDate(s) {
    var bits = s.split('/');
    var d = new Date(bits[2] + '/' + bits[1] + '/' + bits[0]);
    return !!(d && (d.getMonth() + 1) === bits[1] && d.getDate() === Number(bits[0]));
}

function twoDigits(input) {
    return input.toString().length === 2 ? input : '0' + input;
}

function validarDataMaiorQue(data1, data2) {
    var data1S = data1.split('/');
    var data2S = data2.split('/');

    var data1V = new Date(data1S[2], parseInt(data1S[1]) - 1, data1S[0]);
    var data2V = new Date(data2S[2], parseInt(data2S[1]) - 1, data2S[0]);

    if (+data1V <= +data2V) {
        return true;
    }

    return false;
}

function validarDataMaiorAtual(campo) {
    var date = campo.val();

    if (date) {
        var objDate = new Date();
        objDate.setYear(date.split("/")[2]);
        objDate.setMonth(date.split("/")[1] - 1);
        objDate.setDate(date.split("/")[0]);

        if (objDate.getTime() > new Date().getTime()) {
            modalErro("A data deve ser igual ou anterior a atual!", true, campo.attr('id'), false);
            return false;
        }
    }

    return true;
}

function validarDataInvalida(campo, mensagemErro = "Data inválida!", mostraModal = false) {
    var date = campo.val();

    if (date) {
        var reg = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        if (!reg.test(date)) {
            if (mostraModal) {
                modalErro(mensagemErro, true, campo.attr('id'), false);
            }

            return false;
        }
    }

    return true;
}