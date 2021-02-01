<template>
	<view class="category">
		<!-- <view class="fixed">
			<cu-custom :isBack="true" bgColor="bg-shadeTop text-white">
				<block slot="backText">返回</block>
				<block slot="content">分类</block>
			</cu-custom>
		</view> -->
		<view class="fixed">
			<view class="cu-bar bg-cyan search">
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input v-model="prodName" @focus="InputFocus" :adjust-position="false" type="text" placeholder="搜索产品名"
					 confirm-type="search"></input>
				</view>
				<view class="action">
					<text class="cuIcon-close"></text>
					<text>取消</text>
				</view>
			</view>
		</view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 60px);margin-top: 60px;">
				<view class="cu-item" :class="index==tabCur?'text-green cur':''" v-for="(item) in list" :key="item.id" @tap="TabSelect"
				 :data-id="item.id">
					{{item.categoryName}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 60px);margin-top: 60px;"
			 :scroll-into-view="'main-'+mainCur">
				<view class="padding-lr" :class="index == 0 ? '' : 'padding-top'" v-for="(item,index) in list" :key="item.id" :id="'main-'+item.id">
					<view class="cu-bar solid-bottom bg-white flex justify-between">
						<view class="action">
							<text class="cuIcon-title text-green"></text><text>{{item.categoryName}}</text>
						</view>
						<view class="action">
							<text class="text-yellow">更多></text>
						</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item" v-for="prod in item.prods" :key="prod.id" :id="prod.id">
							<view class="cu-avatar round lg" :style="'background-image:url(' + prod.avatar + ');'"></view>
							<view class="content">
								<view class="text-grey text-sm">{{prod.prodName}}</view>
								<view class="text-gray text-sm flex">
									<text class="text-cut">
										{{prod.description}}
									</text> </view>
							</view>
							<view class="action">
								<view class="text-grey text-xs" style="margin-bottom: 1em;">售价：{{prod.price}}</view>
								<button class="cu-btn round bg-red text-xs sm" @click="toProdDetail(prod)">购买</button>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		getAllCate
	} from '@/apis/cate.js'
	import {
		getProdByCate
	} from '@/apis/prod.js'
	export default {
		data() {
			return {
				list: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				prodName:''
			}
		},
		created() {
			getAllCate().then(res => {
				this.list = res.data
				this.list.map(async (item) => {
					const prods = await getProdByCate({
						cateId: item.id
					})
					console
					if (prods.code == 200) {
						prods.data = prods.data.map(prod => {
							return {
								...prod,
								avatar: prod.imgs.split(',')[0]
							}
						})
						// item.prods = prods.data
						this.$set(item,'prods',prods.data)
					}
				})
			})
		},
		mounted() {

		},
		methods: {
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			toProdDetail(prod) {
				uni.navigateTo({
					url: `/pages/prodDetail/index?prodId=${prod.id}&attr1Id=${prod.attr1Id}&attr2Id=${prod.attr2Id}&attr3Id=${prod.attr3Id}`
				})
			},
			InputFocus() {
				console.log('focus')
			},
			// VerticalMain(e) {
			// 	// #ifdef MP-ALIPAY
			// 	   return false  //支付宝小程序暂时不支持双向联动 
			// 	// #endif
			// 	let that = this;
			// 	let tabHeight = 0;
			// 	if (this.load) {
			// 		for (let i = 0; i < this.list.length; i++) {
			// 			let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
			// 			console.log(view.fields,'1222222222222222')
			// 			view.fields({
			// 				size: true,
			// 				scrollOffset: true,
			// 			}, data => {
			// 				this.list[i].top = tabHeight;
			// 				console.log(data)
			// 				tabHeight = tabHeight + data.height;
			// 				this.list[i].bottom = tabHeight;
			// 			}).exec();
			// 		}
			// 		this.load = false
			// 	}
			// 	let scrollTop = e.detail.scrollTop + 10;
			// 	for (let i = 0; i < this.list.length; i++) {
			// 		if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
			// 			this.verticalNavTop = (this.list[i].id - 1) * 50
			// 			this.tabCur = this.list[i].id
			// 			console.log(scrollTop)
			// 			return false
			// 		}
			// 	}
			// }
		},
		// onReady:function(){
		// 	getAllCate().then(res => {
		// 		this.list = res.data
		// 		console.log(this.list)
		// 	})
		// }
	}
</script>

<style lang="scss" scoped>
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		// margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>
