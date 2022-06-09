import {LoginPage} from "./screens/LoginPage";
import {SignUpPage} from "./screens/SignUpPage";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {MenuComponent} from "./components/MenuComponent";
import {HomePage} from "./screens/HomePage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const jwt = localStorage.getItem('jwt');

function App() {
    return (
        <>
            <MenuComponent isLoggedIn={jwt != null}/>
            <BrowserRouter>
                {
                    jwt ?
                        <Routes>
                            <Route path={'/home'} element={<HomePage/>}/>
                            <Route path={'*'} element={<Navigate to={'/home'} replace/>}/>
                        </Routes> :
                        <Routes>
                            <Route path={'/login'} element={<LoginPage/>}/>
                            <Route path={'/sign-up'} element={<SignUpPage/>}/>
                            <Route path={'*'} element={<Navigate to={'/login'} replace/>}/>
                        </Routes>
                }
            </BrowserRouter>
            <ToastContainer/>
        </>
    );
}

export default App;
