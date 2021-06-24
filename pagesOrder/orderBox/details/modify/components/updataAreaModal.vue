/************************************ 编辑客户区域 ***********************************/
<template>
	<view class="bigBox">
		<view class="box">
			
		
			<view class="titleBox">
				<view class="title">编辑客户区域</view>
				<view class="close" @click="cancel">
					<i-icon type="close" size="18" color="#80848f"/>
				</view>
			</view>
				
				
			<view class="mainBox">
				<view class="listBox">
					<view class="titleB">
						<view class="title">客户区域：</view>
					</view>
					<picker @change="changeRegion" :value="indexRegion" :range="arrRegion" class="flex_all" >
						<view class="textBox">
							<view class="text">{{areaShow}}</view>
							<i-icon class="icon" type="enter" size="16" color="#80848f"/>
						</view>
					</picker>
				</view>
			</view>
				
			
				
			<view class="but">
				<view class="cancel" @click="cancel">取消</view>
				<view class="ok" @click="ok">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import area from '@/static/area.js'
	import { updataArea } from '@/util/api/shop.js'
	import { getCategoryList } from '@/util/api/common.js'
	export default{
		props:["openInfo"],
		data(){
			return{
				areaShow:'',

				arrRegion:[],	//客户区域数据
				indexRegion:0, //客户区域索引

				params:{},
			}
		},
		mounted(){
			let info = {
				categoryStr: this.openInfo.customerGroupVo.categoryStr,
				orderId:this.openInfo.orderId,
			}
			this.params = info

			getCategoryList({ type: 'CUSTOMER_REGION' }).then(res => {
				console.log('客户区域', res)
				this.otherSourceRegion = res.data.data
				//优化客户区域
				let arrRes = this.otherSourceRegion.filter(_ => _.level === 2)
				this.arrRegion = arrRes.map((i)=>{ return i.name })

				//可为空
				this.arrRegion.unshift('')

				//显示
				this.areaShow = this.params.categoryStr
				
			})
		},
		methods:{
			//客户区域
			changeRegion(val){
				let index = val.detail.value
				this.indexRegion = index
				this.params.categoryStr = this.arrRegion[index]
				this.areaShow = this.arrRegion[index]
			},

			// 保存
			ok(){
				updataArea(this.params).then(res=>{
					if(res.data.code === 200){
						this.$emit('ok')
					}
				})
			},
			// 取消
			cancel(){
				this.$emit('cancel')
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import './updataModal.scss';
	.text{
		max-width: 300rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.flex_all{
		width: 60%;
	}
</style>
