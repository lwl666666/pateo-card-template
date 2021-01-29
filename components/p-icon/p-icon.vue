<template>
	<text :class="[classPrefix,classPrefix?`${classPrefix}_${name}`:name]" :style="{color:color,'font-size':getSize(size)}"></text>
</template>

<script>
	const SIZE = {
		small: "48rpx",
		middle: "80rpx",
		large: "120rpx"
	}
	export default {
		props: {
			//图标尺寸 small,middle,large和指定数字大小
			size: {
				type: String | Number,
				default: "small"
			},
			//图标名称
			name: {
				required: true,
				type: String
			},
			//颜色
			color: {
				type: String,
				default: "#333333"
			},
			//类名前缀，用于使用自定义图标
			classPrefix: {
				type: String,
				default:"iconicon"
			}
		},
		methods: {
			isDef(val) {
				return val !== undefined && val !== null;
			},
			isNumeric(val) {
				return typeof val === 'number' || /^\d+(\.\d+)?$/.test(val);
			},
			getSize(size) {
				const _this = this;
				if (!_this.isDef(size)) {
					return undefined;
				}
				if (SIZE[size]) {
					return SIZE[size];
				}
				return _this.isNumeric(size) ? `${size}rpx` : String(size);
			}
		}
	}
</script>

<style scoped>
	@import url("./icon.css");
</style>
