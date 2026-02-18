import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle, UserPlus, ChevronDown } from 'lucide-react';
import type { AppDispatch, RootState } from '@/store';
import { addUser, resetAddUser, fetchRoles, fetchJobTitles } from '../slices/authSlice';
import type { CreateUserRequest } from '../types';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { LegislationHero } from '@/features/Legislation/components/LegislationHero/LegislationHero';

const initialForm: CreateUserRequest = {
    userLogin: '',
    userNameEn: '',
    userNameAr: '',
    emailId: '',
    fkDeptId: 0,
    fkJobTitle: 0,
    roleId: 0,
};

// ─── Reusable select wrapper ────────────────────────────────────────────────
interface SelectFieldProps {
    id: string;
    label: string;
    value: number;
    onChange: (value: number) => void;
    isLoading: boolean;
    error: string | null;
    placeholder?: string;
    required?: boolean;
    children: React.ReactNode;
}

const SelectField = ({
    id,
    label,
    value,
    onChange,
    isLoading,
    error,
    placeholder = 'Select…',
    required,
    children,
}: SelectFieldProps) => (
    <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700" htmlFor={id}>
            {label} {required && <span className="text-red-500">*</span>}
        </label>

        {/* Loading skeleton */}
        {isLoading && (
            <div className="h-10 rounded-md bg-gray-100 animate-pulse" />
        )}

        {/* Error state */}
        {!isLoading && error && (
            <div className="flex items-center gap-1.5 h-10 px-3 rounded-md border border-red-200 bg-red-50 text-red-600 text-sm">
                <AlertCircle size={14} />
                <span>{error}</span>
            </div>
        )}

        {/* Select */}
        {!isLoading && !error && (
            <div className="relative">
                <select
                    id={id}
                    value={value || ''}
                    onChange={(e) => onChange(Number(e.target.value))}
                    required={required}
                    className="
                        w-full h-10 pl-3 pr-9 rounded-md border border-input bg-background
                        text-sm text-gray-700 shadow-sm appearance-none
                        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0
                        disabled:cursor-not-allowed disabled:opacity-50
                    "
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {children}
                </select>
                <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
            </div>
        )}
    </div>
);

// ─── Page ────────────────────────────────────────────────────────────────────
export const AddUserPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { isLoading, error, success } = useSelector(
        (state: RootState) => state.auth.addUser
    );
    const {
        roles, rolesLoading, rolesError,
        jobTitles, jobTitlesLoading, jobTitlesError,
    } = useSelector((state: RootState) => state.auth.lookups);

    const [form, setForm] = useState<CreateUserRequest>(initialForm);

    // Fetch lookups + reset add-user state on mount
    useEffect(() => {
        dispatch(resetAddUser());
        dispatch(fetchRoles());
        dispatch(fetchJobTitles());
    }, [dispatch]);

    // Navigate away after success
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                dispatch(resetAddUser());
                navigate(-1);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [success, dispatch, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (field: keyof CreateUserRequest) => (value: number) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addUser(form));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <LegislationHero
                mode="add-user"
                onBack={() => navigate(-1)}
            />

            <div className="px-20 pt-10 pb-8 space-y-8">

                {/* Success Banner */}
                {success && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                        <CheckCircle size={16} />
                        User created successfully! Redirecting…
                    </div>
                )}

                {/* Error Banner */}
                {error && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* User Login */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700" htmlFor="userLogin">
                            User Login <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="userLogin"
                            name="userLogin"
                            value={form.userLogin}
                            onChange={handleChange}
                            placeholder="e.g. jdoe"
                            required
                        />
                    </div>

                    {/* Name EN */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700" htmlFor="userNameEn">
                            Name (English) <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="userNameEn"
                            name="userNameEn"
                            value={form.userNameEn}
                            onChange={handleChange}
                            placeholder="e.g. John Doe"
                            required
                        />
                    </div>

                    {/* Name AR */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700" htmlFor="userNameAr">
                            Name (Arabic) <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="userNameAr"
                            name="userNameAr"
                            value={form.userNameAr}
                            onChange={handleChange}
                            placeholder="e.g. جون دو"
                            dir="rtl"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700" htmlFor="emailId">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="emailId"
                            name="emailId"
                            type="email"
                            value={form.emailId}
                            onChange={handleChange}
                            placeholder="e.g. john.doe@example.com"
                            required
                        />
                    </div>

                    {/* Department ID (still a plain number input — no lookup endpoint yet) */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700" htmlFor="fkDeptId">
                            Department ID <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="fkDeptId"
                            name="fkDeptId"
                            type="number"
                            min={0}
                            value={form.fkDeptId || ''}
                            onChange={handleChange}
                            placeholder="0"
                            required
                        />
                    </div>

                    {/* Lookup dropdowns row */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Job Title dropdown */}
                        <SelectField
                            id="fkJobTitle"
                            label="Job Title"
                            value={form.fkJobTitle}
                            onChange={handleSelectChange('fkJobTitle')}
                            isLoading={jobTitlesLoading}
                            error={jobTitlesError}
                            placeholder="Select a job title…"
                            required
                        >
                            {jobTitles.map((jt) => (
                                <option key={jt.id} value={jt.id}>
                                    {jt.titleEn}
                                </option>
                            ))}
                        </SelectField>

                        {/* Role dropdown */}
                        <SelectField
                            id="roleId"
                            label="Role"
                            value={form.roleId}
                            onChange={handleSelectChange('roleId')}
                            isLoading={rolesLoading}
                            error={rolesError}
                            placeholder="Select a role…"
                            required
                        >
                            {roles.map((r) => (
                                <option key={r.id} value={r.id}>
                                    {r.roleNameEn}
                                </option>
                            ))}
                        </SelectField>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                        <Button
                            type="submit"
                            disabled={isLoading || success || rolesLoading || jobTitlesLoading}
                            className="flex-1"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Creating…
                                </>
                            ) : (
                                <>
                                    <UserPlus size={16} />
                                    Create User
                                </>
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate(-1)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserPage;
