import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const Editar = () => {

    let { id } = useParams()
    const navigate = useNavigate()

    const [nome, setNome] = useState("") //textfield
    const [curso, setCurso] = useState("") //textfield
    const [ira, setIra] = useState("0.0") //textfield

    //como [] está vazio, o useEffect funciona como um construtor!
    useEffect(
        () => {
            axios.get(`http://localhost:3005/alunos/recuperar/${id}`)
                .then(
                    (response) => {
                        setNome(response.data.nome)
                        setCurso(response.data.curso)
                        setIra(response.data.ira)
                    }
                )
                .catch(error => console.log(error))
        }
        ,
        []
    )

    function handleSubmit(event) {
        event.preventDefault()
        const aluno = { nome, curso, ira }
        axios.put(`http://localhost:3005/alunos/atualizar/${id}`, aluno)
            .then((response) => {
                navigate("/listarAluno")
            })
            .catch(error => console.log(error))
        /*console.log(nome)
        console.log(curso)
        console.log(titulacao)
        console.log(ai)*/
    }


    return (
        <>
            <Typography variant="h5" fontWeight="bold">
                Editar aluno {nome}
            </Typography>
            <Box
                sx={{ width: "80%" }}
                component="form"
                onSubmit={handleSubmit}
            >
                <TextField
                    required
                    fullWidth
                    autoFocus
                    margin="normal"
                    label="Nome Completo"
                    value={nome}

                    id="nome"
                    name="nome"
                    onChange={(event) => setNome(event.target.value)}

                />
                <FormControl sx={{ marginTop: 2, width: "100%" }} required>
                    <InputLabel id="select-tit-label">Curso</InputLabel>
                    <Select
                        labelId="select-tit-label"
                        label="Curso"
                        value={curso}
                        onChange={(event) => setCurso(event.target.value)}
                    >
                        <MenuItem value="DD">Design Digital</MenuItem>
                        <MenuItem value="CC">Ciência da Computação</MenuItem>
                        <MenuItem value="ES">Engenharia de Software</MenuItem>
                        <MenuItem value="SI">Sistemas de Informação</MenuItem>
                        <MenuItem value="RC">Redes de Computadores</MenuItem>
                        <MenuItem value="EC">Engenharia de Computação</MenuItem>

                    </Select>
                </FormControl>

                <TextField
                    required
                    fullWidth
                    margin="normal"
                    label="Ira"
                    type="number"
                    inputProps={{ maxLenght: 10, step: 0.1 }}
                    value={ira}

                    id="ira"
                    name="ira"
                    onChange={(event) => setIra(parseFloat(event.target.value))}

                />

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
                    <Button
                        variant="contained"
                        type="submit"
                    >
                        Atualizar
                    </Button>
                </Box>
            </Box>
        </>
    )
}
export default Editar