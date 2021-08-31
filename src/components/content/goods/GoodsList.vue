<template>
	<div class="goods">
		<GoodListItem
			v-for="item in goods"
			:key="item.shopId"
			:good-item="item"
		></GoodListItem>
	</div>
</template>

<script>
import GoodListItem from "./GoodListItem.vue";
export default {
	props: {
		goods: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	components: {
		GoodListItem
	}
};
</script>

<style lang="scss" scoped>
.goods {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	padding: 2px;
}
</style>
