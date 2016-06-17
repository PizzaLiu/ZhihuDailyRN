/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
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
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ZhihuDailyRN', () => ZhihuDailyRN);
