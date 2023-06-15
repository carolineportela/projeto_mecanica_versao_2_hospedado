/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados de margem erro no Banco de Dados
 * Data: 06/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

const insertMargemErro = async function (dadosMargemErro) {

    let sql = `insert into tbl_margem_erro (
        valor_minimo,
        valor_maximo,
        id_criterio
        ) values (
        '${dadosMargemErro.valor_minimo}',
        '${dadosMargemErro.valor_maximo}',
        '${dadosMargemErro.id_criterio}'
        )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}


const updateMargemErro = async function (dadosMargemErro) {
    let sql = `     update tbl_margem_erro set
                    valor_minimo = '${dadosMargemErro.valor_minimo}',
                    valor_maximo = '${dadosMargemErro.valor_maximo}',
                    id_criterio = '${dadosMargemErro.id_criterio}'
                    where id = ${dadosMargemErro.id}    
                `
    //Executa o scrip sql no banco de dados        
    let resultStatus = await prisma.$executeRawUnsafe(sql);
    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

const getAllMargemErro = async function () {

    let sql = `select * from tbl_margem_erro`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false
    }

}

const selectMargemErroByID = async function (id) {

    let sql = `select * from tbl_margem_erro where id = ${id}`

    let rsMargemErroID = await prisma.$queryRawUnsafe(sql)

    if (rsMargemErroID.length > 0) {
        return rsMargemErroID
    } else {
        return false
    }
}

const deleteMargemErro = async function (id) {
    let sql = `delete from tbl_margem_erro where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}


const selectLastId = async function () {
    let sql = `select * from tbl_margem_erro order by id desc limit 1;`

    let rsResultado = await prisma.$queryRawUnsafe(sql)

    if (rsResultado.length > 0)
        return rsResultado
    else
        return false
}





module.exports = {
    insertMargemErro,
    updateMargemErro,
    getAllMargemErro,
    selectMargemErroByID,
    deleteMargemErro,
    selectLastId
}