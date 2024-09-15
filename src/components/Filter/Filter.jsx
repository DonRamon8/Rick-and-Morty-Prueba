import React from 'react';
import Button from 'react-bootstrap/Button';
import './Filter.css'

const Filter = ({ onFilterChange }) => {
  return (
    <div className="Filter">
      <Button variant="secondary" onClick={() => onFilterChange('')}>
        All
      </Button>
      <Button variant="success" onClick={() => onFilterChange('alive')}>
        Alive
      </Button>
      <Button variant="danger" onClick={() => onFilterChange('dead')}>
        Dead
      </Button>
      <Button variant="info" onClick={() => onFilterChange('unknown')}>
        Unknown
      </Button>
    </div>
  );
};

export default Filter;
