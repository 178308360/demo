<template>
	<div id="home">
		<NavBar class="home-nav">
			<template v-slot:center>
				<span>
					购物街
				</span>
			</template>
		</NavBar>
		<TabControl
			class="tab-control"
			:title="['流行', '新款', '精选']"
			@tabClick="tabClick"
			ref="tabControl1"
			v-show="isTabFixed"
		></TabControl>
		<Scroll
			class="content"
			ref="scroll"
			:probe-type="3"
			:pull-up-load="true"
			@scroll="contentScroll"
			@pullingUp="loadMore"
		>
			<HomeSwiper
				:banners="banners"
				@swiperImageLoad="swiperImageLoad"
			></HomeSwiper>
			<HomeRecommendView :recommends="recommends"></HomeRecommendView>
			<HomeFeatureView></HomeFeatureView>
			<TabControl
				:title="['流行', '新款', '精选']"
				@tabClick="tabClick"
				ref="tabControl2"
			></TabControl>
			<GoodList :goods="showGoods"></GoodList>
		</Scroll>
		<BackTop @click.native="backClick" v-show="isShowBackTop" />
	</div>
</template>

<script>
//导入公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";
//导入子组件
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import HomeFeatureView from "./childComps/HomeFeatureView";
//api
import { getHomeMultidata, getHomeGoods } from "network/home";

//工具函数
import { debounce } from "common/utils";

export default {
	name: "Home",
	data() {
		return {
			banners: [],
			recommends: [],
			goods: {
				pop: { page: 0, list: [] },
				new: { page: 0, list: [] },
				sell: { page: 0, list: [] }
			},
			currentType: "pop",
			isShowBackTop: false,
			tabOffsetTop: 0,
			isTabFixed: false,
			saveY: 0
		};
	},
	computed: {
		showGoods() {
			return this.goods[this.currentType].list;
		}
	},
	created() {
		//1.请求多个数据
		this.getHomeMultidata();
		//2.请求商品数据
		this.getHomeGoods("pop");
		this.getHomeGoods("new");
		this.getHomeGoods("sell");
	},
	mounted() {
		//监听图片加载完成
		const refresh = debounce(this.$refs.scroll.refresh(), 50);
		this.$bus.$on("itemImageLoad", () => {
			refresh();
		});
	},
	methods: {
		//网络请求相关
		getHomeMultidata() {
			getHomeMultidata().then((res) => {
				this.banners = res.data.banner.list;
				this.recommends = res.data.recommend.list;
			});
		},
		getHomeGoods(type) {
			const page = this.goods[type].page + 1;
			getHomeGoods(type, page).then((res) => {
				this.goods[type].page = page;
				this.goods[type].list.push(...res.data.list);
			});
		},

		//事件监听相关
		tabClick(index) {
			switch (index) {
				case 1:
					this.currentType = "new";
					break;
				case 2:
					this.currentType = "sell";
					break;
				case 0:
					this.currentType = "pop";
					break;
			}
			this.$refs.tabControl1.currentIndex = index;
			this.$refs.tabControl2.currentIndex = index;
		},
		//refs只有挂载完成之后才有数据
		backClick() {
			this.$refs.scroll.scrollTo(0, 0);
		},
		contentScroll(position) {
			//判断backtop是否显示
			this.isShowBackTop = -position.y > 1000;
			//决定tabControl是否吸顶
			this.isTabFixed = -position.y > this.tabOffsetTop;
		},
		loadMore() {
			this.getHomeGoods(this.currentType);
			this.$refs.scroll.finishPullUp();
		},
		//轮播图图片加载完成 计算tabControl的距离
		swiperImageLoad() {
			this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
		}
	},
	activated() {
		this.$refs.scroll.scrollTo(0, this.saveY, 0);
		this.$refs.scroll.refresh();
	},
	//保存滚动状态
	deactivated() {
		this.saveY = this.$refs.scroll.scroll.y;
	},
	components: {
		NavBar,
		HomeSwiper,
		HomeRecommendView,
		HomeFeatureView,
		TabControl,
		GoodList,
		Scroll,
		BackTop
	}
};
</script>

<style lang="scss" scoped>
#home {
	height: 100vh;
	position: relative;
	.home-nav {
		background-color: $color-tint;
		color: $color-background;
		//使用原生滚动
		// position: fixed;
		// left: 0;
		// right: 0;
		// top: 0;
		// z-index: 9;
	}
}
.tab-control {
	position: relative;
	z-index: 9;
}
.content {
	//通过top和bottom让元素自适应高度
	overflow: hidden;
	position: absolute;
	top: 38px;
	bottom: 44px;
}
.fixed {
}
</style>
