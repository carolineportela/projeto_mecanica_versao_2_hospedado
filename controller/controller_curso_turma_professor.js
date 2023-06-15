/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de curso_professor
 * (GET, POST, PUT, DELETE)
 * Data: 10/06/2023
 * Autor: Caroline Portela 
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var message = require('./modulo/config.js')

var cursoTurmaProfessorDAO = require('../model/DAO/cursoTurmaProfessorDAO.js')
const { request } = require('express')

const inserirCursoTurmaProfessor = async function (dadosCursoTurmaProfessor) {
    if (
        dadosCursoTurmaProfessor.id_curso == undefined || dadosCursoTurmaProfessor.id_curso == '' || isNaN(dadosCursoTurmaProfessor.id_curso) ||
        dadosCursoTurmaProfessor.id_turma == undefined || dadosCursoTurmaProfessor.id_turma == '' || isNaN(dadosCursoTurmaProfessor.id_turma) ||
        dadosCursoTurmaProfessor.id_professor == undefined || dadosCursoTurmaProfessor.id_professor == '' || isNaN(dadosCursoTurmaProfessor.id_professor)

    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let resultDados = await cursoTurmaProfessorDAO.insertCursoTurmaProfessor(dadosCursoTurmaProfessor)

        if (resultDados) {
            let novoCursoTurmaDoProfessor = await cursoTurmaProfessorDAO.selectLastId()

            let dadosJSON = {}
            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.cursosEturmasDoProfessor = novoCursoTurmaDoProfessor

            return dadosJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}


const atualizarCursoTurmaDoProfessor = async function (dadosCursoTurmaProfessor, idCursoTurmaProfessor) {
    if (
        dadosCursoTurmaProfessor.id_curso == undefined || dadosCursoTurmaProfessor.id_curso == '' || isNaN(dadosCursoTurmaProfessor.id_curso) ||
        dadosCursoTurmaProfessor.id_turma == undefined || dadosCursoTurmaProfessor.id_turma == '' || isNaN(dadosCursoTurmaProfessor.id_turma) ||
        dadosCursoTurmaProfessor.id_professor == undefined || dadosCursoTurmaProfessor.id_professor == '' || isNaN(dadosCursoTurmaProfessor.id_professor)

    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idCursoTurmaProfessor == '' || idCursoTurmaProfessor == undefined || idCursoTurmaProfessor == isNaN(idCursoTurmaProfessor)) {
        return message.ERROR_INVALID_ID
    } else {

        dadosCursoTurmaProfessor.id = idCursoTurmaProfessor;

        let statusId = await cursoTurmaProfessorDAO.selectCursoTurmaProfessorByID(idCursoTurmaProfessor)

        if (statusId) {

            let resultDadosCursoTurmaProfessor = await cursoTurmaProfessorDAO.updateCursoTurmaProfessor(dadosCursoTurmaProfessor);

            if (resultDadosCursoTurmaProfessor) {

                let dadosJSON = {}

                dadosJSON.status = message.SUCESS_UPDATED_ITEM.status
                dadosJSON.message = message.SUCESS_UPDATED_ITEM.message
                dadosJSON.cursosEturmasDoProfessor = dadosCursoTurmaProfessor
                return dadosJSON
            } else
                return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const getCursoTurmaProfessor = async function () {
    let cursosTurmasProfessorJSON = {}

    let cursosTurmaProfessor = await cursoTurmaProfessorDAO.selectAllCursoTurmaProfessor()

    if (cursosTurmaProfessor) {

        cursosTurmasProfessorJSON.status = message.SUCESS_REQUEST.status
        cursosTurmasProfessorJSON.message = message.SUCESS_REQUEST.message
        cursosTurmasProfessorJSON.quantidade = cursosTurmaProfessor.length;
        cursosTurmasProfessorJSON.cursosEturmasDoProfessor = cursosTurmaProfessor

        return cursosTurmasProfessorJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}


const getCursoTurmaProfessorID = async function (idCursoTurmaProfessor) {
    //Validacao do ID
    if (idCursoTurmaProfessor == '' || idCursoTurmaProfessor == undefined || isNaN(idCursoTurmaProfessor)) {
        return message.ERROR_INVALID_ID

    } else {

        let dadosCursoTurmaProfessorJSON = {};

        let dadosCursoTurmaProfessor = await cursoTurmaProfessorDAO.selectCursoTurmaProfessorByID(idCursoTurmaProfessor);

        if (dadosCursoTurmaProfessor) {

            dadosCursoTurmaProfessorJSON.status = message.SUCESS_REQUEST.status
            dadosCursoTurmaProfessorJSON.message = message.SUCESS_REQUEST.message
            dadosCursoTurmaProfessorJSON.cursosEturmasDoProfessor = dadosCursoTurmaProfessor
            return dadosCursoTurmaProfessorJSON
        } else {
            return message.ERROR_NOT_FOUND
        }

    }

}


const deletarCursoTurmaProfessor = async function (idCursoTurmaProfessor) {
    let statusId = await cursoTurmaProfessorDAO.selectCursoTurmaProfessorByID(idCursoTurmaProfessor);

    if (statusId) {
        if (idCursoTurmaProfessor == '' || idCursoTurmaProfessor == undefined || isNaN(idCursoTurmaProfessor)) {
            return message.ERROR_INVALID_ID; //Status code 400
        } else {
            let resultDados = await cursoTurmaProfessorDAO.deleteCursoTurmaProfessor(idCursoTurmaProfessor)

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


const getCursosTurmasMateriasIDProfessor = async (idProfessor) => {

    if (idProfessor == null || idProfessor == undefined || idProfessor == '') {
        return message.ERROR_INVALID_ID
    } else {

        let dadosJSON = {}

        let dadosCursosTurmasProfessores = await cursoTurmaProfessorDAO.selectCursoTurmaMateriaByIDProfessor(idProfessor)

        if (dadosCursosTurmasProfessores) {

            dadosJSON.status = message.SUCESS_CREATED_ITEM.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.cursos_turmas_materias_do_professor = dadosCursosTurmasProfessores

            return dadosJSON
        } else {
            return message.ERROR_INVALID_ID
        }

    }
}





module.exports = {
    inserirCursoTurmaProfessor,
    atualizarCursoTurmaDoProfessor,
    getCursoTurmaProfessor,
    getCursoTurmaProfessorID,
    deletarCursoTurmaProfessor,
    getCursosTurmasMateriasIDProfessor
}