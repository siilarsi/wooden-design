import React, { useRef } from 'react';

type Props = {
  onFile: (file: File) => void;
};

export default function DropZone({ onFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    onFile(files[0]);
  };

  return (
    <div
      id="dropArea"
      className="dropArea"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
    >
      Drag & Drop Texture Here
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="fileInput"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
