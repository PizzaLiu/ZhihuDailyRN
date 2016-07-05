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
  ToolbarAndroid,
} from 'react-native';

import DrawerMenu from './DrawerMenu';

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
  toolbar: {
    backgroundColor: '#00a2ed',
    height: 56,
  }
});

var DRAWER_REF = 'drawer';
var DRAWER_WIDTH = Dimensions.get('window').width - 60;
var toolbar_actions = [
  {title: '提醒', icon: require('./images/ic_message_white.png'), show: 'always'},
  {title: '夜间模式', show: 'never'},
  {title: '设置选项', show: 'never'},
];

export default class MainScreen extends Component {
    static propTypes = {
    };

    constructor(props){
        super(props);
        this.state = {
            toolbarTitle: '首页',
        };
    }

    _renderDrawerView = () => {
      return (
        <DrawerMenu
          onThemeSelected={this._onThemeSelected}
        />
      );
    }

    componentDidMount() {
      this.refs[DRAWER_REF].openDrawer();
    }

    _showDrawer = () => {
      this.refs[DRAWER_REF].openDrawer();
    }

    _onActionSelected = () => {
      // TODO
    }

    _onThemeSelected = (theme) => {
      // TODO
      this.refs[DRAWER_REF].closeDrawer();
    }

    render() {
        return (
          <DrawerLayoutAndroid
            ref = {DRAWER_REF}
            drawerWidth = {DRAWER_WIDTH}
            keyboardDismissMode = 'on-drag'
            drawerPosition = {DrawerLayoutAndroid.positions.Left}
            renderNavigationView = {this._renderDrawerView}
          >
            <ToolbarAndroid
              navIcon = {require('./images/ic_menu_white.png')}
              style = {styles.toolbar}
              onIconClicked = {this._showDrawer}
              title = {this.state.toolbarTitle}
              titleColor = 'white'
              actions = {toolbar_actions}
              overflowIcon = {require('./images/ic_menu_moreoverflow.png')}
              onActionSelected={this._onActionSelected}
            />
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


