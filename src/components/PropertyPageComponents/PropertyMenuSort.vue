<template>
  <q-card flat class="q-mt-sm">
    <q-card-section
      class="sort-header row bg-white q-pa-none notosanskr-medium"
      style="height: 48px;"
    >
      <p style="line-height: 48px; padding-left: 16px;">
        관심매물 <span style="color: #ff5a00;">{{ houseCount }}</span>개
      </p>
    </q-card-section>

    <q-card-section
      class="sort-section row bg-positive q-pa-none notosanskr-regular"
      align="center"
    >
      <q-btn flat :class="{'text-primary': order==='created'}" @click="sort('created')">최신순</q-btn>
      <q-separator vertical />
      <q-btn flat :class="{'text-primary': order==='recommend'}" @click="sort('recommend')">추천순</q-btn>
      <q-separator vertical />
      <q-btn flat :class="{'text-primary': order==='area_exclusive'}" @click="sort('area_exclusive')">면적순</q-btn>
      <q-separator vertical />
      <q-btn flat :class="{'text-primary': order==='price_string'}" @click="sort('price_string')">가격순</q-btn>

      <q-btn
        flat
        class="absolute-right"
        :text-color="isEdit ? 'primary' : 'dark'"
        @click="edit()"
        v-if="!hideEdit"
      >
        <q-icon size="24px" style="margin-right: 3px;">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.4001 10.59V9.16998C17.4001 8.66998 17.0401 8.24998 16.5501 8.17998H16.5401C16.2001 7.42998 16.1001 7.19998 15.7601 6.45998L15.7701 6.43998C16.0301 6.03998 15.9801 5.51998 15.6401 5.17998L14.6401 4.17998C14.2901 3.82998 13.7301 3.78998 13.3401 4.07998L13.3301 4.08998C12.5701 3.79998 12.3301 3.70998 11.5701 3.41998V3.39998C11.4701 2.93998 11.0601 2.59998 10.5901 2.59998H9.1701C8.6701 2.59998 8.2501 2.95998 8.1801 3.44998V3.45998C7.4301 3.79998 7.2001 3.89998 6.4601 4.23998L6.4401 4.21998C6.0401 3.95998 5.5201 4.00998 5.1801 4.34998L4.1801 5.34998C3.8301 5.69998 3.7901 6.25998 4.0801 6.64998L4.0901 6.65998C3.8001 7.41998 3.7101 7.65998 3.4201 8.41998L3.4001 8.42998C2.9401 8.52998 2.6001 8.93998 2.6001 9.40998V10.83C2.6001 11.33 2.9601 11.75 3.4501 11.82C3.7901 12.57 3.8901 12.8 4.2301 13.55L4.2201 13.57C3.9601 13.97 4.0101 14.49 4.3501 14.83L5.3501 15.83C5.7001 16.18 6.2601 16.22 6.6501 15.93C7.4201 16.22 7.6501 16.31 8.4201 16.6V16.62C8.5201 17.08 8.9301 17.42 9.4001 17.42H10.8201C11.3201 17.42 11.7401 17.06 11.8101 16.57V16.56C12.5601 16.22 12.7801 16.12 13.5301 15.79L13.5501 15.8C13.9501 16.06 14.4701 16.01 14.8101 15.67L15.8101 14.67C16.1601 14.32 16.2001 13.76 15.9101 13.37L15.9001 13.36C16.1901 12.6 16.2801 12.36 16.5701 11.6L16.6001 11.59C17.0701 11.47 17.4001 11.06 17.4001 10.59Z"
              :stroke="isEdit ? '#D32C00' : '#707070'"
              stroke-width="1.2"
              stroke-miterlimit="10"
              stroke-linejoin="round"
            />
            <path
              d="M10.0001 12.4C11.3256 12.4 12.4001 11.3255 12.4001 9.99998C12.4001 8.67449 11.3256 7.59998 10.0001 7.59998C8.67461 7.59998 7.6001 8.67449 7.6001 9.99998C7.6001 11.3255 8.67461 12.4 10.0001 12.4Z"
              :stroke="isEdit ? '#D32C00' : '#707070'"
              stroke-width="1.2"
              stroke-miterlimit="10"
              stroke-linejoin="round"
            />
          </svg>
        </q-icon>
        {{ isEdit ? "편집완료" : "편집" }}
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    hideEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      order: 'created',
    }
  },
  computed: {
    houseCount() {
      if(this.$route.name === 'recently_seen') {
        return this.$store.getters.recently_viewed_houses.length
      }
      return this.$store.getters.interest_houses.length
    }
  },
  methods: {
    sort(order) {
      if(this.order === order) return
      this.order = order
      this.$emit("sort", this.order)
    },
    edit() {
      this.$emit("edit", !this.isEdit);
    }
  }
};
</script>

<style lang="scss" scoped>
.sort-header {
  height: 48px;
  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 48px;
    letter-spacing: -1.2px;
    color: #1a1a1a;
  }
}
.q-btn {
  font-size: 14px;
  line-height: 44px;
  text-align: center;
  letter-spacing: -1.05px;
  color: #707070;
}
.q-separator {
  margin-top: 20px;
  height: 14px;
}
</style>
