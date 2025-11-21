import React from 'react';
import ProfileCard from './ProfileCard';

const PoolTalentos = ({ perfis, theme, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
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