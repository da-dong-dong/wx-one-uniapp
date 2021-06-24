<template>
<uni-shadow-root class="notice-bar-index"><view v-if="show" class="i-class i-noticebar" :style="'color: '+(color)+'; background-color: '+(backgroundcolor)">
    <i-icon v-if="icon" :type="icon" size="24" :color="color" class="i-noticebar-icon"></i-icon>
    <view class="i-noticebar-content-wrap">
        <view :class="'i-noticebar-content '+(loop?'i-noticebar-content-loop':'')" :animation="animationData">
           <slot></slot>
        </view>
    </view>
    <i-icon v-if="closable" class="i-noticebar-operation" type="close" size="20" :color="color" @click.native="handleClose"></i-icon>
</view></uni-shadow-root>
</template>

<script>
import IIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'i-icon': IIcon}}

global['__wxRoute'] = 'notice-bar/index'
const VALID_MODE = ['closeable'];
const FONT_COLOR = '#f60';
const BG_COLOR = '#fff7cc';

Component({
    externalClasses: ['i-class'],

    properties: {
        closable: {
            type: Boolean,
            value: false
        },
        icon: {
            type: String,
            value: ''
        },
        loop: {
            type: Boolean,
            value: false
        },
        // 背景颜色
        backgroundcolor: {
            type: String,
            value: '#fefcec'
        },
        // 字体及图标颜色
        color: {
            type: String,
            value: '#f76a24'
        },
        // 滚动速度
        speed: {
            type: Number,
            value: 1000
        }
    },

    data: {
        show: true,
        wrapWidth: 0,
        width: 0,
        duration: 0,
        animation: null,
        timer: null,
    },
    detached() {
        this.destroyTimer();
    },
    ready() {
        if (this.data.loop) {
            this.initAnimation();
        }
    },

    methods: {
        initAnimation() {
            wx.createSelectorQuery().in(this).select('.i-noticebar-content-wrap').boundingClientRect((wrapRect) => {
                wx.createSelectorQuery().in(this).select('.i-noticebar-content').boundingClientRect((rect) => {
                    const duration = rect.width / 40 * this.data.speed;
                    const animation = wx.createAnimation({
                        duration: duration,
                        timingFunction: "linear",
                    });
                    this.setData({
                        wrapWidth: wrapRect.width,
                        width: rect.width,
                        duration: duration,
                        animation: animation
                    }, () => {
                        this.startAnimation();
                    });
                }).exec();

            }).exec();
        },
        startAnimation() {
            //reset
            if (this.data.animation.option.transition.duration !== 0) {
                this.data.animation.option.transition.duration = 0;
                const resetAnimation = this.data.animation.translateX(this.data.wrapWidth).step();
                this.setData({
                    animationData: resetAnimation.export()
                });
            }
            this.data.animation.option.transition.duration = this.data.duration;
            const animationData = this.data.animation.translateX(-this.data.width).step();
            setTimeout(() => {
                this.setData({
                    animationData: animationData.export()
                });
            }, 100);
            const timer = setTimeout(() => {
                this.startAnimation();
            }, this.data.duration);
            this.setData({
                timer,
            });
        },
        destroyTimer() {
            if (this.data.timer) {
                clearTimeout(this.data.timer);
            }
        },
        handleClose() {
            this.destroyTimer();
            this.setData({
                show: false,
                timer: null
            });
        }
    }
});
export default global['__wxComponents']['notice-bar/index']
</script>
<style platform="mp-weixin">
.i-noticebar{display:flex;height:72rpx;line-height:72rpx;font-size:14px;color:#f76a24;background-color:#fefcec;overflow:hidden}.i-noticebar-icon{display:flex;margin-left:30rpx;align-items:center}.i-noticebar-icon+view{margin-left:10rpx}.i-noticebar-operation{display:flex;margin-right:16rpx;align-items:center}.i-noticebar-content-wrap{position:relative;flex:1;margin:0 30rpx;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.i-noticebar-content-wrap .i-noticebar-content{position:absolute;transition-duration:20s}
</style>