<template>
	<view class="bigBox" v-if="params.length > 0">
		<view class="title">新增服装</view>
		<view class="tableTitle">
			<view class="text">服装</view>
			<view class="text">单价</view>
			<view class="text">类型</view>
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
					<!-- 服装单价 -->
					<view class="text price">{{item.salePrice}}</view>
					<!-- 服装类型 -->
					<view class="text">{{item.type | type}}</view>
					<!-- 商品数量 -->
					<input class="text" type="number" v-model="item.count" @input="emitParams"/>
				</view>
			</i-swipeout>
		</view>
	</view>
</template>

<script>
	export default{
		inject: ["porThis",'priceItem'],
		props:['index','info'],
		filters:{
			type(type){
				const result = new Map([
					['INT', '内景'],
					['OUT', '外景'],
					['NONE', '无']
				])
				return result.get(type)
			}
		},
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
			let info = this.priceItem._data.params[this.index].orderItemDressInfo
			this.getParams(info)
		},
		methods:{
			// 赋值params
			getParams(arr){
				arr.forEach((i)=>{
					let orderItem = {
						count: i.count | 1,
						//dressInfoId: i.dressInfoId, 字段id修改
						dressInfoId: i.id,
						name: i.name,
						salePrice: i.salePrice,
						type: i.type
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
				if(this.index === Number(newData.index) && newData.type === 'DRESSINFO'){
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
