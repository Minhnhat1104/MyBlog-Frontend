import { useState } from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import style from './Upload.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { LoadingButton } from '@mui/lab';
import { useImageMutation } from '~/hooks/useImageMutation';
import { Box, Breakpoint, Divider, Grid, InputLabel, Stack, TextField, Typography, useTheme } from '@mui/material';
import MiModal from '~/base/components/MiModal';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '~/config/queryKeys';
import { SET_TIMEOUT } from '~/base/config/constants';

interface WriteProps {
  isOpen: boolean;
  onClose: (value: any) => void;
}

function Write(props: WriteProps) {
  const { isOpen, onClose } = props;
  const theme = useTheme();
  const queryClient = useQueryClient();
  const user = useSelector((state: any) => state.auth.login?.currentUser);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<any>(null);

  const dispatch = useDispatch();
  const { mUpload } = useImageMutation();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const params = {
      imageFile,
      name,
      description,
      user,
    };
    mUpload.mutate(params, {
      onSuccess(data, variables, context) {
        setTimeout(() => {
          queryClient.invalidateQueries([queryKeys.imageList]);
        }, SET_TIMEOUT);
      },
    });
  };

  const Footer = (
    <Grid container justifyContent="space-between">
      <Grid item></Grid>
      <Grid item>
        <LoadingButton
          onClick={handleSubmit}
          loading={mUpload.isLoading}
          variant="contained"
          sx={{ width: 'fit-content', margin: 'auto' }}
        >
          Upload
        </LoadingButton>
      </Grid>
    </Grid>
  );

  return (
    <MiModal title={'Upload image'} isOpen={isOpen} size="sm" onClose={onClose} footer={Footer}>
      {user ? (
        <Box p={2}>
          <Box width="100%">
            <Stack spacing={1} width={'100%'} alignItems="flex-start">
              <Box width={'100%'} alignItems="flex-start" justifyContent="flex-start">
                <InputLabel sx={{ fontWeight: 500, color: theme.palette.secondary.main, textAlign: 'left' }}>
                  Picture's name
                </InputLabel>
                <TextField
                  name="name"
                  type="text"
                  placeholder="Enter your picture's name"
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box width={'100%'} alignItems="flex-start" justifyContent="flex-start">
                <InputLabel sx={{ fontWeight: 500, color: theme.palette.secondary.main, textAlign: 'left' }}>
                  Description
                </InputLabel>
                <TextField
                  id="description"
                  fullWidth
                  name="description"
                  rows={4}
                  multiline
                  placeholder="Enter your description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
              <Box width={'100%'} alignItems="flex-start" justifyContent="flex-start">
                <InputLabel sx={{ fontWeight: 500, color: theme.palette.secondary.main, textAlign: 'left' }}>
                  Images
                </InputLabel>
                <Box
                  sx={{
                    borderRadius: 1,
                    border: `1px solid ${theme.palette.grey[300]}`,
                    py: 1,
                    px: 2,
                    width: '100%',
                  }}
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                >
                  <input
                    multiple
                    // className={cx('file-input')}
                    name="testImage"
                    type="file"
                    style={{ textAlign: 'left', width: 'fit-content' }}
                    onChange={(e: any) => {
                      setImageFile(e.target.files);
                    }}
                  />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      ) : null}
    </MiModal>
  );
}

export default Write;
