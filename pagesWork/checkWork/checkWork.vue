/******************* 选衣 摄化 选片 看板 取件 数码 查看工作 ********************/
<template>
	<view>
		<section class="PullScroll-Page">
			<s-pull-scroll ref="pullScroll" :back-top="true" :pullDown="pullDown" :pullUp="loadData">
				
				<searchModul ref="searchModul" :needShop="false" @search="search"></searchModul>
				
				<changeList @changeType="getChangeType"></changeList>
				
				<view class="listBigBox" v-for="item in list" :key="item.orderId">	
					<detailMoudel :info="item" :type="type"></detailMoudel>
					<detailXyMain v-if="type === 'xygz'" :item="item"></detailXyMain>
					<detailPzMain v-if="type === 'shgz'" :item="item"></detailPzMain>
					<detailXpMain v-if="type === 'xpgz'" :item="item"></detailXpMain>
					<detailKbMain v-if="type === 'kbgz'" :item="item"></detailKbMain>
					<detailQjMain v-if="type === 'qjgz'" :item="item"></detailQjMain>
					<detailSmMain v-if="type === 'smgz'" :item="item"></detailSmMain>	
				</view>
				
				<view class="noMove" v-if="showNoMore || list.length <= 0">没有更多数据</view>
			</s-pull-scroll>
		</section>
		<i-message id="message" />
	</view>
</template>

<script>
	import detailMoudel from '@/components/detailMoudel.vue'
	import searchModul from '@/components/searchModul.vue'
	import sPullScroll from '@/components/s-pull-scroll'
	import changeList from './components/changeList.vue'
	import detailXyMain from '@/components/detailWorkMain/detailXyMain.vue'
	import detailKbMain from '@/components/detailWorkMain/detailKbMain.vue'
	import detailPzMain from '@/components/detailWorkMain/detailPzMain.vue'
	import detailQjMain from '@/components/detailWorkMain/detailQjMain.vue'
	import detailXpMain from '@/components/detailWorkMain/detailXpMain.vue'
	import detailSmMain from '@/components/detailWorkMain/detailSmMain.vue'
	import {
		getWorkChooseClothesMy, //查询-我的选衣工作
		getWorkChooseClothesDepartment, //查询-部门选衣工作
		getWorkChooseClothesAll, //查询-所有选衣工作
		getWorkPhotoMy, //查询-我的摄化工作
		getWorkPhotoDepartment, //查询-我的部门摄化工作
		getWorkPhotoAll, //查询-所有摄化工作
		getWorkChooseMy, //查询-我的选片工作
		getWorkChooseDepartment, //查询-我的部门选片工作
		getWorkChooseAll, //查询-所有选片工作
		getWorkWatchMy, //查询-我的看板工作
		getWorkWatchDepartment, //查询-我的部门看板工作
		getWorkWatchAll, //查询-所有看板工作
		getWorkPickupMy, //查询-我的取件工作
		getWorkPickupDepartment, //查询-我的部门取件工作
		getWorkPickupAll, //查询-所有取件工作
		getWorkDigitalMy, // 查询-我的数码工作
		getWorkDigitalDepartment, // 查询-我的部门数码工作
		getWorkDigitalAll, // 查询-所有数码工作
	} from '@/util/api/shop.js'
	export default {
		components:{
			sPullScroll,
			searchModul,
			changeList,
			detailMoudel,
			detailXyMain,
			detailPzMain,
			detailXpMain,
			detailKbMain,
			detailQjMain,
			detailSmMain
		},
		data() {
			return {
				// 页面类型
				type:null,
				// 切换类型
				changeType: 'my',
				
				// 总数量
				total:11,
				// 列表
				list: [],
				// 没有更多
				showNoMore:false,
				
				params:{
					isSearchCount:true,
					limit:10,
					page:1,
				}
			};
		},
		onLoad(option){
			this.type = option.type
			// this.type = 'qjgz'
			let title
			switch(this.type){
				case 'xygz':
					title = '选衣'
					break;
				case 'shgz':
					title = '摄化'
					break;
				case 'kbgz':
					title = '看板'
					break;
				case 'xpgz':
					title = '选片'
					break;
				case 'qjgz':
					title = '取件'
					break;
				case 'smgz':
					title = '数码'
					break;
			}
			uni.setNavigationBarTitle({
				title:title + '工作'
			})
			this.refresh();
		},
		onShow(){
			this.list = []
			this.getAllOrderItem()
		},
		methods:{
			// 切换数据
			getChangeType(e){
				this.changeType = e
				this.list = [],
				this.params.page = 1
				this.getAllOrderItem()
			},
			
			// 搜索
			search(e){
				this.params = e
				this.list = [];
				this.getAllOrderItem()
			},
			// 获取数据
			getAllOrderItem(){
				switch(this.type){
					case 'xygz':
						this.getChooseClothesWork()
						break
					case 'shgz':
						this.getPhotoWork()
						break
					case 'xpgz':
						this.getChooseWork()
						break
					case 'kbgz':
						this.getWatchWork()
						break;
					case 'qjgz':
						this.getPickupWork()
						break;
					case 'smgz':
						this.getDigitalWork()
						break;
				}
			},
			// 获取选衣工作
			getChooseClothesWork(){
				switch(this.changeType){
					case 'my':
						this.getWorkChooseClothesMy()
						break
					case 'department':
						this.getWorkChooseClothesDepartment()
						break
					case 'all':
						this.getWorkChooseClothesAll()
						break				
				}
			},
			// 获取摄化工作
			getPhotoWork(){
				switch(this.changeType){
					case 'my':
						this.getWorkPhotoMy()
						break
					case 'department':
						this.getWorkPhotoDepartment()
						break
					case 'all':
						this.getWorkPhotoAll()
						break				
				}
			},
			// 获取选片工作
			getChooseWork(){
				switch(this.changeType){
					case 'my':
						this.getWorkChooseMy()
						break
					case 'department':
						this.getWorkChooseDepartment()
						break
					case 'all':
						this.getWorkChooseAll()
						break				
				}
			},
			// 获取看板工作
			getWatchWork(){
				switch(this.changeType){
					case 'my':
						this.getWorkWatchMy()
						break
					case 'department':
						this.getWorkWatchDepartment()
						break
					case 'all':
						this.getWorkWatchAll()
						break				
				}
			},
			// 获取取件工作
			getPickupWork(){
				switch(this.changeType){
					case 'my':
						this.getWorkPickupMy()
						break
					case 'department':
						this.getWorkPickupDepartment()
						break
					case 'all':
						this.getWorkPickupAll()
						break				
				}
			},
			// 获取数码工作
			getDigitalWork(){
				switch(this.changeType){
					case 'my':
						this.getWorkDigitalMy()
						break
					case 'department':
						this.getWorkDigitalDepartment()
						break
					case 'all':
						this.getWorkDigitalAll()
						break				
				}
			},

			// 获取 我的选衣工作
			getWorkChooseClothesMy(){
				getWorkChooseClothesMy(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			// 获取 部门选衣工作
			getWorkChooseClothesDepartment(){
				getWorkChooseClothesDepartment(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			// 获取 所有选衣工作
			getWorkChooseClothesAll(){
				getWorkChooseClothesAll(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
		
			// 获取 我的摄化工作
			getWorkPhotoMy(){
				getWorkPhotoMy(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			// 获取 部门摄化工作
			getWorkPhotoDepartment(){
				getWorkPhotoDepartment(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			// 获取 所有摄化工作
			getWorkPhotoAll(){
				getWorkPhotoAll(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			
			// 获取 我的选片工作
			getWorkChooseMy(){
				getWorkChooseMy(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			// 获取 部门选片工作
			getWorkChooseDepartment(){
				getWorkChooseDepartment(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			// 获取 所有选片工作
			getWorkChooseAll(){
				getWorkChooseAll(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			
			// 获取 我的看板工作
			getWorkWatchMy(){
				getWorkWatchMy(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			// 获取 部门看板工作
			getWorkWatchDepartment(){
				getWorkWatchDepartment(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			// 获取 所有看板工作
			getWorkWatchAll(){
				getWorkWatchAll(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			
			// 获取 我的取件工作
			getWorkPickupMy(){
				getWorkPickupMy(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			// 获取 部门取件工作
			getWorkPickupDepartment(){
				getWorkPickupDepartment(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			// 获取 所有取件工作
			getWorkPickupAll(){
				getWorkPickupAll(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			
			// 获取 我的数码工作
			getWorkDigitalMy(){
				getWorkDigitalMy(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			// 获取 部门数码工作
			getWorkDigitalDepartment(){
				getWorkDigitalDepartment(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			// 获取 所有数码工作
			getWorkDigitalAll(){
				getWorkDigitalAll(this.params).then(res=>{
					this.total = res.data.data.total
					const curList = res.data.data.records
					curList.forEach((i)=>{
						this.list.push(i)
					})
				})
			},
			
			// 组件
			refresh () {
			  this.$nextTick(() => {
			    this.$refs.pullScroll.refresh();
			  });
			},
			pullDown (pullScroll) {
			  setTimeout(() => {
			    this.loadData(pullScroll);
			  }, 200);
			},
			loadData (pullScroll) {
				if (pullScroll.page == 1) {
					this.list = [];
				}
				if(this.list.length < this.total){
					this.getAllOrderItem()
					this.showNoMore = false
				}else{
					this.showNoMore = true
				}
				if(!this.showNoMore){
					this.params.page = pullScroll.page
				}
				pullScroll.success();
			}
				
		}
	}
</script>

<style>
	page{
		background-color: #FDFDFD
	}
</style>
<style lang="scss">
	.listBigBox{
		margin: 30rpx;
		box-shadow: 0rpx 7rpx 29rpx 6rpx rgba(0, 0, 0, 0.03);
		background-color: #FFFFFF;
	}
	.noMove{
		font-size: 28rpx;
		color: #a2a2a2;
		text-align: center;
		margin: 30rpx 0;
	}
</style>
