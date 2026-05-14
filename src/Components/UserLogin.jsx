import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
    const [user, setUser] = useState({mail: "", password: "" })
    const navigate = useNavigate();
    const handleUser = (e) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin= async () => {
         console.log(user);
       
    try {
        const res = await fetch(`http://ec2-16-170-244-14.eu-north-1.compute.amazonaws.com:8080/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
             credentials: "include",   // 🔥 MUST
            body: JSON.stringify( user )
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Invalid mail or password");
        }

        setUser({ name: "", mail: "", password: "" });
        localStorage.setItem("user", JSON.stringify(data));
        navigate('/');

    } catch (err) {
        console.error(err.message);
        alert(err.message);
    }
    }


    return (
        <>
            <div>User</div>
            <input
                name="mail"
                value={user.mail}
                placeholder="Enter MailID"
                onChange={handleUser}>
            </input>
            <input
                name="password"
                value={user.password}
                placeholder="Enter password"
                onChange={handleUser}>
            </input>
            <button onClick={handleLogin}>Add</button>
        </>

    )
}

export default UserLogin