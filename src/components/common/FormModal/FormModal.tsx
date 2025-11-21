import React from 'react';
import { X } from 'lucide-react';
import './FormModal.scss';

export interface FormModalProps {
    visible: boolean;
    title: string;
    width?: number;
    onClose: () => void;
    onOk?: () => void;
    onCancel?: () => void;
    okText?: string;
    cancelText?: string;
    children: React.ReactNode;
    footer?: React.ReactNode | null;
    loading?: boolean;
}

export const FormModal: React.FC<FormModalProps> = ({
    visible,
    title,
    width = 600,
    onClose,
    onOk,
    onCancel,
    okText = 'OK',
    cancelText = 'Cancel',
    children,
    footer,
    loading = false,
}) => {
    if (!visible) return null;

    const handleOk = () => {
        onOk?.();
    };

    const handleCancel = () => {
        onCancel?.();
        onClose();
    };

    const defaultFooter = (
        <div className="modal-footer">
            <button className="btn btn-outline" onClick={handleCancel} disabled={loading}>
                {cancelText}
            </button>
            <button className="btn btn-primary" onClick={handleOk} disabled={loading}>
                {loading ? 'Loading...' : okText}
            </button>
        </div>
    );

    return (
        <div className="modal-overlay" onClick={handleCancel}>
            <div
                className="modal-card"
                style={{ width }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="modal-close" onClick={handleCancel}>
                        <X size={20} />
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                {footer !== null && (footer || defaultFooter)}
            </div>
        </div>
    );
};
