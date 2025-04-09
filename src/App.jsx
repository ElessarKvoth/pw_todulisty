import React, { useState } from 'react';
import './App.css';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [ordenacao, setOrdenacao] = useState('data'); // 'data', 'alfabetica', 'alfabetica-reversa', ou 'mais-antigo'

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      const nova = {
        texto: novaTarefa,
        concluida: false,
        data: new Date().toISOString(),
      };
      setTarefas([...tarefas, nova]);
      setNovaTarefa('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      adicionarTarefa();
    }
  };

  const limparTarefas = () => {
    setTarefas([]);
  };

  const ordenarTarefas = () => {
    const tarefasOrdenadas = [...tarefas];
    if (ordenacao === 'alfabetica') {
      tarefasOrdenadas.sort((a, b) => a.texto.localeCompare(b.texto));
    } else if (ordenacao === 'alfabetica-reversa') {
      tarefasOrdenadas.sort((a, b) => b.texto.localeCompare(a.texto));
    } else if (ordenacao === 'data') {
      tarefasOrdenadas.sort((a, b) => new Date(a.data) - new Date(b.data)); // Mais recente primeiro
    } else if (ordenacao === 'mais-antigo') {
      tarefasOrdenadas.sort((a, b) => new Date(b.data) - new Date(a.data)); // Mais antigo primeiro
    }
    return tarefasOrdenadas;
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
            />
            <button onClick={adicionarTarefa} className="add-button">
              +
            </button>
          </div>

          <div className="task-container">
            <ul>
              {ordenarTarefas().map((tarefa, index) => (
                <li key={index} className="task-item">
                  <span className={`task-text ${tarefa.concluida ? 'concluida' : ''}`}>
                    {tarefa.texto}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="ordenacao-container">
            <label htmlFor="ordenacao-select" className="ordenacao-label">
              Ordenar:
            </label>
            <select
              id="ordenacao-select"
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              className="ordenacao-select"
            >
              <option value="data">Mais Recente</option>
              <option value="mais-antigo">Mais Antigo</option>
              <option value="alfabetica">Ordem Alfabética</option>
              <option value="alfabetica-reversa">Alfabeto Reverso</option>
            </select>
          </div>

          <div className="actions-container">
            <button onClick={limparTarefas} className="clear-button">
              Limpar Tarefas
            </button>
          </div>
        </div>
      </div>

      <div id="background-right"></div>
    </div>
  );
}

export default App;



