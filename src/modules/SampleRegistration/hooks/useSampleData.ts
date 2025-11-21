import { useState } from 'react';
import { Sample } from '../types';

export const generateMockData = (): Sample[] => {
  const data: Sample[] = [];
  const statuses: ('Submitted' | 'Draft')[] = ['Submitted', 'Draft'];
  const types = ['Blood', 'Saliva', 'Tissue'];
  for (let i = 1; i <= 35; i++) {
    const pad = (n: number) => n.toString().padStart(3, '0');
    data.push({
      id: `SMP-2024-${pad(i)}`,
      pid: `PT-${pad(i)}`,
      type: types[i % 3],
      colDate: `2024-11-${(i % 30) + 1}`,
      regDate: `2024-11-${(i % 20) + 1}`,
      inst: i % 2 === 0 ? 'General Hospital' : 'Research Center',
      status: statuses[i % 2],
      doctor: `Dr. Smith ${i}`,
    });
  }
  return data;
};

export const useSampleData = () => {
  const [samples, setSamples] = useState<Sample[]>(generateMockData());

  const addSample = (newSample: Sample) => {
    setSamples(prev => [newSample, ...prev]);
  };

  const updateSample = (updatedSample: Sample) => {
    setSamples(prev => prev.map(s => (s.id === updatedSample.id ? updatedSample : s)));
  };

  const deleteSample = (id: string) => {
    setSamples(prev => prev.filter(s => s.id !== id));
  };

  return {
    samples,
    setSamples,
    addSample,
    updateSample,
    deleteSample,
  };
};
