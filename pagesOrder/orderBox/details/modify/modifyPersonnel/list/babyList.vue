/*****************************  修改客户信息 宝宝  *******************************/
<template>
	<view>
		<view class="box">

			<!-- 昵称 -->
			<view class="listBox">
				<view class="title">昵称：</view>
				<picker @change="change" :value="index" :range="arr">
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
					<input class="input" type="text" v-model="params.name" placeholder="宝宝姓名"/>
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
	export default {
		props:['info','callNameList'],
		components:{
			birthday
		},
		data() {
			return {	
				arr:[],
				index:0,
				
				params:[],
			};
		},
		mounted(){
			this.params = this.info
			if(Boolean(this.params.sex)){
				this.params.sex = true
			}else{
				this.params.sex = false
			}
			this.newBabyPickerList()
		},
		methods:{		
			// 创建宝宝picker数组
			newBabyPickerList(){
				this.arr = this.callNameList.map((i)=>{ return i.name})
				this.index = this.callNameList.findIndex((i)=>{ return i.name === this.params.callName})
			},
			change(e){
				this.index = e.detail.value
				this.params.callName = this.arr[this.index]
				this.params.sex = this.callNameList[this.index].sex
			},
			
			save(){
				return this.params
			}
		},
		watch:{
			callNameList(){
				this.newBabyPickerList()
			},
		}
	}
</script>

<style lang="scss" scoped>
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
					padding: 15rpx;
				}
			}
		}
	}
</style>
