<template>
	<view>
		<view class="titleBox">
			<view class="title">服务名称</view>
			<view class="title">服务价格</view>
			<view class="title">操作</view>
		</view>
		<view class="infoBox">
			<label class="textBox" v-for="(item,index) in info" :key="item.id">
				<view class="fText">{{item.name}}</view>
				<view class="text">{{item.salePrice}}</view>
				<view v-if="type === 'del'" class="text" @click="onClickDel(index)"><text class="serachButErr">移除</text></view> 
				<view v-else class="text" @click="onClickAdd(item.id)"><text class="serachBut">添加</text></view>
			</label>
		</view>
	</view>
</template>

<script>
	export default{
		props:['info','type'],
		data(){
			return{
				// 选择ID
				checkId:null,
			}
		},
		methods:{
			// 多选返回
			change(e) {
				this.checkId = e.detail.value
				let needArr = this.info.filter((i)=>{
					if(this.checkId.includes(String(i.id))){
						return i
					}
				})	
				this.$emit('getTools',needArr)
			},

			// 添加返回
			onClickAdd(e){
				let arr = [e]
				let needArr = this.info.filter((i)=>{
					if(arr.includes(i.id)){
						return i
					}
				})	
				this.$emit('getTools',needArr[0])
			},

			// 移除返回
			onClickDel(e){
				let needArr = this.info.filter((i,index)=>index != e)	
				this.$emit('delTools',needArr)
			}
		}
	}
</script>

<style lang="scss">
	@import './toolTypeModulStyle';
</style>
