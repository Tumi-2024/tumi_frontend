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
        :expanded.sync="expanded"
        default-expand-all
      />
    </div>
  </q-card-section>
</template>

<script>
import TextUnderHighlight from "components/Utilities/TextUnderHighlight";
import Vue from 'vue'
import { mapGetters } from "vuex";
export default {
  components: {
    "text-under-highlight": TextUnderHighlight
  },
  computed: {
    ...mapGetters("searchQuery", ["getQueryString", "getQuery"]),
    getTeamTree () {
      return this.teamsData.map(obj => {
        return {
          label: obj.title,
          children: obj.users.map(obj => {
            return { label: obj.username }
          })
        }
      })
    }
  },
  async created() {
    const { data } = await Vue.prototype.$axios
      .get(`/teams/`)
    this.teamsData = data.results
    console.log(this.teamsData, 'teams')
  },
  data() {
    return {
      teamsData: [],
      ticked: [],
      expanded: [],
      selected: [],
      simple: [
        {
          label: "1팀",
          children: [
            {
              label: "투미 1번"
            },
            {
              label: "투미 2번"
            },
            {
              label: "투미 3번"
            }
          ]
        },
        {
          label: "2팀",
          children: [
            {
              label: "투미 5번"
            },
            {
              label: "투미 6번"
            },
            {
              label: "투미 7번"
            },
            {
              label: "투미 8번"
            }
          ]
        },
        {
          label: "3팀",
          children: [
            {
              label: "투미 35번"
            },
            {
              label: "투미 36번"
            },
            {
              label: "투미 37번"
            },
            {
              label: "투미 38번"
            }
          ]
        },
        {
          label: "4팀",
          children: [
            {
              label: "투미 45번"
            },
            {
              label: "투미 46번"
            },
            {
              label: "투미 47번"
            },
            {
              label: "투미 48번"
            }
          ]
        },
        {
          label: "5팀",
          children: [
            {
              label: "투미 55번"
            },
            {
              label: "투미 56번"
            },
            {
              label: "투미 57번"
            },
            {
              label: "투미 58번"
            }
          ]
        }
      ]
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
