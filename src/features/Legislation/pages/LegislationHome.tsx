import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LegislationHero } from '../components/LegislationHero';
import { LegislationStats } from '../components/LegislationStats';
import { LegislationCategoriesGrid } from '../components/LegislationCategoriesGrid';
import { ImportantNoticeCard } from '../components/ImportantNoticeCard';
import { usePortalDialog } from '../../../shared/hooks/usePortalDialog';
import { ImportantNoticeModal } from '../components/ImportantNoticeModal';


interface LegislationHomeProps {
  fontSizeMultiplier?: number;
  userRole?: 'admin' | 'user';
}

function LegislationHome({ }: LegislationHomeProps = {}) {
  const { i18n } = useTranslation('legislation');
  const isRTL = i18n.dir() === 'rtl';
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const { show, hide } = usePortalDialog();

  // Show modal on page load
  useEffect(() => {
    show(<ImportantNoticeModal onClose={hide} />);
  }, []); // Run once on mount


  // If a category is selected, for now we just show a placeholder since we are refactoring home page
  if (selectedCategoryId) {
    return (
      <div className="p-10">
        <button onClick={() => setSelectedCategoryId(null)} className="mb-4 text-blue-500 underline">Back</button>
        <h2 className="text-xl">Selected Category ID: {selectedCategoryId}</h2>
        {/* <LegislationDocumentsPage categoryId={selectedCategoryId} ... /> */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEFEFE] mt-35" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Banner */}
      <div className=" relative">
        <LegislationHero />
      </div>

      {/* Main Content Area */}
      <div className="px-20 pt-10 pb-8 space-y-8">

        <LegislationStats />

        <LegislationCategoriesGrid onCategorySelect={setSelectedCategoryId} />

        <ImportantNoticeCard />
      </div>
    </div>
  );
}

export default LegislationHome;
