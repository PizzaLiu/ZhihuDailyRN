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

export default class MainScreen extends Component {
    static propTypes = {
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                  Welcome to MainScreen!
                </Text>
                <Text style={styles.instructions}>
                  This is MainScreen.
                </Text>
              </View>
        );
    }
}

