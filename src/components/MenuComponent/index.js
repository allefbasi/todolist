import {Header} from "semantic-ui-react";

export function MenuComponent() {
    return (
        <>
            <div className="ui top attached menu">
                <Header as='h2' color='teal' className='top attached' style={{border: '0px'}}>
                    <i className="teal attach icon"/>to-do list.
                </Header>
                <div className="right menu">
                    <a className='item'>Logout</a>
                </div>
            </div>

        </>

    )
}
