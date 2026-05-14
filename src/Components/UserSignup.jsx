import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function User() {
    const [user, setUser] = useState({ name: "", mail: "", password: "" })
    const navigate = useNavigate();
    const handleUser = (e) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSignup = async () => {
        console.log(user); // for now
        try {
            const res = await fetch(`http://ec2-16-170-244-14.eu-north-1.compute.amazonaws.com:8080/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (!res.ok) {
                throw new Error("Failed to add user");
            }

            setUser({ name: "", mail: "", password: "" });
            navigate('/');

        } catch (err) {
            console.error(err.message);
            alert("Something went wrong");
        }
    };


    return (
        <>
            <div>User</div>
            <input
                name="name"
                value={user.name}
                placeholder="Enter Name"
                onChange={handleUser}>
            </input>
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
            <button onClick={handleSignup}>Add</button>
        </>
    )
}

export default User;