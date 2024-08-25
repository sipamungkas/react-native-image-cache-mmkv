import React from 'react';
import { useEffect, useState } from 'react';
import type { ImageProps } from 'react-native';
import {
  NativeModules,
  Platform,
  Image,
  ActivityIndicator,
  View,
} from 'react-native';
import { cachedImage } from './cachedImage';
import { storage } from './storage';

const LINKING_ERROR =
  `The package '@sipamungkas/react-native-image-cache-mmkv' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const ReactNativeImageCacheMmkvModule = isTurboModuleEnabled
  ? require('./NativeReactNativeImageCacheMmkv').default
  : NativeModules.ReactNativeImageCacheMmkv;

const ReactNativeImageCacheMmkv = ReactNativeImageCacheMmkvModule
  ? ReactNativeImageCacheMmkvModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return ReactNativeImageCacheMmkv.multiply(a, b);
}

export function CacheImage(props: ImageProps) {
  // console.log({ uri: props.source.uri });
  const [imageData, setImageData] = useState<any>(null);
  useEffect(() => {
    const getCachedImage = async () => {
      try {
        const image = await cachedImage(props.source.uri);
        setImageData(image);
      } catch (error) {
        setImageData(props.source.uri);
      }
    };
    getCachedImage();
  }, [props.source.uri]);
  if (!imageData) {
    return (
      <View style={props.style}>
        <ActivityIndicator size={'large'} color={'red'} />
      </View>
    );
  }
  return <Image {...props} source={{ uri: imageData }} />;
}

export function clearCache() {
  storage.clearAll();
}
