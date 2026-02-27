import { useNavigate } from "react-router-dom"
import { useAuth } from "../provider/AuthProvider"
import axios from "axios"
import { useState } from "react"

const AdminLogin = () => {
  const { setToken } = useAuth()  //accesing the token from context
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [err, setError] = useState("")

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }))
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/login`,
        formData
      );

      console.log("LOGIN OK:", res.status, res.data);

      const token = res.data.access_token || res.data.token || res.data.accessToken;
      if (!token) {
        setError("Login succeeded but no token returned");
        return;
      }
      console.log("typeof setToken:", typeof setToken);
      setToken(token);
      navigate("/consultations", { replace: true });
    } catch (err) {
      console.log("LOGIN ERR:", err);
      const msg =
        err.response?.data?.error ||
        err.response?.data?.msg ||
        "Login failed";
      setError(msg);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Admin Login</h1>
        <p className="auth-subtitle">Sign in to manage the dashboard</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field">
            <label className="label">Username</label>
            <input
              className=".admin-login-input"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label className="label">Password</label>
            <input
              className=".admin-login-input"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {/* if error exists, show the error in a <p */}
          {err && <p style={{ color: "red" }}>{err}</p>}

          <button className="btn btn-primary" type="submit">Login</button>
        </form>
      </div>
    </div>

  )
}
export default AdminLogin