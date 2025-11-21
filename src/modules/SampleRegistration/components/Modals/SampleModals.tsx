import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import DatePicker from '../../../../components/Shared/DatePicker';
import { Sample, ModalState } from '../../types';

interface SampleModalsProps {
  modal: ModalState;
  onClose: () => void;
  onSave: (status: 'Draft' | 'Submitted') => void;
  onDelete: () => void;
  onUpdateData: (data: Partial<Sample>) => void;
}

const getStatusBadge = (status: string) => {
  const className = `status-badge status-badge--${status.toLowerCase()}`;
  return <span className={className}>{status}</span>;
};

const SampleModals: React.FC<SampleModalsProps> = ({
  modal,
  onClose,
  onSave,
  onDelete,
  onUpdateData,
}) => {
  if (!modal.type || !modal.data) return null;

  return (
    <div className="modal-overlay">
      {modal.type === 'details' && (
        <div className="card modal-content" style={{ width: '500px' }}>
          <div className="modal-content__header">
            <h3>Sample Details</h3>
            <button onClick={onClose} className="modal-content__close-btn">
              <X size={20} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <strong>Sample ID:</strong> <p>{modal.data.id}</p>
            </div>
            <div>
              <strong>Patient ID:</strong> <p>{modal.data.pid}</p>
            </div>
            <div>
              <strong>Type:</strong> <p>{modal.data.type}</p>
            </div>
            <div>
              <strong>Doctor:</strong> <p>{modal.data.doctor}</p>
            </div>
            <div>
              <strong>Collection Date:</strong> <p>{modal.data.colDate}</p>
            </div>
            <div>
              <strong>Registration Date:</strong> <p>{modal.data.regDate}</p>
            </div>
            <div>
              <strong>Institution:</strong> <p>{modal.data.inst}</p>
            </div>
            <div>
              <strong>Status:</strong> {getStatusBadge(modal.data.status)}
            </div>
          </div>
        </div>
      )}

      {modal.type === 'edit' && (
        <div className="card modal-content" style={{ width: '600px' }}>
          <div className="modal-content__header">
            <h3>Modify Sample</h3>
            <button onClick={onClose} className="modal-content__close-btn">
              <X size={20} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label>Sample ID (Unique Identifier)</label>
              <input
                type="text"
                className="form-input"
                value={modal.data.id}
                disabled
                style={{ background: '#f5f5f5', color: '#888' }}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>
                  Patient ID <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={modal.data.pid}
                  onChange={e => onUpdateData({ pid: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>
                  Sample Type <span className="required">*</span>
                </label>
                <select
                  className="form-input"
                  value={modal.data.type}
                  onChange={e => onUpdateData({ type: e.target.value })}
                >
                  <option>Blood</option>
                  <option>Saliva</option>
                  <option>Tissue</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <DatePicker
                label="Collection Date"
                value={modal.data.colDate}
                onChange={date => onUpdateData({ colDate: date })}
              />
              <div className="form-group">
                <label>Doctor</label>
                <input
                  type="text"
                  className="form-input"
                  value={modal.data.doctor}
                  onChange={e => onUpdateData({ doctor: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="modal-content__footer">
            <button className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>

            {modal.data.status === 'Draft' ? (
              <>
                <button
                  className="btn"
                  style={{ background: '#F57C00', color: 'white', border: 'none' }}
                  onClick={() => onSave('Draft')}
                >
                  Save Changes
                </button>
                <button className="btn btn-primary" onClick={() => onSave('Submitted')}>
                  Submit
                </button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={() => onSave('Submitted')}>
                Save Changes
              </button>
            )}
          </div>
        </div>
      )}

      {modal.type === 'delete' && (
        <div className="card" style={{ width: '400px', textAlign: 'center', padding: '32px' }}>
          <div
            style={{
              margin: '0 auto 16px',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#FFEBEE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AlertTriangle size={24} color="#D32F2F" />
          </div>
          <h3 style={{ marginBottom: '12px' }}>Confirm Deletion?</h3>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', marginBottom: '24px' }}>
            Deletion cannot be undone, and related cases will be archived directly. <br />
            Are you sure you want to delete sample <strong>{modal.data.id}</strong>?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              style={{ background: '#D32F2F', borderColor: '#D32F2F' }}
              onClick={onDelete}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SampleModals;
