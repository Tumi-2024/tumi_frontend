export default {
  data() {
    return {
      properties: []
    };
  },
  methods: {
    deleteItems(items = []) {
      items.forEach(id => {
        this.properties = this.properties.filter(item => item.id !== id);
      });
    },
    getCountType(type) {
      return this.$store.getters.recently_viewed_houses.filter(item => item.group_building_house.type_house === type).length;
    },
    async getProperties(order) {
      await this.$store.dispatch('getRecentlyViewedHouses', order);
      return this.$store.getters.recently_viewed_houses
    },
    filter(keyword) {
      if (keyword === 'all') {
        this.properties = this.$store.getters.recently_viewed_houses
        return
      }
      this.properties = this.$store.getters.recently_viewed_houses.filter(house => house.type_house === keyword)
    }
  },
  async mounted() {
    this.properties = await this.getProperties('created')
  }
};
