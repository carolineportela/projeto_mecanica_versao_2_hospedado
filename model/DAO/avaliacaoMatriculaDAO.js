/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das AVALIACOES dos ALUNOS pela MATRICULA no Banco de Dados
 * Data: 06/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

const insertAvaliacaoAluno = async function (dadosAvaliacaoAluno) {
    let sql = `insert into tbl_avaliacao_matricula (
        resultado,
        id_matricula,
        id_criterio
        ) values (
        '${dadosAvaliacaoAluno.resultado}',
        '${dadosAvaliacaoAluno.id_matricula}',
        '${dadosAvaliacaoAluno.id_criterio}'
    )`
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

const updateAvaliacaoAluno = async function (dadosAvaliacaoAluno) {
    let sql = `update tbl_avaliacao_matricula set
                    id_matricula = '${dadosAvaliacaoAluno.id_matricula}',
                    id_criterio = '${dadosAvaliacaoAluno.id_criterio}'
                where id = ${dadosAvaliacaoAluno.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);
    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

const deleteAvaliacaoAluno = async function (id) {
    let idAvaliacaoAluno = id;

    let sql = `delete from tbl_avaliacao_matricula where id = ${idAvaliacaoAluno}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

const selectAllAvaliacoesAlunos = async function () {

    let sql = `select * from tbl_avaliacao_matricula`

    let rsAvaliacao = await prisma.$queryRawUnsafe(sql)

    if (rsAvaliacao.length > 0) {
        return rsAvaliacao
    } else {
        return false
    }
}

const selectAvaliacaoAlunoByID = async function (id) {

    let sql = `select * from tbl_avaliacao_matricula where id = ${id}`

    let rsAvaliacao = await prisma.$queryRawUnsafe(sql)

    if (rsAvaliacao.length > 0) {
        return rsAvaliacao
    } else {
        return false
    }
}

const selectLastId = async function () {
    let sql = `select * from tbl_avaliacao_matricula order by id desc limit 1;`

    let rsAvaliacaoAluno = await prisma.$queryRawUnsafe(sql)

    if (rsAvaliacaoAluno.length > 0)
        return rsAvaliacaoAluno
    else
        return false
}


module.exports = {
    insertAvaliacaoAluno,
    selectAllAvaliacoesAlunos,
    selectAvaliacaoAlunoByID,
    selectLastId,
    updateAvaliacaoAluno,
    deleteAvaliacaoAluno
}