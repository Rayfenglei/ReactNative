
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  Image,
  Dimensions,
  TextInput,
  ToastAndroid,
} from 'react-native';


const { width, height } = Dimensions.get('window');

export default class Login extends Component {
   constructor(props){
    super(props);
    this.state={
      account:'',
      password:'',
    };
  }
  static navigationOptions = {
     header:null,
  };
  pressToTabber() {
    if( this.state.account=='1' ){
      this.props.navigation.navigate('Tabbar'); 
    }else{
      ToastAndroid.show('账号或密码错误',ToastAndroid.SHORT);
    }  
  }
  render() {
    return (

      <ImageBackground
        source={require('../../Image/login.jpg')}
        style={{ width: width, height: height }}>
         <View style={styles.container}>
          <View style={styles.userbox}>
            <Image source={require('../../Image/my.png')} style={styles.boximage}/>
            <TextInput style={{marginLeft:6}} placeholder={'请输入用户名'} onChangeText={(Input)=>{this.setState({account:Input})}}/>  
          </View>
          <View style={styles.passbox}>
            <Image source={require('../../Image/joker.png')} style={styles.boximage}/>
            <TextInput style={{marginLeft:6}} placeholder={'请输入密码'} maxLength={16} secureTextEntry={true} onChangeText={(Input)=>{this.setState({password:Input})}}/> 
          </View>
          <View style={styles.buttonstyle}>
            <Button color='green' title='登录' onPress={()=>{ this.props.navigation.navigate('Tabbar') }}/>
          </View>
          <View style={styles.textstyle}>
            <Text style={styles.zcstyle}>用户注册</Text>
            <Text style={styles.zcstyle}>忘记密码</Text>
          </View>
         </View>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  userbox: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 40,
    width: 250,
    borderRadius: 5,
    marginTop: height/3,
    marginBottom: 20,
  },
  passbox: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 40,
    width: 250,
    borderRadius: 5,
  },
  boximage: {
    marginLeft:3, 
    width: 30,
    height: 30,
  },
  buttonstyle: {
    height: 40,
    width: 250,
    borderRadius: 5,
    marginTop: 20,
 
  },
  textstyle: {
    height: 40,
    width: 250,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  zcstyle:{
    fontSize:12,
    color:'blue',
  },
});