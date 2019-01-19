import React, { Component } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import NewsItem from './NewsItem';

export default class ViewPages extends Component {
  render() {
    return (
      <ScrollableTabView
        initialPage={0} //默认选择的页面
        tabBarTextStyle={{ fontFamily: 'Roboto', fontSize: 15 }} //TabBar文字样式
        tabBarUnderlineStyle={{ height: 0 }} //TabBar指示器的样式
        tabBarBackgroundColor="white" //TabBar背景色
        tabBarActiveTextColor="red" //Tab选中时的文字颜色
        tabBarInactiveTextColor="black" //Tab未选中时的文字颜色
        renderTabBar={() => <ScrollableTabBar />}>
        <View tabLabel="头条">
          <NewsItem type="top" navigation={this.props.navigation} />
        </View>
        <View tabLabel="社会">
          <NewsItem type="shehui" navigation={this.props.navigation} />
        </View>
        <View tabLabel="国内">
          <NewsItem type="guonei" navigation={this.props.navigation} />
        </View>
        <View tabLabel="科技">
          <NewsItem type="keji" navigation={this.props.navigation} />
        </View>
        <View tabLabel="国际">
          <NewsItem type="guoji" navigation={this.props.navigation} />
        </View>
        <View tabLabel="娱乐">
          <NewsItem type="yule" navigation={this.props.navigation} />
        </View>
        <View tabLabel="时尚">
          <NewsItem type="shishang" navigation={this.props.navigation} />
        </View>
        <View tabLabel="体育">
          <NewsItem type="tiyu" navigation={this.props.navigation} />
        </View>
        <View tabLabel="军事">
          <NewsItem type="junshi" navigation={this.props.navigation} />
        </View>
        <View tabLabel="财经">
          <NewsItem type="caijing" navigation={this.props.navigation} />
        </View>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({});
