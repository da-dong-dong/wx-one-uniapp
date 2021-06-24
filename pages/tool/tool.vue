/************************************** 工具箱添加页面  *******************************************/
<template>
	<view>
		<view class="bigBox">
			<!-- 查询 -->
			<view class="serachBox">	
				<picker class="pickerBox" @change="changeShop" :value="index" :range="pickerShopArr" v-if="toolType === 'DRESSINFO'">
					<view class="pickerListBox">
						<view class="text">{{pickerShopArr[index]}}</view>
						<i-icon type="unfold" size="15" color="#80848f"/>
					</view>
				</picker>
				<picker class="pickerBox" @change="change" :value="index" :range="pickerArr" v-else>
					<view class="pickerListBox">
						<view class="text">{{pickerArr[index]}}</view>
						<i-icon type="unfold" size="15" color="#80848f"/>
					</view>
				</picker>
				<input type="text" placeholder="名称" v-model="params.name"/>
				<view class="serachBut" @click="getList">查询</view>
			</view>
		
			<!-- 内容 -->
			<toolGood v-if="toolType === 'GOODS'" :info="list" @getTools="getTools"></toolGood>
			<toolDress v-if="toolType === 'DRESSINFO'" :info="list" @getTools="getTools"></toolDress>
			<toolPlace v-if="toolType === 'PLACE'" :info="list" @getTools="getTools"></toolPlace>
			<toolService v-if="toolType === 'SERVICES'" :info="list" @getTools="getTools"></toolService>
		
			<!-- 分页 -->
			<page :current="params.page" :total="total" @pageChange="pageChange" v-if="total>1"></page>

			<!-- 展示添加后内容 -->
			<view>
				<toolGood v-if="toolType === 'GOODS' && enTools.length>0" :info="enTools" @delTools="delTools" type="del"></toolGood>
				<toolDress v-if="toolType === 'DRESSINFO' && enTools.length>0" :info="enTools" @delTools="delTools" type="del"></toolDress>
				<toolPlace v-if="toolType === 'PLACE' && enTools.length>0" :info="enTools" @delTools="delTools" type="del"></toolPlace>
				<toolService v-if="toolType === 'SERVICES' && enTools.length>0" :info="enTools" @delTools="delTools" type="del"></toolService>
			</view>
			
			<view class="button" @click="enSure">添加</view>
		</view>
		
		<i-message id="message" />
	</view>
</template>

<script>
	import { 
		getGoodsToolList, 
		getPlaceToolList, 
		getServicesToolList, 
		getDressInfoToolList
	} from '@/util/api/goods.js'
	import { mapGetters,mapActions } from 'vuex'
	import page from '@/components/page.vue'
	import toolGood from './components/toolGood.vue'
	import toolDress from './components/toolDress.vue'
	import toolPlace from './components/toolPlace.vue'
	import toolService from './components/toolService.vue'
	export default {
		components:{
			page,
			toolGood,
			toolDress,
			toolPlace,
			toolService
		},
		data() {
			return {
				// 工具箱类型
				toolType:null,
				// 商品用途
				commodityUses:null,
				
				index:0,
				pickerArr:[],
				pickerShopArr:[],
				
				total:null,
				list:[],
				// 选中内容
				enTools:[],
				
				// 请求工具箱包体
				params:{
					// categoryId:null,
					isSearchCount:true,
					limit:10,
					name:'',
					page:1,
					shopId:null,
				},
			};
		},
		computed:{
			...mapGetters('app',[
				'shopId',
			]),
			...mapGetters('shopArr',[
				'get_toolType',
				'get_shopAllArr'
			]),
		},
		onLoad(op){
			if(op.commodityUses){
				this.commodityUses = op.commodityUses.split(',')
			}
			this.addIndex = op.index
			this.toolType = op.type
			this.params.shopId = Number(this.shopId)
			// this.toolType = 'GOODS'	
		},
		mounted(){
			if(this.toolType === 'DRESSINFO'){ 
				this.getShopPicker() 
			}else{
				this.act_toolType(this.toolType)
			}
			this.getList()
		},
		methods:{
			...mapActions('shopArr',[
				'act_toolType'
			]),
			getList(){
				switch(this.toolType){
					case 'GOODS':
						this.getGoodsToolList()
						break
					case 'DRESSINFO':
						this.getDressInfoToolList()
						break
					case 'PLACE':
						this.getPlaceToolList()
						break
					case 'SERVICES':
						this.getServicesToolList()
						break
				}
			},
			// 选择类别
			change(e){
				// 选择名字
				this.index = e.detail.value
				let getName = this.pickerArr[e.detail.value]
				if( getName === '全部类别'){
					delete this.params.categoryId
				}else{
					this.get_toolType.some((i)=>{
						if(i.name === getName){
							this.params.categoryId = i.id
						}
					})
				}
				this.getList()
			},
			// 选择门店返回
			changeShop(e){
				this.index = e.detail.value
				let getName = this.pickerShopArr[e.detail.value]
				this.get_shopAllArr.some((i)=>{
					if(i.name === getName){
						this.params.shopId = i.id
					}
				})
				this.getList()
			},
			// 工具箱分页
			pageChange(e){
				this.params.page  = e
				this.getList()
			},
			// 获取商品列表
			getGoodsToolList(){
				this.params.commodityUses = this.commodityUses
				getGoodsToolList(this.params).then(res=>{
					this.total = res.data.data.pages
					this.list = res.data.data.records
				})
			},
			// 获取服装列表
			getDressInfoToolList(){
				getDressInfoToolList(this.params).then(res=>{
					this.total = res.data.data.pages
					this.list = res.data.data.records
				})
			},
			// 获取景点列表
			getPlaceToolList(){
				getPlaceToolList(this.params).then(res=>{
					this.total = res.data.data.pages
					this.list = res.data.data.records
				})
			},
			// 获取服务列表
			getServicesToolList(){
				getServicesToolList(this.params).then(res=>{
					this.total = res.data.data.pages
					this.list = res.data.data.records
				})
			},
			// 获取门店Picker
			getShopPicker(){
				this.pickerShopArr = this.get_shopAllArr.map((i)=>{
					return i.shopName
				})
				this.index = this.get_shopAllArr.findIndex((i)=>{
					return i.shopId === this.shopId
				})
			},
			// 获取选中工具
			getTools(e){
				this.enTools.push(e)
			},
			// 添加后内容
			delTools(e){
				this.enTools = e
			},
			// 提交返回
			enSure(){
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2]; //上一个页面
				this.enTools.forEach(_ => _.goodsId = _.id)
				prevPage.setData({
					tool: {
						'toolArr':this.enTools,
						'type':this.toolType,
						'index':this.addIndex
					}
				})
				uni.navigateBack({//返回
					delta: 1
				})
			},
		},
		watch:{
			get_toolType(){
				let newArr = this.get_toolType.filter((i)=>{
					return i.level !== 1
				})
				this.pickerArr = newArr.map((i)=>{
					return i.name
				})
				this.pickerArr.unshift('全部类别')
			}
		}
	}
</script>

<style lang="scss">
	.bigBox{
		.serachBox{
			margin: 30rpx;
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;
			.pickerListBox{
				border-radius: 10rpx;
				border: 1rpx solid #61A3FF;
				padding: 10rpx;
				display: flex;
				.text{
					margin-right: 10rpx;
					width: 130rpx;
					overflow: hidden;
					white-space: nowrap;
				}
			}
			input{
				padding: 8rpx;
				border-radius: 10rpx;
				border: 1rpx solid #61A3FF;
			}
			.serachBut{
				background-color: #61A3FF;
				color: #FFFFFF;
				border-radius: 10rpx;
				padding: 10rpx;
			}
		}
		.button{
			width: 600rpx;
			height: 80rpx;
			margin: 30rpx 0;
			line-height: 80rpx;
			border-radius: 40rpx;
			background-color: #61A3FF;
			color: #FFFFFF;
			text-align: center;
			margin-left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
