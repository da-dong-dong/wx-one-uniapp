<template>
	<view>
		<view class="bigBox">
			<view class="textBox">
				<view class="text">{{item.itemNo}}</view>
				<view class="text">入册/入底：{{item.bookCount | count}}/{{item.bottomCount | count}}</view>
				<view class="text">
					<view>{{text}}师：</view>
					<span>{{list.actorNameVos | actor}}</span>
				</view>
				<view class="text">
					<view>{{text}}期限：</view>
					<span>{{list.expireTime | time}}</span>
				</view>
			</view> 
			<view class="butBox">
				<view class="but" :class="flagShowUp?'fn_back':''" v-if="list.process" @click="buttonUp('UPDATE')">修改</view>
				<view class="but" :class="flagShowAdd?'fn_back':''" v-else @click="buttonADD('ADD')">安排{{text}}</view>
			</view>
			
		</view>
		<i-message id="message" />
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	export default{
		props:['item','type'],
		filters:{
			count(num){
				if(num){
					return num
				}else{
					return 0
				}
			},
			times(time){
				if(time){
					let dt = new Date(Number(time))
					let y = dt.getFullYear()
					let m = (dt.getMonth() + 1).toString().padStart(2, 0)
					let d = dt.getDate().toString().padStart(2, 0)
					return `${y}-${m}-${d}`
				}else{
					return '待安排'
				}
			},
			actor(arr){
				if(arr){
					let nameArr = []
					arr.forEach((i)=>{
						nameArr.push(i.actorName)
					})
					return nameArr.join('/')
				}else{
					return '待安排'
				}
			},
		},
		data(){
			return{
				text:null,
				list:[],
				showName:null,
				process:null,
				flagShowAdd:null,//权限样式
				flagShowUp:null,
			}
		},
		mounted(){
			switch(this.type){
				case 'cx':
					this.text = '初修'
					this.process = 'REPAIR'
					this.flagShowAdd = this.fnPermissionShopId('STORE_ORDER_REPAIR_ADD')
					this.flagShowUp = this.fnPermissionShopId('STORE_ORDER_REPAIR_UPDATE')
					break
				case 'jx':
					this.text = '精修'
					this.process = 'REFINE'
					this.flagShowAdd = this.fnPermissionShopId('STORE_REFINE_ADD')
					this.flagShowUp = this.fnPermissionShopId('STORE_REFINE_UPDATE')
					break
				case 'sj':
					this.text = '设计'
					this.process = 'DESIGN'
					this.flagShowAdd = this.fnPermissionShopId('STORE_DESIGN_ADD')
					this.flagShowUp = this.fnPermissionShopId('STORE_DESIGN_UPDATE')
					break
				case 'fp':
					this.text = '发片'
					this.process = 'SENDER'
					this.flagShowAdd = this.fnPermissionShopId('STORE_SENDER_ONE')
					break
			}
			this.getList()
		},
		methods:{
			getList(){
				this.item.orderItemProcessDigitalProcessVos.forEach((i)=>{
					if(i.process === this.process){ this.list = i }
				})
				this.list.itemId = this.item.itemId
			},
			//增加
			buttonADD(type){
				if(this.flagShowAdd){
					$Message({
						content: '权限不足',
						type: 'error'
					});
					return false
				}
				this.list.dataStatus = type
				this.$emit('onButton',this.list)
			},
			//更新
			buttonUp(type){
				if(this.flagShowUp){
					$Message({
						content: '权限不足',
						type: 'error'
					});
					return false
				}
				this.list.dataStatus = type
				this.$emit('onButton',this.list)
			},
		},
		watch:{
			item(){
				this.getList()
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import './digitalButtonStyle.scss';
</style>
