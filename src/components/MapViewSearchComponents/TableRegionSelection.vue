<template>
  <q-card class="my-card" flat>
    <q-card-section class="q-px-md row notosanskr-regular" v-if="showSubCities">
      <div
        class="item-container col-4"
        v-for="(item, i) of Object.keys(data)"
        :key="i"
        :hidden="isVisible(data[item])"
      >
        <q-btn
          flat
          class="full-width full-height"
          @click="itemSelected(data[item])"
          :text-color="
            selected && selected.title == data[item].title ? 'primary' : 'black'
          "
        >
          {{ data[item].title }}
        </q-btn>
      </div>
    </q-card-section>
    <q-card-section class="row justify-center items-center" v-else>
      <div>No Available Locations</div>
    </q-card-section>
    <button-bottom
      :modal="buttonBottom"
      :title="buttonBottomTitle"
      @click="$emit('visit', selected)"
    ></button-bottom>
  </q-card>
</template>

<script>
import ButtonBottom from "./ButtonBottom";
export default {
  components: {
    ButtonBottom
  },
  data() {
    return {
      // listFirst: listFirst,
      // listSecond: listSecond,
      // listThird: listThird,
      // listDisplayed: [],
      selected: null,
      buttonBottom: false,
      buttonBottomTitle: "",
      showSubCities: true
    };
  },
  props: {
    data: Object,
    hideNoCoords: {
      type: Boolean,
      default: false
    },
    showButtonBottom: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (!this.data) {
      this.$router.push({ name: "map_city" });
    }
  },
  methods: {
    itemSelected(value) {
      this.selected = value;
      this.$emit("select", value);
      if (this.showButtonBottom) {
        this.buttonBottomTitle = `Visit ${value.title}`;
        this.buttonBottom = true;
      }
    },
    isVisible(value) {
      if (this.hideNoCoords) {
        return value.latitude == null && value.longitude == null;
      }
    }
  },
  watch: {
    data(newValue) {
      if (!this.hideNoCoords) {
        this.showSubCities = true;
        return;
      }
      this.showSubCities = false;
      for (const key in newValue) {
        if (Object.hasOwnProperty.call(newValue, key)) {
          const subCity = newValue[key];
          if (subCity.latitude != null && subCity.longitude != null) {
            this.showSubCities = true;
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
q-btn {
  font-size: 16px;
  line-height: 52px;
  text-align: center;
  letter-spacing: -1.2px;
  color: #1a1a1a;
}
.item-container {
  min-height: 52px;
  border: 1px solid rgba(86, 61, 124, 0.2);
}
</style>
