import React, { useEffect } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import taskAPI from "../api/taskAPI";

const Tasks = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const { id, props } = user;

    const tasks = useSelector(state => state.tasks);
    const taskList = tasks.tasks;

    useEffect(() => {
        if (id) dispatch(taskAPI.getTasks(id));
    }, [dispatch, id])
    
    if (!taskList) return null;

    const drop_handler = event => {
        const uid = event.dataTransfer.getData("application/uid");
        const type = event.target.getAttribute('type');
        if (uid && type) dispatch(taskAPI.move({ uid, type}));
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

    taskList.map((elem) => {
        const current = (
            <Card className="rounded-3 mb-2" style={{ background: elem.color }} key={elem._id}>
                <Card.Body uid={elem._id} type={elem.type} draggable="true" onDragStart={dragstart_handler}>
                    <h6>{elem.name}</h6>
                    <Card.Text>{elem.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button size="sm" variant="outline-dark" className="me-2" onClick={handleEditTask}><i className="bi bi-pen"></i></Button>
                    <Button size="sm" variant="outline-dark"><i className="bi bi-trash" onClick={handleDeleteTask}></i></Button>
                </Card.Footer>
            </Card> 
        );
        if (elem.type === 'block_1') tasksCurrent.push(current);
        else if (elem.type === 'block_2') tasksImportant.push(current);
        else if (elem.type === 'block_3') tasksUrgent.push(current);
        else if (elem.type === 'block_4') tasksDelayed.push(current);
    });

    const handleEditTask = () => {
        alert()
    }

    const handleDeleteTask = () => {

    }

    return (
        <Row className="mt-3" style={{ height: 'calc(100vh - 70px - 4rem)' }}>
            <Col>
                <h5 className="text-center">{ props.block_1.name }</h5>
                <div className="rounded-3 overflow-auto" type='block_1' onDrop={drop_handler} onDragOver={dragover_handler}style={{ backgroundColor: props.block_1.color, height: 'calc(100% - 3rem)' }}>
                    <div className="m-2" onDrop={drop_handler} onDragOver={dragover_handler}>
                        {tasksCurrent}
                    </div>
                </div>
            </Col>
            <Col>
                <h5 className="text-center">{ props.block_2.name }</h5>
                <div className="rounded-3 overflow-auto" type='block_2' onDrop={drop_handler} onDragOver={dragover_handler} style={{ backgroundColor: props.block_2.color, height: 'calc(100% - 3rem)' }}>
                    <div className="m-2" onDrop={drop_handler} onDragOver={dragover_handler}>
                        {tasksImportant}
                    </div>
                </div>
            </Col>
            <Col>
                <h5 className="text-center">{ props.block_3.name }</h5>
                <div className="rounded-3 overflow-auto" type='block_3' onDrop={drop_handler} onDragOver={dragover_handler} style={{ backgroundColor: props.block_3.color, height: 'calc(100% - 3rem)' }}>
                    <div className="m-2" onDrop={drop_handler} onDragOver={dragover_handler}>
                        {tasksUrgent}
                    </div>
                </div>
            </Col>
            <Col>
                <h5 className="text-center">{ props.block_4.name }</h5>
                <div className="rounded-3 overflow-auto" type='block_4' onDrop={drop_handler} onDragOver={dragover_handler} style={{ backgroundColor: props.block_4.color, height: 'calc(100% - 3rem)' }}>
                    <div className="m-2" onDrop={drop_handler} onDragOver={dragover_handler}>
                        {tasksDelayed}
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default Tasks;