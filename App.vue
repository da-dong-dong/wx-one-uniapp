<script>
	import { getAuthorization } from '@/util/api/user.js'
	import { mapGetters, mapActions } from 'vuex'
	export default {
		onLaunch: function() {
			console.log('AppOnLaunch')
		},
		data() {
			return {

			};
		},
		computed: {
			...mapGetters('app',[
				'get_ticket',
				'get_ccId',
				'get_userInfo'
			])
		},
		mounted(){
			console.log('AppMounted')
			this.getStorageTicket()
		},
		methods: {
			...mapActions('app',[
				'act_ticket',
				'act_ccId',
				'act_userInfo'
			]),
			...mapActions('shopArr',[
				'act_shopAllArr',
				'act_orderTypeArr',
				'act_orderGroup',
				'act_origin',
				'act_category',
				'act_serviceCategory',
				'act_teacherCategory',
				'act_piceList',
				'act_schedule',
				'act_consumeType',
				'act_pay',
				'act_receipt',
				'act_spending',
				'act_giftType',
				'act_pickUp',
				'act_permission_ui',
				'act_permission_fn'
			]),
			// 获取本地缓存ticket
			getStorageTicket() {
				let that = this
				// 在本地缓存中获取ticket
				uni.getStorage({
					key: 'ticket',
					success: function(res) {
						that.act_ticket(res.data)
						that.getCCID()
					},
					fail: function(err) {
						uni.redirectTo({
							url:'/pages/login/login'
						})
					}
				})
			},
			getCCID(){
				let that = this
				uni.getStorage({
					key: 'ccId',
					success: function(res) {
						if(Boolean(res.data)){
							that.act_ccId(res.data)
						}
					},
					fail: function(err) {
						uni.redirectTo({
							url:'/pages/enterprise/enterprise'
						})
					}
				})
			},
		
			// 获取员工信息
			getAuthorization(){
				getAuthorization().then(res=>{
					if(res.data.code !== 200){
						uni.removeStorage({
							key: 'ticket',
						});
						uni.removeStorage({
							key: 'ccId',
						});
						this.act_ticket(null)
						this.act_ccId(null)
						uni.redirectTo({
							url:'/pages/login/login'
						})
					}else{
						this.act_userInfo(res.data.data)
					}
				})
			}
		},
		watch:{
			get_ccId(){
				this.getAuthorization()
			},
			get_userInfo(){
				this.act_shopAllArr()
				this.act_orderTypeArr()
				this.act_orderGroup()
				this.act_origin()
				this.act_category()
				this.act_serviceCategory()
				this.act_teacherCategory()
				this.act_piceList()
				this.act_schedule()
				this.act_consumeType()
				this.act_pay()
				this.act_receipt()
				this.act_spending()
				this.act_giftType()
				this.act_pickUp()
				this.act_permission_ui()
				this.act_permission_fn()
				uni.switchTab({
					url:'/pages/index/index'
				})
				// uni.redirectTo({
				// 	url:'/pagesOrder/orderBox/details/details'
				// })
			}
		}
	};
</script>

<style>
	.fn_back{
		background: #cac5c5 !important;
	}
</style>
