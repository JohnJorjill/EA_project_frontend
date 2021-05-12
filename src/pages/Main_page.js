import logo from '../Maharishi_International_University_logo_1.png';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';
import { useLocation } from "react-router-dom";

const api = axios.create({
    baseURL: `http://localhost:8003/client/`
})

export default function Main_page() {

    const location = useLocation();

    const [sessions, setSession] = useState([]);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const getSessions = async () => {
            await api.get('/sessions?futureOnly=true', {
                headers: { Authorization: `Bearer ` + location.state.token }
            }).then(res => {
                setSession(res.data)
            });
        }
        getSessions();
    }, [location]);

    const config = {
        headers: { Authorization: `Bearer ` + location.state.token }
    }

    let createAppointment = async () => {
        await api.post('/sessions/0/appointments', {}, config).then(res => {
            if (res.status === 200) {
                setStatus('Appointment is done!')
            }
        }).catch(err => {
            setStatus(err.toString())
        })
    }

    return (
        <div className="App">
            <img src={logo} width="200px" alt="" />
            <p>{status}</p>

            <h1>Sessions list:</h1>
            {sessions.map(session => <div key={session.id}><h2>Date: {session.date} Location: {session.location}</h2><button onClick={() => createAppointment()}>Make appointment</button></div>)}
        </div>
    )
}
