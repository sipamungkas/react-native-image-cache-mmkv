import { storage } from './storage';

export type CachedImageProps = {
  uri: string;
};

function convertBlobtoBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export async function cachedImage(uri: string) {
  const image = storage.getString(`image.${uri}`);
  if (image) {
    return image;
  }
  const res = await fetch(uri);
  const imageBlobFormat = await res.blob();
  const imageBase64 = (await convertBlobtoBase64(imageBlobFormat)) as string;
  storage.set(`image.${uri}`, imageBase64);
  return imageBase64;
}
