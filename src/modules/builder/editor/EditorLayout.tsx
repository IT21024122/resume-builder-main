import React, { useState } from 'react';

import DataHeaders from './components/EditHeaders';
import EditSection from './components/EditSection';
import ErrorBoundary from '@/helpers/common/components/ErrorBoundary';
import { OutlinedButton } from '@/helpers/common/atoms/Buttons';
import { headers } from '@/helpers/constants/editor-data';
import { resetResumeStore } from '@/stores/useResumeStore';

const EditorLayout = () => {
  const [link, setLink] = useState('');
  const section = headers[link];

  const linkClickHandler = (link: string) => {
    // If the user clicks 'basic-details' for the first time, open ad in a new tab
    try {
      if (link === 'basic-details') {
        const flagKey = 'seen_basic_details_ad_v1';
        const seen = typeof window !== 'undefined' ? window.localStorage.getItem(flagKey) : null;
        if (!seen) {
          // open ad in new tab on first click and set flag; do not open editor yet
          const adUrl =
            'https://www.profitableratecpm.com/tv21wwyj?key=23260ec0dd0c52efa4d7fc9327104ace';
          try {
            window.open(adUrl, '_blank');
          } catch {
            // ignore popup blockers
          }
          try {
            window.localStorage.setItem(flagKey, '1');
          } catch {
            // ignore storage errors
          }
          return;
        }
      }
    } catch {
      // fall through to normal behavior on error
    }

    setLink(link);
  };

  const displayElement = link ? (
    <EditSection section={section} onLinkClick={linkClickHandler} />
  ) : (
    <DataHeaders onLinkClick={linkClickHandler} />
  );

  return (
    <ErrorBoundary>
      <div className="bg-resume-50 h-full text-resume-800 p-6 overflow-auto relative no-scrollbar shadow-level-4dp">
        {displayElement}

        <div className="mt-8">
          <OutlinedButton onClick={resetResumeStore}>Reset all edits</OutlinedButton>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default EditorLayout;
