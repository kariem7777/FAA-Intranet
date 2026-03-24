import { Bell, Globe, Menu, X, Home, LayoutDashboard, FileText, CheckSquare } from 'lucide-react';
import GovernmentOfDubai from '@/imports/GovernmentOfDubai';
import imgImageFinancialAuditAuthority from "@/assets/e2cb68d504b659d40535c18e986fce5d5ed9ca82.png";
import { useState, useEffect, forwardRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { increaseFontSize, decreaseFontSize, setLanguage } from '@/store/slices/globalSlice';
import { AzureLoginButton } from '@/features/authentication';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { useAuth } from '@/features/authentication/hooks/useAuth';
import { ROLES } from '@/features/authentication/constants/roles';


interface LegislationHeaderProps {
  currentPage: 'home' | 'legislations' | 'dashboard' | 'documents' | 'search' | 'approved-opinions' | null;
  onNavigate: (page: 'home' | 'legislations' | 'dashboard' | 'documents' | 'search' | 'approved-opinions') => void;
}

export const LegislationHeader = forwardRef<HTMLElement, LegislationHeaderProps>(({
  currentPage,
  onNavigate,
}, ref) => {
  const { hasRole } = useAuth();
  const dispatch = useAppDispatch();
  const { language, fontSize } = useAppSelector((state) => state.global);
  const { t } = useTranslation();

  const handleIncreaseFontSize = () => dispatch(increaseFontSize());
  const handleDecreaseFontSize = () => dispatch(decreaseFontSize());
  const handleSetLanguage = (lang: 'en' | 'ar') => dispatch(setLanguage(lang));

  const isArabic = language === 'ar';
  const fontSizes: Array<'sm' | 'base' | 'lg' | 'xl'> = ['sm', 'base', 'lg', 'xl'];
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const allNavItems = [
    { id: 'home' as const, label: t('legislationHeader.home'), roles: ['ALL'] },
    { id: 'dashboard' as const, label: t('legislationHeader.dashboard'), roles: [ROLES.Legal_Admin, ROLES.Legal_Super_Admin] },
    { id: 'documents' as const, label: t('legislationHeader.documents'), roles: [ROLES.Legal_Admin, ROLES.Legal_Super_Admin] },
    { id: 'approved-opinions' as const, label: t('legislationHeader.approvedOpinions'), roles: ['ALL'] },
  ];

  const navItems = allNavItems.filter(item =>
    hasRole(item.roles) || item.roles[0] == 'ALL'
  );

  const currentIndex = fontSizes.indexOf(fontSize);

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
      <header ref={ref} className="fixed top-0 left-0 right-0 z-40  shadow-lg" style={{ background: 'var(--color-legislation-header-gradient)' }}>
        <div className="px-20 pt-4 flex items-center justify-between" dir="ltr">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
            <div className="h-13 w-38.5 flex-shrink-0">
              <GovernmentOfDubai />
            </div>
          </div>

          <div className="h-[38px] w-[208px] flex-shrink-0">
            <img
              src={imgImageFinancialAuditAuthority}
              alt={t('options.entities.faa')}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

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
                className="relative py-2 transition-all text-base"
                style={{
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
                    style={{ backgroundColor: 'var(--color-legislation-active-indicator)' }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleDecreaseFontSize}
                disabled={currentIndex <= 0}
                className="w-8 h-8 rounded-md bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center border border-white/20 text-xs font-semibold"
                style={{
                  color: '#FFFFFF'
                }}
                title={t('legislationHeader.decreaseFontSize')}
              >
                A-
              </button>
              <button
                onClick={handleIncreaseFontSize}
                disabled={currentIndex === fontSizes.length - 1}
                className="w-8 h-8 rounded-md bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center border border-white/20 text-xs font-semibold"
                style={{
                  color: '#FFFFFF'
                }}
                title={t('legislationHeader.increaseFontSize')}
              >
                A+
              </button>
            </div>

            <button
              onClick={() => handleSetLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-white/10 transition-all text-sm font-semibold"
              style={{
                color: '#FFFFFF',
              }}
            >
              <Globe className="h-4.5 w-4.5" />
              {language === 'en' ? 'AR' : 'EN'}
            </button>

            <button className="relative p-1.5 rounded-md hover:bg-white/10 transition-all">
              <Bell className="h-5.5 w-5.5 text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-legislation-active-indicator)' }} />
            </button>

            <AzureLoginButton variant="desktop" />
          </div>
        </div>

        <AnimatePresence>
          {showMobileMenu && (
            <>
              {/* Backdrop covering the whole screen */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMobileMenu(false)}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md lg:hidden"
              />

              {/* Drawer Menu */}
              <motion.div
                key="mobile-menu"
                initial={{ x: isArabic ? '100%' : '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: isArabic ? '100%' : '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="lg:hidden fixed top-0 bottom-0 w-[85%] max-w-sm z-50 shadow-2xl overflow-y-auto flex flex-col"
                style={{
                  background: 'var(--color-legislation-header-gradient)',
                  [isArabic ? 'right' : 'left']: 0
                }}
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                {/* Menu Header */}
                <div className="p-6 flex items-center justify-between border-b border-white/10">
                  <div className="h-10 w-32">
                    <GovernmentOfDubai />
                  </div>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 text-white/70 hover:text-white bg-white/10 rounded-xl transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 px-4 py-8 overflow-y-auto">
                  {/* Navigation Links with Staggered Animation */}
                  <motion.nav
                    variants={{
                      show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                      hide: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                    }}
                    initial="hide"
                    animate="show"
                    className="flex flex-col gap-3"
                  >
                    {navItems.map((item) => (
                      <motion.button
                        key={item.id}
                        variants={{
                          show: { opacity: 1, x: 0 },
                          hide: { opacity: 0, x: isArabic ? 20 : -20 }
                        }}
                        onClick={() => {
                          onNavigate(item.id);
                          setShowMobileMenu(false);
                        }}
                        className={`group flex items-center gap-4 py-2 px-3 rounded-2xl transition-all duration-300 ${currentPage === item.id
                          ? 'bg-white text-[#908e81] shadow-lg scale-[1.02]'
                          : 'bg-white/5 text-white hover:bg-white/10'
                          }`}
                      >
                        <div className={`p-2 rounded-xl transition-colors ${currentPage === item.id ? 'bg-[#908e81]/10' : 'bg-white/10'
                          }`}>
                          {item.id === 'home' && <Home size={20} />}
                          {item.id === 'dashboard' && <LayoutDashboard size={20} />}
                          {item.id === 'documents' && <FileText size={20} />}
                          {item.id === 'approved-opinions' && <CheckSquare size={20} />}
                        </div>
                        <span className="text-lg font-bold">{item.label}</span>
                        {currentPage === item.id && (
                          <motion.div
                            layoutId="active-pill"
                            className="ms-auto w-1.5 h-6 bg-[#908e81] rounded-full"
                          />
                        )}
                      </motion.button>
                    ))}
                  </motion.nav>

                  <div className="h-px bg-white/10 my-8" />

                  {/* Mobile Controls Section */}
                  <div className="flex flex-col gap-5!">
                    <div className="flex flex-col gap-2 p-3 rounded-3xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm font-bold uppercase tracking-wider">{t('legislationHeader.fontSize')}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleDecreaseFontSize}
                            disabled={currentIndex <= 0}
                            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border border-white/10 text-base font-bold transition-all disabled:opacity-20"
                          >
                            A-
                          </button>
                          <button
                            onClick={handleIncreaseFontSize}
                            disabled={currentIndex === fontSizes.length - 1}
                            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border border-white/10 text-base font-bold transition-all disabled:opacity-20"
                          >
                            A+
                          </button>
                        </div>
                      </div>

                      <div className="h-px bg-white/5" />

                      <button
                        onClick={() => {
                          handleSetLanguage(language === 'en' ? 'ar' : 'en');
                          setShowMobileMenu(false);
                        }}
                        className="flex items-center justify-between group py-1"
                      >
                        <span className="text-white/60 text-sm font-bold uppercase tracking-wider">{t('legislationHeader.language')}</span>
                        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/10 group-hover:bg-white/20 transition-all text-white border border-white/10">
                          <Globe size={18} />
                          <span className="font-bold">{language === 'en' ? 'العربية' : 'English'}</span>
                        </div>
                      </button>
                    </div>

                    <div className="pt-2">
                      <AzureLoginButton variant="mobile-drawer" className="w-full" showLoginText />
                    </div>

                  </div>
                </div>

                {/* Menu Footer */}
                <div className="p-8 border-t border-white/10 mt-auto bg-black/10">
                  <p className="text-white/30 text-xs text-center font-medium italic">
                    Financial Audit Authority &copy; {new Date().getFullYear()}
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </header >
    </div>
  );
})