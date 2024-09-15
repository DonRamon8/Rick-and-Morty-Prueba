import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { getAllCharacters } from '../../services/api';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import Filter from '../Filter/Filter';
import './CharacterList.css'

export const CharacterList = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [displayedCount, setDisplayedCount] = useState(8);
  const [statusFilter, setStatusFilter] = useState('');
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadAllCharacters();
  }, [statusFilter]);

  const loadAllCharacters = async () => {
    try {
      const response = await getAllCharacters(statusFilter);
      const newCharacters = response.data.results;

      if (newCharacters.length === 0) {
        setHasMore(false);
      }

      setAllCharacters(newCharacters);

      setCharacters(newCharacters.slice(0, 8));

      setDisplayedCount(8);
    } catch (error) {
      console.error('Error loading characters:', error);
    }
  };

  const handleLoadMore = () => {
    const nextCharacters = allCharacters.slice(displayedCount, displayedCount + 8);
    
    setCharacters((prev) => [...prev, ...nextCharacters]);

    setDisplayedCount((prev) => prev + 8);

    if (displayedCount + 8 >= allCharacters.length) {
      setHasMore(false);
    }
  };

  const handleFilterChange = (status) => {
    setCharacters([]);
    setDisplayedCount(8);
    setStatusFilter(status);
    setHasMore(true);
  };

  return (
    <div className="Character-List">
      <div className="d-flex justify-content-between mb-4">
        <Filter onFilterChange={handleFilterChange} />
      </div>

      <Row>
        {characters.map((character) => (
          <Col key={character.id} xs={12} md={4} lg={3} className="mb-4">
            <CharacterCard character={character} />
          </Col>
        ))}
      </Row>

      {hasMore && (
        <div className="text-center mt-4">
          <Button onClick={handleLoadMore} variant="primary">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};
