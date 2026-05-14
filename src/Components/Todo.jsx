import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Todo() {
    const currentUserId = JSON.parse(localStorage.getItem("user"))?._id;
    const navigate = useNavigate();
    const [todo, setTodo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchTodo = async () => {
        try {
            setLoading(true);

            const res = await fetch("http://ec2-16-170-244-14.eu-north-1.compute.amazonaws.com:8080/todo", {
                credentials: "include"
            });
            if (res.status === 401) {
                navigate("/login");   // 🔥 redirect here
                return;
            }
            if (!res.ok) {
                throw new Error("Failed to fetch todos");
            }


            const data = await res.json();
            setTodo(data);

        } catch (err) {
            console.error(err.message);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchTodo();
    }, [])



    const deleteTodo = async (id) => {
        try {
            const res = await fetch(`http://ec2-16-170-244-14.eu-north-1.compute.amazonaws.com:8080/todo/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!res.ok) {
                throw new Error("Delete failed");
            }
            setTodo((prev) => prev.filter((t) => t._id !== id));

        } catch (err) {
            console.error(err);
            alert("Delete failed");
        }
    };


    return (
        <>
            <div>Todo List</div>
            <button onClick={() => navigate(`/add`)}>Add Todo</button>
            {loading && <p>Loading...</p>}

            {error && <p style={{ color: "red" }}>{error}</p>}

            {todo.map((d) =>

                <li key={d._id}>{d.task}
                    {d.createdBY === currentUserId && (
                        <>
                            <button onClick={() => navigate(`/update/${d._id}`)}>Update</button>
                            <button onClick={() => deleteTodo(d._id)}>Delete</button>
                        </>
                    )}

                </li>

            )}

        </>

    )
}

export default Todo