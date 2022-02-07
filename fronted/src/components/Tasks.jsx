import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import hexToHsl from 'hex-to-hsl';
import taskAPI from "../api/taskAPI";

moment.locale('ru');

const Tasks = () => {
    const dispatch = useDispatch();
    const { props } = useSelector(state => state.user);
    const { tasks } = useSelector(state => state.tasks);

    const [showModal, setShowModal] = useState(false);
    const [currentTask, setCurrentTask] = useState([]);

    useEffect(() => {
        dispatch(taskAPI.getTasks());
    }, [])
    
    if (!tasks) return null;

    const drop_handler = event => {
        const uid = event.dataTransfer.getData("application/uid");
        const type = event.target.getAttribute('type');
        if (uid && type) dispatch(taskAPI.moveTask({ id: uid, type }));
    }
    
    const dragover_handler = event => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move"
    }
    
    const dragstart_handler = event => {
        if (!event.target.getAttribute('uid')) return;
        event.dataTransfer.setData("application/uid", event.target.getAttribute('uid'));
        event.dataTransfer.effectAllowed = "move";
    }

    const tasksCurrent = [];
    const tasksImportant = [];
    const tasksUrgent = [];
    const tasksDelayed = [];

    const handleCloseModal = () => {
        setCurrentTask([]);
        setShowModal(false);
    }
    const handleShowModal = event => {
        const uid = event.target.getAttribute('uid');
        const task = tasks.filter(element => element._id === uid)[0];

        setCurrentTask(task);
        setShowModal(true);
    };

    const handleEditTask = () => {
        dispatch(taskAPI.editTask(currentTask));
        handleCloseModal();
    }

    const handleDeleteTask = event => {
        const uid = event.target.getAttribute('uid');
        dispatch(taskAPI.deleteTask(uid));
    }

    tasks.map((elem) => {
        const date = moment(elem.date).format('lll');
        const hsl = hexToHsl(elem.color);

        const color = hsl[2] < 45 ? 'white' : 'black';
        const variant = hsl[2] < 45 ? 'outline-light' : 'outline-dark';

        const current = (
            <Card className="rounded-3 mb-2 border-0" style={{ background: elem.color, color: color }} key={elem._id}>
                <Card.Body uid={elem._id} type={elem.type} draggable="true" onDragStart={dragstart_handler}>
                    <h6>{elem.name}</h6>
                    <Card.Text>{elem.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col md={5}>
                            <Button size="sm" variant={variant} onClick={handleShowModal} className="me-2" uid={elem._id}><i className="bi bi-pen" uid={elem._id}></i></Button>
                            <Button size="sm" variant={variant} onClick={handleDeleteTask} uid={elem._id}><i className="bi bi-trash" uid={elem._id}></i></Button>
                        </Col>
                        <Col md={7} style={{ textAlign: 'end' }}><span style={{ fontSize: '12px' }}>{date}</span></Col>
                    </Row>
                </Card.Footer>
            </Card> 
        );
        if (elem.type === 'block_1') tasksCurrent.push(current);
        else if (elem.type === 'block_2') tasksImportant.push(current);
        else if (elem.type === 'block_3') tasksUrgent.push(current);
        else if (elem.type === 'block_4') tasksDelayed.push(current);
    });

    return (
        <>
            <Modal show={ showModal } onHide={ handleCloseModal } centered='true'>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование задачи</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Название задачи</Form.Label>
                    <Form.Control type='text' placeholder={currentTask?.name } onChange={ event => setCurrentTask({ ...currentTask, name: event.target.value}) } />
                    <br />
                    <Form.Label>Описание задачи</Form.Label>
                    <Form.Control as='textarea' placeholder={currentTask?.description} onChange={ event => setCurrentTask({ ...currentTask, description: event.target.value}) } />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={ handleCloseModal }>Закрыть</Button>
                    <Button variant="dark" onClick={ handleEditTask }>Сохранить</Button>
                </Modal.Footer>
            </Modal>
            <Row className="mt-3" style={{ height: 'calc(100vh - 70px - 4rem)' }}>
                <Col style={{ height: 'inherit' }}>
                    <h5 className="text-center">{ props?.block_1.name }</h5>
                    <div className="rounded-3 overflow-auto" type='block_1' onDrop={drop_handler} onDragOver={dragover_handler}style={{ backgroundColor: props?.block_1.color, height: 'calc(100% - 2rem)' }}>
                        <div className="m-2" onDrop={drop_handler} onDragOver={dragover_handler}>
                            {tasksCurrent}
                        </div>
                    </div>
                </Col>
                <Col style={{ height: 'inherit' }}>
                    <h5 className="text-center">{ props?.block_2.name }</h5>
                    <div className="rounded-3 overflow-auto" type='block_2' onDrop={drop_handler} onDragOver={dragover_handler} style={{ backgroundColor: props?.block_2.color, height: 'calc(100% - 2rem)' }}>
                        <div className="m-2" onDrop={drop_handler} onDragOver={dragover_handler}>
                            {tasksImportant}
                        </div>
                    </div>
                </Col>
                <Col style={{ height: 'inherit' }}>
                    <h5 className="text-center">{ props?.block_3.name }</h5>
                    <div className="rounded-3 overflow-auto" type='block_3' onDrop={drop_handler} onDragOver={dragover_handler} style={{ backgroundColor: props?.block_3.color, height: 'calc(100% - 2rem)' }}>
                        <div className="m-2" onDrop={drop_handler} onDragOver={dragover_handler}>
                            {tasksUrgent}
                        </div>
                    </div>
                </Col>
                <Col style={{ height: 'inherit' }}>
                    <h5 className="text-center">{ props?.block_4.name }</h5>
                    <div className="rounded-3 overflow-auto" type='block_4' onDrop={drop_handler} onDragOver={dragover_handler} style={{ backgroundColor: props?.block_4.color, height: 'calc(100% - 2rem)' }}>
                        <div className="m-2" onDrop={drop_handler} onDragOver={dragover_handler}>
                            {tasksDelayed}
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Tasks;