import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  fetchMainQuestion,
  updateMainQuestion,
  updateFollowupQuestion,
  deleteFollowupQuestion,
  deleteMainQuestion,
  addFollowupQuestion
} from "../api";

const AdminQuestionDetail = () => {
  // get question id from URL
  const { id } = useParams();

  // used for redirect after delete
  const navigate = useNavigate();

  // state for main question and followups
  const [question, setQuestion] = useState(null);
  const [followups, setFollowups] = useState([]);
  const [mainPrompt, setMainPrompt] = useState("");
  const [newFollowup, setNewFollowup] = useState("");

  // load main question and followups on mount
  useEffect(() => {
    async function loadData() {
      const data = await fetchMainQuestion(id);
      setQuestion(data);
      setMainPrompt(data.prompt);
      setFollowups(data.followups || []);
    }
    loadData();
  }, [id]);

  if (!question) return <div className="page-container">Loading...</div>;

  // update main question
  async function handleSaveMain() {
    const updated = await updateMainQuestion(id, { prompt: mainPrompt });
    setQuestion(updated);
    setMainPrompt(updated.prompt);
    alert("Main Question Updated");
  }

  // delete main question and redirect
  async function handleDeleteMain() {
    await deleteMainQuestion(Number(id));
    alert("Main Question Deleted");
    navigate("/questions");
  }

  // create new followup question
  async function handleCreateFollowup() {
    const created = await addFollowupQuestion(id, { prompt: newFollowup });
    setFollowups(prev => [...prev, created]);
    setNewFollowup("");
    alert("Followup Question Created!");
  }

  // update a followup question
  async function handleSaveFollowup(fid, newPrompt) {
    const updated = await updateFollowupQuestion(fid, { prompt: newPrompt });

    setFollowups(prev =>
      prev.map(f => (f.id === fid ? updated : f))
    );

    alert("Followup Question Updated!");
  }

  // delete a followup question
  async function handleDeleteFollowup(fid) {
    await deleteFollowupQuestion(fid);
    setFollowups(prev => prev.filter(f => f.id !== fid));
    alert("Followup Question Deleted!");
  }

  return (
    <div className="page-container">


      <h3>Edit Main Question</h3>

      <input
        className="edit-inputs mb-2"
        value={mainPrompt}
        onChange={e => setMainPrompt(e.target.value)}
      />

      <div className="btn-row">
        <button
          className="btn btn-primary"
          onClick={handleSaveMain}
        >
          <i className="bi bi-pencil-square"></i>
          Update
        </button>

        <button
          className="btn btn-primary"
          onClick={handleDeleteMain}
        >
          <i className="bi bi-trash"></i>
          Delete
        </button>
      </div>

  
      <h3 className="mt-4">Edit Followup Questions</h3>

      {followups.map(f => (
        <div key={f.id} className="mb-3">

          <input
            className="edit-inputs mb-2"
            value={f.prompt}
            onChange={e => {
              const updatedPrompt = e.target.value;

              setFollowups(prev =>
                prev.map(fl =>
                  fl.id === f.id ? { ...fl, prompt: updatedPrompt } : fl
                )
              );
            }}
          />

          <div className="btn-row">
            <button
              className="btn btn-primary"
              onClick={() => handleSaveFollowup(f.id, f.prompt)}
            >
              <i className="bi bi-pencil-square"></i>
              Update
            </button>

            <button
              className="btn btn-primary"
              onClick={() => handleDeleteFollowup(f.id)}
            >
              <i className="btn btn-primary"></i>
              Delete
            </button>
          </div>
        </div>
      ))}

      <h3>Create Followup Question</h3>

      <input
        className="create-inputs"
        placeholder="New followup question"
        value={newFollowup}
        onChange={e => setNewFollowup(e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={handleCreateFollowup}
      >
        <i className="bi bi-plus-circle"></i>
        Add Followup
      </button>

    </div>
  );
};

export default AdminQuestionDetail;