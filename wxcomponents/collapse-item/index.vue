<template>
<uni-shadow-root class="collapse-item-index"><view :id="name" class="i-class i-collapse-item ">
    <view class="i-collapse-item-title-wrap i-title-wrap" @click="trigger">
        <text class="i-collapse-item-title i-class-title">{{title}}</text>
				<i-icon size="16" type="enter" class="i-con" :i-class="showContent ? 'i-collapse-item-arrow-show' : 'i-collapse-item-arrow'"></i-icon>
    </view>
    <view :class="'i-collapse-item-content '+(showContent)+'  i-class-content'">
        <slot name="content"></slot>
    </view>
</view></uni-shadow-root>
</template>

<script>
import IIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'i-icon': IIcon}}

global['__wxRoute'] = 'collapse-item/index'
Component({
    externalClasses: ['i-class-content', 'i-class-title', 'i-class' , 'i-title-wrap', 'i-con'],

    relations: {
        '../collapse/index': {
            type: 'parent',
            linked: function (target) {
                const options = {
                    accordion: target.data.accordion
                }
                if (target.data.name === this.data.name) {
                    options.showContent = 'i-collapse-item-show-content';
                }
                this.setData(options);
            }
        }
    },

    properties: {
        title: String,
        name: String
    },

    data: {
        showContent: '',
        accordion: false
    },

    options: {
        multipleSlots: true
    },

    methods: {
        trigger(e) {
            const data = this.data;
            if (data.accordion) {
                this.triggerEvent('collapse', {name: data.name}, {composed: true, bubbles: true});
            } else {
                this.setData({
                    showContent: data.showContent ? '' : 'i-collapse-item-show-content'
                });
            }
        },
    }
});
export default global['__wxComponents']['collapse-item/index']
</script>
<style platform="mp-weixin">
.i-collapse-item{padding:2px 8px;border-top:1px solid #dddee1}.i-collapse-item-title{vertical-align:middle}.i-collapse-item-title-wrap{padding:2px 0 0}.i-collapse-item-content{padding:6px;display:none}.i-collapse-item-show-content{display:block}.i-collapse-item-arrow{transition:transform .2s ease-in-out}.i-collapse-item-arrow-show{transition:transform .2s ease-in-out;transform:rotate(90deg)}
</style>