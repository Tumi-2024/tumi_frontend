<template>
  <div class="row q-col-gutter-sm">
		<div class="col-10">
			<q-input borderless v-model="text" class="search-field full-width" placeholder="지역명, 단지명,  지하철역, 주소 검색" />
		</div>

		<div class="col-2 flex items-center">
			<q-btn icon="search" class="search-btn full-width" color="primary" />
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			text: null,
		}
	},
}
</script>

<style scoped>
	.search-field {
		border: 1px solid #E8E8E8;
		padding: 10px;
		border-radius: 12px;
		max-height: 52px;
		box-sizing: border-box;
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 0px 1px rgba(0, 0, 0, 0.04);
	}

	.search-btn {
		height: 52px;
		width: 52px;
		border-radius: 12px;
	}
</style>