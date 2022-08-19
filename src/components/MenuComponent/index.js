import {Header} from "semantic-ui-react";
import {useSelector} from "react-redux";
import {selectUserNameSurname} from "../../features/user/userSlice";

export function MenuComponent() {
    const userNameSurname = useSelector(selectUserNameSurname);
    const onLogoutClick = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('userNameSurname');
        window.location.reload();
    }
    const isLoggedIn = userNameSurname != null;

    return (
        <>
            <div className="ui top attached menu">
                <Header as='h2' color='teal' className='top attached' style={{border: '0px'}}>
                    <i className="teal attach icon"/>to-do list.
                </Header>
                {
                    isLoggedIn ?
                        <div className="right menu">
                            <span className='item'>{userNameSurname}</span>
                            <a className='item' onClick={onLogoutClick}>Logout</a>
                        </div>
                        : null
                }
            </div>

        </>

    )
}
