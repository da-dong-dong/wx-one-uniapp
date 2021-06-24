<template>
	<view class="bigBox">
		<view class="left">
			<view class="title">网销</view>
			<view class="picker" @click="goAddress">
				<view class="text">{{network}}</view>
				<i-icon class="icon" type="enter" size="16" color="#80848f"/>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['orderTime','addressInfo'],
		data(){
			return{
				network:'网销人员'
			}
		},
		methods:{
			goAddress(){
				uni.navigateTo({
					url:'/pages/address/address?type=NETWORK_SALES&show=' + this.network + '&num=1' 
				})
			}
		},
		watch:{
			addressInfo(){
				if(this.addressInfo.type === 'NETWORK_SALES'){
					if(this.addressInfo.enArr.length === 0){
						this.network = '网销人员'
						this.$emit('update:network',null)
					}else{
						this.network = this.addressInfo.show
						let arr = []
						this.addressInfo.enArr.map((i)=>{
							let a = {
								actorId:i.id,
								main:i.main || false
							}
							arr.push(a)
						})
						this.$emit('update:network',arr)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../moduleStyle.scss';
</style>
