import {useState} from 'react'
import { useAuth } from '../provider/AuthProvider';
import axios from 'axios';



const AdminManagement = () => {

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const {token} = useAuth();
const [formData,setFormData] = useState({username:"",password:"",first_name:"",last_name:"",email:""})
const [error,setError] = useState("");
const [success,setSuccess] = useState("")

const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData((f)=> ({...f,[name]:value}))

}

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try{
        const res = await axios.post(
            `${BASE_URL}/api/admin/signup`,
            formData,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        setSuccess(res.data.message || "Admin created")
        setFormData({
            username:"",
            password:"",
            first_name:"",
            last_name:"",
            email:""
        })
        
    } catch(error) {
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
            {error && <p style={{color:"red"}}>{error}</p>}
            {success && <p style={{color:"green"}}>{success}</p>}

            
        </form>
    </div>
    </div>
    
)
}

export default AdminManagement