<template>
	<view class="p-picker-group" name="p-picker-group">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "p-picker-group",
		provide(){
			return {
				pickergroup:this
			}
		},
		props: {
			value: {
				type: String | Number,
				required: true
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		model: {
			prop: "value",
			event: "select"
		},
		watch: {
			value(newValue) {
				this.$emit("change", newValue);
			}
		},
	}
</script>

<style scoped>
	.p-picker-group{
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
</style>
