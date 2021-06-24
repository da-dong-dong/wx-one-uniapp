// 会员接口
import baseUrl from './index.js'
import { get, post, put, remove, postObj, } from './methos.js'

// 获取会员卡类型列表
export const getMemberCardTypeList = (params) => {
	return get(baseUrl.getMemberCardTypeList, params)
}

// 新增会员资料
export const registered = (params) => {
	return postObj(baseUrl.registered, params)
}

// 会员资料分页查询
export const getMemberCustomerPage = (params) => {
	return get(baseUrl.getMemberCustomerPage, params)
}

// 获取会员卡列表
export const getMemberCardList = (params) => {
	return get(baseUrl.getMemberCardList, params)
}

// 会员卡充值
export const cardRecharge = (params) => {
	return put(baseUrl.cardRecharge, params)
}

// 会员卡提现
export const withdraw = (params) => {
	return postObj(baseUrl.withdraw, params)
}

// 查询会员资料
export const getMemberData = (params) => {
	return get(baseUrl.getMemberData, params)
}

// 赠送积分
export const giftIntegral = (params) => {
	return postObj(baseUrl.giftIntegral, params)
}

// 会员积分兑换
export const pointsExchange = (params) => {
	return postObj(baseUrl.pointsExchange, params)
}

// 会员积分记录分页查询
export const pointsRecord = (params) => {
	return get(baseUrl.pointsRecord, params)
}

// 会员充值记录分页查询
export const pageRechargeRecord = (params) => {
	return get(baseUrl.pageRechargeRecord, params)
}
