/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados das MATERIAS das TURMAS no Banco de Dados
 * Data: 08/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/


var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

const insertCursoMateria = async function (dadosCursoMateria) {
    let sql = `insert into tbl_curso_materia (
        id_curso,
        id_materia
    ) values (
        ${dadosCursoMateria.id_curso},
        ${dadosCursoMateria.id_materia}
    )`
    //Executa o scrip sql no banco de dados        
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }

}


const updateCursoMateria = async function(dadosCursoMateria) {
    let sql = `update tbl_curso_materia set
                    id_curso = ${dadosCursoMateria.id_curso},
                    id_materia = ${dadosCursoMateria.id_materia}
                where id = ${dadosCursoMateria.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);
      if (resultStatus) {
          return true;
      } else {
          return false;
      }
}


const deleteCursoMateria = async function(id) {
    let idCursoMateria = id;

    let sql = `delete from tbl_curso_materia where id = ${idCursoMateria}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

const selectAllCursoMateria = async function () {
    let sql = `select * from tbl_curso_materia`

    let rsTurmaMateriaID = await prisma.$queryRawUnsafe(sql)

    if (rsTurmaMateriaID.length > 0) {
        return rsTurmaMateriaID;
    }
    else {
        return false;
    }

}

const selectCursoMateriaByID = async function (id) {
    let sql = `select * from tbl_curso_materia where id = ${id}`;

    let rsTurmaMateria = await prisma.$queryRawUnsafe(sql);

    if (rsTurmaMateria.length > 0) {
        return rsTurmaMateria;
    }
    else {
        return false;
    }
}



const selectLastId = async function() {
    let sql = `select * from tbl_curso_materia order by id desc limit 1;`

    let rs= await prisma.$queryRawUnsafe(sql)

    if(rs.length > 0)
        return rs
    else
        return false
}


module.exports = {
    insertCursoMateria,
    selectLastId,
    updateCursoMateria,
    selectCursoMateriaByID,
    selectAllCursoMateria,
    deleteCursoMateria

}