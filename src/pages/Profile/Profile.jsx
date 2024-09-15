import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { getLocation, getEpisode } from '../../services/api';
import { useCharacter } from '../../context/CharacterContext';
import './Profile.css';

const statusColors = {
  alive: 'green',
  dead: 'red',
  unknown: 'blue',
};

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { character: propCharacter } = location.state || {};
  const { selectedCharacter, setSelectedCharacter } = useCharacter();
  const [character, setCharacter] = useState(propCharacter || selectedCharacter);
  const [locations, setLocations] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    if (character) {
      const locationPromises = character.location.url ? [getLocation(character.location.url)] : [];
      const episodePromises = character.episode.map((url) => getEpisode(url));
      
      Promise.all([...locationPromises, ...episodePromises]).then((responses) => {
        const locationData = locationPromises.length ? [responses.shift().data] : [];
        const episodeData = responses.map(res => res.data);
        setLocations(locationData);
        setEpisodes(episodeData);
      });
    }
  }, [character]);

  useEffect(() => {
    if (!character) {
      const storedCharacter = localStorage.getItem('selectedCharacter');
      if (storedCharacter) {
        setCharacter(JSON.parse(storedCharacter));
      } else {
        navigate('/');
      }
    } else {
      localStorage.setItem('selectedCharacter', JSON.stringify(character));
      setSelectedCharacter(character);
    }
  }, [character, navigate, setSelectedCharacter]);

  if (!character) {
    return null;
  }

  return (
    <div className="Profile text-center">
      <Card>
        {character.image && <Card.Img variant="top" src={character.image} alt={character.name} />}
        <Card.Body>
          <Card.Title>{character.name}</Card.Title>
          <Card.Text>
            <strong>Status:</strong> 
            <span className="status" style={{ color: statusColors[character.status.toLowerCase()] }}>
              {character.status}
            </span>
          </Card.Text>
          <Card.Text>
            <strong>Species:</strong> {character.species}
          </Card.Text>
          <Card.Text>
            <strong>Gender:</strong> {character.gender}
          </Card.Text>

          <div className="Locations">
            <h5>Locations</h5>
            {locations.length ? (
              <ul>
                {locations.map((location) => (
                  <li key={location.id}>{location.name}</li>
                ))}
              </ul>
            ) : (
              <p>No locations available</p>
            )}
          </div>

          <div className="Episodes">
            <h5>Episodes</h5>
            {episodes.length > 0 && (
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{episodes[0].name}</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      {episodes.slice(1).map((episode) => (
                        <li key={episode.id}>{episode.name}</li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
          </div>

          <Button variant="primary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
