# jAutoComplete
简单小巧的模糊查询检索

``` js
/**
 * @params container {String} 包裹外层的css选择器 
 * @params opts.data {String} 列表数据
 * @params opts.isShowData {Boolearn} 数据默认是否可见，默认不可见
 * @params opts.clickItem {Function} 点击搜索结果的回调
*/

jAutoComplete(container, opts)

```

> html需要符合结构。输入框的属性`data-role="autoSelectInput"`和选项的`data-role="autoSelectList"`不能变动。
