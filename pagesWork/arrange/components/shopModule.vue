/**************************** 预约门店 *****************************/
<template>
	<view>
		<view class="box">
			<view class="title">{{title}}</view>
			<picker @change="change" :value="index" :range="arr" class="flex_arr">
				<view class="picker">
					<view class="text">{{show}}</view>
					<i-icon class="icon" type="enter" size="16" color="#80848f"/>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		props:['shopId','title'],
		props:{
			shopId:{
				default:null,
			},
			title:{
				default:'预约门店'
			}
		},
		computed:{
			...mapGetters('shopArr',[
				// 门店
				'get_shopAllArr',
			])
		},
		data(){
			return{
				arr:[],
				index:0,
				show:null,
			}
		},
		created(){
			this.getShopArr()
		},
		methods:{
			getShopArr(){
				let arr = []
				this.get_shopAllArr.forEach((i)=>{
					arr.push(i.shopName)
				})
				this.arr = arr
			},
			change(e){
				this.get_shopAllArr.some((i)=>{
					if(i.shopName === this.arr[e.detail.value]){
						this.$emit('getId',i.shopId)
					}
				})
			},	
		},
		watch:{
			shopId(){
				let name
				this.get_shopAllArr.some((i)=>{ if(i.shopId === this.shopId){ name = i.shopName }})
				this.index = this.arr.findIndex((i)=>{ return i === name})
				this.show = name
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './component.scss';
</style>
