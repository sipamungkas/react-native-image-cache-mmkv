import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  type LayoutChangeEvent,
  TouchableOpacity,
} from 'react-native';
import {
  CacheImage,
  clearCache,
} from '@sipamungkas/react-native-image-cache-mmkv';

const getImageUrl = (id: string, width: number, height: number) =>
  `https://unsplash.it/${width}/${height}?image=${id}`;

const MARGIN = 2;

export const ImageGridItem = React.memo(({ id, ImageComponent }: any) => {
  const uri = getImageUrl(id, 100, 100);
  return (
    <Image
      style={{ height: 100, width: 200 }}
      source={{
        uri,
      }}
    />
  );
});

export default function App() {
  const [images, setImages] = React.useState<any[]>([]);
  const [itemHeight, setItemHeight] = React.useState(0);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    fetch('https://unsplash.it/list')
      .then((res) => res.json())
      .then((d) => setImages(d))
      .catch((e) => setError(e));
  }, []);

  const onLayout = React.useCallback((e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    setItemHeight(width / 4);
  }, []);

  const getItemLayout = React.useCallback(
    (_: any, index: number) => {
      return { length: itemHeight, offset: itemHeight * index, index };
    },
    [itemHeight]
  );

  const extractKey = React.useCallback((item: any) => {
    return item.id;
  }, []);

  const renderItem = React.useCallback(({ item }: { item: any }) => {
    return <ImageGridItem id={item.id} ImageComponent={CacheImage} />;
  }, []);

  const onClearCache = React.useCallback(() => {
    clearCache();
    setImages([]);
  }, []);

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'stretch',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
          }}
        >
          Error fetching images.
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Image Cache Test</Text>
      <TouchableOpacity onPress={onClearCache}>
        <Text>Clear Cache</Text>
      </TouchableOpacity>
      <FlatList
        onLayout={onLayout}
        style={{
          marginTop: 25,
          flex: 1,
        }}
        columnWrapperStyle={[
          {
            flex: 1,
            flexDirection: 'row',
            marginLeft: -MARGIN,
            marginRight: -MARGIN,
          },
          { height: itemHeight },
        ]}
        data={images}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={extractKey}
        getItemLayout={getItemLayout}
      />
      {/* <CacheImage
        style={{ height: 100, width: 200 }}
        source={{
          uri: getImageUrl('0', 5000, 3333),
        }}
      />
      <CacheImage
        style={{ height: 100, width: 200 }}
        source={{
          uri: getImageUrl('1', 5000, 3333),
        }}
      />
      <Image
        style={{ height: 100, width: 200 }}
        source={{
          uri: getImageUrl('0', 5000, 3333),
        }}
      />

      <Image
        style={{ height: 100, width: 200 }}
        source={{
          uri: getImageUrl('1', 5000, 3333),
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
