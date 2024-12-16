import { BrowserRouter, Routes, Route } from "react-router"
import JwtPage from "../Pages/JwtPage"

const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route path="create-jwt" Component={JwtPage}/>
            </Route>
        </Routes>
    </BrowserRouter>
}

export default Router