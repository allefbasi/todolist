import {Button, Form, Grid} from "semantic-ui-react";
import {useEffect, useState} from "react";
import {jwt} from "../../App";

export function HomePage() {
    const [itemValue, setItemValue] = useState('');
    const [todoList, setToDoList] = useState([]);
    let newToDoList = [];

    useEffect(() => {
        getToDoList()
    }, [])

    const getToDoList = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todo`,
            {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${jwt}`
                }
            }
        ).then((response) => {
            response.json().then((body) => {
                for (const listItem of body.data) {
                    newToDoList.push({details: listItem.details, id: listItem.id});
                }
                setToDoList(newToDoList);
            })
        })
    }

    const onAddClick = () => {
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
                if (res.ok !== true) {
                    if (res.status === 401) {
                        console.log('bunu yapmaya yetkiniz yok');
                    }
                } else {
                    getToDoList();
                    setItemValue('');
                    console.log('todo eklendi');
                }
            })
    }
    
    const removeItem = (id) => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todo/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${jwt}`
                }
            }
        )
            .then((res) => {
                if (res.ok !== true) {
                    if (res.status === 401) {
                        console.log('bunu yapmaya yetkiniz yok');
                    }
                } else {
                    getToDoList();
                    console.log('todo silindi');
                }
            })
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
                                    <div key={listItem.id} className="item">
                                        <i className=" paperclip icon"/>
                                        <div className="content">
                                            <div className="description"
                                                 style={{paddingRight: '5px'}}>{listItem.details}</div>
                                        </div>
                                        <i className='times icon' style={{cursor: 'pointer'}}
                                           onClick={() => removeItem(listItem.id)}/>
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
