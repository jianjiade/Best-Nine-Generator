import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from '../utils/canvasUtils'

interface ImageCropperProps {
  imageSrc: string
  aspect?: number
  onCancel: () => void
  onComplete: (croppedImage: string) => void
}

const ImageCropper: React.FC<ImageCropperProps> = ({ 
  imageSrc, 
  aspect = 1, 
  onCancel, 
  onComplete 
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleSave = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
      onComplete(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[70vh] sm:h-[500px]">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-white z-10 shrink-0">
            <h3 className="font-bold text-gray-800">Adjust Image</h3>
            <button onClick={onCancel} className="text-gray-500 hover:text-black p-2">
                Cancel
            </button>
        </div>

        {/* Cropper Container */}
        <div className="relative flex-grow bg-gray-900">
            <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            />
        </div>

        {/* Controls */}
        <div className="p-6 bg-white space-y-4 shrink-0 safe-pb">
            <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-500 w-10">Zoom</span>
                <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-grow h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-jike-yellow"
                />
            </div>
            
            <button 
                onClick={handleSave}
                className="w-full bg-black text-white py-3 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors active:scale-95 touch-manipulation"
            >
                Confirm Crop
            </button>
        </div>
      </div>
    </div>
  )
}

export default ImageCropper