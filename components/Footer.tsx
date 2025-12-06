import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-black text-center text-gray-600 text-sm border-t border-white/5 relative z-10">
      <p>&copy; {new Date().getFullYear()} Horizon Corp. All rights reserved.</p>
    </footer>
  );
};
