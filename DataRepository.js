'use strict';

var React = require('react-native');

var {
  AsyncStorage,
} = React;

var API_URL_PREFIX = 'http://news-at.zhihu.com/api/4';
var API_URL_START_IMAGE = API_URL_PREFIX+'/start-image/1080*1776';
var API_URL_THEME_LIST = API_URL_PREFIX+'/themes';

var KEY_START_IMAGE = '@START_IMAGE';
var KEY_THEME_LIST = '@THEME_LIST';
var KEY_THEME_LIST_SUBSCRIBED = '@THEME_LIST_SUBSCRIBED';

var DataRepository = function () {
  if(typeof DataRepository.instance !== 'object') {
    DataRepository.instance = this;
  }
  return DataRepository.instance;
};

DataRepository.prototype._getItem = function (key: string) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key, (error, result) => {
      var data = null;
      if(!result) {
        return resolve(null);
      }
      if(error) {
        return reject(error);
      }
      try {
        data = JSON.parse(result);
      } catch(e) {
        return reject(e);
      }
      return resolve(data);
    });
  });
};

DataRepository.prototype.getStartImage = function() {
  return this._getItem(KEY_START_IMAGE);
};

DataRepository.prototype.updateStartImage = function() {
  fetch(API_URL_START_IMAGE)
    .then((response) => response.json())
    .then((responseData) => {
      AsyncStorage.setItem(KEY_START_IMAGE, JSON.stringify(responseData));
    })
    .catch((error) => {
      console.error(error);
    })
    .done();
};

DataRepository.prototype.getThemeListOffline = function() {
  return this._getItem(KEY_THEME_LIST);
};

DataRepository.prototype.getThemeList = function() {
  return new Promise((resolve, reject) => {
    fetch(API_URL_THEME_LIST)
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData.others);
        AsyncStorage.setItem(KEY_THEME_LIST, JSON.stringify(responseData.others));
      })
      .catch((error) => {
        reject(error);
        console.error(error);
      })
      .done();
  });
};

DataRepository.prototype.getSubscibeThemes = function () {
  return this._getItem(KEY_THEME_LIST_SUBSCRIBED);
};

DataRepository.prototype.subscibeTheme = function (tid) {
  if(!tid) return false;
  this.getSubscibeThemes().then((themes) => {
    themes = themes || [];
    if(themes.indexOf(tid) !== -1) return false;
    themes.push(tid);
    AsyncStorage.setItem(KEY_THEME_LIST_SUBSCRIBED, JSON.stringify(themes));
  }).done();
};

DataRepository.prototype.unSubscibeTheme = function (tid) {
  if(!tid) return false;
  this.getSubscibeThemes().then((themes) => {
    if(!themes || themes.length === 1 || themes.indexOf(tid) == -1) return false;
    for(let i=0; i<themes.length; i++) {
      if(themes.id === tid) {
        themes.splice(i,1);
        break;
      }
    }
    AsyncStorage.setItem(KEY_THEME_LIST_SUBSCRIBED, JSON.stringify(themes));
  }).done();
};


module.exports = DataRepository;


