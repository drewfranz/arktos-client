import React from 'react';
import { Col, Row } from 'reactstrap';
import { TaskItemSidebarForm } from '../components';


const TaskItem = (props) => {
    const { task, grandparentHandleOnChange } = props;

    return (
        <Row>
            <Col xs="3" className="task-item-sidebar-form border-right">
                <TaskItemSidebarForm task={task} parentHandleOnChange={grandparentHandleOnChange} />
            </Col>
            <Col xs="9">
                <h1>{task.title}</h1>
                <div className="py-3">
                    <h4>Description</h4>
                    {task.description}
                </div>
            </Col>
        </Row>
    );
};

export default TaskItem;
