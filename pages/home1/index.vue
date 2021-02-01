<template>
	<view class="home">
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
		首页
	</view>
</template>

<script>
	export default {
		data() {
			return {
				prodName: ''
			}
		},
		methods: {
			InputFocus() {
				console.log('focus')
			},
		}
	}
</script>

<style>
</style>
