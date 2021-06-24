<template>
	<view>
		<view class="box">
			<view class="title">取件商品</view>
			<view class="text" @click="go">
				<view>{{showName}}</view>
				<i-icon type="enter" color="#80848f"/>
			</view>
		</view>
	</view>
</template>

<script>
	import { getPickupStatus } from '@/util/api/shop.js'
	export default{
		props:['ids'],
		data(){
			return{
				showName:'请选择'
			}
		},
		mounted(){
		},
		methods:{
			// 获取取件状态
			getPickupStatus(){
				let ids = this.ids.join()
				getPickupStatus({ids:ids}).then(res=>{
					this.info = res.data.data
					let name = []
					this.info.forEach((i)=>{
						name.push(i.name)
					})
					this.showName = name.join()
				})
			},
			
			go(){
				this.$emit('goGetGoods')
			},
		},
		watch:{
			ids(){
				this.getPickupStatus()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './component.scss';
</style>
