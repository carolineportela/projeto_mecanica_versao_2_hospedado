/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de ALUNOS 
 * (GET, POST, PUT, DELETE)
 * Data: 19/05/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var alunoDAO = require('../model/DAO/alunoDAO.js')

const { request } = require('express')

const inserirAluno = async function (dadosAluno) {

    if (dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome.length > 150 ||
        dadosAluno.data_nascimento == '' || dadosAluno.data_nascimento == undefined ||
        dadosAluno.email == '' || dadosAluno.email == undefined || dadosAluno.email.length > 100
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        //Envia os dados para a model inserir no banco de dados
        let resultDadosAluno = await alunoDAO.insertAluno(dadosAluno)

        //Valida se o banco de dados inseriu corretamente os dados
        if (resultDadosAluno) {

            let novoAluno = await alunoDAO.selectLastId()

            let dadosAlunosJSON = {}
            dadosAlunosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosAlunosJSON.aluno = novoAluno

            return dadosAlunosJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER
        }

    }

}

const atualizarAluno = async function (dadosAluno, idAluno) {

    if (dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome.length > 150 ||
        dadosAluno.data_nascimento == '' || dadosAluno.data_nascimento == undefined ||
        dadosAluno.email == '' || dadosAluno.email == undefined || dadosAluno.email.length > 100
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else if (idAluno == '' || idAluno == undefined || idAluno == isNaN(idAluno)) {
        return message.ERROR_INVALID_ID
    } else {
        //Adiciona o id do aluno no JSON dos dados
        dadosAluno.id = idAluno;

        let statusId = await alunoDAO.selectAlunoByID(idAluno);

        if (statusId) {
            //Encaminha os dados para a model do aluno
            let resultDadosAluno = await alunoDAO.updateAluno(dadosAluno);

            if (resultDadosAluno) {

                let dadosAlunosJSON = {}
                dadosAlunosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosAlunosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosAlunosJSON.aluno = dadosAluno
                return dadosAlunosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const deletarAluno = async function (idAluno) {
    let statusId = await alunoDAO.selectAlunoByID(idAluno);

    if (statusId) {
        if (idAluno == '' || idAluno == undefined || isNaN(idAluno)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDadosAluno = await alunoDAO.deleteAluno(idAluno)

            if (resultDadosAluno) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getAlunos = async function () {
    let dadosAlunosJSON = {};

    //chama a funcao do arquivo DAO que irá retornar todos os registros do Banco de dados
    let dadosAluno = await alunoDAO.selectAllAlunos();

    if (dadosAluno) {
        dadosAlunosJSON.status = message.SUCESS_REQUEST.status
        dadosAlunosJSON.message = message.SUCESS_REQUEST.message
        dadosAlunosJSON.quantidade = dadosAluno.length;
        dadosAlunosJSON.alunos = dadosAluno
        return dadosAlunosJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const getBuscarAlunoNome = async function (nome) {

    let nomeAluno = nome

    let dadosAlunosJSON = {}

    let dadosAluno = await alunoDAO.selectByNameAluno(nomeAluno)

    if (dadosAluno) {
        dadosAlunosJSON.aluno = dadosAluno
        return dadosAlunosJSON
    } else {
        return false;
    }
}

const getAlunoPorID = async function (idAluno) {
    //Validacao do ID
    if (idAluno == '' || idAluno == undefined || isNaN(idAluno)) {
        return message.ERROR_INVALID_ID

    } else {

        let dadosAlunosJSON = {};

        //chama a funcao do arquivo DAO que irá retornar todos os registros do Banco de dados
        let dadosAluno = await alunoDAO.selectAlunoByID(idAluno);

        if (dadosAluno) {
            //Criadno um JSON com o atributo alunos,para encaminhar um array de alunos
            dadosAlunosJSON.status = message.SUCESS_REQUEST.status
            dadosAlunosJSON.message = message.SUCESS_REQUEST.message
            dadosAlunosJSON.alunos = dadosAluno
            return dadosAlunosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }

    }

}

const getAlunosIDTurma = async (idTurma) => {

    if (idTurma == null || idTurma == undefined || idTurma == '') {
        return message.ERROR_INVALID_ID
    } else {

        let dadosJSON = {}
        let dadosAlunoTurma = await alunoDAO.selectAlunosByIDTurma(idTurma)

        if (dadosAlunoTurma) {

            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.alunosDaTurma = dadosAlunoTurma

            return dadosJSON
        } else {
            return message.ERROR_INVALID_ID
        }

    }
}


module.exports = {
    inserirAluno,
    atualizarAluno,
    deletarAluno,
    getAlunos,
    getAlunoPorID,
    getBuscarAlunoNome,
    getAlunosIDTurma
}