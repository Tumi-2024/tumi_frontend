<template>
  <q-card flat class="q-mt-sm" style="margin-top: 0px">
    <q-card-section class="row justify-between card-section" style="">
      <div class="notosanskr-medium" style="">
        <q-btn
          unelevated
          class="q-mr-sm"
          padding="0px 8px"
          :color="filter_keyword === 'all' ? 'dark' : undefined"
          @click="filter('all')"
        >
          #전체({{ all }})
        </q-btn>
        <filter-button
          :type="'아파트'"
          :count="apartment"
          :current_filter="filter_keyword"
          @filter="filter"
        />
        <filter-button
          :type="'연립ￜ다세대'"
          :count="alliance"
          :current_filter="filter_keyword"
          @filter="filter"
        />
        <filter-button
          :type="'단독ￜ다가구'"
          :count="single"
          :current_filter="filter_keyword"
          @filter="filter"
        />
        <filter-button
          :type="'오피스텔'"
          :count="office"
          :current_filter="filter_keyword"
          @filter="filter"
        />
        <filter-button
          :type="'상업ￜ업무용'"
          :count="commercial"
          :current_filter="filter_keyword"
          @filter="filter"
        />
        <filter-button
          :type="'토지'"
          :count="land"
          :current_filter="filter_keyword"
          @filter="filter"
        />
        <filter-button
          :type="'무허가 건축물'"
          :count="unauthorized"
          :current_filter="filter_keyword"
          @filter="filter"
        />
        <filter-button
          :type="'입주권'"
          :count="right"
          :current_filter="filter_keyword"
          @filter="filter"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import FilterButton from "./FilterButton.vue";

export default {
  props: {
    apartment: {
      type: Number,
      default: 0
    },
    office: {
      type: Number,
      default: 0
    },
    land: {
      type: Number,
      default: 0
    },
    alliance: {
      type: Number,
      default: 0
    },
    commercial: {
      type: Number,
      default: 0
    },
    single: {
      type: Number,
      default: 0
    },
    unauthorized: {
      type: Number,
      default: 0
    },
    right: {
      type: Number,
      default: 0
    }
  },
  components: {
    FilterButton
  },
  computed: {
    all() {
      return (
        this.apartment +
        this.office +
        this.land +
        this.alliance +
        this.commercial +
        this.single +
        this.unauthorized +
        this.right
      );
    }
  },
  data() {
    return {
      filter_keyword: "all"
    };
  },
  methods: {
    filter(keyword) {
      if (this.filter === keyword) return;
      this.filter_keyword = keyword;
      this.$emit("filter", keyword);
    }
  }
};
</script>

<style lang="scss" scoped>
.card-section {
  border-bottom: 1px solid #e0e0e0;
  border-radius: 1;
}

.notosanskr-medium {
  white-space: nowrap;
  overflow-x: auto;
}

::-webkit-scrollbar {
  display: none;
}

.q-btn {
  background: #ffffff;
  /* Line/Gray_20 */

  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 8px;

  font-weight: 500;
  font-size: 14px;
  line-height: 36px;
  text-align: center;
  letter-spacing: -1.05px;
  color: #1a1a1a;

  display: inline-block;
}

.q-btn:hover {
  background: #3a3a3a;
  color: #ffffff;
}
</style>
