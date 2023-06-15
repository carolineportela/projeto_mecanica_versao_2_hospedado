/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados Cursos e Materias no Banco de Dados
 * Data: 10/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/


var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()

const insertCursoTurmaProfessor = async function (dadosCursoTurmaProfessor) {
    let sql = `insert into tbl_curso_turma_professor (     
        id_curso,
        id_turma,
        id_professor        
    ) values (
        ${dadosCursoTurmaProfessor.id_curso},
        ${dadosCursoTurmaProfessor.id_turma},
        ${dadosCursoTurmaProfessor.id_professor}
    )`
    //Executa o scrip sql no banco de dados        
    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus) {
        return true;
    } else {
        return false;
    }

}

const updateCursoTurmaProfessor = async function (dadosCursoTurmaProfessor) {
    let sql = `update tbl_curso_turma_professor set
                    id_curso = ${dadosCursoTurmaProfessor.id_curso},
                    id_turma = ${dadosCursoTurmaProfessor.id_turma},
                    id_professor = ${dadosCursoTurmaProfessor.id_professor}
                   
                where id = ${dadosCursoTurmaProfessor.id}    
            `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql);
    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

const deleteCursoTurmaProfessor = async function (id) {
    let idCursoProfessor = id;

    let sql = `delete from tbl_curso_turma_professor where id = ${idCursoProfessor}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

const selectCursoTurmaProfessorByID = async function (id) {
    let sql = `select * from tbl_curso_turma_professor where id = ${id}`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0)
        return rs
    else
        return false
}


const selectAllCursoTurmaProfessor = async function () {
    let sql = `select * from tbl_curso_turma_professor`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }

}


// Retorna o curso,turma e materia filtrando pelo id do professor
const selectCursoTurmaMateriaByIDProfessor = async function (idProfessor) {
    let idCursoTurmaMateriaProfessor = idProfessor

    let sql = ` select
                tbl_curso.nome as nome_curso, tbl_curso.sigla as sigla_curso,
                tbl_turma.nome as nome_turma, tbl_turma.sigla as sigla_turma,
                tbl_professor.nome as nome_professor,
                tbl_materia.nome as nome_materia
                    from tbl_curso_turma_professor
                inner join tbl_curso
                     on tbl_curso.id = tbl_curso_turma_professor.id_curso
                inner join tbl_turma
                     on tbl_turma.id = tbl_curso_turma_professor.id_turma
                inner join tbl_turma_materia
                    on tbl_turma_materia.id_turma = tbl_curso_turma_professor.id_turma
                inner join tbl_materia
                    on tbl_materia.id = tbl_turma_materia.id_materia
                 inner join tbl_professor
                    on tbl_professor.id = tbl_curso_turma_professor.id_professor

                where tbl_curso_turma_professor.id_professor =  ${idCursoTurmaMateriaProfessor}`;

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false;
    }


}


const selectLastId = async function () {
    let sql = `select * from tbl_curso_turma_professor order by id desc limit 1;`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0)
        return rs
    else
        return false
}

module.exports = {
    insertCursoTurmaProfessor,
    updateCursoTurmaProfessor,
    deleteCursoTurmaProfessor,
    selectAllCursoTurmaProfessor,
    selectCursoTurmaProfessorByID,
    selectCursoTurmaMateriaByIDProfessor,
    selectLastId
}