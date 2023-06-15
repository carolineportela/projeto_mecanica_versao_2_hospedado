/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados da tabela intermedia materia_tarefa
 * Data: 08/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()


const insertMateriaTarefa = async function (dadosMateriaTarefa) {
    let sql = `insert into tbl_materia_tarefa (
        id_materia,
        id_tarefa
    ) values (
        ${dadosMateriaTarefa.id_materia},
        ${dadosMateriaTarefa.id_tarefa}
    )`
    //Executa o scrip sql no banco de dados        
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }

}

const updateMateriaTarefa = async function(dadosMateriaTarefa) {
    let sql = `update tbl_materia_tarefa set
                    id_materia = ${dadosMateriaTarefa.id_materia},
                    id_tarefa = ${dadosMateriaTarefa.id_tarefa}
                where id = ${dadosMateriaTarefa.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);
      if (resultStatus) {
          return true;
      } else {
          return false;
      }
}


const deleteMateriaTarefa = async function(id) {
    let idMateriaTarefa = id;

    let sql = `delete from tbl_materia_tarefa where id = ${idMateriaTarefa}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

const selectAllMateriaTarefa = async function () {
    let sql = `select * from tbl_materia_tarefa`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    }
    else {
        return false;
    }

}

const selectMateriaTarefaByID = async function (id) {
    let sql = `select * from tbl_materia_tarefa where id = ${id}`;

    let rs = await prisma.$queryRawUnsafe(sql);

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}
const selectLastId = async function() {
    let sql = `select * from tbl_materia_tarefa order by id desc limit 1;`

    let rsTurmaMateria = await prisma.$queryRawUnsafe(sql)

    if(rsTurmaMateria.length > 0)
        return rsTurmaMateria
    else
        return false
}

module.exports = {
    selectAllMateriaTarefa,
    selectMateriaTarefaByID,
    insertMateriaTarefa,
    deleteMateriaTarefa,
    selectLastId,
    updateMateriaTarefa
}