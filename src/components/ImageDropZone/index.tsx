import React, { useMemo } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

interface ImageDropZoneProps {
  name?: string;
  value: FileWithPath[];
  onChange: (nVal: FileWithPath[]) => void;
  disabled?: boolean;
}

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

function ImageDropZone({ name, value, onChange, disabled }: ImageDropZoneProps) {
  const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    disabled,
    accept: { 'image/*': [] },
    onDropAccepted(files, event) {
      console.log('🚀 ~ ImageDropZone ~ files:', files);
      onChange(files);
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

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
