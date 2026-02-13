import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { useTranslation } from '@/shared/hooks/useTranslation';
import type { Enquiry } from '../types';
import {
    fetchEnquiries, createEnquiry, setDepartmentFilter,
    setPage, setPageSize, setSearchText, setStatusFilter, clearErrors, resetFilters
} from '../slices/EnquiriesSlice';
import useDebounce from '@/shared/hooks/useDebouncing';
import { LegalOpinionsPagination } from '../components';
import {
    LegalOpinionsPageHeader,
    LegalOpinionsPageFilters,
    EnquiryListCard,
    AddEnquiryModal,
    ReturnToTopButton,
    LegalOpinionsContentHeader,
    LegalOpinionsEmptyState,
} from '../components/LegalOpinions';
import toast from 'react-hot-toast';

interface LegalOpinionsPageProps {
    onBack: () => void;
    onOpinionSelect?: (enquiry: Enquiry) => void;
}

export function LegalOpinions({ onBack, onOpinionSelect }: LegalOpinionsPageProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { t, isRTL, language } = useTranslation();
    const isArabic = language === 'ar';

    const departments = useSelector((state: RootState) => state.legislationSlice.departments.items);
    const { items, loading, error, pagination } = useSelector((state: RootState) => state.enquiries.enquiries);
    const filters = useSelector((state: RootState) => state.enquiries.enquiryFilters);
    const { createLoading, error: createError } = useSelector((state: RootState) => state.enquiries.enquiryActions);
    const debounce = useDebounce();

    const currentUser = { role: 'user' as 'user' | 'admin', departmentId: 1 };

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [showReturnButton, setShowReturnButton] = useState(false);


    useEffect(() => {
        dispatch(setPageSize(10));
    }, []);

    useEffect(() => {
        dispatch(fetchEnquiries({}));
    }, [dispatch, filters.searchText, filters.departmentId, filters.status, pagination.pageNumber, pagination.pageSize]);

    useEffect(() => {
        const handleScroll = () => setShowReturnButton(window.scrollY > 150);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const statusCounts = useMemo(() => {
        const counts = { 1: 0, 2: 0, 3: 0 };
        items.forEach((e) => {
            if (e.status in counts) counts[e.status as keyof typeof counts]++;
        });
        return counts;
    }, [items]);

    const getDepartmentName = (deptId: number) => {
        const dept = departments.find((d: { id: number; }) => d.id === deptId);
        return dept ? (isArabic ? dept.departmentNameAr : dept.departmentNameEn) : '';
    };

    const handleSearchSubmit = (query: string) => {
        debounce(() => {
            dispatch(setSearchText(query));
        }, 500);
    };

    const handleAddEnquiry = async (title: string, description: string) => {
        try {
            await dispatch(createEnquiry({ title, description })).unwrap();
            setIsAddModalOpen(false);
            toast.success(t('legalOpinions.successAdded'), { duration: 3000 });
        } catch {
            toast.error(t('legalOpinions.errorAdding'), { duration: 3000 });
        }
    };

    const handleOpenAddModal = () => {
        dispatch(clearErrors());
        setIsAddModalOpen(true);
    };

    const handleClearFilters = () => {
        dispatch(setSearchText(''));
        dispatch(setDepartmentFilter(''));
        dispatch(setStatusFilter(''));
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'rgb(250, 250, 248)' }} dir={isRTL ? 'rtl' : 'ltr'}>
            <ReturnToTopButton visible={showReturnButton} onClick={scrollToTop} />

            <AddEnquiryModal
                isOpen={isAddModalOpen}
                departmentName={getDepartmentName(currentUser.departmentId)}
                isLoading={createLoading}
                error={createError}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddEnquiry}
            />

            <LegalOpinionsPageHeader onBack={onBack} />

            <LegalOpinionsPageFilters
                filters={filters}
                departments={departments}
                userRole={currentUser.role}
                statusCounts={statusCounts}
                onSearchSubmit={handleSearchSubmit}
                onStatusChange={(status) => dispatch(setStatusFilter(status))}
                onDepartmentChange={(deptId) => dispatch(setDepartmentFilter(deptId))}
                onClearSearch={() => dispatch(setSearchText(''))}
                onClearStatus={() => dispatch(setStatusFilter(''))}
                onClearDepartment={() => dispatch(setDepartmentFilter(''))}
                onClearAll={handleClearFilters}
            />

            <div className="max-w-[1800px] mx-auto px-8 py-6">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12">
                        <LegalOpinionsContentHeader
                            totalCount={pagination.totalCount}
                            userRole={currentUser.role}
                            onAddEnquiry={handleOpenAddModal}
                        />

                        {loading && (
                            <div className="py-8 text-center text-sm text-gray-600">{t('common.loading')}</div>
                        )}

                        {error && !loading && (
                            <div className="py-8 text-center text-sm text-red-600">{error}</div>
                        )}

                        {!loading && !error && items.length > 0 && (
                            <>
                                <div className="space-y-4 pb-6">
                                    {items.map((enquiry) => (
                                        <EnquiryListCard
                                            key={enquiry.id}
                                            enquiry={enquiry}
                                            onSelect={(e) => onOpinionSelect?.(e)}
                                        />
                                    ))}
                                </div>

                                {pagination.totalPages > 1 && (
                                    <LegalOpinionsPagination
                                        totalCount={pagination.totalCount}
                                        pageNumber={pagination.pageNumber}
                                        totalPages={pagination.totalPages}
                                        hasNextPage={pagination.hasNextPage}
                                        hasPreviousPage={pagination.hasPreviousPage}
                                        onPageChange={(page) => dispatch(setPage(page))}
                                    />
                                )}
                            </>
                        )}

                        {!loading && !error && items.length === 0 && <LegalOpinionsEmptyState />}
                    </div>
                </div>
            </div>
        </div>
    );
}
