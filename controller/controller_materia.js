/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de MATERIAS  
 * (GET, POST, PUT, DELETE)
 * Data: 04/05/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var materiaDAO = require('../model/DAO/materiaDAO.js')
const { request } = require('express')

const inserirMateria = async function (dadosMateria) {
    if (dadosMateria.nome == '' || dadosMateria.nome == undefined || dadosMateria.nome.length > 150 ||
        dadosMateria.sigla == '' || dadosMateria.sigla == undefined || dadosMateria.sigla.length > 5
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultDadosMateria = await materiaDAO.insertMateria(dadosMateria)

        if (resultDadosMateria) {
            let novaMateria = await materiaDAO.selectLastId()

            let dadosMateriaJSON = {}
            dadosMateriaJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosMateriaJSON.materia = novaMateria

            return dadosMateriaJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const atualizarMateria = async function (dadosMateria, idMateria) {
    if (dadosMateria.nome == '' || dadosMateria.nome == undefined || dadosMateria.nome.length > 150 ||
        dadosMateria.sigla == '' || dadosMateria.sigla == undefined || dadosMateria.sigla.length > 5
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idMateria == '' || idMateria == undefined || idMateria == isNaN(idMateria)) {
        return message.ERROR_INVALID_ID
    } else {
        //Adiciona o id da materia no JSON dos dados
        dadosMateria.id = idMateria;

        let statusId = await materiaDAO.selectMateriaByID(idMateria)

        if (statusId) {
            //Encaminha os dados para a model da materia
            let resultDadosMateria = await materiaDAO.updateMateria(dadosMateria);

            if (resultDadosMateria) {

                let dadosMateriaJSON = {}

                dadosMateriaJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosMateriaJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosMateriaJSON.materia = dadosMateria
                return dadosMateriaJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }


}

const deletarMateria = async function (idMateria) {
    let statusId = await materiaDAO.selectMateriaByID(idMateria);

    if (statusId) {
        if (idMateria == '' || idMateria == undefined || isNaN(idMateria)) {
            return message.ERROR_INVALID_ID; 
        } else {
            let resultDadosMateria = await materiaDAO.deleteMateria(idMateria)

            if (resultDadosMateria) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER 
            }
        }
    } else {
        return message.ERROR_NOT_FOUND 
    }
}

const getMaterias = async function () {
    let materiasJSON = {}

    let materias = await materiaDAO.selectAllMaterias()

    if (materias) {

        materiasJSON.status = message.SUCESS_REQUEST.status
        materiasJSON.message = message.SUCESS_REQUEST.message
        materiasJSON.quantidade = materias.length;
        materiasJSON.materia = materias

        return  materiasJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getMateriaPorId = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosMateriaJSON = {}

        let dadosMateria = await materiaDAO.selectMateriaByID(id)

        if (dadosMateria) {
            dadosMateriaJSON.status = message.SUCESS_REQUEST.status
            dadosMateriaJSON.message = message.SUCESS_REQUEST.message
            dadosMateriaJSON.materia = dadosMateria
            return dadosMateriaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getMateriaIDTurma = async (idTurma) => {

    if (idTurma == null || idTurma == undefined || idTurma == '') {
        return message.ERROR_INVALID_ID
    } else {

        let dadosJSON = {}
        let dadosMateria = await materiaDAO.selectMateriaByIDTurma(idTurma)

        if (dadosMateria) {

            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.materiasDaTurma = dadosMateria

            return dadosJSON
        } else {
            return message.ERROR_INVALID_ID
        }

    }
}


const getTarefaIDMateria = async (idMateria) => {

    if (idMateria == null || idMateria == undefined || idMateria == '') {
        return message.ERROR_INVALID_ID
    } else {

        let dadosJSON = {}
        let dadosMateria = await materiaDAO.selectTarefaByIDMateria(idMateria)

        if (dadosMateria) {

            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.tarefas_da_materia = dadosMateria

            return dadosJSON
        } else {
            return message.ERROR_INVALID_ID
        }

    }
}

module.exports ={
    inserirMateria,
    getMaterias,
    getMateriaPorId,
    atualizarMateria,
    deletarMateria,
    getMateriaIDTurma,
    getTarefaIDMateria
}