import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate()


    function handleSubmit(event) {
        event.preventDefault()
        const login = { username, password }
        axios.post("http://localhost:3005/login", login)
            .then((response) => {
                alert(`Parabéns você acertou a senha :)!`)
                navigate("/ListarAluno")
            })
            .catch(error => alert(`Senha errada :(!`))
    }

    return (
        <>
            <Typography variant="h5" fontWeight="bold">
                Login nada seguro :D
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
                (admin, admin)
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
                    label="username"

                    id="username"
                    name="username"
                    onChange={(event) => setUsername(event.target.value)}

                />


                <TextField
                    required
                    fullWidth
                    margin="normal"
                    label="password"
                    type="password"

                    id="password"
                    name="password"
                    onChange={(event) => setPassword(event.target.value)}
                />

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Button
                        variant="contained"
                        type="submit"
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </>
    )
}
export default Login

