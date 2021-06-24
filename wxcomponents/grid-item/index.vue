<template>
<uni-shadow-root class="grid-item-index"><view class="i-class i-grid-item" :style="'width: '+(width)"><slot></slot></view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'grid-item/index'
Component({
    externalClasses: ['i-class'],

    relations: {
        '../grid/index': {
            type: 'parent'
        },
        '../grid-icon/index': {
            type: 'child'
        }
    },

    data: {
        width: '33.33%'
    }
});
export default global['__wxComponents']['grid-item/index']
</script>
<style platform="mp-weixin">
.i-grid-item{position:relative;float:left;padding:20px 10px;width:33.33333333%;box-sizing:border-box;border-right:1rpx solid #e9eaec;border-bottom:1rpx solid #e9eaec}
</style>