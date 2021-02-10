import React from 'react';

const TaskListItem = (props) => {
    const { title, description, size, _id } = props.task;

    return (
        <a href={`/task/view/${_id}`} className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{title}</h5>
                <p className="mb-1">{description}</p>
                <span className="badge badge-primary badge-pill">{size}</span>
            </div>
        </a>
    );
};

export default TaskListItem;
