import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useSampleData, generateMockData } from './useSampleData';

describe('useSampleData', () => {
    describe('generateMockData', () => {
        it('should generate 35 sample records', () => {
            const data = generateMockData();
            expect(data).toHaveLength(35);
        });

        it('should generate samples with correct structure', () => {
            const data = generateMockData();
            const sample = data[0];

            expect(sample).toHaveProperty('id');
            expect(sample).toHaveProperty('pid');
            expect(sample).toHaveProperty('type');
            expect(sample).toHaveProperty('colDate');
            expect(sample).toHaveProperty('regDate');
            expect(sample).toHaveProperty('inst');
            expect(sample).toHaveProperty('status');
            expect(sample).toHaveProperty('doctor');
        });

        it('should generate samples with valid status values', () => {
            const data = generateMockData();
            data.forEach(sample => {
                expect(['Submitted', 'Draft']).toContain(sample.status);
            });
        });

        it('should generate samples with valid types', () => {
            const data = generateMockData();
            data.forEach(sample => {
                expect(['Blood', 'Saliva', 'Tissue']).toContain(sample.type);
            });
        });
    });

    describe('useSampleData hook', () => {
        it('should initialize with mock data', () => {
            const { result } = renderHook(() => useSampleData());
            expect(result.current.samples).toHaveLength(35);
        });

        it('should add a new sample', () => {
            const { result } = renderHook(() => useSampleData());
            const newSample = {
                id: 'SMP-2024-999',
                pid: 'PT-999',
                type: 'Blood',
                colDate: '2024-11-21',
                regDate: '2024-11-21',
                inst: 'Test Hospital',
                status: 'Draft' as const,
                doctor: 'Dr. Test',
            };

            act(() => {
                result.current.addSample(newSample);
            });

            expect(result.current.samples).toHaveLength(36);
            expect(result.current.samples[0]).toEqual(newSample);
        });

        it('should update an existing sample', () => {
            const { result } = renderHook(() => useSampleData());
            const firstSample = result.current.samples[0];
            const updatedSample = { ...firstSample, status: 'Submitted' as const };

            act(() => {
                result.current.updateSample(updatedSample);
            });

            const updated = result.current.samples.find(s => s.id === firstSample.id);
            expect(updated?.status).toBe('Submitted');
        });

        it('should delete a sample', () => {
            const { result } = renderHook(() => useSampleData());
            const initialLength = result.current.samples.length;
            const firstSampleId = result.current.samples[0].id;

            act(() => {
                result.current.deleteSample(firstSampleId);
            });

            expect(result.current.samples).toHaveLength(initialLength - 1);
            expect(result.current.samples.find(s => s.id === firstSampleId)).toBeUndefined();
        });

        it('should set samples directly', () => {
            const { result } = renderHook(() => useSampleData());
            const newSamples = [
                {
                    id: 'SMP-TEST-001',
                    pid: 'PT-TEST-001',
                    type: 'Blood',
                    colDate: '2024-11-21',
                    regDate: '2024-11-21',
                    inst: 'Test Hospital',
                    status: 'Draft' as const,
                    doctor: 'Dr. Test',
                },
            ];

            act(() => {
                result.current.setSamples(newSamples);
            });

            expect(result.current.samples).toHaveLength(1);
            expect(result.current.samples[0].id).toBe('SMP-TEST-001');
        });
    });
});
