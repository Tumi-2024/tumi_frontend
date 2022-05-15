<template>
  <q-card class="bg-white q-pb-xl">
    <q-card-section class="heading-title notosanskr-medium">
      관리비
    </q-card-section>

    <q-card-section class="q-py-none">
      <q-card class="admin-cost row q-mt-md" bordered>
        <q-card-section
          class="q-my-xs col-4"
          v-for="item in cost"
          :key="item.label"
        >
          <div class="full-width text-center value notosanskr-medium">
            {{ item.value }}
          </div>

          <div class="full-width text-center flex justify-center">
            <q-icon size="24px">
              <img :src="getImage(item.icon)" alt="" srcset="" />
            </q-icon>
            <div class="label notosanskr-regular">{{ item.label }}</div>
          </div>
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  props: {
    cost: {
      type: Array,
      default: () => [{ label: "", value: "", icon: "" }]
    }
  },
  methods: {
    getImage(name) {
      return require(`assets/icons/ActualTransaction/weather/${name}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.heading-title {
  font-size: 17px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
  line-height: 26px;
}
.admin-cost {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06),
    0px 0px 1px rgba(0, 0, 0, 0.04);
  border-radius: 12px;

  .value {
    font-weight: 500;
    font-size: 17px;
    line-height: 26px;
    text-align: center;
    letter-spacing: -1.275px;
    color: #1a1a1a;
  }

  .label {
    font-size: 13px;
    line-height: 24px;
    letter-spacing: -0.98px;
    color: #707070;
  }
}
</style>
