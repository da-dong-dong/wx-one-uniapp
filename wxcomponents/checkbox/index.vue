<template>
<uni-shadow-root class="checkbox-index"><view class="i-class i-checkbox" @click.stop.prevent="checkboxChange">
    <i-cell i-class="i-checkbox-cell">
        <label>
            <radio :value="value" :checked="checked" :color="checked?color:''" :disabled="disabled" :class="'i-checkbox-radio '+(positionCls)"></radio>
            <view class="i-checkbox-title">{{value}}</view>
        </label>
    </i-cell>
</view></uni-shadow-root>
</template>

<script>
import ICell from '../cell/index.vue'
global['__wxVueOptions'] = {components:{'i-cell': ICell}}

global['__wxRoute'] = 'checkbox/index'
const prefixCls = 'i-checkbox';

Component({
    externalClasses: ['i-class'],
    relations: {
        '../checkbox-group/index': {
            type: 'parent'
        }
    },
    properties: {
        value: {
            type: String,
            value: ''
        },
        checked: {
            type: Boolean,
            value: false
        },
        disabled: {
            type: Boolean,
            value: false
        },
        color: {
            type: String,
            value: '#2d8cf0'
        },
        position: {
            type: String,
            value: 'left', //left right
            observer: 'setPosition'
        }
    },
    data: {
        checked: true,
        positionCls: `${prefixCls}-checkbox-left`,
    },
    attached() {
        this.setPosition();
    },
    methods: {
        changeCurrent(current) {
            this.setData({ checked: current });
        },
        checkboxChange() {
            if (this.data.disabled) return;
            const item = { current: !this.data.checked, value: this.data.value };
            const parent = this.getRelationNodes('../checkbox-group/index')[0];
            parent ? parent.emitEvent(item) : this.triggerEvent('change', item);
        },
        setPosition() {
            this.setData({
                positionCls: this.data.position.indexOf('left') !== -1 ? `${prefixCls}-checkbox-left` : `${prefixCls}-checkbox-right`,
            });
        }
    }
});
export default global['__wxComponents']['checkbox/index']
</script>
<style platform="mp-weixin">
.i-checkbox-cell::after{display:block}.i-checkbox-checkbox-left{float:left}.i-checkbox-checkbox-right{float:right}.i-checkbox-radio{vertical-align:middle}.i-checkbox-title{display:inline-block;vertical-align:middle}
</style>