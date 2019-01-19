
import React, {Component} from 'react';
import {WebView} from 'react-native';


export default class NewDetail extends Component {
  static navigationOptions  = {
    title: '新闻详情',

    headerStyle: {height: 48, backgroundColor: '#8DD1F9'},
    headerTitleStyle: {
        textAlign: 'left',
        flex:1,
        color:'#fff'
    },
  };

  constructor(props){
    super(props);
    this.state = {
      url:this.props.navigation.getParam('Url','www.baidu.com'),
    };
  }

  render() {
    return (
      <WebView
        source={{uri: this.state.url }}
        style={{marginTop: 20}}
      />
    );
  }

}


