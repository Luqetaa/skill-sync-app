import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import AutocompleteLocalizacao from './AutocompleteLocalizacao';

const initialState = {
  nome: '',
  foto: '',
  cargo: '',
  resumo: '',
  localizacao: '', 
  area: '',
  habilidadesTecnicas: [],
  softSkills: [],
  experiencias: [],
  formacao: [],
  projetos: [],
  certificacoes: [],
  idiomas: [{ idioma: 'Português', nivel: 'Nativo' }], 
  areaInteresses: [],
};

const NovoPerfilForm = ({ onPerfilCriado, onClose }) => {
  const [perfil, setPerfil] = useState(initialState);
  const [activeTab, setActiveTab] = useState('basico');

  const handleChangeSimples = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  const addExperiencia = () => {
    setPerfil((prev) => ({
      ...prev,
      experiencias: [
        ...prev.experiencias,
        { empresa: '', cargo: '', inicio: '', fim: '', descricao: '' }, 
      ],
    }));
  };

  const addFormacao = () => {
    setPerfil((prev) => ({
      ...prev,
      formacao: [
        ...prev.formacao,
        { curso: '', instituicao: '', ano: '' }, 
      ],
    }));
  };

  const removeExperiencia = (index) => {
    setPerfil((prev) => ({
      ...prev,
      experiencias: prev.experiencias.filter((_, i) => i !== index),
    }));
  };

  const removeFormacao = (index) => {
    setPerfil((prev) => ({
      ...prev,
      formacao: prev.formacao.filter((_, i) => i !== index),
    }));
  };

  const handleChangeExperiencia = (e, index) => {
    const { name, value } = e.target;
    const novasExperiencias = [...perfil.experiencias];
    novasExperiencias[index][name] = value;
    setPerfil((prev) => ({ ...prev, experiencias: novasExperiencias }));
  };

  const handleChangeFormacao = (e, index) => {
    const { name, value } = e.target;
    const novasFormacao = [...perfil.formacao];
    novasFormacao[index][name] = value;
    setPerfil((prev) => ({ ...prev, formacao: novasFormacao }));
  };
  const [habilidadeAtual, setHabilidadeAtual] = useState('');
  const [softSkillAtual, setSoftSkillAtual] = useState('');
  const [certificacaoAtual, setCertificacaoAtual] = useState('');
  const [areaInteresseAtual, setAreaInteresseAtual] = useState('');

  const addHabilidade = (e) => {
    e.preventDefault();
    if (habilidadeAtual && !perfil.habilidadesTecnicas.includes(habilidadeAtual)) {
      setPerfil((prev) => ({
        ...prev,
        habilidadesTecnicas: [...prev.habilidadesTecnicas, habilidadeAtual.trim()],
      }));
      setHabilidadeAtual('');
    }
  };

  const addSoftSkill = (e) => {
    e.preventDefault();
    if (softSkillAtual && !perfil.softSkills.includes(softSkillAtual)) {
      setPerfil((prev) => ({
        ...prev,
        softSkills: [...prev.softSkills, softSkillAtual.trim()],
      }));
      setSoftSkillAtual('');
    }
  };

  const removeSoftSkill = (skill) => {
    setPerfil((prev) => ({
      ...prev,
      softSkills: prev.softSkills.filter((s) => s !== skill),
    }));
  };

  const addCertificacao = (e) => {
    e.preventDefault();
    if (certificacaoAtual && !perfil.certificacoes.includes(certificacaoAtual)) {
      setPerfil((prev) => ({
        ...prev,
        certificacoes: [...prev.certificacoes, certificacaoAtual.trim()],
      }));
      setCertificacaoAtual('');
    }
  };

  const removeCertificacao = (cert) => {
    setPerfil((prev) => ({
      ...prev,
      certificacoes: prev.certificacoes.filter((c) => c !== cert),
    }));
  };

  const addAreaInteresse = (e) => {
    e.preventDefault();
    if (areaInteresseAtual && !perfil.areaInteresses.includes(areaInteresseAtual)) {
      setPerfil((prev) => ({
        ...prev,
        areaInteresses: [...prev.areaInteresses, areaInteresseAtual.trim()],
      }));
      setAreaInteresseAtual('');
    }
  };

  const removeAreaInteresse = (area) => {
    setPerfil((prev) => ({
      ...prev,
      areaInteresses: prev.areaInteresses.filter((a) => a !== area),
    }));
  };

  const removeHabilidade = (tag) => {
    setPerfil((prev) => ({
      ...prev,
      habilidadesTecnicas: prev.habilidadesTecnicas.filter((h) => h !== tag),
    }));
  };

  const handleLocationSelect = (local) => {
    setPerfil((prev) => ({ ...prev, localizacao: local }));
  };

  const addIdioma = () => {
    setPerfil((prev) => ({
      ...prev,
      idiomas: [...(prev.idiomas || []), { idioma: '', nivel: '' }],
    }));
  };

  const removeIdioma = (index) => {
    setPerfil((prev) => ({
      ...prev,
      idiomas: prev.idiomas.filter((_, i) => i !== index),
    }));
  };

  const handleChangeIdioma = (index, field, value) => {
    const novos = [...(perfil.idiomas || [])];
    novos[index] = { ...novos[index], [field]: value };
    setPerfil((prev) => ({ ...prev, idiomas: novos }));
  };

  const addProjeto = () => {
    setPerfil((prev) => ({
      ...prev,
      projetos: [...(prev.projetos || []), { titulo: '', descricao: '', link: '' }],
    }));
  };

  const removeProjeto = (index) => {
    setPerfil((prev) => ({
      ...prev,
      projetos: prev.projetos.filter((_, i) => i !== index),
    }));
  };

  const handleChangeProjeto = (e, index) => {
    const { name, value } = e.target;
    const novos = [...perfil.projetos];
    novos[index][name] = value;
    setPerfil((prev) => ({ ...prev, projetos: novos }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoPerfil = { ...perfil, id: Date.now() };
    console.log('Perfil Criado:', novoPerfil);
    onPerfilCriado(novoPerfil);
    setPerfil(initialState); 
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-xl overflow-hidden flex flex-col bg-(--container)`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`p-5 border-b border-(--border-color) -b flex justify-between items-center`}>
          <h2 className={`text-2xl font-bold text-(--text)`}>Cadastrar Novo Perfil</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full text-(--text2) hover:bg-(--text)/20`}
            aria-label="Fechar modal"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {/* Abas de navegação */}
          <div className={`mb-8 border-b border-(--border-color)`}>
            <nav className="-mb-px flex flex-wrap space-x-6" aria-label="Abas">
              <button
                type="button"
                onClick={() => setActiveTab('basico')}
                className={`py-4 px-1 border-b-3 text-md ${activeTab === 'basico' ? 'border-(--accent) font-bold text-(--accent)' : 'border-transparent text-gray-500 hover:text-gray-400'}`}
              >
                Básico
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('habilidades')}
                className={`py-4 px-1 border-b-3 text-md ${activeTab === 'habilidades' ? 'border-(--accent) font-bold text-(--accent)' : 'border-transparent text-gray-500 hover:text-gray-400'}`}
              >
                Habilidades
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('idiomas')}
                className={`py-4 px-1 border-b-3 text-md ${activeTab === 'idiomas' ? 'border-(--accent) font-bold text-(--accent)' : 'border-transparent text-gray-500 hover:text-gray-400'}`}
              >
                Idiomas
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('experiencia')}
                className={`py-4 px-1 border-b-3 text-md ${activeTab === 'experiencia' ? 'border-(--accent) font-bold text-(--accent)' : 'border-transparent text-gray-500 hover:text-gray-400'}`}
              >
                Experiência
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('formacao')}
                className={`py-4 px-1 border-b-3 text-md ${activeTab === 'formacao' ? 'border-(--accent) font-bold text-(--accent)' : 'border-transparent text-gray-500 hover:text-gray-400'}`}
              >
                Formação
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('projetos')}
                className={`py-4 px-1 border-b-3 text-md ${activeTab === 'projetos' ? 'border-(--accent) font-bold text-(--accent)' : 'border-transparent text-gray-500 hover:text-gray-400'}`}
              >
                Projetos
              </button>
            </nav>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Conteúdo das abas */}
            {activeTab === 'basico' && (
              <fieldset className="flex flex-col gap-4">
                <input name="nome" value={perfil.nome} onChange={handleChangeSimples} placeholder="Nome Completo" required className="p-3 rounded-lg border border-(--border-color)" />
                <input name="cargo" value={perfil.cargo} onChange={handleChangeSimples} placeholder="Cargo (Ex: Desenvolvedora Front-End)" required className="p-3 rounded-lg border border-(--border-color)" />
                <input name="foto" value={perfil.foto} onChange={handleChangeSimples} placeholder="URL da Foto (opcional)" className="p-3 rounded-lg border border-(--border-color)" />
                <textarea name="resumo" value={perfil.resumo} onChange={handleChangeSimples} placeholder="Resumo profissional..." className="p-3 rounded-lg border border-(--border-color)" />
                <input name="area" value={perfil.area} onChange={handleChangeSimples} placeholder="Área (Ex: Desenvolvimento, Design, Produto)" className="p-3 rounded-lg border border-(--border-color)" />
                <AutocompleteLocalizacao onSelect={handleLocationSelect} />
              </fieldset>
            )}
            {activeTab === 'habilidades' && (
              <fieldset className="border border-(--border-color)  p-4 rounded-lg">
                <legend className="font-semibold px-2">Habilidades Técnicas</legend>
                <div className="flex gap-2 mb-2">
                  <input 
                    value={habilidadeAtual} 
                    onChange={(e) => setHabilidadeAtual(e.target.value)} 
                    placeholder="Ex: React" 
                    className="grow p-2 rounded-lg border border-(--border-color) "
                    onKeyDown={(e) => e.key === 'Enter' && addHabilidade(e)}
                  />
                  <button type="button" onClick={addHabilidade} className="bg-(--secondary) hover:bg-(--secondary)/60 transition-colors text-(--text) px-4 py-2 rounded-lg font-semibold">+</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {perfil.habilidadesTecnicas.map((hab) => (
                    <span key={hab} className="bg-(--secondary) text-(--primary) px-3 py-1 rounded-full flex items-center gap-2">
                      {hab}
                      <button type="button" onClick={() => removeHabilidade(hab)} className="font-bold">x</button>
                    </span>
                  ))}
                </div>

                {/* Soft Skills */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <legend className="font-semibold px-2">Soft Skills</legend>
                  </div>
                  <div className="flex gap-2 mb-2 mt-2">
                    <input
                      value={softSkillAtual}
                      onChange={(e) => setSoftSkillAtual(e.target.value)}
                      placeholder="Ex: Comunicação"
                      className="grow p-2 rounded-lg border border-(--border-color) "
                      onKeyDown={(e) => e.key === 'Enter' && addSoftSkill(e)}
                    />
                    <button type="button" onClick={addSoftSkill} className="bg-(--secondary) hover:bg-(--secondary)/60 transition-colors text-(--text) px-4 py-2 rounded-lg font-semibold">+</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {perfil.softSkills.map((skill) => (
                      <span key={skill} className="bg-(--secondary) text-(--primary) px-3 py-1 rounded-full flex items-center gap-2">
                        {skill}
                        <button type="button" onClick={() => removeSoftSkill(skill)} className="font-bold">x</button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certificações */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <legend className="font-semibold px-2">Certificações</legend>
                  </div>
                  <div className="flex gap-2 mb-2 mt-2">
                    <input
                      value={certificacaoAtual}
                      onChange={(e) => setCertificacaoAtual(e.target.value)}
                      placeholder="Ex: AWS Certified"
                      className="grow p-2 rounded-lg border border-(--border-color) "
                      onKeyDown={(e) => e.key === 'Enter' && addCertificacao(e)}
                    />
                    <button type="button" onClick={addCertificacao} className="bg-(--secondary) hover:bg-(--secondary)/60 transition-colors text-(--text) px-4 py-2 rounded-lg font-semibold">+</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {perfil.certificacoes.map((cert) => (
                      <span key={cert} className="bg-(--secondary) text-(--primary) px-3 py-1 rounded-full flex items-center gap-2">
                        {cert}
                        <button type="button" onClick={() => removeCertificacao(cert)} className="font-bold">x</button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Áreas de Interesse */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <legend className="font-semibold px-2">Áreas de Interesse</legend>
                  </div>
                  <div className="flex gap-2 mb-2 mt-2">
                    <input
                      value={areaInteresseAtual}
                      onChange={(e) => setAreaInteresseAtual(e.target.value)}
                      placeholder="Ex: Analista de Sistemas, Design Thinking"
                      className="grow p-2 rounded-lg border border-(--border-color) "
                      onKeyDown={(e) => e.key === 'Enter' && addAreaInteresse(e)}
                    />
                    <button type="button" onClick={addAreaInteresse} className="bg-(--secondary) hover:bg-(--secondary)/60 transition-colors text-(--text) px-4 py-2 rounded-lg font-semibold">+</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {perfil.areaInteresses.map((area) => (
                      <span key={area} className="bg-(--secondary) text-(--primary) px-3 py-1 rounded-full flex items-center gap-2">
                        {area}
                        <button type="button" onClick={() => removeAreaInteresse(area)} className="font-bold">x</button>
                      </span>
                    ))}
                  </div>
                </div>
              </fieldset>
            )}
            {activeTab === 'idiomas' && (
              <fieldset className="border border-(--border-color)  p-4 rounded-lg">
                <legend className="font-semibold px-2">Idiomas</legend>
                <div className="flex flex-col gap-3">
                  {(perfil.idiomas || []).map((idioma, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Idioma (ex: Inglês)"
                        value={idioma.idioma}
                        onChange={(e) => handleChangeIdioma(i, 'idioma', e.target.value)}
                        className="p-2 rounded-lg border border-(--border-color)  w-1/2"
                      />
                      <select
                        value={idioma.nivel}
                        onChange={(e) => handleChangeIdioma(i, 'nivel', e.target.value)}
                        className="p-2 text-(--text) bg-(--container) rounded-lg border border-(--border-color) "
                      >
                        <option value="">Selecione o nível</option>
                        <option value="Básico">Básico</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                        <option value="Fluente">Fluente</option>
                        <option value="Nativo">Nativo</option>
                      </select>
                      <button type="button" onClick={() => removeIdioma(i)} className="bg-red-800 hover:bg-red-800/80 text-white transition-colors px-3 py-2 rounded-lg font-bold">Deletar</button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <button type="button" onClick={addIdioma} className="bg-(--secondary) hover:bg-(--secondary)/70 transition-colors font-bold text-(--primary) px-3 py-2 rounded-lg">Adicionar Idioma</button>
                  </div>
                </div>
              </fieldset>
            )}
            {activeTab === 'experiencia' && (
              <fieldset className="border border-(--border-color)  p-4 rounded-lg flex flex-col gap-4">
                <legend className="font-semibold px-2">Experiências</legend>
                {perfil.experiencias && perfil.experiencias.length > 0 && perfil.experiencias.map((exp, index) => (
                  <div key={index} className="border border-(--border-color)  p-3 rounded-md relative flex flex-col gap-3">
                    <input name="cargo" value={exp.cargo} onChange={(e) => handleChangeExperiencia(e, index)} placeholder="Cargo" className="p-2 rounded-lg border border-(--border-color) " />
                    <input name="empresa" value={exp.empresa} onChange={(e) => handleChangeExperiencia(e, index)} placeholder="Empresa" className="p-2 rounded-lg border border-(--border-color) " />
                    <div className="flex gap-2">
                      <input name="inicio" type="month" value={exp.inicio} onChange={(e) => handleChangeExperiencia(e, index)} placeholder="Início" className="flex-1 p-2 rounded-lg border border-(--border-color) " />
                      <input name="fim" type="month" value={exp.fim} onChange={(e) => handleChangeExperiencia(e, index)} placeholder="Fim" className="flex-1 p-2 rounded-lg border border-(--border-color) " />
                        
                    </div>
                    <textarea name="descricao" value={exp.descricao} onChange={(e) => handleChangeExperiencia(e, index)} placeholder="Descrição das atividades" className="p-2 rounded-lg border border-(--border-color) " />
                    <button type="button" onClick={() => removeExperiencia(index)} className="bg-red-800 hover:bg-red-800/80 text-white transition-colors p-2 w-30 rounded-lg font-bold">Deletar</button>
                  </div>
                ))}
                <div className='flex gap-2'>
                    <button type="button" onClick={addExperiencia} className="bg-(--secondary) hover:bg-(--secondary)/70 transition-colors text-(--primary) font-bold px-4 py-2 rounded-lg mt-2">
                        Adicionar Experiência
                    </button>
                </div>
                
              </fieldset>
            )}
            {activeTab === 'projetos' && (
              <fieldset className="border border-(--border-color)  p-4 rounded-lg">
                <legend className="font-semibold px-2">Projetos</legend>
                {perfil.projetos && perfil.projetos.map((proj, i) => (
                  <div key={i} className="border border-(--border-color)  p-3 rounded-md relative mb-3">
                    <input name="titulo" value={proj.titulo} placeholder="Título do projeto" onChange={(e) => handleChangeProjeto(e, i)} className="p-2 rounded-lg border border-(--border-color)  w-full mb-2" />
                    <textarea name="descricao" value={proj.descricao} placeholder="Descrição (opcional)" onChange={(e) => handleChangeProjeto(e, i)} className="p-2 rounded-lg border border-(--border-color)  w-full" />
                    <input name="link" value={proj.link} placeholder="Link (opcional)" onChange={(e) => handleChangeProjeto(e, i)} className="p-2 rounded-lg border border-(--border-color)  w-full mt-2" />
                  <button type="button" onClick={() => removeProjeto(i)} className="bg-red-800 hover:bg-red-800/80 text-white transition-colors p-2 w-30 rounded-lg mt-3 font-bold">Deletar</button>
                  </div>
                ))}
                <button type="button" onClick={addProjeto} className="bg-(--secondary) hover:bg-(--secondary)/70 transition-colors text-(--primary) font-bold px-4 py-2 rounded-lg mt-2">Adicionar Projeto</button>
              </fieldset>
            )}
            {activeTab === 'formacao' && (
              <fieldset className="border border-(--border-color) p-4 rounded-lg flex flex-col gap-4">
                <legend className="font-semibold px-2">Formação</legend>
                {perfil.formacao.map((forma, index) => (
                  <div key={index} className="border border-(--border-color) p-3 rounded-md flex flex-col gap-3">  

                    <input name="curso" value={forma.curso} onChange={(e) => handleChangeFormacao(e, index)} placeholder="Curso" className="p-2 rounded-lg border border-(--border-color) " />
                    <input name="instituicao" value={forma.instituicao} onChange={(e) => handleChangeFormacao(e, index)} placeholder="Instituição" className="p-2 rounded-lg border border-(--border-color) " />
                    <input name="ano" value={forma.ano} onChange={(e) => handleChangeFormacao(e, index)} placeholder="Ano" className=" p-2 rounded-lg border border-(--border-color) " />
                    <button type="button" onClick={() => removeFormacao(index)} className=" bg-red-800 hover:bg-red-800/80 text-white transition-colors p-2 w-30 rounded-lg font-bold">Deletar</button>
                  </div>
                ))}
                <div className='flex gap-2'>
                    <button type="button" onClick={addFormacao} className=" bg-(--secondary) hover:bg-(--secondary)/70 transition-colors text-(--primary) font-bold px-4 py-2 rounded-lg mt-2">
                    Adicionar Formação
                    </button>
                </div>
              </fieldset>
            )}
            <button type="submit" className="bg-green-400 hover:bg-green-400/70 transition-colors border border-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg">
              Cadastrar Perfil
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NovoPerfilForm;