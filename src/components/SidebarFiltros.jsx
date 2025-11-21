import React from 'react';
import { IoChevronDown } from "react-icons/io5";
const SidebarFiltros = ({ theme, setFiltros, areas = [], localizacoes = [], habilidadesTecnicas = [], softSkills = [], niveisIngles = [] }) => {

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    
    setFiltros(prevFiltros => ({
      ...prevFiltros,
      [name]: value
    }));
  };

  return (
    // Container da Sidebar
    <aside className={`w-full md:w-72 rounded-2xl text-(--text)/80 py-13`}>
      <h3 className="text-xl font-bold mb-6 text-(--text)">Filtros</h3>
      {/* 1. Filtro de Área */}
      <div className="mb-6 relative">
        <select
          name="area"
          id="area"
          onChange={handleFiltroChange}
          className="w-full p-4 pr-12 rounded-xl border bg-(--container) shadow-md border-(--border-color) text-(--text) font-semibold focus:ring-2 focus:ring-(--primary) transition-all appearance-none"
        >
          <option value="">Skills Especificas</option>
          {areas.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-(--primary) text-xl">
          <IoChevronDown />
        </span>
      </div>

      {/* 2. Filtro de Localização */}
      <div className="relative mb-6">
        <select
          name="localizacao"
          id="localizacao"
          onChange={handleFiltroChange}
          className="w-full p-4 pr-12 rounded-xl border bg-(--container) shadow-md border-(--border-color) text-(--text) font-semibold focus:ring-2 focus:ring-(--primary) transition-all appearance-none"
        >
          <option value="">Localização</option>
          {localizacoes.map((local) => (
            <option key={local} value={local}>{local}</option>
          ))}
        </select>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-(--primary) text-xl">
          <IoChevronDown />
        </span>
      </div>

      {/* 3. Filtro de Habilidades Técnicas */}
      <div className="relative mb-6">
        <select
          name="habilidadeTecnica"
          id="habilidadeTecnica"
          onChange={handleFiltroChange}
          className="w-full p-4 pr-12 rounded-xl border bg-(--container) shadow-md border-(--border-color) text-(--text) font-semibold focus:ring-2 focus:ring-(--primary) transition-all appearance-none"
        >
          <option value="">Habilidades Técnicas</option>
          {habilidadesTecnicas.map((hab) => (
            <option key={hab} value={hab}>{hab}</option>
          ))}
        </select>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-(--primary) text-xl">
          <IoChevronDown />
        </span>
      </div>

      {/* 4. Filtro de Soft Skills */}
      <div className="relative mb-6">
        <select
          name="softSkill"
          id="softSkill"
          onChange={handleFiltroChange}
          className="w-full p-4 pr-12 rounded-xl border bg-(--container) shadow-md border-(--border-color) text-(--text) font-semibold focus:ring-2 focus:ring-(--primary) transition-all appearance-none"
        >
          <option value="">Soft Skills</option>
          {softSkills.map((skill) => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-(--primary) text-xl">
          <IoChevronDown />
        </span>
      </div>

      {/* 5. Filtro de Nível do Inglês */}
      <div className="relative mb-6">
        <select
          name="nivelIngles"
          id="nivelIngles"
          onChange={handleFiltroChange}
          className="w-full p-4 pr-12 rounded-xl border bg-(--container) shadow-md border-(--border-color) text-(--text) font-semibold focus:ring-2 focus:ring-(--primary) transition-all appearance-none"
        >
          <option value="">Nível do Inglês</option>
          {niveisIngles.map((nivel) => (
            <option key={nivel} value={nivel}>{nivel}</option>
          ))}
        </select>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-(--primary) text-xl">
          <IoChevronDown />
        </span>
      </div>
    </aside>
  );
};

export default SidebarFiltros;