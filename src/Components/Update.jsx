import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function Update() {
    const { id } = useParams();          // ✅ get id from URL
    const navigate = useNavigate();
    const [task, setTask] = useState("");

    const fetchTodo = async () => {
        const res = await fetch(`http://ec2-16-170-244-14.eu-north-1.compute.amazonaws.com:8080/todo/${id}`, {
            credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        setTask(data.task);
    }
    useEffect(() => {
        fetchTodo();
    }, [])


    const handleUpdate = async () => {
        await fetch(`http://ec2-16-170-244-14.eu-north-1.compute.amazonaws.com:8080/todo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({ task })
        });

        navigate('/');
    }


    return (
        <>
            <div>Upate</div>
            <input value={task}
                onChange={(e) => setTask(e.target.value)}>

            </input>
            <button onClick={handleUpdate}>Update</button>
        </>

    )
}

export default Update