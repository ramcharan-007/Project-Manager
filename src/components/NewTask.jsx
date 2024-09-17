import { useState } from "react";
import Modal from "./Modal";

export default function NewTask({onAdd}){
    const [enteredTask, setEnteredTask] = useState('');

    function handleChange(event){
        setEnteredTask(event.target.value);
    }

    function handleClick(){
        if(enteredTask.trim() !== ''){
            onAdd(enteredTask);
        }else{
            return <Modal buttonCaption="Close">Enter something</Modal>
        }
        setEnteredTask('');
    }

    return (
        <div className="flex items-center gap-4">
            <input value={enteredTask} onChange={handleChange} type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200"/>
            <button className="text-stone-700 hover:text-stone-950" onClick={handleClick}>Add Task</button>
        </div>
    )
}