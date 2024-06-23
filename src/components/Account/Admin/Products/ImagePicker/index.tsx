import React, { useEffect, useState } from 'react';
import InputFile, { MAX_SIZE_FILE } from '@shared/UI/InputFile';
import { enqueueSnackbar } from 'notistack';
import Colors from '@shared/utils/Colors';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface IProps {
  imgFileList: FileList;
  error?: FieldError;
  register: UseFormRegister<any>;
  defaultValueSrc?: string;
}

const DEFAULT_IMAGE = '/images/product/image_placeholder.png';

const ImagePicker = ({
  imgFileList,
  error,
  register,
  defaultValueSrc,
}: IProps) => {
  const [imgSrc, setImgSrc] = useState<string>(
    defaultValueSrc ? defaultValueSrc : DEFAULT_IMAGE
  );

  useEffect(() => {
    const file = imgFileList ? imgFileList[0] : null;
    if (file && file.size > MAX_SIZE_FILE) {
      enqueueSnackbar('Превышен лимит загрузки изображения', {
        variant: 'error',
      });
      return;
    }

    if (file) {
      const blob = new Blob([file], { type: 'image/png' });
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result;
        if (file) {
          setImgSrc(base64String as string);
        } else {
          setImgSrc('/images/product/image_placeholder.png');
        }
      };

      reader.readAsDataURL(blob);
    }
  }, [imgFileList]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: error ? Colors.$rootErrorBackground : 'auto',
        padding: '10px 0 10px 0',
      }}
    >
      <img
        src={imgSrc}
        alt="no-image"
        width={150}
        height={150}
        style={{ objectFit: 'cover', borderRadius: 8 }}
      />
      <InputFile
        required={true}
        register={register}
        name="image"
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

export default ImagePicker;
