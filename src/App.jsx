import TaskCreator from './components/TaskCreator';
import TaskTable from './components/TaskTable';
import { Container } from './components/Container';
import { ShowDoneTasks } from './components/ShowDoneTasks';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [taskItems, settaskItems] = useState([]);
	const [showCompleted, setShowCompleted] = useState(false);

	function createNewTask(taskName) {
		if (!taskItems.find(task => task.name === taskName)) {
			settaskItems([...taskItems, { name: taskName, done: false }]);
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

	return (
		<main className='bg-dark vh-100 text-white'>
			<Container>
				<TaskCreator createNewTask={createNewTask} />
				<TaskTable tasks={taskItems} toggleTask={toggleTask} />

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
