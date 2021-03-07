export default {
  data() {
    return {
      propertyItems: [
        {
          id: 1,
          tags: {
            type: "오피스텔",
            recommended: "투미추천 급매",
            date: "20.10.12"
          },
          name: "종로1가 대성스카이렉스",
          amount: "보증금 5천 6백만 / 월세 120만"
        },
        {
          id: 2,
          tags: {
            type: "아파트",
            date: "20.10.12"
          },
          name: "종로1가 대성스카이렉스",
          amount: "매매 6억 5,500만"
        },
        {
          id: 3,
          tags: {
            type: "아파트",
            redevelopment: true,
            date: "20.10.12"
          },
          name: "종로1가 대성스카이렉스",
          amount: "매매 6억 5천만"
        },
        {
          id: 4,
          tags: {
            type: "아파트",
            date: "20.10.12"
          },
          name: "종로1가 대성스카이렉스",
          amount: "매매 6억 5,500만"
        },
        {
          id: 5,
          tags: {
            type: "오피스텔",
            date: "20.10.12"
          },
          name: "종로1가 대성스카이렉스",
          amount: "매매 6억 5,500만"
        }
      ]
    };
  },
  methods: {
    deleteItems(items = []) {
      items.forEach(id => {
        this.propertyItems = this.propertyItems.filter(item => item.id !== id);
      });
    },
    getCountOfficetels() {
      return this.propertyItems.filter(x => x?.tags?.type === "오피스텔")
        .length;
    },
    getCountApartment() {
      return this.propertyItems.filter(x => x?.tags?.type === "아파트").length;
    }
  }
};
