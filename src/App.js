import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fontsource/quicksand";
import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./componentes/taskForm/taskForm";
import TaskList from "./componentes/taskList/taskList";


function App() {
    const [tasks, setTasks] = useState([]);

    // Função para buscar as tarefas do backend
    useEffect(() => {
        axios.get("http://localhost:5000/tasks")
            .then(response => setTasks(response.data))
            .catch(error => console.error("Erro ao buscar tarefas:", error));
    }, []);

    // Função para adicionar uma nova tarefa
    const handleTaskAdded = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    // Função para atualizar a lista quando uma tarefa for modificada
    const handleTaskUpdated = async () => {
        const response = await axios.get("http://localhost:5000/tasks");
        setTasks(response.data);
    };

    // Função para atualizar a lista quando uma tarefa for deletada
    const handleTaskDeleted = async () => {
        const response = await axios.get("http://localhost:5000/tasks");
        setTasks(response.data);
    };

    return (
        <div className='container__app'>
            <h1>Lista de Tarefas</h1>

            <TaskForm onTaskAdded={handleTaskAdded} />

            <div className='container__app__taskItem'>
                <TaskList tasks={tasks} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} />
            </div>
        </div>
    );
}

export default App;
