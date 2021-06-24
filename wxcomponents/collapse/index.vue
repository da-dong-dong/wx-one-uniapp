<template>
<uni-shadow-root class="collapse-index"><view class="i-class i-collapse" @collapse="clickfn">
  <slot></slot>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'collapse/index'
Component({
    externalClasses: ['i-class'],

    relations: {
        '../collapse-item/index': {
            type: 'child'
        }
    },
    properties: {
        name: String,
        accordion: Boolean
    },
    methods: {
        clickfn(e) {
            const params = e.detail;
            const allList = this.getRelationNodes('../collapse-item/index');
            allList.forEach((item) => {
                if (params.name === item.data.name) {
                    item.setData({
                        showContent: 'i-collapse-item-show-content'
                    });
                } else {
                    item.setData({
                        showContent: ''
                    });
                }
            });
        },
    }
});
export default global['__wxComponents']['collapse/index']
</script>
<style platform="mp-weixin">

</style>