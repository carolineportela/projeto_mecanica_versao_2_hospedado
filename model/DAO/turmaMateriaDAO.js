/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das MATERIAS das TURMAS no Banco de Dados
 * Data: 28/05/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()


const insertTurmaMateria = async function (dadosTurmaMateria) {
    let sql = `insert into tbl_turma_materia (
        id_turma,
        id_materia
    ) values (
        ${dadosTurmaMateria.id_turma},
        ${dadosTurmaMateria.id_materia}
    )`
    //Executa o scrip sql no banco de dados        
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }

}

const updateTurmaMateria = async function(dadosTurmaMateria) {
    let sql = `update tbl_turma_materia set
                    id_turma = '${dadosTurmaMateria.id_turma}',
                    id_materia = '${dadosTurmaMateria.id_materia}'
                where id = ${dadosTurmaMateria.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);
      if (resultStatus) {
          return true;
      } else {
          return false;
      }
}


const deleteTurmaMateria = async function(id) {
    let idTurmaMateria = id;

    let sql = `delete from tbl_turma_materia where id = ${idTurmaMateria}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

const selectAllTurmasMaterias = async function () {
    let sql = `select * from tbl_turma_materia`

    let rsTurmaTarefaID = await prisma.$queryRawUnsafe(sql)

    if (rsTurmaTarefaID.length > 0) {
        return rsTurmaTarefaID;
    }
    else {
        return false;
    }

}

const selectTurmaMateriaByID = async function (id) {
    let sql = `select * from tbl_turma_materia where id = ${id}`;

    let rsTurmaMateria = await prisma.$queryRawUnsafe(sql);

    if (rsTurmaMateria.length > 0) {
        return rsTurmaMateria;
    }
    else {
        return false;
    }
}

const insertTurmaMateriaComProcedore = async function (dados) {

    let sql = ` CALL insert_turma_materia (
            '${dados.materia_nome}',
            '${dados.materia_sigla}',
             ${dados.turma_id}

            );`

    let rs = await prisma.$queryRawUnsafe(sql);

    if (rs) {
        return true;
    } else {
        return false;
    }
}

const selectLastId = async function() {
    let sql = `select * from tbl_turma_materia order by id desc limit 1;`

    let rsTurmaMateria = await prisma.$queryRawUnsafe(sql)

    if(rsTurmaMateria.length > 0)
        return rsTurmaMateria
    else
        return false
}

module.exports = {
    selectAllTurmasMaterias,
    selectTurmaMateriaByID,
    insertTurmaMateria,
    deleteTurmaMateria,
    selectLastId,
    updateTurmaMateria,
    insertTurmaMateriaComProcedore
}