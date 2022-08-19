import {Button, Form, Grid} from "semantic-ui-react";
import {useState} from "react";
import {jwt} from "../../App";

export function HomePage() {
    const [itemValue, setItemValue] = useState('');
    const [todoList, setToDoList] = useState([]);
    let newTodoList = [];
    fetch(`${process.env.REACT_APP_BASE_URL}/todo`,
        {
            method:'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${jwt}`
            }
        }
        ).then((response) => {
        response.json().then((body) => {
            for(const listItem of body.data) {
                newTodoList.push(listItem.details);
            }
            setToDoList(newTodoList);
        })
    })
    const onAddClick = () => {
        const newToDoList = [];
        fetch(`${process.env.REACT_APP_BASE_URL}/todo`,
            {
                method: 'POST',
                body: JSON.stringify({title: '', details: itemValue}),
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${jwt}`
                }
            }
        )
            .then((res) => {
                console.log(res)
                if (res.ok !== true) {
                    if (res.status === 401) {
                        console.log('bunu yapmaya yetkiniz yok');
                    }
                } else {
                    newToDoList.push(itemValue);
                    setToDoList([...todoList, newToDoList]);
                    setItemValue('');
                    console.log('todo eklendi');
                }
            })
    }
    const removeItem = (removeItem) => {
        const newTodoList = [...todoList];
        setToDoList(newTodoList.filter((listItem) => listItem !== removeItem))
    }

    return (
        <>
            <Grid text style={{marginTop: '2em', marginLeft: '1em'}}>
                <Grid.Column style={{width: '35%'}}>
                    <Form>
                        <Form.TextArea onChange={(e) => setItemValue(e.target.value)} value={itemValue} row={2}
                                       placeholder='...'/>
                        <div className="ui relaxed divided list">
                            {
                                todoList.map((listItem) => (
                                    <div className="item">
                                        <i className=" paperclip icon"/>
                                        <div className="content">
                                            <div className="description" style={{paddingRight: '5px'}}>{listItem}</div>
                                        </div>
                                        <i className='times icon' style={{cursor: 'pointer'}}
                                           onClick={() => removeItem(listItem)}/>
                                    </div>
                                ))
                            }
                        </div>
                    </Form>
                </Grid.Column>
                <Grid.Column>
                    <Form>
                        <Button disabled={itemValue.length === 0} onClick={onAddClick} color='teal'>
                            Ekle
                        </Button>
                    </Form>
                </Grid.Column>
            </Grid>

        </>
    )
}
