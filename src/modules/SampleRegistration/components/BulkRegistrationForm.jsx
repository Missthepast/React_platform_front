import React from 'react';
import { Upload, Download, ArrowLeft } from 'lucide-react'; // 补充引入 ArrowLeft

const BulkRegistrationForm = ({ onCancel }) => {
    return (
        <div className="card">
            {/* 一致性优化：
         使用与 SingleRegistrationForm 完全相同的 Header 结构和样式 
      */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid #eee'
            }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>New Sample(s)</h3>
                <button
                    onClick={onCancel}
                    className="btn btn-outline"
                    style={{ padding: '6px 16px', borderRadius: '4px', fontSize: '14px' }}
                >
                    <ArrowLeft size={16} /> Back to List
                </button>
            </div>

            {/* 下方内容保持不变，仅微调了部分 margin 以匹配新布局的呼吸感 */}
            <div style={{ background: '#E3F2FD', padding: '16px', borderRadius: '6px', marginBottom: '24px', border: '1px solid #90CAF9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0D47A1', fontWeight: 600 }}>
                    <span>ℹ️ Bulk Registration Instructions</span>
                </div>
                <p style={{ fontSize: '13px', marginTop: '8px', color: '#333', lineHeight: '1.5' }}>
                    Please download the template below, fill in the sample information, and upload the completed file.<br />
                    All required fields must be filled with valid data before submission.
                </p>
                <button className="btn btn-primary" style={{ marginTop: '12px', background: '#1976D2', padding: '8px 16px' }}>
                    <Download size={16} /> Download Template
                </button>
            </div>

            <div style={{
                border: '2px dashed #BDBDBD',
                borderRadius: '8px',
                height: '250px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: '#FAFAFA',
                transition: 'border-color 0.2s'
            }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-color)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#BDBDBD'}
            >
                <div style={{ background: '#E0E0E0', padding: '16px', borderRadius: '50%', marginBottom: '16px' }}>
                    <Upload size={32} color="#666" />
                </div>
                <p style={{ fontWeight: 500, fontSize: '16px' }}>Drop file here or <span style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>click to upload</span></p>
                <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>XLSX/XLS/CSV files with a size less than 10MB</p>
            </div>
        </div>
    );
};

export default BulkRegistrationForm;