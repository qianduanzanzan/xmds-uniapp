<template>
	<view class="user">
		<view>
			<view class="user-backgroud bg-gradual-pink padding radius text-center shadow-blur">
				<view class="box bg-white mt15 margin-bottom-xl">
					<view class="flex justify-start margin-lr-lg padding-tb-sm align-center">
						<view class="cu-avatar xxxl round margin-left border" :style="'background-image:url('+userInfo.avatar+');'"></view>
						<text class="margin-left-lg text-bold text-xl">{{userInfo.alias}}</text>
					</view>
				</view>
				<view class="box margin-top-lg bg-white padding-sm mt5">
					<view class="flex justify-start align-center padding-sm border-bottom">
						<view class="cuIcon-ellipse text-sm margin-right-sm text-blue"></view>
						<view class="text-lg">我的订单</view>
					</view>
					<view class="flex flex-wrap justify-between margin-tb-sm">
						<view class="shadow-warp padding-tb-lg bg-white basis-xs margin-xs cu-card radius">
							<view>
								<text class="xl-icon text-gray cuIcon-send"></text>
							</view>
							<view>
								待发货
							</view>
						</view>
						<view class="shadow-warp padding-tb-lg bg-white basis-xs margin-xs cu-card radius">
							<view>
								<text class="xl-icon text-gray cuIcon-cascades"></text>
							</view>
							<view>
								待收货
							</view>
						</view>
						<view class="shadow-warp padding-tb-lg bg-white basis-xs margin-xs cu-card radius">
							<view>
								<text class="xl-icon text-gray cuIcon-activity"></text>
							</view>
							<view>
								待评论
							</view>
						</view>
						<view class="shadow-warp padding-tb-lg bg-white basis-xs margin-xs cu-card radius">
							<view>
								<text class="xl-icon text-gray cuIcon-album"></text>
							</view>
							<view>
								全部
							</view>
						</view>
					</view>
				</view>
				<view class="box margin-top-lg bg-white padding-sm mt5">
					<view class="flex justify-start align-center padding-sm border-bottom">
						<view class="cuIcon-ellipse text-sm margin-right-sm text-blue"></view>
						<view class="text-lg">我的服务</view>
					</view>
					<view class="flex flex-wrap justify-between margin-tb-sm">
						<view class="shadow-warp padding-tb-lg bg-white basis-xs margin-xs cu-card radius">
							<view>
								<text class="xl-icon text-gray cuIcon-settings"></text>
							</view>
							<view>
								设置
							</view>
						</view>
						<view class="shadow-warp padding-tb-lg bg-white basis-xs margin-xs cu-card radius">
							<view>
								<text class="xl-icon text-gray cuIcon-location"></text>
							</view>
							<view>
								地址管理
							</view>
						</view>
						<view class="basis-xs">
						</view>
						<view class="basis-xs">
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'user',
		computed: {
			userInfo() {
				return this.$store.state.user
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-backgroud {
		height: 30vh;
	}

	.box {
		width: 90vw;
		margin: auto;
		border-radius: 20rpx;
	}

	.mt15 {
		margin-top: 15vh;
	}

	.mt5 {
		margin-top: 2vh;
	}

	.border {
		border: 1rpx solid #000;
	}

	.border-bottom {
		border-bottom: 1px solid #555555;
	}

	.xl-icon {
		font-size: 50rpx;
	}
</style>
