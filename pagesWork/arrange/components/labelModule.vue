/**************************** 预约标签 *****************************/
<template>
	<view>
		<view class="box">
			<view class="title">预约标签</view>
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
	import { mapGetters, mapActions } from 'vuex'
	export default{
		props:['labelId'],
		computed:{
			...mapGetters('shopArr',[
				'get_label'
			])
		},
		data(){
			return{
				show:'请选择',
				index:0,
				arr:[],
			}
		},
		created(){
			this.act_label()
		},
		mounted(){
			this.getLabelArr()
		},
		methods:{
			...mapActions('shopArr',[
				'act_label'
			]),
			// 档期标签数组
			getLabelArr(){
				let arr = []
				this.get_label.forEach((i)=>{
					arr.push(i.name)
				})
				arr.shift()
				this.arr = arr
			},
			change(e){
				this.get_label.some((i)=>{
					if(i.name === this.arr[e.detail.value]){
						this.$emit('update:getId',i.id)
					}
				})
			},
		},
		watch:{
			get_label(){
				this.getLabelArr()
			},
			labelId(){
				let nowName
				this.get_label.some((i)=>{ if(i.id === this.labelId){ nowName = i.name} })
				this.index = this.arr.findIndex((i)=>{ return i === nowName})
				this.show = this.arr[this.index]
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './component.scss';
</style>
