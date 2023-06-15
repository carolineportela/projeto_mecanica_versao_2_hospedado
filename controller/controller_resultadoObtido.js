/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de resultado obtido
 * (GET, POST, PUT, DELETE)
 * Data: 06/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import do arquivo de configuração das variaveis, constantes e funções globais
var message = require('./modulo/config.js')
var resultadoObtidoDAO = require('../model/DAO/resultadoObtidoDAO.js')

const inserirResultadoObtido = async function (dadosResultadoObtido) {

   if (dadosResultadoObtido.resultado == '' || dadosResultadoObtido.resultado == undefined ||
       dadosResultadoObtido.id_matricula == '' || dadosResultadoObtido.id_matricula == undefined ||
       dadosResultadoObtido.id_criterio == '' || dadosResultadoObtido.id_criterio == undefined) {
       return message.ERROR_REQUIRED_FIELDS
   } else {

       let resultDadosResultadoObtido = await resultadoObtidoDAO.insertResultado(dadosResultadoObtido)

       if (resultDadosResultadoObtido) {
           let novoResultado = await resultadoObtidoDAO.selectLastId()

           let dadosResultadoObtidoJSON = {}
           dadosResultadoObtidoJSON.status = message.SUCESS_CREATED_ITEM.status
           dadosResultadoObtidoJSON.resultado = novoResultado

           return dadosResultadoObtidoJSON
       } else {
           return message.ERROR_INTERNAL_SERVER
       }
   }
}

const atualizarResultadoObtido = async function (dadosResultadoObtido, idResultadoObtido) {

   if (dadosResultadoObtido.resultado == '' || dadosResultadoObtido.resultado == undefined ||
       dadosResultadoObtido.id_matricula == '' || dadosResultadoObtido.id_matricula == undefined ||
       dadosResultadoObtido.id_criterio == '' || dadosResultadoObtido.id_criterio == undefined
   ) {
       return message.ERROR_REQUIRED_FIELDS
   } else if (idResultadoObtido == '' || idResultadoObtido == undefined || idResultadoObtido == isNaN(idResultadoObtido)) {
       return message.ERROR_INVALID_ID
   } else {
       //Adiciona o id no JSON dos dados
       dadosResultadoObtido.id = idResultadoObtido;

       let statusId = await resultadoObtidoDAO.getResultadoByID(idResultadoObtido)

       if (statusId) {

           let resultDadosResultadoObtido = await resultadoObtidoDAO.updateResultado(dadosResultadoObtido);

           if (resultDadosResultadoObtido) {

               let dadosResultadoJSON = {}

               dadosResultadoJSON.status = message.SUCESS_UPDATED_ITEM.status
               dadosResultadoJSON.message = message.SUCESS_UPDATED_ITEM.message
               dadosResultadoJSON.resultado = dadosResultadoObtido
               return dadosResultadoJSON
           } else
               return message.ERROR_INTERNAL_SERVER

       } else {
           return message.ERROR_NOT_FOUND
       }
   }

}

const getResultadosObtidos = async function () {
    let resultadosJSON = {}

    let resultados = await resultadoObtidoDAO.getAllResultados()

    if (resultados) {

        resultadosJSON.status = message.SUCESS_REQUEST.status
        resultadosJSON.message = message.SUCESS_REQUEST.message
        resultadosJSON.quantidade = resultadosJSON.length;
        resultadosJSON.todosResultadosObtidos = resultados

        return resultadosJSON

    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getResultadoPorID = async function (id) {

    if(id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJSON = {}

        let dadosResultadoObtido = await resultadoObtidoDAO.getResultadoByID(id)

        if(dadosResultadoObtido) {
            dadosJSON.status = message.SUCESS_REQUEST.status
            dadosJSON.message = message.SUCESS_REQUEST.message
            dadosJSON.resultadoObtidos = dadosResultadoObtido
            return dadosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const deletarResultadoObtido = async function (idResultadoObtido) {

   let statusId = await resultadoObtidoDAO.getResultadoByID(idResultadoObtido);

   if (statusId) {

       if (idResultadoObtido == '' || idResultadoObtido == undefined || isNaN(idResultadoObtido)) {
           return message.ERROR_INVALID_ID;
       } else {
           let resultDados = await resultadoObtidoDAO.deleteResultadoObtido(idResultadoObtido)

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

module.exports = {
   inserirResultadoObtido,
   atualizarResultadoObtido,
   deletarResultadoObtido,
   getResultadosObtidos,
   getResultadoPorID
}