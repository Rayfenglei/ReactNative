
import React, {Component} from 'react';
import {Button, StyleSheet, Text, View,NativeModules} from 'react-native';

var nativeModule = NativeModules.OpenAndroidModule;

export default class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.content}>我的首页</Text>
        <Button title='跳转Android' onPress={()=>{this.jumpToAndroidView();}}/>
        <Button title='向Android传递数据' onPress={()=>{this.sendToAndroidMsg();}}/>
      </View>
    );
  }

  jumpToAndroidView() {
    nativeModule.openAndroidView();
  }
  sendToAndroidMsg(){
    nativeModule.getStringFromReactNative('RN传递的数据');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  content: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
