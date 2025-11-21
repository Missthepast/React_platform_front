import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.scss';

interface DatePickerProps {
  label?: string;
  required?: boolean;
  value?: string; // Format: YYYY-MM-DD
  onChange: (date: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

/**
 * DatePicker 组件
 * 基于 react-datepicker 库，使用设计系统样式
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  required = false,
  value,
  onChange,
  placeholder = 'yyyy-mm-dd',
  disabled = false,
  minDate,
  maxDate,
}) => {
  // Convert YYYY-MM-DD string to Date object
  const parseValue = (dateString?: string): Date | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  // Convert Date object to YYYY-MM-DD string
  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const selectedDate = parseValue(value);

  const handleChange = (date: Date | null) => {
    onChange(formatDate(date));
  };

  return (
    <div className="form-group">
      {label && (
        <label>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <ReactDatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="yyyy-MM-dd"
        placeholderText={placeholder}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        className="form-input"
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        todayButton="Today"
      />
    </div>
  );
};

export default DatePicker;
