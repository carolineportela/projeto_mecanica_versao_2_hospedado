/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de Registro tempo 
 * (GET, POST, PUT, DELETE)
 * Data: 06/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var registroTempoDAO = require('../model/DAO/registro_tempoDAO.js')

const inserirRegistroTempo = async function (dadosRegistroTempo) {

    if (dadosRegistroTempo.data == '' || dadosRegistroTempo.data == undefined ||
        dadosRegistroTempo.hora_inicio == '' || dadosRegistroTempo.hora_inicio == undefined ||
        dadosRegistroTempo.hora_termino == '' || dadosRegistroTempo.hora_termino == undefined ||
        dadosRegistroTempo.tempo_intervalo == '' || dadosRegistroTempo.tempo_intervalo == undefined ||
        dadosRegistroTempo.observacao == '' || dadosRegistroTempo.observacao == undefined ||
        dadosRegistroTempo.id_tarefa == '' || dadosRegistroTempo.id_tarefa == undefined || isNaN(dadosRegistroTempo.id_tarefa)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultDados = await registroTempoDAO.insertRegistroTempo(dadosRegistroTempo)

        if (resultDados) {
            let novoRegistro = await registroTempoDAO.selectLastId()

            let dadosRegistroJSON = {}
            dadosRegistroJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosRegistroJSON.registros = novoRegistro

            return dadosRegistroJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const atualizarRegistroTempo = async function (dadosRegistroTempo, idRegistroTempo) {

    if (dadosRegistroTempo.data == '' || dadosRegistroTempo.data == undefined ||
        dadosRegistroTempo.hora_inicio == '' || dadosRegistroTempo.hora_inicio == undefined ||
        dadosRegistroTempo.hora_termino == '' || dadosRegistroTempo.hora_termino == undefined ||
        dadosRegistroTempo.tempo_intervalo == '' || dadosRegistroTempo.tempo_intervalo == undefined ||
        dadosRegistroTempo.observacao == '' || dadosRegistroTempo.observacao == undefined ||
        dadosRegistroTempo.id_tarefa == '' || dadosRegistroTempo.id_tarefa == undefined || isNaN(dadosRegistroTempo.id_tarefa)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idRegistroTempo == '' || idRegistroTempo == undefined || idRegistroTempo == isNaN(idRegistroTempo)) {
        return message.ERROR_INVALID_ID
    } else {

        dadosRegistroTempo.id = idRegistroTempo;

        let statusId = await registroTempoDAO.selectRegistroTempoByID(idRegistroTempo)

        if (statusId) {
            let resultDadosRegistro = await registroTempoDAO.updateRegistroTempo(dadosRegistroTempo);

            if (resultDadosRegistro) {

                let dadosJSON = {}

                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.registros = dadosRegistroTempo
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const getRegistroTempo = async function () {
    let registroJSON = {}

    let registros = await registroTempoDAO.selectAllRegistroTempo()

    if (registros) {

        registroJSON.status = message.SUCESS_REQUEST.status
        registroJSON.message = message.SUCESS_REQUEST.message
        registroJSON.quantidade = registros.length;
        registroJSON.registros = registros

        return registroJSON

    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getRegistroTempoPorID = async function (id) {

    if(id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await registroTempoDAO.selectRegistroTempoByID(id)

        if(dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.registros = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const deletarRegistroTempo = async function (idRegistro) {

    let statusId = await registroTempoDAO.selectRegistroTempoByID(idRegistro);

    if (statusId) {

        if (idRegistro == '' || idRegistro == undefined || isNaN(idRegistro)) {
            return message.ERROR_INVALID_ID; 
        } else {
            let resultDados = await registroTempoDAO.deleteRegistroTempo(idRegistro)

            if (resultDados) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER 
            }
        }

    } else {
        return message.ERROR_NOT_FOUND 
    }
}

const getRegistrosTempoIDTarefa = async (idTarefa) => {

    if (idTarefa == null || idTarefa == undefined || idTarefa == '') {
        return message.ERROR_INVALID_ID
    } else {

        let dadosJSON = {}
        let dadosTarefa = await registroTempoDAO.selectRegistroTempoByIDTarefa(idTarefa)

        if (dadosTarefa) {

            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.registros_de_tempo_da_tarefa = dadosTarefa

            return dadosJSON
        } else {
            return message.ERROR_INVALID_ID
        }

    }
}

module.exports = {
    inserirRegistroTempo,
    atualizarRegistroTempo,
    getRegistroTempo,
    getRegistroTempoPorID,
    deletarRegistroTempo,
    getRegistrosTempoIDTarefa
}