import EditorLayout from './editor/EditorLayout';
import Image from 'next/image';
import NavBarLayout from './nav-bar/NavBarLayout';
import ResumeHeader from './resume/components/ResumeHeader';
import { ResumeLayout } from './resume/ResumeLayout';
import Tooltip from '@mui/material/Tooltip';
import { useEffect } from 'react';

const BuilderLayout = () => {
  useEffect(() => {
    // only run on client
    if (typeof window === 'undefined') return;

    const POP_SRC =
      '//pl27446447.profitableratecpm.com/71/1b/b5/711bb59bbdc4318e669e6f3863b3b910.js';

    const injectPopunder = () => {
      try {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = POP_SRC;
        s.async = true;
        document.body.appendChild(s);

        // remove the script after a minute to avoid DOM growth
        setTimeout(() => {
          if (s.parentNode) s.parentNode.removeChild(s);
        }, 60 * 1000);
      } catch {
        // ignore any injection errors
      }
    };

    // inject once shortly after load, then every 10 minutes
    const firstTimeout = window.setTimeout(injectPopunder, 1000);
    const intervalId = window.setInterval(injectPopunder, 10 * 60 * 1000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <NavBarLayout />
      <main className="flex flex-1 max-h-[calc(100vh-3.5rem)] print:max-h-fit">
        <div className="flex flex-col flex-1 justify-center bg-custom-grey100 print:bg-white">
          <header className="w-[210mm] mt-5 mb-3 mx-auto print:hidden">
            <ResumeHeader />
          </header>
          <div className="overflow-auto no-scrollbar">
            <ResumeLayout />
          </div>
        </div>
        <aside className="w-[25vw] min-w-[20rem] print:hidden">
          <EditorLayout />
        </aside>
      </main>

      <footer className="print:hidden">
        <Tooltip title="Share feedback">
          <a
            href="https://forms.gle/YmpXEZLk6Let7"
            target="_blank"
            rel="noreferrer"
            className="fixed w-14 h-14 rounded-full bottom-4 left-4 flex justify-center items-center bg-resume-50 shadow-level-4dp"
          >
            <Image src="/icons/rate-review.svg" alt="Feedback button" width="24" height="24" />
          </a>
        </Tooltip>
      </footer>
    </div>
  );
};

export default BuilderLayout;
