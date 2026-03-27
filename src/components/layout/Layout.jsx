import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({
  sidebarProps,
  topBar,
  filters,
  list,
  map,
  detailPanel,
  showDetail
}) {
  return (
    <div className="flex flex-col h-screen w-full bg-mint overflow-hidden font-sans text-gray-900">
      {topBar}

      <main className="flex-1 flex flex-row min-h-0 relative">

        {/* Detail Mode */}
        {showDetail ? (
          <>
            <section className="flex-1 relative min-w-0 bg-gray-100 z-0 shadow-[-10px_0_20px_-10px_rgba(0,0,0,0.1)] overflow-hidden">
              {map}
            </section>
            <section className="w-[500px] border-l border-gray-200 bg-white z-10 shadow-2xl animate-[slideInRight_0.3s_ease-out]">
              {detailPanel}
            </section>
          </>
        ) : (
          /* Normal Mode */
          <>
            <Sidebar {...sidebarProps} />

            <section className="w-full md:w-[480px] flex-shrink-0 flex flex-col bg-[#eaf3ee] z-10 px-4 py-8 border-r border-[#dbe6df]">
              {filters}
              <div className="flex-1 overflow-hidden relative mt-6 px-2 pb-6">
                {list}
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#eaf3ee] to-transparent pointer-events-none z-10 hidden md:block" />
              </div>
            </section>

            <section className="flex-1 relative min-w-0 bg-gray-100 z-0 shadow-[inset_10px_0_20px_-10px_rgba(0,0,0,0.05)] overflow-hidden">
              {map}
            </section>
          </>
        )}

      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}} />
    </div>
  );
}
