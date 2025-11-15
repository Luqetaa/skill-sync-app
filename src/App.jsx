import React, { useState, useEffect } from 'react';
import perfisData from './data/perfis.json'; 
import { IoSearch } from "react-icons/io5";

import Header from './components/Header';
import SidebarFiltros from './components/SidebarFiltros';
import PoolTalentos from './components/PoolTalentos';
import ProfileModal from './components/ProfileModal';
import Paginacao from './components/Paginacao'; 
import Toast from './components/Toast'; // <-- NOVO: Importar o Toast

const ITEMS_PER_PAGE = 12;

function App() {
  
  // Estados (sem alteração)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });
  const [filtros, setFiltros] = useState({
    busca: '',
    area: '',
    localizacao: '',
    habilidadeTecnica: '',
    softSkill: '',
    nivelIngles: ''
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [perfis, setPerfis] = useState(perfisData); 
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('pool'); 
  const [recomendados, setRecomendados] = useState(() => {
    const savedRecomendados = localStorage.getItem('recomendados');
    return savedRecomendados ? JSON.parse(savedRecomendados) : []; 
  });
  
  // --- NOVO: Estado do Toast ---
  const [toast, setToast] = useState({ message: '', isVisible: false, type: 'success' });

  // --- NOVO: Função para mostrar o Toast ---
  const showToast = (message, type = 'success') => {
    setToast({ message, isVisible: true, type });
    // Esconde o toast após 3 segundos
    setTimeout(() => {
      setToast({ message: '', isVisible: false, type });
    }, 3000);
  };

  // --- Use Effects (sem alteração) ---
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 1) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      setCurrentPage(1);
    }
  }, [filtros, activeTab]);
            
  useEffect(() => {
    localStorage.setItem('recomendados', JSON.stringify(recomendados));
  }, [recomendados]);

  // --- Handlers (Funções de Evento) ---
  const handleCardClick = (profile) => {
    setSelectedProfile(profile);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProfile(null);
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prevFiltros => ({
      ...prevFiltros,
      [name]: value
    }));
  };

  // --- ALTERADO: Agora é um 'toggle' (adiciona ou remove) ---
  const handleToggleRecommend = (profile) => {
    setRecomendados((prevRecomendados) => {
      // Se já está recomendado, remove
      if (prevRecomendados.includes(profile.id)) {
        showToast(`${profile.nome} foi removido das recomendações.`, 'info'); // <-- NOVO: Chama o toast
        return prevRecomendados.filter(id => id !== profile.id); // Remove
      }
      
      // Se não está, adiciona
      showToast(`${profile.nome} foi recomendado!`, 'success'); // <-- NOVO: Chama o toast
      return [...prevRecomendados, profile.id]; // Adiciona
    });
  };

  // Lógica de Filtros Dinâmicos (sem alteração)
  const areasUnicas = [...new Set(perfis.map(p => p.area))].sort();
  const localizacoesUnicas = [...new Set(perfis.map(p => p.localizacao))].sort();
  const habilidadesTecnicasUnicas = [...new Set(perfis.flatMap(p => p.habilidadesTecnicas || []))].sort();
  const softSkillsUnicas = [...new Set(perfis.flatMap(p => p.softSkills || []))].sort();
  const niveisInglesUnicos = [...new Set(
    perfis.flatMap(p => (p.idiomas || []).filter(i => i.idioma === 'Inglês').map(i => i.nivel))
  )].sort();

  // Lógica de Filtro (sem alteração)
  const perfisFiltrados = perfis.filter((profile) => {
    const buscaLower = filtros.busca.toLowerCase();
    const matchBusca = buscaLower === '' ||
      profile.nome.toLowerCase().includes(buscaLower) ||
      profile.cargo.toLowerCase().includes(buscaLower);
    const matchArea = filtros.area === '' || profile.area === filtros.area;
    const matchLocalizacao = filtros.localizacao === '' || profile.localizacao === filtros.localizacao;
    const matchHabilidadeTecnica = filtros.habilidadeTecnica === '' ||
      (profile.habilidadesTecnicas && profile.habilidadesTecnicas.includes(filtros.habilidadeTecnica));
    const matchSoftSkill = filtros.softSkill === '' ||
      (profile.softSkills && profile.softSkills.includes(filtros.softSkill));
    const matchNivelIngles = filtros.nivelIngles === '' ||
      (profile.idiomas && profile.idiomas.some(i => i.idioma === 'Inglês' && i.nivel === filtros.nivelIngles));

    return matchBusca && matchArea && matchLocalizacao && matchHabilidadeTecnica && matchSoftSkill && matchNivelIngles;
  });

  // Lógica de Exibição (sem alteração)
  const perfisParaExibir = activeTab === 'pool'
    ? perfisFiltrados 
    : perfisFiltrados.filter(p => recomendados.includes(p.id)); 

  // Lógica de Paginação (sem alteração)
  const totalPages = Math.ceil(perfisParaExibir.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const perfisDaPagina = perfisParaExibir.slice(startIndex, endIndex);

  // --- RETURN ---
  return (
    <div className={`min-h-screen bg-(--background) text-(--text) transition-colors duration-200`}>
      
      {/* --- NOVO: Renderiza o Toast --- */}
      <Toast 
        message={toast.message} 
        isVisible={toast.isVisible} 
        type={toast.type} 
      />
      
      <Header theme={theme} setTheme={setTheme} />

      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8">
        
        <SidebarFiltros
          theme={theme}
          setFiltros={setFiltros}
          areas={areasUnicas}
          localizacoes={localizacoesUnicas}
          habilidadesTecnicas={habilidadesTecnicasUnicas}
          softSkills={softSkillsUnicas}
          niveisIngles={niveisInglesUnicos}
        />

        <main className="flex-1">
          
          <h2 className="text-5xl font-black mb-2">Pool de Talentos</h2>
          <p className={`mb-6 text-(--text2)`}>
            Encontre os melhores profissionais para sua equipe.
          </p>

          {/* Abas de Navegação (sem alteração) */}
          <div className="mb-4 flex space-x-2 border-b-2 border-(--border-color)">
            <button
              onClick={() => setActiveTab('pool')}
              className={`py-3 px-4 font-medium text-lg
                ${activeTab === 'pool'
                  ? 'border-b-4 border-(--accent) text-(--accent)'
                  : 'text-(--text2) hover:text-(--text)'}
              `}
            >
              Pool de Talentos
            </button>
            <button
              onClick={() => setActiveTab('recomendados')}
              className={`py-3 px-4 font-medium text-lg
                ${activeTab === 'recomendados'
                  ? 'border-b-4 border-(--accent) text-(--accent)'
                  : 'text-(--text2) hover:text-(--text)'}
              `}
            >
              Recomendados ({recomendados.length})
            </button>
          </div>

          {/* Input de Busca (sem alteração) */}
          <div className="mb-6 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-(--text2)"><IoSearch /></span>
            <input
              type="text"
              name="busca"
              id="busca"
              onChange={handleFiltroChange}
              className={`w-full pl-10 p-3 rounded-lg border bg-(--container) border-(--border-color) text-(--text) focus:ring-(--primary) transition-colors`}
              placeholder="Buscar por cargo, habilidade ou nome..."
            />
          </div>

          <PoolTalentos
            perfis={perfisDaPagina} 
            theme={theme}
            onCardClick={handleCardClick}
          />
          
          {totalPages > 1 && (
             <Paginacao
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              theme={theme}
            />
          )}
         
        </main>
      </div>
      
      {/* Modal (ALTERADO: Passando as novas props) */}
      {modalOpen && (
        <ProfileModal 
          profile={selectedProfile} 
          theme={theme} 
          onClose={handleCloseModal} 
          onToggleRecommend={handleToggleRecommend} // <-- ALTERADO: Nome da prop
          recomendados={recomendados}           // <-- ADICIONADO: Lista de recomendados
        />
      )}
    </div>
  );
}

export default App;