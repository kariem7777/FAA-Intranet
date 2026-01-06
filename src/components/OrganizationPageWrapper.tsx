import { useState } from 'react';
import { Button } from './ui/button';
import { GitBranch, PanelLeft, Settings } from 'lucide-react';
import { OrganizationTreePage } from './OrganizationTreePage';
import { OrganizationSplitView } from './OrganizationSplitView';
import { Card } from './ui/card';
import { Separator } from './ui/separator';

interface OrganizationPageWrapperProps {
  onSectorClick?: (sectorId: string) => void;
  onDepartmentClick?: (departmentId: string) => void;
}

export function OrganizationPageWrapper({ onSectorClick, onDepartmentClick }: OrganizationPageWrapperProps) {
  const [viewMode, setViewMode] = useState<'tree' | 'split'>('tree');
  const [showViewOptions, setShowViewOptions] = useState(false);

  return (
    <div className="relative">
      {/* Unified Change View Button - Shows in both views */}
      <div className="absolute top-7 right-7 z-30">
        <div className="relative">
          <Button
            onClick={() => setShowViewOptions(!showViewOptions)}
            className="bg-white text-gray-700 hover:bg-gray-50 shadow-lg border border-gray-200 gap-2"
            size="sm"
          >
            <Settings className="h-4 w-4" />
            Change View
          </Button>
          
          {showViewOptions && (
            <Card className="absolute top-12 right-0 p-2 bg-white shadow-xl border border-gray-200 rounded-lg min-w-[200px]">
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start gap-2 ${viewMode === 'tree' ? 'text-gray-400 cursor-not-allowed' : ''}`}
                  onClick={() => {
                    if (viewMode !== 'tree') {
                      setViewMode('tree');
                      setShowViewOptions(false);
                    }
                  }}
                  disabled={viewMode === 'tree'}
                >
                  <GitBranch className="h-4 w-4" />
                  {viewMode === 'tree' ? 'Current: Tree View' : 'Tree View'}
                </Button>
                <Separator className="my-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start gap-2 ${viewMode === 'split' ? 'text-gray-400 cursor-not-allowed' : ''}`}
                  onClick={() => {
                    if (viewMode !== 'split') {
                      setViewMode('split');
                      setShowViewOptions(false);
                    }
                  }}
                  disabled={viewMode === 'split'}
                >
                  <PanelLeft className="h-4 w-4" />
                  {viewMode === 'split' ? 'Current: Split View' : 'Split View'}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Render appropriate view */}
      {viewMode === 'split' ? (
        <OrganizationSplitView onViewModeChange={setViewMode} />
      ) : (
        <OrganizationTreePage 
          onSectorClick={onSectorClick}
          onDepartmentClick={onDepartmentClick}
        />
      )}
    </div>
  );
}