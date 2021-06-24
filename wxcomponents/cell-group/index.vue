<template>
<uni-shadow-root class="cell-group-index"><view class="i-class i-cell-group">
    <slot></slot>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'cell-group/index'
Component({
    externalClasses: ['i-class'],

    relations: {
        '../cell/index': {
            type: 'child',
            linked () {
                this._updateIsLastCell();
            },
            linkChanged () {
                this._updateIsLastCell();
            },
            unlinked () {
                this._updateIsLastCell();
            }
        }
    },

    methods: {
        _updateIsLastCell() {
            let cells = this.getRelationNodes('../cell/index');
            const len = cells.length;

            if (len > 0) {
                let lastIndex = len - 1;

                cells.forEach((cell, index) => {
                    cell.updateIsLastCell(index === lastIndex);
                });
            }
        }
    }
});
export default global['__wxComponents']['cell-group/index']
</script>
<style platform="mp-weixin">

</style>