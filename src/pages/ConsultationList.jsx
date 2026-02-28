import { fetchConsultations } from "../api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ConsultationList = () => {

  console.log("ConsultationList rendered");

  const [consultations, setConsultations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("ConsultationList useEffect ran");

    async function loadConsults() {
      const data = await fetchConsultations();
      setConsultations(data);
    }

    loadConsults();

  }, []);

  return (
    <div className="page-container">
      <div className="card">
        <h2>Consultations</h2>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Primary Concern</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {consultations.map((c) => (
              <tr
                key={c.id}
                onClick={() => navigate(`/consultations/${c.id}`)}
                style={{ cursor: "pointer" }}
              >
                <td>{c.id}</td>
                <td>{c.user}</td>
                <td>{c.primary_question}</td>
                <td>{c.status}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ConsultationList;