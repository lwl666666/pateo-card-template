<template>
	<view :class="['p_button',`p_button--${type}`,disabled?'disabled':'']" @click="clickHandler">
		<image @load="load" v-if="logo" :style="{width:iconWidth,height:iconHeight}" lazy-load class="p_button_logo"
		 src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1975423711,1064412348&fm=26&gp=0.jpg">
		<p-icon class="p_button_icon" v-if="type == 'icon'" size="small" :name="icon"></p-icon>
		<text class="p_button_text">
			<slot></slot>
		</text>
	</view>
</template>

<script>
	export default {
		props: {
			// 按钮类型 
			// default 默认线框型按钮；
			// primary 填充型按钮；
			// text 文字型按钮；
			// 	 图标型按钮；
			type: {
				type: String,
				default: "default"
			},
			//是否禁用
			disabled: {
				type: Boolean,
				default: false
			},
			//是否显示logo
			logo: {
				type: Boolean,
				default: false
			},
			//图标型按钮，图标名称
			icon:{
				type:String
			}
		},
		data() {
			return {
				TYPE:["default","primary","text","icon"],
				iconWidth: 0,
				iconHeight: 0
			}
		},
		methods: {
			load(e) {
				const _this = this;
				const originWidth = e.detail.width;
				const originHeight = e.detail.height;
				const originRate = originWidth / originHeight;
				const maxRate = 60 / 26;
				if (originRate > maxRate) {
					_this.iconWidth = '120rpx';
					_this.iconHeight = 120 / originRate + "rpx";
				} else {
					_this.iconHeight = '52rpx';
					_this.iconWidth = originRate * 52 + "rpx";
				}
			},
			clickHandler(e){
				this.$emit("click",e);
			}
		}
	}
</script>

<style scoped lang="scss">
	@mixin block_button {
		margin: 0 auto;
		width: 540rpx;
		height: 100rpx;
		border-radius: 56rpx;
	}

	.p_button {
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		text-align: center;	
		.p_button_logo{
			margin-right: 20rpx;
		}
		.p_button_text {
			font-family: PingFangSC-Medium, PingFang SC;
			font-size: 32rpx;
			font-weight: 500;
			line-height: 32rpx;
		}

		&+.disabled {
			background-color: #D8D8D8;
			background-image: none;
			box-shadow: none;
			pointer-events: none;
			.p_button_text {
				color: #FFFFFF;
			}
			.p_button_icon{
				opacity: 0.3;
			}
		}

		&--default {
			@include block_button;
			border: 1rpx solid rgba($color: #333333, $alpha: 0.2);
			background-color: #FFFFFF;

			.p_button_text {
				color: #333333;
			}

			&:hover {
				opacity: 0.5;
			}
		}

		&--primary {
			@include block_button;
			background: linear-gradient(180deg, #2C2C2C 0%, #040404 100%);
			box-shadow: 0px 34rpx 34rpx -18rpx rgba(0, 0, 0, 0.5);

			.p_button_text {
				color: #FFFFFF;
			}

			&:hover {
				background: linear-gradient(180deg, #1A1A1A 0%, #000000 100%);
				box-shadow: 0px 16rpx 16rpx -16rpx rgba(0, 0, 0, 0.5);
			}
		}

		&--text {
			.p_button_text {
				font-size: 36rpx;
				color: #1AB298;
				line-height: 50rpx;
			}

			&:hover {
				opacity: 0.5;
			}

			&+.disabled {
				background-color: inherit;

				.p_button_text {
					color: #D8D8D8;
				}
			}
		}
		&--icon {
			width: 120rpx;
			height: 88rpx;
			background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
			box-shadow: 0px 24rpx 40rpx -10rpx rgba(0, 0, 0, 0.1);
			border-radius: 42rpx;
			&:hover{
				box-shadow: 0px 8rpx 20rpx -10rpx rgba(0, 0, 0, 0.1);
				.p_button_icon{
					opacity: 0.5;
				}
			}
		}
	}
</style>
