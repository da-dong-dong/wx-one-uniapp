<template>
    <view>
        <view class="flex" @click="onClickOpenCalendar">
            
            <view class="uni-input">{{Item.birthdayTime ? Item.birthdayTime : '生日' | times}} </view>
            <i-icon class="icon" type="enter" size="16" color="#80848f"/>
        </view>
        <!-- 日历 -->
            <uni-calendar 
                    :insert="false"
                    :lunar="true" 
                    :clearDate='true'
                    @confirm="enSure"
                    @close="close"
                    ref="calendars"
                />
    </view>
</template>

<script>
    import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
    export default {
        props:['Item',"Index"],
        components:{
			uniCalendar
        },
        data(){
            return {
                birthdayTime:null
            }
        },
        methods:{
            //新农历日历选中确定返回值
			enSure(e){
                this.birthdayTime = new Date(e.fulldate).getTime()
                this.$emit('changeTime',{index:this.Index,val:this.birthdayTime})
			},
			//打开日历
			onClickOpenCalendar(){
				this.$refs.calendars.open()
			},
			//关闭日历
			close(){
				this.showText = false
			},
        }
    }
</script>

<style lang="scss" scoped>
.flex{
    display: flex;
    justify-content: space-between;
}
</style>