import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle, UserPlus } from 'lucide-react';
import type { AppDispatch, RootState } from '@/store';
import { addUser, resetAddUser } from '../slices/authSlice';
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

export const AddUserPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isLoading, error, success } = useSelector(
        (state: RootState) => state.auth.addUser
    );

    const [form, setForm] = useState<CreateUserRequest>(initialForm);

    useEffect(() => {
        dispatch(resetAddUser());
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: ['fkDeptId', 'fkJobTitle', 'roleId'].includes(name)
                ? Number(value)
                : value,
        }));
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
                    <div className="flex items-center gap-2 p-3 mb-6 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                        <CheckCircle size={16} />
                        User created successfully! Redirecting...
                    </div>
                )}

                {/* Error Banner */}
                {error && (
                    <div className="flex items-center gap-2 p-3 mb-6 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
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

                    {/* Numeric fields row */}
                    <div className="grid grid-cols-3 gap-4">
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

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700" htmlFor="fkJobTitle">
                                Job Title ID <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="fkJobTitle"
                                name="fkJobTitle"
                                type="number"
                                min={0}
                                value={form.fkJobTitle || ''}
                                onChange={handleChange}
                                placeholder="0"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700" htmlFor="roleId">
                                Role ID <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="roleId"
                                name="roleId"
                                type="number"
                                min={0}
                                value={form.roleId || ''}
                                onChange={handleChange}
                                placeholder="0"
                                required
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                        <Button type="submit" disabled={isLoading || success} className="flex-1">
                            {isLoading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Creating...
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
