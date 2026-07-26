import React, { useState, useRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Upload, X } from 'lucide-react';

export interface ImageUploadZoneProps {
  onFileSelect?: (file: File | null) => void;
  value?: string;
  label?: string;
  helperText?: string;
  className?: string;
}

export const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({
  onFileSelect,
  value,
  label = 'Upload Event Banner',
  helperText = 'Drag and drop an image here, or click to select (PNG, JPG up to 10MB)',
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onFileSelect?.(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(undefined);
    if (inputRef.current) inputRef.current.value = '';
    onFileSelect?.(null);
  };

  return (
    <div className={twMerge(clsx('w-full select-none', className))}>
      {label && (
        <label className="block font-display font-bold uppercase tracking-wider text-xs mb-2 text-black">
          {label}
        </label>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={clsx(
          'border-3 border-dashed border-black p-8 text-center relative rounded-none transition-colors cursor-pointer neo-shadow-sm flex flex-col items-center justify-center min-h-[220px]',
          isDragging ? 'bg-pastel-yellow' : previewUrl ? 'bg-black/5' : 'bg-white hover:bg-[#F9F5F6]'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />

        {previewUrl ? (
          <div className="relative w-full max-w-sm aspect-video bg-black neo-border overflow-hidden group">
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-[#FF5757] text-black p-1.5 neo-border neo-shadow-sm hover:scale-110 transition-transform cursor-pointer"
              title="Remove image"
            >
              <X className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center max-w-xs mx-auto">
            <div className="w-14 h-14 bg-pastel-mint border-2 border-black flex items-center justify-center mb-4 neo-shadow-sm">
              <Upload className="w-7 h-7 text-black stroke-[2.5]" />
            </div>
            <span className="font-display font-black text-sm uppercase tracking-wide text-black mb-1">
              Click or drag image
            </span>
            <p className="text-xs font-body text-gray-600">{helperText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadZone;
