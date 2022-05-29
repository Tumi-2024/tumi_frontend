<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class="notosanskr-medium">
      전체 실거래가
      <span class="text-primary"> {{ list.length }} </span>개
    </q-card-section>
    <q-card-section
      class="sort-section row bg-positive q-pa-none notosanskr-regular"
    >
      <toolbar-filter
        class="q-pt-xs q-px-sm"
        :text="text"
        @input="onChangeText"
        @search="onSearch"
      />
    </q-card-section>

    <q-card-section class="list-items q-pa-none notosanskr-regular">
      <q-list class="q-pt-md">
        <area-transaction
          v-for="(item, i) of list"
          :key="i"
          :item="item"
          v-bind="{
            ctgr: item.category,
            type: item.type,
            isRedevelop: true
          }"
        >
        </area-transaction>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import AreaTransaction from "./AreaTransaction.vue";
import ToolbarFilter from "./ToolbarFilter.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    "area-transaction": AreaTransaction,
    "toolbar-filter": ToolbarFilter
  },
  data() {
    return {
      tab: "지역",
      text: "",
      selectedIndex: 0,
      type: "transaction" /** sell  */,
      currentItem: {}
    };
  },
  props: {
    list: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    ...mapGetters("map", ["getMapMode"])
  },
  methods: {
    onChangeText(e) {
      console.log(e);
      this.text = e;
    },
    onSearch() {
      this.$emit("search");
    }
  }
};
</script>

<style lang="scss" scoped>
.sort-section {
  padding: 5px 0;
  justify-content: space-between;
  .q-btn {
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    letter-spacing: -1.05px;
    color: #707070;
  }
  .q-separator {
    margin-top: 20px;
    height: 14px;
  }
  .see-more {
    font-size: 17px;
    line-height: 52px;
    text-align: center;
    letter-spacing: -1.275px;
    color: #3a3a3a;
  }
}
</style>
