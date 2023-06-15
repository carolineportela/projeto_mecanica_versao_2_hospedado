/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos Tipos de Usuario no Banco de Dados
 * Data: 07/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()

const insertTipoUsuario = async function (dadosTipoUsuario) {
    let sql = `insert into tbl_tipo_usuario (
            tipo
    ) values (
            '${dadosTipoUsuario.tipo}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}
const selectAllTipos = async function() {
    let sql = 'select * from tbl_tipo_usuario'
    
    let rsTipo = await prisma.$queryRawUnsafe(sql)

    if(rsTipo.length > 0)
        return rsTipo
    else
        return false
    
}

const deleteTipoUsuario = async function (id) {
    let idTipoUsuario = id;

    let sql = `delete from tbl_tipo_usuario where id = ${idTipoUsuario}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

const selectTipoUsuarioByID = async function (id) {
    let idTipoUsuario = id

    let sql = `select * from tbl_tipo_usuario where id = ${idTipoUsuario}`;

    let rs = await prisma.$queryRawUnsafe(sql);

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}


const selectLastId = async function() {
    let sql = `select * from tbl_tipo_usuario order by id desc limit 1;`

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if(rsAluno.length > 0)
        return rsAluno
    else
        return false
}

module.exports = {
    insertTipoUsuario,
    selectLastId,
    selectAllTipos,
    deleteTipoUsuario,
    selectTipoUsuarioByID
}