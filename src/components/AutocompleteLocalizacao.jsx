// AutocompleteLocalizacao.jsx
import React, { useState, useEffect, useCallback } from 'react';

// Função 'debounce' para evitar muitas chamadas à API
// (Coloque fora do componente ou importe de um 'utils')
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

const AutocompleteLocalizacao = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('');

  // Função de busca na API do IBGE
  const fetchCidades = async (searchQuery) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      // Usamos a API do IBGE para buscar municípios
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios`);
      const data = await response.json();
      
      // Filtra os resultados que contêm o texto da busca (ignorando acentos)
      const filtered = data.filter((cidade) => 
        cidade.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          .includes(searchQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
      );
      
      // Formata para "Cidade/UF" e limita a 10 resultados
      setSuggestions(filtered.slice(0, 10).map(c => ({
        nome: `${c.nome}/${c.microrregiao.mesorregiao.UF.sigla}`,
        id: c.id
      })));

    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
    setLoading(false);
  };

  // Aplica o debounce na função de busca
  const debouncedFetch = useCallback(debounce(fetchCidades, 500), []);

  useEffect(() => {
    // Se o 'query' não for o item selecionado, busca
    if (query !== selected) {
      debouncedFetch(query);
    }
  }, [query, debouncedFetch, selected]);

  const handleSelect = (cidade) => {
    const localFormatado = cidade.nome; // Ex: "São Paulo/SP"
    setQuery(localFormatado);
    setSelected(localFormatado);
    setSuggestions([]);
    onSelect(localFormatado); // Envia o valor formatado para o form principal
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    // Se o usuário apagar o input, limpa a seleção
    if (e.target.value === '') {
      setSelected('');
      onSelect('');
    }
  };

  return (
    <div className="relative">
      <input 
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Digite a cidade..."
        required
        className="p-3 rounded-lg border border-(--border-color) w-full"
      />
      {loading && <div className="p-2">Carregando...</div>}
      
      {/* Lista de Sugestões */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-(--container) border border-(--border-color) rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
          {suggestions.map((cidade) => (
            <li 
              key={cidade.id} 
              onClick={() => handleSelect(cidade)}
              className="p-3 hover:bg-(--secondary) cursor-pointer"
            >
              {cidade.nome}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteLocalizacao;