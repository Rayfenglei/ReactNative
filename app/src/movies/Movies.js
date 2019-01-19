import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View,FlatList ,Image,Dimensions} from 'react-native';

const url = 'https://api.apiopen.top/videoCategoryDetails?id=32';
const { width, height } = Dimensions.get('window');

export default class Movies extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      navigation: props.navigation,
    };
    this.fetchData = this.fetchData.bind(this);
    this.renderData = this.renderData.bind(this);
  }

  //进入界面时渲染
  componentDidMount() {
    this.fetchData();
  }

  //获取数据
  fetchData() {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.getData(response);
      })
      .catch(error => {
        console.error(error);
      });
  }
  getData(response) {
      this.setState({
        data: response.result,
      }); 
  }


  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderData}      
      />
    );
  }

  renderData({ item }) {
    
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{ this.state.navigation.navigate('VideoPlayer',{Url : item.data.content.data.playUrl})}}>
          <Image source={{uri:item.data.content.data.cover.detail}} style={styles.image}/>
          <Text style={styles.title}>{item.data.content.data.title}</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    padding: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    elevation: 4,
    
  },
  image: {
    width: width/4*3,
    height: 150,
  },
  title:{
    fontSize: 18,
    color:'#F5FCFF',
    alignSelf:'center'
  }
});
