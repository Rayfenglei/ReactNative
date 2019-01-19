import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ToastAndroid,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const url =
  'http://v.juhe.cn/toutiao/index?key=e775428f31df0e4d309c2ec3e81b034e&type=';

export default class NewsItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      data: [],
      refreshing: false,
      navigation: props.navigation,
      netErrorVisible: false,
    };

    this.fetchData = this.fetchData.bind(this);
    this.renderData = this.renderData.bind(this);
  }
  //仅进入时渲染数据
  componentDidMount() {
    this.fetchData();
  }
  //获取数据
  // fetch传入URL和GET请求，
  // .then中将response返回转为json，赋值给responseData，
  // 调用setState方法，给data赋值，并捕获异常进行回调
  fetchData() {
    fetch(url + this.state.type)
      .then(response => response.json())
      .then(response => {
        this.getData(response);
      })
      .catch(error => {
        console.error(error);
      });
  }

  //解析数据
  getData(response) {
    if (response.error_code == 0) {
      this.setState({
        data: response.result.data,
        refreshing: false,
        netErrorVisible: false,
      });
    } else {
      this.onFailed(response.reason);
    }
  }

  //网络连接失败
  onFailed(msg) {
    this.setState({
      refreshing: false,
      netErrorVisible: true,
    });
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }

  // 下拉刷新
  onRefresh = () => {
    //设置刷新状态为正在刷新
    this.setState({
      refreshing: true,
    });
    this.fetchData();
  };

  render() {
    if (!this.state.data) {
      return this.renderLoadingView();
    }
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={this.renderData}
          style={styles.list}
          //下拉刷新，必须设置refreshing状态
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
        />
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View>
        <Text>正在加载数据</Text>
      </View>
    );
  }
  pressToDetail(url) {
    this.state.navigation.navigate('NewDetail', { Url: url });
  }
  //加载FlatList布局
  renderData({ item }) {
    return (
      <TouchableHighlight onPress={() => this.pressToDetail(item.url)}>
        <View style={styles.container}>
          <View style={styles.newcontent}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>
              {item.author_name} {item.date}
            </Text>
          </View>

          <View>
            <Image
              source={{ uri: item.thumbnail_pic_s }}
              style={styles.image}
            />
          </View>
        </View>
      </TouchableHighlight>
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
    height: 110,
  },
  newcontent: {
    width: width - 120,
    height: 110,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 5,
  },
  title: {
    fontSize: 18,
  },
  author: {
    fontSize: 12,
    marginBottom: 1,
  },
  image: {
    width: 120,
    height: 100,
    borderRadius: 5,
    marginRight: 5,
  },

  list: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});
