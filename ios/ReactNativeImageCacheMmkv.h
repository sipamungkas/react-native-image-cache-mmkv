
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNReactNativeImageCacheMmkvSpec.h"

@interface ReactNativeImageCacheMmkv : NSObject <NativeReactNativeImageCacheMmkvSpec>
#else
#import <React/RCTBridgeModule.h>

@interface ReactNativeImageCacheMmkv : NSObject <RCTBridgeModule>
#endif

@end
