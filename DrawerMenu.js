import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Image,
  Text,
  View,
  TouchableNativeFeedback,
} from 'react-native'


const styles = {
  container: {
    flex: 1,
  },
  topper: {
    backgroundColor: '#00a2ed',
    height: 100,
    padding: 10,
    flexDirection: 'column',
  },
  accountBox: {
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginNotice : {
    color: 'white',
    fontSize: 13,
    marginLeft: 10,
  },
  actioner: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBox : {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionName : {
    color: 'white',
    fontSize: 13,
    marginLeft: 5,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
};

export default class DrawerMenu extends Component {
  render() {
    return (
      <View style = {styles.container}>
          <View style={styles.topper}>
            <TouchableNativeFeedback>
              <View style={styles.accountBox}>
                <Image source={require('./images/ic_menu_avatar.png')} />
                <Text style = {styles.loginNotice}>请登录</Text>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.actioner}>
              <TouchableNativeFeedback>
                <View style={styles.actionBox}>
                  <Image source={require('./images/ic_menu_favorites.png')} />
                  <Text style = {styles.actionName}>我的收藏</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback>
                <View style={styles.actionBox}>
                  <Image source={require('./images/ic_menu_download.png')} />
                  <Text style = {styles.actionName}>离线下载</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        <Text style = {styles.welcome}>Hello drawer!</Text>
      </View>
    );
  }
}