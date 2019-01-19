import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

//const url = 'http://v.juhe.cn/joke/content/text.php?key=53cea8a03dfc242383e34bd5314ca671&pagesize=20&page=';
const url = 'https://www.apiopen.top/satinApi?type=2&page=';
export default class Jokes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      navigation: props.navigation,
      page: 1,
      refreshing: false,
    };
    this.fetchData = this.fetchData.bind(this);
    this.renderData = this.renderData.bind(this);
  }

  //进入界面时渲染
  componentDidMount() {
    this.fetchData(this.state.page);
  }

  //获取数据
  fetchData(page) {
    fetch(url + page)
      .then(response => response.json())
      .then(response => {
        this.getData(response);
      })
      .catch(error => {
        console.error(error);
      });
  }
  getData(response) {
    if (this.state.page == 1) {
      this.setState({
        data: response.data,
      });
    } else {
      this.setState({
        data: this.state.data.concat(response.data),
      });
    }
    //加载后面一页的数据
    let page = this.state.page + 1;
    this.setState({
      refreshing: false,
      page: page,
    });
  }

  // 下拉属性
  onRefresh = () => {
    //设置刷新状态为正在刷新
    this.setState({
      refreshing: true,
      page: 1,
    });
    this.fetchData(this.state.page);
  };
  //上拉加载
  endReached = () => {
    this.fetchData(this.state.page);
  };

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderData}
        //下拉刷新，必须设置refreshing状态
        onRefresh={this.onRefresh}
        refreshing={this.state.refreshing}
        //上拉加载数据
        onEndReached={this.endReached}
         //当距离内容比例不足内容0.1比例时触发onEndReached
        onEndReachedThreshold={0.1}
        
      />
    );
  }

  renderData({ item }) {
    return (
      <View style={styles.container}>
        <Text>{item.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});
