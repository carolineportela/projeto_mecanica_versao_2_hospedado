/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de TIPO_USUARIO  
 * (GET, POST, PUT, DELETE)
 * Data: 25/05/2023
 * Autor: Mateus Alves da Silva
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var message = require('./modulo/config.js')

var tipoUsuarioDAO = require('../model/DAO/tipoUsuarioDAO.js')
const {request} = require('express')

const inserirTipoUsuario = async function (dadosTipoUsuario) {
    if (dadosTipoUsuario.tipo == undefined || dadosTipoUsuario.tipo == '') {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let resultDados = await tipoUsuarioDAO.insertTipoUsuario(dadosTipoUsuario)

        if (resultDados) {
            let novoTipo = await tipoUsuarioDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.tipo = novoTipo

            return dadosJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const deletarTipoUsuario = async function (idTipoUsuario) {
    let statusId = await tipoUsuarioDAO.selectTipoUsuarioByID(idTipoUsuario)

    if (statusId) {
        if (idTipoUsuario == '' || idTipoUsuario == undefined || isNaN(idTipoUsuario)) {
            return message.ERROR_INVALID_ID;
        } else {
            let resultDadosTipoUsuario = await tipoUsuarioDAO.deleteTipoUsuario(idTipoUsuario)

            if (resultDadosTipoUsuario) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getTipoUsuario = async function() {
    let dadosTipoJSON = {}

    let dadosTipo = await tipoUsuarioDAO.selectAllTipos()

    if(dadosTipo) {
        dadosTipoJSON.status = message.SUCESS_REQUEST.status
        dadosTipoJSON.message = message.SUCESS_REQUEST.message
        dadosTipoJSON.quantidade = dadosTipo.length;
        dadosTipoJSON.tipos = dadosTipo
        return dadosTipoJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getTipoUsuarioID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosTipoUsuarioJSON = {}

        let dadosTipoUsuario = await tipoUsuarioDAO.selectTipoUsuarioByID(id)

        if (dadosTipoUsuario) {
            dadosTipoUsuarioJSON.status = message.SUCESS_REQUEST.status
            dadosTipoUsuarioJSON.message = message.SUCESS_REQUEST.message
            dadosTipoUsuarioJSON.tiposUsuarios = dadosTipoUsuario
            return dadosTipoUsuarioJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirTipoUsuario,
    getTipoUsuario,
    deletarTipoUsuario,
    getTipoUsuarioID
}