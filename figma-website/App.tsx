import { useState } from 'react';
import { LanguageProvider } from './components/LanguageContext';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { OrganizationPageWrapper } from './components/OrganizationPageWrapper';
import { KnowledgeHubPage } from './components/KnowledgeHubPage';
import { DocumentsPage } from './components/DocumentsPage';
import { FeedbackPage } from './components/FeedbackPage';
import { DigitalSignaturePage } from './components/DigitalSignaturePage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { LegislationPage } from './components/LegislationPage';
import { LegislativeCategoriesPage } from './components/LegislativeCategoriesPage';
import { LegislationDashboardWrapper } from './components/LegislationDashboardWrapper';
import { LegislationPlatformWrapper } from './components/LegislationPlatformWrapper';
import { NewsDetailsPage } from './components/NewsDetailsPage';
import { InternalApplicationsPage } from './components/InternalApplicationsPage';
import { AutomationPage } from './components/AutomationPage';
import { SectorDetailPage } from './components/SectorDetailPage';
import { DepartmentDetailPage } from './components/DepartmentDetailPage';
import { EmployeeDirectoryPage } from './components/EmployeeDirectoryPage';
import { EmployeeProfilePage } from './components/EmployeeProfilePage';
import { MediaGalleryPage } from './components/MediaGalleryPage';
import { DocumentPreviewPage } from './components/DocumentPreviewPage';
import { DocumentsManagementPage } from './components/DocumentsManagementPage';
import { AddDocumentPage } from './components/AddDocumentPage';
import { NavigationConfirmDialog } from './components/NavigationConfirmDialog';
import { IntranetLoader } from './components/IntranetLoader';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isInLegislationPlatform, setIsInLegislationPlatform] = useState(false);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [viewingDirectory, setViewingDirectory] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<any>(null);
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [editingDocument, setEditingDocument] = useState<any>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmDirection, setConfirmDirection] = useState<'to-legislation' | 'to-intranet'>('to-legislation');
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [showIntranetLoader, setShowIntranetLoader] = useState(false);

  const handleNavigate = (page: string) => {
    // Special handling for legislation - enter separate platform
    if (page === 'legislation' || page === 'categories' || page === 'dashboard' || page === 'documents-management' || page === 'search') {
      if (isInLegislationPlatform) {
        setCurrentPage(page);
      } else {
        setConfirmDirection('to-legislation');
        setPendingNavigation(page);
        setShowConfirmDialog(true);
      }
    } else {
      if (isInLegislationPlatform) {
        setConfirmDirection('to-intranet');
        setPendingNavigation(page);
        setShowConfirmDialog(true);
      } else {
        setCurrentPage(page);
      }
    }
    // Clear sector and department selections when navigating to a different page
    setSelectedSector(null);
    setSelectedDepartment(null);
    setSelectedEmployee(null);
    setViewingDirectory(false);
    setSelectedNews(null);
    setPreviewDocument(null);
    setShowAddDocument(false);
    setEditingDocument(null);
  };

  const handleConfirmNavigation = (confirmed: boolean) => {
    setShowConfirmDialog(false);
    if (confirmed) {
      if (confirmDirection === 'to-legislation') {
        setIsInLegislationPlatform(true);
        setCurrentPage(pendingNavigation || 'home');
      } else {
        setIsInLegislationPlatform(false);
        setCurrentPage(pendingNavigation || 'home');
      }
    }
    setPendingNavigation(null);
  };

  // If in legislation platform, render the separate platform
  if (isInLegislationPlatform) {
    return (
      <LanguageProvider>
        <LegislationPlatformWrapper 
          onBackToIntranet={() => {
            setIsInLegislationPlatform(false);
            setCurrentPage('home');
          }}
        />
      </LanguageProvider>
    );
  }

  const renderPage = () => {
    // Show document preview if a document is selected
    if (previewDocument) {
      return (
        <DocumentPreviewPage 
          document={previewDocument} 
          onBack={() => setPreviewDocument(null)} 
        />
      );
    }

    // Show news details page if a news item is selected
    if (selectedNews) {
      return (
        <NewsDetailsPage 
          news={selectedNews} 
          onBack={() => {
            setSelectedNews(null);
            setCurrentPage('home');
          }} 
        />
      );
    }

    // Show employee profile if an employee is selected
    if (selectedEmployee) {
      return (
        <EmployeeProfilePage
          employeeId={selectedEmployee}
          onBack={() => setSelectedEmployee(null)}
        />
      );
    }

    // Show employee directory if viewing directory
    if (viewingDirectory) {
      return (
        <EmployeeDirectoryPage
          sectorId={selectedSector || undefined}
          departmentId={selectedDepartment || undefined}
          onBack={() => {
            setViewingDirectory(false);
            if (selectedSector) {
              // Stay on sector page
            } else if (selectedDepartment) {
              // Stay on department page
            } else {
              setCurrentPage('organization');
            }
          }}
          onEmployeeClick={(empId) => setSelectedEmployee(empId)}
        />
      );
    }

    // Show department detail if a department is selected
    if (selectedDepartment) {
      return (
        <DepartmentDetailPage
          departmentId={selectedDepartment}
          onBack={() => {
            setSelectedDepartment(null);
            if (selectedSector) {
              // Stay on sector page
            } else {
              setCurrentPage('organization');
            }
          }}
          onViewEmployees={() => setViewingDirectory(true)}
        />
      );
    }

    // Show sector detail if a sector is selected
    if (selectedSector) {
      return (
        <SectorDetailPage
          sectorId={selectedSector}
          onBack={() => {
            setSelectedSector(null);
            setCurrentPage('organization');
          }}
          onViewEmployees={() => setViewingDirectory(true)}
          onDepartmentClick={(deptId) => {
            setSelectedDepartment(deptId);
            // Could add department detail page here
          }}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onNewsClick={setSelectedNews} onMediaGalleryClick={() => handleNavigate('media')} onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'organization':
        return (
          <OrganizationPageWrapper 
            onSectorClick={(sectorId) => setSelectedSector(sectorId)}
            onDepartmentClick={(deptId) => {
              setSelectedDepartment(deptId);
              // Could add department detail page
            }}
          />
        );
      case 'knowledge':
        return <KnowledgeHubPage />;
      case 'documents':
        return <DocumentsPage onDocumentClick={setPreviewDocument} />;
      case 'feedback':
        return <FeedbackPage />;
      case 'signature':
        return <DigitalSignaturePage onPreviewDocument={setPreviewDocument} />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'legislation':
        return <LegislationPage />;
      case 'categories':
        return <LegislativeCategoriesPage onBack={() => handleNavigate('home')} />;
      case 'dashboard':
        return <LegislationDashboardWrapper />;
      case 'documents-management':
        // Show Add/Edit Document page if showAddDocument is true or editingDocument is set
        if (showAddDocument || editingDocument) {
          return (
            <AddDocumentPage 
              onBack={() => {
                setShowAddDocument(false);
                setEditingDocument(null);
              }}
              editDocument={editingDocument}
            />
          );
        }
        return (
          <DocumentsManagementPage 
            onAddDocument={() => setShowAddDocument(true)}
            onEditDocument={(doc) => setEditingDocument(doc)}
          />
        );
      case 'applications':
        return <InternalApplicationsPage />;
      case 'automation':
        return <AutomationPage />;
      case 'media':
        return <MediaGalleryPage onBack={() => handleNavigate('home')} />;
      default:
        return <HomePage onNewsClick={setSelectedNews} onNavigate={handleNavigate} />;
    }
  };

  return (
    <LanguageProvider>
      <Layout 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        onSectorClick={(sectorId) => setSelectedSector(sectorId)}
        onDepartmentClick={(deptId) => setSelectedDepartment(deptId)}
      >
        {renderPage()}
      </Layout>
      
      {/* Navigation Confirmation Dialog */}
      <NavigationConfirmDialog
        isOpen={showConfirmDialog}
        direction={confirmDirection}
        onConfirm={() => handleConfirmNavigation(true)}
        onCancel={() => handleConfirmNavigation(false)}
      />
      
      {/* Intranet Loader */}
      {showIntranetLoader && (
        <IntranetLoader onLoadComplete={() => setShowIntranetLoader(false)} />
      )}
    </LanguageProvider>
  );
}