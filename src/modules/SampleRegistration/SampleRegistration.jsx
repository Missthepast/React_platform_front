import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Upload as UploadIcon, Filter, Eye, Edit, Trash2, Search, X, ChevronUp, ChevronDown, AlertTriangle, ArrowUpDown } from 'lucide-react';
import SingleRegistrationForm from './components/SingleRegistrationForm';
import BulkRegistrationForm from './components/BulkRegistrationForm';
import CustomDatePicker from '../../components/Shared/CustomDatePicker';

// --- 1. 模拟数据生成 (优化：只保留 Draft 和 Submitted) ---
const generateMockData = () => {
    const data = [];
    const statuses = ['Submitted', 'Draft']; // 需求点3：状态只有 Draft 和 Submitted
    const types = ['Blood', 'Saliva', 'Tissue'];
    for (let i = 1; i <= 35; i++) {
        const pad = (n) => n.toString().padStart(3, '0');
        data.push({
            id: `SMP-2024-${pad(i)}`,
            pid: `PT-${pad(i)}`,
            type: types[i % 3],
            colDate: `2024-11-${(i % 30) + 1}`,
            regDate: `2024-11-${(i % 20) + 1}`,
            inst: i % 2 === 0 ? 'General Hospital' : 'Research Center',
            status: statuses[i % 2],
            doctor: `Dr. Smith ${i}`
        });
    }
    return data;
};

const SampleRegistration = () => {
    // --- 状态管理 ---
    const [viewMode, setViewMode] = useState('list');
    const [samples, setSamples] = useState(generateMockData());

    const [showFilters, setShowFilters] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'regDate', direction: 'desc' });
    const [filterRegDate, setFilterRegDate] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [jumpPage, setJumpPage] = useState('');

    const [selectedRowId, setSelectedRowId] = useState(null);
    const [modal, setModal] = useState({ type: null, data: null });

    // --- 需求点4：ESC 键关闭模态框 ---
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && modal.type) {
                closeModal();
            }
        };
        window.addEventListener('keydown', handleEscKey);
        return () => window.removeEventListener('keydown', handleEscKey);
    }, [modal]);

    // --- 辅助组件: 状态标签 ---
    const getStatusBadge = (status) => {
        const styles = {
            Submitted: { bg: '#E8F5E9', color: '#2E7D32' },
            Draft: { bg: '#E3F2FD', color: '#1565C0' },
        };
        const s = styles[status] || styles.Draft;
        return <span style={{ background: s.bg, color: s.color, padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>{status}</span>;
    };

    // --- 排序逻辑 ---
    const sortedSamples = useMemo(() => {
        let sortableItems = [...samples];

        // 筛选逻辑 (简单实现)
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
    }, [samples, sortConfig, filterRegDate]); // 依赖项加入 filterRegDate

    const totalPages = Math.ceil(sortedSamples.length / rowsPerPage);
    const currentTableData = sortedSamples.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // --- 辅助组件: 可排序表头 ---
    const SortableHeader = ({ label, field, width }) => {
        const isSorted = sortConfig.key === field;
        return (
            <th
                onClick={() => handleSort(field)}
                style={{ cursor: 'pointer', padding: '12px', width: width, userSelect: 'none' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {label}
                    {isSorted ? (
                        sortConfig.direction === 'asc' ? <ChevronUp size={15} color="#00897B" strokeWidth={3} /> : <ChevronDown size={15} color="#00897B" strokeWidth={3} />
                    ) : (
                        <ArrowUpDown size={14} color="#999" />
                    )}
                </div>
            </th>
        );
    };

    // --- 交互逻辑 ---
    const handleRowClick = (id) => setSelectedRowId(id);
    const openDetails = (item) => { setSelectedRowId(item.id); setModal({ type: 'details', data: item }); };
    const openEdit = (item) => { setSelectedRowId(item.id); setModal({ type: 'edit', data: { ...item } }); };
    const openDelete = (item) => { setSelectedRowId(item.id); setModal({ type: 'delete', data: item }); };
    const closeModal = () => setModal({ type: null, data: null });

    const confirmDelete = () => {
        setSamples(samples.filter(s => s.id !== modal.data.id));
        closeModal();
    };

    // --- 需求点1 & 2: 处理保存/提交逻辑 ---
    const handleSaveOrSubmit = (targetStatus) => {
        // 1. 校验 (Submit 时必须校验，Save Draft 可选，这里简单起见都校验必填项)
        if (!modal.data.pid || !modal.data.type) {
            alert("Patient ID and Sample Type are required.");
            return;
        }
        if (targetStatus === 'Submitted' && !modal.data.colDate) {
            alert("Collection Date is required for submission.");
            return;
        }

        // 2. 自动生成当前日期 (YYYY-MM-DD)
        const now = new Date();
        const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

        // 3. 构造更新后的对象
        const updatedItem = {
            ...modal.data,
            status: targetStatus, // 更新状态 (Draft -> Draft/Submitted)
            regDate: todayStr     // 需求点2: 自动更新录入时间
        };

        setSamples(samples.map(s => s.id === modal.data.id ? updatedItem : s));
        closeModal();
    };

    const handleJumpPage = () => {
        const page = parseInt(jumpPage);
        if (page >= 1 && page <= totalPages) { setCurrentPage(page); setJumpPage(''); }
    };

    if (viewMode === 'single') return <SingleRegistrationForm onCancel={() => setViewMode('list')} onSubmit={() => setViewMode('list')} />;
    if (viewMode === 'bulk') return <BulkRegistrationForm onCancel={() => setViewMode('list')} />;

    return (
        <div style={{ position: 'relative' }}>
            {/* Top Action Card */}
            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>New Sample(s)</span>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn btn-primary" onClick={() => setViewMode('single')}>
                        <Plus size={16} /> Single Registration
                    </button>
                    <button className="btn btn-primary" style={{ background: '#00695C' }} onClick={() => setViewMode('bulk')}>
                        <UploadIcon size={16} /> Bulk Registration
                    </button>
                </div>
            </div>

            {/* List Card */}
            <div className="card" style={{ minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0 }}>Sample List</h3>
                    <button
                        className="btn btn-outline"
                        onClick={() => setShowFilters(!showFilters)}
                        style={{ fontSize: '13px', padding: '6px 12px', borderColor: showFilters ? 'var(--primary-color)' : '#E0E0E0' }}
                    >
                        {showFilters ? <X size={16} /> : <Filter size={16} />}
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>

                {/* Filters */}
                {showFilters && (
                    <div style={{
                        background: '#F8F9FA',
                        padding: '20px',
                        borderRadius: '8px',
                        marginBottom: '24px',
                        border: '1px solid #EEE',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '16px',
                        alignItems: 'flex-end'
                    }}>
                        <div className="form-group" style={{ width: '200px' }}>
                            <label style={{ fontSize: '12px', marginBottom: '4px' }}>Sample ID</label>
                            <input type="text" className="form-input" placeholder="Search..." style={{ background: 'white' }} />
                        </div>
                        <div className="form-group" style={{ width: '200px' }}>
                            <label style={{ fontSize: '12px', marginBottom: '4px' }}>Patient ID</label>
                            <input type="text" className="form-input" placeholder="Search..." style={{ background: 'white' }} />
                        </div>
                        <div className="form-group" style={{ width: '150px' }}>
                            <label style={{ fontSize: '12px', marginBottom: '4px' }}>Sample Type</label>
                            <select className="form-input" style={{ background: 'white' }}><option>All types</option></select>
                        </div>
                        <div className="form-group" style={{ width: '150px' }}>
                            <label style={{ fontSize: '12px', marginBottom: '4px' }}>Status</label>
                            <select className="form-input" style={{ background: 'white' }}><option>All statuses</option></select>
                        </div>
                        {/* 需求点2: 列表筛选中已有 Registration Date */}
                        <div className="form-group" style={{ width: '180px' }}>
                            <label style={{ fontSize: '12px', marginBottom: '4px' }}>Registration Date</label>
                            <CustomDatePicker value={filterRegDate} onChange={setFilterRegDate} placeholder="yyyy-mm-dd" />
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
                            <button className="btn" style={{ background: 'white', border: '1px solid #ddd', color: '#666' }} onClick={() => setFilterRegDate('')}>Clear</button>
                            <button className="btn btn-primary" style={{ borderRadius: '4px' }}><Search size={14} /> Apply Filters</button>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div style={{ overflowX: 'auto', flex: 1 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #f0f0f0', color: '#555', textAlign: 'left', fontWeight: 600 }}>
                                <th style={{ padding: '12px', width: '120px' }}>Actions</th>
                                <SortableHeader label="Sample ID" field="id" />
                                <SortableHeader label="Patient ID" field="pid" />
                                <th>Sample Type</th>
                                <SortableHeader label="Collection Date" field="colDate" />
                                <SortableHeader label="Registration Date" field="regDate" />
                                <th>Institution</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTableData.map((row) => (
                                <tr
                                    key={row.id}
                                    onClick={() => handleRowClick(row.id)}
                                    style={{
                                        borderBottom: '1px solid #f9f9f9',
                                        cursor: 'pointer',
                                        backgroundColor: selectedRowId === row.id ? '#FFEBEE' : 'transparent',
                                        transition: 'background-color 0.2s'
                                    }}
                                    onMouseEnter={(e) => { if (selectedRowId !== row.id) e.currentTarget.style.backgroundColor = '#FAFAFA'; }}
                                    onMouseLeave={(e) => { if (selectedRowId !== row.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
                                >
                                    <td style={{ padding: '16px 12px' }}>
                                        <div style={{ display: 'flex', gap: '16px', color: '#757575' }}>
                                            <Eye size={18} style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); openDetails(row); }} title="Details" />
                                            <Edit size={18} style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); openEdit(row); }} title="Modify" />
                                            <Trash2 size={18} color="#D32F2F" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); openDelete(row); }} title="Delete" />
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: 500 }}>{row.id}</td>
                                    <td>{row.pid}</td>
                                    <td>{row.type}</td>
                                    <td>{row.colDate}</td>
                                    <td>{row.regDate}</td>
                                    <td>{row.inst}</td>
                                    <td>{getStatusBadge(row.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Toolbar */}
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px', fontSize: '13px', color: '#666', borderTop: '1px solid #eee', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>Rows per page:</span>
                        <select
                            value={rowsPerPage}
                            onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                            style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ddd' }}
                        >
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={200}>200</option>
                        </select>
                    </div>
                    <span>Page {currentPage} of {totalPages}</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="btn" style={{ padding: '4px 12px', background: currentPage === 1 ? '#f5f5f5' : 'white', border: '1px solid #ddd' }}>Previous</button>
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="btn" style={{ padding: '4px 12px', background: currentPage === totalPages ? '#f5f5f5' : 'white', border: '1px solid #ddd' }}>Next</button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '12px' }}>
                        <span>Go to</span>
                        <input type="number" value={jumpPage} onChange={(e) => setJumpPage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleJumpPage()} style={{ width: '50px', padding: '4px', border: '1px solid #ddd', borderRadius: '4px' }} />
                        <button onClick={handleJumpPage} className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '12px' }}>Go</button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {modal.type && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {modal.type === 'details' && (
                        <div className="card" style={{ width: '500px', position: 'relative', maxHeight: '80vh', overflowY: 'auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                                <h3>Sample Details</h3>
                                <button onClick={closeModal} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={20} /></button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div><strong>Sample ID:</strong> <p>{modal.data.id}</p></div>
                                <div><strong>Patient ID:</strong> <p>{modal.data.pid}</p></div>
                                <div><strong>Type:</strong> <p>{modal.data.type}</p></div>
                                <div><strong>Doctor:</strong> <p>{modal.data.doctor}</p></div>
                                <div><strong>Collection Date:</strong> <p>{modal.data.colDate}</p></div>
                                <div><strong>Registration Date:</strong> <p>{modal.data.regDate}</p></div>
                                <div><strong>Institution:</strong> <p>{modal.data.inst}</p></div>
                                <div><strong>Status:</strong> {getStatusBadge(modal.data.status)}</div>
                            </div>
                        </div>
                    )}

                    {modal.type === 'edit' && (
                        <div className="card" style={{ width: '600px', position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                                <h3>Modify Sample</h3>
                                <button onClick={closeModal} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={20} /></button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div className="form-group">
                                    <label>Sample ID (Unique Identifier)</label>
                                    <input type="text" className="form-input" value={modal.data.id} disabled style={{ background: '#f5f5f5', color: '#888' }} />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Patient ID <span className="required">*</span></label>
                                        <input type="text" className="form-input" value={modal.data.pid} onChange={(e) => setModal({ ...modal, data: { ...modal.data, pid: e.target.value } })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Sample Type <span className="required">*</span></label>
                                        <select className="form-input" value={modal.data.type} onChange={(e) => setModal({ ...modal, data: { ...modal.data, type: e.target.value } })}>
                                            <option>Blood</option><option>Saliva</option><option>Tissue</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Collection Date</label>
                                        <CustomDatePicker value={modal.data.colDate} onChange={(date) => setModal({ ...modal, data: { ...modal.data, colDate: date } })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Doctor</label>
                                        <input type="text" className="form-input" value={modal.data.doctor} onChange={(e) => setModal({ ...modal, data: { ...modal.data, doctor: e.target.value } })} />
                                    </div>
                                </div>
                            </div>

                            {/* 需求点1: 修改弹窗底部的按钮逻辑 */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px', borderTop: '1px solid #eee', paddingTop: '16px' }}>
                                <button className="btn btn-outline" onClick={closeModal}>Cancel</button>

                                {modal.data.status === 'Draft' ? (
                                    <>
                                        <button
                                            className="btn"
                                            style={{ background: '#F57C00', color: 'white', border: 'none' }}
                                            onClick={() => handleSaveOrSubmit('Draft')} // 保存为 Draft
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleSaveOrSubmit('Submitted')} // 提交为 Submitted
                                        >
                                            Submit
                                        </button>
                                    </>
                                ) : (
                                    // 如果已经是 Submitted，通常只允许保存修改（保持 Submitted）
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleSaveOrSubmit('Submitted')}
                                    >
                                        Save Changes
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {modal.type === 'delete' && (
                        <div className="card" style={{ width: '400px', textAlign: 'center', padding: '32px' }}>
                            <div style={{ margin: '0 auto 16px', width: '48px', height: '48px', borderRadius: '50%', background: '#FFEBEE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <AlertTriangle size={24} color="#D32F2F" />
                            </div>
                            <h3 style={{ marginBottom: '12px' }}>Confirm Deletion?</h3>
                            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', marginBottom: '24px' }}>
                                Deletion cannot be undone, and related cases will be archived directly. <br />
                                Are you sure you want to delete sample <strong>{modal.data.id}</strong>?
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                                <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
                                <button className="btn btn-primary" style={{ background: '#D32F2F', borderColor: '#D32F2F' }} onClick={confirmDelete}>Confirm Delete</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SampleRegistration;