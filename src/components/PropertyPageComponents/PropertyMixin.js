import { toKr } from 'src/utils'

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
    getCountOfficetels() {
      return this.$store.getters.recently_viewed_houses.filter(item =>
        toKr(item.type_house) === "오피스텔").length;
    },
    getCountApartment() {
      return this.$store.getters.recently_viewed_houses.filter(item => toKr(item.type_house) === "아파트").length;
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
