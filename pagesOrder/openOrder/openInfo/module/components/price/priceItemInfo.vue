/******************** 子订单内容组件 ***********************/
<template>
	<view>
		<view class="inpBox">
			<!-- 价格 -->
			<view class="listBox">
				<view class="inpTitle">价格</view>
				<input type="number" v-model="info.price" @input="input" placeholder="请输入"/>
			</view>
			<!-- 精修 -->
			<view class="listBox">
				<view class="inpTitle">精修</view>
				<input type="number" v-model="info.refineCount" @input="input" placeholder="请输入"/>
			</view>
			<!-- 拍摄保底张数 -->
			<view class="listBox">
				<view class="inpTitle">拍摄保底张数</view>
				<input type="number" v-model="info.photoCount" @input="input" placeholder="请输入"/>
			</view>	
			<!-- 入底 -->
			<view class="listBox">
				<view class="inpTitle">入底</view>
				<input type="number" v-model="info.bottomCount" @input="input" placeholder="请输入"/>
			</view>
			<!-- 入册 -->
			<view class="listBox">
				<view class="inpTitle">入册</view>
				<input type="number" v-model="info.bookCount" @input="input" placeholder="请输入"/>
			</view>
			<!-- v-if="info.orderItemGoods.length > 0" -->
			<good :index="index" @getItem="getGood" :info="info.orderItemGoods"></good>
			<dress :index="index" @getItem="getDress" :info="info.orderItemDressInfo"></dress>
			<place :index="index" @getItem="getPlace" :info="info.orderItemPlace"></place>
			<service :index="index" @getItem="getService" :info="info.orderItemService"></service>
		</view>
	</view>
</template>

<script>
	import good from './tool/good.vue'
	import dress from './tool/dress.vue'
	import place from './tool/place.vue'
	import service from './tool/service.vue'
	export default{
		props:['info','index'],
		components:{
			good,
			dress,
			place,
			service
		},
		data(){
			return{
			}
		},
		methods:{
			input() {
				let data = {
					index:this.index,
					info:this.info
				}
				uni.$emit('itemInfo',data)
			},
			getGood(e){
				this.info.orderItemGoods = e
				this.input()
			},
			getDress(e){
				this.info.orderItemDressInfo = e
				this.input()
			},
			getPlace(e){
				this.info.orderItemPlace = e
				this.input()
			},
			getService(e){
				this.info.orderItemService = e
				this.input()
			},
		}
	}
</script>

<style lang="scss">
	.inpBox{
		.listBox{
			padding: 20rpx 30rpx;
			display: flex;
			border-bottom: 1rpx solid #f9f9f9;
			.inpTitle{
				line-height: 40rpx;
			}
			input{
				margin-left: 30rpx;
				color: #808080;
			}
		}
	}
</style>
