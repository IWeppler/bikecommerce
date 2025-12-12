"use client";

import { useState, useRef } from "react";
import { Camera, X, UploadCloud } from "lucide-react";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  error?: string;
}

export function ImageUpload({ onImageSelect, error }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
      
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp" 
        className="hidden" 
      />

      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-sm p-10 text-center cursor-pointer transition-colors group
            ${error ? "border-blood bg-red-50" : "border-gray-300 hover:bg-gray-50 hover:border-blood"}`}
        >
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-colors">
             <UploadCloud className={`w-6 h-6 ${error ? "text-blood" : "text-gray-400 group-hover:text-blood"}`} />
          </div>
          <p className="font-bold text-foreground">Hacé clic para subir una foto</p>
          <p className="text-xs text-gray-500 mt-2">JPG, PNG o WebP (Máx. 5MB)</p>
          {error && <p className="text-xs text-blood mt-2 font-bold">{error}</p>}
        </div>
      ) : (
        <div className="relative w-full h-64 rounded-sm overflow-hidden border border-gray-200 group">
          <img 
            src={preview} 
            alt="Vista previa" 
            className="w-full h-full object-cover" 
          />
          {/* Botón para eliminar */}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}