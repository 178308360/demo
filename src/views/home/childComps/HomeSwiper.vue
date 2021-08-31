<template>
	<Swiper>
		<SwiperItem v-for="item in banners" :key="item.title">
			<a :href="item.link">
				<img :src="item.image" alt="" @load="swiperImageLoad" />
			</a>
		</SwiperItem>
	</Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
	components: {
		Swiper,
		SwiperItem
	},
	data() {
		return {
			isLoad: false
		};
	},
	props: ["banners"],
	methods: {
		swiperImageLoad() {
			if (!this.isLoad) {
				this.$emit("swiperImageLoad");
				this.isLoad = true;
			}
		}
	}
};
</script>

<style lang="scss"></style>
