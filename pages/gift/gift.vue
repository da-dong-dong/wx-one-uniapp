/****************************************  礼物添加页面 ***********************************************/
<template>
	<view class="bigBox">
		<view class="box">
			<view class="searchBox">
				<view class="text">礼包名称</view>
				<view>
					<picker
						:range="array"
						:value="index"
						mode = multiSelector
						@change="enList"
						@columnchange="changeList"
					>
						<view class="picker">
							<view>{{show}}</view>
							<i-icon type="unfold" size="15" color="#80848f"/>
						</view>
					</picker>
				</view>
			</view>
			<view class="prompt">
				<view>总共({{list.length}})个 <span v-if="canCheck > 0">可选({{canCheck}})个</span></view>
			</view>
			<view class="mainBox" v-if="list.length > 0">
				<!-- 标题 -->
				<view class="titleBox">
					<view class="title">名称</view>
					<view class="title">数量</view>
					<view class="title">类型</view>
				</view>
				<checkbox-group @change="enChange">
					<view class="textBox" v-for="(item ,index) in list" :key="index">
						<view class="check">
							<checkbox :value="item.id" :checked="item.checked" style="transform:scale(0.7)"/>
						</view>
						<view class="fText">{{item.name}}</view>
						<view class="text">{{item.count}}</view>
						<view class="text">{{item.myType | type}}</view>
					</view>
				</checkbox-group>
			</view>	
			<view v-else>暂无数据</view>
			<view class="button" @click="en">确定</view>
		</view>
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { getGiftName, getGiftDetail } from '@/util/api/goods.js'
	import { mapActions,mapGetters } from 'vuex'
	export default{
		computed:{
			...mapGetters('shopArr',[
				'get_giftType'
			]),
			...mapGetters('app',[
				'shopId'
			]),
			dateRange(){
				const {
					get_giftType,
					giftNameList
				} = this 
				return{
					get_giftType,
					giftNameList
				}
			}
		},
		filters:{
			type(type){
				const result =new Map([
					['bookCount','入册'],
					['bottomCount','入底'],
					['dress','服装'],
					['good','商品'],
					['place','景点'],
					['service','服务'],
				])
				return result.get(type)
			}
		},
		data() {
			return {
				// 订单类型
				type:null,
				// picker选择
				array:[[],[]],
				// picker选择下标
				index:[0,0],
				// 一级数组内容
				firstArr:[],
				// 二级数组内容
				secondArr:[],
				// 显示
				show:'请选择',
				// 礼物名字列表
				giftNameList:null,
				// 第二项 类别Id
				secondId:null,
				// 礼物详情
				list:[],
				// 可选数量
				canCheck:0,
				// 选择
				enGift:null,
				// 上页数据
				prveData:null,
				params:{
					// 	礼包入册
					bookCount:null,
					// 礼包入底
					bottomCount:null,
					// 礼包ID
					giftId:null,
					// 礼包名称
					giftName:null,
					// 礼包价格
					giftPrice:null,
					// 服装对象
					orderItemDressInfo:[],
					// 商店对象
					orderItemGoods:[],
					// 景点对象
					orderItemPlace:[],
					// 服务对象
					orderItemService:[],
				}
			};
		},
		onLoad(op){
			this.type = op.type
			// this.type = 'WEDDING_DRESS'
			this.getGiftName()
			let pages = getCurrentPages()
			let prvePages = pages[pages.length - 2]
			this.prveData = prvePages.data.gift
		},
		methods:{
			// 获取礼物名字列表 用于一级项
			getGiftName(){
				getGiftName({shopId:this.shopId , type:this.type}).then(res=>{
					this.giftNameList = res.data.data
				})
			},
			// 获取礼物详情
			getGiftDetail(){
				getGiftDetail({id:this.secondId}).then(res=>{
					let data = res.data.data
					this.params.giftId = data.id
					this.params.giftName = data.name
					this.params.giftPrice = data.price
					this.canCheck = data.selectCount
					if(data.bookCount){
						this.list.push({
							id:-1,
							name:'入册',
							count:data.bookCount,
							myType:'bookCount',
						})
					}
					if(data.bottomCount){
						this.list.push({
							id:-2,
							name:'入底',
							count:data.bottomCount,
							myType:'bottomCount',
						})
					}
					data.giftItemDressInfos.forEach((i)=>{
						let arr = {
							count:i.count, //服装套数	
							dressInfoId: i.id, //服装ID
							name: i.name,	//服装名称	
							remark: null,	//服装备注	
							salePrice: i.salePrice,//销售价格	
							sort:null,	//排序
							type:i.type,
							myType:'dress',
							id: i.id,
						}
						this.list.push(arr)
					})
					data.giftItemGoods.forEach((i)=>{
						let arr = {
							defaultP:i.countP,	//商品默认P数	
							expeditedTime:null,	//加急日期	
							goodsId: i.id, //商品ID	
							isSelect: i.isSelect,	//商品选片状态
							name: i.name, //商品名
							orderNum:i.count, //订单商品数量
							orderP:i.countP, //订单商品P数
							pSalePrice: i.pSalePrice, //P销售价格	
							pickupModeCategoryId:null, //取件方式	
							psalePrice: i.pSalePrice, 		
							remark:null,	//商品备注	
							salePrice:i.salePrice,	//商品销售价
							sort:null,	//排序
							stockStatus:false,
							count: i.count,
							myType:'good',
							id: i.id,
						}
						this.list.push(arr)
					})
					data.giftItemPlaces.forEach((i)=>{
						let arr = {
							name: i.name,	//景点名	
							placeId: i.id,	//景点ID
							placeType:i.placeType,	//内外景
							remark:null, //景点备注	
							salePrice:i.salePrice,	//景点销售价	
							sort:null, 
							count: 1,
							id: i.id,
							myType:'place',
						}
						this.list.push(arr)
					})
					data.giftItemServices.forEach((i)=>{
						let arr = {
							count: i.count, //服务数量	
							name: i.name, //服务名	
							peopleNumber:i.peopleNumber, //服务人数	
							remark:null, //服务备注	
							salePrice:i.salePrice, //服务销售价
							serviceId: i.id, //服务ID
							sort:null,
							id: i.id,
							myType:'service',
						}
						this.list.push(arr)
					})
					if(this.prveData){
						this.list.forEach((i)=>{
							if(this.prveData.enId.includes(String(i.id))){
								this.$set(i,'checked',true)
							}
						})
					}
				})
			},
			// 获取 二级 项
			getSecond(){
				// 第一项下标
				let firstIndex = this.index[0]
				// 获取当前一级 项的ID
				let firstId = this.firstArr[firstIndex].id
				// 获取二级项 
				this.secondArr = this.giftNameList[firstId]
				// 赋值给二级项 
				this.array[1] = this.secondArr.map((i)=>{ return i.name })
				// 第二项下标
				let secondIndex = this.index[1]
				// 获取二级项Id
				this.secondId = this.secondArr[secondIndex].id
			},	
			changeList(e){
				let ind = e.detail.column
				this.index[ind] = e.detail.value
				this.getSecond()
				this.getShow()
			},
			// 确定选择
			enList(e){
				this.getGiftDetail()
				this.getShow()
			},
			// 获取显示名字
			getShow(){
				let first = this.firstArr[this.index[0]]
				let second = this.secondArr[this.index[1]]
				this.show = `${first.name}/${second.name}`
			},
			// 多选
			enChange(e){
				this.enGift = e.detail.value
			},
			// 确定
			en(){
				let needArr = this.list.filter((i)=>{
					if(this.enGift.includes(String(i.id))){ return i }
				})	
				// 如果超出可选范围 提醒
				if(needArr.length > this.canCheck && this.canCheck > 0){
					$Message({
						content: '最多可选' + this.canCheck,
						type: 'warning'
					});
				}else{
					needArr.forEach((i)=>{
						switch(i.type){
							case 'bookCount':
								this.params.bookCount = i.count
								break
							case 'bottomCount':
								this.params.bottomCount = i.count
								break
							case 'dress':
								this.params.orderItemDressInfo.push(i)
								break
							case 'good':
								this.params.orderItemGoods.push(i)
								break
							case 'place':
								this.params.orderItemPlace.push(i)
								break
							case 'service':
								this.params.orderItemService.push(i)
								break
						}
					})
					var pages = getCurrentPages();
					var prevPage = pages[pages.length - 2]; //上一个页面
					prevPage.setData({
						gift: {
							'params':this.params,
							'index':this.index,
							'enId':this.enGift,
						}
					})
					uni.navigateBack({//返回
						delta: 1
					})
				}
			}
		},
		watch:{
			// 获取礼物名字列表
			dateRange(){
				// 一级项
				let arr = this.get_giftType.filter((i)=>{ return i.level === 2 })
				let needId = Object.keys(this.giftNameList).map(i => parseInt(i, 0))
				// 一级项 内容
				let firstArr = []
				arr.forEach((i)=>{
					if(needId.includes(i.id)){
						firstArr.push(i)
					}
				})
				this.firstArr = firstArr
				// 赋值给一级项
				this.array[0] = this.firstArr.map((i)=>{ return i.name })
				// 执行 获取二级项
				this.getSecond()
				if(this.prveData){
					this.index = this.prveData.index
					this.getSecond()
					this.getShow()
					this.getGiftDetail()
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './giftStyle.scss';
</style>
