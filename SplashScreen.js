/*
** TODO

- 无网络： 则载入现成图片
- 有网络
    尝试加载网络图片
    如果加载失败或加载超时，则载入现成图片
    如果加载成功，则载入，并保存到本地

* 现成图片：之前载入过的图片/默认图片

*/

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

var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    flexDirection: 'column',
  },
  image: {
    position: 'absolute',
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    resizeMode: 'cover',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginTop: WINDOW_HEIGHT - 50,
    backgroundColor: 'transparent',
  },
});


class SplashScreen extends React.Component {
  static defaultProps = {
    source: require('./images/splash.jpg'),//{uri: 'https://pic4.zhimg.com/3a811bb46a42d6251529e70ce3b7153f.jpg'},
    text: '© zhi.hu',
  };

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1),
    };
  }

  componentDidMount() {
    this.state.bounceValue.setValue(1);
    Animated.timing(
      this.state.bounceValue,
      {
        toValue: 1.05,
        duration: 3000,
      }
    ).start();
  }
    
  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={this.props.source}
          style={[styles.image, {
            transform: [
              {scale: this.state.bounceValue},
            ]
          }]} />
          <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

export default SplashScreen;