import { Bell, User, Globe, Menu, X } from 'lucide-react';
import GovernmentOfDubai from '@/imports/GovernmentOfDubai';
import imgImageFinancialAuditAuthority from "@/assets/e2cb68d504b659d40535c18e986fce5d5ed9ca82.png";
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '@/store';
import { increaseFontSize, decreaseFontSize, setLanguage } from '@/store/slices/globalSlice';

interface LegislationHeaderProps {
  currentPage: 'home' | 'legislations' | 'dashboard' | 'documents' | 'search' | 'approved-opinions';
  onNavigate: (page: 'home' | 'legislations' | 'dashboard' | 'documents' | 'search' | 'approved-opinions') => void;
  userRole?: 'admin' | 'user';
  onRoleChange?: (role: 'admin' | 'user') => void;
}

import { forwardRef } from 'react';


export const LegislationHeader = forwardRef<HTMLElement, LegislationHeaderProps>(({
  currentPage,
  onNavigate,
  userRole = 'admin',
  onRoleChange,
}, ref) => {

  const dispatch = useDispatch();
  const { language, fontSizeMultiplier } = useSelector((state: RootState) => state.global);

  const handleIncreaseFontSize = () => dispatch(increaseFontSize());
  const handleDecreaseFontSize = () => dispatch(decreaseFontSize());
  const handleSetLanguage = (lang: 'en' | 'ar') => dispatch(setLanguage(lang));

  const isArabic = language === 'ar';
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  const content = {
    en: {
      home: 'Home',
      legislations: 'Legislations',
      dashboard: 'Dashboard',
      documents: 'Documents Management',
      search: 'Search',
      approvedOpinions: 'Approved Legal Opinions',
      adminRole: 'Admin Role',
      userRole: 'User Role',
      switchRole: 'Switch Role',
    },
    ar: {
      home: 'الرئيسية',
      legislations: 'التشريعات',
      dashboard: 'لوحة التحكم',
      documents: 'إدارة المستندات',
      search: 'بحث',
      approvedOpinions: 'الآراء القانونية المعتمدة',
      adminRole: 'صلاحية المشرف',
      userRole: 'صلاحية المستخدم',
      switchRole: 'تبديل الصلاحية',
    },
  };

  const t = content[language];

  const navItems = [
    { id: 'home' as const, label: t.home },
    // { id: 'legislations' as const, label: t.legislations },
    // { id: 'search' as const, label: t.search },
    { id: 'dashboard' as const, label: t.dashboard },
    { id: 'documents' as const, label: t.documents },
    { id: 'approved-opinions' as const, label: t.approvedOpinions },
  ];

  useEffect(() => {
    const currentRef = roleDropdownRef.current;
    const handleClickOutside = (event: MouseEvent) => {
      if (currentRef && !currentRef.contains(event.target as Node)) {
        setShowRoleDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <header ref={ref} className="fixed top-0 left-0 right-0 z-40 shadow-lg bg-[#2F4F6F]">

        {/* ───────────────── Top Logos Bar (ALWAYS LTR) ───────────────── */}
        <div className="px-20 pt-4 flex items-center justify-between" dir="ltr">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
            {/* Dubai Gov Logo — always left */}
            <div className="h-13 w-38.5 flex-shrink-0">
              <GovernmentOfDubai />
            </div>
          </div>

          {/* FAA Logo — always right */}
          <div className="h-[38px] w-[208px] flex-shrink-0">
            <img
              src={imgImageFinancialAuditAuthority}
              alt={
                isArabic
                  ? 'هيئة التدقيق المالي'
                  : 'Financial Audit Authority'
              }
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* ───────────────── Bottom Navigation Bar ───────────────── */}
        <div
          className="hidden lg:flex! px-20 py-4 items-center justify-between"
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          {/* Navigation */}
          <nav className="flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative py-2 transition-all"
                style={{
                  fontFamily: 'Dubai, Arial, sans-serif',
                  fontSize: '17px',
                  fontWeight: 600,
                  color:
                    currentPage === item.id
                      ? '#FFFFFF'
                      : 'rgba(255, 255, 255, 0.7)',
                }}
              >
                {item.label}
                {currentPage === item.id && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-t"
                    style={{ backgroundColor: '#C9A24D' }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-6">
            {/* Font Size Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecreaseFontSize}
                disabled={fontSizeMultiplier <= 0.9}
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center border border-white/20"
                style={{
                  fontFamily: 'Dubai, Arial, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#FFFFFF'
                }}
                title={isArabic ? 'تصغير حجم الخط' : 'Decrease font size'}
              >
                A-
              </button>
              <button
                onClick={handleIncreaseFontSize}
                disabled={fontSizeMultiplier >= 1.2}
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center border border-white/20"
                style={{
                  fontFamily: 'Dubai, Arial, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#FFFFFF'
                }}
                title={isArabic ? 'تكبير حجم الخط' : 'Increase font size'}
              >
                A+
              </button>
            </div>

            {/* Language */}
            <button
              onClick={() => handleSetLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all"
              style={{
                fontFamily: 'Dubai, Arial, sans-serif',
                fontSize: '15px',
                fontWeight: 600,
                color: '#FFFFFF',
              }}
            >
              <Globe className="h-5 w-5" />
              {language === 'en' ? 'AR' : 'EN'}
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-white/10 transition-all">
              <Bell className="h-6 w-6 text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C9A24D]" />
            </button>

            {/* User */}
            <div className="relative" ref={roleDropdownRef}>
              <button
                className="p-2 rounded-lg hover:bg-white/10 transition-all relative"
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                title={t.switchRole}
              >
                <User className="h-6 w-6 text-white" />
                {/* Role indicator badge */}
                <span
                  className="absolute top-1 right-1 w-2 h-2 rounded-full border-2 border-[#2F4F6F]"
                  style={{ backgroundColor: userRole === 'admin' ? '#C9A24D' : '#4ADE80' }}
                />
              </button>
              {showRoleDropdown && (
                <div
                  className="absolute top-12 bg-white shadow-xl rounded-lg overflow-hidden min-w-[180px] border border-gray-200"
                  style={{
                    [isArabic ? 'left' : 'right']: '0',
                    fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif'
                  }}
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  <button
                    className={`block px-4 py-3 w-full transition-colors ${userRole === 'admin'
                      ? 'bg-[#2F4F6F] text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    style={{
                      fontSize: '15px',
                      fontWeight: userRole === 'admin' ? 600 : 500,
                      textAlign: isArabic ? 'right' : 'left'
                    }}
                    onClick={() => {
                      if (onRoleChange) onRoleChange('admin');
                      setShowRoleDropdown(false);
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#C9A24D' }} />
                      {t.adminRole}
                    </span>
                  </button>
                  <button
                    className={`block px-4 py-3 w-full transition-colors ${userRole === 'user'
                      ? 'bg-[#2F4F6F] text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    style={{
                      fontSize: '15px',
                      fontWeight: userRole === 'user' ? 600 : 500,
                      textAlign: isArabic ? 'right' : 'left'
                    }}
                    onClick={() => {
                      if (onRoleChange) onRoleChange('user');
                      setShowRoleDropdown(false);
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      {t.userRole}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ───────────────── Mobile Menu Drawer ───────────────── */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-[#2F4F6F] border-t border-white/10 shadow-xl overflow-y-auto max-h-[80vh] z-50"
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                {/* Navigation Links */}
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setShowMobileMenu(false);
                    }}
                    className="text-left py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-white font-medium"
                    style={{ fontFamily: 'Dubai, Arial, sans-serif' }}
                  >
                    {item.label}
                  </button>
                ))}

                <div className="h-px bg-white/10 my-2" />

                {/* Mobile Controls */}
                <div className="flex flex-col gap-4">

                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">{isArabic ? 'حجم الخط' : 'Font Size'}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleDecreaseFontSize}
                        disabled={fontSizeMultiplier <= 0.9}
                        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white border border-white/10"
                      >
                        A-
                      </button>
                      <button
                        onClick={handleIncreaseFontSize}
                        disabled={fontSizeMultiplier >= 1.2}
                        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white border border-white/10"
                      >
                        A+
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleSetLanguage(language === 'en' ? 'ar' : 'en');
                      setShowMobileMenu(false);
                    }}
                    className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/5 text-white"
                  >
                    <span>{isArabic ? 'اللغة' : 'Language'}</span>
                    <div className="flex items-center gap-2">
                      <Globe size={18} />
                      <span>{language === 'en' ? 'Arabic' : 'English'}</span>
                    </div>
                  </button>

                  <button
                    className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/5 text-white"
                    onClick={() => {
                      if (onRoleChange) onRoleChange(userRole === 'admin' ? 'user' : 'admin');
                      setShowMobileMenu(false);
                    }}
                  >
                    <span>{t.switchRole}</span>
                    <div className="flex items-center gap-2">
                      <User size={18} />
                      <span className="text-sm opacity-80">{userRole === 'admin' ? t.adminRole : t.userRole}</span>
                    </div>
                  </button>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header >
    </div>
  );
})