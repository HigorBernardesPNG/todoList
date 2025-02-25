import { useState } from "react";
import axios from "axios";
import './taskForm.css';

const TaskForm = ({ onTaskAdded }) => {

    const [text, setText] = useState('');

    const addTask = async () => {

        if (!text) return;
        const response = await axios.post('http://localhost:5000/tasks', { text })
        onTaskAdded(response.data);
        setText('');

    }

    return (

        <div className="container__taskForm">
            <input type="text" value={text} onChange={(e) => setText (e.target.value)} className="form-control" placeholder="Nova tarefa..." />
            <button onClick={addTask} className="btn btn-primary">Adicionar</button>
        </div>

    );

};

export default TaskForm;