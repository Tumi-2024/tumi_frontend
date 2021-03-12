<template>
  <section class="progress-section bg-white">
    <div class="title-heading notosanskr-medium">
      {{ title }}
    </div>

    <div class="info notosanskr-regular">
      <div v-for="(item, i) of items" :key="i" class="item row">
        <div
          class="title col-5"
          :class="{ 'text-primary': item.title == '준공인가' }"
        >
          {{ item.title }}
        </div>

        <div class="date col" v-if="item.date">
          <q-icon class="q-pr-sm" name="done" color="secondary" size="18px" />
          {{ item.date }}
        </div>
        <div class="row justify-start items-center" v-else>
          <div class="bg-dark q-ml-lg" style="height: 2px; width: 4px"></div>
          <q-icon name="horizontal_rule" size="20px" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: "",
    items: {
      type: Array,
      default: () => [{ title: "", date: "" }]
    }
  }
};
</script>

<style lang="scss" scoped>
.progress-section {
  padding: 24px 16px;
  .title-heading {
    font-weight: 500;
    font-size: 17px;
    line-height: 26px;
    letter-spacing: -1.275px;
    color: #1a1a1a;
  }
  .info {
    padding-top: 15px;
    .item {
      padding: 5px 0;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -1.05px;
      .title {
        color: #707070;
      }
      .date {
        display: flex;
        align-items: center;
        color: #1a1a1a;
      }
    }
  }
}
</style>
