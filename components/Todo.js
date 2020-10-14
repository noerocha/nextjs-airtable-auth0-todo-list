import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';


export default function Todo({ todo }) {
	const { updateTodo, deleteTodo } = useContext(TodosContext);

	const { description, completed } = todo.fields;
	const handleToggleTodo = () => {
		const updatedFields = {
			...todo.fields,
			completed: !todo.fields.completed
		}
		const updatedTodo = { id: todo.id, fields: updatedFields }
		updateTodo(updatedTodo)
	}

	return (
		<li className="bg-white flex items-center shadow-lg rounded-lg my-2 py-2 px-4">
			<input
				className="mr-2 form-checkbox h-5 w-5"
				type="checkbox"
				name="completed"
				id="completed"
				checked={completed}
				onChange={handleToggleTodo}
			/>
			<p className={`flex-1 text-gray-800 ${completed ? 'line-through' : ''}`}>{description}</p>
			<button
				className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
				onClick={() => deleteTodo(todo.id)}
				type="button"
			>
				Delete
			</button>
		</li>
	)
}