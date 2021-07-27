import byteSize from 'byte-size';
import uniq from 'lodash/uniq';

import { browser } from './browser';

export const downloadFile = (blobParts: BlobPart[], filename: string, contentType = 'application/octet-stream') => {
  const a = document.createElement('a');
  const blob = new Blob(blobParts, { type: contentType });

  a.href = window.URL.createObjectURL(blob);
  a.download = filename;
  a.click();
};

export const getFileExtensionLabels = (extensions: Array<string>) => {
  return uniq(extensions.map(getFileExtensionLabel)).join(', ');
};

export const getFileExtensionLabel  = (extension: string): string => {
  const labels = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'audio/mp4': 'mp4',
    'audio/mp3': 'mp3',
    'audio/mpeg': 'mp3',
    'audio/m4a': 'm4a',
    'audio/x-m4a': 'm4a',
    'audio/wav': 'wav',
    'audio/x-wav': 'wav',
    'video/mp4': 'mp4',
    'video/quicktime': 'mov',
    'application/vnd.ms-excel': 'xls', 
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx', 
  };

  if (extension[0] === '.') {
    extension = extension.substring(1);
  }

  return (labels[extension] || extension).toUpperCase();
};


export const parseBytes = (bytes: number): { amount: number; unit: string } => {
  if (bytes === 0) {
    return {
      amount: 0,
      unit: 'Bytes'
    };
  }

  const result = byteSize(bytes);

  return {
    amount: Math.round(result.value),
    unit: result.unit
  };
};

export const getBase64FromUrl = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve('');

      return;
    }

    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d');
    const img = new Image();

    img.crossOrigin = 'anonymous';

    img.onload = () => {
      canvas.height = img.height;
      canvas.width = img.width;
      canvasCtx?.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL();

      resolve(dataURL);
    };

    img.onerror = () => {
      reject('Something went wrong with the image');
    };

    img.src = url;
  });
};

export const getBase64FromFile = (file: File): Promise<string> => {
  const reader = new FileReader();

  if (browser?.name === 'safari') {
    return new Promise((resolve) => resolve(URL.createObjectURL(file)));
  }

  return new Promise((resolve) => {
    reader.onload = ({ target }) => {
      if (target) {
        resolve(String(target.result));
      }
    };

    reader.readAsDataURL(file);
  });
};