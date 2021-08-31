<template>
	<div class="goods-item" @click="itemClick">
		<img :src="goodItem.show.img" alt="" @load="imageLoad" />
		<div class="goods-info">
			<p>{{ goodItem.title }}</p>
			<span class="price">{{ goodItem.price }}</span>
			<span class="collect">{{ goodItem.cfav }}</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		goodItem: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	methods: {
		imageLoad() {
			this.$bus.$emit("itemImageLoad");
		},
		itemClick() {
			this.$router.push({
				name: "detail",
				params: {
					iid: this.goodItem.iid
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.goods-item {
	padding-bottom: 40px;
	position: relative;
	width: 48%;

	img {
		width: 100%;
		border-radius: 5px;
	}

	.goods-info {
		font-size: 12px;
		position: absolute;
		bottom: 5px;
		left: 0;
		right: 0;
		overflow: hidden;
		text-align: center;
		p {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin-bottom: 3px;
		}
		.price {
			color: $color-high-text;
			margin-right: 20px;
		}
		.collect {
			position: relative;
			&::before {
				content: "";
				position: absolute;
				left: -15px;
				top: 1px;
				width: 14px;
				height: 14px;
				background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
			}
		}
	}
}
</style>
