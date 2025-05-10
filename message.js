/**
 * 显示通知消息
 * @param {string} str 消息内容
 * @param {string} [type='success'] 消息类型 (success/error/warning/info)
 * @param {number} [time=3000] 显示时间(毫秒)
 * @param {string} [id] 消息ID(用于更新已有消息)
 */
function notyf(str, type, time, id) {
    // 确保通知容器存在
    if ($('.notyn').length === 0) {
        $('body').append('<div class="notyn"></div>');
    }
    
    // 参数处理
    type = type || 'success';
    time = time || 3000;
    
    // 构建消息元素
    var idAttr = id ? ' id="' + id + '"' : '';
    var html = $('<div class="noty1"' + idAttr + '><div class="notyf ' + type + '">' + str + '</div></div>');
    var isCloseable = !id;
    
    // 更新已有消息或添加新消息
    if (id && $('#' + id).length) {
        $('#' + id)
            .find('.notyf')
            .removeClass()
            .addClass('notyf ' + type)
            .html(str);
        html = $('#' + id);
        isCloseable = true;
    } else {
        $('.notyn').append(html);
    }
    
    // 自动关闭
    if (isCloseable && time > 0) {
        setTimeout(function() {
            notyf_close(html);
        }, time);
    }
}

/**
 * 关闭通知消息
 * @param {jQuery} element 消息元素
 */
function notyf_close(element) {
    element.addClass('notyn-out');
    setTimeout(function() {
        element.remove();
    }, 300);
}

// 点击关闭事件
$(document).on('click', '.noty1', function() {
    notyf_close($(this));
});
