import { useEffect, useCallback, useState } from 'react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AlertCircle, RefreshCw, Send, XCircle, Loader2, Reply, BookOpen } from 'lucide-react';
import { ApprovedOpinionsReferenceDialog } from '@/features/LegalOpinions/components/Dialogs/ApprovedOpinionsReferenceDialog';
import { Button } from '@/shared/components/ui/button';
import { useConfirmation } from '@/shared/hooks/useConfirmation';
import toast from 'react-hot-toast';
import SharedRichTextEditor from '@/shared/components/ui/richTextEditor';
import {
  fetchEnquiryDetails,
  clearSelectedEnquiry,
  sendReply,
  closeEnquiry,
  approveReply,
} from '../slices/EnquiriesSlice';
import {
  LegalOpinionsHeader,
  EnquiryDetailsSidebar,
  EnquiryCard,
  ApprovedOpinionCard,
  ConversationSection,
  LegalOpinionDetailLoading,
} from '../components';

const LEGISLATION_COLORS = {
  bgOffWhite: '#F7F8FA',
};

export function OpinionDetailPage({ id: propId, status, onBack: onBackProp }: { id?: number; status?: number; onBack?: () => void }) {
  const { t, isRTL } = useTranslation();
  const navigate = useNavigate();
  const { id: paramId } = useParams<{ id: string }>();
  const id = propId || (paramId ? parseInt(paramId, 10) : undefined);
  const dispatch = useAppDispatch();
  const confirm = useConfirmation();

  const { selectedEnquiry, enquiryActions } = useAppSelector((state) => state.enquiries);
  const { replyLoading, closeLoading, error: actionError } = enquiryActions;

  const [replyContent, setReplyContent] = useState('');
  const [pureContent, setPureContent] = useState('');

  const [approvingReplyId, setApprovingReplyId] = useState<number | string | null>(null);
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const [showReferenceDialog, setShowReferenceDialog] = useState(false);

  const currentUser = { role: 'admin' as 'user' | 'admin' };
  const isAdmin = currentUser.role === 'admin';

  const lastReply = selectedEnquiry?.data?.replies?.[selectedEnquiry.data.replies.length - 1];
  const isWaitingForAdmin = !isAdmin && (!selectedEnquiry?.data?.replies?.length || (lastReply && !lastReply.isAdminResponse));

  useEffect(() => {
    if (id) {
      dispatch(fetchEnquiryDetails(id));
    }

    return () => {
      dispatch(clearSelectedEnquiry());
    };
  }, [dispatch, id]);

  const handleBack = useCallback(() => {
    if (onBackProp) {
      onBackProp();
    } else {
      navigate('/approved-opinions');
    }
  }, [navigate, onBackProp]);

  const handleRetry = useCallback(() => {
    if (id) {
      dispatch(fetchEnquiryDetails(id));
    }
  }, [dispatch, id]);

  const handleSendReply = useCallback(async () => {
    if (!id || !replyContent.trim()) return;
    try {
      await dispatch(sendReply({ enquiryId: id, message: replyContent, pureContent: pureContent })).unwrap();
      setReplyContent('');
      toast.success(t('legalOpinions.replySentSuccess'));
      // Refresh enquiry details to show the new reply
      dispatch(fetchEnquiryDetails(id));
    } catch {
      toast.error(actionError || t('legalOpinions.replySentError'));
    }
  }, [dispatch, id, replyContent, pureContent, t, actionError]);

  const handleCloseConversation = useCallback(async () => {
    if (!id) return;
    const confirmed = await confirm({
      title: t('legalOpinions.closeConversationTitle'),
      message: t('legalOpinions.closeConversationMessage'),
      confirmLabel: t('legalOpinions.closeConversation'),
      cancelLabel: t('common.cancel'),
      variant: 'warning',
    });
    if (!confirmed) return;
    try {
      await dispatch(closeEnquiry({ enquiryId: id, status: 3 })).unwrap();
      toast.success(t('legalOpinions.conversationClosed'));
      dispatch(fetchEnquiryDetails(id));
    } catch {
      toast.error(actionError || t('legalOpinions.closeConversationError'));
    }
  }, [dispatch, id, confirm, t, actionError]);

  const handleApproveReply = useCallback(async (replyId: number | string) => {
    const confirmed = await confirm({
      title: t('legalOpinions.approveReplyTitle'),
      message: t('legalOpinions.approveReplyMessage'),
      confirmLabel: t('legalOpinions.approveReply'),
      cancelLabel: t('common.cancel'),
      variant: 'success',
    });
    if (!confirmed) return;
    setApprovingReplyId(replyId);
    try {
      await dispatch(approveReply(replyId)).unwrap();
      toast.success(t('legalOpinions.replyApprovedSuccess'));
      if (id) dispatch(fetchEnquiryDetails(id));
    } catch {
      toast.error(actionError || t('legalOpinions.replyApprovedError'));
    } finally {
      setApprovingReplyId(null);
    }
  }, [dispatch, id, confirm, t, actionError]);

  if (selectedEnquiry.loading || (!selectedEnquiry.data && !selectedEnquiry.error)) {
    return (
      <div
        className="min-h-screen"
        style={{ backgroundColor: LEGISLATION_COLORS.bgOffWhite }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Fixed Header */}
        <LegalOpinionsHeader
          title={t('legalOpinions.detailPageTitle')}
          onBack={handleBack}
        />

        {/* Shimmer Loading Skeleton */}
        <div className="pt-[100px] pb-20">
          <div className="max-w-[1400px] mx-auto px-8">
            <LegalOpinionDetailLoading status={status} />
          </div>
        </div>
      </div>
    );
  }

  if (selectedEnquiry.error || !selectedEnquiry.data) {
    return (
      <div
        className="min-h-screen"
        style={{ backgroundColor: LEGISLATION_COLORS.bgOffWhite }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <LegalOpinionsHeader
          title={t('legalOpinions.detailPageTitle')}
          onBack={handleBack}
        />

        <div className="pb-20 pt-[100px]">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold" style={{ color: '#1F2937' }}>
                {selectedEnquiry.error || t('legalOpinions.enquiryNotFound')}
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

  const enquiry = selectedEnquiry.data;
  const approvedReply = enquiry.replies?.find(r => r.approved);
  const isClosed = enquiry.status === 3;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'rgb(250, 250, 248)' }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Fixed Header */}
      <LegalOpinionsHeader
        title={t('legalOpinions.detailPageTitle')}
        onBack={handleBack}
      />

      {/* Main Content - Two Column Layout */}
      <div className="pt-[100px] pb-20 ">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-12 gap-6">
            {/* LEFT SIDEBAR - Enquiry Details */}
            <div className="col-span-4">
              <EnquiryDetailsSidebar
                enquiry={enquiry}
              />
            </div>

            <div className="col-span-8 space-y-6">
              <EnquiryCard
                enquiry={enquiry}
              />

              {approvedReply && (
                <ApprovedOpinionCard
                  approvedReply={approvedReply}
                />
              )}

              {enquiry.replies && enquiry.replies.length > 0 && (
                <ConversationSection
                  messages={enquiry.replies}
                  isAdmin={isAdmin}
                  onApproveReply={handleApproveReply}
                  approvingReplyId={approvingReplyId}
                />
              )}


              {/* Action Buttons - only when conversation is not closed */}
              {!isClosed && (
                <div className="space-y-4">
                  {/* Collapsed Action Buttons */}
                  <div className="flex items-start gap-3">

                    {isWaitingForAdmin ? (
                      <div className="flex-1 bg-[#FEFCE8] border border-[#FEF08A] rounded-lg p-4 flex items-start gap-3">
                        <div className="p-1.5 bg-[#FEF9C3] rounded-full">
                          <AlertCircle className="h-5 w-5 text-[#854D0E]" />
                        </div>
                        <div>
                          <h4 className="text-[#854D0E] font-medium text-base mb-0.5">
                            {t('legalOpinions.awaitingReplyTitle', 'Awaiting reply from FAA')}
                          </h4>
                          <p className="text-[#A16207] text-sm">
                            {t('legalOpinions.awaitingReplyMessage', 'No reply yet')}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setShowReplyEditor(!showReplyEditor)}
                        className="text-white h-11 px-6 rounded-lg gap-2 bg-faa-primary! hover:bg-[#6d6b62]! hover:shadow-lg transition-all"
                        style={{
                          fontSize: '17px',
                          fontWeight: 500
                        }}
                      >
                        <Reply className="h-4 w-4" />
                        {t('legalOpinions.addReply')}
                      </Button>
                    )}

                    {/* Close Conversation Button - Admin only, shown only when an approved reply exists */}
                    {isAdmin && approvedReply && (
                      <Button
                        onClick={handleCloseConversation}
                        disabled={closeLoading}
                        className="bg-gray-600! text-white hover:bg-gray-700 h-11 px-6 rounded-lg gap-2 hover:shadow-md transition-all"
                        style={{
                          fontSize: '17px',
                          fontWeight: 500
                        }}
                      >
                        {closeLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                        {t('legalOpinions.closeConversation')}
                      </Button>
                    )}
                  </div>

                  {/* Expandable Reply Editor */}
                  {showReplyEditor && (
                    <div
                      className="bg-white rounded-lg border-2 shadow-sm overflow-hidden"
                      style={{ borderColor: 'rgba(144, 142, 129, 0.3)' }}
                    >
                      <div
                        className="px-6 py-4 border-b flex items-center gap-3 bg-gray-50/50"
                        style={{ borderColor: 'rgba(144, 142, 129, 0.2)' }}
                      >
                        <div className='flex justify-between w-full'>
                          <div className='flex items-center gap-2'>
                            <Send className="h-5 w-5" style={{ color: 'var(--color-faa-primary)' }} />
                            <h3
                              className="text-lg font-semibold"
                            >
                              {t('legalOpinions.addReply')}
                            </h3>
                          </div>
                          {isAdmin && (
                            <Button
                              onClick={() => setShowReferenceDialog(true)}
                              variant="outline"
                              className="h-8 px-2 rounded-lg gap-2 hover:bg-gray-50 transition-all border-gray-300 text-faa-primary!"
                              style={{
                                fontSize: '14px',
                                fontWeight: 500
                              }}
                            >
                              <BookOpen className="h-4 w-4" />
                              {t('legalOpinions.approvedReference')}
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <SharedRichTextEditor
                          content={replyContent}
                          onChange={setReplyContent}
                          onTextChange={setPureContent}
                          placeholder={t('legalOpinions.replyPlaceholder')}
                        />
                        <div className="flex items-center gap-3">
                          <Button
                            onClick={() => { setShowReplyEditor(false); setReplyContent(''); }}
                            className="flex-1 h-11 bg-slate-100! text-slate-700! hover:bg-slate-200 rounded-lg hover:shadow-sm transition-all"
                            style={{ fontSize: '17px', fontWeight: 500 }}
                          >
                            {t('common.cancel')}
                          </Button>
                          <Button
                            onClick={handleSendReply}
                            disabled={replyLoading || !replyContent.trim()}
                            className="flex-1 h-11 text-white rounded-lg disabled:opacity-50 gap-2 bg-faa-primary! hover:bg-[#6d6b62]! hover:shadow-lg transition-all"
                            style={{
                              fontSize: '17px',
                              fontWeight: 500
                            }}
                          >
                            {replyLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Send className="h-4 w-4" />
                            )}
                            {t('legalOpinions.sendReply')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {isClosed && (
                <div
                  className="flex items-center justify-center gap-3 p-5 rounded-lg border-2"
                  style={{
                    backgroundColor: '#F9FAFB',
                    borderColor: '#E5E7EB',
                  }}
                >
                  <XCircle className="h-5 w-5 text-gray-400" />
                  <span className="text-base font-semibold text-gray-500">
                    {t('legalOpinions.conversationClosedLabel')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Reference Dialog */}
      {showReferenceDialog && (
        <ApprovedOpinionsReferenceDialog
          onClose={() => setShowReferenceDialog(false)}
          onCopy={(text) => {
            setReplyContent((prev) => prev ? `${prev}\n\n${text}` : text);
            setShowReferenceDialog(false);
            setShowReplyEditor(true);
          }}
        />
      )}
    </div>
  );
}

export default OpinionDetailPage;