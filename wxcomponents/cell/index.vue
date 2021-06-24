<template>
<uni-shadow-root class="cell-index"><view @click="handleTap" :class="'i-class i-cell '+(isLastCell ? 'i-cell-last' : '')+' '+(isLink ? 'i-cell-access' : '')">
    <view class="i-cell-icon">
        <slot name="icon"></slot>
    </view>
    <view class="i-cell-bd">
        <view v-if="title" class="i-cell-text">{{ title }}</view>
        <view v-if="label" class="i-cell-desc">{{ label }}</view>
        <slot></slot>
    </view>
    <view @click.stop.prevent="navigateTo" class="i-cell-ft">
        <block v-if="value">{{ value }}</block>
        <block v-else>
            <slot name="footer"></slot>
        </block>
    </view>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'cell/index'
const warn = (msg, getValue) => {
    console.warn(msg);
    console.log('接受到的值为：', getValue);
};

Component({
    externalClasses: ['i-class'],

    options: {
        multipleSlots: true
    },

    relations: {
        '../cell-group/index': {
            type: 'parent'
        }
    },

    properties: {
        // 左侧标题
        title: {
            type: String
        },
        // 标题下方的描述信息
        label: {
            type: String
        },
        // 右侧内容
        value: {
            type: String
        },
        // 只有点击 footer 区域才触发 tab 事件
        onlyTapFooter: {
            type: Boolean
        },
        // 是否展示右侧箭头并开启尝试以 url 跳转
        isLink: {
            type: null,
            value: ''
        },
        // 链接类型，可选值为 navigateTo，redirectTo，switchTab，reLaunch
        linkType: {
            type: String,
            value: 'navigateTo'
        },
        url: {
            type: String,
            value: ''
        }
    },

    data: {
        isLastCell: true
    },

    methods: {
        navigateTo () {
            const { url } = this.data;
            const type = typeof this.data.isLink;

            this.triggerEvent('click', {});

            if (!this.data.isLink || !url || url === 'true' || url === 'false') return;

            if (type !== 'boolean' && type !== 'string') {
                warn('isLink 属性值必须是一个字符串或布尔值', this.data.isLink);
                return;
            }

            if (['navigateTo', 'redirectTo', 'switchTab', 'reLaunch'].indexOf(this.data.linkType) === -1) {
                warn('linkType 属性可选值为 navigateTo，redirectTo，switchTab，reLaunch', this.data.linkType);
                return;
            }
            wx[this.data.linkType].call(wx, {url});
        },
        handleTap () {
            if (!this.data.onlyTapFooter) {
                this.navigateTo();
            }
        },

        updateIsLastCell (isLastCell) {
            this.setData({ isLastCell });
        }
    }
});
export default global['__wxComponents']['cell/index']
</script>
<style platform="mp-weixin">
.i-cell{position:relative;padding:12px 15px;display:flex;background:#fff;align-items:center;line-height:1.4;font-size:14px;overflow:hidden}.i-cell::after{content:'';position:absolute;top:0;left:0;width:200%;height:200%;transform:scale(.5);transform-origin:0 0;pointer-events:none;box-sizing:border-box;border:0 solid #e9eaec;border-bottom-width:1px;left:15px;right:0}.i-cell-last::after{display:none}.i-cell-icon{margin-right:5px}.i-cell-icon:empty{display:none}.i-cell-bd{flex:1}.i-cell-text{line-height:24px;font-size:14px}.i-cell-desc{line-height:1.2;font-size:12px;color:#80848f}.i-cell-ft{position:relative;text-align:right;color:#495060}.i-cell-access .i-cell-ft{padding-right:13px}.i-cell-access .i-cell-ft::after{content:" ";display:inline-block;width:6px;height:6px;position:absolute;top:50%;right:2px;border-width:2px 2px 0 0;border-color:#dddee1;border-style:solid;transform:translateY(-50%) matrix(.71,.71,-.71,.71,0,0)}
</style>