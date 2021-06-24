<template>
	<view class="bigBox">
		<view class="box">
			<view class="titleBox">
				<view class="title">修改</view>
				<view  @click="close">
					<i-icon type="close" size="15" color="#80848f"/>
				</view>
			</view>
			
			<!-- 景点 -->
			<view class="mainBox" v-if="faType === 'PLACE'">
				<view class="listBox">
					<view class="titleB">
						<view class="title">备注：</view>
					</view>
					<view class="textBox">
						<textarea type="text" v-model="updatInfo.remark"  placeholder="备注" :hidden="showText"/>
					</view>
				</view>
			</view>
			
			<view class="mainBox" v-if="faType === 'GOODS' ">
				<view class="listBox">
					<view class="titleB">
						<view class="title">P数：</view> 
					</view>
					<view class="textBox">
						<input type="number" class="text" placeholder="P数" v-model="updatInfo.countP" />
					</view>
				</view>
				
				<view class="listBox">
					<view class="titleB">
						<view class="title">数量：</view>
					</view>
					<view class="textBox">
						<input type="number" class="text" placeholder="数量" v-model="updatInfo.countNum" />
					</view>
				</view>
				
				<view class="listBox">
					<view class="titleB">
						<view class="title">加急时间：</view>
					</view>
					
					<view class="flex_all">
						<picker mode="date" :value="updatInfo.expeditedTime" @change="bindDateChange($event, updatInfo)">
							<view class="flex">
								<view class="uni-input">{{updatInfo.expeditedTime ? updatInfo.expeditedTime : '请选择' | times}} </view>
								<i-icon class="icon" type="enter" size="16" color="#80848f"/>
							</view>
						</picker>
					</view>
				</view>
				
				<view class="listBox">
					<view class="titleB">
						<view class="title">取件方式：</view>
					</view>
					<modifyPicker class="picker" :changeId="updatInfo.pickupModeCategoryId" :categoryName="'get_pickUp'" :getId.sync="updatInfo.pickupModeCategoryId"></modifyPicker>
				</view>
				
				<view class="listBox">
					<view class="titleB">
						<view class="title">备注：</view>
					</view>
					<view class="textBox">
						<textarea type="text" v-model="updatInfo.remark"  placeholder="备注" :hidden="showText"/>
					</view>
				</view>
				
			</view>
			
			<view class="mainBox" v-if="faType === 'DRESSINFO' || faType === 'SERVICES'">
				<view class="listBox">
					<view class="titleB">
						<view class="title">数量：</view>
					</view>
					<view class="textBox">
						<input type="text" class="text" placeholder="数量" v-model="updatInfo.count" />
					</view>
				</view>
				
				<view class="listBox">
					<view class="titleB">
						<view class="title">备注：</view>
					</view>
					<view class="textBox">
						<textarea type="text" v-model="updatInfo.remark"  placeholder="备注" :hidden="showText"/>
					</view>
				</view>
			</view>
			
			<view class="okBox">
				<view class="ok" @click="ok">确定修改</view>
			</view>
		</view>
		
		<uni-calendar
			:insert="false"
			:lunar="true" 
			:clearDate='true'
			@confirm="enCalendar"
			@close="closeCalendar"
			ref="calendar"
			class="calendar"
		/>
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni/uni-calendar/uni-calendar.vue'
	import modifyPicker from '../../components/modifyPicker.vue'
	import { mapGetters, mapActions} from 'vuex'
	export default{
		components:{
			modifyPicker,
			uniCalendar
		},
		props:['info','faType','urgentTime'],
		data(){
			return{
				showText:false,
				updatInfo:{},
			}
		},
		mounted(){
			this.getParmas()
		},
		methods:{
			// 获得parmas
			getParmas(){
				let data = this.info
				if(this.faType === 'GOODS'){
					let arr = {
						countNum:data.countNum,
						countP:data.countP,
						expeditedTime:data.expeditedTime,
						id:data.id,
						pickupModeCategoryId:data.pickupModeCategoryId,
						remark:data.remark
					}
					this.updatInfo = arr
				}else if(this.faType === 'DRESSINFO'){
					let arr = {
						count: data.count,
						id: data.id,
						remark: data.remark,
					}
					this.updatInfo = arr
				}else if(this.faType === 'SERVICES'){
					let arr = {
						count: data.count,
						id: data.id,
						remark: data.remark,
					}
					this.updatInfo = arr
				}else if(this.faType === 'PLACE'){
					let arr = {
						id:data.id,
						remark:data.remark
					}
					this.updatInfo = arr
				}
				
			},
			
			// 打开日历
			openCalendar(){
				this.showText = true
				this.$refs.calendar.open()
			},
			enCalendar(e){
				this.updatInfo.expeditedTime = Date.parse(e.fulldate)
			},
			closeCalendar(){
				this.showText = false
			},

			//更新时间
			bindDateChange (e, item) {
				item.expeditedTime = new Date(e.target.value).getTime()
			},
			// 关闭
			close(){
				this.$emit('close')
			},
			// 修改
			ok(){
				this.$emit('ok',this.updatInfo)
			}
		},
		watch:{
			info(){
				this.getParmas()
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../components/updataModal.scss';
	input{
		margin-top: 15rpx !important;
	}
	.okBox{
		display: flex;
		flex-direction: row-reverse;
		padding: 30rpx;
		border-top: 1rpx solid #DDD;
		.ok{
			width: 150rpx;
			height: 60rpx;
			font-size: 28rpx;
			text-align: center;
			line-height: 60rpx;
			border-radius: 10rpx;
			border: 1rpx solid #DDDDDD;
		}
	}
	.picker{
		width: 60%;
	}
	.flex_all{
		width: 60%;
	}
	.flex{
		display: flex;
    	justify-content: space-between;
	}
</style>
