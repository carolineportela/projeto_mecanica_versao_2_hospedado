/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos CRITERIOS no Banco de Dados
 * Data: 22/05/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()

////////////////////////Inserts//////////////////////////
const insertCriterio = async function (dadosCriterio) {
    let sql = `insert into tbl_criterio (
        descricao,
        id_tarefa,
        id_tipo_criterio
    ) values (
        '${dadosCriterio.descricao}',
        ${dadosCriterio.id_tarefa},
        ${dadosCriterio.id_tipo_criterio}
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//////////////////////Deletes///////////////////////////
const deleteCriterio = async function (id) {
    let sql = `delete from tbl_criterio where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

const updateCriterio = async function (dadosCriterio) {
    let sql = `update tbl_criterio set
                    descricao = '${dadosCriterio.descricao}',
                    id_tipo_criterio = ${dadosCriterio.id_tipo_criterio},
                    id_tarefa = ${dadosCriterio.id_tarefa}
                where id = ${dadosCriterio.id}    
    `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

///////////////////////Selects//////////////////////////
const selectAllCriterio = async function () {
    let sql = `select * from tbl_criterio`

    let rsCriterio = await prisma.$queryRawUnsafe(sql)

    if (rsCriterio.length > 0)
        return rsCriterio
    else
        return false
}

///////////////////////Selects Criterio ID//////////////////////////
const selectCriterioByID = async function (id) {
    let sql = `select * from tbl_criterio where id = ${id}`

    let rsCriterio = await prisma.$queryRawUnsafe(sql)

    if (rsCriterio.length > 0)
        return rsCriterio
    else
        return false
}

const selectLastId = async function () {
    let sql = `select * from tbl_criterio order by id desc limit 1;`

    let rsCriterio = await prisma.$queryRawUnsafe(sql)

    if (rsCriterio.length > 0)
        return rsCriterio
    else
        return false
}

module.exports = {
    insertCriterio,
    deleteCriterio,
    updateCriterio,
    selectAllCriterio,
    selectCriterioByID,
    selectLastId
}