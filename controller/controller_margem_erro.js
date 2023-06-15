/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de Margem de erros
 * (GET, POST, PUT, DELETE)
 * Data: 06/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var margemErroDAO = require('../model/DAO/margem_erroDAO.js')

const { request } = require('express')

const inserirMargemErro = async function (dadosMargemObtido) {

    if (dadosMargemObtido.valor_minimo == '' || dadosMargemObtido.valor_minimo == undefined ||
        dadosMargemObtido.valor_maximo == '' || dadosMargemObtido.valor_maximo == undefined ||
        dadosMargemObtido.id_criterio == '' || dadosMargemObtido.id_criterio == undefined) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultDadosMargemErro = await margemErroDAO.insertMargemErro(dadosMargemObtido)

        if (resultDadosMargemErro) {
            let novaMargemErro = await margemErroDAO.selectLastId()

            let dadosMargemErroJSON = {}
            dadosMargemErroJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosMargemErroJSON.margens_erro = novaMargemErro

            return dadosMargemErroJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}


const atualizarMargemDeErro = async function (dadosMargemObtido, idMargemErro) {

    if (dadosMargemObtido.valor_minimo == '' || dadosMargemObtido.valor_minimo == undefined ||
        dadosMargemObtido.valor_maximo == '' || dadosMargemObtido.valor_maximo == undefined ||
        dadosMargemObtido.id_criterio == '' || dadosMargemObtido.id_criterio == undefined) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idMargemErro == '' || idMargemErro == undefined || idMargemErro == isNaN(idMargemErro)) {
        return message.ERROR_INVALID_ID
    } else {
        //Adiciona o id no JSON dos dados
        dadosMargemObtido.id = idMargemErro;

        let statusId = await margemErroDAO.getMargemErroByID(idMargemErro)

        if (statusId) {

            let resultDadosMargemErro = await margemErroDAO.updateMargemErro(dadosMargemObtido);

            if (resultDadosMargemErro) {

                let dadosJSON = {}

                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.margensDeErro = dadosMargemObtido
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}


const getMargemErro = async function () {
    let resultadosJSON = {}

    let resultados = await margemErroDAO.getAllMargemErro()

    if (resultados) {

        resultadosJSON.status = message.SUCESS_REQUEST.status
        resultadosJSON.message = message.SUCESS_REQUEST.message
        resultadosJSON.quantidade = resultadosJSON.length;
        resultadosJSON.todosMargensDeErro = resultados

        return resultadosJSON

    } else {
        return message.ERROR_NOT_FOUND
    }
}


const getMargemErroPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dadosMargemErro = await margemErroDAO.selectMargemErroByID(id)
        if (dadosMargemErro) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.margemDeErro = dadosMargemErro
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const deletarMargemErro = async function (idMargemErro) {

    let statusId = await margemErroDAO.selectMargemErroByID(idMargemErro);
 
    if (statusId) {
 
        if (idMargemErro == '' || idMargemErro == undefined || isNaN(idMargemErro)) {
            return message.ERROR_INVALID_ID;
        } else {
            let resultDados = await margemErroDAO.deleteMargemErro(idMargemErro)
 
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
    inserirMargemErro,
    atualizarMargemDeErro,
    getMargemErro,
    getMargemErroPorID,
    deletarMargemErro
}