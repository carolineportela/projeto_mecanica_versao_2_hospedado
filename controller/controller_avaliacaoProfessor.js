/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de AvaliacaoProfessor
 * (GET, POST, PUT, DELETE)
 * Data: 29/05/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var avaliacaoProfessorDAO = require('../model/DAO/avaliacaoProfessorDAO.js')

const { request } = require('express')

const inserirAvaliacaoProfessor = async function (dadosAvaliacaoProfessor) {
    if (dadosAvaliacaoProfessor.resultado == '' || dadosAvaliacaoProfessor.resultado == undefined || dadosAvaliacaoProfessor.resultado > 1 ||
        dadosAvaliacaoProfessor.id_professor == '' || dadosAvaliacaoProfessor.id_professor == undefined ||
        dadosAvaliacaoProfessor.id_criterio == '' || dadosAvaliacaoProfessor.id_criterio == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        //Envia os dados para a model inserir no banco de dados
        let resultDadosAvaliacaoProfessor = await avaliacaoProfessorDAO.insertAvaliacaoProfessor(dadosAvaliacaoProfessor)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDadosAvaliacaoProfessor) {

            let novaAvaliacaoProfessor = await avaliacaoProfessorDAO.selectLastId()

            let dadosAvaliacaoProfessorJSON = {}
            dadosAvaliacaoProfessorJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosAvaliacaoProfessorJSON.avaliacoesProfessor = novaAvaliacaoProfessor

            return dadosAvaliacaoProfessorJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualizarAvaliacaoProfessor = async function (dadosAvaliacaoProfessor, idAvaliacaoProfessor) {

    if (dadosAvaliacaoProfessor.resultado == '' || dadosAvaliacaoProfessor.resultado == undefined || dadosAvaliacaoProfessor.resultado > 1 ||
        dadosAvaliacaoProfessor.id_professor == '' || dadosAvaliacaoProfessor.id_professor == undefined ||
        dadosAvaliacaoProfessor.id_criterio == '' || dadosAvaliacaoProfessor.id_criterio == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idAvaliacaoProfessor == '' || idAvaliacaoProfessor == undefined || idAvaliacaoProfessor == isNaN(idAvaliacaoProfessor)) {
        return message.ERROR_INVALID_ID
    } else {
        //Adiciona o id do curso no JSON dos dados
        dadosAvaliacaoProfessor.id = idAvaliacaoProfessor

        let statusId = await avaliacaoProfessorDAO.selectAvaliacaoProfessorByID(idAvaliacaoProfessor)

        if (statusId) {
            //Encaminha os dados para a model do curso
            let resultDadosAvaliacaoProfessor = await avaliacaoProfessorDAO.updateAvaliacaoProfessor(dadosAvaliacaoProfessor);

            if (resultDadosAvaliacaoProfessor) {

                let dadosAvaliacaoProfessorJSON = {}

                dadosAvaliacaoProfessorJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosAvaliacaoProfessorJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosAvaliacaoProfessorJSON.dados = dadosAvaliacaoProfessor
                return dadosAvaliacaoProfessorJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const deletarAvaliacaoProfessor = async function (idAvaliacaoProfessor) {

    let statusId = await avaliacaoProfessorDAO.selectAvaliacaoProfessorByID(idAvaliacaoProfessor);

    if (statusId) {

        if (idAvaliacaoProfessor == '' || idAvaliacaoProfessor == undefined || isNaN(idAvaliacaoProfessor)) {
            return message.ERROR_INVALID_ID;
        } else {
            let resultDadosAvaliacaoProfessor = await avaliacaoProfessorDAO.deleteAvaliacaoProfessor(idAvaliacaoProfessor)

            if (resultDadosAvaliacaoProfessor) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }

    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getAvaliacaoProfessor = async function () {
    let avaliacaoProfessorJSON = {}

    let avaliacoes = await avaliacaoProfessorDAO.selectAllAvaliacoesProfessores()

    if (avaliacoes) {

        avaliacaoProfessorJSON.status = message.SUCESS_REQUEST.status
        avaliacaoProfessorJSON.message = message.SUCESS_REQUEST.message
        avaliacaoProfessorJSON.quantidade = avaliacoes.length;
        avaliacaoProfessorJSON.avaliacao = avaliacoes

        return avaliacaoProfessorJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getAvaliacaoProfessorPorId = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosAvaliacaoProfessorJSON = {}

        let dadosAvaliacaoProfessor = await avaliacaoProfessorDAO.selectAvaliacaoProfessorByID(id)

        if (dadosAvaliacaoProfessor) {
            dadosAvaliacaoProfessorJSON.status = message.SUCESS_REQUEST.status
            dadosAvaliacaoProfessorJSON.message = message.SUCESS_REQUEST.message
            dadosAvaliacaoProfessorJSON.avaliacao = dadosAvaliacaoProfessor
            return dadosAvaliacaoProfessorJSON 
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}



module.exports = {
    inserirAvaliacaoProfessor,
    deletarAvaliacaoProfessor,
    atualizarAvaliacaoProfessor,
    getAvaliacaoProfessor,
    getAvaliacaoProfessorPorId
}