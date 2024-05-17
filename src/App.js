import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './route/PrivateRoute';
import {useEffect, useState} from 'react';
import api from './utils/api';
import TestPage from './pages/TestPage';

function App() {
    const [user, setUser] = useState(null);
    // 토큰을 통해 유저정보를 가져온다. getUser
    const getUser = async () => {
        try {
            const storedToken = sessionStorage.getItem('token');
            if (storedToken) {
                const response = await api.get('/user/me');
                console.log('getUser = ', response.data.user);
                setUser(response.data.user);
            }
        } catch (error) {
            setUser(null);
        }
    };
    useEffect(() => {
        getUser();
    }, []);
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <PrivateRoute user={user}>
                        <TodoPage />
                    </PrivateRoute>
                }
            />

            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage user={user} setUser={setUser} />} />
            <Route path='/test' element={<TestPage />} />
        </Routes>
    );
}

export default App;
