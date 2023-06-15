/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de CURSOS  
 * (GET, POST, PUT, DELETE)
 * Data: 04/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')
var cursoDAO = require('../model/DAO/cursoDAO.js')

const { request } = require('express')

const inserirCurso = async function (dadosCurso) {

    if (dadosCurso.nome == '' || dadosCurso.nome == undefined || dadosCurso.nome.length > 150 ||
        dadosCurso.sigla == '' || dadosCurso.sigla == undefined || dadosCurso.sigla.length > 6 ||
        dadosCurso.descricao == '' || dadosCurso.descricao == undefined || dadosCurso.descricao.length > 300 ||
        dadosCurso.carga_horaria == '' || dadosCurso.carga_horaria == undefined)
    {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let resultDadosCurso = await cursoDAO.insertCurso(dadosCurso)

        if (resultDadosCurso) {
            let novoCurso = await cursoDAO.selectLastId()

            let dadosCursoJSON = {}
            dadosCursoJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosCursoJSON.curso = novoCurso

            return dadosCursoJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const atualizarCurso = async function (dadosCurso, idCurso) {

    if (dadosCurso.nome == '' || dadosCurso.nome == undefined || dadosCurso.nome.length > 150 ||
        dadosCurso.sigla == '' || dadosCurso.sigla == undefined || dadosCurso.sigla.length > 6 ||
        dadosCurso.descricao == '' || dadosCurso.descricao == undefined || dadosCurso.descricao.length > 300 ||
        dadosCurso.carga_horaria == '' || dadosCurso.carga_horaria == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idCurso == '' || idCurso == undefined || idCurso == isNaN(idCurso)) {
        return message.ERROR_INVALID_ID
    } else {
        //Adiciona o id do curso no JSON dos dados
        dadosCurso.id = idCurso;

        let statusId = await cursoDAO.selectCursoByID(idCurso)

        if (statusId) {
            //Encaminha os dados para a model do curso
            let resultDadosCurso = await cursoDAO.updateCurso(dadosCurso);

            if (resultDadosCurso) {

                let dadosCursosJSON = {}

                dadosCursosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosCursosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosCursosJSON.cursos = dadosCurso
                return dadosCursosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const deletarCurso = async function (idCurso) {

    let statusId = await cursoDAO.selectCursoByID(idCurso);

    if (statusId) {

        if (idCurso == '' || idCurso == undefined || isNaN(idCurso)) {
            return message.ERROR_INVALID_ID; 
        } else {
            let resultDadosCurso = await cursoDAO.deleteCurso(idCurso)

            if (resultDadosCurso) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER 
            }
        }

    } else {
        return message.ERROR_NOT_FOUND 
    }
}

const getCursos = async function () {
    let cursosJSON = {}

    let cursos = await cursoDAO.selectAllCursos()

    if (cursos) {

        cursosJSON.status = message.SUCESS_REQUEST.status
        cursosJSON.message = message.SUCESS_REQUEST.message
        cursosJSON.quantidade = cursos.length;
        cursosJSON.curso = cursos

        return cursosJSON

    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getCursoPorID = async function (id) {

    if(id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosCursoJSON = {}

        let dadosCurso = await cursoDAO.selectCursoByID(id)

        if(dadosCurso) {
            dadosCursoJSON.status = message.SUCESS_REQUEST.status
            dadosCursoJSON.message = message.SUCESS_REQUEST.message
            dadosCursoJSON.curso = dadosCurso
            return dadosCursoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirCurso,
    atualizarCurso,
    deletarCurso,
    getCursos,
    getCursoPorID
}