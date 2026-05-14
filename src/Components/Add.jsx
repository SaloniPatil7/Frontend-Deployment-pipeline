import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Add() {
    const [task, setTask] = useState("");
    const navigate = useNavigate();

    const handleAdd = async () => {
        try {
            const res = await fetch(`http://ec2-16-170-244-14.eu-north-1.compute.amazonaws.com:8080/todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({ task })
            });
            console.log("STATUS:", res.status);
            if (res.status === 401) {
                navigate("/login");   // 🔥 redirect here
                return;
            }

            if (!res.ok) {
                throw new Error("Failed to add task");
            }

            setTask("");
            navigate('/');

        } catch (err) {
            console.error(err.message);
            alert("Something went wrong");
        }
    };


    return (
        <>
            <div>Add</div>
            <input value={task} placeholder='Enter Task'
                onChange={(e) => setTask(e.target.value)}>

            </input>
            <button onClick={handleAdd}>Add</button>
        </>

    )
}

export default Add