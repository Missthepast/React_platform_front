/**
 * 通用 API 响应格式
 */
export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    error?: {
        code: string;
        message: string;
        details?: any;
    };
}

/**
 * 分页请求参数
 */
export interface PaginationParams {
    page: number;
    pageSize: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

/**
 * 分页响应数据
 */
export interface PaginationResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

/**
 * 用户角色
 */
export type UserRole = 'admin' | 'doctor' | 'lab_tech' | 'researcher';

/**
 * 用户信息
 */
export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    department?: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * 表单字段状态
 */
export interface FormField<T = any> {
    value: T;
    error?: string;
    touched: boolean;
    dirty: boolean;
}

/**
 * 表单状态
 */
export interface FormState<T extends Record<string, any>> {
    values: T;
    errors: Partial<Record<keyof T, string>>;
    touched: Partial<Record<keyof T, boolean>>;
    isSubmitting: boolean;
    isValid: boolean;
}
