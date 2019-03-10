function modalOk(mensagem = 'Operação realizada com sucesso!', bloqueia = false, rotaOk = '/Home/Index', campo = null, metodo = null) {
    return new Promise((resolve, reject) => {
        swal({
            html: mensagem,
            type: "success",
            showCloseButton: true,
            allowOutsideClick: !bloqueia,
            allowEscapeKey: true,
            onOpen: () => {
                swal.hideLoading();
                $('#btn_confirmSweetAlert').focus();
            }
        }).then((result) => {
            if (rotaOk) {
                window.location.href = rotaOk;
            }
            else if (campo) {
                $('#' + campo).focus();
            }
            else if (metodo) {
                modalOkExecFinal();
            }
            resolve(null);
        });
    });
}

function modalAguarde(titulo = 'Aguarde', bloqueia = true, noClearCurrentRow = false) {
    fechaModal();

    if (!noClearCurrentRow) {
        clearCurrentRow();
    }

    swal({
        text: titulo,
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: !bloqueia,
        allowEscapeKey: !bloqueia,
        onOpen: () => {
            swal.showLoading();
        }
    });
}

function modalAguardePinPad(mensagem = 'Aguardando resposta do pinpad...', bloqueia = true, campo = null) {
    swal({
        text: mensagem,
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        allowEscapeKey: !bloqueia,
        allowOutsideClick: !bloqueia,
        onOpen: () => {
            swal.showLoading();
        },
        timer: 30000
    }).then((result) => {
        if (result.dismiss === swal.DismissReason.timer) {
            swal({
                html: "Operação cancelada!",
                type: "error",
                showCloseButton: true,
                allowOutsideClick: true,
                allowEscapeKey: true,
                onOpen: () => {
                    swal.hideLoading();
                    $('#btn_confirmSweetAlert').focus();
                }
            }).then((result) => {
                if (campo) {
                    $('#' + campo).focus();
                }
            });
        }
    });
}

function fechaModal(campoAtual = null) {
    swal.close();
    swal.hideLoading();
    swal.resetDefaults();

    if (campoAtual) {
        proximoFoco(campoAtual);
    }
}

function modalErro(mensagem, bloqueia, campoErro, getInicial, metodo = null, limpaCampo = true) {
    return new Promise((resolve, reject) => {
        swal({
            html: mensagem,
            type: "error",
            showCloseButton: true,
            allowOutsideClick: !bloqueia,
            allowEscapeKey: !bloqueia,
            onOpen: () => {
                swal.hideLoading();
                $('#btn_confirmSweetAlert').focus();
            }
        }).then((result) => {
            if (getInicial) {
                window.location.href = "/Home/Index";
            }
            else if (campoErro) {
                var campo = $('#' + campoErro);
                if (campo.is("input") && limpaCampo)
                    campo.val("");
                else if (campo.is("select") && limpaCampo) {
                    $("#" + campoErro).val($("#" + campoErro + " option:first").val());
                }

                campo.focus().select();
                campo.addClass("has-red");
            }
            else if (metodo) {
                modalErroExecFinal();
            }
            else {
                primeiroFoco();
            }
            resolve(null);
        });
    });
}

function modalEscolha(titulo, mensagem, bloqueia, btnNomeCorfirma, btnNomeCancela) {
    swal({
        title: titulo,
        text: mensagem,
        type: "question",
        showCloseButton: true,
        showCancelButton: true,
        allowOutsideClick: !bloqueia,
        allowEscapeKey: true,
        confirmButtonText: btnNomeCorfirma,
        cancelButtonText: btnNomeCancela,
        onOpen: () => {
            swal.hideLoading();
        }
    }).then((result) => {
        if (result.value) {
            execSimModalEscolha();
        }
        else if (result.dismiss) {
            execNaoModalEscolha();
        }
    });
}

function modalHtml(tipo, titulo, mensagem, bloqueiaOutsideClick, btnNomeConfirma, habilitaBtnConfirma, btnClassConfirma, html, rota) {
    swal({
        title: titulo,
        type: tipo,
        html: html,
        showConfirmButton: habilitaBtnConfirma,
        showCloseButton: true,
        buttonsStyling: html !== null && html !== "",
        allowOutsideClick: !bloqueiaOutsideClick,
        confirmButtonText: btnNomeConfirma,
        confirmButtonClass: btnClassConfirma,
        onOpen: () => onOpen(),
    }).then((result) => {
        if (result.value && rota)
            window.location.href = rota;
    });
}

function modalAlerta(mensagem, bloqueia = false, rotaOk = null, campo = null) {
    return new Promise((resolve, reject) => {
        swal({
            text: mensagem,
            type: "warning",
            showCloseButton: true,
            allowOutsideClick: !bloqueia,
            allowEscapeKey: !bloqueia,
            onOpen: () => {
                swal.hideLoading();
                $('#btn_confirmSweetAlert').focus();
            }
        }).then(() => {
            if (rotaOk) {
                window.location.href = rotaOk;
            }
            else if (campo) {
                $('#' + campo).focus().select();
            }
            resolve(null);
        });
    });
}

function modalErroTabela(mensagem, table = null, campoErro = "", limpaCampo = true) {
    swal({
        html: mensagem,
        type: "error",
        showCloseButton: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        onOpen: () => {
            swal.hideLoading();
            $('#btn_confirmSweetAlert').focus();
        }
    }).then((result) => {
        if (table) {
            markFirstRow(table);
        } else {
            getPrevCurrentRow();
        }

        if (campoErro) {
            var campo = $('#' + campoErro);
            if (campo.is("input") && limpaCampo)
                campo.val("");
            else if (campo.is("select") && limpaCampo) {
                $("#" + campoErro).val($("#" + campoErro + " option:first").val());
            }

            campo.focus().select().click();
            campo.addClass("has-red");
        }
    });
}

function modalErroFechaTela(mensagem, bloqueia, getInicial) {
    swal({
        html: mensagem,
        type: "error",
        showCloseButton: true,
        allowOutsideClick: !bloqueia,
        allowEscapeKey: !bloqueia,
        onOpen: () => {
            swal.hideLoading();
            setTimeout(function () {
                $('#btn_confirmSweetAlert').focus();
            }, 100);
        }
    }).then((result) => {
        if (getInicial) {
            history.back(-1);
        }
        else {
            $('#div_modal').modal('hide');
        }
    });
}