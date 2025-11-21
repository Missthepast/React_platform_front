import React, { useState } from 'react';
import { FormModal } from '../components/common/FormModal/FormModal';
// import { DataTable } from '../components/common/DataTable/DataTable';
// import type { ProColumns } from '@ant-design/pro-components';

/*
interface DemoData {
    id: string;
    name: string;
    value: string;
    status: string;
}
*/

export const DesignSystemDemo: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // DataTable 示例配置 (已注释，因移除 Ant Design)
  /*
    const columns: ProColumns<DemoData>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 100,
        },
        {
            title: '名称',
            dataIndex: 'name',
            width: 200,
        },
        {
            title: '值',
            dataIndex: 'value',
            width: 150,
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 120,
            render: (text: string) => (
                <span className={`text-${text === 'Active' ? 'success' : 'secondary'}`}>
                    {text}
                </span>
            ),
        },
    ];
    */

  /*
    const mockRequest = async () => {
        return {
            data: [
                { id: '1', name: '示例数据 1', value: '100', status: 'Active' },
                { id: '2', name: '示例数据 2', value: '200', status: 'Inactive' },
                { id: '3', name: '示例数据 3', value: '300', status: 'Active' },
            ],
            success: true,
            total: 3,
        };
    };
    */

  const handleModalOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalVisible(false);
    }, 1000);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '32px' }}>设计系统演示</h1>

      {/* 颜色系统 */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <h2 className="card-title">颜色系统</h2>
        </div>
        <div className="card-body">
          <div className="flex gap-md" style={{ flexWrap: 'wrap' }}>
            <div
              style={{
                padding: '16px',
                background: '#00897B',
                color: 'white',
                borderRadius: '8px',
              }}
            >
              Primary: #00897B
            </div>
            <div
              style={{
                padding: '16px',
                background: '#2E7D32',
                color: 'white',
                borderRadius: '8px',
              }}
            >
              Success: #2E7D32
            </div>
            <div
              style={{
                padding: '16px',
                background: '#F57C00',
                color: 'white',
                borderRadius: '8px',
              }}
            >
              Warning: #F57C00
            </div>
            <div
              style={{
                padding: '16px',
                background: '#D32F2F',
                color: 'white',
                borderRadius: '8px',
              }}
            >
              Error: #D32F2F
            </div>
          </div>
        </div>
      </div>

      {/* 按钮组件 */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <h2 className="card-title">按钮组件</h2>
        </div>
        <div className="card-body">
          <div className="flex gap-md">
            <button className="btn btn-primary">Primary Button</button>
            <button className="btn btn-secondary">Secondary Button</button>
            <button className="btn btn-outline">Outline Button</button>
            <button className="btn btn-primary" disabled>
              Disabled Button
            </button>
          </div>
        </div>
      </div>

      {/* 表单组件 */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <h2 className="card-title">表单组件</h2>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label>
              文本输入 <span className="required">*</span>
            </label>
            <input type="text" className="form-input" placeholder="请输入内容..." />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>字段 1</label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-group">
              <label>字段 2</label>
              <input type="text" className="form-input" />
            </div>
          </div>
          <div className="form-group">
            <label>禁用输入</label>
            <input type="text" className="form-input" disabled value="禁用状态" readOnly />
          </div>
        </div>
      </div>

      {/* Modal 组件 */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <h2 className="card-title">Modal 组件</h2>
        </div>
        <div className="card-body">
          <button className="btn btn-primary" onClick={() => setModalVisible(true)}>
            打开 Modal
          </button>

          <FormModal
            visible={modalVisible}
            title="示例 Modal"
            width={600}
            onClose={() => setModalVisible(false)}
            onOk={handleModalOk}
            onCancel={() => setModalVisible(false)}
            okText="确定"
            cancelText="取消"
            loading={loading}
          >
            <div className="form-group">
              <label>示例输入</label>
              <input type="text" className="form-input" placeholder="在 Modal 中输入..." />
            </div>
            <div className="form-group">
              <label>备注</label>
              <textarea className="form-input" rows={4} placeholder="输入备注..." />
            </div>
          </FormModal>
        </div>
      </div>

      {/* DataTable 组件 (已移除) */}
      {/* 
            <div className="card" style={{ marginBottom: '24px' }}>
                <div className="card-header">
                    <h2 className="card-title">DataTable 组件</h2>
                </div>
                <div className="card-body">
                    <DataTable<DemoData>
                        columns={columns}
                        request={mockRequest}
                        rowKey="id"
                        toolbar={{
                            title: '数据表格示例',
                            actions: [
                                <button key="add" className="btn btn-primary">
                                    添加数据
                                </button>,
                            ],
                        }}
                    />
                </div>
            </div>
            */}

      {/* 工具类 */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">工具类示例</h2>
        </div>
        <div className="card-body">
          <div className="flex-between" style={{ marginBottom: '16px' }}>
            <span>flex-between 布局</span>
            <span className="text-primary">Primary Text</span>
          </div>
          <div className="flex gap-md" style={{ marginBottom: '16px' }}>
            <div className="p-md bg-gray" style={{ borderRadius: '4px' }}>
              gap-md 间距
            </div>
            <div className="p-md bg-gray" style={{ borderRadius: '4px' }}>
              p-md 内边距
            </div>
          </div>
          <div>
            <p className="text-primary">Primary 文本颜色</p>
            <p className="text-secondary">Secondary 文本颜色</p>
            <p className="text-success">Success 文本颜色</p>
            <p className="text-error">Error 文本颜色</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemDemo;
