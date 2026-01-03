import { Box, List, ListItem, Stack, Typography, useTheme } from '@mui/material';
import React, { CSSProperties, useMemo } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

interface ImageDropZoneProps {
  name?: string;
  value: FileWithPath[];
  onChange: (nVal: FileWithPath[]) => void;
  disabled?: boolean;
}

const baseStyle: CSSProperties = {
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

function ImageDropZone({ name, value, onChange, disabled = false }: ImageDropZoneProps) {
  const theme = useTheme();
  const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    disabled,
    maxFiles: 1,
    accept: { 'image/*': [] },
    onDropAccepted(files, event) {
      onChange(
        files?.map((_item: any) => {
          _item.src = URL.createObjectURL(_item) || '';
          return _item;
        })
      );
    },
  });

  const style = useMemo<CSSProperties>(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <section style={{ width: '100%' }}>
      <div {...getRootProps({ style })}>
        <input name={name} {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <List>
          {acceptedFiles.map((file: any) => (
            <ListItem key={file.path} sx={{ pl: 0, display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: 999,
                  background: theme.palette.common.black,
                  mr: 1,
                  flexShrink: 0,
                }}
              />
              <img alt={file?.name} src={file?.src} style={{ width: 24, height: 24, marginRight: 8 }} />
              <Typography>
                {file.path} - {file.size} bytes
              </Typography>
            </ListItem>
          ))}
        </List>
      </aside>
    </section>
  );
}

export default ImageDropZone;
