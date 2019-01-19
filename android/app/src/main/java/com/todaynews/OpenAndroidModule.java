package com.todaynews;

import android.content.Intent;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class OpenAndroidModule extends ReactContextBaseJavaModule {

    private ReactContext mReactContext;
    public static String msg = null;


    public OpenAndroidModule(ReactApplicationContext context) {
        super(context);
        this.mReactContext = context;
    }

    @Override
    public String getName() {
        return "OpenAndroidModule";
    }

    @ReactMethod
    public void openAndroidView() {
        Intent intent = new Intent();
        intent.setClass(mReactContext, RNActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mReactContext.startActivity(intent);
    }

    @ReactMethod
    public void getStringFromReactNative(String s) {
        msg = s;
    }


}
