import { fetchConsultation } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ConsultationDetail = () => {
  const { id } = useParams();
  const [consultation, setConsultation] = useState(null);

  useEffect(() => {
    async function loadConsult() {
      const data = await fetchConsultation(id);
      console.log("DETAIL DATA:", data);
      setConsultation(data);
    }
    loadConsult();
  }, [id]);

  if (!consultation) return <div className="page-container">Loading...</div>;

  return (
    <div className="page-container">
      <div className="card">
        <h2>Consultation #{consultation.id}</h2>
        <p><strong>Patient Name:</strong> {consultation.user.first_name} {consultation.user.last_name}</p>
        <p><strong>Status:</strong> {consultation.status}</p>
        <p><strong>Primary Concern:</strong> {consultation.primary_concern}</p>
        {consultation.photos?.length > 0 && (
          <>
            <h3 style={{ marginTop: "24px" }}>Photos</h3>
            <div className="photo-grid">
              {consultation.photos.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`consultation-${i}`}
                  style={{ maxWidth: 240, marginRight: 12, marginBottom: 12 }}
                />
              ))}
            </div>
          </>
        )}


        <h3 style={{ marginTop: "24px" }}>Follow-up Answers</h3>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>

          <tbody>
            {consultation.followup_answers.map((f, idx) => (
              <tr key={idx}>
                <td>{f.prompt}</td>
                <td>{f.text_answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultationDetail;
