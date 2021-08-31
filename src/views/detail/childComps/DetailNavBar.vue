<template>
	<NavBar>
		<div slot="left" class="back" @click="backClick">
			<img src="~assets/img/common/back.svg" alt="" />
		</div>

		<div class="title" slot="center">
			<div
				v-for="(item, index) in titles"
				:key="item"
				class="title-item"
				:class="{ active: index === currentIndex }"
				@click="titleClick(index)"
			>
				{{ item }}
			</div>
		</div>

		<div slot="right" class="go"></div>
	</NavBar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
	data() {
		return {
			titles: ["商品", "参数", "评论", "推荐"],
			currentIndex: 0
		};
	},
	methods: {
		titleClick(index) {
			this.currentIndex = index;
		},
		backClick() {
			this.$router.back();
		}
	},
	components: {
		NavBar
	}
};
</script>

<style lang="scss" scoped>
.title {
	display: flex;
	.title-item {
		flex: 1;
		&.active {
			color: $color-high-text;
		}
	}
}
.back {
	margin-top: 7px;
}
</style>
