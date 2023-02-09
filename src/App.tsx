import React, { useState } from 'react';
import './App.css';
import { v4 } from 'uuid';


function App() {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState<Todo[]>([]);

	type Todo = {
		inputValue: string;
		id: string;
		checked: boolean;
	};
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newTodo: Todo = {
			inputValue: inputValue,
			id: v4(),
			checked: false,
		};

		setTodos([newTodo, ...todos]);
		setInputValue("");
	};

	const handleEdit = (id: string, inputValue: string) => {
		const newTodo = todos.map((todo) => {
			if(todo.id === id) {
				todo.inputValue = inputValue;
			}
			return todo;
		});
		setTodos(newTodo);
	};

	const handleChecked = (id: string, checked: boolean) => {
		const newTodos = todos.map((todo) => {
			if(todo.id === id) {
				todo.checked = !checked;
			}
			return todo;
		});
		setTodos(newTodos);
	};

	const handleDelete = (id: string) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
	} 
  return (
    <div className="App">
		<div className='container'>
		<h1>React TypeScript Todo App</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input type="text" onChange={(e) => handleChange(e)} className="inputText" value={inputValue} />
				<button type="submit">Add</button>
			</form>
			<ul className='todoList'>
				{todos.map((todo) => (
					<li key={todo.id}>
						<input type="text"
						onChange={(e) => handleEdit(todo.id, e.target.value)}
						className="listText"
						value={todo.inputValue}
						disabled={todo.checked} />
						<input type="checkbox" id={`box-${todo.id}`} onChange={(e) => handleChecked(todo.id, todo.checked)} /><label htmlFor={`box-${todo.id}`}></label>
						<button onClick={()=> handleDelete(todo.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
    </div>
  );
}

export default App;
