import {Button, Form, Grid, Header, Message, Segment} from "semantic-ui-react";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {toast} from "react-toastify";

export function SignUpPage() {
    const [nameSurname, setNameSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [rePasswordError, setRePasswordError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [nameSurnameError, setNameSurnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [signUpMessage, setSignUpMessage] = useState('');

    const navigate = useNavigate();

    const onSignUpClick = () => {
        const requiredFields = [nameSurname, email, password, rePassword];
        const emptyRequiredFields = requiredFields.map(s => s.trim()).filter((fields) => fields.length === 0);
        if (emptyRequiredFields.length > 0) {
            if (nameSurname.trim().length === 0) {
                setNameSurnameError(true);
            } else {
                setNameSurnameError(false);
            }
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
            if (rePassword.trim().length === 0) {
                setRePasswordError(true);
            } else {
                setRePasswordError(false);
            }
        } else {
            setNameSurnameError(false);
            setEmailError(false)
            setPasswordError(false)
            setRePasswordError(false);

            fetch('http://localhost:58888/user',
                {
                    method: 'POST',
                    body: JSON.stringify
                    ({
                        nameSurname,
                        username: email,
                        password,
                    }),
                    headers: {'content-type': 'application/json'}
                })
                // .then(res => console.log(res))

                .then((res) => {
                    if (res.ok !== true) {
                        if (res.status === 409) {
                            setSignUpMessage('Bu email ile kayıtlı bir kullanıcı zaten var.');
                        } else {
                            setSignUpMessage('Bir hata oluştu.');
                        }
                    } else {
                        toast('Kullanıcı kaydedildi. Lütfen giriş yapınız.')
                        navigate('/login');
                    }
                })
                .catch(() => {
                    setSignUpMessage('Bir hata oluştu.')
                })
        }

    }

    return (
        <>
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
                            <Button onClick={onSignUpClick} color='teal' fluid size='large'>
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
                                    Lütfen bütün zorunlu alanları doldurunuz.
                                </div>
                            </div>
                            :
                            passwordMatchError ?
                                <div className="ui error message">
                                    <div className="header">
                                        Şifreler eşleşmiyor.
                                    </div>
                                </div>
                                : null
                    }
                    {
                        signUpMessage !== '' ?
                            <div className="ui error message">
                                <div className="header">
                                    {signUpMessage}
                                </div>
                            </div>
                            : null
                    }


                </Grid.Column>
            </Grid>
        </>
    )
}
