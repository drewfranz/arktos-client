import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { TaskItem } from '../containers';

import { Loading } from "../components";
import { Container } from 'reactstrap';

const TaskDetail = () => {
    const [task, setTask] = useState({});
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const { getAccessTokenSilently } = useAuth0();

    const grandparentHandleOnChange = async (e) => {
        let token = await getAccessTokenSilently();
        const { name, value } = e.target;
        const newTask = {
            ...task
        };
        newTask[name] = value;
        setTask(newTask);

        fetch(process.env.REACT_APP_API_URL + '/tasks/' + id, {
            method: 'PUT',
            body: JSON.stringify(newTask),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    }

    useEffect(async () => {
        let token = await getAccessTokenSilently();
        fetch(process.env.REACT_APP_API_URL + '/tasks/' + id, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                return res.json()
            })
            .then(taskJson => {
                setTask(taskJson);
                setIsLoading(false);
            },
            error => {
                console.log(error);
            });
    }, [setTask]);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <Container className="py-5" fluid="lg">
            <TaskItem task={task} grandparentHandleOnChange={grandparentHandleOnChange} />
        </Container>
    );
};

export default withAuthenticationRequired(TaskDetail, {
    onRedirecting: () => <Loading />,
});
