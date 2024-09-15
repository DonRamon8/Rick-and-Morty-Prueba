import React from 'react';
import { CharacterList } from '../../components/CharacterList/CharacterList';
import UserProfile from '../../components/UserProfile/UserProfile'; 
import { useCharacter } from '../../context/CharacterContext'; 
import './Home.css';

const Home = () => {
  const { selectedCharacter } = useCharacter();

  // Usa los datos del personaje seleccionado para el perfil
  const user = selectedCharacter
    ? {
        name: selectedCharacter.name,
        avatar: selectedCharacter.image // Usa la imagen del personaje como avatar
      }
    : {
        name: 'User profile', // Nombre por defecto si no hay personaje seleccionado
        avatar: '../../../public/portal.png' // Imagen por defecto si no hay personaje seleccionado
      };

  return (
    <div className="Home">
      <div className="top-bar">
      <img src="../../../public/letters.png" alt="" />
      <div>
        <UserProfile user={user} />
      </div>
      </div>
      <CharacterList />
    </div>
  );
};

export default Home;
