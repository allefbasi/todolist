import {Button, Form, Grid, Header, Icon, Image, Label, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useState} from "react";

export function SignUpPage() {
    const [nameSurname, setNameSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [rePasswordError, setRePasswordError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [nameSurnameError, setNameSurnameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordMatchError, setPasswordMatchError] = useState(null);


    const onSignUpClick = () => {
        //todo
        if (nameSurname === '') {
            setNameSurnameError(true);
        } else {
            setNameSurnameError(false);
        }

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

        if (rePassword === '') {
            setRePasswordError(true);
        } else {
            setRePasswordError(false);
        }

        if (password !== rePassword) {
            setPasswordMatchError(true);
        } else {
            setPasswordMatchError(false);
        }


    }
    return (
        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' color='teal' textAlign='center'>
                    <i className="angle double right icon"/> Hesap Oluştur
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input value={nameSurname} onChange={(e) => setNameSurname(e.target.value)} fluid
                                    icon='pencil alternate' iconPosition='left' placeholder='Ad Soyad'
                                    error={nameSurnameError} required/>
                        <Form.Input value={email} onChange={(e) => setEmail(e.target.value)} fluid icon='user'
                                    iconPosition='left' placeholder='E-mail adresi' error={emailError} required/>
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Şifre'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={passwordError || passwordMatchError}
                            required
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Şifre Tekrar'
                            type='password'
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            error={rePasswordError || passwordMatchError}
                            required
                        />
                        <Button onClick={() => onSignUpClick()} color='teal' fluid size='large'>
                            Hesap Oluştur
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Hesabın var mı? <Link to='/login'>Giriş Yap</Link>
                </Message>
                {
                    nameSurnameError || emailError || passwordError || rePasswordError ?
                        <div className="ui error message">
                            <div className="header">
                                Please fill all the required fields.
                            </div>
                        </div>
                        :
                        passwordMatchError ?
                            <div className="ui error message">
                                <div className="header">
                                    Passwords do not match.
                                </div>
                            </div>
                            : null
                }
            </Grid.Column>
        </Grid>
    )
}
