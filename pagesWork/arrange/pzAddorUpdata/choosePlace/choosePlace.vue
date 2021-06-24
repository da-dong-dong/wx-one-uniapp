<template>
	<view class="bigBox">
		<!-- 标题 -->
		<view class="titleBox">
			<view class="left">
				<view>{{itemNo}}</view>
				<view>{{name}}</view>
			</view>
		</view>
		
		<!-- 添加按键 -->
<!-- 		<view class="addBox">
			<view class="add" v-if="gift.length > 0 ">+添加礼包</view>
			<view class="add">+添加景点</view>
		</view> -->
		
		<view class="mainBox">
			<checkbox-group @change="checkboxChange">
				<label v-for="item in infoData" :key="item.id">
					<view class="list">
						<checkbox :value="item.id" :checked="item.checked" />
						<view class="text">{{item.name}} ({{item.placeType | type}}) {{item.sourceProducts | scourceFilter}}</view>
					</view>
				</label>
			</checkbox-group>
		</view>
		
		<i-message id="message" />
		<view class="button" @click="enSure">确定选择</view>
	</view>
</template>

<script>
	import { getPhotoPlace,getGiftList } from '@/util/api/shop.js'
	export default {
		filters:{
			type(type){
				const result = new Map([
					['INT', '内景'],
					['OUT', '外景'],
					['NONE', '无'],
					['ALL', '通用']
				])
				return result.get(type)
			},
			scourceFilter (type) {
				const result = new Map([
					['GIFT', '礼包'],
					['CUSTOM', '新增'],
					['ASSEMBLY', '套系']
				])
				return result.get(type)
			}
		},
		data() {
			return {
				
				// 订单ID
				oId:null,
				// 子订单ID
				itemId:null,
				// 子订单号
				itemNo:null,
				// 子订单名
				name:null,
				
				// 礼品
				gift:[],
				
				// 已选择
				enArr:[],
				// 上页已选
				FenArr:[],
				
				infoData:[],
			};
		},
		onLoad(option){
			this.itemNo = option.itemNo
			this.name = option.name
			this.oId = option.oId
			this.itemId = option.itemId
			this.getPhotoPlace()
			this.getGiftList('PLACE')
			this.FenArr = JSON.parse(option.en)
		},
		methods:{
			// 获得景点
			getPhotoPlace(){
				getPhotoPlace({itemId: Number(this.itemId)}).then(res=>{
					this.infoData = res.data.data
					if(this.FenArr){
						this.FenArr.forEach((i)=>{
							this.infoData.forEach((j)=>{
								if(i.id === j.id){
									j.checked = true
								}
							})
						})
					}
				})
			},
			// 获取礼包
			getGiftList(e){
				let params = {
					giftTypes: [e],
					orderId:this.oId
				}
				getGiftList(params).then(res=>{
					this.gift = res.data.data
				})
			},
			
			// 选择
			checkboxChange(e){
				let enArr = []
				let arr = e.detail.value
				let nArr = arr.map(Number)
				this.infoData.forEach((i)=>{
					if(nArr.includes(i.id)){
						enArr.push(i)
					}
				})
				this.enArr = enArr
			},
			
			//确定选择
			enSure(){
				let newArr = []
				this.enArr.forEach((i)=>{
					let lis = {
						id: i.id,
						name: i.name,
						placeType: i.placeType,
						sourceProducts: i.sourceProducts
					}
					newArr.push(lis)
				})
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.setData({
					place: newArr
				})
				uni.navigateBack({//返回
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../chooseStyle.scss';
</style>
