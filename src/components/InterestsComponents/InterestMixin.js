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
      return this.$store.getters.recently_viewed_houses.filter(item => item.type_house === type).length;
    },
    async getProperties(order) {
      await this.$store.dispatch('getInterestHouses');
      return this.$store.getters.interest_houses
    },
    filter(keyword) {
      if (keyword === 'all') {
        this.properties = this.$store.getters.interest_houses
        return
      }
      this.properties = this.$store.getters.interest_houses.filter(house => house.type_house === keyword)
    }
  },
  async mounted() {
    this.properties = await this.getProperties('created')
  }
};
