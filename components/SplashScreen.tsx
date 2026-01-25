
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center animate-bounce shadow-2xl shadow-indigo-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
        <div className="absolute -inset-4 bg-indigo-500/10 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      <div className="mt-12 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold tracking-tighter text-white">LingoVoice</h1>
        <p className="text-slate-500 text-sm mt-2 font-semibold tracking-widest uppercase">Android Edition</p>
      </div>

      <div className="absolute bottom-12 flex items-center gap-2 opacity-40">
        <span className="text-xs font-medium uppercase tracking-widest">Powered by</span>
        <div className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold">Gemini AI</div>
      </div>
    </div>
  );
};

export default SplashScreen;
