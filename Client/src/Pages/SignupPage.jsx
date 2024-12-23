import { useFormik } from "formik"
import toast from "react-hot-toast"
import { api } from "../axios"
import { useNavigate } from "react-router"

const SignupPage = () => {

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            password: "",
            confirm_password: ""
        },
        onSubmit: async (values) => {
            try {
                const { data, status } = await api.post("/users", values)
                if (status == 201) {
                    // toast.success("Registration completed. Login to continue");
                    // return navigate("/login")
                    localStorage.setItem("___access_token___", data.token)
                    return navigate("/")
                }
                return toast.error(data.message)
            } catch (err) {
                return toast.error(err.response?.data.message || err.message)
            }
        }
    })

    return <div>
        <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-2'>
            <input onChange={formik.handleChange} value={formik.values.name} type="text" name='name' />
            <input onChange={formik.handleChange} value={formik.values.username} type="text" name='username' />
            <input onChange={formik.handleChange} value={formik.values.password} type="password" name='password' />
            <input onChange={formik.handleChange} value={formik.values.confirm_password} type="password" name='confirm_password' />
            <button type='submit'>Signup</button>
        </form>
    </div>
}

export default SignupPage
