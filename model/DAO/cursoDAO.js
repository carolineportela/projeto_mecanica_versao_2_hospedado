/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados dos CURSOS no Banco de Dados
 * Data: 19/05/2023
 * Autor: Mateus Alves
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var {PrismaClient} = require('@prisma/client')

var prisma = new PrismaClient()

const insertCurso = async function(dadosCurso) {
    let sql = `insert into tbl_curso (
        nome,
        sigla,
        descricao,
        carga_horaria
    ) values (
        '${dadosCurso.nome}',
        '${dadosCurso.sigla}',
        '${dadosCurso.descricao}',
        '${dadosCurso.carga_horaria}'
    )`
       
    //Executa o scrip sql no banco de dados        
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }

}

//////////////////////Deletes///////////////////////////
const deleteCurso = async function(id) {
    let idCurso = id;

    let sql = `delete from tbl_curso where id = ${idCurso}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

///////////////////////Updates//////////////////////////
const updateCurso = async function(dadosCurso) {
    let sql = `update tbl_curso set
                    nome = '${dadosCurso.nome}',
                    sigla = '${dadosCurso.sigla}',
                    descricao = '${dadosCurso.descricao}',
                    carga_horaria = '${dadosCurso.carga_horaria}'
                where id = ${dadosCurso.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);
      if (resultStatus) {
          return true;
      } else {
          return false;
      }
}

///////////////////////Selects//////////////////////////
const selectAllCursos = async function() {
    let sql = `select * from tbl_curso`
    
    let rsCurso = await prisma.$queryRawUnsafe(sql)

    if (rsCurso.length > 0) {
        return rsCurso;
    }
    else {
        return false;
    }
}


const selectLastId = async function() {
    let sql = `select * from tbl_curso order by id desc limit 1;`

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if(rsAluno.length > 0)
        return rsAluno
    else
        return false
}

const selectCursoByID = async function (id) {
    let idCurso = id

    let sql = `select * from tbl_curso where id = ${idCurso}`;

    let rsCurso = await prisma.$queryRawUnsafe(sql);

    if (rsCurso) {
        return rsCurso;
    }
    else {
        return false;
    }
}

module.exports = {
    insertCurso,
    deleteCurso,
    updateCurso,
    selectAllCursos,
    selectLastId,
    selectCursoByID
}