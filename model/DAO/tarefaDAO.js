/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das TAREFAS no Banco de Dados
 * Data: 05/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertTarefa = async function (dadosTarefa) {
    let sql = `insert into tbl_tarefa (
        nome,
        numero,
        tempo_previsto,
        id_tipo_tarefa
    ) values (
        '${dadosTarefa.nome}',
        '${dadosTarefa.numero}',
        '${dadosTarefa.tempo_previsto}',
        ${dadosTarefa.id_tipo_tarefa}
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

//////////////////////Deletes///////////////////////////
const deleteTarefa = async function (id) {
    let sql = `delete from tbl_tarefa where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

///////////////////////Updates//////////////////////////
const updateTarefa = async function (dadosTarefa) {
    let sql = `update tbl_tarefa set
                    nome = '${dadosTarefa.nome}',
                    numero = '${dadosTarefa.numero}',
                    tempo_previsto = '${dadosTarefa.tempo_previsto}',
                    id_tipo_tarefa = '${dadosTarefa.id_tipo_tarefa}'
                where id = ${dadosTarefa.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

///////////////////////Selects//////////////////////////
const selectAllTarefas = async function () {
    let sql = `select * from tbl_tarefa`

    let rsTarefa = await prisma.$queryRawUnsafe(sql)

    if (rsTarefa.length > 0)
        return rsTarefa
    else
        return false
}

const selectTarefaByID = async function (id) {

    let sql = `select * from tbl_tarefa where id = ${id}`;

    let rsTarefaId = await prisma.$queryRawUnsafe(sql);

    if (rsTarefaId.length > 0) {
        return rsTarefaId;
    }
    else {
        return false;
    }
}

const selectLastId = async function () {
    let sql = `select * from tbl_tarefa order by id desc limit 1;`

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false;
    }
}

module.exports = {
    insertTarefa,
    deleteTarefa,
    updateTarefa,
    selectAllTarefas,
    selectTarefaByID,
    selectLastId
}