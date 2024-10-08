package com.sipamungkas.reactnativeimagecachemmkv;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class ReactNativeImageCacheMmkvModule extends ReactNativeImageCacheMmkvSpec {
  public static final String NAME = "ReactNativeImageCacheMmkv";

  ReactNativeImageCacheMmkvModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }


  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  public void multiply(double a, double b, Promise promise) {
    promise.resolve(a * b);
  }
}
