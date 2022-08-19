import {LoginPage} from "./screens/LoginPage";
import {SignUpPage} from "./screens/SignUpPage";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {MenuComponent} from "./components/MenuComponent";
import {HomePage} from "./screens/HomePage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setUserNameSurname} from "./features/user/userSlice";

export const jwt = localStorage.getItem('jwt');

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const userNameSurname = localStorage.getItem('userNameSurname');
        dispatch(setUserNameSurname(userNameSurname));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
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
                <ToastContainer/>
        </>
    );
}

export default App;
