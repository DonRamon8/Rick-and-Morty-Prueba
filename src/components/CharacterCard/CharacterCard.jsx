import React from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { useCharacter } from '../../context/CharacterContext';
import './CharacterCard.css'

const statusColors = {
  alive: 'green',
  dead: 'red',
  unknown: 'blue',
};

export const CharacterCard = ({ character }) => {
  const { id, name, image, status, species, gender } = character;
  const navigate = useNavigate();
  const { setSelectedCharacter } = useCharacter();

  const goToProfile = () => {
    setSelectedCharacter(character);
    navigate(`/profile/${id}`);
  };

  return (
    <Card className="Character-Card" onClick={goToProfile}>
      <Card.Img variant="top" src={image} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <h1>{id}</h1>
        </Card.Text>
        <Card.Text>
          <strong>Status:</strong> 
          <span className="status" style={{ color: statusColors[status.toLowerCase()] }}>
            {status}
          </span>
        </Card.Text>
        <Card.Text>
          <strong>Species:</strong> {species}
        </Card.Text>
        <Card.Text>
          <strong>Gender:</strong> {gender}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
