// src/components/Header.jsx
import React from 'react';
import { FiDatabase } from "react-icons/fi";
import logo from '../assets/logo.png';
import { FaSun, FaMoon } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';

const Header = ({ theme, setTheme, onNovoPerfilClick }) => {
    React.useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
  
  const handleThemeSwitch = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    console.log('Tema alterado para:', newTheme); 
  };

  return (
    <header className={`sticky top-0 z-50 bg-(--background) border-b border-(--border-color) shadow-md`}>
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-(--text)">
          {logo ? (
            <img src={logo} alt="SkillSync" className="h-8 w-8 object-contain" />
          ) : (
            <FiDatabase alt="Logo SkillSync" className="h-8 w-8 text-(--accent)" />
          )}
          <h1 className='text-2xl font-bold'>SkillSync</h1>
          <div className="hidden md:flex px-10 space-x-12">
          </div>
        </div>
        {/* Botão de Dark Mode e Novo Perfil */}
        <div className="flex items-center gap-4">
          {/* botao de adicionar novo perfil */}
          <button
            onClick={onNovoPerfilClick}
            className={`w-10 h-10 rounded-full flex items-center justify-center bg-(--accent) hover:bg-(--accent)/80 transition-colors shadow-md overflow-hidden`}
            aria-label="Cadastrar novo perfil"
            style={{ border: '2px solid var(--border-color)' }}
          >            
          <IoMdAdd className="text-(--texti) text-2xl" />
          </button>
          <button
            onClick={handleThemeSwitch}
            className={`p-2 rounded-full text-(--accent) hover:bg-(--accent)/20 transition-colors`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <FaSun className="w-5 h-5" />
            ) : (
              <FaMoon className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;