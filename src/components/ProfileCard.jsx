import React from 'react';

const ProfileCard = ({ profile, theme, onCardClick }) => {
  const DEFAULT_FOTO = 'https://avatar.iran.liara.run/public';
  const foto = profile.foto && profile.foto.trim() !== '' ? profile.foto : DEFAULT_FOTO;

  const mainSkills = profile.habilidadesTecnicas.slice(0, 3);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onCardClick(profile);
    }
  };

  return (
    <div
      onClick={() => onCardClick(profile)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
      className={`
        w-full p-5 rounded-2xl border shadow-md text-left 
        transition-all duration-200 ease-in-out
        transform hover:-translate-y-1 focus:outline-none
        focus:ring-2 focus:ring-(--primary) 
        min-h-84 
        flex flex-col /* Layout principal: vertical */
        bg-(--container) border-(--border-color) hover:bg-(--container)/20
        cursor-pointer 
      `}
    >
      <div className="flex flex-col items-center text-center flex-1"> 
        
        <img
          src={foto}
          alt={`Foto de ${profile.nome}`}
          className="w-24 h-24 rounded-full object-cover border-2 border-(--border-color)"
        />
        <h3 className={`mt-4 text-xl font-bold text-(--text)`}>
          {profile.nome}
        </h3>
        <p className={`mt-1 text-sm text-(--text2)`}>
          {profile.cargo}
        </p>
        
        <div className="flex-1"></div> 
        
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
    </div>
  );
};

export default ProfileCard;