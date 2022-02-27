<template>
  <q-card-section>
    <text-under-highlight text="담당자" />
    <!-- selection of choices | 선택의 선택 -->
    <div class="selection row q-mt-lg items-center">
      <q-tree
        class="col-12 row wrap"
        :nodes="getTeamTree"
        node-key="label"
        tick-strategy="leaf"
        :ticked.sync="ticked"
        default-expand-all
      />
    </div>
  </q-card-section>
</template>

<script>
import TextUnderHighlight from "components/Utilities/TextUnderHighlight";
import Vue from "vue";
import { mapGetters } from "vuex";

import { Cookies } from "quasar";

export default {
  components: {
    "text-under-highlight": TextUnderHighlight
  },
  computed: {
    ...mapGetters("searchQuery", ["getQueryString", "getQuery"]),
    getTeamTree() {
      return this.teamsData.map(obj => {
        return {
          label: obj.title,
          children: obj.users.map(obj => {
            return { label: obj.name };
          })
        };
      });
    }
  },
  async created() {
    const { data } = await Vue.prototype.$axios.get(`/teams/users/`);
    this.teamsData = data;

    const index = Cookies.get("tumi_i");
    const { data: userData } = await Vue.prototype.$axios.get(
      `/users/${index}/`
    );
    this.ticked = [userData.name];
  },
  data() {
    return {
      teamsData: [],
      ticked: ["테스트"],
      expanded: []
    };
  },
  methods: {}
};
</script>

<style lang="scss">
.q-tree__node {
  flex: calc(100% / 3) 0;
  flex-basis: calc(100% / 3);
}
</style>
