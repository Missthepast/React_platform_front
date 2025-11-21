import React from 'react';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import './DataTable.scss';

export interface DataTableProps<T extends Record<string, any>> {
    columns: ProColumns<T>[];
    request: (params: any) => Promise<{
        data: T[];
        success: boolean;
        total: number;
    }>;
    rowKey: string | ((record: T) => string);
    onRow?: (record: T) => any;
    toolbar?: {
        title?: React.ReactNode;
        actions?: React.ReactNode[];
    };
    scroll?: {
        x?: number;
        y?: number;
    };
}

export function DataTable<T extends Record<string, any>>({
    columns,
    request,
    rowKey,
    onRow,
    toolbar,
    scroll = { x: 1200 },
}: DataTableProps<T>) {
    return (
        <ProTable<T>
            className="common-data-table"
            columns={columns}
            request={request}
            rowKey={rowKey}
            search={false}
            options={false}
            toolbar={{
                title: toolbar?.title,
                actions: toolbar?.actions,
            }}
            pagination={{
                defaultPageSize: 25,
                pageSizeOptions: ['25', '50', '100', '200'],
                showSizeChanger: true,
                showQuickJumper: true,
            }}
            scroll={scroll}
            onRow={onRow}
        />
    );
}
