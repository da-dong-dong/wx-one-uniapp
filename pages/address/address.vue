/************************************   选择联系人  ************************************/
<template>
	<view>
		<view class="bigBox">
			<view class="serach">
				<picker @change="change" :value="pickerIndex" :range="pickerArr">
					<view class="uni-input">
						<view class="text">{{pickerArr[pickerIndex]}}</view>
						<i-icon type="unfold" size="15" color="#80848f"/>
					</view>
				</picker>
				</picker>
				<input type="text" placeholder="查询联系人" v-model="keyWork"/>
			</view>
			
			
			<view class="contentBox" v-if="!keyWork">
				<checkbox-group @change="checkboxChange">
					<view class="checkBox" v-for="item in list" :key="item.id">
						<checkbox class="transformScale" :value="item.id" :checked="item.checked" />
						<view class="text nowarp minw">{{ item.anotherName }}</view>
						<view class="text nowarp">{{ item.nameCal }}</view>
					</view>
				</checkbox-group>
			</view>
			
			<view class="contentBox" v-else>
				<checkbox-group @change="checkboxChange">
					<view  v-for="item in serachArr" :key="item.id">
						<view class="content">
							<checkbox class="transformScale" :value="item.id" :checked="item.checked" />{{ item.anotherName}}  {{ item.nameCal }}
						</view>
					</view>
				</checkbox-group>
			</view>
			
			<view class="ts" v-if="list.length <= 0">暂无该联系人</view>
			
			<view @click="num" class="back">确定</view>
		</view>
		
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { getAccountAllArr } from '@/util/api/user.js'
	export default {
		computed:{
			// 搜索数组
			serachArr() {
				let serachArr = []
				this.list.forEach((i)=>{
					if(i.anotherName.indexOf(this.keyWork) !== -1){
						serachArr.push(i)
					}
				})
				return serachArr
			}
		},
		data() {
			return {
				// 类型 英文
				typeEN:null,
				// 类型 中文
				typeCN:null,
				// 所有员工
				allEmployees:[],
				// 已选员工
				show:null,
				// 显示员工
				list:[],
				// 已选择员工
				enArr:[],
				// 数量
				numMax:null,
				
				// picker数组
				pickerArr:[
					'接单人',
					'专服人员',
					'网销人员',
					'选衣师',
					'摄影师',
					'摄影师助理',
					'化妆师',
					'化妆师助理',
					'引导师',
					'引导师助理',
					'录像师',
					'初修师',
					'精修师',
					'设计师',
					'发片师',
					'看版师',
					'选片师',
					'取件师',
					'调色师',
					'会计师',
					'人事',
					'店长',
					'仓管员',
					'剪辑师',
					'选修师',
					'全部'
				],
				pickerIndex:0,
				
				// 搜索关键字
				keyWork:'',
			};
		},
		onLoad(option){
			// 选人最大数
			this.numMax = option.num
			// 英文类型
			this.typeEN = option.type
			// 中文类型
			this.typeCN = this.typefilterCN(this.typeEN)
			// 已选显示
			this.show = option.show
			// 获取picker下标
			this.pickerIndex = this.pickerArr.findIndex((i)=>{return i === this.typeCN})
			// 获取所有员工列表
			this.getAccountAllArr()
		},
		methods:{
			// 获取员工列表信息
			getAccountAllArr(){
				getAccountAllArr().then(res=>{
					this.allEmployees = res.data.data // 所有员工
					this.filterArr(this.typeEN)
				})
			},	
			// 筛选员工
			filterArr(type){
				//判断是否为空
				let newArr = null
				if(type){
					// 过滤掉无关员工
					newArr =this.allEmployees.filter((i)=>{
						// console.log(i.positionTypes.includes(type) || i.positionTypes.length==0?'true':'flase')
						if(i.positionTypes.length == 0){
							return true
						}else{
							return	i.positionTypes.includes(type)
						}
						
					})
				}else{
					newArr = this.allEmployees
				}
				
				newArr.forEach((i)=>{
					if(this.show.split('/').includes(i.anotherName)){
						this.$set(i,'checked',true)
						this.enArr.push(i)
					}
					i.nameCal = i.positionTypes.map(res=>this.typefilterCN(res)).join('/')
				})
				this.list = newArr
			},	
			// 筛选条件
			change(e){
				this.pickerIndex = e.detail.value
				let filterName = this.pickerArr[e.detail.value]
				this.filterArr(this.typefilter(filterName))
			},	
			// 选择联系人返回
			checkboxChange(e){
				// 获取已选联系人数组
				let arr = this.allEmployees.filter((i)=>{
					return e.detail.value.includes(String(i.id))
				})
				this.enArr = arr
				let show = this.enArr.map((i)=>{
					return i.anotherName
				})
				this.show = show.join('/')
			},	
			// 过滤 获取英文
			typefilter(type){
				const result = new Map([
					[ '接单人', 'RECEPTION'],
					[ '专服人员', 'SERVICE'],
					[ '网销人员', 'NETWORK_SALES' ],
					[ '选衣师', 'CHOOSECLOTHERSGRAPHER' ],
					[ '摄影师', 'PHOTOGRAPHER' ],
					[ '摄影师助理', 'PHOTOGRAPHER_ASSISTANT' ],
					[ '化妆师', 'MAKEUP' ],
					[ '化妆师助理', 'MAKEUP_ASSISTANT' ],
					[ '引导师', 'INSTRUCTOR' ],
					[ '引导师助理', 'INSTRUCTOR_ASSISTANT' ],
					[ '录像师', 'VIDEOGRAPHER' ],
					[ '初修师', 'REPAIRGRAPHER' ],
					[ '精修师', 'REFINEGRAPHER' ],
					[ '设计师', 'DESIGNGRAPHER' ],
					[ '发片师', 'SENDERGRAPHER' ],
					[ '看版师', 'WATCHGRAPHER' ],
					[ '选片师', 'CHOOSEGRAPHER' ],
					[ '取件师', 'PICKUPGRAPHER' ],
					[ '调色师', 'COLORGRAPHER' ],
					[ '会计师', 'ACCOUNTANT' ],
					[ '人事', 'PERSONNEL' ],
					[ '店长', 'STORE_MANAGER' ],
					[ '仓管员', 'WAREHOUSE_MANAGER' ],
					[ '剪辑师', 'VIDEOCLIPGRAPHER' ],
					[ '选修师', 'ELECTIVEGRAPHER' ],
					[ '全部', '' ]
				])
					return result.get(type)
			},		
			// 获取中文类型
			typefilterCN(type){
				const result = new Map([
					[ 'RECEPTION', '接单人'],
					[ 'SERVICE', '专服人员'],
					[ 'NETWORK_SALES', '网销人员' ],
					[ 'CHOOSECLOTHERSGRAPHER', '选衣师' ],
					[ 'PHOTOGRAPHER', '摄影师' ],
					[ 'PHOTOGRAPHER_ASSISTANT', '摄影师助理' ],
					[ 'MAKEUP', '化妆师' ],
					[ 'MAKEUP_ASSISTANT', '化妆师助理' ],
					[ 'INSTRUCTOR', '引导师' ],
					[ 'INSTRUCTOR_ASSISTANT', '引导师助理' ],
					[ 'VIDEOGRAPHER', '录像师' ],
					[ 'REPAIRGRAPHER', '初修师' ],
					[ 'REFINEGRAPHER', '精修师' ],
					[ 'DESIGNGRAPHER', '设计师' ],
					[ 'SENDERGRAPHER', '发片师' ],
					[ 'WATCHGRAPHER', '看版师' ],
					[ 'CHOOSEGRAPHER', '选片师' ],
					[ 'PICKUPGRAPHER', '取件师' ],
					[ 'COLORGRAPHER', '调色师' ],
					[ 'ACCOUNTANT', '会计师' ],
					[ 'PERSONNEL', '人事' ],
					[ 'STORE_MANAGER', '店长' ],
					[ 'WAREHOUSE_MANAGER', '仓管员' ],
					[ 'VIDEOCLIPGRAPHER', '剪辑师' ],
					[ 'ELECTIVEGRAPHER', '选修师' ],
					[ '', '全部' ]
				])
					return result.get(type)
			},			
			// 判断数量
			num(){
				if(this.enArr.length > this.numMax){
					$Message({
						content: this.typeCN + '不能超过'+ this.numMax +'位',
						type: 'warning'
					});
				}else{
					if(this.enArr.length > 0){
						this.enArr[0].main = true
					}
					this.back()	
				}
			},	
			// 返回
			back(){
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.setData({
					address: {
						'enArr':this.enArr,
						'show':this.show,
						'type':this.typeEN
					}
				})
				uni.navigateBack({//返回
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bigBox{
		font-size: 28rpx;
		.serach{
			display: flex;
			margin: 30rpx;
			.uni-input{
				flex: 1;
				padding: 10rpx;
				border: 1rpx solid #61A3FF;
				border-radius: 10rpx;
				display: flex;
				justify-content: space-between;
				.text{
					margin-right: 30rpx;
				}
			}
			input{
				flex: 3;
				padding: 5rpx 10rpx;
				border: 1rpx solid #61A3FF;
				border-radius: 10rpx;
				margin-left: 30rpx;
			}
		}
		.contentBox{
			margin: 0 30rpx;
			.checkBox{
				display: flex;
				margin-bottom: 30rpx;
				.text{
					margin-left: 20rpx;
					height: 24px;
					line-height: 24px;
				}
			}
		}
		.ts{
			text-align: center;
			margin-top: 30rpx;
		}
		.back{
			position: fixed;
			bottom: 30rpx;
			width: 600rpx;
			color: #FFFFFF;
			background-color: #61A3FF;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 40rpx;
			margin: 0 auto;
			margin-left: 50%;
			transform: translateX(-50%);
		}
	}
	.nowarp{
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.minw{
		min-width: 80rpx;
	}
	.transformScale{
		transform: scale(1.2);
	}
</style>
