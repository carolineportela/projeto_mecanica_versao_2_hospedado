/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de AvaliacaoMatricula
 * (GET, POST, PUT, DELETE)
 * Data: 06/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var avaliacaoMatriculaDAO = require('../model/DAO/avaliacaoMatriculaDAO.js')

const { request } = require('express')

const inserirAvaliacaoAlunoPelaMatricula = async function (dadosAvaliacaoAluno) {
    if (dadosAvaliacaoAluno.resultado == '' || dadosAvaliacaoAluno.resultado == undefined ||
        dadosAvaliacaoAluno.id_matricula == '' || dadosAvaliacaoAluno.id_matricula == undefined ||
        dadosAvaliacaoAluno.id_criterio == '' || dadosAvaliacaoAluno.id_criterio == undefined

    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        //Envia os dados para a model inserir no banco de dados
        let resultDadosAvaliacaoAluno = await avaliacaoMatriculaDAO.insertAvaliacaoAluno(dadosAvaliacaoAluno)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDadosAvaliacaoAluno) {

            let novaAvaliacaoAluno = await avaliacaoMatriculaDAO.selectLastId()

            let dadosAvaliacaoAlunoJSON = {}
            dadosAvaliacaoAlunoJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosAvaliacaoAlunoJSON.avaliacoesAluno = novaAvaliacaoAluno

            return dadosAvaliacaoAlunoJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualzarAvaliacaoAluno = async function (dadosAvaliacaoAluno, id_matricula) {

    if (dadosAvaliacaoAluno.resultado == '' || dadosAvaliacaoAluno.resultado == undefined ||
        dadosAvaliacaoAluno.id_matricula == '' || dadosAvaliacaoAluno.id_matricula == undefined ||
        dadosAvaliacaoAluno.id_criterio == '' || dadosAvaliacaoAluno.id_criterio == undefined

    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (id_matricula == '' || id_matricula == undefined || id_matricula == isNaN(id_matricula)) {
        return message.ERROR_INVALID_ID
    } else {
       
        dadosAvaliacaoAluno.id = id_matricula;

        let statusId = await avaliacaoMatriculaDAO.selectAvaliacaoAlunoByID(id_matricula)

        if (statusId) {
       
            let resultDadosAvaliacaoAluno = await avaliacaoMatriculaDAO.updateAvaliacaoAluno(dadosAvaliacaoAluno);

            if (resultDadosAvaliacaoAluno) {

                let dadosJSON = {}

                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.avaliacaoAluno = dadosAvaliacaoAluno
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const deletarAvaliacaoAluno = async function (idAvaliacaoAluno) {

    let statusId = await avaliacaoMatriculaDAO.selectAvaliacaoAlunoByID(idAvaliacaoAluno);

    if (statusId) {

        if (idAvaliacaoAluno == '' || idAvaliacaoAluno == undefined || isNaN(idAvaliacaoAluno)) {
            return message.ERROR_INVALID_ID; 
        } else {
            let resultDadosAvaliacaoAluno = await avaliacaoMatriculaDAO.deleteAvaliacaoAluno(idAvaliacaoAluno)

            if (resultDadosAvaliacaoAluno) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER 
            }
        }

    } else {
        return message.ERROR_NOT_FOUND 
    }


}

const getAvaliacoes = async function () {
    let avaliacaoJSON = {}

    let avaliacoes = await avaliacaoMatriculaDAO.selectAllAvaliacoesAlunos()

    if (avaliacoes) {

        avaliacaoJSON.status = message.SUCESS_REQUEST.status
        avaliacaoJSON.message = message.SUCESS_REQUEST.message
        avaliacaoJSON.quantidade =avaliacoes.length;
        avaliacaoJSON.avaliacao = avaliacoes

        return avaliacaoJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getAvaliacaoAlunoPorId = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosAvaliacaoAlunoJSON = {}

        let dadosAvaliacaoAluno = await avaliacaoMatriculaDAO.selectAvaliacaoAlunoByID(id)

        if (dadosAvaliacaoAluno) {
            dadosAvaliacaoAlunoJSON.status = message.SUCESS_REQUEST.status
            dadosAvaliacaoAlunoJSON.message = message.SUCESS_REQUEST.message
            dadosAvaliacaoAlunoJSON.avaliacao = dadosAvaliacaoAluno
            return dadosAvaliacaoAlunoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}


module.exports = {
    inserirAvaliacaoAlunoPelaMatricula,
    atualzarAvaliacaoAluno,
    deletarAvaliacaoAluno,
    getAvaliacoes,
    getAvaliacaoAlunoPorId
}