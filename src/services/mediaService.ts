import api, { type ApiResponse } from '@/lib/api';

export interface MediaFile {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  uploadedAt: string;
}

export interface UploadProgressCallback {
  (progress: number): void;
}

const ENDPOINTS = {
  upload:        '/media/upload',
  uploadMultiple:'/media/upload/multiple',
  delete:        (id: string) => `/media/${id}`,
  getAll:        '/media',
} as const;

export const mediaService = {

  /** Upload a single image */
  uploadImage: async (
    file: File,
    onProgress?: UploadProgressCallback
  ): Promise<MediaFile> => {
    const formData = new FormData();
    formData.append('file', file);

    if (onProgress) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            onProgress(Math.round((e.loaded / e.total) * 100));
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            resolve(data.data);
          } else {
            reject(new Error(`Upload failed: ${xhr.status}`));
          }
        });

        xhr.addEventListener('error', () => reject(new Error('Upload failed')));

        const token = typeof window !== 'undefined'
          ? localStorage.getItem('auth_token')
          : null;

        xhr.open('POST', `${baseUrl}${ENDPOINTS.upload}`);
        if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.send(formData);
      });
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${ENDPOINTS.upload}`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const json: ApiResponse<MediaFile> = await res.json();
    return json.data!;
  },

  uploadMultiple: async (files: File[]): Promise<MediaFile[]> => {
    const formData = new FormData();
    files.forEach((f) => formData.append('files', f));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${ENDPOINTS.uploadMultiple}`,
      { method: 'POST', body: formData }
    );
    const json: ApiResponse<MediaFile[]> = await res.json();
    return json.data!;
  },

  delete: (id: string) =>
    api.delete<ApiResponse<void>>(ENDPOINTS.delete(id)),

  getAll: () =>
    api.get<ApiResponse<MediaFile[]>>(ENDPOINTS.getAll),
};

export default mediaService;