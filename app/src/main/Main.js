import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';

import New from '../news/News';
import NewDetail from '../news/NewDetail';
import Movies from '../movies/Movies';
import Today from '../today/Today';
import TodayDetail from '../today/TodayDetail';
import My from '../my/My';
import Jokes from '../jokes/Jokes';
import Login from '../utils/Login';
import VideoPlayer from '../movies/Video';
//app入口
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <SwitchNav />;
  }
}
//tabbar路由配置
const Tabbar = createBottomTabNavigator(
  {
    /**
            screen：和导航的功能是一样的，对应界面名称，可以在其他页面通过这个screen传值和跳转。  
            navigationOptions：配置TabNavigator的一些属性  
            title：标题，会同时设置导航条和标签栏的title  
            tabBarVisible：是否隐藏标签栏。默认不隐藏(true)  
            tabBarIcon：设置标签栏的图标。需要给每个都设置  
            tabBarLabel：设置标签栏的title。推荐  
         */
    New: {
      screen: New,
      navigationOptions: ({ navigations }) => {
        return {
          //名称
          tabBarLabel: '新闻',
          //图标
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('../../Image/news.png')}
              style={[styles.icon, { tintColor: tintColor }]}
            />
          ),
        };
      },
    },
    Movies: {
      screen: Movies,
      navigationOptions: ({ navigations }) => {
        return {
          tabBarLabel: '视频',
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('../../Image/movies.png')}
              style={[styles.icon, { tintColor: tintColor }]}
            />
          ),
        };
      },
    },
    Joke: {
      screen: Jokes,
      navigationOptions: ({ navigations }) => {
        return {
          tabBarLabel: '笑话',
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('../../Image/joker.png')}
              style={[styles.icon, { tintColor: tintColor }]}
            />
          ),
        };
      },
    },
    Today: {
      screen: Today,
      navigationOptions: ({ navigations }) => {
        return {
          tabBarLabel: '今日',
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('../../Image/today.png')}
              style={[styles.icon, { tintColor: tintColor }]}
            />
          ),
        };
      },
    },
    // My: {
    //   screen: My,
    //   navigationOptions: ({ navigations }) => {
    //     return {
    //       tabBarLabel: '我的',
    //       tabBarIcon: ({ tintColor }) => (
    //         <Image
    //           source={require('../../Image/my.png')}
    //           style={[styles.icon, { tintColor: tintColor }]}
    //         />
    //       ),
    //     };
    //   },
    // },
  },

  {
    //默认界面
    initialRouteName: 'Joke',
    //配置标签栏的一些属性
    tabBarOptions: {
      //活跃状态下
      activeTintColor: '#4BC1D2',
      //不活跃状态下
      inactiveTintColor: '#000',
      //显示图标
      showIcon: true,
      //是否显示label
      showLabel: true,
      //标签大写
      upperCaseLabel: false,
      //涟漪效果的颜色
      pressColor: '#788493',
      //按压标签的透明度变化
      pressOpacity: 0.8,
      //tabbar的样式
      style: {
        backgroundColor: '#fff',
        paddingBottom: 0,
        borderTopWidth: 0.5,
        borderTopColor: '#ccc',
      },
      //label的样式
      labelStyle: {
        fontSize: 12,
        margin: 1,
      },
      //标签指示器的样式对象（选项卡底部的行）安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
      indicatorStyle: { height: 0 },
    },
    //设置tabbar的位置
    tabBarPosition: 'bottom',
    //滑动
    swipeEnabled: true,
    //动画
    animationEnabled: true,
    //懒加载
    lazy: true,
    //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    backBehavior: 'none',
  }
);
//设置顶部导航栏名称
// Tabbar.navigationOptions = ({ navigation }) => {
//   // const { routeName } = navigation.state.routes[navigation.state.index];
//   // let headerTitle = '';
//   // if (routeName == 'New') {
//   //   headerTitle = '新闻';
//   // } else if (routeName == 'Movies') {
//   //   headerTitle = '电影';
//   // } else if (routeName == 'My') {
//   //   headerTitle = '我的';
//   // } else if (routeName == 'Joke') {
//   //   headerTitle = '趣闻';
//   // } else if (routeName == 'Today') {
//   //   headerTitle = '历史上的今天';
//   // }
//   // return {
//   //   headerTitle,
//   // };
// };

//取消顶部导航栏
Tabbar.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};

// 整个app路由配置
const Navigator = createStackNavigator(
  {
    // 导入tabbar路由配置
    Tabbar: {
      screen: Tabbar,
    },
    // 下边是其它组件路由配置
    NewDetail: {
      screen: NewDetail,
    },
    TodayDetail: {
      screen: TodayDetail,
    },
    Login: {
      screen: Login,
    },
    VideoPlayer:{
      screen: VideoPlayer,
    },
  },
  {
    //具体设置在具体页面
    initialRouteName: 'Tabbar',
    initialRouteParams: { initPara: '初始页面参数' },
    navigationOptions: {
      title: '顶部导航',

    },
  }
);

//默认情况下，它不处理后退操作
const SwitchNav = createSwitchNavigator({
    Login: Login,
    Navigator: Navigator
});

    
// *********************************   navigationOptions属性   ****************************************************************
// title: '首页',
// header - 自定义的头部组件，使用该属性后系统的头部组件会消失
// headerTitle - 头部的标题，即页面的标题
// headerBackTitle - 返回标题，默认为 title
// headerTruncatedBackTitle - 返回标题不能显示时（比如返回标题太长了）显示此标题，默认为 “Back”
// headerRight - 头部右边组件
// headerLeft - 头部左边组件
// headerStyle - 头部组件的样式
// headerTitleStyle - 头部标题的样式
// headerBackTitleStyle - 头部返回标题的样式
// headerTintColor - 头部颜色
// headerPressColorAndroid - Android 5.0 以上MD风格的波纹颜色
// gesturesEnabled - 否能侧滑返回， iOS 默认 true ， Android 默认 false

// 样式
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
