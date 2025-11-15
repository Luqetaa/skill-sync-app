// src/components/PoolTalentos.jsx
import React from 'react';
import ProfileCard from './ProfileCard';

// Props que ele recebe do App.jsx:
// - perfis: A lista de perfis (já filtrada)
// - theme: O estado 'light' ou 'dark'
// - onCardClick: A função para abrir a modal
//
const PoolTalentos = ({ perfis, theme, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {/* Mapeamos a lista de perfis e criamos um ProfileCard para cada um,
        passando as props necessárias para ele.
      */}
      {perfis.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          theme={theme}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default PoolTalentos;