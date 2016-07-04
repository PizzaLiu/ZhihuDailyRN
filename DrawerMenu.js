import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Image,
  Text,
  View,
  TouchableNativeFeedback,
  ListView,
} from 'react-native'

import ZhihuApi from './ZhihuApi';

var zhihu_api = new ZhihuApi();

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
  themeList: {
    flex: 1,
  },
  themes: {
    flex: 1,
    backgroundColor: 'white',
  },
  themeItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  itemName: {
    color: '#00a2ed',
  },
  themeActIcon: {
    position: 'absolute',
    right: 20,
  },
};

export default class DrawerMenu extends Component {
  constructor(props){
      super(props);
      var dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      });
      this.state = {
          isLoadingThemeList: true,
          themesDataSource: dataSource,
      };
  }

  componentDidMount() {
    this.fetchThemes();
  }

  _setThemeList(themes) {
    if(themes) {
      return this.setState({
        isLoadingThemeList: false,
        themesDataSource: this.state.themesDataSource.cloneWithRows(themes),
      });
      zhihu_api.getThemeListOffline().then((themes) => {
        if(!themes) throw new Error('cannot get themes in localstrage');
        this.setState({
          isLoadingThemeList: false,
          themesDataSource: this.state.themesDataSource.cloneWithRows(themes),
        });
      }).catch((err) => {
        console.error(err);
      }).done();
    }
  }

  fetchThemes() {
    zhihu_api.getThemeList().then((themes) => {
      this._setThemeList(themes);
    }).catch((err) => {
      this.setThemeList();
    }).done();
  }

  renderThemeRow(theme, sectionID, rowID, highlightRow) {
    return (
      <TouchableNativeFeedback>
        <View style={styles.themeItem}>
          <Text style={[styles.itemName, {marginLeft:10, color: '#333'}]}>{theme.name}</Text>
          <Image style={styles.themeActIcon} source={require('./images/ic_menu_follow.png')} />
        </View>
      </TouchableNativeFeedback>
    );
  }

  _renderHeaer() {
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
        <View style={styles.themeList}>
          <TouchableNativeFeedback>
            <View style={styles.themeItem}>
              <Image source={require('./images/ic_menu_home.png')} />
              <Text style = {[styles.itemName, {marginLeft:10}]}>首页</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
    </View>
    );
  }

  render() {
    return (
      <View style={styles.container} {...this.props}>
        <ListView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          dataSource={this.state.themesDataSource}
          renderRow={this.renderThemeRow}
          style={styles.themes}
          renderHeader={this._renderHeaer}
        />
      </View>
    );
  }
}