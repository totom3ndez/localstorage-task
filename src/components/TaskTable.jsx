import TaskRow from './TaskRow';

const TaskTable = ({ rowStyle, tasks, toggleTask, showCompleted = false }) => {
	const taskTableRows = doneValue => {
		return tasks
			.filter(task => task.done === doneValue)
			.map((task, index) => (
				<TaskRow
					rowStyle={rowStyle}
					task={task}
					key={index}
					toggleTask={toggleTask}
				/>
			));
	};

	return (
		<table className='table table-dark table-striped table-bordered border-secondary'>
			<thead>
				<tr className='table-primary text-center'>
					<th>Tasks</th>
				</tr>
			</thead>
			<tbody>{taskTableRows(showCompleted)}</tbody>
		</table>
	);
};

export default TaskTable;
