import React, { useState, useRef, useCallback } from 'react';
import { toJpeg } from 'html-to-image';
import Poster from './components/Poster';
import ControlPanel from './components/ControlPanel';
import { PosterData, DEFAULT_DATA } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<PosterData>(DEFAULT_DATA);
  const posterRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadImage = useCallback(async () => {
    if (posterRef.current === null) {
      return;
    }

    setIsGenerating(true);

    try {
      // Small delay to ensure any render updates are finished
      await new Promise(resolve => setTimeout(resolve, 100));

      const options = { 
        cacheBust: false, // Disabled to avoid CORS issues with Google Fonts
        pixelRatio: 2, // Higher quality export
        quality: 0.95, // JPEG quality (0-1), 0.95 provides good balance
        backgroundColor: '#FBCD08' // Ensure background color for JPEG (no transparency)
      };

      // Safari compatibility fix: call toJpeg multiple times
      // Safari needs multiple passes to properly render fonts and images
      // First pass - warm up (helps Safari load resources)
      await toJpeg(posterRef.current, options);
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Second pass - another warm up for Safari
      await toJpeg(posterRef.current, options);
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Third pass - final render
      const dataUrl = await toJpeg(posterRef.current, options);
      
      const link = document.createElement('a');
      link.download = `best-nine-${data.year}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [data.year]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      
      {/* Sidebar Controls */}
      <div className="w-full lg:w-[400px] lg:h-screen p-4 lg:p-6 lg:sticky lg:top-0 overflow-y-auto z-10 flex-shrink-0 bg-white lg:bg-transparent shadow-md lg:shadow-none mb-4 lg:mb-0">
         <ControlPanel 
            data={data} 
            setData={setData} 
            onDownload={downloadImage}
            isGenerating={isGenerating}
         />
      </div>

      {/* Main Preview Area */}
      <div className="flex-grow flex items-start justify-center p-4 pb-20 lg:p-10 overflow-x-hidden bg-gray-200 min-h-[500px]">
        {/* 
          Responsive Scaling Wrapper
          Poster width is fixed at 600px.
          Mobile (360px+): scale-55 (330px)
          Small Tablet (640px+): scale-75 (450px)
          Tablet (768px+): scale-90 (540px)
          Desktop (1024px+): scale-100 (600px)
        */}
        <div className="transform origin-top transition-transform duration-300 scale-[0.55] min-[400px]:scale-[0.65] sm:scale-[0.8] md:scale-[0.9] lg:scale-100 mb-10">
           {/* 
              We pass the ref to the Poster component so html-to-image knows what to capture.
              The Poster component handles all the styling.
           */}
           <Poster ref={posterRef} data={data} />
        </div>
      </div>

    </div>
  );
};

export default App;