/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados de resultado desejado no Banco de Dados
 * Data: 07/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()


const insertResultadoDesejado = async function (dadosResultadoDesejado) {

    let sql = `insert into tbl_resultado_desejado (
        resultado,
        id_criterio
        ) values (
        '${dadosResultadoDesejado.resultado}',
        '${dadosResultadoDesejado.id_criterio}'
        )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}


const updateResultadoDesejado = async function (dadosResultadoDesejado) {
    let sql = `update tbl_resultado_desejado set
                    resultado = '${dadosResultadoDesejado.resultado}',
                    id_criterio = ${dadosResultadoDesejado.id_criterio}
                 
                    where id = ${dadosResultadoDesejado.id}    
                `
    //Executa o scrip sql no banco de dados        
    let resultStatus = await prisma.$executeRawUnsafe(sql);
    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

const getAllResultados = async function () {

    let sql = `select * from tbl_resultado_desejado`

    let rsResultado = await prisma.$queryRawUnsafe(sql)

    if (rsResultado.length > 0) {
        return rsResultado
    } else {
        return false
    }

}


const getResultadoByID = async function (id) {

    let sql = `select * from tbl_resultado_desejado where id = ${id}`

    let rsResultadoID = await prisma.$queryRawUnsafe(sql)

    if (rsResultadoID.length > 0) {
        return rsResultadoID
    } else {
        return false
    }
}

const deleteResultadoDesejado = async function(id) {
    let sql = `delete from tbl_resultado_desejado where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

const selectLastId = async function () {
    let sql = `select * from tbl_resultado_desejado order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0)
        return rs
    else
        return false
}



module.exports = {
    insertResultadoDesejado,
    updateResultadoDesejado,
    selectLastId,
    getResultadoByID,
    getAllResultados,
    deleteResultadoDesejado
}