import { Calendar, Users, Award, Gift, MapPin, FileText, Briefcase, Heart, PartyPopper, Star, BookOpen, Clock, Building, Trophy, HeartHandshake, GraduationCap, ChevronLeft, ChevronRight, Megaphone, Image as ImageIcon, ExternalLink, Search, TrendingUp, Phone, X, Target, Mail, User, Grid3x3, UserCircle, ClipboardList, ArrowRight, Download } from 'lucide-react';
import svgPaths from '../imports/svg-kqdxmrhk95';
import servicesIconPaths from '../imports/svg-o2v51p5o8x';
import condolencesIconPaths from '../imports/svg-2882ley4m1';
import servicesNewIconPaths from '../imports/svg-vm247pgmp9';
import peopleSvgPaths from '../imports/svg-29gymdsypi';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { HeroBanner } from './HeroBanner';
import bannerBg from 'figma:asset/33fb6ee80221be4862d153ff6087a71ce90ad51a.png';
import bgPattern from 'figma:asset/613a980dd47a3f6603181ce00dd0e58780fa9b8c.png';
import galleryImg1 from 'figma:asset/cb64f9a87ac606d9926884eed9a827a7172105de.png';
import galleryImg2 from 'figma:asset/95993900bf37692651b8569a31368a3269db15e2.png';
import galleryImg3 from 'figma:asset/7de74e447ed1e5b77f01506bfd62f7dabad9ae03.png';
import galleryImg4 from 'figma:asset/33f312785d773855d5dfb38d16c5cfaeeaf99931.png';
import galleryImg5 from 'figma:asset/acec061ade8f155cbb8db34fe8dfffb8b27e2e58.png';
import galleryImg6 from 'figma:asset/af9823e73d05653a993d33627758046b9fed35b3.png';
import recommendImg1 from 'figma:asset/00bc57afad950d33428423ab7c213d741274f5d6.png';
import recommendImg2 from 'figma:asset/1308dad5ac4eee5bb8e797f6976bf56350b6d041.png';
import recommendImg3 from 'figma:asset/8c68b1421c9d494969f62752cb2db352cf34a27d.png';
import recommendImg4 from 'figma:asset/5ee87822c08c855c540d944597cc202195ab0bea.png';
import recommendImg5 from 'figma:asset/abb7c1ed27559f226111b5e2f0bdcb74456f21fc.png';
import { useState, useEffect } from 'react';
import { AnnouncementDetailPage } from './AnnouncementDetailPage';
import { JobPostingsPage } from './JobPostingsPage';
import { MediaNewsDetailPage } from './MediaNewsDetailPage';
import { useLanguage } from './LanguageContext';

interface HomePageProps {
  onNewsClick?: (news: any) => void;
  onMediaGalleryClick?: () => void;
  onNavigate?: (page: string) => void;
}

export function HomePage({ onNewsClick, onMediaGalleryClick, onNavigate }: HomePageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<number | null>(null);
  const [selectedNewsId, setSelectedNewsId] = useState<number | null>(null);
  const [showJobPostings, setShowJobPostings] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10, 1));
  const [selectedDate, setSelectedDate] = useState(29);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [condolenceSlide, setCondolenceSlide] = useState(0);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showAnnouncementPopup, setShowAnnouncementPopup] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [eventCountdowns, setEventCountdowns] = useState<Record<number, { days: number; hours: number; minutes: number; seconds: number }>>({});
  const [offersTab, setOffersTab] = useState<'esaad' | 'other'>('esaad');
  const [newFacesSlide, setNewFacesSlide] = useState(0);
  const [celebrationsSlide, setCelebrationsSlide] = useState(0);

  // Translations
  const translations = {
    en: {
      quickLinks: 'Quick Links',
      viewAll: 'View All',
      corporateUpdates: 'Corporate Updates',
      announcements: 'Announcements',
      mediaNews: 'Media & News',
      policyUpdates: 'Policy Updates',
      lawsLegislation: 'Laws & Legislation',
      calendar: 'Calendar',
      upcomingEvents: 'Upcoming Events',
      peopleSpotlight: 'People Spotlight',
      newFaces: 'New Faces',
      workAnniversaries: 'Work Anniversaries',
      condolences: 'Condolences',
      celebrations: 'Celebrations',
      jobOpenings: 'Job Openings',
      recommendations: 'Recommendations',
      esaadOffers: 'Esaad Offers',
      mediaGallery: 'Media Gallery',
      viewAllGallery: 'View All Gallery',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      location: 'Location',
      time: 'Time',
      category: 'Category',
      years: 'years',
      welcomeTo: 'Welcome to',
      joins: 'joins',
      celebrating: 'celebrating',
      ourSympathies: 'Our sympathies to',
      discount: 'Discount',
      validUntil: 'Valid Until',
      applyNow: 'Apply Now',
      learnMore: 'Learn More',
      seeMore: 'See More',
      close: 'Close',
      eventStarts: 'Event starts in',
      new: 'NEW',
      starPerformer: 'STAR PERFORMER',
      outstandingPerformance: 'Outstanding performance',
      employeeOfMonth: 'Employee of the Month',
      anniversary: 'Anniversary',
      yearsOfService: 'Years of Service',
      deadline: 'Deadline',
      viewAllPostings: 'View All Postings',
      internalJobPostings: 'Internal Job Postings & Transfers',
    },
    ar: {
      quickLinks: 'روابط سريعة',
      viewAll: 'عرض الكل',
      corporateUpdates: 'التحديثات المؤسسية',
      announcements: 'الإعلانات',
      mediaNews: 'الوسائط والأخبار',
      policyUpdates: 'تحديثات السياسة',
      lawsLegislation: 'القوانين والتشريعات',
      calendar: 'التقويم',
      upcomingEvents: 'الفعاليات القادمة',
      peopleSpotlight: 'تسليط الضوء على الأشخاص',
      newFaces: 'وجوه جديدة',
      workAnniversaries: 'ذكرى سنوية العمل',
      condolences: 'التعازي',
      celebrations: 'الاحتفالات',
      jobOpenings: 'الوظائف الشاغرة',
      recommendations: 'التوصيات',
      esaadOffers: 'عروض إسعاد',
      mediaGallery: 'معرض الوسائط',
      viewAllGallery: 'عرض جميع الصور',
      days: 'أيام',
      hours: 'ساعات',
      minutes: 'دقائق',
      seconds: 'ثواني',
      location: 'الموقع',
      time: 'الوقت',
      category: 'الفئة',
      years: 'سنة',
      welcomeTo: 'مرحباً بـ',
      joins: 'ينضم إلى',
      celebrating: 'يحتفل بـ',
      ourSympathies: 'تعازينا لـ',
      discount: 'الخصم',
      validUntil: 'صالح حتى',
      applyNow: 'قدم الآن',
      learnMore: 'اعرف المزيد',
      seeMore: 'شاهد المزيد',
      close: 'إغلاق',
      eventStarts: 'يبدأ الحدث في',
      new: 'جديد',
      starPerformer: 'أداء نجمي',
      outstandingPerformance: 'أداء متميز',
      employeeOfMonth: 'موظف الشهر',
      anniversary: 'الذكرى السنوية',
      yearsOfService: 'سنوات الخدمة',
      deadline: 'الموعد النهائي',
      viewAllPostings: 'عرض جميع الوظائف',
      internalJobPostings: 'الوظائف الداخلية والنقل',
    },
  };

  const t = translations[language];

  // Show announcement popup on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnnouncementPopup(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Countdown timer for the event
  useEffect(() => {
    const eventDate = new Date('2026-01-15T11:30:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Countdown timers for all events
  useEffect(() => {
    const updateEventCountdowns = () => {
      const now = new Date().getTime();
      const newCountdowns: Record<number, { days: number; hours: number; minutes: number; seconds: number }> = {};

      upcomingEvents.forEach((event) => {
        const eventDate = new Date(event.dateTime).getTime();
        const distance = eventDate - now;

        if (distance > 0) {
          newCountdowns[event.id] = {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
          };
        } else {
          newCountdowns[event.id] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });

      setEventCountdowns(newCountdowns);
    };

    updateEventCountdowns();
    const interval = setInterval(updateEventCountdowns, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const galleryImages = [
    { id: 1, src: galleryImg1, alt: isArabic ? 'اجتماع القيادة التنفيذية للهيئة' : 'FAA Executive Leadership Meeting', title: isArabic ? 'اجتماع القيادة التنفيذية' : 'Executive Leadership Meeting' },
    { id: 2, src: galleryImg2, alt: isArabic ? 'الخطة الاستراتيجية 2025-2028' : 'FAA Strategic Plan 2025-2028', title: isArabic ? 'الخطة الاستراتيجية 2025-2028' : 'Strategic Plan 2025-2028' },
    { id: 3, src: galleryImg3, alt: isArabic ? 'تكريم الفريق' : 'Team Recognition', title: isArabic ? 'حفل تكريم الفريق' : 'Team Recognition Ceremony' },
    { id: 4, src: galleryImg4, alt: isArabic ? 'فعالية الفريق الرياضي' : 'Sports Team Event', title: isArabic ? 'مبادرة الرياضة والصحة' : 'Sports & Wellness Initiative' },
    { id: 5, src: galleryImg5, alt: isArabic ? 'الخدمة المجتمعية' : 'Community Service', title: isArabic ? 'برنامج التواصل المجتمعي' : 'Community Outreach Program' },
    { id: 6, src: galleryImg6, alt: isArabic ? 'ورشة عمل احترافية' : 'Professional Workshop', title: isArabic ? 'ورشة عمل الابتكار' : 'Innovation Workshop' }
  ];

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const goToPreviousMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const goToNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const monthName = currentMonth.toLocaleString(isArabic ? 'ar-AE' : 'en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  const upcomingEvents = [
    { id: 1, title: isArabic ? 'اجتماع التخطيط السنوي للتدقيق' : 'Annual Audit Planning Meeting', date: '2026-01-29', dateTime: '2026-01-29T10:00:00', time: isArabic ? '10:00 ص - 12:00 م' : '10:00 am - 12:00 pm', location: isArabic ? 'غرفة المؤتمرات الرئيسية' : 'Main Conference Room', category: isArabic ? 'داخلي' : 'Internal', color: '#ec2227', image: galleryImg1 },
    { id: 2, title: isArabic ? 'ورشة إدارة المخاطر' : 'Risk Management Workshop', date: '2026-01-29', dateTime: '2026-01-29T14:00:00', time: isArabic ? '2:00 م - 5:00 م' : '2:00 pm - 5:00 pm', location: isArabic ? 'مركز التدريب، المستوى 3' : 'Training Center, Level 3', category: isArabic ? 'تدريب' : 'Training', color: '#8cd4e4', image: galleryImg2 },
    { id: 3, title: isArabic ? 'احتفال اليوم الوطني 2026' : 'National Day Celebration 2026', date: '2026-02-02', dateTime: '2026-02-02T18:00:00', time: isArabic ? '6:00 م - 9:00 م' : '6:00 pm - 9:00 pm', location: isArabic ? 'القاعة الرئيسية للهيئة' : 'FAA Main Auditorium', category: isArabic ? 'ثقافي' : 'Cultural', color: '#413f30', image: galleryImg3 },
    { id: 4, title: isArabic ? 'ورشة تطوير القيادة' : 'Leadership Development Workshop', date: '2026-01-17', dateTime: '2026-01-17T09:00:00', time: isArabic ? '9:00 ص - 1:00 م' : '9:00 am - 1:00 pm', location: isArabic ? 'غرفة التدريب التنفيذية' : 'Executive Training Room', category: isArabic ? 'تدريب' : 'Training', color: '#8cd4e4', image: galleryImg4 },
    { id: 5, title: isArabic ? 'اجتماع ربع سنوي عام' : 'Quarterly Town Hall Meeting', date: '2026-01-18', dateTime: '2026-01-18T15:00:00', time: isArabic ? '3:00 م - 4:30 م' : '3:00 pm - 4:30 pm', location: isArabic ? 'القاعة الرئيسية' : 'Main Auditorium', category: isArabic ? 'داخلي' : 'Internal', color: '#ec2227', image: galleryImg5 },
    { id: 6, title: isArabic ? 'نشاط بناء الفريق' : 'Team Building Activity', date: '2026-01-19', dateTime: '2026-01-19T10:00:00', time: isArabic ? '10:00 ص - 3:00 م' : '10:00 am - 3:00 pm', location: isArabic ? 'منطقة الترفيه الخارجية' : 'Outdoor Recreation Area', category: isArabic ? 'ثقافي' : 'Cultural', color: '#413f30', image: galleryImg6 },
    { id: 7, title: isArabic ? 'ندوة التقارير المالية' : 'Financial Reporting Seminar', date: '2026-01-25', dateTime: '2026-01-25T13:00:00', time: isArabic ? '1:00 م - 4:00 م' : '1:00 pm - 4:00 pm', location: isArabic ? 'غرفة الاجتماعات ب' : 'Conference Room B', category: isArabic ? 'تدريب' : 'Training', color: '#8cd4e4', image: galleryImg1 },
  ];

  const hasEventsOnDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return upcomingEvents.some(event => event.date === dateStr);
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return upcomingEvents.filter(event => event.date === dateStr);
  };

  // Helper to determine countdown urgency level
  const getCountdownUrgency = (eventId: number) => {
    const cd = eventCountdowns[eventId];
    if (!cd) return 'normal';
    
    const totalHours = cd.days * 24 + cd.hours;
    if (totalHours <= 2) return 'critical'; // Less than 2 hours
    if (totalHours <= 24) return 'urgent'; // Less than 24 hours
    if (cd.days <= 3) return 'soon'; // Less than 3 days
    return 'normal';
  };

  // Helper to get event description
  const getEventDescription = (eventId: number) => {
    const descriptions: Record<number, Record<string, string>> = {
      1: {
        en: 'Join us for the annual audit planning meeting to align on objectives and strategic priorities.',
        ar: 'انضم إلينا في اجتماع التخطيط السنوي للتدقيق لمواءمة الأهداف والأولويات الاستراتيجية.'
      },
      2: {
        en: 'Enhance your skills in identifying, assessing, and mitigating organizational risks effectively.',
        ar: 'عزز مهاراتك في تحديد وتقييم وتخفيف المخاطر التنظيمية بفعالية.'
      },
      3: {
        en: 'Celebrate our nation\'s heritage with cultural performances, traditional activities, and more.',
        ar: 'احتفل بتراث أمتنا مع العروض الثقافية والأنشطة التقليدية والمزيد.'
      },
      4: {
        en: 'Develop essential leadership competencies through interactive sessions and case studies.',
        ar: 'طور الكفاءات القيادية الأساسية من خلال جلسات تفاعلية ودراسات حالة.'
      },
      5: {
        en: 'Quarterly update from leadership on organizational performance, initiatives, and priorities.',
        ar: 'تحديث ربع سنوي من القيادة حول الأداء التنظيمي والمبادرات والأولويات.'
      },
      6: {
        en: 'Strengthen team bonds through engaging outdoor activities and collaborative challenges.',
        ar: 'عزز روابط الفريق من خلال الأنشطة الخارجية المشوقة والتحديات التعاونية.'
      },
      7: {
        en: 'Learn advanced financial reporting techniques and compliance requirements for audit professionals.',
        ar: 'تعلم تقنيات التقارير المالية المتقدمة ومتطلبات الامتثال لمحترفي التدقيق.'
      },
    };
    return descriptions[eventId]?.[language] || (isArabic ? 'تفاصيل ومعلومات الحدث.' : 'Event details and information.');
  };

  const announcements = [
    { id: 1, title: isArabic ? 'إصدار معايير تدقيق جديدة' : 'New Audit Standards Released', excerpt: isArabic ? 'تم نشر معايير التدقيق الدولية المحدثة وهي متاحة الآن في مركز المعرفة.' : 'Updated international audit standards have been published and are now available in the knowledge hub.', date: '2025-11-26', category: isArabic ? 'سياسة' : 'Policy', author: isArabic ? 'قسم السياسات' : 'Policy Department' },
    { id: 2, title: isArabic ? 'تحديث سياسة العمل عن بعد' : 'Remote Work Policy Update', excerpt: isArabic ? 'سياسة العمل عن بعد المحدثة سارية المفعول الآن. يرجى مراجعة الإرشادات الجديدة.' : 'The updated remote work policy is now effective. Please review the new guidelines.', date: '2025-11-25', category: isArabic ? 'موارد بشرية' : 'HR', author: isArabic ? 'الموارد البشرية' : 'Human Resources' },
    { id: 3, title: isArabic ? 'إطلاق مبادرة التحول الرقمي' : 'Digital Transformation Initiative Launch', excerpt: isArabic ? 'يسعدنا الإعلان عن إطلاق برنامج التحول الرقمي الخاص بنا.' : 'We are excited to announce the launch of our digital transformation program.', date: '2025-11-24', category: isArabic ? 'تقنية' : 'Technology', author: isArabic ? 'قسم تقنية المعلومات' : 'IT Department' },    
  ];

  const mediaNews = [
    { 
      id: 1, 
      title: isArabic ? 'ورشة الابتكار: بناء حلول التدقيق للمستقبل' : 'Innovation Workshop: Building Tomorrow\'s Audit Solutions', 
      description: isArabic ? 'خلف الكواليس في ورشة الابتكار! تعمل فرقنا على حلول متطورة لتعزيز كفاءة التدقيق والشفافية. جلسات تعاونية تركز على تطوير أدوات التدقيق من الجيل القادم...' : 'Behind the scenes at our Innovation Workshop! Our teams are working on cutting-edge solutions to enhance audit efficiency and transparency. Collaborative sessions focused on developing next-generation audit tools...', 
      date: '2025-11-26', 
      category: isArabic ? 'ابتكار' : 'Innovation',
      categoryColor: '#ec2227'
    },
    { 
      id: 2, 
      title: isArabic ? 'الهيئة تطلق منصة التدقيق الرقمية الجديدة' : 'FAA Launches New Digital Audit Platform', 
      description: isArabic ? 'أطلقت هيئة التدقيق المالي رسمياً منصتها الرقمية الجديدة للتدقيق، مما يحدث ثورة في كيفية إجراء عمليات التدقيق عبر الجهات الحكومية. تتميز المنصة بالتحليلات المدعومة بالذكاء الاصطناعي والتقارير في الوقت الفعلي...' : 'The Financial Audit Authority has officially launched its new digital audit platform, revolutionizing how audits are conducted across government entities. The platform features AI-powered analytics and real-time reporting...', 
      date: '2025-11-25', 
      category: isArabic ? 'تقنية' : 'Technology',
      categoryColor: '#8cd4e4'
    },
    { 
      id: 3, 
      title: isArabic ? 'منتدى التعاون الإقليمي للحوكمة المالية' : 'Regional Cooperation Forum on Financial Governance', 
      description: isArabic ? 'استضافت الهيئة منتدى التعاون الإقليمي الذي يجمع هيئات التدقيق من منطقة الخليج. ركزت المناقشات الرئيسية على توحيد ممارسات التدقيق وتبادل أفضل الممارسات في الرقابة المالية...' : 'FAA hosted the Regional Cooperation Forum bringing together audit authorities from across the Gulf region. Key discussions focused on standardizing audit practices and sharing best practices in financial oversight...', 
      date: '2025-11-24', 
      category: isArabic ? 'فعاليات' : 'Events',
      categoryColor: '#971b1e'
    },
    { 
      id: 4, 
      title: isArabic ? 'التقرير السنوي 2024: إنجازات قياسية في الرقابة المالية' : 'Annual Report 2024: Record Achievements in Financial Oversight', 
      description: isArabic ? 'يسلط تقريرنا السنوي لعام 2024 الضوء على إنجازات غير مسبوقة في الحوكمة المالية والشفافية. شهد هذا العام زيادة بنسبة 40٪ في تغطية التدقيق وتحسينات كبيرة في معدلات الامتثال عبر جميع القطاعات...' : 'Our 2024 Annual Report highlights unprecedented achievements in financial governance and transparency. This year saw a 40% increase in audit coverage and significant improvements in compliance rates across all sectors...', 
      date: '2025-11-23', 
      category: isArabic ? 'تقارير' : 'Reports',
      categoryColor: '#413f30'
    },
    { 
      id: 5, 
      title: isArabic ? 'ورشة الابتكار: بناء حلول التدقيق للمستقبل' : 'Innovation Workshop: Building Tomorrow\'s Audit Solutions', 
      description: isArabic ? 'خلف الكواليس في ورشة الابتكار! تعمل فرقنا على حلول متطورة لتعزيز كفاءة التدقيق والشفافية. جلسات تعاونية تركز على تطوير أدوات التدقيق من الجيل القادم...' : 'Behind the scenes at our Innovation Workshop! Our teams are working on cutting-edge solutions to enhance audit efficiency and transparency. Collaborative sessions focused on developing next-generation audit tools...', 
      date: '2025-11-26', 
      category: isArabic ? 'ابتكار' : 'Innovation',
      categoryColor: '#ec2227'
    },
    { 
      id: 6, 
      title: isArabic ? 'الهيئة تطلق منصة التدقيق الرقمية الجديدة' : 'FAA Launches New Digital Audit Platform', 
      description: isArabic ? 'أطلقت هيئة التدقيق المالي رسمياً منصتها الرقمية الجديدة للتدقيق، مما يحدث ثورة في كيفية إجراء عمليات التدقيق عبر الجهات الحكومية. تتميز المنصة بالتحليلات المدعومة بالذكاء الاصطناعي والتقارير في الوقت الفعلي...' : 'The Financial Audit Authority has officially launched its new digital audit platform, revolutionizing how audits are conducted across government entities. The platform features AI-powered analytics and real-time reporting...', 
      date: '2025-11-25', 
      category: isArabic ? 'تقنية' : 'Technology',
      categoryColor: '#8cd4e4'
    },
  ];

  const employeeOfMonth = {
    name: isArabic ? 'فاطمة الزعابي' : 'Fatima Al Zaabi',
    role: isArabic ? 'مدقق رئيسي - القطاع المالي' : 'Lead Auditor - Financial Sector',
    achievement: isArabic ? 'أداء متميز في إجراء عمليات تدقيق شاملة وتوجيه أعضاء الفريق المبتدئين.' : 'Outstanding performance in conducting comprehensive audits and mentoring junior staff members.'
  };

  const newEmployees = [
    { name: isArabic ? 'محمد أحمد' : 'Mohammed Ahmed', role: isArabic ? 'مدقق مبتدئ' : 'Junior Auditor', department: isArabic ? 'التدقيق المالي' : 'Financial Audit', joinDate: '2025-11-15' },
    { name: isArabic ? 'سارة عبدالله' : 'Sara Abdullah', role: isArabic ? 'محلل مخاطر' : 'Risk Analyst', department: isArabic ? 'إدارة المخاطر' : 'Risk Management', joinDate: '2025-11-18' },
    { name: isArabic ? 'علي حسن' : 'Ali Hassan', role: isArabic ? 'مسؤول امتثال' : 'Compliance Officer', department: isArabic ? 'الامتثال' : 'Compliance', joinDate: '2025-11-20' },
    { name: isArabic ? 'ليلى محمد' : 'Layla Mohammed', role: isArabic ? 'محلل بيانات' : 'Data Analyst', department: isArabic ? 'تدقيق تقنية المعلومات' : 'IT Audit', joinDate: '2025-11-22' },
    { name: isArabic ? 'عمر خالد' : 'Omar Khalid', role: isArabic ? 'مساعد تدقيق' : 'Audit Assistant', department: isArabic ? 'التدقيق الداخلي' : 'Internal Audit', joinDate: '2025-11-25' },
    { name: isArabic ? 'مريم سعيد' : 'Maryam Saeed', role: isArabic ? 'محلل مالي' : 'Financial Analyst', department: isArabic ? 'التدقيق المالي' : 'Financial Audit', joinDate: '2025-11-28' }
  ];

  const workAnniversaries = [
    { name: isArabic ? 'خالد المنصوري' : 'Khalid Al Mansoori', years: 15, role: isArabic ? 'مدير أول' : 'Senior Director' },
    { name: isArabic ? 'عائشة محمد' : 'Aisha Mohammed', years: 10, role: isArabic ? 'مدير تدقيق' : 'Audit Manager' },
    { name: isArabic ? 'عمر راشد' : 'Omar Rashid', years: 5, role: isArabic ? 'مدقق أول' : 'Senior Auditor' }
  ];

  const condolences = [
    { name: isArabic ? 'أحمد المنصوري' : 'Ahmed Al Mansouri', detail: isArabic ? 'فقدان والده' : 'Loss of his father' },
    { name: isArabic ? 'فاطمة الشامسي' : 'Fatima Al Shamsi', detail: isArabic ? 'فقدان والدتها' : 'Loss of her mother' }
  ];

  const celebrations = [
    { type: isArabic ? 'عيد ميلاد' : 'Birthday', name: isArabic ? 'مريم العلي' : 'Mariam Al Ali', detail: isArabic ? '25 ديسمبر' : 'December 25th', icon: PartyPopper, color: '#ec2227' },
    { type: isArabic ? 'ترقية' : 'Promotion', name: isArabic ? 'أحمد حسن' : 'Ahmed Hassan', detail: isArabic ? 'ترقية إلى مدقق أول' : 'Promoted to Senior Auditor', icon: Award, color: '#413f30' },
    { type: isArabic ? 'تقاعد' : 'Retirement', name: isArabic ? 'عبد الرحمن' : 'Abdul Rahman', detail: isArabic ? '30 عامًا من الخدمة' : '30 years of service', icon: Trophy, color: '#7b282d' },
    { type: isArabic ? 'مولود جديد' : 'Newborn', name: isArabic ? 'حسن المكتوم' : 'Hassan Al Maktoum', detail: isArabic ? 'رحب بمولودة جديدة' : 'Welcomed a baby girl', icon: Gift, color: '#8cd4e4' },
    { type: isArabic ? 'عيد ميلاد' : 'Birthday', name: isArabic ? 'سارة عبدالله' : 'Sara Abdullah', detail: isArabic ? '28 ديسمبر' : 'December 28th', icon: PartyPopper, color: '#ec2227' },
  ];

  const jobPostings = [
    { id: 1, title: isArabic ? 'مدقق مالي أول' : 'Senior Financial Auditor', department: isArabic ? 'التدقيق المالي' : 'Financial Audit', location: isArabic ? 'أبوظبي' : 'Abu Dhabi', deadline: '2025-12-15', level: isArabic ? 'أول' : 'Senior' },
    { id: 2, title: isArabic ? 'أخصائي تقييم المخاطر' : 'Risk Assessment Specialist', department: isArabic ? 'إدارة المخاطر' : 'Risk Management', location: isArabic ? 'دبي' : 'Dubai', deadline: '2025-12-20', level: isArabic ? 'متوسط' : 'Mid-level' },
    { id: 3, title: isArabic ? 'مدير تدقيق تقنية المعلومات' : 'IT Audit Manager', department: isArabic ? 'تدقيق تقنية المعلومات' : 'IT Audit', location: isArabic ? 'أبوظبي' : 'Abu Dhabi', deadline: '2025-12-25', level: isArabic ? 'مدير' : 'Manager' },
    { id: 4, title: isArabic ? 'مدقق داخلي مبتدئ' : 'Junior Internal Auditor', department: isArabic ? 'التدقيق الداخلي' : 'Internal Audit', location: isArabic ? 'أبوظبي' : 'Abu Dhabi', deadline: '2025-12-18', level: isArabic ? 'مبتدئ' : 'Junior' }
  ];

  const recommendations = [
    { id: 1, title: isArabic ? 'متحف المستقبل' : 'Museum of the Future', category: isArabic ? 'أماكن للزيارة' : 'Places to Visit', description: isArabic ? 'استكشف الابتكار في متحف المستقبل' : 'Explore innovation at future museum', location: isArabic ? 'دبي' : 'Dubai', rating: 4.8, image: recommendImg1 },
    { id: 2, title: isArabic ? 'منطقة الجاهلي التراثية' : 'Al Jahili Heritage District', category: isArabic ? 'أماكن للزيارة' : 'Places to Visit', description: isArabic ? 'تجربة في التجربة المستقبلية' : 'Experience at future experience', location: isArabic ? 'دبي' : 'Dubai', rating: 4.7, image: recommendImg2 },
    { id: 3, title: isArabic ? 'صالة عرض أرماني' : 'Armani Showroom', category: isArabic ? 'تسوق' : 'Shopping', description: isArabic ? 'من التصميم الحضري في أبوظبي' : 'From urban design at Abu Dhabi', location: isArabic ? 'أبوظبي' : 'Abu Dhabi', rating: 4.6, image: recommendImg3 },
    { id: 4, title: isArabic ? 'منتجع اليوغا والصحة' : 'Yoga & Wellness Retreat', category: isArabic ? 'أنشطة' : 'Activities', description: isArabic ? 'كثف الممتلكات الخارجية في 2025' : 'Intensify outdoor property at 2025', location: isArabic ? 'العين' : 'Al Ain', rating: 4.9, image: recommendImg4 },
    { id: 5, title: isArabic ? 'دبي مول' : 'The Dubai Mall', category: isArabic ? 'تسوق' : 'Shopping', description: isArabic ? 'المدينة الأيقونية النابضة بالحياة' : "World's iconic city vibrant", location: isArabic ? 'دبي' : 'Dubai', rating: 4.5, image: recommendImg5 }
  ];

  const esaadOffers = [
    { id: 1, title: isArabic ? 'دبي مول - خصم 20٪' : 'Dubai Mall - 20% Off', discount: isArabic ? 'خصم 20٪' : '20% Off', category: isArabic ? 'تسوق' : 'Shopping', company: isArabic ? 'دبي مول' : 'Dubai Mall', validUntil: '2025-12-31', image: recommendImg1 },
    { id: 2, title: isArabic ? 'طيران الإمارات - أسعار خاصة' : 'Emirates Airlines - Special Rates', discount: isArabic ? 'خصم 25٪' : '25% Off', category: isArabic ? 'سفر' : 'Travel', company: isArabic ? 'طيران الإمارات' : 'Emirates', validUntil: '2025-12-25', image: recommendImg2 },
    { id: 3, title: isArabic ? 'فيتنس فيرست - خصم 30٪' : 'Fitness First - 30% Discount', discount: isArabic ? 'خصم 30٪' : '30% Off', category: isArabic ? 'صحة' : 'Health', company: isArabic ? 'فيتنس فيرست' : 'Fitness First', validUntil: '2025-12-15', image: recommendImg3 },
  ];

  if (selectedAnnouncementId !== null) {
    return <AnnouncementDetailPage announcementId={selectedAnnouncementId} onBack={() => setSelectedAnnouncementId(null)} />;
  }

  if (selectedNewsId !== null) {
    return <MediaNewsDetailPage newsId={selectedNewsId} onBack={() => setSelectedNewsId(null)} />;
  }

  if (showJobPostings) {
    return <JobPostingsPage onBack={() => setShowJobPostings(false)} />;
  }

  const peopleSpotlight = [
    ...newEmployees.map(emp => ({ ...emp, type: 'New Face', icon: Users, color: '#8cd4e4' })),
    ...workAnniversaries.map(emp => ({ ...emp, type: 'Anniversary', icon: Award, color: '#ec2227' }))
  ];

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: `url(${bgPattern})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundColor: '#f8f9fa',
        fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif'
      }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Hero Banner - Not Full Width */}
      <div className="px-20 pt-6">
        <HeroBanner />
      </div>

      {/* Quick Links - Full Width First Row */}
      <div className="px-20 pt-6" dir={isArabic ? 'rtl' : 'ltr'}>
        <Card className="faa-card border-0 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[rgba(123,40,45,0.1)] flex items-center justify-center">
                <ExternalLink className="h-4 w-4 text-[#7b282d]"/>
              </div>
              <h3 className="text-lg text-[#000000]" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{t.quickLinks}</h3>
            </div>
            <Button 
              variant="link" 
              className="text-[#7b282d] text-xs p-0 h-auto hover:underline" 
              onClick={() => onNavigate?.('automation')}
              style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}
            >
              {t.viewAll}
            </Button>
          </div>
          
          {/* Quick Links Grid - Full Width */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
            {[
              { name: 'FAA Website', icon: ExternalLink, bgColor: 'bg-[#f8e8e9]', iconColor: 'text-[#971b1e]' },
              { name: 'TeamMate', icon: Users, bgColor: 'bg-[#e8f1f5]', iconColor: 'text-[#4a7c9d]' },
              { name: 'Email on Web', icon: Mail, bgColor: 'bg-[#e0f5f5]', iconColor: 'text-[#01949a]' },
              { name: 'IT Helpdesk', icon: Phone, bgColor: 'bg-[#f0f0ee]', iconColor: 'text-[#6b6b5f]' },
              { name: 'Tarasul', icon: FileText, bgColor: 'bg-[#fef5e8]', iconColor: 'text-[#d4a056]' },
              { name: 'Dashboard', icon: TrendingUp, bgColor: 'bg-[#e0f2f7]', iconColor: 'text-[#0277bd]' },
              { name: 'Survey System', icon: ClipboardList, bgColor: 'bg-[#f3e8f0]', iconColor: 'text-[#8e4585]' },
              { name: 'GRP', icon: Target, bgColor: 'bg-[#e8f5e9]', iconColor: 'text-[#43a047]' },
              { name: 'AI System', icon: Star, bgColor: 'bg-[#fff8e1]', iconColor: 'text-[#f9a825]' },
              { name: 'Waee', icon: UserCircle, bgColor: 'bg-[#ede7f6]', iconColor: 'text-[#5e35b1]' }
            ].map((link, index) => {
              const IconComponent = link.icon;
              return (
                <button
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-lg hover:border-[#7b282d]/30 hover:shadow-md hover:bg-gray-50 transition-all group"
                  onClick={() => onNavigate?.('automation')}
                >
                  <div className={`w-10 h-10 rounded-lg ${link.bgColor} flex items-center justify-center transition-all`}>
                    <IconComponent className={`h-5 w-5 ${link.iconColor}`} />
                  </div>
                  <span className="text-xs text-[#000000] group-hover:text-[#7b282d] transition-colors text-center">{link.name}</span>
                </button>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Services Section - Figma Design */}
      

      

        {/* SECONDARY BLOCK: Corporate Updates with Media Gallery */}
        <div className="grid grid-cols-12 gap-5  px-20 pt-6" dir={isArabic ? 'rtl' : 'ltr'}>
          
          {/* LEFT COLUMN: 8 cols - Corporate Updates (bigger height: 750px) */}
          <div className="col-span-8">
            <Card className="faa-card border-0 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex flex-col" style={{ height: '557px' }}>
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(123,40,45,0.1)] flex items-center justify-center">
                    <Megaphone className="h-4 w-4 text-[#7b282d]" />
                  </div>
                  <h3 className="text-lg text-[#000000]" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{t.corporateUpdates}</h3>
                </div>
              </div>

              <Tabs defaultValue="announcements" className="w-full flex-1 flex flex-col">
                <TabsList className="bg-gray-100 rounded-lg p-1 h-9 w-full grid grid-cols-4 mb-4">
                  <TabsTrigger value="announcements" className="text-xs rounded-md" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{t.announcements}</TabsTrigger>
                  <TabsTrigger value="news" className="text-xs rounded-md" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{t.mediaNews}</TabsTrigger>
                  <TabsTrigger value="policy" className="text-xs rounded-md" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{t.policyUpdates}</TabsTrigger>
                  <TabsTrigger value="legislation" className="text-xs rounded-md" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{t.lawsLegislation}</TabsTrigger>
                </TabsList>

                <TabsContent value="announcements" className={`mt-0 flex-1 overflow-auto faa-scroll ${isArabic ? 'pl-2' : 'pr-2'}`}>
                  <div className="space-y-3 overflow-y-auto faa-scroll">
                    {announcements.map((announcement) => (
                      <div
                        key={announcement.id}
                        className="bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-[#7b282d]/30 hover:shadow-sm transition-all group"
                        onClick={() => setSelectedAnnouncementId(announcement.id)}
                        dir={isArabic ? 'rtl' : 'ltr'}
                      >
                        <div className={`flex items-center gap-2 mb-2 `}>
                          <Badge className="bg-[#ec2227] hover:bg-[#ec2227] text-xs h-5 px-2" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{announcement.category}</Badge>
                          <span className="text-xs text-gray-500" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{announcement.date}</span>
                        </div>
                        <h4 className={`text-sm text-[#000000] mb-1 group-hover:text-[#7b282d] ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{announcement.title}</h4>
                        <p className={`text-xs text-gray-600 line-clamp-1 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{announcement.excerpt}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="news" className={`mt-0 flex-1 overflow-auto faa-scroll ${isArabic ? 'pl-2' : 'pr-2'}`}>
                  <div className="grid grid-cols-2 gap-3">
                    {mediaNews.map((news) => (
                      <div 
                        key={news.id} 
                        className="bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-[#7b282d]/30 hover:shadow-sm transition-all group"
                        onClick={() => setSelectedNewsId(news.id)}
                        dir={isArabic ? 'rtl' : 'ltr'}
                      >
                        <div className={`flex items-center gap-2 mb-2 `}>
                          <Badge className="bg-[#ec2227] hover:bg-[#ec2227] text-xs h-5 px-2" style={{ backgroundColor: news.categoryColor, fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{news.category}</Badge>
                          <span className="text-xs text-gray-500" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{news.date}</span>
                        </div>
                        <h4 className={`text-sm text-[#000000] mb-1 line-clamp-2 group-hover:text-[#7b282d] ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{news.title}</h4>
                        <p className={`text-xs text-gray-600 line-clamp-2 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{news.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="policy" className={`mt-0 flex-1 overflow-auto faa-scroll ${isArabic ? 'pl-2' : 'pr-2'}`}>
                  <div className="space-y-3">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-[#7b282d]/30 hover:shadow-sm transition-all" dir={isArabic ? 'rtl' : 'ltr'}>
                      <div className={`flex items-center gap-2 mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <Badge className="bg-[#ec2227] hover:bg-[#ec2227] text-xs h-5 px-2" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'سياسة' : 'Policy'}</Badge>
                        <span className="text-xs text-gray-500" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>2025-11-26</span>
                      </div>
                      <h4 className={`text-sm text-[#000000] mb-1 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'إرشادات العمل عن بعد v2.1' : 'Remote Work Guidelines v2.1'}</h4>
                      <p className={`text-xs text-gray-600 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'إرشادات محدثة لترتيبات العمل الهجين وأفضل الممارسات للتعاون عن بعد.' : 'Updated guidelines for hybrid work arrangements and remote collaboration best practices.'}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-[#7b282d]/30 hover:shadow-sm transition-all" dir={isArabic ? 'rtl' : 'ltr'}>
                      <div className={`flex items-center gap-2 mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <Badge className="bg-[#7b282d] hover:bg-[#7b282d] text-xs h-5 px-2" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'سياسة' : 'Policy'}</Badge>
                        <span className="text-xs text-gray-500" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>2025-11-22</span>
                      </div>
                      <h4 className={`text-sm text-[#000000] mb-1 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'تحديث سياسة أمن البيانات' : 'Data Security Policy Update'}</h4>
                      <p className={`text-xs text-gray-600 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'تدابير محسّنة لحماية البيانات وبروتوكولات الأمان لجميع الإدارات.' : 'Enhanced data protection measures and security protocols for all departments.'}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="legislation" className="mt-0">
                  {/* Nested Tabs for Laws & Legislation */}
                  <Tabs defaultValue="laws" className="w-full">
                    <TabsList className="bg-gray-50 rounded-lg p-1 h-8 w-full grid grid-cols-2 mb-3">
                      <TabsTrigger value="laws" className="text-xs rounded-md" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'القوانين' : 'Laws'}</TabsTrigger>
                      <TabsTrigger value="journals" className="text-xs rounded-md" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'الجريدة الرسمية' : 'Official Journals'}</TabsTrigger>
                      
                    </TabsList>

                    <TabsContent value="laws" className="mt-0">
                      <div className="space-y-2">
                        <div className="bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-[#7b282d]/30 hover:shadow-sm transition-all" dir={isArabic ? 'rtl' : 'ltr'}>
                          <div className={`flex items-center gap-2 mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                            <Badge className="bg-[#7b282d] hover:bg-[#7b282d] text-xs h-5 px-2" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'جديد' : 'New'}</Badge>
                            <span className="text-xs text-gray-500" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>2025-11-25</span>
                          </div>
                          <h4 className={`text-sm text-[#000000] mb-1 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'القانون الاتحادي رقم 15 لسنة 2025' : 'Federal Law No. 15 of 2025'}</h4>
                          <p className={`text-xs text-gray-600 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'لوائح مكافحة غسل الأموال ومتطلبات الامتثال للجهات الحكومية.' : 'Anti-Money Laundering regulations and compliance requirements for government entities.'}</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-[#7b282d]/30 hover:shadow-sm transition-all" dir={isArabic ? 'rtl' : 'ltr'}>
                          <div className={`flex items-center gap-2 mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                            <Badge className="bg-[#971b1e] hover:bg-[#971b1e] text-xs h-5 px-2" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'قانون' : 'Law'}</Badge>
                            <span className="text-xs text-gray-500" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>2025-11-20</span>
                          </div>
                          <h4 className={`text-sm text-[#000000] mb-1 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'المرسوم بقانون اتحادي رقم 12 لسنة 2025' : 'Federal Decree-Law No. 12 of 2025'}</h4>
                          <p className={`text-xs text-gray-600 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'تحديثات إطار الحوكمة والمساءلة في القطاع العام.' : 'Public sector governance and accountability framework updates.'}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="journals" className="mt-0">
                      <div className="space-y-2">
                        <div className="bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-[#7b282d]/30 hover:shadow-sm transition-all" dir={isArabic ? 'rtl' : 'ltr'}>
                          <div className={`flex items-center gap-2 mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                            <Badge className="bg-[#0A7544] hover:bg-[#0A7544] text-xs h-5 px-2" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'محلي' : 'Local'}</Badge>
                            <span className="text-xs text-gray-500" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>2025-11-23</span>
                          </div>
                          <h4 className={`text-sm text-[#000000] mb-1 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'قانون دبي رقم 8 لسنة 2025' : 'Dubai Law No. 8 of 2025'}</h4>
                          <p className={`text-xs text-gray-600 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'تعديل على لوائح المشتريات والمناقصات العامة في دبي.' : 'Amendment to public procurement and tendering regulations in Dubai.'}</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-[#7b282d]/30 hover:shadow-sm transition-all" dir={isArabic ? 'rtl' : 'ltr'}>
                          <div className={`flex items-center gap-2 mb-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                            <Badge className="bg-[#0A7544] hover:bg-[#0A7544] text-xs h-5 px-2" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'محلي' : 'Local'}</Badge>
                            <span className="text-xs text-gray-500" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>2025-11-18</span>
                          </div>
                          <h4 className={`text-sm text-[#000000] mb-1 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'قانون أبوظبي رقم 6 لسنة 2025' : 'Abu Dhabi Law No. 6 of 2025'}</h4>
                          <p className={`text-xs text-gray-600 ${isArabic ? 'text-right' : 'text-left'}`} style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'معايير الامتثال البيئي للمرافق الحكومية.' : 'Environmental compliance standards for government facilities.'}</p>
                        </div>
                      </div>
                    </TabsContent>

                    
                  </Tabs>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* RIGHT COLUMN: 4 cols - Media Gallery */}
          <div className="col-span-4" style={{ height: '557px' }}>
            {/* Media Gallery - Full Height */}
            <Card className="faa-card border-0 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex flex-col h-full">
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(123,40,45,0.1)] flex items-center justify-center">
                    <ImageIcon className="h-4 w-4 text-[#7b282d]"/>
                  </div>
                  <h3 className="text-lg text-[#000000]" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{t.mediaGallery}</h3>
                </div>
                <Button 
                  variant="link" 
                  className="text-[#7b282d] text-xs p-0 h-auto hover:underline" 
                  onClick={onMediaGalleryClick}
                  style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}
                >
                  {t.seeMore}
                </Button>
              </div>
              
              {/* Gallery Layout: 1 Large + 3 Small */}
              <div className="flex-1 flex flex-col gap-2.5">
                {/* Large Image */}
                <div 
                  className="h-[300px] rounded-lg overflow-hidden cursor-pointer group shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
                  onClick={() => {
                    setSelectedGalleryIndex(0);
                    setGalleryModalOpen(true);
                  }}
                >
                  <img 
                    src={galleryImages[0].src} 
                    alt={galleryImages[0].alt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                
                {/* Three Small Images */}
                <div className="flex gap-2.5 h-[117px]">
                  {galleryImages.slice(1, 4).map((image, idx) => (
                    <div
                      key={image.id}
                      className="flex-1 rounded-lg overflow-hidden cursor-pointer group shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] bg-gradient-to-b from-[#cceaf2] to-[#8cd4e4]"
                      onClick={() => {
                        setSelectedGalleryIndex(idx + 1);
                        setGalleryModalOpen(true);
                      }}
                    >
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            
            
          </div>
        </div>
{/* Main Content - Modern Intranet Layout */}
      <div className="px-20 py-6" dir={isArabic ? 'rtl' : 'ltr'}>
        {/* PRIMARY BLOCK: Events & Activities with Employee/Esaad Offers (1134px total height) */}
        <div className="grid grid-cols-12 gap-5 mb-5">
          
          {/* LEFT COLUMN: 8 cols - Events & Activities (1134px) */}
          <div className="col-span-8 flex flex-col" style={{ height: '557px' }}>
            
            {/* Events & Activities - Full 1134px */}
            <Card className="faa-card border-0 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] flex flex-col h-full">
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(123,40,45,0.1)] flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-[#7b282d]" />
                  </div>
                  <h3 className="text-lg text-[#000000]" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{t.calendar}</h3>
                </div>
              </div>

              <div className="flex gap-4 flex-1 min-h-0">
                {/* Calendar Section */}
                <div className="flex flex-col" style={{ width: '290px' }}>
  {/* Compact Calendar */}
  <div
    className="relative rounded-[10px] p-3 flex-1"
    style={{
      backgroundImage:
        "linear-gradient(130.575deg, rgba(204, 234, 242, 0.2) 0%, rgb(255, 255, 255) 100%)",
    }}
  >
    <div className="absolute inset-0 border border-[#e5e7eb] rounded-[10px]" />

    <div className="relative flex flex-col gap-3 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[18px] font-normal text-[#0a0a0a]" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>
          {currentMonth.toLocaleString(isArabic ? "ar-AE" : "en-US", {
            month: "long",
          }).toUpperCase()}{" "}
          {currentMonth.getFullYear()}
        </p>

        <div className="flex gap-1">
          <button
            onClick={goToPreviousMonth}
            className="size-[28px] rounded-[6.8px] border border-[#e5e5e5] bg-white hover:bg-gray-50 flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4 text-[#0a0a0a]" />
          </button>
          <button
            onClick={goToNextMonth}
            className="size-[28px] rounded-[6.8px] border border-[#e5e5e5] bg-white hover:bg-gray-50 flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4 text-[#0a0a0a]" />
          </button>
        </div>
      </div>

      {/* Calendar Container */}
      <div className="bg-white rounded-[10px] border border-[#e5e7eb] p-2 flex-1">
        {/* Day Headers */}
        <div className="grid grid-cols-7 text-center mb-1">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <span
              key={`day-${index}`}
              className="text-[12px] text-[#6a7282] leading-[16px]"
            >
              {day}
            </span>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1 h-full">
          {/* Empty slots */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const hasEvents = hasEventsOnDate(day);
            const isSelected = selectedDate === day;

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(day)}
                className={`
                  h-[40px] rounded-[6.8px] flex flex-col items-center justify-center
                  transition-all
                  ${
                    isSelected
                      ? "bg-[#7b282d] text-white shadow"
                      : hasEvents
                      ? "bg-[#dbeafe] hover:bg-[#bfdbfe]"
                      : "hover:bg-gray-100"
                  }
                `}
              >
                <span
                  className={`text-[12px] ${
                    isSelected
                      ? "text-white"
                      : hasEvents
                      ? "text-[#1c398e]"
                      : "text-[#364153]"
                  }`}
                >
                  {day}
                </span>

                {hasEvents && !isSelected && (
                  <span className="size-[4px] bg-[#7b282d] rounded-full mt-[2px]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 pt-1">
        <div className="flex items-center gap-2">
          <span className="size-[12px] rounded-[4px] bg-[#8cd4e4]" />
          <span className="text-[12px] text-[#4a5565]">Today</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="size-[12px] rounded-[4px] bg-[#dbeafe] border border-[#bedbff]" />
          <span className="text-[12px] text-[#4a5565]">Has Events</span>
        </div>
      </div>
    </div>
  </div>
                </div>

                {/* Events List - Redesigned */}
                <div className="flex-1 space-y-2.5 overflow-y-auto faa-scroll pr-2 py-1">
                  {(getEventsForDate(selectedDate).length > 0 ? getEventsForDate(selectedDate) : upcomingEvents).map((event) => {
                    const urgency = getCountdownUrgency(event.id);
                    const cd = eventCountdowns[event.id];
                    
                    return (
                      <div 
                        key={event.id} 
                        className={`
                          group relative bg-white rounded-[10px] p-3 flex gap-3 
                          transition-all duration-300 cursor-pointer
                          ${urgency === 'critical' ? 'border-2 border-[#971b1e] shadow-md' : 
                            urgency === 'urgent' ? 'border-2 border-[#971b1e]/60 shadow-sm' :
                            urgency === 'soon' ? 'border border-[#7b282d]/40' :
                            'border border-gray-200'}
                          hover:shadow-lg hover:border-[#7b282d] hover:-translate-y-0.5
                        `}
                      >
                        {/* Event Image - 80x80px */}
                        <div className="w-20 h-20 rounded-[8px] overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#cceaf2]/40 to-[#8cd4e4]/60 relative">
                          <ImageWithFallback 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                        </div>
                        
                        {/* Main Content with space reserved for countdown */}
                        <div className="flex-1 min-w-0 flex flex-col ">
                          {/* Title & Category Badge */}
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-[13px] text-[#1a1a1a] leading-[1.4] pr-2 group-hover:text-[#7b282d] transition-colors">
                              {event.title}
                            </h4>
                            <Badge 
                              className="text-[9px] px-2 py-0.5 flex-shrink-0 uppercase tracking-wider" 
                              style={{ backgroundColor: event.color }}
                            >
                              {event.category}
                            </Badge>
                          </div>
                          
                          {/* Description */}
                          <p className="text-[11px] text-[#6b7280] mb-2 leading-[1.5] line-clamp-1 pr-20">
                            {getEventDescription(event.id)}
                          </p>
                          
                          {/* Meta Row - Time & Location */}
                          <div className="flex items-center gap-3 mb-auto">
                            <div className="flex items-center gap-1 text-[10px] text-[#4b5563]">
                              <Clock className="h-3 w-3 text-[#7b282d]/60" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-[#4b5563] flex-1 min-w-0">
                              <MapPin className="h-3 w-3 text-[#7b282d]/60 flex-shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Countdown Timer - Bottom Right */}
                        {cd && (
                          <div className="absolute bottom-3 right-3">
                            <div 
                              className={`
                                flex items-center gap-1 rounded-[6px] px-2.5 py-1.5
                                transition-all duration-300
                                ${urgency === 'critical' 
                                  ? 'bg-[#971b1e]/15 border-2 border-[#971b1e] shadow-sm group-hover:shadow-md group-hover:bg-[#971b1e]/20' 
                                  : urgency === 'urgent'
                                  ? 'bg-[#971b1e]/10 border border-[#971b1e]/70 group-hover:border-[#971b1e] group-hover:bg-[#971b1e]/15'
                                  : urgency === 'soon'
                                  ? 'bg-[#7b282d]/8 border border-[#7b282d]/50 group-hover:border-[#7b282d]/70 group-hover:bg-[#7b282d]/12'
                                  : 'bg-gray-50 border border-gray-300 group-hover:border-[#7b282d]/40 group-hover:bg-[#7b282d]/5'}
                              `}
                            >
                              {cd.days > 0 && (
                                <>
                                  <span className={`text-[11px] tabular-nums ${urgency === 'critical' || urgency === 'urgent' ? 'text-[#971b1e]' : urgency === 'soon' ? 'text-[#7b282d]' : 'text-[#4b5563]'}`}>
                                    {cd.days}d
                                  </span>
                                  <span className={`text-[11px] tabular-nums ${urgency === 'critical' || urgency === 'urgent' ? 'text-[#971b1e]' : urgency === 'soon' ? 'text-[#7b282d]' : 'text-[#4b5563]'}`}>
                                    {String(cd.hours).padStart(2, '0')}h
                                  </span>
                                </>
                              )}
                              {cd.days === 0 && cd.hours > 0 && (
                                <>
                                  <span className={`text-[11px] tabular-nums ${urgency === 'critical' || urgency === 'urgent' ? 'text-[#971b1e]' : 'text-[#7b282d]'}`}>
                                    {String(cd.hours).padStart(2, '0')}h
                                  </span>
                                  <span className={`text-[11px] tabular-nums ${urgency === 'critical' || urgency === 'urgent' ? 'text-[#971b1e]' : 'text-[#7b282d]'}`}>
                                    {String(cd.minutes).padStart(2, '0')}m
                                  </span>
                                </>
                              )}
                              {cd.days === 0 && cd.hours === 0 && (
                                <>
                                  <span className="text-[11px] tabular-nums text-[#971b1e]">
                                    {String(cd.minutes).padStart(2, '0')}m
                                  </span>
                                  <span className="text-[11px] tabular-nums text-[#971b1e]">
                                    {String(cd.seconds).padStart(2, '0')}s
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

          </div>

          {/* RIGHT COLUMN: 4 cols - Offers with Tabs */}
          <div className="col-span-4" style={{ height: '557px' }}>
            <Card className="faa-card border-0 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center gap-2 ">
                <div className="w-8 h-8 rounded-lg bg-[rgba(123,40,45,0.1)] flex items-center justify-center">
                  <Gift className="h-4 w-4 text-[#7b282d]" />
                </div>
                <h3 className="text-lg text-[#000000]" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'العروض' : 'Offers'}</h3>
              </div>

              <Tabs defaultValue="esaad" className="w-full flex-1 flex flex-col">
                <TabsList className="bg-gray-100 rounded-lg p-1 h-9 w-full grid grid-cols-2 mb-4">
                  <TabsTrigger value="esaad" className="text-xs rounded-md" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'إسعاد' : 'Esaad'}</TabsTrigger>
                  <TabsTrigger value="other" className="text-xs rounded-md" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'عروض أخرى' : 'Other Offers'}</TabsTrigger>
                </TabsList>

                <TabsContent value="esaad" className="mt-0 flex-1 overflow-auto faa-scroll pr-1">
                  <div className="flex flex-col gap-2.5">
                    {[
                      { title: 'Dubai Mall', company: 'Shopping', discount: '20% Off' },
                      { title: 'Emirates Airlines', company: 'Travel', discount: '25% Off' },
                      { title: 'Fitness First', company: 'Health', discount: '30% Off' },
                      { title: 'Carrefour', company: 'Grocery', discount: '15% Off' }
                    ].map((offer, i) => (
                      <div key={i} className="bg-white border border-[#e5e7eb] rounded-lg p-4 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg text-black">{offer.title}</h4>
                          <div className="bg-[#ec2227] rounded-lg px-2.5 py-0.5">
                            <p className="text-xs text-white">{offer.discount}</p>
                          </div>
                        </div>
                        <p className="text-base text-[#4b5563]">{offer.company}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="other" className="mt-0 flex-1 overflow-auto faa-scroll pr-1">
                  <div className="flex flex-col gap-2.5">
                    {[
                      { title: 'Gym Membership', company: 'FitLife Gym', discount: '30% Off' },
                      { title: 'Fine Dining', company: 'Premium Restaurants', discount: '20% Off' },
                      { title: 'Health Insurance', company: 'HealthCare Plus', discount: '15% Off' },
                      { title: 'Education', company: 'Learning Center', discount: '25% Off' }
                    ].map((offer, i) => (
                      <div key={i} className="bg-white border border-[#e5e7eb] rounded-lg p-4 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg text-black">{offer.title}</h4>
                          <div className="bg-[#ec2227] rounded-lg px-2.5 py-0.5">
                            <p className="text-xs text-white">{offer.discount}</p>
                          </div>
                        </div>
                        <p className="text-base text-[#4b5563]">{offer.company}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
        {/* People Spotlight - Full Width */}
        <Card className="faa-card border-0 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] mb-5">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[rgba(123,40,45,0.1)] flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                    <path d={peopleSvgPaths.p32887f80} stroke="#7B282D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    <path d={peopleSvgPaths.p35b3faa0} stroke="#7B282D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    <path d={peopleSvgPaths.p188b8380} stroke="#7B282D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    <path d={peopleSvgPaths.p3694d280} stroke="#7B282D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  </svg>
                </div>
                <h3 className="text-2xl text-black" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{t.peopleSpotlight}</h3>
              </div>

              {/* 3-Column Grid */}
              <div className="grid grid-cols-3 gap-5">
                
                {/* Section 1: New Faces */}
                <div className="bg-[#f8f9fa] rounded-lg pt-5 px-0 border border-[#f3f4f6] h-fit">
                  <div className="flex items-center justify-between mb-4 px-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-[rgba(1,148,154,0.1)] flex items-center justify-center">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
                          <path d={peopleSvgPaths.p317fdd80} stroke="#01949A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                          <path d={peopleSvgPaths.pc62e8b0} stroke="#01949A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                          <path d={peopleSvgPaths.pe97dd00} stroke="#01949A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                          <path d={peopleSvgPaths.p31c78b80} stroke="#01949A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                        </svg>
                      </div>
                      <h5 className="text-xl text-black" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{t.newFaces}</h5>
                    </div>
                    {/* Navigation Arrows */}
                    <div className="flex gap-1.5">
                      <button 
                        onClick={() => setNewFacesSlide(Math.max(0, newFacesSlide - 1))}
                        className="w-6 h-6 rounded-full bg-white opacity-30 border border-[#e5e7eb] flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={newFacesSlide === 0}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
                          <path d="M8.75 10.5L5.25 7L8.75 3.5" stroke="#4B5563" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => setNewFacesSlide(Math.min(newEmployees.length - 1, newFacesSlide + 1))}
                        className="w-6 h-6 rounded-full bg-white border border-[#e5e7eb] flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={newFacesSlide >= newEmployees.length - 1}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
                          <path d="M5.25 10.5L8.75 7L5.25 3.5" stroke="#4B5563" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* New Faces - Single Card */}
                  <div>
                    {newEmployees[newFacesSlide] && (
                      <div className="bg-white rounded-lg p-4 border border-[#f3f4f6] text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[rgba(1,148,154,0.1)] mb-1">
                          <span className="text-xs text-[#01949a] uppercase tracking-wider" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{t.new}</span>
                        </div>
                        {/* Avatar with Initials */}
                        <div className="w-[70px] h-[70px] rounded-full bg-gradient-to-br from-[rgba(1,148,154,0.2)] to-[rgba(6,67,104,0.2)] flex items-center justify-center mx-auto mb-1">
                          <span className="text-xl text-[#064368]">{newEmployees[newFacesSlide].name.split(' ').map((n: string) => n[0]).join('')}</span>
                        </div>
                        {/* Name */}
                        <h5 className="text-lg text-black text-center mb-0">{newEmployees[newFacesSlide].name}</h5>
                        {/* Role */}
                        <p className="text-base text-[#6b7280] text-center mb-0">{newEmployees[newFacesSlide].role}</p>
                        {/* Department */}
                        <p className="text-base text-[#9ca3af] text-center">{newEmployees[newFacesSlide].department}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 2: Employee of the Month */}
                <div className="bg-[#fffbf0] rounded-lg pt-5 px-0 border border-[#f3f4f6] h-fit">
                  <div className="flex items-center gap-2 mb-4 px-5">
                    <div className="w-6 h-6 rounded-md bg-[rgba(212,175,55,0.15)] flex items-center justify-center">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
                        <path d={peopleSvgPaths.p2763a240} fill="#D4AF37" stroke="#D4AF37" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                      </svg>
                    </div>
                    <h5 className="text-xl text-black" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{t.employeeOfMonth}</h5>
                  </div>

                  {/* Employee Card */}
                  <div className="bg-white rounded-lg p-4 border border-[#f3f4f6] text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-[rgba(212,175,55,0.1)] to-[rgba(245,158,11,0.1)] mb-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
                        <path d={peopleSvgPaths.p13ef6900} stroke="#D4AF37" strokeLinecap="round" strokeLinejoin="round" />
                        <path d={peopleSvgPaths.p5086800} stroke="#D4AF37" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[10px] text-[#d4af37] uppercase tracking-wider" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{t.starPerformer}</span>
                    </div>
                    {/* Avatar with Initials */}
                    <div className="w-[70px] h-[70px] rounded-full bg-[#fbedd1] flex items-center justify-center mx-auto mb-1">
                      <span className="text-xl text-[#d4af37]">{employeeOfMonth.name.split(' ').map((n: string) => n[0]).join('')}</span>
                    </div>
                    {/* Name */}
                    <h5 className="text-lg text-black mb-0">{employeeOfMonth.name}</h5>
                    {/* Role */}
                    <p className="text-base text-[#6b7280] mb-0">{employeeOfMonth.role}</p>
                    {/* Achievement */}
                    <p className="text-base text-[#9ca3af]" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{t.outstandingPerformance}</p>
                  </div>
                </div>

                {/* Section 3: Celebrations */}
                <div className="bg-[#f5f3ff] rounded-lg pt-5 px-0 border border-[#f3f4f6] h-fit">
                  <div className="flex items-center justify-between mb-4 px-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-[rgba(139,92,246,0.1)] flex items-center justify-center">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
                          <path d={peopleSvgPaths.p38f58bd0} stroke="#8B5CF6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                          <path d={peopleSvgPaths.p11188400} stroke="#8B5CF6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                        </svg>
                      </div>
                      <h5 className="text-xl text-black" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{t.celebrations}</h5>
                    </div>
                    {/* Navigation Arrows */}
                    <div className="flex gap-1.5">
                      <button 
                        onClick={() => setCelebrationsSlide(Math.max(0, celebrationsSlide - 1))}
                        className="w-6 h-6 rounded-full bg-white opacity-30 border border-[#e5e7eb] flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={celebrationsSlide === 0}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
                          <path d="M8.75 10.5L5.25 7L8.75 3.5" stroke="#4B5563" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => {
                          const totalItems = workAnniversaries.length + celebrations.length;
                          setCelebrationsSlide(Math.min(totalItems - 1, celebrationsSlide + 1));
                        }}
                        className="w-6 h-6 rounded-full bg-white border border-[#e5e7eb] flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        disabled={celebrationsSlide >= workAnniversaries.length + celebrations.length - 1}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
                          <path d="M5.25 10.5L8.75 7L5.25 3.5" stroke="#4B5563" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Celebration Card */}
                  <div>
                    {(() => {
                      const allCelebrations = [
                        ...workAnniversaries.map(emp => ({
                          type: isArabic ? 'الذكرى السنوية' : 'Anniversary',
                          name: emp.name,
                          detail: `${emp.years} ${isArabic ? 'سنوات الخدمة' : 'Years of Service'}`,
                          department: isArabic ? 'قسم المالية' : 'Finance Department',
                          years: emp.years,
                          color: '#8b5cf6',
                          icon: Award
                        })),
                        ...celebrations.map(cel => ({
                          type: cel.type,
                          name: cel.name,
                          detail: cel.detail,
                          department: null,
                          years: null,
                          color: cel.color,
                          icon: cel.icon
                        }))
                      ];
                      
                      const currentCelebration = allCelebrations[celebrationsSlide];
                      
                      if (!currentCelebration) return null;
                      
                      const Icon = currentCelebration.icon;
                      
                      return (
                        <div className="bg-white rounded-lg p-4 border border-[#f3f4f6] text-center">
                          {/* Badge */}
                          <div 
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-1"
                            style={{ backgroundColor: `${currentCelebration.color}08` }}
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
                              <path d={peopleSvgPaths.p13ef6900} stroke={currentCelebration.color} strokeLinecap="round" strokeLinejoin="round" />
                              <path d={peopleSvgPaths.p5086800} stroke={currentCelebration.color} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-xs uppercase tracking-wider" style={{ color: currentCelebration.color }}>
                              {currentCelebration.type === 'Anniversary' ? 'ANNIVERSARY' : currentCelebration.type.toUpperCase()}
                            </span>
                          </div>
                          {/* Avatar */}
                          <div 
                            className="w-[70px] h-[70px] rounded-full flex items-center justify-center mx-auto mb-1"
                            style={{ backgroundColor: `${currentCelebration.color}13` }}
                          >
                            {currentCelebration.years ? (
                              <div className="flex flex-col items-center leading-none">
                                <span className="text-xl" style={{ color: currentCelebration.color }}>{currentCelebration.years}</span>
                                <span className="text-xs mt-1" style={{ color: currentCelebration.color }}>Years</span>
                              </div>
                            ) : (
                              <span className="text-xl" style={{ color: currentCelebration.color }}>
                                {currentCelebration.name.split(' ').map((n: string) => n[0]).join('')}
                              </span>
                            )}
                          </div>
                          {/* Name */}
                          <h5 className="text-lg text-black mb-0">{currentCelebration.name}</h5>
                          {/* Detail */}
                          <p className="text-base text-[#6b7280] mb-0">{currentCelebration.detail}</p>
                          {/* Department */}
                          {currentCelebration.department && (
                            <p className="text-base text-[#9ca3af]">{currentCelebration.department}</p>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
        </Card>

        {/* Internal Job Postings & Condolences - Side by Side */}
        <div className="grid grid-cols-12 gap-5">
          {/* Internal Job Postings - 8 cols */}
          <div className="col-span-8">
            <Card className="faa-card border-0 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(123,40,45,0.1)] flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-[#7b282d]" />
                  </div>
                  <h3 className="text-2xl text-black" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{t.internalJobPostings}</h3>
                </div>
                <Button 
                  variant="link" 
                  className="text-[#7b282d] text-xs p-0 h-auto hover:underline" 
                  onClick={() => setShowJobPostings(true)}
                  style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}
                >
                  {t.viewAllPostings}
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {jobPostings.slice(0, 3).map((job) => (
              <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#7b282d]/30 hover:shadow-md transition-all cursor-pointer group">
                <div className="flex justify-between  mb-2">
                <h4 className="text-sm text-[#000000]  group-hover:text-[#7b282d]">{job.title}</h4>
                <Badge className="mt-3 bg-[#ec2227] hover:bg-[#ec2227] text-xs h-5 px-2">{job.level}</Badge>
                  </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Building className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-600">{job.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-600">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-600" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{isArabic ? 'الموعد النهائي' : 'Deadline'}: {job.deadline}</span>
                  </div>
                </div>
                
              </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Condolences - 4 cols */}
          <div className="col-span-4">
            <Card className="faa-card border-0 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(123,40,45,0.1)] flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                      <path d={condolencesIconPaths.p14af6540} stroke="#7B282D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </svg>
                  </div>
                  <h3 className="text-2xl text-black" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>{t.condolences}</h3>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => setCondolenceSlide(Math.max(0, condolenceSlide - 1))}
                    disabled={condolenceSlide === 0}
                    className="w-7 h-7 rounded-full bg-white border border-[#e5e5e5] flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4 text-[#0a0a0a]" />
                  </button>
                  <button 
                    onClick={() => setCondolenceSlide(Math.min(condolences.length - 1, condolenceSlide + 1))}
                    disabled={condolenceSlide >= condolences.length - 1}
                    className="w-7 h-7 rounded-full bg-white border border-[#e5e5e5] flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-4 w-4 text-[#0a0a0a]" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 h-full"
                  style={{ transform: `translateX(-${condolenceSlide * 100}%)` }}
                >
                  {condolences.map((condolence, index) => (
                    <div key={condolence.name} className="w-full flex-shrink-0 flex flex-col justify-between">
                      {/* Name and detail */}
                      <div className="mb-6">
                        <p className="text-base text-[#0a0a0a] mb-0.5">{condolence.name}</p>
                        <p className="text-base text-[#6a7282]">{condolence.detail}</p>
                      </div>

                      {/* Message */}
                      <div className="border-t border-[#e5e7eb] pt-3 mb-4">
                        <p className="text-base text-[#4a5565] italic text-center leading-relaxed" style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}>
                          {isArabic ? 'أفكارنا وصلواتنا مع زملائنا في هذا الوقت العصيب' : 'Our thoughts and prayers are with our colleagues during this difficult time'}
                        </p>
                      </div>

                      {/* Pagination dots */}
                      <div className="flex items-center justify-center gap-3">
                        {condolences.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCondolenceSlide(idx)}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${
                              idx === condolenceSlide ? 'bg-[#7b282d]' : 'bg-[#d1d5db]'
                            }`}
                            aria-label={`Go to condolence ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      <Dialog open={galleryModalOpen} onOpenChange={setGalleryModalOpen}>
        <DialogContent className="!max-w-4xl mx-auto p-0 bg-transparent border-0 [&>button]:hidden">
          <DialogTitle className="sr-only">
            {galleryImages[selectedGalleryIndex].title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {galleryImages[selectedGalleryIndex].alt}
          </DialogDescription>
          <div className="relative bg-white rounded-lg overflow-hidden">
            {/* Main Image */}
            <div className="relative aspect-video bg-black">
              <ImageWithFallback
                src={galleryImages[selectedGalleryIndex].src}
                alt={galleryImages[selectedGalleryIndex].alt}
                className="w-full h-full object-contain"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setSelectedGalleryIndex(Math.max(0, selectedGalleryIndex - 1))}
                disabled={selectedGalleryIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-6 w-6 text-[#7b282d]" />
              </button>
              
              <button
                onClick={() => setSelectedGalleryIndex(Math.min(galleryImages.length - 1, selectedGalleryIndex + 1))}
                disabled={selectedGalleryIndex === galleryImages.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-6 w-6 text-[#7b282d]" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setGalleryModalOpen(false)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
              >
                <X className="h-5 w-5 text-[#7b282d]" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {selectedGalleryIndex + 1} / {galleryImages.length}
              </div>
            </div>

            {/* Image Info */}
            <div className="p-6 bg-white">
              <div className="flex items-start justify-between gap-4 mb-1">
                <h4 className="text-base text-[#000000]">{galleryImages[selectedGalleryIndex].title}</h4>
                <button
                  onClick={() => {
                    // Create a temporary link and trigger download
                    const link = document.createElement('a');
                    link.href = galleryImages[selectedGalleryIndex].src;
                    link.download = `${galleryImages[selectedGalleryIndex].title}.jpg`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#7b282d] hover:bg-[#971b1e] text-white rounded-lg text-sm transition-colors"
                  style={{ fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif' }}
                >
                  <Download className="h-4 w-4" />
                  {isArabic ? 'تحميل' : 'Download'}
                </button>
              </div>
              <p className="text-sm text-gray-600">{galleryImages[selectedGalleryIndex].alt}</p>
            </div>

            {/* Thumbnail Strip */}
            <div className="px-6 pb-6 bg-white">
              <div className="flex gap-2 overflow-x-auto px-1 py-1">
                {galleryImages.map((image, idx) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedGalleryIndex(idx)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === selectedGalleryIndex
                        ? 'border-[#7b282d] scale-105'
                        : 'border-gray-200 hover:border-[#7b282d]/50'
                    }`}
                  >
                    <ImageWithFallback
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAnnouncementPopup} onOpenChange={setShowAnnouncementPopup}>
        <DialogContent className="!max-w-[860px] p-0 gap-0 border-0 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden bg-white rounded-[16.4px] animate-in fade-in-0 zoom-in-95 duration-200">
          <DialogTitle className="sr-only">
            Shooting Activity at Jebel Ali Shooting Club (Men Only)
          </DialogTitle>
          <DialogDescription className="sr-only">
            Join us for a shooting activity at Jebel Ali Shooting Club on Wednesday, January 15, 2026. Register now through FAA i@Service or email.
          </DialogDescription>

          <div className="relative flex">
            {/* Left Side - Image */}
            <div className="w-[396px] flex-shrink-0 p-10">
              <img
                src={recommendImg3}
                alt="Shooting Activity"
                className="w-[324px] h-[396px] object-cover rounded-[12px]"
              />
            </div>

            {/* Right Side - Content */}
            <div className="flex-1 relative py-10 pr-12">
              

              {/* Men Only Badge */}
              <div className="mb-[27px]">
                <div className="inline-flex items-center gap-2 px-[10px] py-[5.8px] rounded border border-[#d1d5db] bg-white h-[27.594px]">
                  <svg className="size-[14px]" fill="none" viewBox="0 0 14 14">
                    <g>
                      <path d={svgPaths.p100e7280} stroke="#4B5563" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                      <path d={svgPaths.p38a00300} stroke="#4B5563" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                    </g>
                  </svg>
                  <span className="  text-[11px] text-[#4b5563] tracking-[0.275px]">Men Only</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="  text-[32px] leading-[41.6px] text-[#111827] mb-[16px] max-w-[402px]">
                Shooting Activity at Jebel Ali Shooting Club
              </h2>

              {/* Description */}
              <p className="  text-[16px] leading-[25.6px] text-[#4b5563] mb-[24px] max-w-[402px]">
                Join us for a safe and competitive shooting experience at one of Dubai's premier facilities.
              </p>

              {/* Event Details */}
              <div className="flex flex-col gap-3 mb-[16px]">
                {/* Location and Time - Side by Side */}
                <div className="flex gap-[53px]">
                  <div className="flex items-center gap-3">
                    <svg className="size-4" fill="none" viewBox="0 0 16 16">
                      <g>
                        <path d={svgPaths.p14548f00} stroke="#9CA3AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d={svgPaths.p17781bc0} stroke="#9CA3AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      </g>
                    </svg>
                    <span className="  text-[15px] leading-[24px] text-[#374151]">Jebel Ali Shooting Club</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <svg className="size-4" fill="none" viewBox="0 0 16 16">
                      <g>
                        <path d="M8 4V8L10.6667 9.33333" stroke="#9CA3AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d={svgPaths.p39ee6532} stroke="#9CA3AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      </g>
                    </svg>
                    <span className="  text-[15px] leading-[24px] text-[#374151]">11:30 AM – 01:45 PM</span>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-3">
                  <svg className="size-4" fill="none" viewBox="0 0 16 16">
                    <g>
                      <path d="M5.33333 1.33333V4" stroke="#9CA3AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d="M10.6667 1.33333V4" stroke="#9CA3AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d={svgPaths.p3ee34580} stroke="#9CA3AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      <path d="M2 6.66667H14" stroke="#9CA3AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </g>
                  </svg>
                  <span className="  text-[15px] leading-[24px] text-[#374151]">Wednesday, 15 January 2026</span>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="mb-[40px]">
                <p className="text-[12px] text-[#7b282d] mb-2 tracking-[0.3px] uppercase">Event Starts In</p>
                <div className="flex gap-3">
                  <div className="flex flex-col items-center gap-1 w-14">
                    <div className="bg-white border border-[rgba(123,40,45,0.3)] rounded-[10px] w-14 h-14 flex items-center justify-center">
                      <span className="text-[24px] leading-[32px] text-[#7b282d] tabular-nums">{String(countdown.days).padStart(2, '0')}</span>
                    </div>
                    <span className="text-[12px] leading-[16px] text-[#4b5563]">Days</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 w-14">
                    <div className="bg-white border border-[rgba(123,40,45,0.3)] rounded-[10px] w-14 h-14 flex items-center justify-center">
                      <span className="text-[24px] leading-[32px] text-[#7b282d] tabular-nums">{String(countdown.hours).padStart(2, '0')}</span>
                    </div>
                    <span className="text-[12px] leading-[16px] text-[#4b5563]">Hours</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 w-14">
                    <div className="bg-white border border-[rgba(123,40,45,0.3)] rounded-[10px] w-14 h-14 flex items-center justify-center">
                      <span className="text-[24px] leading-[32px] text-[#7b282d] tabular-nums">{String(countdown.minutes).padStart(2, '0')}</span>
                    </div>
                    <span className="text-[12px] leading-[16px] text-[#4b5563]">Mins</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 w-14">
                    <div className="bg-white border border-[rgba(123,40,45,0.3)] rounded-[10px] w-14 h-14 flex items-center justify-center">
                      <span className="text-[24px] leading-[32px] text-[#7b282d] tabular-nums">{String(countdown.seconds).padStart(2, '0')}</span>
                    </div>
                    <span className="text-[12px] leading-[16px] text-[#4b5563]">Secs</span>
                  </div>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-col gap-[14px] mb-[33px] -ml-[351px] w-[767px]">
                {/* Primary Button */}
                <a
                  href="https://faa.gov.ae/i@Service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-[#7b282d] hover:bg-[#651f24] !text-white rounded-[10px] h-12   text-[15px] leading-[24px] transition-colors"
                >
                  Register Now
                </a>

                {/* Secondary Button */}
                <a
                  href="mailto:hr@faa.gov.ae?subject=Shooting Activity Registration - January 15, 2026"
                  className="flex items-center justify-center border border-[#7b282d] text-[#a94442] rounded-[10px] h-12   text-[14px] leading-[22.4px] hover:bg-[#7b282d]/5 transition-colors"
                >
                  Register via Email
                </a>
              </div>
            </div>

            {/* Footer - Centered across entire modal */}
            <p className="absolute bottom-10 left-0 right-0 text-[16px] leading-[25.6px] text-[#6b7280] text-center">
              Organized by Human Resources Department
            </p>
          </div>
        </DialogContent>
      </Dialog>


    </div>
  );
}