
import React, {Component} from 'react';
import {View,Text,ToastAndroid,ScrollView} from 'react-native';

const url = 'http://v.juhe.cn/todayOnhistory/queryDetail.php?key=b1f0f18192077cb772d564bf3b7ed6b5&e_id=';

export default class NewDetail extends Component {
  static navigationOptions  = {
    title: '历史上的今天',
  };

  constructor(props){
    super(props);
    this.state = {
      e_id:this.props.navigation.getParam('eventId','1'),
      data:[],
    };
    this.fetchData=this.fetchData.bind(this);
  }
  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    fetch(url+this.state.e_id)
    .then((response)=>response.json())
    .then((response)=>{
      this.getData(response);
    })
    .catch((error)=>{
      console.error(error);
    });  
  }
  getData(response){
    if (response.error_code == 0) {
      this.setState({
        data:response.result[0],
      });
    }else{
       this.onFailed(response.reason);
    }
  }
  onFailed(msg) {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
  }

  render() {
    return (
      <ScrollView style={{ fontSize:18}}>
        <Text>{this.state.data.content}</Text>
      </ScrollView>
    );
  }

}


