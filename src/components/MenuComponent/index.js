import {Header} from "semantic-ui-react";

export function MenuComponent(props) {
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
                            <a className='item' onClick={onLogoutClick}>Logout</a>
                        </div>
                        : null
                }
            </div>

        </>

    )
}
