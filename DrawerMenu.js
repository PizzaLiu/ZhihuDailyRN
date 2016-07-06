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
  TouchableOpacity,
} from 'react-native'

import DataRepository from './DataRepository';

var data_repository = new DataRepository();

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
  activeItem: {
    backgroundColor: '#EDEDED',
  },
  itemName: {
    marginLeft:10,
    color: '#555',
  },
  themeIndicator: {
    position: 'absolute',
    right: 50,
  },
};

export default class DrawerMenu extends Component {
  constructor(props){
      super(props);
      var dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
      this.state = {
          themes: [],
          themeSelectedTheme: null,
          isLoadingThemeList: true,
          themesDataSource: dataSource,
      };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.updateThemeList != nextProps.updateThemeList) this._setThemeList();
  }

  componentDidMount() {
    this.fetchThemes();
  }

  _setThemeList(themes) {
    if(themes) {
      var subscribed_themes = [];
      var unsubscribed_themes = [];
      var new_themes = [];
      data_repository.getSubscribeThemeIDs().then((themes_subscribed_ids) => {
        for(let i=0; i<themes.length; i++) {
          themes[i].selected = false;
          if(this.state.themeSelectedTheme && this.state.themeSelectedTheme.id === themes[i].id) {
            themes[i].selected = true;
          }
          if(themes_subscribed_ids && themes_subscribed_ids.length && themes_subscribed_ids.indexOf(themes[i].id) !== -1) {
            themes[i].subscribed = true;
            subscribed_themes.push(themes[i]);
          } else {
            themes[i].subscribed = false;
            unsubscribed_themes.push(themes[i]);
          }
        }
        new_themes = subscribed_themes.concat(unsubscribed_themes);
        return this.setState({
          themes: new_themes,
          isLoadingThemeList: false,
          themesDataSource: this.state.themesDataSource.cloneWithRows(new_themes),
        });
      }).done();
    } else {
      data_repository.getThemeListOffline().then((themes) => {
        if(!themes) throw new Error('cannot get themes in localstrage');
        this._setThemeList(themes);
      }).catch((err) => {
        console.error(err);
      }).done();
    }
  }

  subscribeTheme(tid) {
    data_repository.subscribeTheme(tid);
    this._setThemeList();
  }

  fetchThemes() {
    data_repository.getThemeList().then((themes) => {
      this._setThemeList(themes);
    }).catch((err) => {
      this.setThemeList();
    }).done();
  }

  _onThemeSelected = (theme) => {
    this.setState({
      themeSelectedTheme: theme,
    });
    this._setThemeList();
    this.props.onThemeSelected(theme);
  }

  renderThemeRow = (theme, sectionID, rowID, highlightRow) => {
    var indicator = theme.subscribed ? (
          <Image style={styles.themeIndicator} source={require('./images/ic_menu_arrow.png')} />
      ) : (
          <TouchableOpacity onPress={() => this.subscribeTheme(theme.id)} style={styles.themeIndicator}>
            <Image source={require('./images/ic_menu_follow.png')} />
          </TouchableOpacity>
      );
    return (
      <TouchableNativeFeedback onPress={() => this._onThemeSelected(theme, rowID)}>
        <View style={[styles.themeItem, theme.selected && styles.activeItem]}>
          <Text style={styles.itemName}>{theme.name}</Text>
          {indicator}
        </View>
      </TouchableNativeFeedback>
    );
  }

  _renderHeaer = () => {
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
          <TouchableNativeFeedback onPress={() => this._onThemeSelected(null)}>
            <View style={[styles.themeItem, !this.state.themeSelectedTheme && styles.activeItem]}>
              <Image source={require('./images/ic_menu_home.png')} />
              <Text style = {[styles.itemName, {color: '#00a2ed'}]}>首页</Text>
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