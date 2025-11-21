import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Plus, Upload as UploadIcon, Filter, X } from 'lucide-react';
import SingleRegistrationForm from './components/SingleRegistrationForm';
import BulkRegistrationForm from './components/BulkRegistrationForm';
import SampleFilters from './components/SampleList/SampleFilters';
import SampleTable from './components/SampleList/SampleTable';
import SampleModals from './components/Modals/SampleModals';
import { useSampleData } from './hooks/useSampleData';
import { Sample, SortConfig, ModalState } from './types';
import './styles.scss';

const SampleRegistration: React.FC = () => {
  // --- 状态管理 ---
  const [viewMode, setViewMode] = useState<'list' | 'single' | 'bulk'>('list');
  const { samples, setSamples } = useSampleData();

  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'regDate', direction: 'desc' });
  const [filterRegDate, setFilterRegDate] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [jumpPage, setJumpPage] = useState('');

  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>({ type: null, data: null });

  // --- 交互逻辑 ---
  const closeModal = useCallback(() => setModal({ type: null, data: null }), []);

  // --- ESC 键关闭模态框 ---
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modal.type) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [modal, closeModal]);

  // --- 排序逻辑 ---
  const sortedSamples = useMemo(() => {
    let sortableItems = [...samples];

    if (filterRegDate) {
      sortableItems = sortableItems.filter(item => item.regDate === filterRegDate);
    }

    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (sortConfig.key === 'regDate' || sortConfig.key === 'colDate') {
          const dateA = new Date(valA).getTime();
          const dateB = new Date(valB).getTime();
          return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
        }
        const strA = String(valA);
        const strB = String(valB);
        if (sortConfig.direction === 'asc') {
          return strA.localeCompare(strB, undefined, { numeric: true, sensitivity: 'base' });
        } else {
          return strB.localeCompare(strA, undefined, { numeric: true, sensitivity: 'base' });
        }
      });
    }
    return sortableItems;
  }, [samples, sortConfig, filterRegDate]);

  const totalPages = Math.ceil(sortedSamples.length / rowsPerPage);
  const currentTableData = sortedSamples.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = useCallback((key: keyof Sample) => {
    setSortConfig(prevConfig => {
      let direction: 'asc' | 'desc' = 'asc';
      if (prevConfig.key === key && prevConfig.direction === 'asc') {
        direction = 'desc';
      }
      return { key, direction };
    });
  }, []);

  // --- 其他交互逻辑 ---
  const handleRowClick = useCallback((id: string) => setSelectedRowId(id), []);

  const openDetails = useCallback((item: Sample) => {
    setSelectedRowId(item.id);
    setModal({ type: 'details', data: item });
  }, []);

  const openEdit = useCallback((item: Sample) => {
    setSelectedRowId(item.id);
    setModal({ type: 'edit', data: { ...item } });
  }, []);

  const openDelete = useCallback((item: Sample) => {
    setSelectedRowId(item.id);
    setModal({ type: 'delete', data: item });
  }, []);

  const confirmDelete = useCallback(() => {
    if (modal.data) {
      setSamples(prevSamples => prevSamples.filter(s => s.id !== modal.data!.id));
      closeModal();
    }
  }, [modal.data, closeModal, setSamples]);

  const handleSaveOrSubmit = useCallback(
    (targetStatus: 'Draft' | 'Submitted') => {
      if (!modal.data) return;

      if (!modal.data.pid || !modal.data.type) {
        alert('Patient ID and Sample Type are required.');
        return;
      }
      if (targetStatus === 'Submitted' && !modal.data.colDate) {
        alert('Collection Date is required for submission.');
        return;
      }

      const now = new Date();
      const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

      const updatedItem = {
        ...modal.data,
        status: targetStatus,
        regDate: todayStr,
      };

      setSamples(prevSamples => prevSamples.map(s => (s.id === modal.data!.id ? updatedItem : s)));
      closeModal();
    },
    [modal.data, closeModal, setSamples]
  );

  const handleUpdateModalData = useCallback((data: Partial<Sample>) => {
    setModal(prev => ({
      ...prev,
      data: prev.data ? { ...prev.data, ...data } : null,
    }));
  }, []);

  const handleJumpPage = useCallback(() => {
    const page = parseInt(jumpPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setJumpPage('');
    }
  }, [jumpPage, totalPages]);

  if (viewMode === 'single')
    return (
      <SingleRegistrationForm
        onCancel={() => setViewMode('list')}
        onSubmit={() => setViewMode('list')}
      />
    );
  if (viewMode === 'bulk') return <BulkRegistrationForm onCancel={() => setViewMode('list')} />;

  return (
    <div className="sample-registration">
      {/* Top Action Card */}
      <div className="card sample-registration__header">
        <span className="sample-registration__title">New Sample(s)</span>
        <div className="sample-registration__actions">
          <button className="btn btn-primary" onClick={() => setViewMode('single')}>
            <Plus size={16} /> Single Registration
          </button>
          <button
            className="btn btn-primary"
            style={{ background: '#00695C' }}
            onClick={() => setViewMode('bulk')}
          >
            <UploadIcon size={16} /> Bulk Registration
          </button>
        </div>
      </div>

      {/* List Card */}
      <div className="card sample-registration__list-card">
        <div className="sample-registration__list-header">
          <h3>Sample List</h3>
          <button
            className="btn btn-outline"
            onClick={() => setShowFilters(!showFilters)}
            style={{
              fontSize: '13px',
              padding: '6px 12px',
              borderColor: showFilters ? 'var(--primary-color)' : '#E0E0E0',
            }}
          >
            {showFilters ? <X size={16} /> : <Filter size={16} />}
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <SampleFilters filterRegDate={filterRegDate} setFilterRegDate={setFilterRegDate} />
        )}

        {/* Table */}
        <SampleTable
          data={currentTableData}
          sortConfig={sortConfig}
          onSort={handleSort}
          selectedRowId={selectedRowId}
          onRowClick={handleRowClick}
          onDetails={openDetails}
          onEdit={openEdit}
          onDelete={openDelete}
        />

        {/* Pagination Toolbar */}
        <div className="sample-registration__pagination">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={e => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
            </select>
          </div>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="btn"
              style={{
                padding: '4px 12px',
                background: currentPage === 1 ? '#f5f5f5' : 'white',
                border: '1px solid #ddd',
              }}
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="btn"
              style={{
                padding: '4px 12px',
                background: currentPage === totalPages ? '#f5f5f5' : 'white',
                border: '1px solid #ddd',
              }}
            >
              Next
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '12px' }}>
            <span>Go to</span>
            <input
              type="number"
              value={jumpPage}
              onChange={e => setJumpPage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleJumpPage()}
              style={{
                width: '50px',
                padding: '4px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
            <button
              onClick={handleJumpPage}
              className="btn btn-outline"
              style={{ padding: '4px 8px', fontSize: '12px' }}
            >
              Go
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SampleModals
        modal={modal}
        onClose={closeModal}
        onSave={handleSaveOrSubmit}
        onDelete={confirmDelete}
        onUpdateData={handleUpdateModalData}
      />
    </div>
  );
};

export default SampleRegistration;
