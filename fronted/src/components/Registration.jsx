import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import userAPI from '../api/userAPI';

const Registration = () => {
    const [user, setUser] = useState({
        name: '',
        login: '',
        password: '',
        passwordRepeat: ''
    });

    const dispatch = useDispatch();
    const selector = useSelector(state => state.user);
    const navigate = useNavigate();

    const handleRegistration = () => {
        const validPassword = user.password === user.passwordRepeat;
        if (!validPassword) return;
        dispatch(userAPI.registration(user))
            .then(() => selector.user !== '' ? navigate('/', { replace: true }) : null);
    }

    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
            <div className='text-center'>
                <h4>Регистрация</h4>
                <Card>
                    <Card.Body>
                        <Form.Control type='text' placeholder='Имя' onChange={ event => setUser({ ...user, name: event.target.value }) }/>
                        <br />
                        <Form.Control type='email' placeholder='Логин' onChange={ event => setUser({ ...user, login: event.target.value }) }/>
                        <br />
                        <Form.Control type='password' placeholder='Пароль' onChange={ event => setUser({ ...user, password: event.target.value }) }/>
                        <br />
                        <Form.Control type='password' placeholder='Повторите пароль' onChange={ event => setUser({ ...user, passwordRepeat: event.target.value }) }/>
                        <br />
                        <Button variant="outline-dark" onClick={ handleRegistration }>Зарегистрироваться</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Registration;