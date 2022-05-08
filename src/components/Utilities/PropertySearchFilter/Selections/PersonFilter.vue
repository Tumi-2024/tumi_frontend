<template>
  <q-card-section>
    <text-under-highlight text="담당자" />
    <!-- selection of choices | 선택의 선택 -->
    <div class="selection row q-mt-lg items-center">
      <q-tree
        class="col-12 row wrap"
        :nodes="getTeamTree"
        node-key="id"
        label-key="label"
        tick-strategy="leaf"
        :ticked.sync="ticked"
        default-expand-all
        @update:ticked="onTicked"
      />
    </div>
  </q-card-section>
</template>

<script>
import TextUnderHighlight from "components/Utilities/TextUnderHighlight";
import Vue from "vue";
import { mapGetters } from "vuex";

export default {
  components: {
    "text-under-highlight": TextUnderHighlight
  },
  computed: {
    ...mapGetters("searchQuery", ["getQueryString", "getQuery", "getOption"]),
    getTeamTree() {
      return this.teamsData.map((obj) => {
        return {
          label: obj.title,
          id: `team-${obj.id}`,
          children: obj.users.map((obj2) => {
            return { label: obj2.name, id: obj2.id };
          })
        };
      });
    }
  },
  async created() {
    const { data } = await Vue.prototype.$axios.get(`/teams/users/`);
    this.teamsData = data;

    // const index = Cookies.get("tumi_i");
    // const { data: userData } = await Vue.prototype.$axios.get(
    //   `/users/${index}/`
    // );
    this.ticked = this.getOption("users");
  },
  data() {
    return {
      teamsData: [],
      ticked: [],
      expanded: []
    };
  },
  methods: {
    onTicked(values) {
      this.$emit("select", values, "users");
    }
  }
};
</script>

<style lang="scss">
.q-tree__node {
  flex: calc(100% / 3) 0;
  flex-basis: calc(100% / 3);
}
</style>
