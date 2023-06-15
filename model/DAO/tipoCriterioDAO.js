/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos Tipos de Criterio no Banco de Dados
 * Data: 27/05/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

//////////////////Insert///////////////
const insertTipoCriterio = async function (dadosTipoCriterio) {
    let sql = `insert into tbl_tipo_criterio (
            tipo
    ) values (
            '${dadosTipoCriterio.tipo}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//////////////////Delets///////////////
const deleteTipoCriterio = async function (id) {
    let idCriterio = id;

    let sql = `delete from tbl_tipo_criterio where id = ${idCriterio}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

///////////////////////Updates/////////
const updateTipoCriterio = async function (dadosTipoCriterio) {
    let sql = `update tbl_tipo_criterio set
                    tipo = '${dadosTipoCriterio.tipo}'
                where id = ${dadosTipoCriterio.id}    
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
const selectAllTipos = async function () {
    let sql = 'select * from tbl_tipo_criterio'

    let rsTipo = await prisma.$queryRawUnsafe(sql)

    if (rsTipo.length > 0)
        return rsTipo
    else
        return false

}


const selectLastId = async function () {
    let sql = `select * from tbl_tipo_criterio order by id desc limit 1;`

    let rsCriterio = await prisma.$queryRawUnsafe(sql)

    if (rsCriterio.length > 0)
        return rsCriterio
    else
        return false
}

const selectCriterioByID = async function (id) {
    let idCriterio = id

    let sql = `select * from tbl_tipo_criterio where id = ${idCriterio}`;

    let rsCriterioId = await prisma.$queryRawUnsafe(sql);

    if (rsCriterioId.length > 0) {
        return rsCriterioId;
    }
    else {
        return false;
    }
}
////////

module.exports = {
    insertTipoCriterio,
    selectLastId,
    selectAllTipos,
    deleteTipoCriterio,
    selectCriterioByID,
    updateTipoCriterio
}