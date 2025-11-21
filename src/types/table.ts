import { ReactNode } from 'react';

/**
 * 表格列定义
 */
export interface TableColumn<T = any> {
    key: string;
    title: string;
    dataIndex?: keyof T | string[];
    width?: number | string;
    align?: 'left' | 'center' | 'right';
    sorter?: boolean | ((a: T, b: T) => number);
    render?: (value: any, record: T, index: number) => ReactNode;
    fixed?: 'left' | 'right';
    ellipsis?: boolean;
}

/**
 * 表格排序配置
 */
export interface TableSortConfig {
    field: string;
    order: 'asc' | 'desc';
}

/**
 * 表格Props
 */
export interface DataTableProps<T = any> {
    columns: TableColumn<T>[];
    dataSource: T[];
    loading?: boolean;
    rowKey: string | ((record: T) => string);
    pagination?: {
        current: number;
        pageSize: number;
        total: number;
        onChange: (page: number, pageSize: number) => void;
    };
    onRow?: (record: T) => {
        onClick?: () => void;
        onDoubleClick?: () => void;
        className?: string;
    };
    scroll?: {
        x?: number | string;
        y?: number | string;
    };
}
