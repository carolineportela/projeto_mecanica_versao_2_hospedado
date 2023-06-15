/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de turma  e materia
 * (GET, POST, PUT, DELETE)
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')
var turmaMateriaDAO = require('../model/DAO/turmaMateriaDAO.js')

const { request } = require('express')

const inserirTurmaMateria = async function (dadosTurmaMateria) {

    if (dadosTurmaMateria.id_turma == '' || dadosTurmaMateria.id_turma == undefined ||
        dadosTurmaMateria.id_materia == '' || dadosTurmaMateria.id_materia == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultDadosTurmaMateria = await turmaMateriaDAO.insertTurmaMateria(dadosTurmaMateria)

        if (resultDadosTurmaMateria) {
            let novaTurmaMateria = await turmaMateriaDAO.selectLastId()

            let dadosTurmaMateriaJSON = {}
            dadosTurmaMateriaJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosTurmaMateriaJSON.turmaMateria = novaTurmaMateria

            return dadosTurmaMateriaJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const atualizarTurmaMateria = async function (dadosTurmaMateria, idTurmaMateria) {

    if (dadosTurmaMateria.id_turma == '' || dadosTurmaMateria.id_turma == undefined ||
        dadosTurmaMateria.id_materia == '' || dadosTurmaMateria.id_materia == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idTurmaMateria == '' || idTurmaMateria == undefined || idTurmaMateria == isNaN(idTurmaMateria)) {
        return message.ERROR_INVALID_ID
    } else {
        //Adiciona o id do curso no JSON dos dados
        dadosTurmaMateria.id = idTurmaMateria;

        let statusId = await turmaMateriaDAO.selectTurmaMateriaByID(idTurmaMateria)

        if (statusId) {

            let resultDadosTurmaMateria = await turmaMateriaDAO.updateTurmaMateria(dadosTurmaMateria);

            if (resultDadosTurmaMateria) {

                let resultDadosTurmaMateriaJSON = {}

                resultDadosTurmaMateriaJSON.status = message.SUCESS_UPDATED_ITEM.status
                resultDadosTurmaMateriaJSON.message = message.SUCESS_UPDATED_ITEM.message
                resultDadosTurmaMateriaJSON.turmasMaterias = resultDadosTurmaMateria
                return resultDadosTurmaMateriaJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const deletarTurmaMateria = async function (idTurmaMateria) {

    let statusId = await turmaMateriaDAO.selectTurmaMateriaByID(idTurmaMateria);

    if (statusId) {

        if (idTurmaMateria == '' || idTurmaMateria == undefined || isNaN(idTurmaMateria)) {
            return message.ERROR_INVALID_ID; 
        } else {
            let resultDadosTurmaMateria = await turmaMateriaDAO.deleteTurmaMateria(idTurmaMateria)

            if (resultDadosTurmaMateria) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER 
            }
        }

    } else {
        return message.ERROR_NOT_FOUND 
    }
}

const getTurmaMateria = async function () {
    let turmaMateriaJSON = {}

    let turmasMateria = await turmaMateriaDAO.selectAllTurmasMaterias()

    if (turmasMateria) {

        turmaMateriaJSON.status = message.SUCESS_REQUEST.status
        turmaMateriaJSON.message = message.SUCESS_REQUEST.message
        turmaMateriaJSON.quantidade = turmasMateria.length;
        turmaMateriaJSON.turmaMateria = turmasMateria

        return turmaMateriaJSON

    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getTurmaMateriaID = async function (id) {

    if(id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosTurmaMateriaJSON = {}

        let dadosTurmaMateria = await turmaMateriaDAO.selectTurmaMateriaByID(id)

        if(dadosTurmaMateria) {
            dadosTurmaMateriaJSON.status = message.SUCESS_REQUEST.status
            dadosTurmaMateriaJSON.message = message.SUCESS_REQUEST.message
            dadosTurmaMateriaJSON.turmaMateria = dadosTurmaMateria
            return dadosTurmaMateriaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const inserirDadosTurmaMateriaProcedore = async function (dados) {

    let resultDados;

    if (
        dados.materia_nome == '' || dados.materia_nome == undefined || 
        dados.materia_sigla  == '' || dados.materia_sigla == undefined ||
        dados.turma_id == '' || dados.turma_id == undefined   
    ) {
        return message.ERROR_INTERNAL_SERVER
    } else {

        resultDados = await turmaMateriaDAO.insertTurmaMateriaComProcedore(dados)

        if (resultDados) {

            //Chama a função que vai encontrar o ID gerado após o insert
            let novoDado = await turmaMateriaDAO.selectLastId()

            let dadosJSON = {};
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status;
            dadosJSON.message = message.SUCESS_CREATED_ITEM.message;
            dadosJSON.dados = novoDado
            
            return dadosJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

module.exports = {
    inserirTurmaMateria,
    atualizarTurmaMateria,
    deletarTurmaMateria,
    getTurmaMateria,
    getTurmaMateriaID,
    inserirDadosTurmaMateriaProcedore
}