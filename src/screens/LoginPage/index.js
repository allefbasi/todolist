import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import {useState} from "react";

export function LoginPage() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordError, setPasswordError] = useState(null);
    const [emailError, setEmailError] = useState(null);

    const onLoginClick = () => {
        //todo
        if (email === '') {
            setEmailError(true);
        } else {
            setEmailError(false);
        }

        if (password === '') {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    }
    return (
        <>
            <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <i className="angle double right icon"/> Oturum Açın
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input value={email} onChange={(e) => setEmail(e.target.value)} fluid icon='user'
                                        iconPosition='left' placeholder='E-mail adresi'
                                        error={emailError} required/>
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Şifre'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={passwordError}
                                required
                            />
                            <Button onClick={() => onLoginClick()} color='teal' fluid size='large'>
                                Giriş Yap
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Henüz hesabın yok mu? <Link to='/sign-up'>Hesap Oluştur</Link>
                    </Message>
                    {
                        emailError || passwordError ?
                            <div className="ui error message">
                                <div className="header">
                                    Please fill all the required fields.
                                </div>
                            </div>
                            : null
                    }
                </Grid.Column>
            </Grid>
        </>
    )

}
