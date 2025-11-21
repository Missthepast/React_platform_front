import React from 'react';

interface UnderDevelopmentProps {
  title: string;
}

const UnderDevelopment: React.FC<UnderDevelopmentProps> = ({ title }) => {
  return (
    <div
      className="card"
      style={{
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#78909C',
      }}
    >
      <h2 style={{ color: '#546E7A', marginBottom: '8px' }}>{title} Module</h2>
      <p>This module is under development</p>
    </div>
  );
};

export default UnderDevelopment;
