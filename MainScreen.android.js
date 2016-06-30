'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  DrawerLayoutAndroid,
} from 'react-native';

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

var DRAWER_WIDTH = Dimensions.get('window').width - 60;

export default class MainScreen extends Component {
    static propTypes = {
    };

    _renderDrawerView() {
      return (<Text style={styles.welcome}>
                  Hello drawer!
              </Text>
              );
    }

    render() {
        return (
          <DrawerLayoutAndroid
            drawerWidth = {DRAWER_WIDTH}
            keyboardDismissMode = 'on-drag'
            drawerPosition = {DrawerLayoutAndroid.positions.Left}
            renderNavigationView = {this._renderDrawerView}
          >
            <View style={styles.container}>
              <Text style={styles.welcome}>
                Welcome to MainScreen!
              </Text>
              <Text style={styles.instructions}>
                This is MainScreen.
              </Text>
            </View>
          </DrawerLayoutAndroid>
        );
    }
}


