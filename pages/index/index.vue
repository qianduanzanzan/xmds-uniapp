<template>
	<view>
		<category v-show="PageCur=='category'" />
		<userInfo v-show="PageCur=='user'" />
		<home v-show="PageCur=='home'" />
		<shop-cart v-show="PageCur=='shopCart'" />
			</components>
			<plugin v-if="PageCur=='plugin'"></plugin>
			<view class="cu-bar tabbar bg-white shadow foot">
				<view class="action" @click="NavChange" data-cur="home">
					<view class="cuIcon-homefill" :class="PageCur=='home'?'text-orange':'text-gray'"></view>
					<view :class="PageCur=='home'?'text-orange':'text-gray'">首页</view>
				</view>
				<view class="action" @click="NavChange" data-cur="category">
					<view class="cuIcon-similar" :class="PageCur=='category'?'text-orange':'text-gray'"></view>
					<view :class="PageCur=='category'?'text-orange':'text-gray'">分类</view>
				</view>
				<view class="action" @click="NavChange" data-cur="shopCart">
					<view class="cuIcon-cart" :class="PageCur=='shopCart'?'text-orange':'text-gray'">
						<!-- <view class="cu-tag badge">99</view> -->
					</view>
					<view :class="PageCur=='shopCart'?'text-orange':'text-gray'">购物车</view>
				</view>
				<view class="action" @click="NavChange" data-cur="user">
					<view class="cuIcon-my" :class="PageCur=='user'?'text-orange':'text-gray'">
						<!-- <view class="cu-tag badge"></view> -->
					</view>
					<view :class="PageCur=='user'?'text-orange':'text-gray'">我的</view>
				</view>
			</view>
	</view>
</template>

<script>
	import category from '@/pages/category/index.vue'
	import userInfo from '@/pages/user/index.vue'
	import home from '@/pages/home1/index.vue'
	import shopCart from '@/pages/shopCart/index.vue'
	export default {
		components: {
			category,
			userInfo,
			shopCart,
			home
		},
		data() {
			return {
				PageCur: 'category'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
