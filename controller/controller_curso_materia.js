/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de curso_materia
 * (GET, POST, PUT, DELETE)
 * Data: 27/05/2023
 * Autor: Caroline Portela 
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var message = require('./modulo/config.js')

var cursoMateriaDAO = require('../model/DAO/cursoMateriaDAO.js')
const { request } = require('express')

const inserirCursoMateria = async function (dadosCursoMateria) {
    if (
        dadosCursoMateria.id_curso == undefined || dadosCursoMateria.id_curso == '' || isNaN(dadosCursoMateria.id_curso) ||
        dadosCursoMateria.id_materia == undefined || dadosCursoMateria.id_materia == '' || isNaN(dadosCursoMateria.id_materia)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let resultDados = await cursoMateriaDAO.insertCursoMateria(dadosCursoMateria)

        if (resultDados) {
            let novoCursoMateria = await cursoMateriaDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.cursoMateria = novoCursoMateria

            return dadosJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}


const atualizarCursoMateria = async function (dadosCursoMateria, idCursoMateria) {
    if (
        dadosCursoMateria.id_curso == undefined || dadosCursoMateria.id_curso == '' || isNaN(dadosCursoMateria.id_curso) ||
        dadosCursoMateria.id_materia == undefined || dadosCursoMateria.id_materia == '' || isNaN(dadosCursoMateria.id_materia)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idCursoMateria == '' || idCursoMateria == undefined || idCursoMateria == isNaN(idCursoMateria)) {
        return message.ERROR_INVALID_ID
    } else {

        dadosCursoMateria.id = idCursoMateria;

        let statusId = await cursoMateriaDAO.selectCursoMateriaByID(idCursoMateria)

        if (statusId) {

            let resultDadosCursoMateria = await cursoMateriaDAO.updateCursoMateria(dadosCursoMateria);

            if (resultDadosCursoMateria) {

                let dadosJSON = {}

                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.cursoMateria = dadosCursoMateria
                return  dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const deletarCursoMateria = async function (idCursoMateria) {
    let statusId = await cursoMateriaDAO.selectCursoMateriaByID(idCursoMateria)

    if (statusId) {
        if (idCursoMateria == '' || idCursoMateria == undefined || isNaN(idCursoMateria)) {
            return message.ERROR_INVALID_ID;
        } else {
            let resultDados = await cursoMateriaDAO.deleteCursoMateria(idCursoMateria)

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


const getCursoMateria = async function () {
    let dadosCursoMateriaJSON = {}

    let dadosCursoMateria = await cursoMateriaDAO.selectAllCursoMateria()

    if (dadosCursoMateria) {
        dadosCursoMateriaJSON.status = message.SUCESS_REQUEST.status
        dadosCursoMateriaJSON.message = message.SUCESS_REQUEST.message
        dadosCursoMateriaJSON.quantidade = dadosCursoMateria.length;
        dadosCursoMateriaJSON.cursoMateria = dadosCursoMateria
        return dadosCursoMateriaJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

module.exports = {
    inserirCursoMateria,
    atualizarCursoMateria,
    getCursoMateria,
    deletarCursoMateria
}