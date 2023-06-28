

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Container } from "@mui/material"
import MyMenu from "./MyMenuV1"

import CadastrarProfessor from "./professor/Cadastrar"
import ListarProfessor from "./professor/Listar"
import EditarProfessor from "./professor/Editar"

import CadastrarAluno from "./aluno/Cadastrar"
import ListarAluno from "./aluno/Listar"
import EditarAluno from "./aluno/Editar"

// importando tanto a Lista de Alunos Aprovados quanto o login, ambos são chamados nas rotas
import ListarAlunosAprovados from "./aluno/aprovados"
import Login from "./login"


const MainPage = () => {
    return (
        < BrowserRouter >
            <MyMenu />
            <Container sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Routes>

                    <Route path="cadastrarProfessor" element={<CadastrarProfessor />} />
                    <Route path="listarProfessor" element={<ListarProfessor />} />
                    <Route path="editarProfessor/:id" element={<EditarProfessor />} />
                    <Route path="cadastrarAluno" element={<CadastrarAluno />} />
                    <Route path="listarAluno" element={<ListarAluno />} />
                    <Route path="editarAluno/:id" element={<EditarAluno />} />
                    <Route path="listarAlunosAprovados" element={<ListarAlunosAprovados />} />
                    <Route path="" element={<Login />} />
                </Routes>
            </Container>
        </BrowserRouter >
    )
}

export default MainPage