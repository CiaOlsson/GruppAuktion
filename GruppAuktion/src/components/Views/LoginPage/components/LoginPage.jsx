import {useState} from "react";
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import {useUserContext} from "../../../../context/UserContextProvider.jsx";
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
        const { setUser } = useUserContext()
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const navigate = useNavigate ()
        const handleLogin = () => {
            console.log('Logging in with:', username, password)
            setUser(username)
            navigate('/')
        }

        return (
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <TextField
                        margin="normal"
                        label="Username"
                        fullWidth
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginTop: '20px' }}>
                        Login
                    </Button>
                </Paper>
            </Container>
        )
}
export default LoginPage