import React from 'react'
import { api } from '../axios'

const JwtPage = () => {

    const handleGenerateToken = async () => {
        const token = localStorage.getItem("_access_token_")
        if (token) {
            return console.log("Already Logged In")
        }
        const { data } = await api.get("/jwt")
        localStorage.setItem("_access_token_", data.token)
        console.log("Logged In")
    }

    return <div>
        <button onClick={handleGenerateToken}>Generate Token</button>
    </div>
}

export default JwtPage
