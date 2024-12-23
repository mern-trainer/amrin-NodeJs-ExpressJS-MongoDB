import { BrowserRouter, Routes, Route } from "react-router"
import SignupPage from "../Pages/SignupPage"

const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route path="signup" Component={SignupPage}/>
            </Route>
        </Routes>
    </BrowserRouter>
}

export default Router