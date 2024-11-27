import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    // todos: [{id:1, text:"Learn React", completed: false}]
    todos: localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) :[],
    filter: localStorage.getItem("filter") ? JSON.parse(localStorage.getItem("filter")) : "all"
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
                completed: false
            }
            state.todos.push(todo)
            localStorage.setItem("todos", JSON.stringify(state.todos))
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
            localStorage.setItem("todos", JSON.stringify(state.todos))
        },
        updateTodo: (state, action) => {
            const updatedTodo = state.todos.map((todo) => {    
                if (todo.id === action.payload.id){
                    if (action.payload.completed !== undefined) todo.completed = action.payload.completed
                    if (action.payload.text) todo.text = action.payload.text   
                }
                return todo
            })
            state.todos = updatedTodo
            localStorage.setItem("todos", JSON.stringify(state.todos))
        },
        setCategory: (state, action) => {
            state.filter = action.payload
            localStorage.setItem("filter", JSON.stringify(state.filter))
        }
    }
})

// For Components to Use Reducers
export const { addTodo, removeTodo, updateTodo, deleteTodo, setCategory } = todoSlice.actions

// For Store to Register Our Reducer
export default todoSlice.reducer
