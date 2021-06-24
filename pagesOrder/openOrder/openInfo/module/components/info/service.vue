<template>
	<view class="bigBox">
		<view class="left">
			<view class="title">客服</view>
			<view class="picker" @click="goAddress">
				<view class="text">{{service}}</view>
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
				service:'客服人员'
			}
		},
		methods:{
			goAddress(){
				uni.navigateTo({
					url:'/pages/address/address?type=SERVICE&show=' + this.service + '&num=1' 
				})
			}
		},
		watch:{
			addressInfo(){
				if(this.addressInfo.type === 'SERVICE'){
					if(this.addressInfo.enArr.length === 0){
						this.service = '客服人员'
						this.$emit('update:service',null)
					}else{
						this.service = this.addressInfo.show
						let arr = []
						this.addressInfo.enArr.map((i)=>{
							let a = {
								actorId:i.id,
								main:i.main || false
							}
							arr.push(a)
						})
						this.$emit('update:service',arr)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../moduleStyle.scss';
</style>
