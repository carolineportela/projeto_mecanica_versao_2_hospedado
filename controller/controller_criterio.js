/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de CRITERIOS
 * (GET, POST, PUT, DELETE)
 * Data: 19/05/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')
var criterioDAO = require('../model/DAO/criterioDAO.js')

const { request } = require('express')

const inserirCriterio = async function (dadosCriterio) {

    if (dadosCriterio.descricao == '' || dadosCriterio.descricao == undefined ||
        dadosCriterio.id_tipo_criterio == '' || dadosCriterio.id_tipo_criterio == undefined ||
        dadosCriterio.id_tarefa == '' || dadosCriterio.id_tarefa == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultDadosCriterio = await criterioDAO.insertCriterio(dadosCriterio)

        if (resultDadosCriterio) {
            let novoCriterio = await criterioDAO.selectLastId()

            let dadosCriterioJSON = {}
            dadosCriterioJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosCriterioJSON.criterio = novoCriterio

            return dadosCriterioJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const atualizarCriterio = async function (dadosCriterio, idCriterio) {

    if (dadosCriterio.descricao == '' || dadosCriterio.descricao == undefined ||
        dadosCriterio.id_tipo_criterio == '' || dadosCriterio.id_tipo_criterio == undefined ||
        dadosCriterio.id_tarefa == '' || dadosCriterio.id_tarefa == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idCriterio == '' || idCriterio == undefined || idCriterio == isNaN(idCriterio)) {
        return message.ERROR_INVALID_ID
    } else {
        //Adiciona o id do curso no JSON dos dados
        dadosCriterio.id = idCriterio;

        let statusId = await criterioDAO.selectCriterioByID(idCriterio)

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDadosCriterio = await criterioDAO.updateCriterio(dadosCriterio);

            if (resultDadosCriterio) {

                let dadosCriterioJSON = {}

                dadosCriterioJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosCriterioJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosCriterioJSON.criterio = dadosCriterio
                return dadosCriterioJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const deletarCriterio = async function (idCriterio) {

    let statusId = await criterioDAO.selectCriterioByID(idCriterio);

    if (statusId) {

        if (idCriterio == '' || idCriterio == undefined || isNaN(idCriterio)) {
            return message.ERROR_INVALID_ID;
        } else {
            let resultDadosCriterio = await criterioDAO.deleteCriterio(idCriterio)

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

const getCriterio = async function () {
    let criterioJSON = {}

    let dadosCriterio = await criterioDAO.selectAllCriterio()

    if (dadosCriterio) {

        criterioJSON.status = message.SUCESS_REQUEST.status
        criterioJSON.message = message.SUCESS_REQUEST.message
        criterioJSON.quantidade = dadosCriterio.length;
        criterioJSON.criterios = dadosCriterio

        return criterioJSON

    } else {
        return message.ERROR_NOT_FOUND
    }
}


const getCriterioPorId = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosCriterioJSON = {}

        let dadosCriterio = await criterioDAO.selectCriterioByID(id)

        if (dadosCriterio) {
            dadosCriterioJSON.status = message.SUCESS_REQUEST.status
            dadosCriterioJSON.message = message.SUCESS_REQUEST.message
            dadosCriterioJSON.criterio = dadosCriterio
            return dadosCriterioJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}
module.exports = {
    inserirCriterio,
    atualizarCriterio,
    deletarCriterio,
    getCriterio,
    getCriterioPorId
}