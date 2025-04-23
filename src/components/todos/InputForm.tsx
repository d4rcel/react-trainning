import { useState } from "react";
import { TodoItem } from "../../types/todos";


interface InpuFormProps {
    onAdd: (input: string) => void;
}

const InputForm: React.FC<InpuFormProps> = ({ onAdd }) => {

    const [input, setInput] = useState("")


    return (
        <>
            <form className="mb-2 flex justify-center items-center gap-2" onSubmit={(e) => {
                e.preventDefault();
                if (input) {
                    onAdd(input)
                }
                setInput("")
            }}>
                <input type="text" className="w-xl rounded-md border-2 border-solid border-amber-500" value={input} onChange={(e) => { setInput(e.target.value) }} />
                <button role="submit" >Ajouter</button>
            </form>
        </>
    )
}

export default InputForm