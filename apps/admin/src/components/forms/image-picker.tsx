'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

interface ImagePickerProps {
  value: File | null;
  fileName?: string | null;
  currentImageSrc?: string;
  onChange: (file: File | null) => void;
  onClear: () => void;
  label?: string;
  error?: string;
  isUpdating?: boolean;
  maxSizeMB?: number;
  large?: boolean;
}

export function ImagePicker({
  value,
  fileName,
  currentImageSrc,
  onChange,
  onClear,
  label,
  error,
  isUpdating = false,
  maxSizeMB = 2,
  large = false,
}: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [internalFileName, setInternalFileName] = useState<string | null>(
    fileName ?? null
  );
  const [fileSize, setFileSize] = useState<string | null>(null);

  useEffect(() => {
    if (!value || !(value instanceof File)) {
      setPreview(null);
      setInternalFileName(null);
      setFileSize(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(value);

    setInternalFileName(value.name);

    const sizeInKB = value.size / 1024;
    const readableSize =
      sizeInKB < 1024
        ? `${sizeInKB.toFixed(1)} KB`
        : `${(sizeInKB / 1024).toFixed(2)} MB`;
    setFileSize(readableSize);
  }, [value]);

  const handlePick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange(file);
  };

  const handleClear = () => {
    onChange(null);
    setPreview(null);
    setInternalFileName(null);
    setFileSize(null);
    onClear();
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-3">
      {label && <p className="text-sm font-medium">{label}</p>}

      {preview || currentImageSrc ? (
        <div
          className={cn(
            'relative rounded-md overflow-hidden border flex flex-col items-center justify-center',
            large ? 'w-48 h-48' : 'w-32 h-32'
          )}
        >
          <Image
            height={200}
            width={200}
            src={preview ?? currentImageSrc ?? ''}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          {internalFileName && (
            <p className="text-xs mt-1 truncate w-full text-center">
              {internalFileName} {fileSize && `(${fileSize})`}
            </p>
          )}
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute top-1 right-1 w-6 h-6"
            onClick={handleClear}
            disabled={isUpdating}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className={cn(
            'flex flex-col items-center justify-center gap-2',
            large ? 'w-48 h-48' : 'w-32 h-32'
          )}
          onClick={handlePick}
          disabled={isUpdating}
        >
          <ImagePlus className="w-6 h-6" />
          <span className="text-xs">Pick Image</span>
        </Button>
      )}

      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
        disabled={isUpdating}
      />

      <p className="text-xs text-muted-foreground">
        {value
          ? `Selected: ${internalFileName ?? value.name} ${fileSize ? `(${fileSize})` : ''}`
          : `Max file size ${maxSizeMB}MB. JPG, PNG.`}
      </p>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
