import React, { useState } from "react";
import { Button, Col, Row, Modal, Form, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { HexColorPicker } from "react-colorful";
import userSlice from "../reducers/userSlice";
import taskAPI from "../api/taskAPI";
import taskSlice from "../reducers/taskSlice";
import userAPI from "../api/userAPI";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user);
    const { id, name, props } = user;

    const [show, setShow] = useState(false);
    const [showEdit, setShowEditProps] = useState(false);

    const [color, setColor] = useState('#ffffff');
    const [task, setTask] = useState({
        type: 'block_1'
    });
    const [currentEditTask, setCurrentEditTask] = useState({ type: 'block_1' });

    const handleLogout = () =>  { 
        dispatch(userSlice.actions.logout());
        navigate('/login', { replace: true });
    }
    const handleTask = () => {
        dispatch(taskAPI.createTask({ ...task, color: color, author: id }));
        dispatch(taskSlice.actions.toogleRefresh());
        handleCloseAdd();
    }

    const handleProps = () => {
        console.log(props[currentEditTask.type].name);
        dispatch(userAPI.editProps({ ...currentEditTask, color: color, login: user.login }));
        handleCloseEditProps();
    }

    if (!user.id) return null;

    const handleShowAdd = () => setShow(true);
    const handleCloseAdd = () => setShow(false);
    const handleShowEditProps = () => setShowEditProps(true);
    const handleCloseEditProps = () => { 
        setShowEditProps(false);
        setCurrentEditTask({ type: 'block_1' }); 
    }

    return (
        <>
            <Modal show={ showEdit } onHide={ handleCloseEditProps }>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование плиток</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Раздел</h5>
                    <Form.Select onChange={ event => setCurrentEditTask({...currentEditTask, type: event.target.value}) }>
                        <option value="block_1">{props.block_1.name}</option>
                        <option value="block_2">{props.block_2.name}</option>
                        <option value="block_3">{props.block_3.name}</option>
                        <option value="block_4">{props.block_4.name}</option>
                    </Form.Select>
                    <br />
                    <h5>Новое название</h5>
                    <Form.Control type='text' placeholder={props[currentEditTask.type].name} onChange={ event => setCurrentEditTask({ ...currentEditTask, name: event.target.value }) }/>
                    <br />
                    <h5>Новый цвет фона</h5>
                    <HexColorPicker color={ props[currentEditTask.type].color } onChange={ setColor } />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={ handleCloseEditProps }>
                        Закрыть
                    </Button>
                    <Button variant="dark" onClick={ handleProps }>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={ show } onHide={ handleCloseAdd }>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление задачи</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Название</h5>
                    <Form.Control type='text' placeholder='Название' onChange={ event => setTask({ ...task, name: event.target.value }) }/>
                    <br />
                    <h5>Описание</h5>
                    <Form.Control as='textarea' placeholder='Описание' onChange={ event => setTask({ ...task, description: event.target.value }) }/>
                    <br />
                    <h5>Раздел</h5>
                    <Form.Select onChange={ event => setTask({ ...task, type: event.target.value }) }>
                        <option value="block_1">{props.block_1.name}</option>
                        <option value="block_2">{props.block_2.name}</option>
                        <option value="block_3">{props.block_3.name}</option>
                        <option value="block_4">{props.block_4.name}</option>
                    </Form.Select>
                    <br />
                    <h5>Цвет плитки</h5>
                    <HexColorPicker color={ color } onChange={ setColor } />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-dark" onClick={ handleCloseAdd }>
                    Закрыть
                </Button>
                <Button variant="dark" onClick={ handleTask }>
                    Сохранить
                </Button>
                </Modal.Footer>
            </Modal>
            <Row className="p-2">
                <Col md={3} className="p-2 rounded-3" style={{ background: 'linear-gradient(88deg, #a3b6e1, #ef3b3b63)' }}>
                    <h5 className='text-truncate'>Привет, { name }</h5>
                    <Row>
                        <Col>
                            <Button className='me-2' variant="outline-dark" onClick={ handleShowAdd }><i className="bi bi-plus-square"></i></Button>
                            <Button className='me-2' variant="outline-dark" onClick={ handleShowEditProps }><i className="bi bi-pencil-square"></i></Button>
                            <Button variant="outline-dark" onClick={ handleLogout }><i className="bi bi-box-arrow-left"></i> Выход</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Header;