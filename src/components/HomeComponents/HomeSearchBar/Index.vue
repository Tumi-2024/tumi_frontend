<template>
  <div class="row q-gutter-lg">
    <q-input
      borderless
      dense
      ref="searchInput"
      v-model="text"
      @click="onHandleFocus"
      @focus="onHandleFocus"
      class="search-field"
      style="flex: 1"
      placeholder="찾고자하는 지역명 정비사업명을 적어주세요"
    />
    <div class="col-2 flex items-center">
      <q-btn icon="search" class="search-btn full-width" color="primary" />
    </div>
    <search-dialog ref="dialog" />
  </div>
</template>

<script>
import SearchDialog from "./dialog/SearchDialog";

export default {
  data() {
    return {
      text: null,
      dialog: false
    };
  },
  components: {
    SearchDialog
  },
  methods: {
    onHandleFocus() {
      this.$refs.dialog.showDialog();
      this.$refs.searchInput.blur();
    }
  }
};
</script>

<style scoped>
.search-field {
  border: 1px solid #e8e8e8;
  padding: 10px;
  border-radius: 12px;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06),
    0px 0px 1px rgba(0, 0, 0, 0.04);
}

.search-btn {
  height: 52px;
  width: 52px;
  border-radius: 12px;
}
</style>
