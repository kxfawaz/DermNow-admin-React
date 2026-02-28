import { fetchConsultation } from "../api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ConsultationDetail = () => {

  // get consultation id from URL
  const { id } = useParams();

  // state to store consultation details
  const [consultation, setConsultation] = useState(null);

  // load consultation on mount
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


        {consultation.followup_answers[0]?.file_path && (
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/${consultation.followup_answers[0].file_path}`}
            alt="consultation"
            style={{ maxWidth: 240, marginTop: 20, borderRadius: 8 }}
          />
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
            {consultation.followup_answers.map((f, idx) => {

              // build image URL (not used here anymore)
              const imgUrl = f.file_path
                ? `${import.meta.env.VITE_API_BASE_URL}/${f.file_path}`
                : null;

              return (
                <tr key={idx}>
                  <td>{f.prompt}</td>
                  <td>
                    <div>{f.text_answer}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default ConsultationDetail;