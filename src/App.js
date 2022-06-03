import {LoginPage} from "./screens/LoginPage";
import {SignUpPage} from "./screens/SignUpPage";
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import {MenuComponent} from "./components/MenuComponent";
import {HomePage} from "./screens/HomePage";

function App() {
    return (
        <>
            <MenuComponent/>
            <BrowserRouter>
                <Routes>
                    <Route path={'/login'} element={<LoginPage/>}/>
                    <Route path={'/sign-up'} element={<SignUpPage/>}/>
                    <Route path={'/'} element={<HomePage/>}/>
                </Routes>
            </BrowserRouter>

        </>
    );
}

export default App;
