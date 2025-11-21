import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import DatePicker from '../../../components/Shared/DatePicker';

interface SingleRegistrationFormProps {
  onCancel: () => void;
  onSubmit: () => void;
}

const SingleRegistrationForm: React.FC<SingleRegistrationFormProps> = ({ onCancel, onSubmit }) => {
  const [dob, setDob] = useState('');
  const [colDate, setColDate] = useState('');

  return (
    <div className="card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid #eee',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>New Sample(s)</h3>
        <button
          onClick={onCancel}
          className="btn btn-outline"
          style={{ padding: '6px 16px', borderRadius: '4px', fontSize: '14px' }}
        >
          <ArrowLeft size={16} /> Back to List
        </button>
      </div>

      <h4 style={{ marginBottom: '16px', color: '#444' }}>Patient Information</h4>
      <div className="form-row">
        <div className="form-group">
          <label>
            Patient ID <span className="required">*</span>
          </label>
          <input type="text" className="form-input" placeholder="Enter patient ID" />
        </div>
        <div className="form-group">
          <label>
            Name <span className="required">*</span>
          </label>
          <input type="text" className="form-input" placeholder="Enter patient name" />
        </div>
      </div>

      <div className="form-row">
        <DatePicker
          label="DOB"
          required={true}
          value={dob}
          onChange={setDob}
          placeholder="Select Date of Birth"
        />
        <div className="form-group">
          <label>
            Gender <span className="required">*</span>
          </label>
          <select className="form-input">
            <option>Select gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
      </div>

      <h4 style={{ margin: '24px 0 16px', color: '#444' }}>Sample Information</h4>
      <div className="form-row">
        <div className="form-group">
          <label>
            Sample ID <span className="required">*</span>
          </label>
          <input type="text" className="form-input" placeholder="Enter sample ID" />
        </div>
        <div className="form-group">
          <label>Doctor</label>
          <input type="text" className="form-input" placeholder="Enter doctor name" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>
            Sample Type <span className="required">*</span>
          </label>
          <select className="form-input">
            <option value="Blood">Blood</option>
            <option value="Saliva">Saliva</option>
            <option value="Tissue">Tissue</option>
          </select>
        </div>
        <DatePicker
          label="Collection Date"
          value={colDate}
          onChange={setColDate}
          placeholder="Select Collection Date"
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          marginTop: '32px',
          paddingTop: '20px',
          borderTop: '1px solid #eee',
        }}
      >
        <button
          className="btn"
          style={{ border: '1px solid #ccc', background: 'white' }}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button className="btn" style={{ background: '#F57C00', color: 'white' }}>
          Save as Draft
        </button>
        <button className="btn btn-primary" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default SingleRegistrationForm;
