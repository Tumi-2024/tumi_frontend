<template>
  <q-badge :class="badgeClass" class="">
    <q-icon v-if="icon">
      <img :src="icon" alt="" srcset="" />
    </q-icon>
    <slot name="label">
    {{value}}
    </slot>
  </q-badge>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    icon: {
      type: String
    },
    pyeong: {
      type: Boolean
    },
    recommend: {
      type: Boolean
    },
    redevelopment: {
      type: Boolean
    },
    price: {
      type: Boolean
    },
    date: {
      type: Boolean
    }

  },
  data() {
    return {
      badgeClass: ''
    }
  },
  mounted() {
    switch (true) {
      case this.houseType:
        this.badgeClass = 'text-white bg-primary'
        break;
      case this.pyeong:
        this.badgeClass = 'text-white bg-green'
        break;
      case this.recommend:
        this.badgeClass = 'text-primary bg-white'
        break;
      case this.redevelopment:
        this.badgeClass = 're-develop bg-white'
        break;
      case this.price:
        this.badgeClass = 'bg-blue'
        break;
      case this.date:
        this.badgeClass = 'date text-white bg-black'
        break;
      default:
        this.badgeClass = ''
    }
  }
}
</script>
<style lang="scss">
.q-badge {
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: -0.9px;
}
</style>
