/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de TURMAS  
 * (GET, POST, PUT, DELETE)
 * Data: 19/05/2023
 * Autor: Mateus Alves da Silva
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')

var turmaDAO = require('../model/DAO/turmaDAO.js')
var cursoDAO = require('../model/DAO/cursoDAO.js')

const { request } = require('express')

const inserirTurma = async function (dadosTurma) {

    if (dadosTurma.nome == '' || dadosTurma.nome == undefined || dadosTurma.nome > 150 ||
        dadosTurma.sigla == '' || dadosTurma.sigla == undefined || dadosTurma.sigla > 5 ||
        dadosTurma.id_curso == '' || dadosTurma.id_curso == undefined || isNaN(dadosTurma.id_curso)
    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else {

        let verificacaoCurso = await cursoDAO.selectCursoByID(dadosTurma.id_curso)

        if (verificacaoCurso == false) {

            return message.ERROR_INVALID_ID

        } else {

            let resultDadosTurma = await turmaDAO.insertTurma(dadosTurma)

            if (resultDadosTurma) {

                let novaTurma = await turmaDAO.selectLastId()

                let dadosTurmaJSON = {}

                dadosTurmaJSON.status = message.SUCESS_CREATED_ITEM.status
                dadosTurmaJSON.message = message.SUCESS_CREATED_ITEM.message
                dadosTurmaJSON.turma = novaTurma

                return dadosTurmaJSON

            } else {
                return message.ERROR_INTERNAL_SERVER

            }
        }
    }
}

const atualizarTurma = async function (dadosTurma, idTurma) {
    if (dadosTurma.nome == '' || dadosTurma.nome == undefined || dadosTurma.nome > 150 ||
        dadosTurma.sigla == '' || dadosTurma.sigla == undefined || dadosTurma.sigla > 5 ||
        dadosTurma.id_curso == '' || dadosTurma.id_curso == undefined || isNaN(dadosTurma.id_curso)
    ) {
        return message.ERROR_REQUIRED_FIELDS
        //Validação de id incorreto ou não informado
    } else if (idTurma == '' || idTurma == undefined || isNaN(idTurma)) {
        return message.ERROR_INVALID_ID
    } else {
        //Adiciona o id da turma no JSON dos dados
        dadosTurma.id = idTurma;

        let statusId = await turmaDAO.selectLastId()

        if (statusId) {
            //Encaminha os dados para a model 
            let resultDadosTurma = await turmaDAO.updateTurma(dadosTurma)

            if (resultDadosTurma) {

                let dadosTurmaJSON = {}
                dadosTurmaJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosTurmaJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosTurmaJSON.turma = dadosTurma
                return dadosTurmaJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const deletarTurma = async function (id) {
    let statusId = await turmaDAO.selectTurmaByID(id)

    if (statusId) {
        if (id == '' || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDadosTurma = await turmaDAO.deleteTurma(id)

            if (resultDadosTurma) {
                return message.SUCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getTurmas = async function () {
    let dadosTurmaJSON = {};

    //chama a funcao do arquivo DAO que irá retornar todos os registros do Banco de dados
    let dadosTurma = await turmaDAO.selectAllTurmas()

    if (dadosTurma) {
        dadosTurmaJSON.status = message.SUCESS_REQUEST.status
        dadosTurmaJSON.message = message.SUCESS_REQUEST.message
        dadosTurmaJSON.quantidade = dadosTurma.length;
        dadosTurmaJSON.turmas = dadosTurma
        return dadosTurmaJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getTurmaPorID = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dados = await turmaDAO.selectTurmaByID(id)

        if (dados) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.turma = dados
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const getTurmasIDCurso = async (idCurso) => {

    if (idCurso == null || idCurso == undefined || idCurso == '') {
        return message.ERROR_INVALID_ID
    } else {

        let dadosJSON = {}
        let dadosTurmas = await turmaDAO.selectTurmaByIDCurso(idCurso)

        if (dadosTurmas) {

            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.turmas = dadosTurmas

            return dadosJSON
        } else {
            return message.ERROR_INVALID_ID
        }

    }
}

const getAlunosMateriasIDTurma = async (idTurma) => {

    if (idTurma == null || idTurma == undefined || idTurma == '') {
        return message.ERROR_INVALID_ID
    } else {

        let dadosJSON = {}
        let dadosAlunosMateriasDaTurma = await turmaDAO.selectAlunosMateriasByIDTurma(idTurma)

        if (dadosAlunosMateriasDaTurma) {

            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.alunos_materias_da_turma = dadosAlunosMateriasDaTurma

            return dadosJSON
        } else {
            return message.ERROR_INVALID_ID
        }

    }
}


const inserirDadosProcidore = async function (dados) {

    let resultDados;

    if (dados.nome_turma == '' || dados.nome_turma == undefined ||
        dados.sigla_turma == '' || dados.sigla_turma == undefined || 
        dados.nome_curso  == '' || dados.nome_curso == undefined ||
        dados.sigla_curso == '' || dados.sigla_curso == undefined ||
        dados.descricao_curso == '' || dados.descricao_curso == undefined ||
        dados.carga_horaria_curso == '' || dados.carga_horaria_curso == undefined 
    ) {
        console.log(dados);
        return message.ERROR_INTERNAL_SERVER
    } else {

        resultDados = await turmaDAO.insertDaTurmaComProcidore(dados)

        if (resultDados) {

            //Chama a função que vai encontrar o ID gerado após o insert
            let novoDado = await turmaDAO.selectLastId()

            let dadosJSON = {};
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status;
            dadosJSON.message = message.SUCESS_CREATED_ITEM.message;
            dadosJSON.dados = novoDado
            
            return dadosJSON
        } else {
            console.log(resultDados);
            return message.ERROR_INTERNAL_SERVER
        }
    }
}




module.exports = {
    inserirTurma,
    atualizarTurma,
    deletarTurma,
    getTurmas,
    getTurmaPorID,
    getTurmasIDCurso,
    getAlunosMateriasIDTurma,
    inserirDadosProcidore
}