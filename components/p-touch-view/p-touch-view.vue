<template>
    <view @touchstart="touchStart"
          @touchmove="touchMove"
          @touchend="touchEnd">
        <slot></slot>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                touchStartX : 0,//触摸时的原点
                touchStartY : 0,//触摸时的原点
                touchMoveX : 0, // x轴方向移动的距离
                touchMoveY : 0, // y轴方向移动的距离
            };
        },
        props: {
			//方向all,vertical,horizontal
            direction: {
                type: String,
                default: 'all'
            },
            distance: {
                type: Number,
                default: 30
            }
        },
        methods: {
            // 触摸开始事件
            touchStart (e) {
                this.touchStartX = e.touches[0].pageX; // 获取触摸时的原点
                this.touchStartY = e.touches[0].pageY; // 获取触摸时的原点
            },
            // 触摸移动事件
            touchMove (e) {
                this.touchMoveX = e.touches[0].pageX;
                this.touchMoveY = e.touches[0].pageY;
            },
            // 触摸结束事件
            touchEnd (e) {
                let moveX = this.touchMoveX - this.touchStartX
                let moveY = this.touchMoveY - this.touchStartY
                if (Math.sign(moveX) == -1) {
                    moveX = moveX * -1;
                }
                if (Math.sign(moveY) == -1) {
                    moveY = moveY * -1;
                }
                if (2 * moveX <= moveY) {// 上下
                    if (this.direction != 'all' && this.direction != 'vertical') return;
					let moveDistanceY = this.touchMoveY - this.touchStartY;
                    // 向上滑动
                    if (moveDistanceY <= -this.distance) {
                        this.$emit('slideUp',moveDistanceY);
                    }
                    // 向下滑动
                    if (moveDistanceY >= this.distance) {
                        this.$emit('slideDown',moveDistanceY);
                    }
                }else if (moveX > 2 * moveY) {// 左右
                    if (this.direction != 'all' && this.direction != 'horizontal') return;
					let moveDistanceX = this.touchMoveX - this.touchStartX;
                    // 向左滑动
                    if (moveDistanceX <= -this.distance) {
                        this.$emit('slideLeft',moveDistanceX);
                    }
                    // 向右滑动
                    if (moveDistanceX >= this.distance) {
                        this.$emit('slideRight',moveDistanceX);
                    }
                }
				this.touchStartX = 0;
				this.touchStartY = 0;
				this.touchMoveX = 0;
				this.touchMoveY = 0;
            }
        }
    }
</script>
