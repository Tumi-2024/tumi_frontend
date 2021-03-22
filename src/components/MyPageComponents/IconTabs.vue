<template>
  <q-card-section class="full-width row q-pa-none q-px-md">
    <!-- icon tabs -->
    <div
      v-for="(tab, i) in tabs"
      :key="i"
      class="items col-3 row items-center justify-center"
    >
      <q-btn
        flat
        ripple
        padding="0px"
        @click="goTo(tab.pathName)"
        class="q-py-xs"
      >
        <q-icon size="44px" class="col-12">
          <img :src="require(`../../assets/icons/${tab.icon}`)" />
        </q-icon>
        <div class="item-label col-12 text-center notosanskr-medium">
          {{ tab.label }}
        </div>
      </q-btn>
    </div>
  </q-card-section>
</template>

<script>
import {
  loginModalMutation,
  loginModalStore
} from "src/components/Utilities/LoginModal/LoginModalState";

export default {
  data() {
    return {
      tabs: [
        {
          label: "최근 본 매물",
          icon: "home-recently-viewed.svg",
          pathName: "recently_seen"
        },
        {
          label: "관심지역",
          icon: "area-interest.svg",
          pathName: "area"
        },
        {
          label: "관심매물",
          icon: "home-interest.svg",
          pathName: "property_interest"
        },
        {
          label: "연락한 매물",
          icon: "contacted-property.svg",
          pathName: "property_contacted"
        }
      ]
    };
  },
  methods: {
    goTo(path) {
      console.log(this.$store.state.user.data);
      if (this.$store.state.user.data && this.$store.state.user.data.id) {

        this.$router.push({ name: path });
      } else {
        this.setModal();
      }
    },
    setModal() {
      loginModalMutation.setModal();
    }
  }
};
</script>

<style lang="scss" scoped>
.items {
  padding-bottom: 28px;
  .item-label {
    padding-top: 14px;
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    text-align: center;
    letter-spacing: -0.975px;
    color: #1a1a1a;
  }
}
</style>
