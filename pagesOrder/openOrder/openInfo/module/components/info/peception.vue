<template>
	<view class="bigBox">
		<view class="left">
			<view class="onRequired">*</view>
			<view class="title">接单</view>
			<view class="picker" @click="goAddress">
				<view class="text">{{peception}}</view>
				<i-icon class="icon" type="enter" size="16" color="#80848f"/>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['addressInfo','peceptionName'],
		data(){
			return{
				peception:''
			}
		},
		methods:{
			goAddress(){
				uni.navigateTo({
					url:'/pages/address/address?type=RECEPTION&show=' + this.peception + '&num=4' 
				})
			}
		},
		watch:{
			addressInfo(){	
				if(this.addressInfo.type === 'RECEPTION'){
					if(this.addressInfo.enArr.length === 0){
						//this.peception = '接单人员'
						//this.$emit('update:peception',null)
					}else{
						this.peception = this.addressInfo.show
						let arr = []
						this.addressInfo.enArr.map((i)=>{
							let a = {
								actorId:i.id,
								main:i.main || false
							}
							arr.push(a)
						})
						this.$emit('update:peception',arr)
					}			
				}
			},
			peceptionName(val){
				this.peception = this.peceptionName
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../moduleStyle.scss';
</style>
