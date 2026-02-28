import { useState } from 'react'
import { useAuth } from '../provider/AuthProvider';
import axios from 'axios';

const AdminManagement = () => {

    // backend base URL
    const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

    // JWT token from AuthProvider
    const { token } = useAuth();

    // state for form inputs
    const [formData, setFormData] = useState({ username: "", password: "", first_name: "", last_name: "", email: "" })

    // state for feedback messages
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")

    const handleChange = (e) => {
        // update the field that changed
        const { name, value } = e.target;
        setFormData((f) => ({ ...f, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // clear old messages
        setError("");
        setSuccess("");

        try {
            // send request to protected admin signup route
            const res = await axios.post(
                `${BASE_URL}/api/admin/signup`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )

            // show success message
            setSuccess(res.data.message || "Admin created")

            // reset form after success
            setFormData({
                username: "",
                password: "",
                first_name: "",
                last_name: "",
                email: ""
            })

        } catch (error) {
            // show backend error message if available
            const msg =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Create Admin failed";
            setError(msg)
        }
    }

    return (

        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">Create Admin</h1>

                <form onSubmit={handleSubmit} className="auth-form">

                    <div className="field">
                        <label className="label">Username</label>
                        <input
                            className=".admin-login-input"
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <input
                            className=".admin-login-input"
                            name='password'
                            type='password'
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field">
                        <label className="label">First Name</label>
                        <input
                            className=".admin-login-input"
                            name='first_name'
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field">
                        <label className="label">Last Name</label>
                        <input
                            className=".admin-login-input"
                            name='last_name'
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <input
                            className=".admin-login-input"
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <button className="btn btn-primary" type='submit'>Submit</button>


                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}

                </form>
            </div>
        </div>

    )
}

export default AdminManagement