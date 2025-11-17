import React, { useState } from 'react';
import { 
  FaTimes, 
  FaBriefcase, 
  FaGraduationCap, 
  FaTools, 
  FaExternalLinkAlt,
  FaUser 
} from 'react-icons/fa';

const ProfileModal = ({ profile, theme, onClose, onToggleRecommend, recomendados }) => {
  const [activeTab, setActiveTab] = useState('visaoGeral');
  const DEFAULT_FOTO = 'https://avatar.iran.liara.run/public';
  const foto = profile?.foto && profile.foto.trim() !== '' ? profile.foto : DEFAULT_FOTO;
  
  const isRecomendado = recomendados.includes(profile.id);
  const recommendButtonClasses = isRecomendado
    ? 'bg-green-600 hover:bg-green-700 text-white' 
    : 'bg-(--secondary) hover:bg-(--secondary)/60 text-(--text)';
  const messageButtonClasses = theme === 'dark' 
    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
    : 'bg-gray-200 hover:bg-gray-300 text-gray-800';

  const handleMessage = () => {
    console.log(`Abrindo chat com ${profile.nome}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-opacity duration-300"
      onClick={onClose} 
    >
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col bg-(--container)`}
        onClick={(e) => e.stopPropagation()} 
      >
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

        <div className="p-6 overflow-y-auto">
          
          {/* --- ALTERADO: O sumário já era responsivo (md:flex-row), mas vamos garantir o padding no mobile --- */}
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 p-1">
            <img
              src={foto}
              alt={profile.nome}
              className="w-28 h-28 rounded-full object-cover border-4 border-gray-100 dark:border-gray-600"
            />
            <div className="flex-1 text-center md:text-left">
              <h3 className={`text-2xl font-bold text-(--text)`}>{profile.nome}</h3>
              <p className={`text-md text-(--text2)`}>{profile.cargo}</p>
              <p className={`text-sm text-(--text2) mt-1`}>{profile.localizacao}</p>
              
              {/* --- ALTERADO: Botões agora quebram a linha no mobile --- */}
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                <button 
                  onClick={() => onToggleRecommend(profile)} 
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${recommendButtonClasses} transition-colors`}
                >
                  {isRecomendado ? 'Recomendado ✔' : 'Recomendar'} 
                </button>
                <button 
                  onClick={handleMessage} 
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${messageButtonClasses} transition-colors`}
                >
                  Enviar Mensagem
                </button>
              </div>
            </div>
          </div>

          {/* --- ALTERADO: Abas de Navegação com 'flex-wrap' --- */}
          <div className={`mt-8 border-b border-(--border-color)`}>
            <nav className="-mb-px flex flex-wrap space-x-6" aria-label="Abas">
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

          {/* --- Conteúdo das Abas (sem alteração) --- */}
          <div className="mt-6">
            {/* ... (o conteúdo das abas permanece o mesmo) ... */}
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
                              {proj.link && (
                                <>
                                  {' '}
                                  — <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-(--accent) hover:underline inline-flex items-center gap-1">Abrir projeto <FaExternalLinkAlt className="w-3 h-3" /></a>
                                </>
                              )}
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

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