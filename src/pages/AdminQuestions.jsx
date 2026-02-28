import { useEffect, useState } from "react";
import { fetchQuestions } from "../api";
import { useNavigate } from "react-router-dom";
import { addMainQuestion } from "../api";

const AdminQuestions = () => {

    // state holding all main questions
    const [questions, setQuestions] = useState(null);

    // state for creating a new main question
    const [newMainQuestion, setNewMainQuestion] = useState("")
    const [newFormId, setNewFormId] = useState(1)

    // navigation hook
    const navigate = useNavigate();

    // load questions when component mounts
    useEffect(() => {
        async function loadQuestions() {
            const data = await fetchQuestions();
            setQuestions(data)
        }
        loadQuestions()
    }, [])

    if (!questions) return <div className="page-container">Loading...</div>;

    // create new main question
    async function handleCreateMain() {
        const created = await addMainQuestion({
            prompt: newMainQuestion,
            form_id: newFormId,
        });

        // update UI instantly without refresh
        setQuestions(prev => [...prev, created]);

        setNewMainQuestion("");
        alert("Main Question Created!");

        // redirect back to questions page
        navigate("/questions")
    }

    return (
        <div className="page-container">
            <h2>All Consultation Questions</h2>
            {questions.map(q => (
                <div
                    key={q.id}
                    className="question-row"
                    style={{ cursor: "pointer" }}
                >
                    <span>{q.prompt}</span>

            

                    <i
                        className="bi bi-pencil-square fs-4"
                        onClick={() => navigate(`/questions/${q.id}`)}
                        style={{ cursor: "pointer" }}
                    ></i>

                </div>
            ))}


            <h3>Create Main Question</h3>

            <input
                className="create-inputs"
                placeholder="New main question"
                value={newMainQuestion}
                onChange={(e) => setNewMainQuestion(e.target.value)}
            />

            <button
                className="btn btn-primary"
                onClick={handleCreateMain}
            >
                <i className="bi bi-plus-circle"></i>
                Add Main Question
            </button>

        </div>
    )
}

export default AdminQuestions;