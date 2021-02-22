<template>
	<view class="login">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">登录</block>
		</cu-custom>
		<view class="cu-form-group margin-top-40">
			<view class="title">账号</view>
			<input v-model="form.phone" placeholder="请输入账户" name="input"></input>
		</view>
		<view class="cu-form-group margin-top-10">
			<view class="title">密码</view>
			<input v-model="form.password" placeholder="请输入密码" type="password" name="input"></input>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red lg margin-top" @click="doLogin">登录</button>
			<!-- <navigator :url="'/pages/index/index'" navigateTo
			 style="animation: 'show 1s 1';width: 100%;"> -->
			<!-- <button class="cu-btn bg-yellow lg margin-top-10" style="width: 100%;margin-left: 0;" @click="toHome">首页</button> -->
			<!-- </navigator> -->
			<!-- <navigator :url="'/pages/home/index'" navigateTo style="animation: 'show 1s 1';width: 100%;"> -->
				<button class="cu-btn bg-yellow lg margin-top-10" style="width: 100%;margin-left: 0;">注册</button>
			<!-- </navigator> -->
		</view>
	</view>
</template>

<script>
	import {
		login
	} from "@/apis/login.js"
	import md5 from 'js-md5'
	export default {
		data() {
			return {
				form: {
					phone: "",
					password: ""
				}
			}
		},
		mounted() {

		},
		onLoad(options) {

		},
		methods: {
			doLogin() {
				// console.log(this.$store)
				const data = {
					phone: this.form.phone,
					password: md5(this.form.password)
				}
				login(data).then((res) => {
					if (res.code == 200) {
						uni.setStorageSync('token', res.data.token)
						this.$store.commit('user/SET_USERINFO', res.data)
						uni.navigateTo({
							url: "/pages/index/index"
						})
					}
				})
			},
			toHome() {
				uni.navigateTo({
					url: "/pages/index/index"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.margin-top-10 {
		margin-top: 20rpx;
	}

	.margin-top-40 {
		margin-top: 100rpx;
	}
</style>
