import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageInput } from './components/ImageInput';
import { EditorPanel } from './components/EditorPanel';
import { MerchGrid } from './components/MerchGrid';
import { Gallery } from './components/Gallery';
import { generateEditedImage } from './services/gemini';
import { GeneratedImage, MerchProduct } from './types';
import { Layers, Wand2, ShoppingBag, AlertCircle, Download, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'edit' | 'merch'>('merch');
  const [inputImage, setInputImage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (base64: string) => {
    setInputImage(base64);
    setError(null);
  };

  const handleGenerate = useCallback(async (prompt: string) => {
    if (!inputImage) return;

    setIsProcessing(true);
    setError(null);

    try {
      const resultBase64 = await generateEditedImage(inputImage, prompt);
      
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        original: inputImage,
        result: resultBase64,
        prompt: prompt,
        timestamp: Date.now(),
        type: activeTab
      };

      setGeneratedImages(prev => [newImage, ...prev]);
    } catch (err: any) {
      console.error("Generation failed:", err);
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [inputImage, activeTab]);

  const handleMerchSelect = (product: MerchProduct) => {
    const prompt = `A high-quality, photorealistic product shot of a ${product.name} featuring the provided logo or design clearly visible on it. Professional studio lighting, commercial photography style.`;
    handleGenerate(prompt);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: INPUT & CONTROLS */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Input Section */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-400" />
                  Source Image
                </h2>
                {inputImage && (
                  <button 
                    onClick={() => setInputImage(null)}
                    className="text-xs text-slate-400 hover:text-red-400 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              
              <ImageInput 
                currentImage={inputImage} 
                onImageUpload={handleImageUpload} 
              />
            </div>

            {/* Tools Section (Only visible if image exists) */}
            {inputImage && (
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm flex flex-col flex-1">
                <div className="flex border-b border-slate-700">
                  <button
                    onClick={() => setActiveTab('merch')}
                    className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                      activeTab === 'merch' 
                        ? 'bg-slate-700/50 text-blue-400 border-b-2 border-blue-400' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Merch Mockups
                  </button>
                  <button
                    onClick={() => setActiveTab('edit')}
                    className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                      activeTab === 'edit' 
                        ? 'bg-slate-700/50 text-purple-400 border-b-2 border-purple-400' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                    }`}
                  >
                    <Wand2 className="w-4 h-4" />
                    Magic Edit
                  </button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto max-h-[600px]">
                  {activeTab === 'merch' ? (
                    <MerchGrid 
                      onSelect={handleMerchSelect} 
                      disabled={isProcessing} 
                    />
                  ) : (
                    <EditorPanel 
                      onGenerate={handleGenerate} 
                      isProcessing={isProcessing} 
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: PREVIEW & RESULTS */}
          <div className="lg:col-span-7 flex flex-col gap-6">
             {/* Status & Error Messages */}
             {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Active Processing State */}
            {isProcessing && (
               <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[400px] animate-pulse">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 rounded-full"></div>
                    <Loader2 className="w-12 h-12 text-blue-400 animate-spin relative z-10" />
                  </div>
                  <h3 className="text-lg font-medium text-white mt-6">Generating...</h3>
                  <p className="text-slate-400 mt-2 max-w-xs">
                    Gemini Nano is reimagining your pixels. This might take a moment.
                  </p>
               </div>
            )}

            {/* Results Gallery */}
            {!isProcessing && generatedImages.length > 0 && (
               <Gallery images={generatedImages} />
            )}

            {/* Empty State */}
            {!isProcessing && generatedImages.length === 0 && (
              <div className="bg-slate-800/30 border border-dashed border-slate-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-inner">
                  <Layers className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-lg font-medium text-slate-300">No generations yet</h3>
                <p className="text-slate-500 mt-2 max-w-sm">
                  Upload an image on the left and select a product or type a prompt to get started.
                </p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;