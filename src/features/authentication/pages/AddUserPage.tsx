import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle, UserPlus } from 'lucide-react';
import type { AppDispatch, RootState } from '@/store';
import { addUser, resetAddUser, fetchRoles, fetchJobTitles } from '../slices/authSlice';
import { fetchDepartments } from '@/features/Legislation/slices/legislationSlice';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { useAppSelector } from '@/store/hooks';
import { addUserSchema, type AddUserFormData } from '../schemas';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { LegislationHero } from '@/features/Legislation/components/LegislationHero/LegislationHero';
import { FetchingSelect } from '@/shared/components/Select/FetchingSelect';
import { zodResolver } from '@hookform/resolvers/zod';

const initialForm: AddUserFormData = {
    userLogin: '',
    userNameEn: '',
    userNameAr: '',
    emailId: '',
    fkDeptId: 0,
    fkJobTitle: 0,
    roleId: 0,
};

export const AddUserPage = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { isLoading, error, success } = useAppSelector(
        (state: RootState) => state.auth.addUser
    );
    const {
        roles, rolesLoading, rolesError,
        jobTitles, jobTitlesLoading, jobTitlesError,
    } = useAppSelector((state: RootState) => state.auth.lookups);

    const { departments } = useAppSelector(state => state.legislationSlice);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(addUserSchema),
        defaultValues: initialForm,
        mode: 'onChange'
    });

    useEffect(() => {
        dispatch(resetAddUser());
        dispatch(fetchRoles());
        dispatch(fetchJobTitles());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                dispatch(resetAddUser());
                navigate(-1);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [success, dispatch, navigate]);

    const onSubmit = (data: AddUserFormData) => {
        dispatch(addUser(data as any));
    };

    const handleRetryRoles = () => dispatch(fetchRoles());
    const handleRetryJobTitles = () => dispatch(fetchJobTitles());
    const handleRetryDepartments = () => dispatch(fetchDepartments());

    return (
        <div className="bg-gray-50">
            <LegislationHero
                mode="add-user"
                onBack={() => navigate(-1)}
            />

            <div className={`px-20 pt-10 pb-8 space-y-8 ${isRtl ? 'rtl' : 'ltr'}`}>
                {/* Success Banner */}
                {success && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                        <CheckCircle size={16} />
                        {t('addUser.success')}
                    </div>
                )}

                {/* Error Banner */}
                {error && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* User Login */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700" htmlFor="userLogin">
                            {t('addUser.userLogin')} <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="userLogin"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="userLogin"
                                    placeholder={t('addUser.placeholders.userLogin')}
                                    className={errors.userLogin ? 'border-red-500' : ''}
                                />
                            )}
                        />
                        {errors.userLogin && (
                            <p className="text-xs text-red-500">
                                {t(errors.userLogin.message as string)}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Name EN */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700" htmlFor="userNameEn">
                                {t('addUser.userNameEn')} <span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="userNameEn"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        id="userNameEn"
                                        placeholder={t('addUser.placeholders.userNameEn')}
                                        className={errors.userNameEn ? 'border-red-500' : ''}
                                    />
                                )}
                            />
                            {errors.userNameEn && (
                                <p className="text-xs text-red-500">
                                    {t(errors.userNameEn.message as string)}
                                </p>
                            )}
                        </div>

                        {/* Name AR */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700" htmlFor="userNameAr">
                                {t('addUser.userNameAr')} <span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="userNameAr"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        id="userNameAr"
                                        placeholder={t('addUser.placeholders.userNameAr')}
                                        dir="rtl"
                                        className={errors.userNameAr ? 'border-red-500' : ''}
                                    />
                                )}
                            />
                            {errors.userNameAr && (
                                <p className="text-xs text-red-500">
                                    {t(errors.userNameAr.message as string)}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700" htmlFor="emailId">
                            {t('addUser.email')} <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="emailId"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="emailId"
                                    type="email"
                                    placeholder={t('addUser.placeholders.email')}
                                    className={errors.emailId ? 'border-red-500' : ''}
                                />
                            )}
                        />
                        {errors.emailId && (
                            <p className="text-xs text-red-500">
                                {t(errors.emailId.message as string)}
                            </p>
                        )}
                    </div>

                    {/* Department */}
                    <div className="space-y-1.5">
                        <Controller
                            name="fkDeptId"
                            control={control}
                            render={({ field }) => (
                                <FetchingSelect
                                    id="fkDeptId"
                                    label={t('addUser.department')}
                                    value={field.value}
                                    onChange={(val) => field.onChange(val)}
                                    isLoading={departments.loading}
                                    error={departments.error}
                                    onRetry={handleRetryDepartments}
                                    placeholder={t('addUser.placeholders.department')}
                                    required
                                >
                                    {departments.items.map((dept) => (
                                        <option key={dept.id} value={dept.id}>
                                            {isRtl ? dept.departmentNameAr : dept.departmentNameEn}
                                        </option>
                                    ))}
                                </FetchingSelect>
                            )}
                        />
                        {errors.fkDeptId && (
                            <p className="text-xs text-red-500">
                                {t(errors.fkDeptId.message as string)}
                            </p>
                        )}
                    </div>

                    {/* Lookup dropdowns row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Controller
                                name="fkJobTitle"
                                control={control}
                                render={({ field }) => (
                                    <FetchingSelect
                                        id="fkJobTitle"
                                        label={t('addUser.jobTitle')}
                                        value={field.value}
                                        onChange={(val) => field.onChange(val)}
                                        isLoading={jobTitlesLoading}
                                        error={jobTitlesError}
                                        onRetry={handleRetryJobTitles}
                                        required
                                        placeholder={t('addUser.placeholders.jobTitle')}
                                    >
                                        {jobTitles.map((jt) => (
                                            <option key={jt.id} value={jt.id}>
                                                {isRtl ? jt.titleAr : jt.titleEn}
                                            </option>
                                        ))}
                                    </FetchingSelect>
                                )}
                            />
                            {errors.fkJobTitle && (
                                <p className="text-xs text-red-500">
                                    {t(errors.fkJobTitle.message as string)}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Controller
                                name="roleId"
                                control={control}
                                render={({ field }) => (
                                    <FetchingSelect
                                        id="roleId"
                                        label={t('addUser.role')}
                                        value={field.value}
                                        onChange={(val) => field.onChange(val)}
                                        isLoading={rolesLoading}
                                        required
                                        error={rolesError}
                                        onRetry={handleRetryRoles}
                                        placeholder={t('addUser.placeholders.role')}
                                    >
                                        {roles.map((r) => (
                                            <option key={r.id} value={r.id}>
                                                {isRtl ? r.roleNameAr : r.roleNameEn}
                                            </option>
                                        ))}
                                    </FetchingSelect>
                                )}
                            />
                            {errors.roleId && (
                                <p className="text-xs text-red-500">
                                    {t(errors.roleId.message as string)}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                        <Button
                            type="submit"
                            disabled={isLoading || success || rolesLoading || jobTitlesLoading || departments.loading}
                            className="flex-1"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    {t('addUser.creating')}
                                </>
                            ) : (
                                <>
                                    <UserPlus size={16} />
                                    {t('addUser.submit')}
                                </>
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate(-1)}
                            disabled={isLoading}
                        >
                            {t('addUser.cancel')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserPage;
