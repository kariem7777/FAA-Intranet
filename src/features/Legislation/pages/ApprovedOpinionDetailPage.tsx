import { useEffect, useCallback } from 'react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  fetchOpinionDetails,
  fetchLegalOpinionEntities,
  clearSelectedOpinion,
} from '../slices/legalOpinionsSlice';
import {
  LegalOpinionsHeader,
  EnquiryDetailsSidebar,
  EnquiryCard,
  ApprovedOpinionCard,
  ConversationSection,
  LegalOpinionDetailLoading,
} from '../components/LegalOpinions';

const LEGISLATION_COLORS = {
  bgOffWhite: '#F7F8FA',
};

export function ApprovedOpinionDetailPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { fontSizeMultiplier } = useAppSelector((state) => state.global);
  const { selectedOpinion, entities } = useAppSelector((state) => state.legalOpinions);

  useEffect(() => {
    if (id) {
      dispatch(fetchOpinionDetails(parseInt(id, 10)));
    }
    dispatch(fetchLegalOpinionEntities());

    return () => {
      dispatch(clearSelectedOpinion());
    };
  }, [dispatch, id]);

  const handleBack = useCallback(() => {
    navigate('/approved-opinions');
  }, [navigate]);

  const handleRetry = useCallback(() => {
    if (id) {
      dispatch(fetchOpinionDetails(parseInt(id, 10)));
    }
  }, [dispatch, id]);

  // Loading state
  if (selectedOpinion.loading) {
    return (
      <div
        className="min-h-screen"
        style={{ backgroundColor: LEGISLATION_COLORS.bgOffWhite }}
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        {/* Fixed Header */}
        <LegalOpinionsHeader
          title={t('legalOpinions.detailPageTitle')}
          onBack={handleBack}
          fontSizeMultiplier={fontSizeMultiplier}
        />

        {/* Shimmer Loading Skeleton */}
        <div className="pt-[100px] pb-20">
          <div className="max-w-[1400px] mx-auto px-8">
            <LegalOpinionDetailLoading />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (selectedOpinion.error || !selectedOpinion.data) {
    return (
      <div
        className="min-h-screen"
        style={{ backgroundColor: LEGISLATION_COLORS.bgOffWhite }}
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        <LegalOpinionsHeader
          title={t('legalOpinions.detailPageTitle')}
          onBack={handleBack}
          fontSizeMultiplier={fontSizeMultiplier}
        />

        <div className="pb-20">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3
                className="mb-2"
                style={{
                  fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif',
                  fontSize: `${18 * fontSizeMultiplier}px`,
                  fontWeight: 600,
                  color: '#1F2937',
                }}
              >
                {selectedOpinion.error || t('legalOpinions.opinionNotFound')}
              </h3>
              <Button
                onClick={handleRetry}
                className="mt-4 bg-[#2F4F6F] hover:bg-[#253D54] text-white gap-2"
                size="lg"
              >
                <RefreshCw className="w-4 h-4" />
                {t('common.retry')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const opinion = selectedOpinion.data;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: LEGISLATION_COLORS.bgOffWhite }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Fixed Header */}
      <LegalOpinionsHeader
        title={t('legalOpinions.detailPageTitle')}
        onBack={handleBack}
        fontSizeMultiplier={fontSizeMultiplier}
      />

      {/* Main Content - Two Column Layout */}
      <div className="pt-[100px] pb-20">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-12 gap-6">
            {/* LEFT SIDEBAR - Enquiry Details */}
            <div className="col-span-4">
              <EnquiryDetailsSidebar
                opinion={opinion}
                entities={entities.items}
                fontSizeMultiplier={fontSizeMultiplier}
              />
            </div>

            {/* RIGHT SECTION - Enquiry, Approved Opinion & Conversation */}
            <div className="col-span-8 space-y-6">
              {/* Enquiry Card */}
              <EnquiryCard
                opinion={opinion}
                fontSizeMultiplier={fontSizeMultiplier}
              />

              {/* Final Approved Opinion Card */}
              <ApprovedOpinionCard
                opinion={opinion}
                fontSizeMultiplier={fontSizeMultiplier}
              />

              {/* Conversation Section */}
              <ConversationSection
                messages={selectedOpinion.conversation}
                fontSizeMultiplier={fontSizeMultiplier}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApprovedOpinionDetailPage;