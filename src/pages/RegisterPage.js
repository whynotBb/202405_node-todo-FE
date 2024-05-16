import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';
import api from '../utils/api';

const RegisterPage = () => {
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate('/login');
    };
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password2nd, setPassword2nd] = useState();
    const signIn = async (e) => {
        e.preventDefault();
        if (password === password2nd) {
            try {
                const response = await api.post('/user', {
                    name: name,
                    email: email,
                    password: password,
                });
                if (response.status === 200) {
                    goToLogin();
                }
            } catch (error) {
                console.log('error : ', error);
            }
        } else {
            console.log('password fail');
        }
    };
    return (
        <div className='display-center'>
            <Form className='login-box' onSubmit={signIn}>
                <h1>회원가입</h1>
                <Form.Group className='mb-3' controlId='formName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='string' placeholder='Name' onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>re-enter the password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='re-enter the password'
                        onChange={(e) => setPassword2nd(e.target.value)}
                    />
                </Form.Group>

                <Button className='button-primary' type='submit'>
                    회원가입
                </Button>
            </Form>
        </div>
    );
};

export default RegisterPage;
