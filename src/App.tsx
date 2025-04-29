import React, { useState, useCallback, useRef } from 'react';
import './App.css';

function App() {
  const [webpImage, setWebpImage] = useState<File | null>(null);
  const [jpegImage, setJpegImage] = useState<string | null>(null);
  const [webpPreview, setWebpPreview] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((file: File | null) => {
    setError(null);
    setJpegImage(null);
    
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    
    // Accept both WebP and other image formats for flexibility
    setWebpImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setWebpPreview(result);
    };
    reader.readAsDataURL(file);
  }, []);
  
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, [handleFileChange]);
  
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);
  
  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);
  
  const onBrowseClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const convertToJPEG = useCallback(async () => {
    if (!webpImage || !webpPreview) {
      setError('Please select an image first');
      return;
    }
    
    setIsConverting(true);
    setError(null);
    
    try {
      // Create an image element to load the WebP
      const img = new Image();
      
      // Wait for the image to load
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = webpPreview;
      });
      
      // Create a canvas to draw the image
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the image to the canvas
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }
      
      ctx.drawImage(img, 0, 0);
      
      // Convert canvas to JPEG
      const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setJpegImage(jpegDataUrl);
    } catch (err) {
      setError(`Conversion failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsConverting(false);
    }
  }, [webpImage, webpPreview]);
  
  const downloadJpeg = useCallback(() => {
    if (!jpegImage) return;
    
    // Create a temporary anchor element to download the image
    const downloadLink = document.createElement('a');
    downloadLink.href = jpegImage;
    
    // Create a file name based on the original file name but with .jpg extension
    const fileName = webpImage?.name ? webpImage.name.replace(/\.[^.]+$/, '.jpg') : 'converted.jpg';
    downloadLink.download = fileName;
    
    // Trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }, [jpegImage, webpImage]);

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col items-center justify-start py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-2">
        WebP to JPEG Converter
      </h1>
      <p className="text-gray-400 mb-8 max-w-md text-center">
        Convert your WebP images to JPEG format directly in your browser. No upload to server required.
      </p>
      
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-6 mb-8">
        {/* Input Section */}
        <div className="flex-1 flex flex-col items-center">
          <div 
            className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 transition-colors ${dragActive ? 'border-purple-500 bg-purple-500/10' : 'border-gray-600 hover:border-gray-500 bg-gray-900/50'} mb-4 relative overflow-hidden`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            {webpPreview ? (
              <>
                <img 
                  src={webpPreview} 
                  alt="Preview" 
                  className="max-w-full max-h-full object-contain rounded z-10 relative"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button 
                    className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    onClick={() => handleFileChange(null)}
                  >
                    Change Image
                  </button>
                </div>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-400 text-center mb-2">Drag & drop your WebP image here</p>
                <p className="text-gray-500 text-sm text-center mb-4">or</p>
                <button 
                  onClick={onBrowseClick}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Browse Files
                </button>
              </>
            )}
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            accept="image/*" 
          />
          
          {webpImage && (
            <div className="w-full flex flex-col items-center">
              <div className="text-sm text-gray-400 mb-4">
                <span className="font-medium text-gray-300">{webpImage.name}</span> ({Math.round(webpImage.size / 1024)} KB)
              </div>
              
              <button 
                onClick={convertToJPEG} 
                disabled={isConverting}
                className={`w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
              >
                {isConverting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Converting...
                  </>
                ) : 'Convert to JPEG'}
              </button>
            </div>
          )}
        </div>
        
        {/* Output Section */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full h-64 border-2 border-gray-600 rounded-lg flex flex-col items-center justify-center p-4 bg-gray-900/50 mb-4 overflow-hidden">
            {jpegImage ? (
              <img 
                src={jpegImage} 
                alt="Converted JPEG" 
                className="max-w-full max-h-full object-contain rounded"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-center">Converted JPEG will appear here</p>
              </div>
            )}
          </div>
          
          {jpegImage && (
            <button 
              onClick={downloadJpeg}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download JPEG
            </button>
          )}
        </div>
      </div>
      
      {error && (
        <div className="bg-red-900/50 border border-red-800 text-red-300 px-4 py-3 rounded-lg mb-6 max-w-md w-full">
          <p>{error}</p>
        </div>
      )}
      
      <footer className="mt-auto pt-8 text-gray-500 text-sm text-center">
        <p>© {new Date().getFullYear()} WebP to JPEG Converter. All rights reserved.</p>
        <p className="mt-1">Built with React and TailwindCSS</p>
      </footer>
    </div>
  );
}

export default App;
