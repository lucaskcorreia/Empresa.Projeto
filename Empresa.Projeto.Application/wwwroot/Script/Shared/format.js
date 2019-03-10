// Formata valores para apresentar na View. Ex: 1234.56 > 1.234,56
function numberToReal(numero) {
    if (numero === 0) {
        return numero.toFixed(2);
    }

    if (numero) {
        numero = numero.toFixed(2).split('.');
        numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join(',').replace('R$ ', '');
    }
    return numero;
}

// Formata valores para envio ao back-end. Ex: 1.234,56 > 1234,56
function formatDecimal(value) {
    return value.trim().replace(/\./g, "");
}

// Converte uma string para decimal para calculos com JQuery. Ex: 1.234,56 > 1234.56
function convertToDecimal(value) {
    var aux = "0.00";
    if (value)
        aux = value.trim().replace(/\./g, "").replace(",", ".");

    if (aux.indexOf("") == -1)
        aux += ".00";

    var float1 = parseFloat(aux);
    //decimal1 = Math.round(float1 * 100) / 100;

    return parseFloat(float1);
}

// Formata valores recebidos do backend formato 1.99 para string 1,99 possibilitando reenvio para o back-end. Evita enviar 199
function convertDecimalToString(value) {
    return value.toString().replace(",", "").replace(".", ",");
}

// Formata data. Ex: 01/01/2000
function formatData(obj, shouldReturn = false) {
    if (obj.val() && obj.val().length < 10) {
        switch (obj.val().length) {
            case 4:
                obj.val(obj.val().substr(0, 3) + "0" + obj.val().substr(3, 1) + "/" + (new Date()).getFullYear());
                break;
            case 5:
                obj.val(obj.val() + "/" + (new Date()).getFullYear());
                break;
            case 6:
                obj.val(obj.val() + (new Date()).getFullYear());
                break;
            case 7:
                obj.val(obj.val().substr(0, 6) + "200" + obj.val().substr(6, 1));
                break;
            case 8:
                var ano = parseInt("20" + obj.val().substr(6, 2));
                var anoAtual = (new Date()).getFullYear();
                if (ano <= anoAtual)
                    obj.val(obj.val().substr(0, 6) + "20" + obj.val().substr(6, 2));
                else
                    obj.val(obj.val().substr(0, 6) + "19" + obj.val().substr(6, 2));
                break;
            case 9:
                var ano = parseInt("2" + obj.val().substr(6, 3));
                var anoAtual = (new Date()).getFullYear();
                if (ano <= anoAtual)
                    obj.val(obj.val().substr(0, 6) + "20" + obj.val().substr(7, 2));
                else
                    obj.val(obj.val().substr(0, 6) + "19" + obj.val().substr(7, 2));
                break;
            default:
                break;
        }
        if (shouldReturn) {
            return obj.val();
        }
    }
}

function formataHora(obj) {
    if (obj.val() && obj.val().length < 5) {
        switch (obj.val().length) {
            case 1:
                if (obj.val() !== ":")
                    obj.val("0" + obj.val() + ":00");
                break;
            case 2:
                if (obj.val().indexOf(':') === -1)
                    obj.val(obj.val() + ":00");
                break;
            case 3:
                obj.val(obj.val() + "00");
                break;
            case 4:
                obj.val(obj.val() + "0");
                break;
            default:
                break;
        }
    }
}