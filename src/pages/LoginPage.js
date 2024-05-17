import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {Link, Navigate, useNavigate} from 'react-router-dom';
import api from '../utils/api';

const LoginPage = ({user, setUser}) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    // const [user, setUser] = useState(null);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/user/login', {email, password});
            console.log('res-', response);
            if (response.status === 200) {
                console.log(response);
                setUser(response.data.user);
                //sessionStorage 에 token 저장
                sessionStorage.setItem('token', response.data.token);
                // 'Bearer' : JWT를 통해 토큰 기반 인증 시스템이라는 의미로 Bearer 를 토큰과 함께 보낸다.
                api.defaults.headers['authorization'] = 'Bearer ' + response.data.token;
                setErrorMsg('');
                navigate('/');
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            setErrorMsg(error.message);
        }
    };
    if (user) {
        return <Navigate to='/' />;
    }

    return (
        <div className='display-center'>
            {errorMsg && <div>{errorMsg}</div>}
            <Form className='login-box' onSubmit={handleLogin}>
                <h1>로그인</h1>
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
                <div className='button-box'>
                    <Button type='submit' className='button-primary'>
                        Login
                    </Button>
                    <span>
                        계정이 없다면? <Link to='/register'>회원가입 하기</Link>
                    </span>
                </div>
            </Form>
        </div>
    );
};

export default LoginPage;

// 로그인
// 1. 로그인 실패 시 에러메시지 보여주기
// 2. 성공할 경우, 유저 정보 state 에 저장
// 3. 성공한 경우 토큰값을 session storage 에 저장 => https://enne.tistory.com/17
// 4. + api 헤더에 토큰값을 디폴트로 설정하기
// 5. 할일 페이지로 이동 '/'

// 1. 로그인 했다면, 로그인페이지로 돌아갈 수 없다.
// -- 로그인 했다면 토큰 저장한다.
// -- 토큰값을 읽어온다.
// -- 토큰이 사용가능한 토큰인지 체크한다. (토큰이 만료되지 않고, 토큰을 해독했을때 유저ID가 있다 -> BE에서 확인)
// -- 유효한 토큰이라면, 유저값을 저장한다.
// -- 유저가 있다면 TODO 페이지 보여주기
