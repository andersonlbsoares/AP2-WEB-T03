import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Cadastrar = () => {

    const [nome, setNome] = useState("") //textfield
    const [curso, setCurso] = useState("") //textfield
    const [ira, setIra] = useState(0.0) //textfield
    let navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        const aluno = { nome, curso, ira }
        axios.post("http://localhost:3005/alunos/cadastrar", aluno)
            .then((response) => {
                alert(`Aluno ID ${response.data._id} adicionado com sucesso!`)
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
                Cadastrar Aluno
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

                    id="ira"
                    name="ira"
                    onChange={(event) => setIra(parseFloat(event.target.value))}

                />



                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Button
                        variant="contained"
                        type="submit"
                    >
                        Cadastrar
                    </Button>
                </Box>
            </Box>
        </>
    )
}
export default Cadastrar