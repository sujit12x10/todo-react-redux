import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../features/todo/todoSlice";
import { addTodo } from "../features/todo/todoSlice";
import { Todos } from "./Todos";

export const AddTodo = () => {
    const [input, setInput] = useState("")
    const [todoList, setTodoList] = useState(null)
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos)
    const category = useSelector(state => state.filter)
    const [filter, setFilter] = useState("all")
    
    const addTodoHandler = (event) => {
        event.preventDefault()
       if (input.length === 0){
        alert("Empty Task is Invalid!")
       } else{
        dispatch(addTodo(input))
        setInput("")
       }
    }

    console.log(todoList);
    

    useEffect(() => {
        if (todos){
            if (category === "completed") {
                setTodoList(todos.filter(todo => todo.completed === true))
            } else if (category === "pending") {
                setTodoList(todos.filter(todo => todo.completed !== true))
            } else {
                setTodoList(todos)
            }
        }
    }, [todos, category])

    
    return (
        <>  
            <div className="todo-form-box">
                <form id="todo-form" onSubmit={addTodoHandler}>
                    <input type="text" value={input} placeholder="Enter Task...." onChange={(event) => setInput(event.target.value)}/>
                    <button>Add Todo</button>
                </form>
            </div>
            {
                todos.length > 0 ? 
                <div className="category">
                    <input checked={category === "all"} onChange={() => dispatch(setCategory("all"))} type="radio" name="filter" value="all"/> All
                    <input checked={category === "completed"} onChange={() => dispatch(setCategory("completed"))} type="radio" name="filter" value="completed"/> Completed
                    <input checked={category === "pending"} onChange={() => dispatch(setCategory("pending"))} type="radio" name="filter" value="pending"/> Pending
                </div> : ""
            }
            
            {
                todos.length === 0 ? <div className="empty"><h2>You have no todo's please add one.</h2></div>
                :todoList && todoList.map(todo => <div className="todo-item" key={todo.id}><Todos todo={todo}/></div>)
            }
        </>
    )
}