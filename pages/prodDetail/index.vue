<template>
	<view class="prod-detail">
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="bg-shadeTop text-white">
				<block slot="backText">返回</block>
			</cu-custom>
		</view>
		<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item,index) in prod.imgs" :key="index">
				<image :src="item" mode="scaleToFill"></image>
			</swiper-item>
		</swiper>
		<view class="bg-red text-lg light price-box padding-lr-sm flex align-center justify-between">
			<text>价格：<text class="text-price text-red">{{prodSku.price}}</text></text>
			<text>库存：{{prodSku.sku}}</text>
		</view>
		<view class="prod-name text-lg margin-top-sm">
			<text>【{{prod.prodName}}】</text>
			<text v-if="prodSku.attr1Id">/ {{prodSku.attr1Name}} </text>
			<text v-if="prodSku.attr2Id">/ {{prodSku.attr2Name}} </text>
			<text v-if="prodSku.attr3Id">/ {{prodSku.attr3Name}} </text>
		</view>
		<view class="margin-left-sm margin-top-sm">
			{{prod.description}}
		</view>
		<view class="cu-bar bg-white tabbar border shop foot">
			<view class="action">
				<view class="cuIcon-cart">
					<view class="cu-tag badge">99</view>
				</view>
				购物车
			</view>
			<view @tap="showShoppingCart" class="bg-orange submit">加入购物车</view>
			<view @tap="showShoppingCart" class="bg-red submit">立即订购</view>
		</view>
		<view class="cu-modal bottom-modal" @tap="closeDialog" :class="showDialog?'show':''">
			<scroll-view class="cu-dialog" @tap.stop scroll-y scroll-with-animation style="max-height: 70%;padding-bottom: 120rpx;">
				<view class="flex align-center justify-start margin-lr-lg padding-tb-sm">
					<view class="cu-avatar xl radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
					<view class="margin-left-lg">
						<view class="flex justify-start">
							<text>已选：</text>
							<text v-if="prodSku.attr1Id">/ {{prodSku.attr1Name}} </text>
							<text v-if="prodSku.attr2Id">/ {{prodSku.attr2Name}} </text>
							<text v-if="prodSku.attr3Id">/ {{prodSku.attr3Name}} </text>
						</view>
						<view class="flex justify-start">
							<text>价格：<text class="text-price text-red">{{prodSku.price}}</text></text>
						</view>
					</view>

				</view>
				<view class="tag">
					<view v-for="(key,index) in Object.keys(prodAttrs)" :key="index" class="flex justify-start align-center padding-left-lg margin-tb-sm">
						<text>{{key}}:</text>
						<button class="cu-btn round margin-left-sm" v-for="item in prodAttrs[key]" :key="item.id" :class="attr['attr' + (index+1) + 'Id'] == item.id ? 'bg-yellow' : 'bg-grey'"
						 :disabled="item.sku==0" @tap="selectedAttr(index+1,item.id)">{{item.attrVal}}</button>
					</view>
				</view>
				<view class="flex justify-start padding-lr-lg margin-tb-sm">
					<text>库存：</text>
					<text>{{prodSku.sku}}</text>
				</view>
				<view class="padding-lr-lg flex justify-start align-center margin-tb-sm">
					<text>数量：</text>
					<uni-number-box v-model="quantity" :min="1"></uni-number-box>
				</view>
				<view class="cu-bar bg-white tabbar border shop foot">
					<view class="btn-group">
						<button class="cu-btn bg-orange round shadow-blur" style="width: 48%;" @tap="addToShopCart">加入购物车</button>
						<button class="cu-btn bg-red round shadow-blur" style="width: 48%;">立即购买</button>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		getProdDetailById
	} from '@/apis/prod.js'
	import {addShopCart} from '@/apis/shopCart.js'
	import {
		getSkuByAttrs
	} from '@/apis/prodSku.js'
	export default {
		onLoad(options) {
			// console.log(options)
			var data = options.prodId; // 字符串转对象
			getProdDetailById({
				prodId: data
			}).then(res => {
				this.prod = res.data.prod
				this.prod.imgs = res.data.prod.imgs.split(",");
				let data = {}
				res.data.prodAttrs.map(prodAttr => {
					if (this.prodAttrs[prodAttr.attrKey]) {
						this.prodAttrs[prodAttr.attrKey].push(prodAttr)
					} else {
						this.prodAttrs[prodAttr.attrKey] = [prodAttr]
					}
				})
				getSkuByAttrs(options).then(res => {
					if (res.code == 200) {
						this.prodSku = res.data
						this.attr.attr1Id = res.data.attr1Id
						this.attr.attr2Id = res.data.attr2Id
						this.attr.attr3Id = res.data.attr3Id
					}
				})
			})
		},
		data() {
			return {
				prod: {},
				prodAttrs: {},
				prodSku: {},
				showDialog: false,
				attr: {
					attr1Id: '',
					attr2Id: '',
					attr3Id: '',
				},
				quantity: 1
			}
		},
		methods: {
			showShoppingCart() {
				this.showDialog = true
			},
			selectedAttr(index, id) {
				this.attr[`attr${index}Id`] = id
				getSkuByAttrs(Object.assign({
					prodId: this.prod.id
				}, this.attr)).then(res => {
					this.prodSku = res.data
				})
			},
			closeDialog() {
				this.showDialog = false
			},
			addToShopCart(){
				// console.log(this.$store)
				const data = {
					phone:this.$store.state.user.phone,
					prodId:this.prod.id,
					prodSkuId:this.prodSku.id,
					quantity:this.quantity
				}
				addShopCart(data).then(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.price-box {
		height: 2rem;
	}

	::v-deep .uni-numbox {
		width: 100%;
	}
</style>
