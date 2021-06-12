<template>
  <div class="row q-mb-md">
    <div class="col-5 label-info">
      <span :class="{ 'list-hightlight': highlight }">
        {{ label }}
      </span>
    </div>
    <div class="col field-info">
      <span v-if="value">{{ value }}</span>
      <q-icon v-else size="14px">
        <img src="~/assets/icons/empty.svg" />
      </q-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    value: {},
    highlight: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
// .title-heading {
//   font-family: "notosanskr-bold";
//   font-style: normal;
//   font-weight: 500;
//   font-size: 17px;
//   line-height: 26px;
//   letter-spacing: -1.275px;
//   color: #1a1a1a;
// }

.list-hightlight {
  color: #ff5100;
}

.label-info {
  font-family: "notosanskr-regular";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: -1.05px;
  color: #707070;
}

.field-info {
  font-family: "notosanskr-regular";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: -1.05px;
  color: #1a1a1a;
}
</style>
