import React, { forwardRef } from 'react';
import { PosterData } from '../types';

interface PosterProps {
  data: PosterData;
}

const Poster = forwardRef<HTMLDivElement, PosterProps>(({ data }, ref) => {
  const { gridImages, avatar, qrCode, username, year, footerText } = data;

  return (
    // This wrapper acts as the "paper" that gets downloaded. 
    // Background updated to #FBCD08
    <div 
      ref={ref} 
      className="bg-[#FBCD08] font-sans p-6 sm:p-8 md:p-12 w-full max-w-[600px] mx-auto flex flex-col items-center shadow-2xl"
      style={{ minHeight: '1000px', aspectRatio: '9/16' }}
    >
      {/* White Card Container */}
      <div className="bg-white rounded-[4px] p-2 w-full shadow-sm flex flex-col flex-grow relative">
        
        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {gridImages.map((img, index) => (
            <div key={index} className="aspect-square bg-gray-300 overflow-hidden relative group">
              {img ? (
                <img 
                  src={img} 
                  alt={`Grid ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-200">
                   <span className="text-2xl font-black">{index + 1}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Year Label */}
        <div className="w-full text-right mb-8 pr-1">
          <h2 className="text-2xl font-normal tracking-tighter text-black uppercase">{year} BEST NINE</h2>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center justify-center flex-grow -mt-4">
            
            {/* Avatar */}
            <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                    {avatar ? (
                        <img 
                            src={avatar} 
                            alt="Avatar" 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                            头像
                        </div>
                    )}
                </div>
            </div>

            {/* Username */}
            <h1 className="text-2xl font-normal text-black mb-3 text-center tracking-tight">
                {username}
            </h1>

        </div>

        {/* QR Code Section (Bottom Right of Card) */}
        <div className="w-full flex justify-end items-end mt-8">
            <div className="flex items-end gap-3">
                <div className="text-right text-gray-500 text-sm mb-1">
                    <p>长按生成你的</p>
                    <p>年度 9 图</p>
                </div>
                <div className="w-20 h-20 bg-gray-100">
                    {qrCode ? (
                        <img 
                            src={qrCode} 
                            alt="QR Code" 
                            className="w-full h-full object-contain mix-blend-multiply"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            二维码
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* Footer (Outside the white card, on the background) */}
      <div className="w-full mt-6 flex justify-end items-end px-1">
        {/* Right: Copyright */}
        <div className="flex flex-col items-end">
            <div className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
                WUDAMEI STUDIO
            </div>
            <div className="text-[8px] font-bold text-black opacity-80 uppercase tracking-wide">
                {footerText}
            </div>
        </div>
      </div>

    </div>
  );
});

Poster.displayName = 'Poster';
export default Poster;