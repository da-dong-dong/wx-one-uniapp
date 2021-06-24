<template>
	<view>
		<view class="titleBox">
			<view class="title">服装名称</view>
			<view class="title">服装价格</view>
			<view class="title">内外景</view>
		</view>
		<view class="infoBox">
			<checkbox-group @change="change">
				<label class="textBox" v-for="item in info" :key="item.id">
					<view class="check">
						<checkbox :value="item.id" style="transform:scale(0.7)"/>
					</view>
					<view class="fText">{{item.name}}</view>
					<view class="text">{{item.salePrice}}</view>
					<view class="text">{{item.type | type}}</view>
				</label>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
	export default{
		props:['info'],
		filters:{
			type(type){
				const result = new Map([
					['INT', '内景'],
					['OUT', '外景'],
					['NONE', '无']
				])
				return result.get(type)
			}
		},
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
		}
	}
</script>

<style lang="scss">
	@import './toolTypeModulStyle';
</style>
