/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos Tipos de TAREFAS no Banco de Dados
 * Data: 27/05/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

//////////////////Insert///////////////
const insertTipoTarefa = async function (dadosTipoTarefa) {
    let sql = `insert into tbl_tipo_tarefa (
            tipo
    ) values (
            '${dadosTipoTarefa.tipo}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//////////////////Delets///////////////
const deleteTipoTarefa = async function (id) {
    let idTipoTarefa = id;

    let sql = `delete from tbl_tipo_tarefa where id = ${idTipoTarefa}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

///////////////////////Updates/////////
const updateTipoTarefa = async function (dadosTipoTarefa) {
    let sql = `update tbl_tipo_tarefa set
                    tipo = '${dadosTipoTarefa.tipo}'
                where id = ${dadosTipoTarefa.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);
    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}


//////////////////Selects///////////////
const selectAllTipoTarefa = async function () {
    let sql = 'select * from tbl_tipo_tarefa'

    let rsTipo = await prisma.$queryRawUnsafe(sql)

    if (rsTipo.length > 0)
        return rsTipo
    else
        return false

}


const selectLastId = async function () {
    let sql = `select * from tbl_tipo_tarefa order by id desc limit 1;`

    let rsTipoTarefa = await prisma.$queryRawUnsafe(sql)

    if (rsTipoTarefa.length > 0)
        return rsTipoTarefa
    else
        return false
}

const selectTipoTarefaByID = async function (id) {
    let idTipoTarefa = id

    let sql = `select * from tbl_tipo_tarefa where id = ${idTipoTarefa}`;

    let rsTipoTarefaId = await prisma.$queryRawUnsafe(sql);

    if (rsTipoTarefaId.length > 0) {
        return rsTipoTarefaId;
    }
    else {
        return false;
    }
}


module.exports = {
    insertTipoTarefa,
    deleteTipoTarefa,
    updateTipoTarefa,
    selectAllTipoTarefa,
    selectLastId,
    selectTipoTarefaByID
}