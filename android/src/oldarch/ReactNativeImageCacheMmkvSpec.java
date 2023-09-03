package com.sipamungkas.reactnativeimagecachemmkv;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Promise;

abstract class ReactNativeImageCacheMmkvSpec extends ReactContextBaseJavaModule {
  ReactNativeImageCacheMmkvSpec(ReactApplicationContext context) {
    super(context);
  }

  public abstract void multiply(double a, double b, Promise promise);
}
