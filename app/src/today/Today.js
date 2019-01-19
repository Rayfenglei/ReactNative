import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ToastAndroid,
  TouchableHighlight,
} from 'react-native';

const url =
  'http://v.juhe.cn/todayOnhistory/queryEvent.php?key=b1f0f18192077cb772d564bf3b7ed6b5&date=';

export default class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      navigation: props.navigation,
    };
    this.fetchData = this.fetchData.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let date = new Date();
    let todayDate = date.getMonth() + 1 + '/' + date.getDate();
    fetch(url + todayDate)
      .then(response => response.json())
      .then(response => {
        this.getData(response);
      })
      .catch(error => {
        console.error(error);
      });
  }
  getData(response) {
    if (response.error_code == 0) {
      this.setState({
        data: response.result,
      });
    } else {
      this.onFailed(response.reason);
    }
  }
  onFailed(msg) {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          horizontal={false} //默认true是垂直布局
          numColumns={2} // 水平布局的item数量
        />
      </View>
    );
  }

  pressToDetail(e_id) {
    this.state.navigation.navigate('TodayDetail', { eventId: e_id });
  }

  renderItem({ item }) {
    return (
      <TouchableHighlight
        style={styles.container}
        onPress={() => this.pressToDetail(item.e_id)}>
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.time}>{item.date}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    padding: 5,
    borderRadius: 5,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
    height: 120,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 120,
  },
  time: {
    fontSize: 12,
    marginBottom: 1,
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 18,
    marginTop: 5,
  },
});
