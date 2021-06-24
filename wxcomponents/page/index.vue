<template>
<uni-shadow-root class="page-index"><view class="i-class i-page">
    <view class="i-page-prev" v-if="mode === 'button'">
        <i-button i-class="i-page-button" type="ghost" @click="handlePrev" :disabled="current === 1"><slot name="prev"></slot></i-button>
    </view>
    <view class="i-page-number" v-if="mode !== 'pointer' && !simple">
        <view class="i-page-number-current">{{ current }}</view>/{{total}}
    </view>
    <view class="i-page-pointer" v-if="mode === 'pointer'">
        <view v-for="(item,index) in (total)" :key="item.index" :class="'i-page-pointer-dot '+((index + 1) === current ? 'current' : '')"></view>
    </view>
    <view class="i-page-next" v-if="mode === 'button'">
        <i-button i-class="i-page-button" type="ghost" @click="handleNext" :disabled="current === total"><slot name="next"></slot></i-button>
    </view>
</view></uni-shadow-root>
</template>

<script>
import IButton from '../button/index.vue'
global['__wxVueOptions'] = {components:{'i-button': IButton}}

global['__wxRoute'] = 'page/index'
Component({
    externalClasses: ['i-class'],

    options: {
        multipleSlots: true
    },

    properties: {
        // button || number || pointer
        mode: {
            type: String,
            value: 'button'
        },
        current: {
            type: Number,
            value: 1
        },
        total: {
            type: Number,
            value: 0
        },
        // 是否隐藏数值
        simple: {
            type: Boolean,
            value: false
        }
    },

    methods: {
        handleChange (type) {
            this.triggerEvent('change', {
                type: type
            });
        },
        handlePrev () {
            this.handleChange('prev');
        },
        handleNext () {
            this.handleChange('next');
        }
    }
});
export default global['__wxComponents']['page/index']
</script>
<style platform="mp-weixin">
.i-page{display:block;width:100%;height:44px;overflow:hidden;box-sizing:border-box;position:relative}.i-page-prev{position:absolute;left:10px;top:0}.i-page-next{position:absolute;right:10px;top:0}.i-page-number{width:100%;height:44px;line-height:44px;margin:0 auto;text-align:center}.i-page-number-current{display:inline;color:#2d8cf0}.i-page-pointer{width:100%;height:44px;line-height:44px;margin:0 auto;text-align:center}.i-page-pointer-dot{display:inline-block;width:8px;height:8px;margin:0 2px;border-radius:50%;background:#bbbec4}.i-page-pointer-dot.current{background:#80848f}.i-page-button{display:inline-block;margin:0}
</style>