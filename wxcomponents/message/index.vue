<template>
<uni-shadow-root class="message-index"><view :class="'i-class i-message i-message-'+(type)+' '+(visible ? 'i-message-show' : '')">
    {{ content }}
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'message/index'
const default_data = {
    visible: false,
    content: '',
    duration: 2,
    type: 'default', // default || success || warning || error
};

let timmer = null;

Component({
    externalClasses: ['i-class'],

    data: {
        ...default_data
    },

    methods: {
        handleShow (options) {
            const { type = 'default', duration = 2 } = options;

            this.setData({
                ...options,
                type,
                duration,
                visible: true
            });

            const d = this.data.duration * 1000;

            if (timmer) clearTimeout(timmer);
            if (d !== 0) {
                timmer = setTimeout(() => {
                    this.handleHide();
                    timmer = null;
                }, d);
            }
        },

        handleHide () {
            this.setData({
                ...default_data
            });
        }
    }
});
export default global['__wxComponents']['message/index']
</script>
<style platform="mp-weixin">
.i-message{display:block;width:100%;min-height:32px;line-height:2.3;position:fixed;top:0;left:0;right:0;background:#2d8cf0;color:#fff;text-align:center;font-size:14px;z-index:1010;opacity:0;-webkit-transform:translateZ(0) translateY(-100%);transition:all .4s ease-in-out}.i-message-show{-webkit-transform:translateZ(0) translateY(0);opacity:1}.i-message-default{background:#2d8cf0}.i-message-success{background:#19be6b}.i-message-warning{background:#f90}.i-message-error{background:#ed3f14}
</style>