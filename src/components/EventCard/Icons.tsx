import React from 'react';

// SVG Icons Components
export const StarIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" />
  </svg>
);

export const ArrowRightIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6L5 9L10 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const XIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SparkleIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M6 0L6.5 4L10.5 4L7 6.5L10.5 9L6.5 9L6 13L5.5 9L1.5 9L5 6.5L1.5 4L5.5 4L6 0Z" />
  </svg>
);

export const ShootingStarIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M7 0L7.7 3.5L11.2 4.2L7.7 4.9L7 8.4L6.3 4.9L2.8 4.2L6.3 3.5L7 0Z" />
    <path d="M11 7L13 9L11 11L9 9L11 7Z" fill="currentColor" opacity="0.7" />
  </svg>
);
