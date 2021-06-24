<template>
	<view class="bigBox">
		<view class="left">
			<view class="onRequired">*</view>
			<view class="title">套系名称</view>
			<picker
				@change="enList"
				:value="index" 
				:range="priceArr" 
				mode = multiSelector 
				@columnchange="changeList"
			>
				<view class="picker">
					<view class="text">{{price}}</view>
					<i-icon class="icon" type="enter" size="16" color="#80848f"/>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { getSystemNameList, getSystemDetail } from '@/util/api/goods.js'
	import { mapGetters } from 'vuex'
	export default{
		props:['type'],
		computed:{
			...mapGetters('app',[
				'shopId'
			]),
			...mapGetters('shopArr',[
				'get_piceList'
			])
		},
		data(){
			return{
				// 显示
				price:'请选择',
				
				priceArr:[[],[]],
				index:[0,0],
				
				// 所有套系
				allPrice:null,
				// 一级数组内容
				firstArr:null,
				// 二级数组内容
				secondArr:null,
				// 套系详情
				priceDetail:null,
			}
		},
		mounted(){
			this.getArr()
		},
		methods:{
			getArr(){
				if(this.get_piceList.length > 0){
					getSystemNameList({shopId:this.shopId, type:this.type}).then(res=>{
						this.allPrice = res.data.data
						// 获取改开单需要的 一级Id
						let needId = Object.keys(res.data.data).map(i => parseInt(i, 0))
						// 获取 一级 数组
						this.firstArr = this.get_piceList.filter((i)=>{ return needId.includes(i.id) })
						this.priceArr[0] = this.firstArr.map((i)=>{ return i.name })
						this.getSecond()
					})	
				}else{
					$Message({
						content: '请重试',
						type: 'error'
					});
				}
			},
			// 获取 二级 项
			getSecond(){
				// 获取一级下标
				let firstIndex = this.index[0]
				// 获取一级 Id
				let id = this.firstArr[this.index[0]].id
				// 获取二级 内容
				this.secondArr = this.allPrice[id]
				this.priceArr[1] = this.secondArr.map((i)=>{ return i.name })
				this.$forceUpdate()
			},
			changeList(e){
				let ind = e.detail.column
				this.index[ind] = e.detail.value
				this.getSecond()
			},
			// 确定选择
			enList(e){
				this.index[0] = e.detail.value[0]
				this.index[1] = e.detail.value[1]
				// 获取选择的 二级 数据
				let second = this.secondArr[this.index[1]]
				this.price = second.name
				this.getSystemDetail(second.id)
			},
			// 获取套系详情
			getSystemDetail(id){
				getSystemDetail({id:id}).then(res=>{
					let data = res.data.data
					this.priceDetail = {
						serviceCategoryId:data.serviceCategoryId, // 服务等级
						teacherCategoryId:data.teacherCategoryId, // 老师等级
						assemblyCategoryId:data.categoryId, // 套系类别ID
						assemblyId:data.id, // 套系ID
						assemblyName:data.name, // 套系名称
						assemblyPrice:data.price, // 套系价格
					}
					this.$emit('getPrice',this.priceDetail)
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import '../moduleStyle.scss';
	.picker{
		width: 530rpx !important;
	}
</style>
