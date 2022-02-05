import React, { useState } from 'react';
import { Button, Card, Form, Badge, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import userAPI from '../api/userAPI';

const Login = () => {
    const [user, setUser] = useState({
        login: '',
        password: ''
    });
    const [warning, setWarning] = useState(false);

    const dispatch = useDispatch();
    const selector = useSelector(state => state.user);
    const navigate = useNavigate();

    const handleLogin = () =>  {
        const validUser = user.login !== '' && user.password !== '';
        if (!validUser) {
            setWarning(true);
            return;
        }
        dispatch(userAPI.login(user))
            .then(() => selector.user !== '' ? navigate('/', { replace: true }) : null);
    }

    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
            <h4 style={{ width: '300px' }}><Badge bg="dark">TODOS -</Badge> <br /> Cоздавайте <br />Кастомизируйте <br />Распределяйте</h4>
            <div className='text-center'>
                <h4>Вход</h4>
                { warning && <Alert variant='warning' dismissible onClose={() => setWarning(false)}>Заполните корректно поля</Alert> }
                <Card>
                    <Card.Body>
                        <Form.Control type='email' placeholder='Логин' onChange={ event => setUser({ ...user, login: event.target.value }) }/>
                        <br />
                        <Form.Control type='password' placeholder='Пароль' onChange={ event => setUser({ ...user, password: event.target.value }) }/>
                        <br />
                        <Button className='me-2' variant="outline-dark" onClick={ handleLogin }>Войти</Button>
                        <Link to="/registration">
                            <Button variant="dark">Регистрация</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Login;