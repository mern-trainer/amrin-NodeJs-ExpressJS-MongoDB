import { BrowserRouter, Routes, Route } from "react-router"
import SignupPage from "../Pages/SignupPage"
import LoginPage from "../Pages/LoginPage"
import HomePage from "../Pages/HomePage"

const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route path="" Component={HomePage}/>
                <Route path="signup" Component={SignupPage}/>
                <Route path="login" Component={LoginPage}/>
            </Route>
        </Routes>
    </BrowserRouter>
}

export default Router