/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos RESULTADOS OBTIDOS no Banco de Dados
 * Data: 06/06/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

const insertResultado = async function (dadosResultadoObtido) {

    let sql = `insert into tbl_resultado_obtido (
            resultado,
            id_matricula,
            id_criterio
    ) values (
            '${dadosResultadoObtido.resultado}',
            '${dadosResultadoObtido.id_matricula}',
            '${dadosResultadoObtido.id_criterio}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

const updateResultado = async function (dadosResultadoObtido) {
    let sql =      `update tbl_resultado_obtido set
                    resultado = '${dadosResultadoObtido.resultado}',
                    id_criterio = ${dadosResultadoObtido.id_criterio},
                    id_matricula = ${dadosResultadoObtido.id_matricula}
                 
                    where id = ${dadosResultadoObtido.id}    
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

    let sql = `select * from tbl_resultado_obtido`

    let rsResultado = await prisma.$queryRawUnsafe(sql)

    if (rsResultado.length > 0) {
        return rsResultado
    } else {
        return false
    }

}

const getResultadoByID = async function (id) {

    let sql = `select * from tbl_resultado_obtido where id = ${id}`

    let rsResultadoID = await prisma.$queryRawUnsafe(sql)

    if (rsResultadoID.length > 0) {
        return rsResultadoID
    } else {
        return false
    }
}


const deleteResultadoObtido = async function(id) {
    let sql = `delete from tbl_resultado_obtido where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

const selectLastId = async function () {
    let sql = `select * from tbl_resultado_obtido order by id desc limit 1;`

    let rsResultado = await prisma.$queryRawUnsafe(sql)

    if (rsResultado.length > 0)
        return rsResultado
    else
        return false
}


module.exports = {
    insertResultado,
    getAllResultados,
    getResultadoByID,
    selectLastId,
    deleteResultadoObtido,
    updateResultado
}