import TaskItem from '../taskItem/taskItem';

const TaskList = ({ tasks, onTaskUpdated,onTaskDeleted }) => {

    return (

        <ul>

            {tasks.map (task => (
                <TaskItem key={task.id} task={task} onTaskUpdated={onTaskUpdated} onTaskDeleted={onTaskDeleted} />
            ))}

        </ul>
    );

};

export default TaskList;