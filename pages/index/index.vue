<template>
	<view class="card_container demo">
		<image class="logo" src="../../static/logo.png" mode=""></image>
		<text class="title">{{title}}</text>
		<p-button type="primary" @click="start">开始</p-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '博泰卡片小程序'
			}
		},
		onLoad() {

		},
		methods: {
			start(){
				uni.showToast({
				    title: "Hello World",
					icon: 'none',
				    duration: 2000
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.demo{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.logo{
			width: 120rpx;
			height: 120rpx;
		}
		.title{
			margin-top: 30rpx;
			margin-bottom: 30rpx;
			font-size: $font_size_medium;
			color:$h1_light;
		}
	}
</style>
