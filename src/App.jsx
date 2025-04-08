import React, { useState } from 'react';
import './App.css';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      setTarefas([...tarefas, { texto: novaTarefa, concluida: false }]);
      setNovaTarefa('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      adicionarTarefa();
    }
  };

  const limparTarefas = () => {
    setTarefas([]); // Limpa todas as tarefas
  };

  const concluirTarefa = (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas[index].concluida = !novasTarefas[index].concluida; // Alterna o estado de concluída
    setTarefas(novasTarefas);
  };

  return (
    <div id="root">
      <div id="background-left"></div>

      <div id="background-center">
        <div className="content">
          <h1 className="title">Gerenciador de Tarefas</h1>
          <p className="subtitle">Lista de Tarefas</p>

          <div className="input-container">
            <input
              type="text"
              placeholder="Digite uma nova tarefa"
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={30} // Limita o input a 30 caracteres
            />
            <button onClick={adicionarTarefa} className="add-button">
              +
            </button>
          </div>

          <div className="task-container">
            <ul>
              {tarefas.map((tarefa, index) => (
                <li key={index} className="task-item">
                  <span className={`task-text ${tarefa.concluida ? 'concluida' : ''}`}>
                    {tarefa.texto}
                  </span>
                  <button
                    onClick={() => concluirTarefa(index)}
                    className="concluir-button"
                  >
                    ✓
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button onClick={limparTarefas} className="clear-button">
            Limpar Tarefas
          </button>
        </div>
      </div>

      <div id="background-right"></div>
    </div>
  );
}

export default App;



