<template>
<uni-shadow-root class="button-index"><button :class="'i-class i-btn '+(long ? 'i-btn-long' : '')+' '+('i-btn-' + size)+' '+('i-btn-' + type)+' '+('i-btn-' + shape)+' '+(loading ? 'i-btn-loading' : '')+' '+(disabled ? 'i-btn-disabled' : '')+' '+(inline ? 'i-btn-inline' : '')" hover-class="i-btn-hover" @click="handleTap" :open-type="openType" :app-parameter="appParameter" :hover-stop-propagation="hoverStopPropagation" :hover-start-time="hoverStartTime" :hover-stay-time="hoverStayTime" :session-from="sessionFrom" :send-message-title="sendMessageTitle" :send-message-path="sendMessagePath" :send-message-img="sendMessageImg" :show-message-card="showMessageCard" @contact="bindcontact" @getuserinfo="bindgetuserinfo" @getphonenumber="bindgetphonenumber" @error="binderror" plain="true"><view class="i-btn-loading-inner" v-if="loading"></view><slot></slot></button></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'button/index'
Component({
    externalClasses: ['i-class'],

    properties: {
        // default, primary, ghost, info, success, warning, error
        type: {
            type: String,
            value: '',
        },
        inline: {
            type: Boolean,
            value: false
        },
        // default, large, small
        size: {
            type: String,
            value: '',
        },
        // circle, square
        shape: {
            type: String,
            value: 'square'
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        loading: {
            type: Boolean,
            value: false,
        },
        long: {
            type: Boolean,
            value: false
        },
        openType: String,
        appParameter: String,
        hoverStopPropagation: Boolean,
        hoverStartTime: {
            type: Number,
            value: 20
        },
        hoverStayTime: {
            type: Number,
            value: 70
        },
        lang: {
            type: String,
            value: 'en'
        },
        sessionFrom: {
            type: String,
            value: ''
        },
        sendMessageTitle: String,
        sendMessagePath: String,
        sendMessageImg: String,
        showMessageCard: Boolean
    },

    methods: {
        handleTap () {
            if (this.data.disabled) return false;

            this.triggerEvent('click');
        },
        bindgetuserinfo({ detail = {} } = {}) {
            this.triggerEvent('getuserinfo', detail);
        },
        bindcontact({ detail = {} } = {}) {
            this.triggerEvent('contact', detail);
        },
        bindgetphonenumber({ detail = {} } = {}) {
            this.triggerEvent('getphonenumber', detail);
        },
        binderror({ detail = {} } = {}) {
            this.triggerEvent('error', detail);
        }
    }
});
export default global['__wxComponents']['button/index']
</script>
<style platform="mp-weixin">
.i-btn{text-align:center;vertical-align:middle;touch-action:manipulation;cursor:pointer;background-image:none;white-space:nowrap;user-select:none;font-size:14px;border-radius:2px;border:0!important;position:relative;text-decoration:none;height:44px;line-height:44px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.1);color:#fff!important;background:#f7f7f7!important;color:#495060!important;margin:10px}.i-btn-hover{opacity:.9}.i-btn-long{border-radius:0;margin:0;box-shadow:none}.i-btn-large{height:48px;line-height:48px}.i-btn-small{height:40px;line-height:40px}.i-btn-primary{color:#fff!important;background:#2d8cf0!important}.i-btn-ghost{color:#fff!important;background:#fff!important;color:#495060!important}.i-btn-success{color:#fff!important;background:#19be6b!important}.i-btn-warning{color:#fff!important;background:#f90!important}.i-btn-error{color:#fff!important;background:#ed3f14!important}.i-btn-info{color:#fff!important;background:#2db7f5!important}.i-btn-circle{border-radius:44px}.i-btn-large.i-btn-circle{border-radius:48px}.i-btn-small.i-btn-circle{border-radius:40px}.i-btn-loading{opacity:.6}.i-btn-loading-inner{display:inline-block;margin-right:12px;vertical-align:middle;width:14px;height:14px;background:0 0;border-radius:50%;border:2px solid #fff;border-color:#fff #fff #fff transparent;animation:btn-spin .6s linear;animation-iteration-count:infinite}.i-btn-disabled{color:#bbbec4!important;background:#f7f7f7!important}.i-btn-inline{display:inline-block}@keyframes btn-spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
</style>