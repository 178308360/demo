<template>
	<div class="tab-control">
		<div
			v-for="(item, index) in title"
			:key="item"
			class="tab-control-item"
			:class="{ active: index === currentIndex }"
			@click="itemClick(index)"
		>
			<span>{{ item }}</span>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentIndex: 0
		};
	},
	props: {
		title: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	methods: {
		itemClick(index) {
			this.currentIndex = index;
			this.$emit("tabClick", index);
		}
	}
};
</script>

<style lang="scss" scoped>
.tab-control {
	display: flex;
	height: 40px;
	line-height: 40px;
	font-size: 15px;
	text-align: center;
	background-color: #fff;
	.tab-control-item {
		flex: 1;
		span {
			padding: 5px;
		}
	}
	.active span {
		color: $color-high-text;
		border-bottom: 2px solid $color-tint;
	}
	z-index: 9;
}
</style>
