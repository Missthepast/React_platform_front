import React from 'react';
import { Search } from 'lucide-react';
import DatePicker from '../../../../components/Shared/DatePicker';

interface SampleFiltersProps {
  filterRegDate: string;
  setFilterRegDate: (date: string) => void;
}

const SampleFilters: React.FC<SampleFiltersProps> = ({ filterRegDate, setFilterRegDate }) => {
  return (
    <div className="sample-registration__filters">
      <div className="form-group" style={{ width: '200px' }}>
        <label style={{ fontSize: '12px', marginBottom: '4px' }}>Sample ID</label>
        <input
          type="text"
          className="form-input"
          placeholder="Search..."
          style={{ background: 'white' }}
        />
      </div>
      <div className="form-group" style={{ width: '200px' }}>
        <label style={{ fontSize: '12px', marginBottom: '4px' }}>Patient ID</label>
        <input
          type="text"
          className="form-input"
          placeholder="Search..."
          style={{ background: 'white' }}
        />
      </div>
      <div className="form-group" style={{ width: '150px' }}>
        <label style={{ fontSize: '12px', marginBottom: '4px' }}>Sample Type</label>
        <select className="form-input" style={{ background: 'white' }}>
          <option>All types</option>
        </select>
      </div>
      <div className="form-group" style={{ width: '150px' }}>
        <label style={{ fontSize: '12px', marginBottom: '4px' }}>Status</label>
        <select className="form-input" style={{ background: 'white' }}>
          <option>All statuses</option>
        </select>
      </div>
      <DatePicker
        label="Registration Date"
        value={filterRegDate}
        onChange={setFilterRegDate}
        placeholder="yyyy-mm-dd"
      />
      <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
        <button
          className="btn"
          style={{ background: 'white', border: '1px solid #ddd', color: '#666' }}
          onClick={() => setFilterRegDate('')}
        >
          Clear
        </button>
        <button className="btn btn-primary" style={{ borderRadius: '4px' }}>
          <Search size={14} /> Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SampleFilters;
