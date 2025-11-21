/**
 * 样本状态
 */
export type SampleStatus = 'Draft' | 'Submitted' | 'Processing' | 'Completed' | 'Rejected';

/**
 * 样本类型
 */
export type SampleType = 'Blood' | 'Saliva' | 'Tissue' | 'Other';

/**
 * 样本数据
 */
export interface Sample {
    id: string;                    // 样本ID
    pid: string;                   // 患者ID
    type: SampleType;              // 样本类型
    colDate: string;               // 采集日期 (YYYY-MM-DD)
    regDate: string;               // 登记日期 (YYYY-MM-DD)
    inst: string;                  // 机构名称
    status: SampleStatus;          // 样本状态
    doctor: string;                // 医生姓名
    notes?: string;                 // 备注
    createdBy?: string;            // 创建人
    updatedBy?: string;            // 更新人
    createdAt?: string;            // 创建时间
    updatedAt?: string;            // 更新时间
}

/**
 * 样本筛选参数
 */
export interface SampleFilterParams {
    status?: SampleStatus;
    type?: SampleType;
    regDateFrom?: string;
    regDateTo?: string;
    keyword?: string;              // 搜索关键词
}

/**
 * 样本表单数据
 */
export interface SampleFormData {
    pid: string;
    type: SampleType;
    colDate: string;
    doctor: string;
    inst: string;
    notes?: string;
}
