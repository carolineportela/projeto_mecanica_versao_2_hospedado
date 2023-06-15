/***************************************************************************************************************************************************
 * Objetivo: Responsavel pela manipulação de dados de Registro Tempo no Banco de Dados
 * Data: 06/06/2023
 * Autor: Caroline Portela
 * Versão: 1.0
 ***************************************************************************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

var prisma = new PrismaClient()


const insertRegistroTempo = async function (dadosRegistroTempo) {

    let sql = `insert into tbl_registro_tempo (
        data,
        hora_inicio,
        hora_termino,
        tempo_intervalo,
        observacao,
        id_tarefa
    ) values (
        '${dadosRegistroTempo.data}',
        '${dadosRegistroTempo.hora_inicio}',
        '${dadosRegistroTempo.hora_termino}',
        '${dadosRegistroTempo.tempo_intervalo}',
        '${dadosRegistroTempo.observacao}',
         ${dadosRegistroTempo.id_tarefa}
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}


const updateRegistroTempo = async function (dadosRegistroTempo) {
    let sql = `update tbl_registro_tempo set
                   data = '${dadosRegistroTempo.data}',
                   hora_inicio = '${dadosRegistroTempo.hora_inicio}',
                   hora_termino = '${dadosRegistroTempo.hora_termino}',
                   tempo_intervalo = '${dadosRegistroTempo.tempo_intervalo}',
                   observacao = '${dadosRegistroTempo.observacao}',
                   id_tarefa = ${dadosRegistroTempo.id_tarefa}
               where id = ${dadosRegistroTempo.id}    
           `

    //Executa o scriptSQL no BD
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus)
        return true
    else
        return false
}

const selectAllRegistroTempo = async function() {
    let sql = `select * from tbl_registro_tempo`
    
    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs;
    }
    else {
        return false;
    }
}

const selectRegistroTempoByID = async function (id) {
    let idRegistroTempo = id

    let sql = `select * from tbl_registro_tempo where id = ${idRegistroTempo}`;

    let rs = await prisma.$queryRawUnsafe(sql);

    if (rs) {
        return rs;
    }
    else {
        return false;
    }
}

const deleteRegistroTempo = async function(id) {
    let idRegistro = id;

    let sql = `delete from tbl_registro_tempo where id = ${idRegistro}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true;
    } else {
        return false;
    }
}

// Retorna os registro de tempo de uma tarefa especifica
const selectRegistroTempoByIDTarefa = async function (idTarefa) {
    let idDaTarefa = idTarefa

    let sql = ` 
            select
            tbl_tarefa.nome as nome_tarefa, tbl_tarefa.numero as numero_tarefa,
            tbl_tarefa.tempo_previsto as tempo_previsto,
            tbl_registro_tempo.data as data,
            tbl_registro_tempo.hora_inicio as hora_inicio,
            tbl_registro_tempo.hora_termino as hora_termino,
            tbl_registro_tempo.tempo_intervalo as tempo_intervalo,
            tbl_registro_tempo.observacao as obsevacao
            from tbl_tarefa
            inner join tbl_registro_tempo
                on tbl_tarefa.id = tbl_registro_tempo.id_tarefa
            where tbl_tarefa.id = ${idDaTarefa};`

    let rs = await prisma.$queryRawUnsafe(sql)

    if (rs.length > 0) {
        return rs
    } else {
        return false;
    }

}



const selectLastId = async function () {
    let sql = `select * from tbl_registro_tempo order by id desc limit 1;`

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false;
    }
}

module.exports = {
    insertRegistroTempo,
    selectLastId,
    updateRegistroTempo,
    selectRegistroTempoByID,
    selectAllRegistroTempo,
    deleteRegistroTempo,
    selectRegistroTempoByIDTarefa
}