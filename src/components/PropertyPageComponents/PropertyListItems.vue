<template>
  <q-card flat class="q-mt-sm" style="margin-top: 0px;">
    <q-card-section class="list-items q-pa-none">
      <q-list class="q-pt-md">
        <div
          v-for="(item, i) of items"
          :key="i"
          class="row"
          @click="setSelected(item.id)"
        >
          <div class="row items-center q-px-md" v-if="isEdit">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="10"
                cy="10"
                r="9.5"
                fill="white"
                :stroke="isSelected(item.id)"
              />
              <circle cx="10" cy="10" r="6" :fill="isSelected(item.id)" />
            </svg>
          </div>
          <property-item
            class="col"
            :name="item.name"
            :amount="item.amount"
            :tags="item.tags"
            :disabled="isEdit"
          />
        </div>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import PropertyItem from "components/Utilities/PropertyItem";
export default {
  components: {
    "property-item": PropertyItem
  },
  data() {
    return {
      selectedItems: []
    };
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setSelected(id) {
      const checkSelected = this.selectedItems.find(item => item === id);
      if (checkSelected) {
        this.selectedItems = this.selectedItems.filter(x => x !== id);
      } else {
        this.selectedItems.push(id);
      }
    },
    isSelected(id) {
      const checkSelected = this.selectedItems.find(item => item === id);
      return checkSelected ? "#FF7D36" : "#D5D5D5";
    }
  }
};
</script>

<style lang="scss" scoped></style>
