<template>
	<view>
		<view class="box">
			<view class="titleTop">客资来源</view>
			<view class="bigBox">
				<view class="left">
					<view class="title">客户来源</view>
					<!-- <view class="text" v-if="params.categoryJson.province">{{params.categoryJson.province | noData('客户来源')}}/{{params.categoryJson.city}}/{{params.categoryJson.region}}</view> -->
					<view class="uni-list-cell-db">
						<picker @change="changeCustomer" :value="indexCustomer" :range="arrCustomer">
							<view class="flex">
								<view class="uni-input">{{arrCustomer[indexCustomer]}}</view>
								<i-icon class="icon" type="enter" size="16" color="#80848f"/>
							</view>
						</picker>
						<!-- 二级选项 -->
						<!-- <picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="originIndex" :range="originArr" range-key="name">
							<view class="flex">
								<view class="uni-input" v-if="originArr.length === 1">{{originArr[0][originIndex[0]].name}}</view>
								<view class="uni-input" v-else>{{originArr[0][originIndex[0]].name}} {{originArr[1][originIndex[1]] ? ', ' + originArr[1][originIndex[1]].name : ''}}</view>
								<i-icon class="icon" type="enter" size="16" color="#80848f"/>
							</view>
						</picker> -->
					</view>
				</view>
			</view>
			<view class="bigBox">
				<view class="left">
					<view class="title">客户区域</view>
					<!-- <view class="text">{{params.source | noData('客户区域')}}</view> -->
					<!-- <input class="uni-input" type="text" v-model="params.source" placeholder="客户区域" /> -->
					<view class="uni-list-cell-db">
						<picker @change="changeRegion" :value="indexRegion" :range="arrRegion">
							<view class="flex">
								<view class="uni-input">{{arrRegion[indexRegion]}}</view>
								<i-icon class="icon" type="enter" size="16" color="#80848f"/>
							</view>
						</picker>
						<!-- 二级选项 -->
						<!-- <picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange2" :value="regionIndex" :range="regionArr" range-key="name">
							<view class="flex">
								<view class="uni-input" v-if="regionArr.length === 1">{{regionArr[0][regionIndex[0]].name}}</view>
								<view class="uni-input" v-else>{{regionArr[0][regionIndex[0]].name}} {{regionArr[1][regionIndex[1]] ? ', ' + regionArr[1][regionIndex[1]].name : ''}}</view>
								<i-icon class="icon" type="enter" size="16" color="#80848f"/>
							</view>
						</picker> -->
					</view>
				</view>
			</view>
			<view class="bigBox">
				<view class="left">
					<view class="title">老客姓名</view>
					<!-- <view class="text">{{params.referrerName | noData('老客姓名')}}</view> -->
					<input class="uni-input" type="text" v-model="params.referrerName" placeholder="老客姓名" />
				</view>
			</view>
			<view class="bigBox">
				<view class="left">
					<view class="title">老客手机</view>
					<!-- <view class="text">{{params.referrerMobile | noData('老客手机')}}</view> -->
					<input class="uni-input" type="text" v-model="params.referrerMobile" placeholder="老客手机" />
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import { getCategoryList } from '@/util/api/common.js'
	export default{
		props:['mainContact','type'],
		filters:{
			noData(data,text){
				if(data){
					return data
				}else{
					return text
				}
			}
		},
		data(){
			return{
				arrCustomer:[], //客户来源数据
				indexCustomer:0, //客户来源索引
				arrRegion:[],	//客户区域数据
				indexRegion:0, //客户区域索引

				originIndex: [0, 0, 0],
				regionIndex: [0, 0, 0],
				originArr: [],
				regionArr: [],
				otherSourceList: [],
				otherSourceRegion: [],
				params:{
					typeTime:null,	// 日期
					typeLunar: false, // 农历
					referrerMobile:null,	//推荐人电话
					referrerName:null,	//推荐人姓名
					originStr: '' ,// 来源ID
					categoryStr: '', // 客户区域
				},
			}
		},
		created () {
			getCategoryList({ type: 'CUSTOMER_SOURCE' }).then(res => {
				console.log('来源', res)
				this.otherSourceList = res.data.data
				//优化客户来源
				let arrRes = this.otherSourceList.filter(_ => _.level === 2)
				arrRes = arrRes.filter((i)=>{ if(i.name.indexOf("删除") == -1 ){return i.name }else{return ""}})
				this.arrCustomer = arrRes.map((i)=>{ if(i.name.indexOf("删除") == -1 ){return i.name }else{return ""}})
				
				//默认取值
				this.params.originStr = this.arrCustomer[this.indexCustomer]

				//二级选项
				// this.originArr.push(this.otherSourceList.filter(_ => _.level === 2))
				// let level = this.otherSourceList.map(_ => _.level)
				// if (level.filter(_ => _ > 2).length) {
				// 	let id = this.originArr[0][0].id
				// 	this.originArr.push(this.otherSourceList.filter(_ => id === _.parentId))
				// }
			})
			getCategoryList({ type: 'CUSTOMER_REGION' }).then(res => {
				console.log('客户区域', res)
				this.otherSourceRegion = res.data.data
				//优化客户区域
				let arrRes = this.otherSourceRegion.filter(_ => _.level === 2)
				arrRes = arrRes.filter((i)=>{ if(i.name.indexOf("删除") == -1 ){return i.name }else{return ""}})
				this.arrRegion = arrRes.map((i)=>{ if(i.name.indexOf("删除") == -1 ){return i.name }else{return ""}})

				//可为空
				this.arrRegion.unshift('')

				//默认取值
				this.params.categoryStr = this.arrRegion[this.indexRegion]

				//二级选项
				// this.regionArr.push(this.otherSourceRegion.filter(_ => _.level === 2))
				// let level = this.otherSourceRegion.map(_ => _.level)
				// if (level.filter(_ => _ > 2).length) {
				// 	let id = this.regionArr[0][0].id
				// 	this.regionArr.push(this.otherSourceRegion.filter(_ => id === _.parentId))
				// }
			})
		},
		methods:{
			//客户来源
			changeCustomer(val){
				let index = val.detail.value
				this.indexCustomer = index
				this.params.originStr = this.arrCustomer[index]
			},
			//客户区域
			changeRegion(val){
				let index = val.detail.value
				this.indexRegion = index
				this.params.categoryStr = this.arrRegion[index]
			},


			//二级选项
			bindMultiPickerColumnChange2 () {
				this.regionIndex[e.detail.column] = e.detail.value
				let id = this.regionArr[e.detail.column][e.detail.value].id
				console.log('id', id)
				switch (e.detail.column) {
					case 0:
					this.regionArr[1] = this.otherSourceRegion.filter(_ => id === _.parentId)
				}
				this.$forceUpdate()
			},
			bindMultiPickerColumnChange (e) {
				// console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				this.originIndex[e.detail.column] = e.detail.value
				let id = this.originArr[e.detail.column][e.detail.value].id
				console.log('id', id)
				switch (e.detail.column) {
					case 0:
					this.originArr[1] = this.otherSourceList.filter(_ => id === _.parentId)
				}
				
				this.$forceUpdate()
			},
			save(){
				//二级选项
				// let originLen = 0
				// let regionLen = 0
				// if (this.originArr[1] && this.originArr[1].length) originLen = 1
				// if (this.regionArr[1] && this.regionArr[1].length) regionLen = 1
				// this.params.originStr = this.originArr[originLen][this.originIndex[originLen]].name
				// this.params.categoryStr = this.regionArr[regionLen][this.regionIndex[regionLen]].name
				// console.log(this.params.originStr)
				// console.log(this.params.categoryStr)

				return this.params
			},
			bindDateChange (e) {
				this.params.typeTime = e.target.value
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './components/moduleStyle.scss';
</style>
