<template>
	<view class="bigBox">
		<view class="left">
			<view class="title">{{title}}</view>
			<input type="text" :placeholder="title" v-model="text" @input="getText"/>
		</view>
	</view>
</template>

<script>
	export default{
		props:['title','enText'],
		data(){
			return{
				text:null,
			}
		},
		methods:{
			getText(e){
				this.$emit('update:getText',e.detail.value)
			},
		},
		watch:{
			enText(){
				this.text = this.enText
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pagesOrder/openOrder/openInfo/module/components/moduleStyle.scss';
</style>
