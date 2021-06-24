<template>
	<view class="bigBox">
		<view class="left">
			<view class="title">来源</view>
			<picker
				@change="enList"
				:value="index" 
				:range="originArr" 
				mode = multiSelector 
				@columnchange="changeList"
			>
				<view class="picker">
					<view class="text">{{source}}</view>
					<i-icon class="icon" type="enter" size="16" color="#80848f"/>
				</view>
			</picker>
		</view>
	</view>
</template>

<script>
	const { $Message } = require('@/wxcomponents/base/index');
	import { mapGetters } from 'vuex'
	export default{
		props:['soureId'],
		computed:{
			...mapGetters('shopArr',[
				'get_origin'
			])
		},
		data(){
			return{
				// 显示
				source:'请选择',
				
				originArr:[[],[]],
				index:[0,0],
				secondArr:null,	
				// 所有列表
				list:null,
				params:{
					cid:null,
					sid:null,
					soureId:[],
				}
			}
		},
		mounted(){
			this.getArr()
		},
		methods:{
			getArr(){
				if(this.get_origin.length > 0){
					let arr = this.get_origin.filter((i)=>{
						return i.sourceList.length > 0
					})
					this.list = arr
					// picker的一维项
					this.originArr[0] = arr.map((i)=>{return i.name})
					this.getSecond()
				}else{
					$Message({
						content: '请重试',
						type: 'error'
					});
				}
			},
			// 通过一维获取二维
			getSecond(){
				// 获取当前一维项的二维数组
				this.secondArr = this.list[this.index[0]].sourceList
				this.originArr[1] = this.secondArr.map((i)=>{return i.name})
				this.$forceUpdate()
			},
			// 滚动改变
			changeList(e){
				let ind = e.detail.column
				this.index[ind] = e.detail.value
				this.getSecond()
			},
			// 确定选择
			enList(e){
				// 获取选择的一维数据
				let first = this.list[this.index[0]]
				// 获取选择的二维数据
				let second = first.sourceList[this.index[1]]
				this.params.cid = second.cid
				this.params.sid = second.sid
				this.params.soureId[0] = second.cid
				this.params.soureId[1] = second.sid
				this.$emit('getOrigin',this.params)
				this.show()
			},
			show(){
				// 获取选择的一维数据
				let first = this.list[this.index[0]]
				// 获取选择的二维数据
				let second = first.sourceList[this.index[1]]
				this.source = `${first.name}/${second.name}`
			},
		},
		watch:{
			soureId(){
				this.params.cid = this.soureId[0]
				this.params.sid = this.soureId[1]
				this.params.soureId = this.soureId
				this.index[0] = this.list.findIndex((i)=>{ return i.cid === this.params.cid})
				this.getSecond()
				this.index[1] = this.secondArr.findIndex((i)=>{ return i.sid === this.params.sid})
				this.show()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pagesOrder/openOrder/openInfo/module/components/moduleStyle.scss';
</style>
