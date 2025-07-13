import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css"; // Assuming you have a CSS file for global styles
import { v4 as uuidv4 } from 'uuid';
import React from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

useEffect(() => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    setTodos(JSON.parse(storedTodos));
  }
}, []);


  const saveToLS = (params)=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  };



  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false}]);
    setTodo("")
    saveToLS()
  }

  const handleEdit = (e,id) => {
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id!== id;
    });
    setTodos(newTodos);
    saveToLS()

 
  };

  const handleDelete = (e,id) => {
      let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
     saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  } 

  const handleCheckbox = (e) => {
   let id = e.target.name
   let index = todos.findIndex((item) => {
    console.log(`id is : ${id}`);
    return item.id === id;

    
   })
   console.log(`Index is : ${index}`);
   let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  
  return (
  <>
    <Navbar />
    <div className="container bg-slate-400 p-4 rounded-3xl shadow-lg mt-10 mx-auto min-h-150 w-full max-w-2xl">
      <div className="AddToDo bg-slate-400 p-4 rounded-3xl mt-5 w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          iTask - Your Task Planner
        </h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="flex-1 p-2 rounded-lg bg-slate-300"
            placeholder="Add a new task..."
          />
          <button
            onClick={handleAdd}
            disabled={todo.length === 0}
            className="bg-slate-700 disabled:bg-slate-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-slate-800 hover:font-medium transition-shadow duration-300"
          >
            Add Task
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mt-6">Your ToDos</h2>
      <div className="todos flex flex-col gap-4 mt-4">
        {todos.length === 0 && (
          <div className="text-center text-gray-600 text-xl mt-30"">
            No tasks available. Please add a task.
          </div>
        )}

        {todos.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center bg-slate-300 p-3 rounded-lg gap-3"
            >
              <input
                className="size-5 cursor-pointer"
                onChange={handleCheckbox}
                type="checkbox"
                checked={item.isCompleted}
                name={item.id}
              />
              <div
                className={`text-lg  sm:ml-4 ${item.isCompleted ? "line-through text-gray-500" : ""}`}
              >
                {item.todo}
              </div>
              <div className="flex gap-2 sm:ml-auto mt-2 sm:mt-0">
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className="cursor-pointer text-white px-3 py-1 rounded hover:bg-gray-400"
                >
                  ✏️
                </button>
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 cursor-pointer"
                >
                  X
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </>
);
}

export default App;
