// src/components/ProfileCard.jsx
import React from 'react';

// Props que ele recebe:
// - profile: O objeto JSON com os dados (nome, foto, cargo, skills)
// - theme: O estado 'light' ou 'dark' do App.jsx
// - onCardClick: A função do App.jsx para abrir a modal
//
const ProfileCard = ({ profile, theme, onCardClick }) => {

  // Pega apenas as 3 primeiras habilidades técnicas para exibir no card
  const mainSkills = profile.habilidadesTecnicas.slice(0, 3);

  return (
    <button
      // O Card inteiro é um botão para abrir a modal
      // Passamos o 'profile' de volta para a função saber quem foi clicado
      onClick={() => onCardClick(profile)}
      className={`
        w-67 p-5 rounded-2xl border shadow-md text-left 
        transition-all duration-200 ease-in-out
        transform hover:-translate-y-1 focus:outline-none
        focus:ring-2 focus:ring-(--primary) h-86
        bg-(--container) border-(--border-color) hover:bg-(--container)/20
      `}
    >
      <div className="flex flex-col items-center text-center">
        {/* Foto */}
        <img
          src={profile.foto}
          alt={`Foto de ${profile.nome}`}
          className="w-30 h-30 rounded-full object-cover border-2 border-(--border-color)"
        />

        {/* Nome  */}
        <h3 className={`mt-4 text-xl font-bold text-(--text)`}>
          {profile.nome}
        </h3>

        {/* Cargo  */}
        <p className={`mt-1 text-sm text-(--text2)`}>
          {profile.cargo}
        </p>

        {/* Skills  */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {mainSkills.map((skill) => (
            <span
              key={skill}
              className={`px-3 scale-100 py-1 rounded-full text-sm font-semibold bg-(--secondary) text-(--primary)`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
};

export default ProfileCard;