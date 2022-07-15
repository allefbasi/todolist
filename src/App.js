import {LoginPage} from "./screens/LoginPage";
import {SignUpPage} from "./screens/SignUpPage";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {MenuComponent} from "./components/MenuComponent";
import {HomePage} from "./screens/HomePage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {createContext} from "react";

const jwt = localStorage.getItem('jwt');
const userNameSurname = localStorage.getItem('userNameSurname');
export const UserContext = createContext(null);

function App() {
    return (
        <>
            <UserContext.Provider value={userNameSurname}>
                <MenuComponent/>
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
            </UserContext.Provider>
            <ToastContainer/>
        </>
    );
}

export default App;
