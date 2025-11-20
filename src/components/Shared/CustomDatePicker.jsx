import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const CustomDatePicker = ({ label, required, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState('days'); // 'days', 'months', 'years'
    const [popoverPosition, setPopoverPosition] = useState('bottom'); // 'top' or 'bottom'
    const wrapperRef = useRef(null);

    // --- 智能定位与点击外部关闭 ---
    useEffect(() => {
        if (isOpen && wrapperRef.current) {
            // 检测剩余空间，决定向上还是向下弹出
            const rect = wrapperRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const spaceBelow = viewportHeight - rect.bottom;
            const spaceNeeded = 340; // 日历大概高度

            if (spaceBelow < spaceNeeded) {
                setPopoverPosition('top');
            } else {
                setPopoverPosition('bottom');
            }
        }

        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
                setViewMode('days');
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            // 如果窗口大小改变，也重新计算位置（可选）
            window.addEventListener("resize", () => setIsOpen(false));
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("resize", () => setIsOpen(false));
        };
    }, [isOpen]);

    // 同步 Value
    useEffect(() => {
        if (value) {
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
                setCurrentDate(date);
            }
        }
    }, [value]);

    // --- 日期逻辑 ---
    const now = new Date();
    const todayYear = now.getFullYear();
    const todayMonth = now.getMonth();
    const todayDay = now.getDate();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
    const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const prevMonthDays = getDaysInMonth(year, month - 1);

    const daysArray = [];
    for (let i = firstDay; i > 0; i--) daysArray.push({ day: prevMonthDays - i + 1, type: 'prev' });
    for (let i = 1; i <= daysInMonth; i++) daysArray.push({ day: i, type: 'current' });
    const remainingDays = 42 - daysArray.length;
    for (let i = 1; i <= remainingDays; i++) daysArray.push({ day: i, type: 'next' });

    // --- 事件处理 ---
    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const handleDateSelect = (date) => {
        setCurrentDate(date);
        onChange(formatDate(date));
        setIsOpen(false);
    };

    const handleTodayClick = () => {
        const today = new Date();
        setCurrentDate(today);
        onChange(formatDate(today));
        setIsOpen(false);
    };

    const handleDateClick = (dayObj) => {
        let selectedDate;
        if (dayObj.type === 'prev') selectedDate = new Date(year, month - 1, dayObj.day);
        else if (dayObj.type === 'next') selectedDate = new Date(year, month + 1, dayObj.day);
        else selectedDate = new Date(year, month, dayObj.day);
        handleDateSelect(selectedDate);
    };

    // 是否是今天
    const isToday = (dayObj) => {
        if (dayObj.type !== 'current') return false;
        return year === todayYear && month === todayMonth && dayObj.day === todayDay;
    };

    const isSelected = (dayObj) => {
        if (!value || !dayObj) return false;
        const [vY, vM, vD] = value.split('-').map(Number);
        let targetYear = year, targetMonth = month;
        if (dayObj.type === 'prev') { targetMonth = month - 1; if (targetMonth < 0) { targetMonth = 11; targetYear--; } }
        else if (dayObj.type === 'next') { targetMonth = month + 1; if (targetMonth > 11) { targetMonth = 0; targetYear++; } }
        return vY === targetYear && vM === targetMonth + 1 && vD === dayObj.day;
    };

    const handleNav = (action) => {
        const newDate = new Date(currentDate);
        if (action === 'prevYear') newDate.setFullYear(year - 1);
        if (action === 'nextYear') newDate.setFullYear(year + 1);
        if (action === 'prevMonth') newDate.setMonth(month - 1);
        if (action === 'nextMonth') newDate.setMonth(month + 1);
        if (action === 'prevDecade') newDate.setFullYear(year - 10);
        if (action === 'nextDecade') newDate.setFullYear(year + 10);
        setCurrentDate(newDate);
    };

    // --- 样式 ---
    const styles = {
        container: { position: 'relative', width: '100%' },
        label: { display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '6px', color: '#333' },
        required: { color: 'red', marginLeft: '4px' },
        inputWrapper: { display: 'flex', alignItems: 'center', position: 'relative', cursor: 'pointer' },
        input: {
            width: '100%', padding: '10px 12px 10px 36px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px',
            outline: 'none', cursor: 'pointer', background: 'white'
        },
        icon: { position: 'absolute', left: '10px', color: '#666' },
        popup: {
            position: 'absolute', left: 0, width: '280px',
            background: 'white', border: '1px solid #eee', borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)', zIndex: 1000, padding: '16px',
            // 动态位置样式
            ...(popoverPosition === 'bottom' ? { top: '100%', marginTop: '8px' } : { bottom: '100%', marginBottom: '8px' })
        },
        header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontWeight: 'bold', color: '#333' },
        navBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' },
        headerText: { cursor: 'pointer', padding: '4px 8px', borderRadius: '4px' },
        grid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' },
        weekDay: { fontSize: '12px', color: '#999', marginBottom: '8px', fontWeight: 500 },
        dayCell: {
            height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', borderRadius: '50%', cursor: 'pointer', transition: '0.2s', userSelect: 'none', border: '1px solid transparent' // 防止边框跳动
        },
        // 样式状态
        selectedDay: { backgroundColor: '#00897B', color: 'white', fontWeight: 'bold' },
        todayDay: { border: '1px solid #00897B', color: '#00897B', fontWeight: 'bold' }, // 今天但未被选中
        dimmedDay: { color: '#B0BEC5' },
        hoverColor: '#E0F2F1',

        // 底部按钮区
        footer: { marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f0f0f0', textAlign: 'center' },
        todayBtn: { background: 'none', border: 'none', color: '#00897B', fontSize: '13px', fontWeight: 600, cursor: 'pointer' },

        // Month/Year 视图
        monthYearGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', textAlign: 'center' },
        monthYearCell: { padding: '10px 0', borderRadius: '4px', cursor: 'pointer', fontWeight: 500, fontSize: '13px' }
    };

    const startYear = Math.floor(year / 10) * 10;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i - 1);
    const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('en-US', { month: 'short' }));

    return (
        <div style={styles.container} ref={wrapperRef}>
            {label && <label style={styles.label}>{label} {required && <span style={styles.required}>*</span>}</label>}

            <div style={styles.inputWrapper} onClick={() => setIsOpen(!isOpen)}>
                <Calendar size={18} style={styles.icon} />
                <input readOnly type="text" style={styles.input} value={value || ''} placeholder={placeholder || 'yyyy-mm-dd'} />
            </div>

            {isOpen && (
                <div style={styles.popup}>
                    {/* Header */}
                    <div style={styles.header}>
                        {viewMode === 'days' ? (
                            <>
                                <button style={styles.navBtn} onClick={() => handleNav('prevYear')}><ChevronsLeft size={16} /></button>
                                <button style={styles.navBtn} onClick={() => handleNav('prevMonth')}><ChevronLeft size={20} /></button>
                                <span style={{ display: 'flex', gap: '4px' }}>
                                    <span style={styles.headerText} onClick={() => setViewMode('years')}>{year}</span>
                                    <span style={styles.headerText} onClick={() => setViewMode('months')}>{currentDate.toLocaleString('en-US', { month: 'long' })}</span>
                                </span>
                                <button style={styles.navBtn} onClick={() => handleNav('nextMonth')}><ChevronRight size={20} /></button>
                                <button style={styles.navBtn} onClick={() => handleNav('nextYear')}><ChevronsRight size={16} /></button>
                            </>
                        ) : (
                            <>
                                <button style={styles.navBtn} onClick={() => handleNav(viewMode === 'months' ? 'prevYear' : 'prevDecade')}><ChevronsLeft size={16} /></button>
                                <span style={styles.headerText} onClick={() => viewMode === 'months' && setViewMode('years')}>
                                    {viewMode === 'months' ? year : `${startYear} - ${startYear + 9}`}
                                </span>
                                <button style={styles.navBtn} onClick={() => handleNav(viewMode === 'months' ? 'nextYear' : 'nextDecade')}><ChevronsRight size={16} /></button>
                            </>
                        )}
                    </div>

                    {/* Body */}
                    {viewMode === 'days' && (
                        <>
                            <div style={styles.grid}>
                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} style={styles.weekDay}>{d}</div>)}
                                {daysArray.map((dayObj, idx) => {
                                    const selected = isSelected(dayObj);
                                    const today = isToday(dayObj);
                                    const dimmed = dayObj.type !== 'current';
                                    return (
                                        <div key={idx}
                                            onClick={() => handleDateClick(dayObj)}
                                            style={{
                                                ...styles.dayCell,
                                                ...(selected ? styles.selectedDay : (today ? styles.todayDay : {})),
                                                ...(dimmed ? styles.dimmedDay : {})
                                            }}
                                            onMouseEnter={e => !selected && (e.currentTarget.style.backgroundColor = styles.hoverColor)}
                                            onMouseLeave={e => !selected && (e.currentTarget.style.backgroundColor = 'transparent')}
                                        >
                                            {dayObj.day}
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Footer: Today Button */}
                            <div style={styles.footer}>
                                <button style={styles.todayBtn} onClick={handleTodayClick}>Today</button>
                            </div>
                        </>
                    )}

                    {viewMode === 'months' && (
                        <div style={styles.monthYearGrid}>
                            {months.map((m, idx) => (
                                <div key={m} style={{ ...styles.monthYearCell, ...(idx === month && styles.selectedDay) }}
                                    onClick={() => { setCurrentDate(new Date(year, idx, 1)); setViewMode('days'); }}
                                    onMouseEnter={e => idx !== month && (e.currentTarget.style.backgroundColor = styles.hoverColor)}
                                    onMouseLeave={e => idx !== month && (e.currentTarget.style.backgroundColor = 'transparent')}
                                >
                                    {m}
                                </div>
                            ))}
                        </div>
                    )}

                    {viewMode === 'years' && (
                        <div style={styles.monthYearGrid}>
                            {years.map((y) => (
                                <div key={y} style={{ ...styles.monthYearCell, ...(y === year && styles.selectedDay) }}
                                    onClick={() => { setCurrentDate(new Date(y, month, 1)); setViewMode('months'); }}
                                    onMouseEnter={e => y !== year && (e.currentTarget.style.backgroundColor = styles.hoverColor)}
                                    onMouseLeave={e => y !== year && (e.currentTarget.style.backgroundColor = 'transparent')}
                                >
                                    {y}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomDatePicker;