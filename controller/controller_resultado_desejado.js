/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de Resultado Desejado
 * (GET, POST, PUT, DELETE)
 * Data: 06/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais

var message = require('./modulo/config.js')

var resultadoDesejadoDAO = require('../model/DAO/resultadoDesejadoDAO.js')

const { request } = require('express')

const inserirResultadoDesjeado = async function (dadosResultadoDesejado) {

    if (dadosResultadoDesejado.resultado == '' || dadosResultadoDesejado.resultado == undefined ||
        dadosResultadoDesejado.id_criterio == '' || dadosResultadoDesejado.id_criterio == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultDadosResultadoDesejado = await resultadoDesejadoDAO.insertResultadoDesejado(dadosResultadoDesejado)

        if (resultDadosResultadoDesejado) {
            let novoResultado = await resultadoDesejadoDAO.selectLastId()

            let dadosResultadoDesejadoJSON = {}

            dadosResultadoDesejadoJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosResultadoDesejadoJSON.resultados = novoResultado

            return dadosResultadoDesejadoJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}


const atualizarResultadoDesejado = async function (dadosResultadoDesejado, idResultadoDesejado) {

    if (dadosResultadoDesejado.resultado == '' || dadosResultadoDesejado.resultado == undefined ||
        dadosResultadoDesejado.id_criterio == '' || dadosResultadoDesejado.id_criterio == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idResultadoDesejado == '' || idResultadoDesejado == undefined || idResultadoDesejado == isNaN(idResultadoDesejado)) {
        return message.ERROR_INVALID_ID
    } else {
        //Adiciona o id no JSON dos dados
        dadosResultadoDesejado.id = idResultadoDesejado;

        let statusId = await resultadoDesejadoDAO.getResultadoByID(idResultadoDesejado)

        if (statusId) {

            let resultDadosResultadoDesejado = await resultadoDesejadoDAO.updateResultadoDesejado(dadosResultadoDesejado);

            if (resultDadosResultadoDesejado) {

                let dadosResultadoJSON = {}

                dadosResultadoJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosResultadoJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosResultadoJSON.resultado = dadosResultadoDesejado
                return dadosResultadoJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const getResultadosDesejados = async function () {
    let resultadosJSON = {}

    let resultados = await resultadoDesejadoDAO.getAllResultados()

    if (resultados) {

        resultadosJSON.status = message.SUCESS_REQUEST.status
        resultadosJSON.message = message.SUCESS_REQUEST.message
        resultadosJSON.quantidade = resultadosJSON.length;
        resultadosJSON.todosResultadosDesejados = resultados

        return resultadosJSON

    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getResultadoDesejadoPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dadosResultado = await resultadoDesejadoDAO.getResultadoByID(id)

        if (dadosResultado) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.resultadoObtidos = dadosResultado
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const deletarResultadoDesejado = async function (idResultadoDesejado) {

    let statusId = await resultadoDesejadoDAO.getResultadoByID(idResultadoDesejado);
 
    if (statusId) {
 
        if (idResultadoDesejado == '' || idResultadoDesejado == undefined || isNaN(idResultadoDesejado)) {
            return message.ERROR_INVALID_ID;
        } else {
            let resultDados = await resultadoDesejadoDAO.deleteResultadoDesejado(idResultadoDesejado)
 
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


module.exports = {
    inserirResultadoDesjeado,
    atualizarResultadoDesejado,
    getResultadosDesejados,
    getResultadoDesejadoPorID,
    deletarResultadoDesejado
}