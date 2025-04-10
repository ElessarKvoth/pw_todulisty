import React from 'react';
import '../App.css'; // Certifique-se de ajustar o caminho se necessário

function Ordenacao({ ordenacao, setOrdenacao }) {
  return (
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
        <option value="alfabetica-reversa">Ordem acitébaflA</option>
      </select>
    </div>
  );
}

export default Ordenacao;