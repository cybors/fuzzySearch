'use strict';
/**
 * @params container {String} 包裹外层的css选择器 
 * @params opts.data {String} 列表数据
 * @params opts.isShowData {Boolearn} 数据默认是否可见，默认不可见
 * @params opts.clickItem {Function} 点击搜索结果的回调
*/
function jAutoComplete(container, opts) {
  var wrap = document.querySelector(container);
  var containerEl = wrap.querySelector('[data-role="autoSelectList"]');
  var inputEl = wrap.querySelector('[data-role="autoSelectInput"]');
  var label = '';  //筛选结果
  var opts = opts || {};
  var list = opts.data || [];

  //初始化列表数据
  var initList = function () {
    var l = '';
    for (var i = 0; i < list.length; i++) {
      l += '<dd data-role="autoSelectItem" data-value="' + list[i].value + '">' + list[i].label + '</dd>';
    }
    containerEl.innerHTML = l
  }
  if (opts.isShowData) {
    initList()
  }

  //获取value
  function getLbel(val) {
    list.forEach((el, idx) => {
      if ((el.value).toString() === val.toString()) {
        label = el.label
      }
    })
    if (opts.clickItem && typeof opts.clickItem === 'function') {
      opts.clickItem(label)
    }
  }

  //失去焦点收起
  function blurSearchIpt() {
    setTimeout(() => {
      if (label.length > 0) {
        inputEl.value = label
      } else {
        inputEl.value = ''
      }
      containerEl.style.display = 'none'
    }, 100);
  }


  //模糊搜索
  function fuzzySearch(ev) {
    var keyWord = (ev.target.value).trim(),
      l = '',
      res;
    (!opts.isShowData && keyWord === '') ? containerEl.style.display = 'none' : containerEl.style.display = '';
    res = list.filter(function (curr, index, arr) {
      return curr.label.match(keyWord)
    })
    containerEl.innerHTML = '';
    for (var i = 0; i < res.length; i++) {
      l += '<dd data-role="autoSelectItem" data-value="' + res[i].value + '">' + res[i].label + '</dd>';
    }
    res.length ? containerEl.innerHTML = l : containerEl.innerHTML = '<dd>无匹配数据</dd>';
  }

  //实时输入监听
  inputEl.addEventListener('input', function (evt) {
    fuzzySearch(evt)
  }, false)

  //获得焦点
  inputEl.addEventListener('focus', function () {
    if (opts.isShowData) {
      initList()
      containerEl.style.display = ''
    }
  }, false)

  //失去焦点
  inputEl.addEventListener('blur', blurSearchIpt, false)

  //点击搜索列表 
  containerEl.addEventListener('click', function (evt) {
    if (evt.target.dataset.value !== undefined) {
      getLbel(evt.target.dataset.value)
    }
  }, false)
}
