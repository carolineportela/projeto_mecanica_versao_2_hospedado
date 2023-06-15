/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de TIPO_CRITERIO
 * (GET, POST, PUT, DELETE)
 * Data: 27/05/2023
 * Autor: Caroline Portela 
 * Versão: 1.0
 ***************************************************************************************************************************************************/


var message = require('./modulo/config.js')

var tipoCriterioDAO = require('../model/DAO/tipoCriterioDAO.js')

const inserirTipoCriterio = async function (dadosTipoCriterio) {
    if (dadosTipoCriterio.tipo == undefined || dadosTipoCriterio.tipo == '') {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let resultDados = await tipoCriterioDAO.insertTipoCriterio(dadosTipoCriterio)

        if (resultDados) {
            let novoTipo = await tipoCriterioDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.tipo = novoTipo

            return dadosJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const getTipoCriterio = async function () {
    let dadosTipoJSON = {}

    let dadosTipo = await tipoCriterioDAO.selectAllTipos()

    if (dadosTipo) {
        dadosTipoJSON.status = message.SUCESS_REQUEST.status
        dadosTipoJSON.message = message.SUCESS_REQUEST.message
        dadosTipoJSON.quantidade = dadosTipo.length;
        dadosTipoJSON.tipos = dadosTipo
        return dadosTipoJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const atualizarTipoCriterio = async function (dadosTipoCriterio, idCriterio) {

    if (
        dadosTipoCriterio.tipo == undefined || dadosTipoCriterio.tipo == ''
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idCriterio == '' || idCriterio == undefined || idCriterio == isNaN(idCriterio)) {
        return message.ERROR_INVALID_ID
    } else {
        //Adiciona o id do tipo criterio no JSON dos dados
        dadosTipoCriterio.id = idCriterio;

        let statusId = await tipoCriterioDAO.selectCriterioByID(idCriterio)

        if (statusId) {

            let resultDadosTipoCriterio = await tipoCriterioDAO.updateTipoCriterio(dadosTipoCriterio);

            if (resultDadosTipoCriterio) {

                let dadosTipoCriterioJSON = {}

                dadosTipoCriterioJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosTipoCriterioJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosTipoCriterioJSON.tipos = dadosTipoCriterio
                return dadosTipoCriterioJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}


const deletarTipoCriterio = async function (idCriterio) {
    let statusId = await tipoCriterioDAO.selectCriterioByID(idCriterio)

    if (statusId) {
        if (idCriterio == '' || idCriterio == undefined || isNaN(idCriterio)) {
            return message.ERROR_INVALID_ID;
        } else {
            let resultDadosCriterio = await tipoCriterioDAO.deleteTipoCriterio(idCriterio)

            if (resultDadosCriterio) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    } else {
        return message.ERROR_NOT_FOUND
    }
}

module.exports = {
    inserirTipoCriterio,
    getTipoCriterio,
    deletarTipoCriterio,
    atualizarTipoCriterio
}