/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de materia tarefa
 * (GET, POST, PUT, DELETE)
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')
var materiaTarefaDAO = require('../model/DAO/materiaTarefaDAO.js')

const { request } = require('express')

const inserirMateriaTarefa = async function (dadosMateriaTarefa) {

    if (dadosMateriaTarefa.id_materia == '' || dadosMateriaTarefa.id_materia == undefined ||
        dadosMateriaTarefa.id_tarefa == '' || dadosMateriaTarefa.id_tarefa == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultDados= await materiaTarefaDAO.insertMateriaTarefa(dadosMateriaTarefa)

        if (resultDados) {
            let novaMateriaTarefa = await materiaTarefaDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.materiasDaTarefa = novaMateriaTarefa

            return  dadosJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const atualizarMateriaTarefa = async function (dadosMateriaTarefa, idMateriaTarefa) {

    if (dadosMateriaTarefa.id_materia == '' || dadosMateriaTarefa.id_materia == undefined ||
        dadosMateriaTarefa.id_tarefa == '' || dadosMateriaTarefa.id_tarefa == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idMateriaTarefa == '' || idMateriaTarefa == undefined || idMateriaTarefa == isNaN(idMateriaTarefa)) {
        return message.ERROR_INVALID_ID
    } else {
        //Adiciona o id do curso no JSON dos dados
        dadosMateriaTarefa.id = idMateriaTarefa;

        let statusId = await materiaTarefaDAO.selectMateriaTarefaByID(idMateriaTarefa)

        if (statusId) {

            let resultDados = await materiaTarefaDAO.updateMateriaTarefa(dadosMateriaTarefa);

            if (resultDados) {

                let resultDadosJSON = {}

                resultDadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                resultDadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                resultDadosJSON.materiasDaTarefa = resultDados
                return resultDadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const deletarMateriaTarefa = async function (idMateriaTarefa) {

    let statusId = await materiaTarefaDAO.selectMateriaTarefaByID(idMateriaTarefa);

    if (statusId) {

        if (idMateriaTarefa == '' || idMateriaTarefa == undefined || isNaN(idMateriaTarefa)) {
            return message.ERROR_INVALID_ID;
        } else {
            let resultDados = await materiaTarefaDAO.deleteMateriaTarefa(idMateriaTarefa)

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

const getMateriaTarefa = async function () {
    let turmaJSON = {}

    let materiaTarefa = await materiaTarefaDAO.selectAllMateriaTarefa()

    if (materiaTarefa) {

        turmaJSON.status = message.SUCESS_REQUEST.status
        turmaJSON.message = message.SUCESS_REQUEST.message
        turmaJSON.quantidade = materiaTarefa.length;
        turmaJSON.materiasDaTarefa = materiaTarefa

        return turmaJSON

    } else {
        return message.ERROR_NOT_FOUND
    }
}
const getTurmaMateriaID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosTurmaMateriaJSON = {}

        let dadosTurmaMateria = await turmaMateriaDAO.selectTurmaMateriaByID(id)

        if (dadosTurmaMateria) {
            dadosTurmaMateriaJSON.status = message.SUCESS_REQUEST.status
            dadosTurmaMateriaJSON.message = message.SUCESS_REQUEST.message
            dadosTurmaMateriaJSON.turmaMateria = dadosTurmaMateria
            return dadosTurmaMateriaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirMateriaTarefa,
    atualizarMateriaTarefa,
    deletarMateriaTarefa,
    getMateriaTarefa
}