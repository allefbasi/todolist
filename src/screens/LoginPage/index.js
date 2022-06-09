import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import {useState} from "react";

export function LoginPage() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [loginError, setLoginError] = useState('');


    const onLoginClick = () => {
        const requiredFields = [email, password];
        const emptyRequiredFields = requiredFields.map(s => s.trim()).filter((fields) => fields.length === 0);
        if (emptyRequiredFields.length > 0) {

            if (email.trim().length === 0) {
                setEmailError(true);
            } else {
                setEmailError(false);
            }
            if (password.trim().length === 0) {
                setPasswordError(true);
            } else {
                setPasswordError(false);
            }
        } else {
            fetch('http://localhost:58888/session',
                {
                    method: 'POST',
                    body: JSON.stringify({username: email, password: password}),
                    headers: {'content-type': 'application/json'}
                })
                .then((res) => {
                    if (res.ok !== true) {
                        if (res.status === 401) {
                            setLoginError('Email veya sifre hatali');
                        }
                    } else {
                        res.json().then((body)=>{
                            localStorage.setItem('jwt', body.jwt);
                            window.location.reload();
                        })
                    }
                })
                // .then((res) => res.map((user) => {
                //     console.log(res)
                //     if(email === user.email && password === user.password) {
                //         sessionStorage.setItem('email' , email);
                //         sessionStorage.setItem('password', password);
                //         navigate('/home');
                //     }
                //     else {
                //         setLoginError('Email veya sifre hatali. Lutfen tekrar deneyiniz.')
                //     }
                // }))
                .catch(() => setLoginError('Bir hata olustu.'))
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
                            <Button onClick={onLoginClick} color='teal' fluid size='large'>
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
                    {
                        loginError !== '' ?
                            <div className="ui error message">
                                <div className="header">
                                    {loginError}
                                </div>
                            </div>
                            : null
                    }
                </Grid.Column>
            </Grid>
        </>
    )

}
