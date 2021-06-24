/**************************** 档期分组 *****************************/
<template>
	<view>
		<view class="box">
			<view class="title">档期分组</view>
			<picker @change="change" :value="index" :range="arr" class="flex_arr">
				<view class="picker">
					<view class="text">{{show}}</view>
					<i-icon class="icon" type="enter" size="16" color="#80848f"/>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import {getChooseClothesTemplate, getPhotoTemplate, getChooseTemplate, getWatchTemplate, getPickupTemplate } from '@/util/api/shop.js'
	export default{
		props:['type','date','shopId','getType','typographyTypeId','gapFlag'],
		computed:{
			...mapGetters('shopArr',[
				// 预约档期
				'get_schedule',
			])
		},
		data(){
			return{
				// 过滤档期分组
				scheduleMap: new Map(),
				// 预约模板
				templateMap:new Map([
					['ALL','任意订单'],
					['WEDDING_DRESS','婚纱订单'],
					['BABY','儿童订单'],
					['PREGNANT','孕妈订单'],
					['PORTRAY','写真订单'],
					['SERVICE','服务订单'],
					['WEDDING','婚庆订单'],
				]),
				
				// picker档期分组
				scheduleArr:[],
				// nowScheduleName:null,
				arr:['请选择预约时间'],
				index:0,
				show: '请选择预约时间'
			}
		},
		mounted(){
			this.scheduleMap = new Map(this.get_schedule.map(item => [item.id, item.name]))
			
		},
		methods:{
			// 获得预约模板
			getTemplate(){
				let params = {
					controlType:this.type,
					reservationDate:this.date,
					reservationShopId:this.shopId,
				}
				switch(this.getType){
					case 'xy':
						this.getChooseClothesTemplate(params)
						break;
					case 'pz':
						this.getPhotoTemplate(params)
						break;
					case 'xp':
						this.getChooseTemplate(params)
						break;
					case 'kb':
						this.getWatchTemplate(params)
						break;
					case 'qj':
						this.getPickupTemplate(params)
						break;
				}
			},
			getSchedule(e){
				this.$emit('getId',e.id)
			},
			getPicker(data){
				const online = new Map([
					[true,'线上'],
					[false,'线下'],
				])
				let arr = []
				data.forEach((i)=>{
					let lis = {
						id:i.id,
						name:`${i.groupTypeCategoryId==-1?'':this.scheduleMap.get(i.groupTypeCategoryId)}[${online.get(i.isOnline)}]${this.templateMap.get(i.controlType)}`
					}
					arr.push(lis)
				})
				this.scheduleArr = arr
				
				this.arr = this.scheduleArr.map((i)=>{ return i.name})
				if(this.gapFlag == true){
					this.$emit('update:getId',this.scheduleArr[this.index].id)
				}
			},
			// 选择档期
			change(val){
				this.index = val.detail.value
				this.show = this.arr[this.index]
				this.$emit('update:getId',this.scheduleArr[this.index].id)
			},
			// 选衣模板
			getChooseClothesTemplate(params){
				getChooseClothesTemplate(params).then(res=>{
					this.getPicker(res.data.data)
				})
			},
			// 拍照模板
			getPhotoTemplate(params){
				getPhotoTemplate(params).then(res=>{
					this.getPicker(res.data.data)
				})
			},
			// 选片模板
			getChooseTemplate(params){
				getChooseTemplate(params).then(res=>{
					this.getPicker(res.data.data)
				})
			},
			// 看板模板
			getWatchTemplate(params){
				getWatchTemplate(params).then(res=>{
					this.getPicker(res.data.data)
				})
			},
			// 取件模板
			getPickupTemplate(params){
				getPickupTemplate(params).then(res=>{
					this.getPicker(res.data.data)
				})
			},
		},
		watch:{
			date(){
				if(this.date){
					this.scheduleMap = new Map(this.get_schedule.map(item => [item.id, item.name]))
					this.getTemplate()
				}else{
					this.arr = ['请选择预约时间']
					this.show = '请选择预约时间'
					this.index = 0					
				}
			},
			typographyTypeId(){
				if(this.typographyTypeId){
					setTimeout(() => {
						this.index = this.scheduleArr.findIndex((i) => { return i.id === this.typographyTypeId})
						this.show = this.arr[this.index]
					}, 1000);
					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './component.scss';
</style>
