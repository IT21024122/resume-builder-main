import { useEffect } from 'react';

import { StyledButton } from '../atoms';
import { MenuItem } from '@mui/material';

const isMobileDevice = () => {
  if (typeof navigator === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
};

export const PrintResume: React.FC<{ isMenuButton?: boolean }> = ({ isMenuButton }) => {
  const mobile = isMobileDevice();

  useEffect(() => {
    globalThis?.addEventListener('beforeprint', () => {
      globalThis.document.title = `Resume_Builder_${Date.now()}`;
    });

    globalThis?.addEventListener('afterprint', () => {
      globalThis.document.title = 'Single Page Resume Builder';
    });
  }, []);

  const handleClick = () => {
    if (mobile) {
      // Prefer the Web Share API when available, otherwise show a helpful message
      if (typeof navigator !== 'undefined' && (navigator as any).share) {
        try {
          (navigator as any).share({
            title: document.title,
            text: 'Open this page in desktop to download as PDF',
            url: location.href,
          });
        } catch (e) {
          // ignore share errors
        }
        return;
      }

      // Mobile browsers often don't provide a direct PDF download via window.print()
      // Give the user a clear instruction instead of failing silently.
      globalThis?.alert(
        'Downloading as PDF is unreliable on mobile browsers. Please open this page on a desktop browser and use the "Download as PDF" button, or use your browser\'s Share/Print option.'
      );
      return;
    }

    globalThis?.print();
  };

  if (isMenuButton) {
    return (
      <MenuItem onClick={handleClick}>
        {mobile ? 'Download (open on desktop)' : 'Download as PDF'}
      </MenuItem>
    );
  }

  return (
    <StyledButton onClick={handleClick} variant="outlined" disabled={mobile}>
      {mobile ? 'Download (desktop only)' : 'Download as PDF'}
    </StyledButton>
  );
};
