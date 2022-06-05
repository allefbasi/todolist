import {Button, Form, Grid} from "semantic-ui-react";
import {useState} from "react";

export function HomePage() {
    const [itemValue, setItemValue] = useState('');
    const [todoList, setToDoList] = useState([]);
    const onAddClick = () => {
        const newToDoList = [];
        newToDoList.push(itemValue);
        setToDoList([...todoList, newToDoList]);
        setItemValue('');
    }
    const removeItem = (removeItem) => {
        //todo
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
                                        <i className='times icon' style={{cursor:'pointer'}} onClick={() => removeItem(listItem)}/>
                                    </div>
                                ))
                            }
                        </div>
                    </Form>
                </Grid.Column>
                <Grid.Column>
                    <Form>
                        <Button disabled={itemValue === ''} onClick={() => onAddClick()} color='teal'>
                            Ekle
                        </Button>
                    </Form>
                </Grid.Column>
            </Grid>

        </>
    )
}
