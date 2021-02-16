<template>
  <q-dialog v-model="dialogPropertyInfo" position="bottom">
    <q-card class="notosanskr-regular">
      <q-card-section class="header-title bg-white notosanskr-medium">
        찾아볼 매물 정보
      </q-card-section>

      <q-card-section class="row bg-white q-pa-none notosanskr-medium">
        <div v-for="(item, i) of properties" :key="i" class="col-3">
          <q-btn
            flat
            padding="12px 0"
            class="full-width"
            @click="() => (dialogPropertyInfo = false)"
          >
            <q-icon size="56px">
              <img :src="require(`assets/icons/${item.iconSrc}`)" alt="icon" />
            </q-icon>
            <div class="col-12">
              {{ item.title }}
            </div>
          </q-btn>
        </div>
      </q-card-section>

      <q-card-section class="bg-white">
        <q-btn
          color="primary"
          unelevated
          text-color="positive"
          label="정보 조회하기"
          class="btn-retrieving-info full-width notosanskr-medium"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogPropertyInfo: false,
      properties: [
        {
          title: "실거래가 조회",
          iconSrc: "PropertyInfoDialog/actual-transaction-price.svg"
        },
        {
          title: "재개발 매물",
          iconSrc: "PropertyInfoDialog/redevelopment-forsale.svg"
        },
        {
          title: "아파트매물",
          iconSrc: "PropertyInfoDialog/apartment-forsale.svg"
        },
        {
          title: "재개발 구역 정보",
          iconSrc: "PropertyInfoDialog/redevelopment-area-info.svg"
        },
        {
          title: "부동산 인사이트",
          iconSrc: "PropertyInfoDialog/real-estate-insight.svg"
        }
      ]
    };
  },
  methods: {
    showDialog() {
      this.dialogPropertyInfo = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.q-dialog {
  .q-card {
    width: 100%;
    max-width: 1000px;
    height: auto;
    border-radius: 16px 16px 0 0;
    background: #f0f0f0;
    .empty-bottom-space {
      height: 200px;
    }

    .header-title {
      font-weight: 500;
      font-size: 17px;
      line-height: 26px;
      letter-spacing: -1.2px;
      color: #1a1a1a;
    }

    .btn-retrieving-info {
      font-weight: 500;
      font-size: 17px;
      line-height: 52px;
      text-align: center;
      letter-spacing: -1.275px;
      border-radius: 12px;
    }
  }
}
</style>
