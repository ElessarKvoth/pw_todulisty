import React, { useState, useEffect } from 'react';
import './App.css';
import Ordenacao from './components/Ordenacao';

function App() {
  // Guarda as tarefas
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem('tarefas');
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  // Texto da nova tarefa
  const [novaTarefa, setNovaTarefa] = useState('');

  // Tipo de ordenação (ex: por data, alfabética)
  const [ordenacao, setOrdenacao] = useState('data');

  // Salva as tarefas no navegador sempre que mudar
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  // Adiciona uma nova tarefa
  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      const nova = {
        id: Date.now(), // ID único
        texto: novaTarefa,
        concluida: false,
        data: new Date().toISOString(), // Data de criação
      };
      setTarefas([...tarefas, nova]);
      setNovaTarefa(''); // Limpa o campo
    }
  };

  // Adiciona tarefa ao apertar Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      adicionarTarefa();
    }
  };

  // Remove todas as tarefas
  const limparTarefas = () => {
    setTarefas([]);
  };

  // Marca ou desmarca uma tarefa como concluída
  const concluirTarefa = (id) => {
    const novasTarefas = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    );
    setTarefas(novasTarefas);
  };

  // Ordena as tarefas (ex: por data, alfabética)
  const ordenarTarefas = () => {
    const tarefasOrdenadas = [...tarefas];
    if (ordenacao === 'alfabetica') {
      tarefasOrdenadas.sort((a, b) => a.texto.localeCompare(b.texto));
    } else if (ordenacao === 'alfabetica-reversa') {
      tarefasOrdenadas.sort((a, b) => b.texto.localeCompare(a.texto));
    } else if (ordenacao === 'data') {
      tarefasOrdenadas.sort((a, b) => new Date(b.data) - new Date(a.data));
    } else if (ordenacao === 'mais-antigo') {
      tarefasOrdenadas.sort((a, b) => new Date(a.data) - new Date(b.data));
    }
    return tarefasOrdenadas;
  };

  return (
    <div id="root">
      {/* Lado esquerdo */}
      <div id="background-left"></div>

      {/* Parte do meio */}
      <div id="background-center">
        <div className="content">
          <h1 className="title">Gerenciador de Tarefas</h1>
          <p className="subtitle">Lista de Tarefas</p>

          {/* Campo para digitar e botão de adicionar */}
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

          {/* Lista de tarefas com scroll */}
          <div
            className="scroll-container"
            onWheel={(e) => {
              e.currentTarget.scrollTop += e.deltaY * 0.3; // Faz o scroll ser mais lento
            }}
          >
            <ul className="task-list">
              {ordenarTarefas().map((tarefa) => (
                <li key={tarefa.id} className="task-item">
                  <span className={`task-text ${tarefa.concluida ? 'concluida' : ''}`}>
                    {tarefa.texto}
                  </span>
                  <button
                    onClick={() => concluirTarefa(tarefa.id)}
                    className="concluir-button"
                  >
                    ✓
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Seleção de ordenação */}
          <Ordenacao ordenacao={ordenacao} setOrdenacao={setOrdenacao} />

          {/* Botão para limpar tudo */}
          <div className="task-actions-container">
            <button onClick={limparTarefas} className="clear-button">
              Limpar Tarefas
            </button>
          </div>
        </div>
      </div>

      {/* Lado direito */}
      <div id="background-right"></div>
    </div>
  );
}

export default App;




