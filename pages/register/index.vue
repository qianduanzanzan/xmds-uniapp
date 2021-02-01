<template>
	<view class="login">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">登录</block></cu-custom>
		<view class="cu-form-group margin-top-40">
			<view class="title">账号</view>
			<input placeholder="请输入账户" name="input"></input>
		</view>
		<view class="cu-form-group margin-top-10">
			<view class="title">密码</view>
			<input placeholder="请输入密码" type="password" name="input"></input>
		</view>
		<view class="cu-form-group margin-top-10">
			<view class="title">确认密码</view>
			<input placeholder="请确认密码" type="password" name="input"></input>
		</view>
		<view class="padding flex flex-direction">
			<!-- <button class="cu-btn bg-red lg margin-top">登录</button> -->
			<button class="cu-btn bg-yellow lg margin-top-10">注册</button>
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.margin-top-10{
		margin-top: 20rpx;
	}
	.margin-top-40{
		margin-top: 100rpx;
	}
</style>
