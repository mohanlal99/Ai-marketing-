import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageInputProps {
  currentImage: string | null;
  onImageUpload: (base64: string) => void;
}

export const ImageInput: React.FC<ImageInputProps> = ({ currentImage, onImageUpload }) => {
  
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  if (currentImage) {
    return (
      <div className="relative group rounded-xl overflow-hidden border border-slate-700 aspect-square lg:aspect-video bg-slate-900">
        <img 
          src={currentImage} 
          alt="Uploaded Source" 
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <label className="cursor-pointer bg-white text-slate-900 px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-200 transition-colors">
                Change Image
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="hidden" 
                />
            </label>
        </div>
      </div>
    );
  }

  return (
    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer bg-slate-800/30 hover:bg-slate-800/60 hover:border-slate-500 transition-all group">
      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
        <div className="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-slate-700 flex items-center justify-center mb-4 transition-colors">
            <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
        </div>
        <p className="mb-2 text-sm text-slate-300 font-medium">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-slate-500">
          SVG, PNG, JPG or GIF (Max 800x800px recommended)
        </p>
      </div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className="hidden" 
      />
    </label>
  );
};