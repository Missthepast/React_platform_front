import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { DataTable } from '../../components/common/DataTable/DataTable';
import { FormModal } from '../../components/common/FormModal/FormModal';
import '../../styles/design-system.scss';

interface DemoData {
    id: string;
    name: string;
    status: string;
    createdAt: string;
}

const DemoPage: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const columns: ProColumns<DemoData>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            valueEnum: {
                active: { text: 'Active', status: 'Success' },
                inactive: { text: 'Inactive', status: 'Error' },
            },
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            valueType: 'dateTime',
        },
    ];

    const mockRequest = async (_params: any) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const data: DemoData[] = Array.from({ length: 20 }).map((_, i) => ({
            id: `ID-${i + 1}`,
            name: `User ${i + 1}`,
            status: i % 2 === 0 ? 'active' : 'inactive',
            createdAt: new Date().toISOString(),
        }));
        return {
            data,
            success: true,
            total: 20,
        };
    };

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-2xl font-bold text-gray-800">Design System Demo</h1>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Typography & Colors</h2>
                <div className="grid grid-cols-4 gap-4">
                    <div className="p-4 bg-primary text-white rounded">Primary Color</div>
                    <div className="p-4 bg-secondary text-white rounded">Secondary Color</div>
                    <div className="p-4 bg-success text-white rounded">Success Color</div>
                    <div className="p-4 bg-warning text-white rounded">Warning Color</div>
                    <div className="p-4 bg-error text-white rounded">Error Color</div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Buttons</h2>
                <div className="flex gap-4">
                    <button className="btn btn-primary">Primary Button</button>
                    <button className="btn btn-secondary">Secondary Button</button>
                    <button className="btn btn-outline">Outline Button</button>
                    <button className="btn btn-ghost">Ghost Button</button>
                    <button className="btn btn-primary" disabled>Disabled</button>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Cards</h2>
                <div className="card p-6">
                    <h3 className="card-header">Card Title</h3>
                    <div className="card-body">
                        This is a card component using the design system styles.
                    </div>
                    <div className="card-footer">
                        Card Footer
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Form Modal</h2>
                <button className="btn btn-primary" onClick={() => setIsModalVisible(true)}>
                    Open Modal
                </button>
                <FormModal
                    visible={isModalVisible}
                    title="Demo Modal"
                    onClose={() => setIsModalVisible(false)}
                    onOk={() => {
                        alert('OK Clicked');
                        setIsModalVisible(false);
                    }}
                >
                    <div className="space-y-4">
                        <p>This is a demonstration of the FormModal component.</p>
                        <div className="form-group">
                            <label className="form-label">Sample Input</label>
                            <input type="text" className="form-input" placeholder="Type something..." />
                        </div>
                    </div>
                </FormModal>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Data Table</h2>
                <DataTable<DemoData>
                    columns={columns}
                    request={mockRequest}
                    rowKey="id"
                    toolbar={{
                        title: 'User List',
                        actions: [
                            <button key="add" className="btn btn-primary">Add User</button>
                        ],
                    }}
                />
            </section>
        </div>
    );
};

export default DemoPage;
