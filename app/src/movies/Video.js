import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Video from 'react-native-video';

export default class VideoPlayer extends Component {
  static navigationOptions  = {
    title: '每日精选',

    headerStyle: {height: 48, backgroundColor: '#8DD1F9'},
    headerTitleStyle: {
        textAlign: 'left',
        flex:1,
        color:'#fff'
    },
  };
    constructor(props) {
        super(props);
        this.state = {
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: false,
            url:this.props.navigation.getParam('Url','www.baidu.com'),
          };
    }   

  onLoad = data => {
    this.setState({ duration: data.duration });
  };

  onProgress = data => {
    this.setState({ currentTime: data.currentTime });
  };

  onEnd = () => {
    this.setState({ paused: true });
    this.video.seek(0);
  };

  onAudioBecomingNoisy = () => {
    this.setState({ paused: true });
  };

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return (
        parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
      );
    }
    return 0;
  }

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.fullScreen}
          onPress={() => this.setState({ paused: !this.state.paused })}>
          <Video
            ref={ref => {
              this.video = ref;
            }}
            source={{
              uri:
                this.state.url,
            }}
            style={styles.fullScreen}
            paused={this.state.paused}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onAudioBecomingNoisy={this.onAudioBecomingNoisy}
            repeat={false}
          />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.progress}>
            <View
              style={[styles.innerProgressCompleted, { flex: flexCompleted }]}
            />
            <View
              style={[styles.innerProgressRemaining, { flex: flexRemaining }]}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
});

