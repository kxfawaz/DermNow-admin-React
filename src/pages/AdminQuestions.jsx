import { useEffect, useState } from "react";
import { fetchQuestions } from "../api";
import { useNavigate } from "react-router-dom";
import { addMainQuestion } from "../api";


const AdminQuestions = () => {
    const [questions, setQuestions] = useState(null);

    // Create main question state
    const [newMainQuestion, setNewMainQuestion] = useState("")
    const [newFormId, setNewFormId] = useState(1)

    const navigate = useNavigate();

    useEffect(() => {
        async function loadQuestions() {
            const data = await fetchQuestions();
            setQuestions(data)
        }
        loadQuestions()
    }, [])

    if (!questions) return <div className="page-container">Loading...</div>;


    async function handleCreateMain() {
        const created = await addMainQuestion({
            prompt: newMainQuestion,
            form_id: newFormId,
        });
        setQuestions(prev => [...prev, created]);  // UPDATE LIST INSTANTLY so i dont need to refresh
        setNewMainQuestion("");
        alert("Main Question Created!");
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
                    {/* Edit Icon */}
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