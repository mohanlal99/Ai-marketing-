import React from 'react';
import { GeneratedImage } from '../types';
import { Download, ExternalLink, Calendar } from 'lucide-react';

interface GalleryProps {
  images: GeneratedImage[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  
  const handleDownload = (dataUrl: string, id: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `nanomerch-${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recent Creations</h2>
          <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-md border border-slate-700">
            {images.length} items
          </span>
       </div>

      <div className="space-y-8">
        {images.map((img, index) => (
          <div key={img.id} className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards" style={{ animationDelay: `${index * 100}ms` }}>
            
            {/* Main Image Display */}
            <div className="aspect-video bg-black relative group">
                <img 
                    src={img.result} 
                    alt={img.prompt}
                    className="w-full h-full object-contain"
                />
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <div className="flex gap-3 justify-end">
                        <button 
                            onClick={() => handleDownload(img.result, img.id)}
                            className="bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-lg"
                        >
                            <Download className="w-4 h-4" />
                            Download PNG
                        </button>
                    </div>
                </div>
            </div>

            {/* Details Footer */}
            <div className="p-5 border-t border-slate-700">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-slate-200 text-sm leading-relaxed font-medium">
                            "{img.prompt}"
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                <Calendar className="w-3 h-3" />
                                {new Date(img.timestamp).toLocaleTimeString()}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 uppercase tracking-wider font-bold">
                                <span className={`w-2 h-2 rounded-full ${img.type === 'merch' ? 'bg-blue-500' : 'bg-purple-500'}`}></span>
                                {img.type === 'merch' ? 'Merchandise' : 'Magic Edit'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};