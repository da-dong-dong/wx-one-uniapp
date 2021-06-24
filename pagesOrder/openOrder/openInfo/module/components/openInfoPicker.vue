/************ 开单一级选择器 ***************/
<template>
	<view class="bigBox">
		<view class="left"> 
			<view class="onRequired" v-if="title=='服务等级' || title=='老师级别'">*</view>
			<view class="title">{{title}}</view>
			<picker @change="enchoose" :value="index" :range="arr">
				<view class="picker" :style="title.length === 2 ? 'width: 605rpx' : 'width: 530rpx'">
					<view class="text">{{show}}</view>
					<i-icon class="icon" type="enter" size="16" color="#80848f"/>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { mapGetters } from 'vuex'
	export default{
		props:['title','categoryName','changeId'],
		computed:{
			...mapGetters('shopArr',[
				// 分类
				'get_orderTypeArr',
				// 分组
				'get_orderGroup',
				// 服务等级
				'get_serviceCategory',
				// 老师级别
				'get_teacherCategory'
			]),
		},
		data(){
			return{
				show:null,
				arr:[],
				index:0
			}
		},
		mounted(){
			this.getArr()
		},
		methods:{
			getArr(){
				if(this[this.categoryName].length > 0){
					this.show = this[this.categoryName][0].name
					this[this.categoryName].forEach((i)=>{
						this.arr.push(i.name)
					})
					this.arr.shift()
				}else{
					$Message({
						content: '请重试',
						type: 'error'
					});
				}
			},
			enchoose(e){
				this.index = Number(e.detail.value)
				this.show = this.arr[this.index]
				this[this.categoryName].some((i)=>{
					if(i.name === this.show){
						this.$emit('update:getId',i.id)
					}
				})
			},	
		},
		watch:{
			changeId(){
				this[this.categoryName].some((i)=>{
					if(i.id === this.changeId){
						this.show = i.name
					}
				})
				this.index = this.arr.findIndex((i)=>{return i === this.show})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './moduleStyle.scss';
</style>
