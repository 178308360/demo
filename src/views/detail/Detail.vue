<template>
	<div id="detail">
		<DetailNavBar></DetailNavBar>
		<DetailSwiper :top-images="topImages"></DetailSwiper>
		<DetailBaseInfo :goods="goods"></DetailBaseInfo>
	</div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";

import { getDetail, Goods } from "@/network/detail";
export default {
	name: "Detail",
	data() {
		return {
			iid: 0,
			topImages: [],
			goods: {}
		};
	},
	created() {
		this.iid = this.$route.params.iid;
		this.getDetail(this.iid);
	},
	methods: {
		getDetail(iid) {
			getDetail(iid).then((res) => {
				const data = res.result;
				this.topImages = data.itemInfo.topImages;
				this.goods = new Goods(
					data.itemInfo,
					data.columns,
					data.shopInfo.services
				);
			});
		}
	},
	components: {
		DetailNavBar,
		DetailSwiper,
		DetailBaseInfo
	}
};
</script>

<style lang="scss" scoped>
// #detail {
// 	position: relative;
// 	z-index: 9;
// 	background-color: #fff;
// }
</style>
