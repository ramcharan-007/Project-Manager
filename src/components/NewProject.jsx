import Input from "./Input";
import { useRef } from "react";
import Modal from "./Modal";

export default function NewProject({onAdd, onCancel}){
    const modalRef = useRef()
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    function handleSave(){
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        if(enteredTitle.trim() === '' ||
            enteredDescription.trim() === '' ||
            enteredDueDate.trim() === ''){
                modalRef.current.open();
                return;
            }

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        })
    }


    return(
        <>
        <Modal ref={modalRef} buttonCaption="Close">
            <h2 className='text-xl font-bold text-stone-800 my-4'>Invalid Input</h2>
            <p className='text-stone-600 mb-4'>Oops... looks like you forgot to enter values.</p>
            <p className='text-stone-600 mb-4'>Please make sure to provide a valid value for every input feild</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li><button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>Cancel</button></li>
                <li><button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 "
                        onClick={handleSave}>
                    Save
                    </button></li>
            </menu>

            <div>
                <Input type="text" ref={title} label="Title" isTextarea={false} />
                <Input ref={description} label="Description" isTextarea={true} />
                <Input type="date" ref={dueDate} label="Due Date" isTextarea={false} />
            </div>
        </div>
        </>
    )
}