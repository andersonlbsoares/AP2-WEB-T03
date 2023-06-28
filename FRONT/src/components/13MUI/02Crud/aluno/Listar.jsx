import { TableContainer, Typography, Table, Paper, TableHead, TableBody, TableRow, TableCell, Box } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

const Listar = () => {

    const [alunos, setAlunos] = useState([])
    const [mediaTurma, setMediaTurma] = useState(0)

    useEffect(
        () => {
            axios.get("http://localhost:3005/alunos/listar")
                .then(
                    (response) => {
                        //console.log(response)
                        setAlunos(response.data)
                        // Calcula a media da turma
                        // 1 - Percorre o array de alunos
                        // 2 - Soma o IRA de cada aluno
                        // 3 - Divide a soma pelo tamanho do array

                        let soma = 0
                        for (let i = 0; i < response.data.length; i++) {
                            soma += response.data[i].ira
                        }
                        const media = soma / response.data.length

                        setMediaTurma(media.toFixed(2))
                    }
                )
                .catch(error => console.log(error))
        }
        ,
        []
    )

    function deleteAlunoById(id) {
        if (window.confirm("Deseja Excluir ? " + id)) {
            axios.delete(`http://localhost:3005/alunos/remover/${id}`)
                .then((response) => {
                    const resultado = alunos.filter(alun => alun._id !== id)
                    setAlunos(resultado)
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <>
            <Typography variant="h5" fontWeight="bold">
                Listar Aluno
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 4, mb: 4 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">ID</StyledTableCell>
                            <StyledTableCell>NOME</StyledTableCell>
                            <StyledTableCell>CURSO</StyledTableCell>
                            <StyledTableCell>IRA</StyledTableCell>
                            <StyledTableCell align="center">AÇÕES</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            alunos.map(
                                (aluno) => {
                                    //  Aqui é feito a comparação do IRA do aluno com a media da turma
                                    // Se o IRA do aluno for menor que a media da turma, a linha da tabela fica vermelha
                                    // adicionando a classe red-row do CSS app.css
                                    // Além disso, coloca o nome do aluno em branco para ficar mais visivel

                                    const isIRaMenor = aluno.ira < mediaTurma;
                                    const rowClassName = isIRaMenor ? 'red-row' : '';

                                    return (
                                        <StyledTableRow key={aluno._id}>
                                            <StyledTableCell className={rowClassName}>{aluno._id}</StyledTableCell>
                                            <StyledTableCell className={rowClassName}>{aluno.nome}</StyledTableCell>
                                            <StyledTableCell className={rowClassName}>{aluno.curso}</StyledTableCell>
                                            <StyledTableCell className={rowClassName}>{aluno.ira}</StyledTableCell>
                                            <StyledTableCell className={rowClassName}>
                                                <Box>
                                                    <IconButton aria-label="edit" color="primary" component={Link} to={`/editarAluno/${aluno._id}`}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="delete" color="error" onClick={() => deleteAlunoById(aluno._id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    );
                                }
                            )
                        }

                        <StyledTableCell colSpan={4} align="right">Média da Turma</StyledTableCell>
                        <StyledTableCell align="center">
                            {
                                mediaTurma
                            }
                        </StyledTableCell>
                    </TableBody>

                </Table>
            </TableContainer>
        </>

    )
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



export default Listar