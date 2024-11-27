import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";
import { BiTrash } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { BiSave } from "react-icons/bi";


export const Todos = ({todo}) => {
    const [task, setTask] = useState(todo.text)
    const [isEditable, setIsEditable] = useState(false)
    const dispatch = useDispatch()
    const inputRef = useRef()    

    const handleEdit = () => {
        if (isEditable){
            dispatch(updateTodo({id: todo.id, text:task}))
            setIsEditable(!isEditable)
        }else {
            // inputRef.focus()
            setIsEditable(!isEditable)
        }
    }

    const style = {
        color: todo.completed ? "lawngreen" : "white",
        textDecoration: todo.completed ? "line-through" : ""
    }
    
    return (
        <div className="todos">
            <div className="content">
                {
                    !isEditable ? <input  type="checkbox" checked={todo.completed} onChange={() => dispatch(updateTodo({id: todo.id, completed:!todo.completed}))}/>
                    : ""
                }
                {
                    isEditable ? <input autoFocus type="text" readOnly={!isEditable} value={task} onChange={(event) => setTask(event.target.value)}/>
                    : <div className="todo-text" style={style}>{todo.text}</div>
                }
            </div>
            <div className="icons">
                {
                    !todo.completed ? 
                    <button className="icon-btns" onClick={handleEdit}>{isEditable ? <BiSave size={25} color="lawngreen"/> : <BiEdit color="orange" size={25}/>}</button> : ""
                }
                <button className="icon-btns" onClick={() => dispatch(removeTodo(todo.id))}><BiTrash color="red" size={25}/></button>
            </div>
        </div>
    )
}