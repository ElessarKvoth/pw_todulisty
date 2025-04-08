import { use, useState } from "react";
import "./ListaTarefasStyle.css";

function ListaTarefas(){

    const [tarefas, setTarefas] = useState([]);
    
    const [novaTarefa, setNovaTarefa] = useState('');

    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== ''){
            setTarefas([...tarefas, novaTarefa]);
        setNovaTarefa("");
        };
    };

    const removerTarefa = (indice) => {
        setTarefas(tarefas.filter((_,i) => i !== indice));
    };

    return(
        <div className="telao">
            <h2 >Lista De Tarefas</h2>
            <input
                type= 'text'
                value={novaTarefa}
                onChange={(e) => setNovaTarefa(e.target.value)}
                placeholder= 'Digite uma nova tarefa'

            />
            <button onClick={adicionarTarefa} >Adicionar</button>
            <ul>
                {tarefas.map((tarefa, indice) => (
                    <li key = {indice} >
                        {tarefa} <button onClick={() => removerTarefa(indice)}>Remover</button>
                    </li>
                ))}    
            </ul>
        </div>
    );
}

export default ListaTarefas;