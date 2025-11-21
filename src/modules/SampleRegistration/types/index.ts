export interface Sample {
  id: string;
  pid: string;
  type: string;
  colDate: string;
  regDate: string;
  inst: string;
  status: 'Submitted' | 'Draft';
  doctor: string;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: keyof Sample;
  direction: SortDirection;
}

export interface ModalState {
  type: 'details' | 'edit' | 'delete' | null;
  data: Sample | null;
}
