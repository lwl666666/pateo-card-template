<template>
	<view :class="['p_picker_item',isDisabled?'disabled':'',value == model?'active':'']" @click.stop="handleClick(value)">
		<view class="p_picker_header">
			<view class="header_content">
				<text v-if="showUnit" class="unit">{{unit}}</text>
				<text class="header_text">
					<slot name="header"></slot>
				</text>
			</view>
		</view>
		<view class="p_picker_split">
			<text class="split_content">
				<slot name="split">/</slot>
			</text>
		</view>
		<view class="p_picker_footer">
			<text class="footer_content">
				<slot name="footer"></slot>
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"p-picker-item",
		inject:	{
			pickergroup:{
				default:null
			}
		},
		props: {
			//是否显示单位
			showUnit: {
				type: Boolean,
				default: true
			},
			//单位值
			unit: {
				type: String,
				default: "￥"
			},
			//是否禁用
			disabled: {
				type: Boolean,
				default: false
			},
			//选项值
			value: {
				type: String | Number,
				required: true
			},
			propValue: {
				type: String | Number,
			}
		},
		model: {
			prop: "propValue",
			event: "select"
		},
		computed: {
			isGroup() {
				return this.pickergroup !== null;
			},
			isDisabled() {
				return (this.isGroup&&this.pickergroup.disabled) || this.disabled;
			},
			model: {
				get() {
					return this.isGroup ? this.pickergroup.value : this.propValue;
				},
				set(newValue) {
					this.isGroup ? this.pickergroup.$emit("select", newValue) : this.$emit("select", newValue);
				}
			}

		},
		methods: {
			handleClick(value) {
				!this.isDisabled && (this.model = this.value);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@mixin picker_content {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	$diabledColor:#ADADAD;

	.p_picker_item {
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 160rpx;
		height: 240rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
		border: 1rpx solid rgba(18, 18, 18, 0.15);
		will-change: box-shadow;
		transition: box-shadow 0.5s;
		.p_picker_header {
			@include picker_content;

			.header_content {
				display: flex;
				.unit {
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #888888;
					line-height: 28rpx;
				}

				.header_text {
					font-size: 60rpx;
					font-family: DINAlternate-Bold, DINAlternate;
					font-weight: bold;
					color: #888888;

				}
			}
		}

		.p_picker_split {
			display: flex;
			justify-content: center;

			.split_content {
				color: $diabledColor;
			}
		}

		.p_picker_footer {
			@include picker_content;

			.footer_content {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #888888;
				line-height: 40rpx;
			}
		}
	}
	.active{
		background: linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%);
		box-shadow: 0px 32rpx 80rpx -20rpx rgba(0, 0, 0, 0.3);
		border: none;
	}
	.disabled {
		background: #D8D8D8;
		border: none;
		pointer-events: none;

		.p_picker_header {
			.header_content {
				.unit {
					color: $diabledColor;
				}

				.header_text {
					color: $diabledColor;
				}
			}
		}

		.p_picker_footer {
			.footer_content {
				color: $diabledColor;
			}
		}
	}
</style>
