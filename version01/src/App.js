import React,{useState,useEffect} from "react";  //Added useEffect for localStorage
import Todo from "./components/todo"; 
import TodoForm from "./components/TodoForm";

function App() {
 const [todoText,setTodoText]=useState("");
 const [todos,setTodos]=useState([]);
 const [isEdit,setIsEdit]=useState(false);
 const [willUpdateTodo,setWillUpdateTodo]= useState("");


 // editing localstorage start
 useEffect(()=>{
 const todosFromLocalStorage=localStorage.getItem("todos");
 console.log(todosFromLocalStorage);
 if(todosFromLocalStorage === null){
  localStorage.setItem("todos", JSON.stringify([]));

 }else{
  setTodos(JSON.parse(todosFromLocalStorage));
 }
 },[]);

  // editing localstorage start




const deleteTodo = (id) => {
  console.log(id);
  const filteredTodos=todos.filter(item=>item.id !== id);
  setTodos(filteredTodos);
  localStorage.setItem("todos", JSON.stringify(filteredTodos));  //localStorage settings
}
 
 const changeIsDone=(id)=>{
 
  const searchedTodo=todos.find((item) => item.id === id);
  const updatedTodo={
    ...searchedTodo,
    isDone:!searchedTodo.isDone
  }
  const filteredTodos = todos.filter((item) =>item.id !== id);
  setTodos([updatedTodo,...filteredTodos]);
  localStorage.setItem("todo", JSON.stringify([updatedTodo,...filteredTodos])); //localStorage settings

 };




  const handleSubmit = (event) => {
  event.preventDefault();
  if (todoText === ""){
    alert("todo text can't be empty!");
    return;
  }
const hasTodos=todos.find((item) => item.text ===todoText)
console.log(hasTodos);
if (hasTodos !== undefined){
  alert("you have the todo already")
  return
}

if(isEdit === true){
  console.log(willUpdateTodo, "todo'yu güncelleyeceğiz");
  const searchedTodo=todos.find(item=>item.id===willUpdateTodo)
  const updatedTodo={
    ...searchedTodo,
    text:todoText
  }


const filteredTodos=todos.filter(item=>item.id !== willUpdateTodo);
setTodos([...filteredTodos,updatedTodo]);
localStorage.setItem("todos", JSON.stringify([...filteredTodos,updatedTodo])); //localStorage settings
setTodoText("");
setIsEdit(false);
setWillUpdateTodo("");
}else{
  const newTodo = {
    id: new Date().getTime(),
    isDone: false,
    text: todoText,
    date: new Date(),
};

  setTodos([...todos, newTodo]);
  localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));   //We connect localStorage as database to add operation
  setTodoText("");
  
  }
  
};

  return (
    
    

    <div className="container backgroundTodo">
      
      <h1 className="text-center my-5">Todo App</h1>
      <TodoForm 
      handleSubmit={handleSubmit}
      todoText={todoText}
      setTodoText={setTodoText}
      isEdit={isEdit}
           
      />
      

     
      {
        todos.length <= 0 ? (
          <p className="text-center my-5">You dont't have any todos yet.</p>
        ):(
         <>
         { todos.map((item) => (

          <Todo item={item} 
          deleteTodo={deleteTodo} 
          setIsEdit={setIsEdit} 
          setWillUpdateTodo={setWillUpdateTodo} 
          setTodoText={setTodoText} 
          changeIsDone={changeIsDone} />
         
         ))}
       
         </>
       )}
      </div>
  );
}

export default App;
