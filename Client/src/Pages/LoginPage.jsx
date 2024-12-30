import { useFormik } from "formik"
import toast from "react-hot-toast"
import { api } from "../axios"
import { useNavigate } from "react-router"
import { storage } from "../Libs/storage"

const LoginPage = () => {

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: async (values) => {
            try {
                const { data, status } = await api.get("/users/login", { params: values})
                if (status == 200) {
                    storage.set(data.token)
                    return navigate("/")
                }
                return toast.error(data.message)
            } catch (err) {
                return toast.error(err.response?.data.message || err.message)
            }
        }
    })

    return <div className='d-flex justify-content-center mt-4'>
        <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-2 w-50'>
            <input onChange={formik.handleChange} value={formik.values.username} type="text" name='username' />
            <input onChange={formik.handleChange} value={formik.values.password} type="password" name='password' />
            <button type='submit'>Login</button>
        </form>
    </div>
}

export default LoginPage
