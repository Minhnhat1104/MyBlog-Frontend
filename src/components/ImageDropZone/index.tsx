import React from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

interface ImageDropZoneProps {
  name?: string;
  value: FileWithPath[];
  onChange: (nVal: FileWithPath[]) => void;
  disabled?: boolean;
}

function ImageDropZone({ name, value, onChange, disabled }: ImageDropZoneProps) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    disabled,
    onDropAccepted(files, event) {
      console.log('🚀 ~ ImageDropZone ~ files:', files);
      onChange(files);
    },
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input name={name} {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export default ImageDropZone;
