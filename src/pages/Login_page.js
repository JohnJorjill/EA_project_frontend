import '../App.css';
import logo from '../Maharishi_International_University_logo_1.png';
import React, { useState,useEffect } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const api = axios.create({
    baseURL: `http://localhost:8003/auth/`
})

export default function Login_page() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [token, setToken] = useState(null);


    useEffect(() => {
        if(token){
            history.push({pathname:'/main',state: token})
        }
    }, [token])

    const handleSubmit = async () => {
        await api.post('/login', { 'username': username, 'password': password }).then(res => {
            if (res.status === 200) {
                setToken(res.data);
            }
        }).catch(err=>{setStatus('wrong credentials')})
    }

    return (
        <div className="App">
            <img src={logo} width="200px" alt="" />
            <h1>Meditation Appointment System</h1>
            <h1>Login:</h1>

            <label>Username: </label><input type="text" onChange={e => setUsername(e.target.value)} /><br />
            <label>Password: </label><input type="password" onChange={e => setPassword(e.target.value)} /><br />
            <button onClick={e => handleSubmit()}>Login</button>
            <p>{status}</p>
        </div>
    )
}
