<template>
	<view>
		<view class="box flex_arr">
			<view class="title">拍照张数</view>
			<input type="number" v-model="pNum" @input="changeNum"/>
		</view>
	</view>
</template>

<script>
	export default{
		props:['num'],
		data(){
			return{
				pNum:null,
			}
		},
		// mounted(){
		// 	this.pNum = this.num
		// },
		methods:{
			changeNum(e){
				this.$emit('update:getNum',Number(e.detail.value))
			}
		},
		watch:{
			num(){
				this.pNum = this.num
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pagesWork/arrange/components/component.scss';
	input{
		border: 1rpx solid #DDDDDD;
		border-radius: 10rpx;
		padding: 0 10rpx;
		width: 200rpx;
	}
</style>
