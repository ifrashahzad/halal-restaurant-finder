import React from 'react';

export default function ErrorMessage({ message }) {
  return (
    <div className="p-4 m-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
      <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-red-700 font-medium">{message}</p>
    </div>
  );
}
