<template>
  <q-tabs class="full-width q-mt-md" align="justify">
    <q-route-tab
      class="q-py-xs"
      :name="tab.label"
      v-for="(tab, i) in tabs"
      :key="i"
      :to="tab.pathName"
      active-class="text-primary"
    >
      <img :src="require(`../../assets/icons/${tab.icon}`)" />
      <span class="item-label text-center nanum-square mt-md">
        {{ tab.label }}
      </span>
    </q-route-tab>
  </q-tabs>
</template>

<script>
import { loginModalMutation } from "src/components/Utilities/LoginModal/LoginModalState";

export default {
  data() {
    return {
      tabs: [
        {
          label: "최근매물",
          icon: "home-recently-viewed.svg",
          pathName: "recently-seen"
        },
        {
          label: "관심 매물",
          icon: "home-interest.svg",
          pathName: "property-interest"
        },
        {
          label: "관심지역",
          icon: "area-interest.svg",
          pathName: "area"
        }
        // {
        //   label: "연락한 매물",
        //   icon: "contacted-property.svg",
        //   pathName: "property_contacted"
        // }
      ]
    };
  },
  methods: {
    goTo(path) {
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
