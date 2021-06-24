<template>
<uni-shadow-root class="grid-index"><view class="i-class i-grid"><slot></slot></view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'grid/index'
Component({
    externalClasses: ['i-class'],

    relations: {
        '../grid-item/index': {
            type: 'child',
            linked () {
                this.setGridItemWidth();
            },
            linkChanged () {
                this.setGridItemWidth();
            },
            unlinked () {
                this.setGridItemWidth();
            }
        }
    },

    methods: {
        setGridItemWidth () {
            const nodes = this.getRelationNodes('../grid-item/index');

            // const len = nodes.length;
            // if (len < 3) {
            //     nodes.forEach(item => {
            //         item.setData({
            //             'width': '33.33%'
            //         });
            //     });
            // } else {
            //     const width = 100 / nodes.length;
            //     nodes.forEach(item => {
            //         item.setData({
            //             'width': width + '%'
            //         });
            //     });
            // }
            const width = 100 / nodes.length;
            nodes.forEach(item => {
                item.setData({
                    'width': width + '%'
                });
            });
        }
    },

    ready () {
        this.setGridItemWidth();
    }
});
export default global['__wxComponents']['grid/index']
</script>
<style platform="mp-weixin">
.i-grid{border-top:1rpx solid #e9eaec;border-left:1rpx solid #e9eaec;overflow:hidden}
</style>