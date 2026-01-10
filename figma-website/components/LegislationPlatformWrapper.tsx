import { useState } from 'react';
import { LegislationPlatformLoader } from './LegislationPlatformLoader';
import { LegislationPlatformHeader } from './LegislationPlatformHeader';
import { LegislationPage } from './LegislationPage';
import { LegislationDashboardWrapper } from './LegislationDashboardWrapper';
import { DocumentsManagementPage } from './DocumentsManagementPage';
import { AddDocumentPage } from './AddDocumentPage';
import { LegislationDocumentViewer } from './LegislationDocumentViewer';
import { LegislationSearchPage } from './LegislationSearchPage';
import { ApprovedLegalOpinionsPage } from './ApprovedLegalOpinionsPage';
import { ApprovedOpinionDetailPage } from './ApprovedOpinionDetailPage';
import { NavigationConfirmDialog } from './NavigationConfirmDialog';
import { IntranetLoader } from './IntranetLoader';

interface LegislationPlatformWrapperProps {
  onBackToIntranet: () => void;
}

export function LegislationPlatformWrapper({ onBackToIntranet }: LegislationPlatformWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPlatformPage, setCurrentPlatformPage] = useState<'home' | 'legislations' | 'dashboard' | 'documents' | 'search' | 'approved-opinions'>('legislations');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showIntranetLoader, setShowIntranetLoader] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [editingDocument, setEditingDocument] = useState<any>(null);
  const [previewDocument, setPreviewDocument] = useState<any>(null);
  const [userRole, setUserRole] = useState<'admin' | 'user'>('admin');
  const [selectedApprovedOpinion, setSelectedApprovedOpinion] = useState<any>(null);

  // Font size adjustment functions
  const increaseFontSize = () => {
    if (fontSizeMultiplier < 1.3) {
      setFontSizeMultiplier(prev => prev + 0.1);
    }
  };

  const decreaseFontSize = () => {
    if (fontSizeMultiplier > 0.8) {
      setFontSizeMultiplier(prev => prev - 0.1);
    }
  };

  const handleNavigate = (page: 'home' | 'legislations' | 'dashboard' | 'documents' | 'search' | 'approved-opinions') => {
    if (page === 'home') {
      // Show confirmation before going back to intranet
      setShowConfirmDialog(true);
    } else {
      setCurrentPlatformPage(page);
      // Reset approved opinion selection when navigating away
      if (page !== 'approved-opinions') {
        setSelectedApprovedOpinion(null);
      }
    }
  };

  const handleConfirmBackToIntranet = (confirmed: boolean) => {
    setShowConfirmDialog(false);
    if (confirmed) {
      // Show loader before returning to intranet
      setShowIntranetLoader(true);
    }
  };

  const handleLoaderComplete = () => {
    setShowIntranetLoader(false);
    onBackToIntranet();
  };

  if (isLoading) {
    return <LegislationPlatformLoader onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F8FA' }}>
      <LegislationPlatformHeader 
        currentPage={currentPlatformPage}
        onNavigate={handleNavigate}
        increaseFontSize={increaseFontSize}
        decreaseFontSize={decreaseFontSize}
        fontSizeMultiplier={fontSizeMultiplier}
        userRole={userRole}
        onRoleChange={setUserRole}
      />
      
      {currentPlatformPage === 'legislations' && (
        <LegislationPage fontSizeMultiplier={fontSizeMultiplier} userRole={userRole} />
      )}
      
      {currentPlatformPage === 'dashboard' && (
        <LegislationDashboardWrapper fontSizeMultiplier={fontSizeMultiplier} userRole={userRole} />
      )}
      
      {currentPlatformPage === 'documents' && (
        showAddDocument || editingDocument ? (
          <AddDocumentPage
            onBack={() => {
              setShowAddDocument(false);
              setEditingDocument(null);
            }}
            editDocument={editingDocument}
          />
        ) : previewDocument ? (
          <LegislationDocumentViewer
            onBack={() => setPreviewDocument(null)}
            document={previewDocument}
          />
        ) : (
          <DocumentsManagementPage 
            onAddDocument={() => setShowAddDocument(true)}
            onEditDocument={(doc) => setEditingDocument(doc)}
            onPreviewDocument={(doc) => setPreviewDocument(doc)}
          />
        )
      )}
      
      {currentPlatformPage === 'search' && (
        <LegislationSearchPage fontSizeMultiplier={fontSizeMultiplier} />
      )}
      
      {currentPlatformPage === 'approved-opinions' && (
        selectedApprovedOpinion ? (
          <ApprovedOpinionDetailPage
            onBack={() => setSelectedApprovedOpinion(null)}
            opinion={selectedApprovedOpinion}
            fontSizeMultiplier={fontSizeMultiplier}
          />
        ) : (
          <ApprovedLegalOpinionsPage
            onBack={() => handleNavigate('legislations')}
            onOpinionSelect={(opinion) => setSelectedApprovedOpinion(opinion)}
            fontSizeMultiplier={fontSizeMultiplier}
          />
        )
      )}
      
      {showConfirmDialog && (
        <NavigationConfirmDialog
          isOpen={showConfirmDialog}
          direction="to-intranet"
          onConfirm={() => handleConfirmBackToIntranet(true)}
          onCancel={() => handleConfirmBackToIntranet(false)}
        />
      )}
      
      {showIntranetLoader && (
        <IntranetLoader onLoadComplete={handleLoaderComplete} />
      )}
    </div>
  );
}