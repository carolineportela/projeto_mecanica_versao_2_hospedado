/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de Semestre  
 * (GET, POST, PUT, DELETE)
 * Data: 06/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')
var semestreDAO = require('../model/DAO/semestreDAO.js')

const { request } = require('express')


const inserirSemestre = async function (dadosSemestre) {

    if (dadosSemestre.numero == '' || dadosSemestre.numero == undefined || isNaN(dadosSemestre.numero) ||
        dadosSemestre.id_curso == '' || dadosSemestre.id_curso == undefined || isNaN(dadosSemestre.id_curso)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultDados = await semestreDAO.insertSemestre(dadosSemestre)

        if (resultDados) {
            let novoSemestre = await semestreDAO.selectLastId()

            let dadosSemestreJSON = {}
            dadosSemestreJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosSemestreJSON.semestre = novoSemestre

            return dadosSemestreJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const atualizarSemestre = async function (dadosSemestre, idSemestre) {
    if (dadosSemestre.numero == '' || dadosSemestre.numero == undefined || isNaN(dadosSemestre.numero) ||
        dadosSemestre.id_curso == '' || dadosSemestre.id_curso == undefined || isNaN(dadosSemestre.id_curso)
    ) {
        return message.ERROR_REQUIRED_FIELDS
        //Validação de id incorreto ou não informado
    } else if (idSemestre == '' || idSemestre == undefined || isNaN(idSemestre)) {
        return message.ERROR_INVALID_ID
    } else {
        //Adiciona o id da turma no JSON dos dados
        dadosSemestre.id = idSemestre;

        let statusId = await semestreDAO.selectLastId()

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDadosSemestre = await semestreDAO.updateSemestre(dadosSemestre)

            if (resultDadosSemestre) {

                let dadosSemestreJSON = {}
                dadosSemestreJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosSemestreJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosSemestreJSON.semestres = dadosSemestre
                return dadosSemestreJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getSemestre = async function () {
    let dadosSemestreJSON = {};

    //chama a funcao do arquivo DAO que irá retornar todos os registros do Banco de dados
    let dadosSemestre = await semestreDAO.selectAllSemestre()

    if (dadosSemestre) {
        dadosSemestreJSON.status = message.SUCESS_REQUEST.status
        dadosSemestreJSON.message = message.SUCESS_REQUEST.message
        dadosSemestreJSON.quantidade = dadosSemestre.length;
        dadosSemestreJSON.semestre = dadosSemestre
        return dadosSemestreJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getSemestrePorID = async function (id) {

    if(id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await semestreDAO.selectSemestreByID(id)

        if(dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.semestre = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}
const deletarSemestre = async function (id) {
    let statusId = await semestreDAO.selectSemestreByID(id)

    if (statusId) {
        if (id == '' || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDadosSemestre = await semestreDAO.deleteSemestre(id)

            if (resultDadosSemestre) {
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
    inserirSemestre,
    atualizarSemestre,
    getSemestre,
    getSemestrePorID,
    deletarSemestre
}