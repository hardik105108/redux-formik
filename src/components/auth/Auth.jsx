import React, { useState } from 'react'
import './auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Auth = ({ isLogin }) => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { uname, email, password, cpwd } = formData
        const users = JSON.parse(localStorage.getItem('users')) || []
        if (isLogin) {
            const user = users.find(user => user.email === email && user.password === password)
            if (user) {
                localStorage.setItem("curretnUser", JSON.stringify(user))
                // toast.success("Login successfully   ")
                navigate("/")
            } else {
                // toast.error("email or password doesn't match")
            }
            // await axios.get("http://localhost:4001/users", formData)
        } else {
            const existUser = users.find(user => user.email === email)
            if (existUser) {
                console.log("user email already exists")
            }
            else {
                const userId = users.length > 0 ? Math.max(...users.map(i => i.userId)) + 1 : 1;
                const newUsers = { userId, uname, email, password }
                users.push(newUsers)
                localStorage.setItem("users", JSON.stringify(users))
                navigate("/login")
                setFormData({ uname: ' ', email: ' ', password: ' ' })
            }
            // await axios.post("http://localhost:4001/users", formData)
        }
    }
    return (
        <div className='auth'>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>{isLogin ? "Login" : "Register"}</h2>
                </div>
                {!isLogin &&
                    <div>
                        <label htmlFor="uname">Username</label>
                        <input type="text" name='uname' id='uname' value={formData.uname} onChange={handleChange} />
                    </div>
                }
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='email' value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='password' value={formData.password} onChange={handleChange} />
                </div>
                {!isLogin &&
                    <div>
                        <label htmlFor="cpwd">Confirm password</label>
                        <input type="password" name='cpwd' id='cpwd' value={formData.cpwd} onChange={handleChange} />
                    </div>}
                <div>
                    <button type='submit'>  {isLogin ? "Login" : "Register"}</button>
                </div>
            </form>
        </div>
    )
}

export default Auth