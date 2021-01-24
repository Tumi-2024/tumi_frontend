<template>
  <div>
    <div v-if="title" class="title-heading q-mb-lg">
      {{ title }}
    </div>
    <div v-for="(list, key) in payload" :key="key" class="row q-mb-md">
      <div class="col-5 label-info">
        <span :class="{ 'list-hightlight': list.highlight }">{{ list.label }}</span>
      </div>
      <div class="col field-info">
        <q-icon v-if="list.value && isIcon" size="16px">
          <img src="~/assets/icons/check.svg" />
        </q-icon>
        <q-icon v-if="!(list.value)" size="14px" />
        <span v-if="list.value">{{ list.value }}</span>
        <q-icon v-else size="14px">
          <img src="~/assets/icons/empty.svg" />
        </q-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isIcon: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      default: () => null
    },
    payload: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.title-heading {
  font-family: 'notosanskr-bold';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  letter-spacing: -1.275px;
  color: #1A1A1A;
}

.list-hightlight {
  color: #FF5100;
}

.label-info {
  font-family: 'notosanskr-regular';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: -1.05px;
  color: #707070;
}

.field-info {
  font-family: 'notosanskr-regular';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: -1.05px;
  color: #1A1A1A;
}

</style>
