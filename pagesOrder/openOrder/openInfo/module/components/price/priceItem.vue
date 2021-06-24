<template>
	<view>
		<view class="top">
			<view class="left">
				<view class="allMoney">套系总金额{{allMoney}}元</view>
				<view class="giftInfo" v-if="giftLen > 0">+{{giftPrice}}元 送礼品 {{giftLen}} 个</view>
			</view>
			<view class="but" @click="addGift">添加礼包</view>
		</view>
		
		<!-- 子订单内容 -->
		<view>
			<!-- 折叠效果 -->
			<view v-for="(item,index) in params" :key="index">
				<collapseItem 
					:info="item"
					:index="index"
					@del="delList($event,index)"
					@addTool="addTool($event,index)"
				></collapseItem>
			</view>
			
			<view class="addOrderChild" @click="addOrderChild">增加子单</view>
		</view>
		
		<delModal :title="'删除'" v-if="delModalShow" @cancel="close" @ok="ok"></delModal>
		<!-- 选择工具箱模态框 -->
		<toolModal v-if="toolModalShow" @close="close" :index="toolModalIndex"></toolModal>
	</view>
</template>

<script>
	import { getOrderAssembly } from '@/util/api/goods.js'
	import toolModal from './toolModal.vue'
	import collapseItem from './collapseItem.vue'
	import delModal from '@/components/delModal.vue'
	export default{
		inject: ["porThis"],
		props:['piceId','type'],
		components:{
			toolModal,
			delModal,
			collapseItem,
		},
		provide() {
			return {
				priceItem:this,
			};
		},
		data(){
			return{	
				// 选择添加
				toolModalShow:false,
				// 子订单内容
				params:null,
				
				// 总金额
				allMoney:null,
				// 礼包价格
				giftPrice:null,
				// 礼包数量
				giftLen:0,
				
				showContent: '',
				// 删除模态框
				delModalShow:false,
				// 需要删除的下标
				delIndex:null,
				// 需要添加的下标
				toolModalIndex:null,
			}
		},
		mounted(){
			// this.getOrderAssembly(this.piceId)
			uni.$on('itemInfo',(e)=>{
				this.$set(this.params,e.index,e.info)
				let moneyArr = this.params.map((i)=> { return Number(i.price) })
				this.allMoney =  moneyArr.reduce((n,m) => n+m)
				this.$emit('update:getOrderItem',this.params)
				this.$emit('update:getAllprice',this.allMoney)
			})
		},
		methods:{
			// 获取详情
			getOrderAssembly(id){
				console.log('id:~~~',id)
				getOrderAssembly({ id }).then(res=>{
					let list = res.data.data.assemblyItemList
					list.forEach((i)=>{
						i.orderItemDressInfo = i.assemblyItemDressInfos
						i.orderItemGoods = i.assemblyItemGoods
						i.orderItemPlace = i.assemblyItemPlaces
						i.orderItemService = i.assemblyItemServices
						i.refineCount = i.refineCount
						i.photoCount = i.photoCount
						i.itemRemindTime = Date.parse(new Date())
						delete i.sort
						delete i.dataStatus
						delete i.id
						delete i.assemblyItemDressInfos
						delete i.assemblyItemGoods
						delete i.assemblyItemPlaces
						delete i.assemblyItemServices
					});
					//判断是否有两个字段
					let goodList = list[0].orderItemGoods
					let arrGood = []
					if(goodList.length>0 && (!goodList[0].orderNum || !goodList[0].orderP)){
						//循环改字段
						list[0].orderItemGoods.forEach((i=>{
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
								sort: null
							}
							arrGood.push(orderItem)
						}))
						list[0].orderItemGoods = arrGood
					}
					this.params = list;
				})
			},
			// 打开删除模态框
			delList(e,index){
				this.delIndex = index
				this.delModalShow = true
			}, 
			// 关闭模态框
			close(){
				this.delIndex = null
				this.toolModalShow = false
				this.delModalShow = false
			},
			// 删除模态框返回值 确定
			ok(){
				this.params.splice(this.delIndex, 1)
				this.delIndex = null
				this.delModalShow = false
				//总金额变化
				if(this.params.length==0){
					this.allMoney = 0
				}
			},
			// 新增子单
			addOrderChild(){
				let addOrderItem = {
					// 入册
					bookCount:null,
					// 入底
					bottomCount:null,
					// 子订单提醒时间
					itemRemindTime: Date.parse(new Date()),
					// 子订单名称
					name:null,
					// 拍摄张数
					photoCount:1,
					// 子订单价格
					price:null,
					// 精修张数
					refineCount:1,
					// 子订单礼包服务对象
					orderItemDressInfo:[],
					// 子订单商品对象
					orderItemGoods:[],
					// 子订单礼包景点对象
					orderItemPlace:[],
					// 子订单礼包服务对象
					orderItemService:[],
				}
				this.params.push(addOrderItem)
				this.$forceUpdate()
				this.$emit('update:getOrderItem',this.params)
				this.$emit('update:getAllprice',this.allMoney)
			},
			// 添加礼包
			addGift(){
				uni.navigateTo({
					url:'/pages/gift/gift?type=' + this.type
				})
			},
			// 添加商品
			addTool(e,index){
				this.toolModalShow = true
				this.toolModalIndex = index
			},
		},
		watch:{
			'porThis._data.giftInfo'(){
				let newData = this.porThis._data.giftInfo
				this.giftLen = newData.enId.length
				this.giftPrice = newData.params.giftPrice
			},
			params(val){
				let moneyArr = this.params.map((i)=> { return Number(i.price) })
				this.allMoney =  moneyArr.reduce((n,m) => n+m);
				this.$emit('update:getOrderItem',val)
				this.$emit('update:getAllprice',this.allMoney)
			},
		},
		destroyed(){
			uni.$off('itemInfo')
		},
	}
</script>

<style lang="scss" scoped>
	.top{
		font-size: 28rpx;
		padding: 20rpx 0;
		margin: 0 30rpx;
		display: flex;
		justify-content: space-between;
		.left{
			display: flex;
			.allMoney{
				color: #ff6f8c;
				padding: 5rpx;
			}
			.giftInfo{
				margin-left: 10rpx;
				background-color: #fff5f7;
				color: #ff6f8c;
				border: 1rpx solid #ff6f8c;
				padding: 5rpx;
				border-radius: 50rpx;
			}
		}
		.but{
			border-radius: 10rpx;
			border: 1rpx solid #61A3FF;
			color: #61A3FF;
			padding: 5rpx;
		}
	}
	.addOrderChild{
		font-size: 28rpx;
		width: 130rpx;
		height: 40rpx;
		border: 1rpx solid #61A3FF;
		color: #61A3FF;
		line-height: 40rpx;
		text-align: center;
		margin: 0 auto;
		border-radius: 10rpx;
		margin-top: 30rpx;
	}
</style>
