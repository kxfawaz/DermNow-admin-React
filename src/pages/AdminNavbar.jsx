import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export default function AdminNavbar({ }) {

  // used for programmatic navigation
  const navigate = useNavigate();

  // get function to clear JWT token
  const { setToken } = useAuth();

  // logout handler
  const onLogout = () => {
    // remove token from auth context
    setToken(null);

    // redirect to login page
    navigate("/admin/login")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
      <div className="container-fluid">

        // brand link
        <Link className="navbar-brand" to="/questions">
          DermHub Admin
        </Link>

        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            // link to questions page
            <li className="nav-item">
              <Link className="nav-link" to="/questions">
                Questions List
              </Link>
            </li>

            // link to consultations page
            <li className="nav-item">
              <Link className="nav-link" to="/consultations">
                Consultations
              </Link>
            </li>

            // link to admin management page
            <li className="nav-item">
              <Link className="nav-link" to="/admin/management">
                Admin Management
              </Link>
            </li>

          </ul>

          // logout button
          <button className="btn btn-danger" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}