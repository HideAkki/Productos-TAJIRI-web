'use client';

import Image, { type ImageProps } from 'next/image';
import { buildCloudinaryImageUrl } from '@/lib/cloudinary';

export type CloudinaryImageProps = Omit<ImageProps, 'src' | 'quality'> & {
  publicId: string;
  width?: number;
  height?: number;
  quality?: number | 'auto';
  crop?: string;
  fetchFormat?: string;
};

export default function CloudinaryImage({
  publicId,
  width,
  height,
  quality: qualityProp = 'auto',
  crop = 'fill',
  fetchFormat = 'auto',
  alt,
  ...props
}: CloudinaryImageProps) {
  const quality = qualityProp;
  const src = buildCloudinaryImageUrl(publicId, {
    width,
    height,
    quality,
    crop,
    fetchFormat,
  });

  return <Image src={src} alt={alt || ''} width={width} height={height} {...props} />;
}
