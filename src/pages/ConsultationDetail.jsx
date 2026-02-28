import { fetchConsultation } from "../api"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const ConsultationDetail = () => {
  const { id } = useParams()
  const [consultation, setConsultation] = useState(null)

  useEffect(() => {
    async function loadConsult() {
      const data = await fetchConsultation(id)
      setConsultation(data)
    }
    loadConsult()
  }, [id])

  if (!consultation) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-900/40 p-6 shadow-lg shadow-black/30">
        <h2 className="text-2xl font-bold text-white">
          Consultation #{consultation.id}
        </h2>

        <div className="mt-4 space-y-2 text-slate-300">
          <p>
            <span className="font-semibold text-slate-200">Patient Name:</span>{" "}
            {consultation.user.first_name} {consultation.user.last_name}
          </p>
          <p>
            <span className="font-semibold text-slate-200">Status:</span>{" "}
            {consultation.status}
          </p>
          <p>
            <span className="font-semibold text-slate-200">Primary Concern:</span>{" "}
            {consultation.primary_concern}
          </p>
        </div>

        <hr className="my-6 border-white/10" />

        <h3 className="text-lg font-semibold text-white">Follow-up Answers</h3>

        <div className="mt-4 space-y-4">
          {consultation.followup_answers.map((f, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/10 bg-slate-950/40 p-4"
            >
              <p className="font-semibold text-slate-100">{f.prompt}</p>
              <p className="mt-2 text-slate-300">{f.text_answer || "—"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ConsultationDetail