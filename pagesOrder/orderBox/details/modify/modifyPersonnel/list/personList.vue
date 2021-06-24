/*****************************  修改客户信息 客户  *******************************/
<template>
	<view>
		<view class="box">
			<!-- 昵称 -->
			<view class="listBox">
				<view class="title">昵称：</view>
				<picker @change="change" :value="index" :range="arr" class="flex_all">
					<view class="textBox">
						<view class="text">{{arr[index]}}</view>
						<i-icon class="icon" type="enter" size="16" color="#80848f"/>
					</view>
				</picker>
			</view>
			
			<!-- 名字 -->
			<view class="listBox">
				<view class="title">名字：</view>
				<view class="textBox">
					<input class="input" type="text" v-model="params.name" placeholder="客户姓名"/>
				</view>
			</view>
			
			<!-- 电话 -->
			<view class="listBox">
				<view class="title">手机号码：</view>
				<view class="textBox">
					<input class="input" type="number" v-model="params.mobile" placeholder="手机号码"/>
				</view>
			</view>
			
			<!-- 微信 -->
			<view class="listBox">
				<view class="title">微信号：</view>
				<view class="textBox">
					<input class="input" type="text" v-model="params.wechat" placeholder="微信号"/>
				</view>
			</view>
			
			<!-- qq -->
			<view class="listBox">
				<view class="title">QQ号：</view>
				<view class="textBox">
					<input class="input" type="number" v-model="params.qq" placeholder="QQ"/>
				</view>
			</view>
			
			<!-- 生日 -->
			<birthday 
				:time="params.birthdayTime" 
				:lunar="params.birthdayLunar" 
				:getBTime.sync="params.birthdayTime"
				:getBLunar.sync="params.birthdayLunar"
			></birthday>
			
		</view>
	</view>
</template>

<script>
	import birthday from '../../components/birthday.vue'
	export default{
		props:['info','callNameList'],
		components:{
			birthday
		},
		data(){
			return{
				arr:[],
				index:0,
				
				params:[],
			}
		},
		mounted(){
			this.params = this.info
			if(Boolean(this.params.sex)){
				this.params.sex = true
			}else{
				this.params.sex = false
			}
			this.newPersonPickerList()
		},
		methods:{
			// 创建客户picker数组
			newPersonPickerList(){
				this.arr = this.callNameList.map((i)=>{ return i.name})
				this.index = this.callNameList.findIndex((i)=>{ return i.name === this.params.callName})
			},
			change(e){
				this.index = e.detail.value
				this.params.callName = this.arr[this.index]
				this.params.sex = this.callNameList[this.index].sex
			},
			
			// 保存
			save(){
				return this.params
			}
		},
		watch:{
			callNameList(){
				this.newPersonPickerList()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.flex_all{
		width: 100%;
	}
	.box{
		.listBox{
			display: flex;
			font-size: 28rpx;
			padding: 0 20rpx;
			margin: 30rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid #f9f9f9;
			.title{
				width: 270rpx;
			}
			.textBox{
				display: flex;
				width: 100%;   
				justify-content: space-between;
				.text{
					max-width: 360rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				image{
					width: 15rpx;
					height: 15rpx;
					margin: 40rpx 0 0 5rpx;
				}
				.input{
					border-radius: 10rpx;
					border: 1rpx solid #f9f9f9;
					padding: 5rpx;
					margin-top: 10rpx;
				}
			}
		}
	}
</style>
