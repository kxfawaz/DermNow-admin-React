import { fetchConsultations } from "../api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ConsultationList = () => {

  // debug to see when component renders
  console.log("ConsultationList rendered");

  // state holding all consultations
  const [consultations, setConsultations] = useState([])

  // navigation hook for row click
  const navigate = useNavigate()

  // load consultations when component mounts
  useEffect(() => {
    console.log("ConsultationList useEffect ran");

    async function loadConsults() {
      const data = await fetchConsultations();
      setConsultations(data)
    }

    loadConsults()

  }, [])

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
            // render each consultation row
            {consultations.map((c) => (
              <tr
                key={c.id}
                // clicking row navigates to detail page
                onClick={() => navigate(`/consultations/${c.id}`)}
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
}

export default ConsultationList