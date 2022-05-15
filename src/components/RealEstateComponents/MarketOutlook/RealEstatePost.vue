<template>
  <q-card flat class="q-mt-sm" v-if="item">
    <q-card-section class="card-section" style="" @click="go()">
      <div class="title">#최근 게시글</div>

      <div class="content">
        <div class="row area-title">
          <img class="img" src="~assets/icons/real_estate_orange.svg" />
          <div class="date">투미부동산</div>
          <div class="line"></div>
          <div class="value">{{ item.completed_at }}</div>
        </div>

        <div class="row area-description">
          {{ item.title }}
        </div>

        <div class="row area-background">
          <q-img
            class="img-background"
            :src="image"
            native-context-menu
            alt="Logo"
            basic
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "RealEstatePost",
  props: {
    item: Object
  },
  computed: {
    image() {
      return this.item.image;
    }
  },
  methods: {
    go() {
      this.$router.push({
        name: "insight_content",
        params: { id: this.item.id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.q-mt-sm {
  background: #e8e8e8;
  margin-top: -8px;
  border-radius: 0;
  padding-top: 24px;
  padding-bottom: 24px;
  padding-left: 16x;
  padding-right: 16x;
}

.card-section {
  height: 326px;
  margin-bottom: 24px;
  .title {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -1.2px;
    color: #1a1a1a;
  }
  .content {
    margin-top: 16px;
    height: 286px;
    background: #ffffff;
    border-radius: 5px;
  }
}

.area-title {
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.98px;
  color: #909090;
  margin-top: 8px;
  margin-left: 16px;
  margin-right: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
  img.img {
    margin-right: 5px;
  }
  div.date {
    padding-right: 4px;
  }
  div.line {
    border-right: 1px solid #e8e8e8;
    height: 12px;
    margin-top: 4px;
  }
  div.value {
    padding-left: 4px;
  }
}

.area-description {
  font-weight: 500;
  font-size: 17px;
  line-height: 24px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
  margin-left: 16px;
  margin-right: 16px;
  padding-bottom: 16px;
}

.area-background {
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.98px;
  color: #909090;
  margin-left: 16px;
  margin-right: 16px;
  padding-bottom: 16px;
  .img-background {
    background: #3a3a3a;
    height: 156px;
    max-width: 100%;
    border-radius: 7px;
  }
}
</style>
