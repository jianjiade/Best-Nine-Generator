import React, { useState } from 'react';
import { Upload, X, RefreshCw, PenTool } from 'lucide-react';
import { PosterData } from '../types';
import ImageCropper from './ImageCropper';

interface ControlPanelProps {
  data: PosterData;
  setData: React.Dispatch<React.SetStateAction<PosterData>>;
  onDownload: () => void;
  isGenerating: boolean;
  uploadedCount: number;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ data, setData, onDownload, isGenerating, uploadedCount }) => {
  const isComplete = uploadedCount === 9;
  // State for cropping
  const [cropperState, setCropperState] = useState<{
    isOpen: boolean;
    imageSrc: string | null;
    targetIndex: number | null; // index for grid, or -1 for avatar, -2 for QR code
  }>({
    isOpen: false,
    imageSrc: null,
    targetIndex: null
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCropperState({
            isOpen: true,
            imageSrc: reader.result as string,
            targetIndex: index
        });
      };
      reader.readAsDataURL(file);
      // Reset input so same file can be selected again if needed
      e.target.value = '';
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    const { targetIndex } = cropperState;

    if (targetIndex === -1) {
        // Avatar
        setData(prev => ({ ...prev, avatar: croppedImage }));
    } else if (targetIndex === -2) {
        // QR Code
        setData(prev => ({ ...prev, qrCode: croppedImage }));
    } else if (targetIndex !== null && targetIndex >= 0) {
        // Grid Image
        const newGrid = [...data.gridImages];
        newGrid[targetIndex] = croppedImage;
        setData(prev => ({ ...prev, gridImages: newGrid }));
    }

    setCropperState({ isOpen: false, imageSrc: null, targetIndex: null });
  };

  const clearImage = (index: number) => {
    const newGrid = [...data.gridImages];
    newGrid[index] = null;
    setData(prev => ({ ...prev, gridImages: newGrid }));
  };

  return (
    <>
        <div className="bg-white lg:p-6 rounded-xl lg:shadow-lg h-full w-full max-w-md mx-auto lg:border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <span>Settings</span>
            <div className="h-1 w-full bg-yellow-400 rounded-full flex-grow ml-4 opacity-50"></div>
        </h2>

        {/* Grid Images Upload */}
        <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Grid Images (9)</label>
            <div className="grid grid-cols-3 gap-2">
            {data.gridImages.map((img, index) => (
                <div key={index} className="aspect-square relative rounded-lg border-2 border-dashed border-gray-300 hover:border-yellow-400 transition-colors overflow-hidden bg-gray-50 group active:scale-95 duration-100">
                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => handleFileSelect(e, index)}
                />
                {img ? (
                    <>
                    <img src={img} alt={`Slot ${index}`} className="w-full h-full object-cover" />
                    {/* Overlay: Desktop hover or Mobile styling */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20 pointer-events-none">
                        <span className="text-white text-xs font-bold">Replace</span>
                    </div>
                    
                    <button 
                        onClick={(e) => { e.preventDefault(); clearImage(index); }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 z-30 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity touch-manipulation"
                    >
                        <X size={10} />
                    </button>
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 pointer-events-none">
                    <Upload size={16} className="mb-1" />
                    <span className="text-[10px] font-medium">{index + 1}</span>
                    </div>
                )}
                </div>
            ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-2">Tap any slot to upload.</p>
        </div>

        {/* Text Settings */}
        <div className="space-y-4 mb-8">
            <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Year</label>
            <input 
                type="text" 
                value={data.year} 
                onChange={(e) => setData(prev => ({ ...prev, year: e.target.value }))}
                className="w-full px-3 py-3 lg:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                placeholder="2025"
            />
            </div>
            <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Username</label>
            <input 
                type="text" 
                value={data.username} 
                onChange={(e) => setData(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-3 py-3 lg:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                placeholder="@username"
            />
            </div>
        </div>

        {/* Other Uploads */}
        <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Avatar</label>
            <div className="relative h-24 w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 cursor-pointer overflow-hidden group active:scale-95 duration-100">
                <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e, -1)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                {data.avatar ? (
                    <>
                        <img src={data.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 pointer-events-none">
                            <span className="text-white text-xs font-bold">Replace</span>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-gray-400 pointer-events-none">
                        <Upload size={20} className="mx-auto mb-1" />
                        <span className="text-[10px]">Upload</span>
                    </div>
                )}
            </div>
            </div>
            <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">QR Code</label>
            <div className="relative h-24 w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 cursor-pointer overflow-hidden group active:scale-95 duration-100">
                <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e, -2)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                {data.qrCode ? (
                    <>
                        <img src={data.qrCode} alt="QR Preview" className="w-full h-full object-contain p-2" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 pointer-events-none">
                            <span className="text-white text-xs font-bold">Replace</span>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-gray-400 pointer-events-none">
                        <Upload size={20} className="mx-auto mb-1" />
                        <span className="text-[10px]">Upload</span>
                    </div>
                )}
            </div>
            </div>
        </div>

        {/* Footer Text */}
        <div className="mb-8">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Copyright Text</label>
            <textarea 
                value={data.footerText} 
                onChange={(e) => setData(prev => ({ ...prev, footerText: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all text-xs h-20 resize-none"
            />
        </div>

        {/* Upload Progress Hint */}
        {!isComplete && (
            <div className="mb-3 text-center text-sm text-amber-600 bg-amber-50 py-2 px-3 rounded-lg border border-amber-200">
                请上传 9 张图片（已上传 {uploadedCount}/9）
            </div>
        )}

        <button
            onClick={onDownload}
            disabled={isGenerating || !isComplete}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transform duration-100 touch-manipulation ${
                isComplete 
                    ? 'bg-black text-white hover:bg-gray-800 active:scale-95' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
            {isGenerating ? (
                <>
                    <RefreshCw className="animate-spin" /> Generating...
                </>
            ) : (
                "Download Image"
            )}
        </button>
        </div>

        {/* Cropper Modal */}
        {cropperState.isOpen && cropperState.imageSrc && (
            <ImageCropper
                imageSrc={cropperState.imageSrc}
                aspect={1} // Always square for grid and avatar
                onCancel={() => setCropperState({ isOpen: false, imageSrc: null, targetIndex: null })}
                onComplete={handleCropComplete}
            />
        )}
    </>
  );
};

export default ControlPanel;