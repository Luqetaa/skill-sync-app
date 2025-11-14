import React, { useState } from 'react';
// Importando ícones
import { 
  FaTimes, // Ícone para fechar
  FaBriefcase, // Ícone para Experiência
  FaGraduationCap, // Ícone para Formação
  FaTools, // Ícone para Skills
  FaUser // Ícone para Visão Geral
} from 'react-icons/fa';

const ProfileModal = ({ profile, theme, onClose }) => {
  // Estado interno para controlar a aba ativa
  const [activeTab, setActiveTab] = useState('visaoGeral');

  const buttonSecondary = theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-800';

  // --- Handlers dos Botões (Requisito da Atividade) ---

  const handleRecommend = () => {
    alert(`Recomendação enviada para ${profile.nome}!`);
  };

  const handleMessage = () => {
    alert(`Abrindo chat com ${profile.nome}!`);
  };

  return (
    // 1. Overlay (fundo escuro semi-transparente)
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-opacity duration-300"
      onClick={onClose} // Fecha a modal ao clicar fora
    >
      {/* 2. Conteúdo da Modal */}
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col bg-(--container)`}
        onClick={(e) => e.stopPropagation()} // Impede de fechar ao clicar DENTRO
      >
        {/* --- Cabeçalho da Modal --- */}
        <div className={`p-5 border-b border-(--border-color) flex justify-between items-center`}>
          <h2 className={`text-2xl font-bold text-(--text)`}>Detalhes do Perfil</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full text-(--text2) hover:bg-(--text)/20`}
            aria-label="Fechar modal"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* --- Corpo da Modal (com scroll) --- */}
        <div className="p-6 overflow-y-auto">
          
          {/* --- Sumário do Perfil (Topo) --- */}
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={profile.foto}
              alt={profile.nome}
              className="w-28 h-28 rounded-full object-cover border-4 border-gray-100 dark:border-gray-600"
            />
            <div className="flex-1 text-center md:text-left">
              <h3 className={`text-2xl font-bold text-(--text)`}>{profile.nome}</h3>
              <p className={`text-md text-(--text2)`}>{profile.cargo}</p>
              <p className={`text-sm text-(--text2) mt-1`}>{profile.localizacao}</p>
              
              {/* Botões de Ação (Requisito) */}
              <div className="mt-4 flex justify-center md:justify-start space-x-3">
                <button onClick={handleRecommend} className={`px-4 py-2 rounded-lg text-sm font-medium bg-(--secondary) hover:bg-(--secondary)/60 text-(--text) transition-colors`}>
                  Recomendar
                </button>
                <button onClick={handleMessage} className={`px-4 py-2 rounded-lg text-sm font-medium ${buttonSecondary} transition-colors`}>
                  Enviar Mensagem
                </button>
              </div>
            </div>
          </div>

          {/* --- Abas de Navegação --- */}
          <div className={`mt-8 border-b border-(--border-color)`}>
            <nav className="-mb-px flex space-x-6" aria-label="Abas">
              <button
                onClick={() => setActiveTab('visaoGeral')}
                className={`py-4 px-1 border-b-3 text-md ${activeTab === 'visaoGeral' ? 'border-(--accent) font-bold text-(--accent)' : 'border-transparent text-gray-500 hover:text-gray-400'}`}
              >
                Visão Geral
              </button>
              <button
                onClick={() => setActiveTab('habilidades')}
                className={`py-4 px-1 border-b-3 text-md ${activeTab === 'habilidades' ? 'border-(--accent) font-bold text-(--accent)' : 'border-transparent text-gray-500 hover:text-gray-400'}`}
              >
                Habilidades
              </button>
              <button
                onClick={() => setActiveTab('experiencia')}
                className={`py-4 px-1 border-b-3 text-md ${activeTab === 'experiencia' ? 'border-(--accent) font-bold text-(--accent)' : 'border-transparent text-gray-500 hover:text-gray-400'}`}
              >
                Experiência
              </button>
              <button
                onClick={() => setActiveTab('formacao')}
                className={`py-4 px-1 border-b-3 text-md ${activeTab === 'formacao' ? 'border-(--accent) font-bold text-(--accent)' : 'border-transparent text-gray-500 hover:text-gray-400'}`}
              >
                Formação
            </button>
            </nav>
          </div>

          {/* --- Conteúdo das Abas --- */}
          <div className="mt-6">
            
            {/* Aba: Visão Geral */}
            {activeTab === 'visaoGeral' && (
              <div className="space-y-6">
                <div>
                  <h4 className={`text-lg font-semibold text-(--text)`}>Resumo Profissional</h4>
                  <p className={`mt-2 text-(--text2)`}>{profile.resumo}</p>
                </div>
                <div>
                  <h4 className={`text-lg font-semibold text-(--text)`}>Idiomas</h4>
                  <ul className="mt-2 space-y-1">
                    {profile.idiomas.map((lang, i) => (
                      <li key={i} className={`text-(--text2)`}>
                        • {lang.idioma} ({lang.nivel})
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Certificações */}
                {profile.certificacoes && profile.certificacoes.length > 0 && (
                  <div>
                    <h4 className={`text-lg font-semibold text-(--text)`}>Certificações</h4>
                    <ul className="mt-2 space-y-1">
                      {profile.certificacoes.map((cert, i) => (
                        <li key={i} className={`text-(--text2)`}>• {cert}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Área de Interesses */}
                {profile.areaInteresses && profile.areaInteresses.length > 0 && (
                  <div>
                    <h4 className={`text-lg font-semibold text-(--text)`}>Área de Interesses</h4>
                    <ul className="mt-2 space-y-1">
                      {profile.areaInteresses.map((area, i) => (
                        <li key={i} className={`text-(--text2)`}>• {area}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Aba: Habilidades */}
            {activeTab === 'habilidades' && (
              <div className="space-y-6">
                <div>
                  <h4 className={`text-lg font-semibold text-(--text)`}>Habilidades Técnicas (Hard Skills)</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.habilidadesTecnicas.map((skill) => (
                      <span key={skill} className={`px-3 py-1 rounded-full text-sm font-medium bg-(--secondary) text-(--primary)`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`text-lg font-semibold text-(--text)`}>Competências (Soft Skills)</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.softSkills.map((skill) => (
                      <span key={skill} className={`px-3 py-1 rounded-full text-sm font-medium bg-(--secondary) text-(--primary)`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Projetos */}
                {profile.projetos && profile.projetos.length > 0 && (
                  <div>
                    <h4 className={`text-lg font-semibold text-(--text)`}>Projetos</h4>
                    <ul className="mt-2 space-y-1">
                      {profile.projetos.map((proj, i) => (
                        <li key={i} className={`text-(--text2)`}>
                          • {typeof proj === 'string' ? proj : (
                            <>
                              <strong>{proj.titulo}</strong>
                              {proj.descricao && <> — {proj.descricao}</>}
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Aba: Experiência */}
            {activeTab === 'experiencia' && (
              <div className="space-y-6">
                {profile.experiencias.map((exp, i) => (
                  <div key={i} className={`flex space-x-4 border-l-2 pl-4 border-(--border-color)`}>
                    <FaBriefcase className={`w-5 h-5 mt-1 text-(--text2)`} />
                    <div>
                      <h4 className={`text-lg font-semibold text-(--text)`}>{exp.cargo}</h4>
                      <p className={`text-(--text2)`}>{exp.empresa}</p>
                      <p className={`text-sm text-(--text2)`}>{exp.inicio} - {exp.fim || 'Atual'}</p>
                      <p className={`mt-2 text-sm text-(--text2)`}>{exp.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Aba: Formação */}
            {activeTab === 'formacao' && (
              <div className="space-y-6">
                {profile.formacao.map((form, i) => (
                  <div key={i} className={`flex space-x-4 border-l-2 pl-4 border-(--border-color)`}>
                    <FaGraduationCap className={`w-5 h-5 mt-1 text-(--text2)`} />
                    <div>
                      <h4 className={`text-lg font-semibold text-(--text)`}>{form.curso}</h4>
                      <p className={`text-(--text2)`}>{form.instituicao}</p>
                      <p className={`text-sm text-(--text2)`}>Concluído em {form.ano}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;