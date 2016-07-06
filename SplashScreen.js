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

import DataRepository from './DataRepository';

var data_repository = new DataRepository();
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
    color: '#c2ccd0',
    textAlign: 'center',
    marginTop: WINDOW_HEIGHT - 50,
    backgroundColor: 'transparent',
    textShadowColor: '#333',
    textShadowOffset: {
      height: 1,
      width: 1
    },
    textShadowRadius: 2,
  },
});


class SplashScreen extends React.Component {
  static defaultProps = {
    source: null,
    text: '',
  };

  initStartImage() {
    var startImage = null;
    if(this.props.source) {
      startImage = {
        source: this.props.source,
        text: this.props.text,
      };
      this.setState({startImage: startImage});
    } else {
      data_repository.getStartImage()
        .then((result) => {
          if (result){
            startImage = {
              source: {uri: result.img},
              text: result.text
            };
            this.setState({startImage: startImage});
          }
        })
        .catch((error) => {
          //console.error(error);
        })
        .done();
    }
    data_repository.updateStartImage();
  }

  constructor(props) {
    super(props);
    this.state = {
      startImage: {
        source: require('./images/splash.jpg'),//{uri: 'https://pic4.zhimg.com/3a811bb46a42d6251529e70ce3b7153f.jpg'},
        text: '© zhi.hu',
      },
      bounceValue: new Animated.Value(1),
    };
  }

  componentDidMount() {
    this.initStartImage();
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
          source={this.state.startImage.source}
          style={[styles.image, {
            transform: [
              {scale: this.state.bounceValue},
            ]
          }]} />
          <Text style={styles.text}>{this.state.startImage.text}</Text>
      </View>
    );
  }
}

export default SplashScreen;