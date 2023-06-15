/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das AVALIACOES do PROFESSOR no Banco de Dados
 * Data: 28/05/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

const insertAvaliacaoProfessor = async function (dadosAvaliacaoProfessor) {
    let sql = `insert into tbl_avaliacao_professor (
            resultado,
            id_professor,
            id_criterio
    ) values (
            '${dadosAvaliacaoProfessor.resultado}',
            '${dadosAvaliacaoProfessor.id_professor}',
            '${dadosAvaliacaoProfessor.id_criterio}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

///////////////////////Updates//////////////////////////
const updateAvaliacaoProfessor = async function(dadosAvaliacaoProfessor) {
    let sql = `update tbl_avaliacao_professor set
                    id_professor = '${dadosAvaliacaoProfessor.id_professor}',
                    id_criterio = '${dadosAvaliacaoProfessor.id_criterio}'
                where id = ${dadosAvaliacaoProfessor.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);
      if (resultStatus) {
          return true;
      } else {
          return false;
      }
}

const deleteAvaliacaoProfessor = async function(id) {
    let idAvaliacaoProfessor = id;

    let sql = `delete from tbl_avaliacao_professor where id = ${idAvaliacaoProfessor}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}


const selectAllAvaliacoesProfessores = async function () {

    let sql = `select * from tbl_avaliacao_professor`

    let rsAvaliacao = await prisma.$queryRawUnsafe(sql)

    if (rsAvaliacao.length > 0) {
        return rsAvaliacao
    } else {
        return false
    }
}

const selectAvaliacaoProfessorByID = async function (id) {

    let sql = `select * from tbl_avaliacao_professor where id = ${id}`

    let rsAvaliacao = await prisma.$queryRawUnsafe(sql)

    if (rsAvaliacao.length > 0) {
        return rsAvaliacao
    } else {
        return false
    }
}

const selectLastId = async function () {
    let sql = `select * from tbl_avaliacao_professor order by id desc limit 1;`

    let rsProfessor = await prisma.$queryRawUnsafe(sql)

    if (rsProfessor.length > 0) {
        return rsProfessor
    } else {
        return false;
    }
}


module.exports = {
    insertAvaliacaoProfessor,
    selectAllAvaliacoesProfessores,
    selectAvaliacaoProfessorByID,
    updateAvaliacaoProfessor,
    selectLastId,
    deleteAvaliacaoProfessor
}