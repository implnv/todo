import React, { useState } from "react";
import { Button, Col, Row, Modal, Form, Card } from "react-bootstrap";
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
    const [showFileDialog, setShowFileDialog] = useState(false);

    const [color, setColor] = useState('#ffffff');
    const [task, setTask] = useState({
        type: 'block_1'
    });
    const [currentEditBlock, setCurrentEditBlock] = useState({ type: 'block_1' });
    const [previewCard, setPreviewCard] = useState({ show: false, name: '', description: '', color: '#e9e9e9', type: 'block_1' });

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
        dispatch(userAPI.editProps({ ...currentEditBlock, color: color, login: user.login }));
        handleCloseEditProps();
    }

    if (!user.id) return null;
    
    const handleShowAdd = () => setShow(true);
    const handleCloseAdd = () => setShow(false);

    const handleShowEditProps = () => setShowEditProps(true);
    const handleCloseEditProps = () => { 
        setShowEditProps(false);
        setCurrentEditBlock({ type: 'block_1' }); 
    }

    const handleShowFileDialog = () => setShowFileDialog(true);
    const handleCloseFileDialog = () => {
        setShowFileDialog(false);
        setPreviewCard({ show: false, name: '', description: '', color: '#e9e9e9', type: 'block_1' });
    }

    const handleLoadPreview = input => {
        const file = input.target.files[0];
        const reader = new FileReader();
        
        reader.readAsText(file);
        reader.onload = () => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(reader.result, 'text/xml');
            
            const name = xml.childNodes[0].children[0].textContent;
            const description = xml.childNodes[0].children[1].textContent;
            const color = xml.childNodes[0].children[2].textContent;

            setPreviewCard({  ...previewCard, show: true, name, color, description })
        }
    }

    const handleAddTaskFromFile = () => {
        dispatch(taskAPI.createTask({ ...previewCard, author: id }));
        handleCloseFileDialog();
    }

    return (
        <>
            <Modal show={ showFileDialog } onHide={ handleCloseFileDialog } centered='true'>
                <Modal.Body>
                    <Form.Label>Файл</Form.Label>
                    <Form.Control type="file" size="sm" onChange={ handleLoadPreview } />
                    <br />
                    <Row className='justify-content-md-center'>
                        <Card className='border-0' style={{ height: '100px', width: '350px', background: previewCard.color }}>
                            {!previewCard.show && <i className="bi bi-eye-slash"></i>}
                            <Card.Body>
                                {previewCard.show &&
                                    <>
                                        <h6>{previewCard.name}</h6>
                                        <Card.Text>{previewCard.description}</Card.Text>
                                    </>
                                }
                            </Card.Body>
                        </Card>
                    </Row>
                    {previewCard.show &&
                        <>
                            <br />
                            <Form.Label>Раздел</Form.Label>
                            <Form.Select onChange={ event => setPreviewCard({...previewCard, type: event.target.value}) }>
                                        <option value="block_1">{props.block_1.name}</option>
                                        <option value="block_2">{props.block_2.name}</option>
                                        <option value="block_3">{props.block_3.name}</option>
                                        <option value="block_4">{props.block_4.name}</option>
                            </Form.Select>
                        </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={ handleAddTaskFromFile } disabled={ !previewCard.show }>Добавить</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={ showEdit } onHide={ handleCloseEditProps } centered='true'>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование плиток</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <h5>Раздел</h5>
                            <Form.Select onChange={ event => setCurrentEditBlock({...currentEditBlock, type: event.target.value}) }>
                                <option value="block_1">{props.block_1.name}</option>
                                <option value="block_2">{props.block_2.name}</option>
                                <option value="block_3">{props.block_3.name}</option>
                                <option value="block_4">{props.block_4.name}</option>
                            </Form.Select>
                            <br />
                            <h5>Новое название</h5>
                            <Form.Control type='text' placeholder={props[currentEditBlock.type].name} onChange={ event => setCurrentEditBlock({ ...currentEditBlock, name: event.target.value }) }/>
                        </Col>
                        <Col>
                            <h5>Новый цвет фона</h5>
                            <HexColorPicker color={ props[currentEditBlock.type].color } onChange={ setColor } />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={ handleCloseEditProps }>Закрыть</Button>
                    <Button variant="dark" onClick={ handleProps }>Сохранить</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={ show } onHide={ handleCloseAdd } centered='true'>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление задачи</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <h5>Название</h5>
                            <Form.Control type='text' placeholder='Название' onChange={ event => setTask({ ...task, name: event.target.value }) }/>
                            <br />
                            <h5>Описание</h5>
                            <Form.Control as='textarea' placeholder='Описание' onChange={ event => setTask({ ...task, description: event.target.value }) }/>
                            <br />
                        </Col>
                        <Col>
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
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-dark" onClick={ handleCloseAdd }>Закрыть</Button>
                <Button variant="dark" onClick={ handleTask }>Сохранить</Button>
                </Modal.Footer>
            </Modal>   
            <div className="p-2 rounded-3" style={{ background: 'linear-gradient(88deg, #a3b6e1, #ef3b3b63)', width: 'fit-content'}}>
                <h5 className='text-truncate'>Привет, { name }</h5>
                <Button className='me-2' variant="outline-dark" onClick={ handleShowAdd }><i className="bi bi-plus-square"></i></Button>
                <Button className='me-2' variant="outline-dark" onClick={ handleShowEditProps }><i className="bi bi-pencil-square"></i></Button>
                <Button className='me-2' variant="outline-dark" onClick={ handleShowFileDialog }><i className="bi bi-folder"></i></Button>
                <Button variant="light" onClick={ handleLogout }><i className="bi bi-box-arrow-left"></i> Выход</Button>
            </div>  
        </>
    );
}

export default Header;