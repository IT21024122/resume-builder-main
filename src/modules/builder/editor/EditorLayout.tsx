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
    // First-click ad flow for specific sections. Map section -> ad URL.
    try {
      const adMap: Record<string, string> = {
        'basic-details':
          'https://www.profitableratecpm.com/tv21wwyj?key=23260ec0dd0c52efa4d7fc9327104ace',
        'skills-and-expertise':
          'https://www.profitableratecpm.com/pzcb60rhg?key=5ee2580811ec878ea23ce846eb8f20de',
        education:
          'https://www.profitableratecpm.com/n9z4juap3k?key=6b634b24edacd1382486f8c4d5853554',
        experience:
          'https://www.profitableratecpm.com/ecrivbhxe?key=32da432cb005e5c698041d0f55266fc2',
        activities:
          'https://www.profitableratecpm.com/h7wzcggj?key=2c3184c2a58717ded243ad48de46bc52',
        volunteering:
          'https://www.profitableratecpm.com/wyjt8bxne?key=519d3b6f8133329d913ad21f215fb7f2',
        awards: 'https://www.profitableratecpm.com/ydqxnqkiy?key=bb2d54ebcadb5d85c53ee433e32ae60b',
      };

      const adUrl = adMap[link];
      if (adUrl) {
        const flagKey = `seen_${link}_ad_v1`;
        const seen = typeof window !== 'undefined' ? window.localStorage.getItem(flagKey) : null;
        if (!seen) {
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
      // on any error, continue to open the editor normally
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
