type CloudinaryOptions = {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  crop?: string;
  fetchFormat?: string;
};

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

if (!cloudName) {
  throw new Error('Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable.');
}

const cloudinaryBaseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;

export function buildCloudinaryImageUrl(publicId: string, options: CloudinaryOptions = {}) {
  const transformations: string[] = [];

  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.crop) transformations.push(`c_${options.crop}`);
  if (options.quality) transformations.push(`q_${options.quality}`);
  if (options.fetchFormat) transformations.push(`f_${options.fetchFormat}`);

  const transformationPath = transformations.length > 0 ? `${transformations.join(',')}/` : '';
  const formattedPublicId = publicId.startsWith('/') ? publicId.slice(1) : publicId;

  return `${cloudinaryBaseUrl}/${transformationPath}${formattedPublicId}`;
}
