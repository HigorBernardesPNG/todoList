const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Carregar tarefas do arquivo JSON
const getTasks = () => {
    try {
        const data = fs.readFileSync('database.json', 'utf8');
        return data ? JSON.parse(data) : []; // Se o arquivo estiver vazio, retorna []
    } catch (error) {
        console.error("Erro ao ler database.json:", error);
        return []; // Se houver erro, retorna um array vazio
    }
};


// Salvar tarefas no arquivo JSON
const saveTasks = (tasks) => {
    fs.writeFileSync('database.json', JSON.stringify(tasks, null, 2));
};

// Rota para listar todas as tarefas
app.get('/tasks', (req, res) => {
    res.json(getTasks());
});

// Rota para adicionar uma nova tarefa
app.post('/tasks', (req, res) => {
    const tasks = getTasks();
    const newTask = { id: Date.now(), text: req.body.text, completed: false };
    tasks.push(newTask);
    saveTasks(tasks);
    res.status(201).json(newTask);
});

// Rota para atualizar uma tarefa
app.put('/tasks/:id', (req, res) => {
    let tasks = getTasks();
    tasks = tasks.map(task => task.id == req.params.id ? { ...task, completed: req.body.completed } : task);
    saveTasks(tasks);
    res.json(tasks);
});

// Rota para deletar uma tarefa
app.delete('/tasks/:id', (req, res) => {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id != req.params.id);
    saveTasks(tasks);
    res.json(tasks);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});