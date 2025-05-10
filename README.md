# TyAjax for Typecho

一个轻量级的 AJAX 处理框架，专为 Typecho 博客系统设计，提供简单易用的 AJAX 请求处理功能。

## 功能特性

- 支持登录用户和非登录用户的不同处理
- 内置成功/错误响应方法
- 自动处理表单数据
- 支持加载动画和提示消息
- 兼容 jQuery 事件绑定

## 安装方法

1. 将 `TyAjax.php` 文件上传到您的 Typecho 插件或主题目录中
2. 在需要使用的文件中引入该文件

## 使用教程

### 基本使用

```php
require_once 'TyAjax.php';

// 需要登录的action示例
function profile($data) {
    $user = Typecho_Widget::widget('Widget_User');
    if (!$user->hasLogin()) {
        TyAjax_send_error('请先登录', 'danger');
    }
    
    TyAjax_send_success('欢迎您！' . $user->name);
}
TyAjax_action('ty_ajax_profile', 'profile');
TyAjax_action('ty_ajax_nopriv_profile', 'profile');

// 注册 AJAX 动作
function ty_web_agent() {
    // 获取浏览器 User Agent
    $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? sanitize_text_field($_SERVER['HTTP_USER_AGENT']) : 'Unknown';

    // 返回数据
    TyAjax_send_success($user_agent);
}
TyAjax_action('ty_ajax_ty_web_agent', 'ty_web_agent');
TyAjax_action('ty_ajax_nopriv_ty_web_agent', 'ty_web_agent');

TyAjax_Core::init();
```

### 前端调用

```html
<button class="ty-ajax-submit" form-action="profile">获取用户信息</button>
<button class="ty-ajax-submit" form-action="ty_web_agent">获取浏览器信息</button>
```

或者使用自定义表单：

```html
<form>
    <input type="hidden" name="action" value="profile">
    <button type="button" class="ty-ajax-submit">提交</button>
</form>
```

## 注意事项

1. **必须先在文件中引入 TyAjax.php**：
   ```php
   require_once 'TyAjax.php';
   ```

2. **必须使用 `TyAjax_action` 函数注册 AJAX 处理函数**：
   ```php
   TyAjax_action('ty_ajax_[action_name]', 'your_function'); // 需要登录
   TyAjax_action('ty_ajax_nopriv_[action_name]', 'your_function'); // 不需要登录
   ```

3. **必须在最后调用 `TyAjax_Core::init()`** 以初始化功能：
   ```php
   TyAjax_Core::init();
   ```

4. 前端按钮需要添加 `ty-ajax-submit` 类，并通过 `form-action` 属性指定 action 名称

5. 确保 jQuery 已加载（框架会自动加载最新版 jQuery）

6. 如果需要自定义样式，可以覆盖默认的 message.css 文件

## 响应格式

所有 AJAX 请求将返回 JSON 格式数据，包含以下字段：

```json
{
    "error": 0, // 0表示成功，1表示错误
    "msg": "操作成功", // 提示消息
    "ys": "", // 消息样式 (success, danger等)
    "data": null // 返回的数据
}
```

## 高级用法

### 自定义回调

```javascript
TyAjax($('button'), {}, function(response) {
    // 处理成功响应
    console.log(response.data);
}, '正在处理...');
```

### 禁用加载提示

```javascript
TyAjax($('button'), {}, null, 'stop');
```

### 表单序列化

框架会自动处理表单数据，支持数组形式的表单字段。

## 贡献

欢迎提交 Pull Request 或 Issue 来改进这个项目。

## 许可证

MIT License
