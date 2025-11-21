import React, { memo } from 'react';
import { Eye, Edit, Trash2, ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';
import { Sample, SortConfig } from '../../types';

interface SampleTableProps {
  data: Sample[];
  sortConfig: SortConfig;
  onSort: (key: keyof Sample) => void;
  selectedRowId: string | null;
  onRowClick: (id: string) => void;
  onDetails: (item: Sample) => void;
  onEdit: (item: Sample) => void;
  onDelete: (item: Sample) => void;
}

const getStatusBadge = (status: string) => {
  const className = `status-badge status-badge--${status.toLowerCase()}`;
  return <span className={className}>{status}</span>;
};

const SortableHeader = memo(
  ({
    label,
    field,
    width,
    sortConfig,
    onSort,
  }: {
    label: string;
    field: keyof Sample;
    width?: string;
    sortConfig: SortConfig;
    onSort: (key: keyof Sample) => void;
  }) => {
    const isSorted = sortConfig.key === field;
    return (
      <th onClick={() => onSort(field)} style={{ cursor: 'pointer', width: width }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {label}
          {isSorted ? (
            sortConfig.direction === 'asc' ? (
              <ChevronUp size={15} color="#00897B" strokeWidth={3} />
            ) : (
              <ChevronDown size={15} color="#00897B" strokeWidth={3} />
            )
          ) : (
            <ArrowUpDown size={14} color="#999" />
          )}
        </div>
      </th>
    );
  }
);

const SampleTable: React.FC<SampleTableProps> = ({
  data,
  sortConfig,
  onSort,
  selectedRowId,
  onRowClick,
  onDetails,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="sample-registration__table-container">
      <table className="sample-registration__table">
        <thead>
          <tr>
            <th style={{ width: '120px' }}>Actions</th>
            <SortableHeader label="Sample ID" field="id" sortConfig={sortConfig} onSort={onSort} />
            <SortableHeader
              label="Patient ID"
              field="pid"
              sortConfig={sortConfig}
              onSort={onSort}
            />
            <th>Sample Type</th>
            <SortableHeader
              label="Collection Date"
              field="colDate"
              sortConfig={sortConfig}
              onSort={onSort}
            />
            <SortableHeader
              label="Registration Date"
              field="regDate"
              sortConfig={sortConfig}
              onSort={onSort}
            />
            <th>Institution</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr
              key={row.id}
              onClick={() => onRowClick(row.id)}
              className={selectedRowId === row.id ? 'selected' : ''}
            >
              <td>
                <div className="sample-registration__action-icons">
                  <Eye
                    size={18}
                    onClick={e => {
                      e.stopPropagation();
                      onDetails(row);
                    }}
                  />
                  <Edit
                    size={18}
                    onClick={e => {
                      e.stopPropagation();
                      onEdit(row);
                    }}
                  />
                  <Trash2
                    size={18}
                    color="#D32F2F"
                    onClick={e => {
                      e.stopPropagation();
                      onDelete(row);
                    }}
                  />
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
  );
};

export default SampleTable;
