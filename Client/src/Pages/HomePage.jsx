import { useNavigate } from "react-router"
import { storage } from "../Libs/storage"
import { api } from "../axios"
import { useState } from "react"
import toast from "react-hot-toast"

const HomePage = () => {

    const navigate = useNavigate()
    const [msg, setMsg] = useState("")

    const handleLogout = () => {
        storage.remove()
        return navigate("/login")
    }

    const handleData = async () => {
        try {
            const { data } = await api.get("/users/sample", {
                headers: {
                    Authorization: `Bearer ${storage.get()}`
                }
            })
            setMsg(data.message)
        } catch (err) {
            setMsg("You don't have access to do this action")
            return toast.error(err.response?.data.message || err.message)
        }
    }

    return <div className="d-flex flex-column gap-3 justify-content-center align-items-center vw-100 vh-100">
        <button className="btn btn-danger p-2" onClick={handleLogout}>LogOut</button>
        <button onClick={handleData}>Show Data</button>
        <div>{msg}</div>
    </div>
}

export default HomePage