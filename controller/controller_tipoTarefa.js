/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de TIPO_Tarefa
 * (GET, POST, PUT, DELETE)
 * Data: 27/05/2023
 * Autor: Caroline Portela 
 * Versão: 1.0
 ***************************************************************************************************************************************************/


var message = require('./modulo/config.js')

var tipoTarefaDAO = require('../model/DAO/tipoTarefaDAO.js')
const { request } = require('express')

const inserirTipoTarefa = async function (dadosTipoTarefa) {
    if (dadosTipoTarefa.tipo == undefined || dadosTipoTarefa.tipo == '') {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let resultDados = await tipoTarefaDAO.insertTipoTarefa(dadosTipoTarefa)

        if (resultDados) {
            let novoTipo = await tipoTarefaDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.tipo = novoTipo

            return dadosJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const getTipoTarefa = async function () {
    let dadosTipoJSON = {}

    let dadosTipo = await tipoTarefaDAO.selectAllTipoTarefa()

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

const atualizarTipoTarefa = async function (dadosTipoTarefa, idTipoTarefa) {

    if (
        dadosTipoTarefa.tipo == undefined || dadosTipoTarefa.tipo == ''
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idTipoTarefa == '' || idTipoTarefa == undefined || idTipoTarefa == isNaN(idTipoTarefa)) {
        return message.ERROR_INVALID_ID
    } else {

        dadosTipoTarefa.id = idTipoTarefa;

        let statusId = await tipoTarefaDAO.selectTipoTarefaByID(idTipoTarefa)

        if (statusId) {

            let resultDadosTipoTarefa = await tipoTarefaDAO.updateTipoTarefa(dadosTipoTarefa);

            if (resultDadosTipoTarefa) {

                let dadosTipoTarefaJSON = {}

                dadosTipoTarefaJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosTipoTarefaJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosTipoTarefaJSON.tipos = dadosTipoTarefa
                return dadosTipoTarefaJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const deletarTipoTarefa = async function (idTipoTarefa) {
    let statusId = await tipoTarefaDAO.selectTipoTarefaByID(idTipoTarefa)

    if (statusId) {
        if (idTipoTarefa == '' || idTipoTarefa == undefined || isNaN(idTipoTarefa)) {
            return message.ERROR_INVALID_ID;
        } else {
            let resultDadosTipoTarefa = await tipoTarefaDAO.deleteTipoTarefa(idTipoTarefa)

            if (resultDadosTipoTarefa) {
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
    inserirTipoTarefa,
    getTipoTarefa,
    atualizarTipoTarefa,
    deletarTipoTarefa
}