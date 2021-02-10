import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'reactstrap';
import { FaPlusCircle } from 'react-icons/fa';

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import { Loading, TaskListItem } from "../components";
import { Link } from 'react-router-dom';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    let [isLoading, setIsLoading] = useState(true);
    const { getAccessTokenSilently } = useAuth0();

    const handleStatusOnChange = (e) => {
        setStatusFilter(e.target.value);

        let newTasks = tasks.map(task => {
            task.isVisible = (task.status !== e.target.value) ? false : true;
            return task;
        });

        setTasks(newTasks);
    }

    useEffect(async () => {
        const token = await getAccessTokenSilently();
        fetch(process.env.REACT_APP_API_URL + '/tasks', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                return res.json()
            })
            .then(taskJson => {
                taskJson.forEach(task => {
                    task['isVisible'] = true;
                });
                setTasks(taskJson);
                setIsLoading(false);
            },
            error => {
                console.log(error);
            });
    }, [setTasks]);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <Container className="py-5">
            <Row>
                <Col sm="2" className="py-2">
                    <select value={statusFilter} onChange={handleStatusOnChange}>
                        <option value="all">- All -</option>
                        <option value="open">Open</option>
                        <option value="inProgress">In Progress</option>
                        <option value="test">Needs Review</option>
                        <option value="approved">Approved</option>
                        <option value="closed">Closed</option>
                    </select>
                </Col>
                <Col sm="8">
                    <h2 className="text-center pb-3">Tasks</h2>
                </Col>
                <Col sm="2">
                    <Link to="/add/task" className="add-task position-absolute">
                        <FaPlusCircle />
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="list-group">
                        {tasks.map((task, i) => {
                            if (task.isVisible) {
                                return (
                                    <TaskListItem task={task} key={i} />
                                )
                            }
                        })}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default withAuthenticationRequired(Tasks, {
    onRedirecting: () => <Loading />,
});