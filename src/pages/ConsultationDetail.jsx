import { fetchConsultation } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ConsultationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consultation, setConsultation] = useState(null);   // ✅ FIXED

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
        <p>{consultation.followup_answers.map((f, idx) => (
          <div key={idx} style={{ marginBottom: "16px" }}>
            <strong><p>{f.prompt}</p></strong>
            <p>{f.text_answer}</p>
          </div>

        ))}</p>
      </div>
    </div>
  );
};

export default ConsultationDetail;
