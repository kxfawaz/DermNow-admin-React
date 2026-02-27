import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export default function AdminNavbar({ }) {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const onLogout = () => {
    setToken(null);
    navigate("/admin/login")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/questions">
          DermHub Admin
        </Link>

        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link className="nav-link" to="/questions">
                Questions List
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/consultations">
                Consultations
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/management">
                Admin Management
              </Link>
            </li>
          </ul>


          {/* Logout Button */}
          <button className="btn btn-danger" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
