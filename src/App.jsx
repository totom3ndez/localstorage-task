import TaskCreator from './components/TaskCreator';
import TaskTable from './components/TaskTable';
import { Container } from './components/Container';
import { ShowDoneTasks } from './components/ShowDoneTasks';
import { useState, useEffect } from 'react';

function App() {
	const [taskItems, settaskItems] = useState([]);
	const [showCompleted, setShowCompleted] = useState(false);
	const [isImportant, setIsImportant] = useState(false);

	function createNewTask(taskName) {
		if (!taskItems.find(task => task.name === taskName)) {
			settaskItems([
				...taskItems,
				{ name: taskName, done: false, important: isImportant },
			]);
		}
	}

	const toggleTask = task => {
		settaskItems(
			taskItems.map(t => (t.name === task.name ? { ...t, done: !t.done } : t)),
		);
	};

	const cleanTasks = () => {
		settaskItems(taskItems.filter(task => !task.done));
		setShowCompleted(false);
	};

	useEffect(() => {
		let data = localStorage.getItem('tasks');
		if (data) {
			settaskItems(JSON.parse(data));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(taskItems));
	}, [taskItems]);

	const handleOnChange = () => {
		setIsImportant(!isImportant);
	};

	return (
		<main className='bg-dark vh-100 text-white'>
			<Container>
				<TaskCreator createNewTask={createNewTask} />
				<label className='col-4 my-2'>
					Important
					<input
						className='ms-2'
						type='checkbox'
						checked={isImportant}
						onChange={handleOnChange}
					/>
				</label>
				<TaskTable
					tasks={taskItems}
					toggleTask={toggleTask}
					rowStyle={() => {
						if (isImportant) {
							return { backgroundColor: 'red' };
						}
					}}
				/>

				<ShowDoneTasks
					isChecked={showCompleted}
					setShowCompleted={checked => setShowCompleted(checked)}
					cleanTasks={cleanTasks}
				/>

				{showCompleted && (
					<TaskTable
						tasks={taskItems}
						toggleTask={toggleTask}
						showCompleted={showCompleted}
					/>
				)}
			</Container>
		</main>
	);
}

export default App;
