const TaskRow = ({ task, toggleTask, rowStyle }) => {
	return (
		<tr>
			<td style={{ rowStyle }} className='d-flex justify-content-between'>
				{task.name}
				<input
					type='checkbox'
					checked={task.done}
					onChange={() => {
						toggleTask(task);
					}}
				/>
			</td>
		</tr>
	);
};

export default TaskRow;
