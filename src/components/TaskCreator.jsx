import { useState } from 'react';

const TaskCreator = ({ createNewTask }) => {
	const [newTaskName, setNewTaskName] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		createNewTask(newTaskName);
		setNewTaskName('');
	};

	return (
		<form onSubmit={handleSubmit} className='my-2 row'>
			<div className='col-9'>
				<input
					className='form-control '
					type='text'
					placeholder='Enter a task'
					value={newTaskName}
					onChange={e => {
						setNewTaskName(e.target.value);
					}}
				/>
			</div>
			<div className='col-3 text-center'>
				<button className='btn btn-primary btn-sm'>Save task</button>
			</div>
		</form>
	);
};

export default TaskCreator;
