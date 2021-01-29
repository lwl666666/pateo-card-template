<template>
	<view class="card_wrap" :style="{overflow:overflow}">
		<view :class="['small_card',isLargeCard?behindCardClass:'']" :style="{height:isSmallCard?smallCardHeight:'280rpx'}">
			<slot name="smallCard"></slot>
		</view>
		<view class="large_card" :style="{'margin-top':isSmallCard?smallCardHeight:'200rpx'}">
			<slot name="largeCard"></slot>
		</view>
	</view>
</template>

<script>
	const windowModule = uni.requireNativePlugin("WindowModule");
	//卡片状态
	const CardStatus = {
		"SMALL": "small",
		"LARGE": "large"
	}
	//小卡默认高度
	const SmallCardHeight = "600rpx";
	export default {
		props: {
			//卡片状态值，只支持small，large
			value: {
				type: String,
			},
			//大卡时背景小卡自定义Class
			behindCardClass: {
				type: String
			},
			//大小卡切换动画时长
			animationDuration: {
				type: Number,
				default: 800
			}
		},
		model: {
			prop: "value",
			event: "change"
		},
		data() {
			return {
				cardStatus: "", //samll:小卡，middle:中卡,large:大卡
				smallCardHeight: "",
				overflow:""
			}
		},
		computed: {
			isSmallCard() {
				return this.cardStatus === CardStatus.SMALL;
			},
			isLargeCard() {
				return this.cardStatus === CardStatus.LARGE;
			}
		},
		methods: {
			//切换卡片
			changeCard(status) {
				const _this = this;
				if (status === CardStatus.SMALL) {	
					//小卡
					//回到顶部
					uni.pageScrollTo({
					    scrollTop: 0,
					    duration: _this.animationDuration/4
					});
					//设置小卡不可滚动
					let st = setTimeout(()=>{
						this.overflow = "hidden";
						st = null;
					},_this.animationDuration)
					windowModule && windowModule.smoothChangeHeight(600, _this.animationDuration);
				} else {
					this.overflow = "";
					windowModule && windowModule.fullscreen(_this.animationDuration);
				}
				//设置卡片状态
				_this.cardStatus = status;
				_this.$emit("change", status);
		
			}
		},
		watch: {
			value(newVal, oldVal) {
				const _this = this;
				//非规定值
				if (Object.values(CardStatus).indexOf(newVal) === -1) {
					_this.changeCard("small");
					return
				}
				_this.changeCard(newVal);
			}
		},
		created() {
			//初始化
			this.cardStatus = this.value || CardStatus.SMALL;
			this.overflow = this.isSmallCard?'hidden':'';
			this.smallCardHeight = SmallCardHeight;
		}
	}
</script>

<style lang="scss" scoped>
	.card_wrap {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		.small_card {
			position: fixed;
			top: 0;
			left: 0;
			width: 750rpx;
			transition: height 0.8s;
			overflow: hidden;
			z-index: 1;
		}

		.large_card {
			position: relative;
			width: 750rpx;
			border-radius: 80rpx 80rpx 0 0;
			overflow: hidden;
			transition: margin-top 0.8s;
			z-index: 2;
		}
	}
</style>
