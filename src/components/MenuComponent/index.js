import {Header} from "semantic-ui-react";
import {useContext} from "react";
import {UserContext} from "../../App";

export function MenuComponent(props) {
    const user = useContext(UserContext);
    const onLogoutClick = () => {
        localStorage.removeItem('jwt');
        window.location.reload();
    }
    const isLoggedIn = props.isLoggedIn;

    return (
        <>
            <div className="ui top attached menu">
                <Header as='h2' color='teal' className='top attached' style={{border: '0px'}}>
                    <i className="teal attach icon"/>to-do list.
                </Header>
                {
                    isLoggedIn ?
                        <div className="right menu">
                            <span className='item'>{user}</span>
                            <a className='item' onClick={onLogoutClick}>Logout</a>
                        </div>
                        : null
                }
            </div>

        </>

    )
}
