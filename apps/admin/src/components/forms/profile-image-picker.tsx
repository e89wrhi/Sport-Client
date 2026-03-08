'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Input } from '../ui/input';

interface ProfileImagePickerProps {
  name: string;
  value: File | null;
  fileName?: string | null;
  currentImageSrc?: string;
  onChange: (file: File | null) => void;
  onClear: () => void;
  label?: string;
  error?: string;
  isUpdating?: boolean;
  maxSizeMB?: number;
}

export function ProfileImagePicker({
  name,
  value,
  fileName,
  currentImageSrc,
  onChange,
  onClear,
  error,
  isUpdating = false,
  maxSizeMB = 2,
}: ProfileImagePickerProps) {
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
      //setInternalFileName(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(value);

    const sizeInKB = value.size / 1024;
    const readableSize =
      sizeInKB < 1024
        ? `${sizeInKB.toFixed(1)} KB`
        : `${(sizeInKB / 1024).toFixed(2)} MB`;
    setFileSize(readableSize);
    setInternalFileName(value.name);
    return () => {
      // optional: revoke URL if you used URL.createObjectURL
    };
  }, [value]);

  const handlePick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange(file);
  };

  const handleClear = () => {
    onChange(null);
    setPreview(null);
    onClear();
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-6">
        <Avatar className="h-20 w-20 border-2 shadow-md">
          {preview || currentImageSrc ? (
            <AvatarImage
              src={preview ?? currentImageSrc ?? undefined}
              alt={name}
              className=" object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '';
              }}
            />
          ) : null}
          <AvatarFallback className="text-xl font-semibold bg-primary/20 text-primary">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={handlePick}
              disabled={isUpdating}
            >
              <Upload className="h-4 w-4 mr-2" />
              {value ? 'Change Image' : 'Upload New Image'}
            </Button>

            {value && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleClear}
                disabled={isUpdating}
              >
                <X className="h-4 w-4 mr-1" /> Clear
              </Button>
            )}
          </div>

          <Input
            type="file"
            ref={inputRef}
            onChange={handleChange}
            className="hidden"
            accept="image/*"
            disabled={isUpdating}
          />
          {internalFileName && (
            <p className="text-xs mt-1 truncate w-full text-start">
              {internalFileName} {fileSize && `(${fileSize})`}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            {value
              ? `Selected: ${fileName ?? value.name}`
              : `Max file size ${maxSizeMB}MB. JPG, PNG.`}
          </p>
        </div>
      </div>

      {preview && (
        <div className="text-xs text-orange-600 flex items-center pt-2">
          <ImageIcon className="h-3 w-3 mr-1" />
          New image preview ready.
        </div>
      )}

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
