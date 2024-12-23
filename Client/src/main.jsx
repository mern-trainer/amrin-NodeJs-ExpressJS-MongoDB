import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast"

// v6 => v7

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
        <Toaster position='top-right'/>
    </StrictMode>,
)
