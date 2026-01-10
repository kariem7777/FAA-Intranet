import { Menu, Bell, User, ChevronDown, Globe, X, Clock, FileText, MessageSquare, Award, GraduationCap, FileSignature } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import imgFAALogo from "figma:asset/a5ddb65a14d35992c9db64b833b8ead7d6060dbb.png";
import imgUAELogo from "figma:asset/4e42cf3310aeed96ab254a52750afe49241e1641.png";
import svgPaths from "../imports/svg-ckrnwm689x";

interface FAAHeaderProps {
  onMenuClick: () => void;
  onNavigate: (page: string) => void;
}

export function FAAHeader({ onMenuClick, onNavigate }: FAAHeaderProps) {
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === 'ar';
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const translations = {
    en: {
      home: 'Home',
      organizationStructure: 'Organization Structure',
      automation: 'Automation',
      approvedTemplates: 'Approved Templates',
      user: 'User',
      arabic: 'العربية',
      ar: 'AR',
      notifications: {
        title: 'Notifications',
        new: 'new',
        viewAll: 'View All Notifications →',
      },
    },
    ar: {
      home: 'الرئيسية',
      organizationStructure: 'الهيكل التنظيمي',
      automation: 'الأتمتة',
      approvedTemplates: 'النماذج المعتمدة',
      user: 'مستخدم',
      arabic: 'العربية',
      ar: 'AR',
      notifications: {
        title: 'الإشعارات',
        new: 'جديد',
        viewAll: '← عرض جميع الإشعارات',
      },
    },
  };

  const t = translations[language];

  const notifications = [
    { 
      id: 1, 
      type: 'policy', 
      title: isArabic ? 'تحديث سياسة جديدة' : 'New Policy Update', 
      description: isArabic ? 'سياسة العمل عن بعد المحدثة سارية المفعول الآن. يرجى مراجعة الإرشادات الجديدة.' : 'Updated remote work policy is now effective. Please review the new guidelines.',
      time: isArabic ? 'منذ ساعتين' : '2 hours ago', 
      unread: true,
      icon: 'FileText',
      color: '#ec2227'
    },
    { 
      id: 2, 
      type: 'memo', 
      title: isArabic ? 'مذكرة اجتماع القسم' : 'Department Meeting Memo', 
      description: isArabic ? 'تم جدولة اجتماع المراجعة الربع سنوية في 5 ديسمبر الساعة 10:00 صباحاً.' : 'Quarterly review meeting scheduled for December 5th at 10:00 AM.',
      time: isArabic ? 'منذ 5 ساعات' : '5 hours ago', 
      unread: true,
      icon: 'MessageSquare',
      color: '#8cd4e4'
    },
    { 
      id: 3, 
      type: 'award', 
      title: isArabic ? 'تقدير الموظفين' : 'Employee Recognition', 
      description: isArabic ? 'تهانينا! تم ترشيحك لموظف الشهر.' : 'Congratulations! You have been nominated for Employee of the Month.',
      time: isArabic ? 'منذ يوم واحد' : '1 day ago', 
      unread: false,
      icon: 'Award',
      color: '#7b282d'
    },
    { 
      id: 4, 
      type: 'training', 
      title: isArabic ? 'جلسة تدريبية قادمة' : 'Upcoming Training Session', 
      description: isArabic ? 'ورشة عمل التحول الرقمي مقررة للأسبوع القادم. سجل الآن!' : 'Digital transformation workshop scheduled for next week. Register now!',
      time: isArabic ? 'منذ يومين' : '2 days ago', 
      unread: false,
      icon: 'GraduationCap',
      color: '#413f30'
    },
    { 
      id: 5, 
      type: 'document', 
      title: isArabic ? 'توقيع الوثيقة مطلوب' : 'Document Signature Required', 
      description: isArabic ? 'يتطلب تقرير التدقيق السنوي توقيعك الرقمي.' : 'Annual audit report requires your digital signature.',
      time: isArabic ? 'منذ 3 أيام' : '3 days ago', 
      unread: false,
      icon: 'FileSignature',
      color: '#971b1e'
    },
  ];

  return (
    <div 
      className="bg-white relative shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] w-full"
      style={{ 
        fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Top White Container - Logo Section */}
      <div className="bg-white h-[80px] relative">
        <div className=" mx-auto px-20 h-full flex items-center justify-between">
          {/* Government of Dubai Logo - Left (English) / Right (Arabic) */}
          <div className={`h-[62px] w-[154px] ${isArabic ? 'order-2' : 'order-1'}`}>
            <img 
              alt="Government of Dubai" 
              className="h-full w-full object-cover" 
              src={imgUAELogo} 
            />
          </div>

          {/* FAA Logo - Right (English) / Left (Arabic) */}
          <div className={`h-[48px] w-[208.516px] ${isArabic ? 'order-1' : 'order-2'}`}>
            <img 
              alt="Financial Audit Authority" 
              className="h-full w-full object-contain" 
              src={imgFAALogo} 
            />
          </div>
        </div>
      </div>

      {/* Bottom Burgundy Container - Navigation Section */}
      <div className="bg-[#7b282d] h-[56px] relative">
        <div className=" mx-auto px-20 h-full flex items-center justify-between" dir={isArabic ? 'rtl' : 'ltr'}>
          {/* Left Section - Menu Button & Navigation Links */}
          <div className="flex items-center gap-6">
            {/* Hamburger Menu Button */}
            <button
              onClick={onMenuClick}
              className="flex items-center justify-center rounded-[6.8px] size-[32px] hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              <svg className="size-4" fill="none" viewBox="0 0 16 16">
                <path d="M2.66667 8H13.3333" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                <path d="M2.66667 12H13.3333" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                <path d="M2.66667 4H13.3333" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              </svg>
            </button>

            {/* Navigation Links */}
            <nav className="flex items-center gap-6">
              {/* Home */}
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2 group"
              >
                <span className="text-[14px] text-white hover:opacity-80 transition-opacity" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif' }}>
                  {t.home}
                </span>
              </button>

              {/* Organization Structure */}
              <button
                onClick={() => onNavigate('organization')}
                className="flex items-center gap-2 group"
              >
                <span className="text-[14px] text-white hover:opacity-80 transition-opacity" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif' }}>
                  {t.organizationStructure}
                </span>
              </button>

              {/* Automation */}
              <button
                onClick={() => onNavigate('automation')}
                className="flex items-center gap-2 group"
              >
                <span className="text-[14px] text-white hover:opacity-80 transition-opacity" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif' }}>
                  {t.automation}
                </span>
              </button>

              {/* Approved Templates */}
              <button
                onClick={() => onNavigate('documents')}
                className="flex items-center gap-2 group"
              >
                <span className="text-[14px] text-white hover:opacity-80 transition-opacity" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif' }}>
                  {t.approvedTemplates}
                </span>
              </button>
            </nav>
          </div>

          {/* Right Section - Language Switcher, Notifications, User */}
          <div className="flex items-center gap-3">
            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="border-[#e5e7eb] border-[0.8px] border-solid h-[30px] rounded-[8px] px-2 flex items-center gap-1.5 hover:bg-white/10 transition-colors"
            >
              {/* Globe Icon */}
              <svg className="size-4" fill="none" viewBox="0 0 16 16">
                <g clipPath="url(#clip0_189_87)">
                  <path d={svgPaths.p39ee6532} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d={svgPaths.p14d10c00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d="M1.33333 8H14.6667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </g>
                <defs>
                  <clipPath id="clip0_189_87">
                    <rect fill="white" height="16" width="16" />
                  </clipPath>
                </defs>
              </svg>

              {/* Arabic Text */}
              <span className={`text-[12px] text-white ${isArabic ? 'Dubai, Arial, sans-serif' : '' }`} dir="auto">
                {t.arabic}
              </span>

              {/* Divider */}
              <div className="bg-[#e5e7eb] h-4 w-px" />

              {/* AR Code */}
              <span className={`text-[12px] text-white ${isArabic ? 'Dubai, Arial, sans-serif' : ''}` }>
                {t.ar}
              </span>
            </button>

            {/* Notifications Button */}
            <div className="relative">
              <button
                className="rounded-[6.8px] size-[36px] flex items-center justify-center hover:bg-white/10 transition-colors relative"
                aria-label="Notifications"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <svg className="size-4" fill="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p388cb800} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d={svgPaths.p5baad20} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </svg>
                {/* Notification Badge */}
                <div className="absolute bg-white left-[22px] rounded-full size-[8px] top-[6px]" />
              </button>

              {notificationsOpen && (
                <div className={`absolute ${isArabic ? 'left-0' : 'right-0'} mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 text-gray-900 overflow-hidden`} dir={isArabic ? 'rtl' : 'ltr'}>
                  {/* Header */}
                  <div className="px-5 py-4 bg-gradient-to-r from-[#7b282d] to-[#971b1e] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="mb-0 text-white">{t.notifications.title}</h3>
                      <Badge className="bg-white/20 text-white text-xs px-2 py-0.5 border-0">
                        {notifications.filter(n => n.unread).length} {t.notifications.new}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setNotificationsOpen(false)}
                      className="h-7 w-7 hover:bg-white/20 text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-[480px] overflow-y-auto">
                    {notifications.map((notif) => {
                      const getIcon = () => {
                        switch(notif.icon) {
                          case 'FileText': return FileText;
                          case 'MessageSquare': return MessageSquare;
                          case 'Award': return Award;
                          case 'GraduationCap': return GraduationCap;
                          case 'FileSignature': return FileSignature;
                          default: return Bell;
                        }
                      };
                      const IconComponent = getIcon();
                      
                      return (
                        <div
                          key={notif.id}
                          className={`group relative p-4 border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white cursor-pointer transition-all duration-200 ${
                            notif.unread ? 'bg-blue-50/30' : ''
                          }`}
                        >
                          <div className={`flex items-start gap-3 ${isArabic ? '' : ''}`}>
                            {/* Icon with colored background */}
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
                              style={{ backgroundColor: `${notif.color}15` }}
                            >
                              <IconComponent 
                                className="h-5 w-5" 
                                style={{ color: notif.color }}
                              />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className={`flex items-start justify-between gap-2 mb-1 ${isArabic ? '' : ''}`}>
                                <h4 className={`text-sm text-[#000000] mb-0 line-clamp-1 group-hover:text-[#7b282d] transition-colors ${isArabic ? 'text-right' : ''}`}>
                                  {notif.title}
                                </h4>
                                {notif.unread && (
                                  <div className="h-2 w-2 rounded-full bg-[#ec2227] mt-1 flex-shrink-0" />
                                )}
                              </div>
                              
                              <p className={`text-xs text-gray-600 line-clamp-2 mb-2 ${isArabic ? 'text-right' : ''}`}>
                                {notif.description}
                              </p>
                              
                              <div className={`flex items-center gap-1 text-xs text-gray-500 ${isArabic ? '' : ''}`}>
                                <Clock className="h-3 w-3" />
                                <span>{notif.time}</span>
                              </div>
                            </div>
                          </div>

                          {/* Unread indicator bar */}
                          {notif.unread && (
                            <div 
                              className={`absolute ${isArabic ? 'right-0' : 'left-0'} top-0 bottom-0 w-1 ${isArabic ? 'rounded-l-full' : 'rounded-r-full'}`}
                              style={{ backgroundColor: notif.color }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="p-3 bg-gray-50 border-t border-gray-200">
                    <Button 
                      variant="link" 
                      className="w-full text-[#ec2227] hover:text-[#7b282d] text-sm py-2"
                    >
                      {t.notifications.viewAll}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* User Dropdown */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-[4px] hover:bg-white/10 transition-colors cursor-pointer">
              {/* User Avatar */}
              <div className="bg-[rgba(239,239,239,0.3)] rounded-full size-[24px] flex items-center justify-center">
                <svg className="size-4" fill="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p399eca00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  <path d={svgPaths.pc93b400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </svg>
              </div>

              {/* User Text */}
              <span className="text-[13px] text-white" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif' }}>
                {t.user}
              </span>

              {/* Chevron Down */}
              <svg className="size-3" fill="none" viewBox="0 0 12 12">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}