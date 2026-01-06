import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { HeroBanner } from './HeroBanner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Eye, Calendar, ChevronLeft, ChevronRight, X, Download } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import bgPattern from 'figma:asset/613a980dd47a3f6603181ce00dd0e58780fa9b8c.png';
import galleryImg1 from 'figma:asset/cb64f9a87ac606d9926884eed9a827a7172105de.png';
import galleryImg2 from 'figma:asset/95993900bf37692651b8569a31368a3269db15e2.png';
import galleryImg3 from 'figma:asset/7de74e447ed1e5b77f01506bfd62f7dabad9ae03.png';
import galleryImg4 from 'figma:asset/33f312785d773855d5dfb38d16c5cfaeeaf99931.png';
import galleryImg5 from 'figma:asset/acec061ade8f155cbb8db34fe8dfffb8b27e2e58.png';
import galleryImg6 from 'figma:asset/af9823e73d05653a993d33627758046b9fed35b3.png';

interface MediaGalleryPageProps {
  onBack: () => void;
}

type Category = 'All' | 'Events' | 'Workshops' | 'Conferences' | 'Ceremonies' | 'Internal Activities';
type MediaType = 'All' | 'Images' | 'Videos';
type SortOrder = 'Newest' | 'Oldest';

interface MediaItem {
  id: number;
  title: string;
  date: string;
  category: Exclude<Category, 'All'>;
  type: Exclude<MediaType, 'All'>;
  image: string;
  description: string;
  year: number;
  featured?: boolean;
}

export function MediaGalleryPage({ onBack }: MediaGalleryPageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedMediaType, setSelectedMediaType] = useState<MediaType>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [displayedItems, setDisplayedItems] = useState(12); // Initial items to show
  const [sortOrder, setSortOrder] = useState<SortOrder>('Newest');
  const [currentAlbumImages, setCurrentAlbumImages] = useState<MediaItem[]>([]); // Images with same title

  const translations = {
    en: {
      breadcrumbs: {
        home: 'Home',
        mediaGallery: 'Media Gallery',
      },
      title: 'Media Gallery',
      description: 'Explore our collection of images and videos documenting key events, activities, and milestones of the Financial Audit Authority.',
      filters: {
        category: 'Category',
        year: 'Year',
        mediaType: 'Media Type',
        sort: 'Sort',
        resetFilters: 'Reset Filters',
      },
      categories: {
        all: 'All',
        events: 'Events',
        workshops: 'Workshops',
        conferences: 'Conferences',
        ceremonies: 'Ceremonies',
        internalActivities: 'Internal Activities',
      },
      mediaTypes: {
        all: 'All',
        images: 'Images',
        videos: 'Videos',
      },
      featured: 'Featured Media',
      allMedia: 'All Media',
      loadMore: 'Load More',
      showing: 'Showing',
      of: 'of',
      items: 'items',
      viewImage: 'View Image',
    },
    ar: {
      breadcrumbs: {
        home: 'الرئيسية',
        mediaGallery: 'معرض الوسائط',
      },
      title: 'معرض الوسائط',
      description: 'استكشف مجموعتنا من الصور ومقاطع الفيديو التي توثق الأحداث والأنشطة والإنجازات الرئيسية لهيئة التدقيق المالي.',
      filters: {
        category: 'الفئة',
        year: 'السنة',
        mediaType: 'نوع الوسائط',
        sort: 'ترتيب',
        resetFilters: 'إعادة تعيين المرشحات',
      },
      categories: {
        all: 'الكل',
        events: 'الفعاليات',
        workshops: 'ورش العمل',
        conferences: 'المؤتمرات',
        ceremonies: 'الاحتفالات',
        internalActivities: 'الأنشطة الداخلية',
      },
      mediaTypes: {
        all: 'الكل',
        images: 'الصور',
        videos: 'الفيديوهات',
      },
      featured: 'الوسائط المميزة',
      allMedia: 'كل الوسائط',
      loadMore: 'تحميل المزيد',
      showing: 'عرض',
      of: 'من',
      items: 'عناصر',
      viewImage: 'عرض الصورة',
    },
  };

  const t = translations[language];

  // Sample media data
  const allMedia: MediaItem[] = [
    { id: 1, title: 'Executive Leadership Meeting', date: '2025-11-20', category: 'Events', type: 'Images', image: galleryImg1, description: 'Annual strategic planning session with senior leadership team', year: 2025, featured: true },
    { id: 2, title: 'Strategic Plan 2025-2028', date: '2025-11-18', category: 'Conferences', type: 'Images', image: galleryImg2, description: 'Launch of the new strategic plan for 2025-2028', year: 2025, featured: true },
    { id: 3, title: 'Team Recognition Ceremony', date: '2025-11-15', category: 'Ceremonies', type: 'Images', image: galleryImg3, description: 'Celebrating outstanding team performance and achievements', year: 2025, featured: true },
    { id: 4, title: 'Sports & Wellness Initiative', date: '2025-11-10', category: 'Internal Activities', type: 'Images', image: galleryImg4, description: 'Employee wellness program launch and sports activities', year: 2025 },
    { id: 5, title: 'Community Outreach Program', date: '2025-10-28', category: 'Events', type: 'Images', image: galleryImg5, description: 'FAA community service and outreach initiatives', year: 2025 },
    { id: 6, title: 'Innovation Workshop', date: '2025-10-15', category: 'Workshops', type: 'Images', image: galleryImg6, description: 'Digital transformation and innovation workshop series', year: 2025 },
    { id: 7, title: 'Annual Audit Summit', date: '2025-09-20', category: 'Conferences', type: 'Images', image: galleryImg1, description: 'Regional audit professionals gathering and knowledge sharing', year: 2025 },
    { id: 8, title: 'New Employee Orientation', date: '2025-09-05', category: 'Internal Activities', type: 'Images', image: galleryImg2, description: 'Welcome and onboarding program for new team members', year: 2025 },
    { id: 9, title: 'Excellence Awards Ceremony', date: '2025-08-15', category: 'Ceremonies', type: 'Images', image: galleryImg3, description: 'Annual employee excellence awards and recognition', year: 2025 },
    { id: 10, title: 'Financial Compliance Workshop', date: '2025-08-01', category: 'Workshops', type: 'Images', image: galleryImg4, description: 'Advanced financial compliance training for auditors', year: 2025 },
    { id: 11, title: 'National Day Celebration', date: '2024-12-02', category: 'Ceremonies', type: 'Images', image: galleryImg5, description: 'UAE National Day celebrations at FAA headquarters', year: 2024 },
    { id: 12, title: 'Leadership Development Program', date: '2024-11-15', category: 'Workshops', type: 'Images', image: galleryImg6, description: 'Comprehensive leadership skills development workshop', year: 2024 },
    { id: 13, title: 'International Audit Conference', date: '2024-10-20', category: 'Conferences', type: 'Images', image: galleryImg1, description: 'Global audit standards and best practices conference', year: 2024 },
    { id: 14, title: 'Team Building Event', date: '2024-09-10', category: 'Internal Activities', type: 'Images', image: galleryImg2, description: 'Annual team building activities and exercises', year: 2024 },
    { id: 15, title: 'Audit Technology Showcase', date: '2024-08-05', category: 'Events', type: 'Images', image: galleryImg3, description: 'Latest audit technology and tools demonstration', year: 2024 },
    { id: 16, title: 'Graduation Ceremony', date: '2024-07-15', category: 'Ceremonies', type: 'Images', image: galleryImg4, description: 'Professional certification program graduation', year: 2024 },
    { id: 17, title: 'Risk Management Workshop', date: '2024-06-20', category: 'Workshops', type: 'Images', image: galleryImg5, description: 'Advanced risk assessment and management training', year: 2024 },
    { id: 18, title: 'Annual General Assembly', date: '2024-05-15', category: 'Events', type: 'Images', image: galleryImg6, description: 'FAA annual general assembly and stakeholder meeting', year: 2024 },
  ];

  // Filter media based on selected filters
  const filteredMedia = allMedia.filter((item) => {
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
    const yearMatch = selectedYear === 'All' || item.year.toString() === selectedYear;
    const mediaTypeMatch = selectedMediaType === 'All' || item.type === selectedMediaType;
    return categoryMatch && yearMatch && mediaTypeMatch;
  });

  // Sort media based on selected sort order
  const sortedMedia = [...filteredMedia].sort((a, b) => {
    if (sortOrder === 'Newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });

  // Get media to display (with pagination)
  const displayedMedia = sortedMedia.slice(0, displayedItems);
  const hasMore = displayedItems < sortedMedia.length;

  const handleLoadMore = () => {
    setDisplayedItems((prev) => prev + 12);
  };

  const categories: Category[] = ['All', 'Events', 'Workshops', 'Conferences', 'Ceremonies', 'Internal Activities'];
  const years = ['All', '2025', '2024', '2023'];
  const mediaTypes: MediaType[] = ['All', 'Images', 'Videos'];
  const sortOrders: SortOrder[] = ['Newest', 'Oldest'];

  const getCategoryLabel = (category: Category) => {
    const labels: Record<Category, string> = {
      All: t.categories.all,
      Events: t.categories.events,
      Workshops: t.categories.workshops,
      Conferences: t.categories.conferences,
      Ceremonies: t.categories.ceremonies,
      'Internal Activities': t.categories.internalActivities,
    };
    return labels[category];
  };

  const getMediaTypeLabel = (type: MediaType) => {
    const labels: Record<MediaType, string> = {
      All: t.mediaTypes.all,
      Images: t.mediaTypes.images,
      Videos: t.mediaTypes.videos,
    };
    return labels[type];
  };

  const openLightbox = (index: number) => {
    const clickedItem = displayedMedia[index];
    // Find all media items with the same title from the full media list
    const albumImages = allMedia.filter(item => item.title === clickedItem.title);
    setCurrentAlbumImages(albumImages);
    // Find the index of the clicked item within the album
    const albumIndex = albumImages.findIndex(item => item.id === clickedItem.id);
    setSelectedMediaIndex(albumIndex >= 0 ? albumIndex : 0);
    setLightboxOpen(true);
  };

  const goToPrevious = () => {
    setSelectedMediaIndex((prev) => (prev > 0 ? prev - 1 : currentAlbumImages.length - 1));
  };

  const goToNext = () => {
    setSelectedMediaIndex((prev) => (prev < currentAlbumImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: isArabic ? 'Tajawal, IBM Plex Sans Arabic, Noto Sans Arabic, sans-serif' : 'Inter, system-ui, sans-serif',
        backgroundImage: `url(${bgPattern})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundColor: '#f8f9fa'
      }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Hero Banner */}
      <div className="px-20 pt-6">
        <HeroBanner 
          title={{
            en: 'Media Gallery',
            ar: 'معرض الوسائط'
          }}
          description={{
            en: 'Explore our collection of images and videos documenting key events, activities, and milestones of the Financial Audit Authority.',
            ar: 'استكشف مجموعتنا من الصور ومقاطع الفيديو التي توثق الأحداث والأنشطة والإنجازات الرئيسية لهيئة التدقيق المالي.'
          }}
        />
      </div>

      {/* Breadcrumb & Filters */}
      <div className="bg-white border-b border-gray-200 mt-6">
       

        {/* Filters */}
        <div className="px-20 py-6">
          <div className="flex flex-wrap items-center gap-6">
            {/* Category Filter Tabs */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 border-b border-gray-200">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setDisplayedItems(12); // Reset pagination
                    }}
                    className={`px-4 py-2 text-sm transition-all relative ${
                      selectedCategory === category
                        ? 'text-[#7b282d]'
                        : 'text-gray-600 hover:text-[#7b282d]'
                    }`}
                  >
                    {getCategoryLabel(category)}
                    {selectedCategory === category && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7b282d]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Secondary Filters */}
            <div className="flex items-center gap-3">
              {/* Year Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">{t.filters.year}:</label>
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    setDisplayedItems(12);
                  }}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b282d] focus:border-transparent bg-white"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Media Type Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">{t.filters.mediaType}:</label>
                <select
                  value={selectedMediaType}
                  onChange={(e) => {
                    setSelectedMediaType(e.target.value as MediaType);
                    setDisplayedItems(12);
                  }}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b282d] focus:border-transparent bg-white"
                >
                  {mediaTypes.map((type) => (
                    <option key={type} value={type}>
                      {getMediaTypeLabel(type)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Order Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">{t.filters.sort}:</label>
                <select
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value as SortOrder);
                    setDisplayedItems(12);
                  }}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b282d] focus:border-transparent bg-white"
                >
                  {sortOrders.map((order) => (
                    <option key={order} value={order}>
                      {order}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Filters Button */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedYear('All');
                    setSelectedMediaType('All');
                    setSortOrder('Newest');
                    setDisplayedItems(12);
                  }}
                  variant="outline"
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b282d] focus:border-transparent bg-white"
                >
                  {t.filters.resetFilters}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="px-20 py-8">
        

        {/* Section Title */}
        {selectedCategory === 'All' && selectedYear === 'All' && selectedMediaType === 'All' && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900">{t.allMedia}</h2>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 text-sm text-gray-600">
          {t.showing} {displayedMedia.length} {t.of} {sortedMedia.length} {t.items}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {displayedMedia.map((item, index) => (
            <div
              key={item.id}
              className="group cursor-pointer bg-white rounded-[10px] overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200"
              onClick={() => openLightbox(index)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-white/95 rounded-full p-2.5">
                      <Eye className="h-4 w-4 text-[#A94442]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs px-2 py-0.5">
                    {item.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{item.date}</span>
                  </div>
                </div>
                <h4 className="text-sm text-gray-900 line-clamp-2 group-hover:text-[#A94442] transition-colors">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              className="px-8 py-2 border-2 border-gray-300 hover:border-[#7b282d] hover:text-[#7b282d] hover:bg-transparent transition-colors"
            >
              {t.loadMore}
            </Button>
          </div>
        )}

        {/* No Results */}
        {sortedMedia.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-600">No media found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="!max-w-4xl mx-auto p-0 bg-transparent border-0 [&>button]:hidden">
          <DialogTitle className="sr-only">
            {currentAlbumImages[selectedMediaIndex]?.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {currentAlbumImages[selectedMediaIndex]?.description}
          </DialogDescription>
          <div className="relative bg-white rounded-lg overflow-hidden">
            {/* Main Image */}
            <div className="relative aspect-video bg-black">
              <ImageWithFallback
                src={currentAlbumImages[selectedMediaIndex]?.image}
                alt={currentAlbumImages[selectedMediaIndex]?.title}
                className="w-full h-full object-contain"
              />

              {/* Navigation Arrows */}
              <button
                onClick={() => setSelectedMediaIndex(Math.max(0, selectedMediaIndex - 1))}
                disabled={selectedMediaIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-6 w-6 text-[#7b282d]" />
              </button>

              <button
                onClick={() => setSelectedMediaIndex(Math.min(currentAlbumImages.length - 1, selectedMediaIndex + 1))}
                disabled={selectedMediaIndex === currentAlbumImages.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-6 w-6 text-[#7b282d]" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
              >
                <X className="h-5 w-5 text-[#7b282d]" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {selectedMediaIndex + 1} / {currentAlbumImages.length}
              </div>
            </div>

            {/* Image Info */}
            <div className="p-6 bg-white">
              <div className="flex items-start justify-between gap-4 mb-1">
                <h4 className="text-base text-[#000000]">{currentAlbumImages[selectedMediaIndex]?.title}</h4>
                <button
                  onClick={() => {
                    // Create a temporary link and trigger download
                    const link = document.createElement('a');
                    link.href = currentAlbumImages[selectedMediaIndex]?.image;
                    link.download = `${currentAlbumImages[selectedMediaIndex]?.title}.jpg`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#7b282d] hover:bg-[#971b1e] text-white rounded-lg text-sm transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
              <p className="text-sm text-gray-600">{currentAlbumImages[selectedMediaIndex]?.description}</p>
            </div>

            {/* Thumbnail Strip */}
            <div className="px-6 pb-6 bg-white">
              <div className="flex gap-2 overflow-x-auto px-1 py-1">
                {currentAlbumImages.map((image, idx) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedMediaIndex(idx)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === selectedMediaIndex
                        ? 'border-[#7b282d] scale-105'
                        : 'border-gray-200 hover:border-[#7b282d]/50'
                    }`}
                  >
                    <ImageWithFallback
                      src={image.image}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}