'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  ToastAndroid,
  BackAndroid,
} from 'react-native';

import SplashScreen from './SplashScreen';
import MainScreen from './MainScreen';

class ZhihuDailyRN extends Component {

  constructor(props) {
    super(props);
    this.state = {
        splashed: false,
    };
    this.initialRoute = {
      name: 'MainScreen',
      component: MainScreen,
      params: {}
    };
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
  }

  componentDidMount() {
    this.timer = setTimeout(
      () => {
        this.setState({splashed: true});
      },
      2000,
    );
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }

  render() {
    return this.state.splashed ? (
      <Navigator
        configureScene = { (route, routeStack) => Navigator.SceneConfigs.VerticalDownSwipeJump }
        initialRoute = {this.initialRoute}
        renderScene = {(route, navigator) => {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator} /> 
          }
        }
      />
    ) : (<SplashScreen />);
  }

  onBackAndroid = () => {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        return false;
      }
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      return true;
  };

}

AppRegistry.registerComponent('ZhihuDailyRN', () => ZhihuDailyRN);
