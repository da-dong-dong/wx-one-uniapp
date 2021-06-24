<template>
	<view class="bigBox" v-if="params.length > 0">
		<view class="title">新增商品</view>
		<view class="tableTitle">
			<view class="text">商品</view>
			<view class="text">单价</view>
			<view class="text">P数</view>
			<view class="text">数量</view>
		</view>
		
		<view class="tableInfo" v-for="(item,index) in params" :key="index">
			<i-swipeout
				:actions="actions" 
				:toggle="toggle2"
				@change="handlerCloseButton(index)"
			>
				<view slot="content" class="listInfo">
					<view class="text">{{item.name}}</view>
					<!-- 商品单价 -->
					<view class="text price">{{item.pSalePrice}}</view>
					<!-- 商品P数 -->
					<input class="text" type="number" v-model="item.orderP" @input="emitParams"/> 
					<!-- 商品数量 -->
					<input class="text" type="number" v-model="item.orderNum" @input="emitParams"/>
				</view>
			</i-swipeout>
		</view>
	</view>
</template>

<script>
	export default{
		inject: ["porThis",'priceItem'],
		props:['index','info'],
		data(){
			return{
				// 滑动菜单按钮
				actions : [
					{
						name : '删除',
						color : '#fff',
						fontsize : '20',
						width : 80,
						icon : 'none',
						background : '#ed3f14'
					},
				],
				toggle2 : false,
				params:[],
			}
		},
		mounted(){
			let info = this.priceItem._data.params[this.index].orderItemGoods
			this.getParams(info)
		},
		methods:{
			// 赋值params
			getParams(arr){
				arr.forEach((i)=>{
					let orderItem = {
						id:i.id,
						name: i.name,
						orderP: i.countP || 1,
						defaultP: i.defaultP,
						goodsId: i.goodsId,
						orderNum: i.count || 1,
						pSalePrice: i.pSalePrice,
						stockStatus: i.stockStatus,
						isSelect: i.isSelect,
						salePrice: i.salePrice,
						pickupModeCategoryId: null,
						remark:null,
						sort: null,
						unitStr:i.unitStr
					}
					this.params.push(orderItem)
				})
				this.emitParams()
			},
			// 赋值进父组件
			emitParams(){
				this.$emit('getItem',this.params)
			},
			// 删除
			handlerCloseButton(index){
				this.params.splice(index, 1)
				this.emitParams()
			}
		},
		watch:{
			'porThis._data.toolInfo'(){
				let newData = this.porThis._data.toolInfo
				if(this.index === Number(newData.index) && newData.type === 'GOODS'){
					this.getParams(newData.toolArr)
				}
			},
			info(val){
				//更新视图
				this.params = val
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './addTool.scss';
</style>
