import {Button, Form, Grid} from "semantic-ui-react";

export function HomePage() {
    return (
        <>
            <Grid text style={{marginTop: '2em', marginLeft: '1em'}}>
                <Grid.Column style={{width: '35%'}}>
                    <Form>
                        <Form.TextArea row={2} placeholder='...'/>
                    </Form>
                </Grid.Column>

                <Grid.Column>
                    <Form>
                        <Button color='teal'>
                            Ekle
                        </Button>

                    </Form>
                </Grid.Column>
            </Grid>

        </>
    )
}
