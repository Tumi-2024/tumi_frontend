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
          <div class="row items-center q-pl-md q-pr-xs" v-if="isEdit">
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
            :name="item.address"
            :amount="item.amount"
            :tags="item.tags"
            :disabled="isEdit"
          />
        </div>
      </q-list>
    </q-card-section>

    <q-dialog v-model="isEdit" seamless position="bottom">
      <q-card class="modal">
        <q-card-section class="row notosanskr-medium">
          <div class="col q-px-xs">
            <q-btn
              color="grey-8"
              text-color="white"
              class=" full-width "
              label="전체선택"
              padding="0px"
              :disable="!items.length"
              @click="
                $emit(
                  'deleteItems',
                  items.map(x => x.id)
                )
              "
            />
          </div>
          <div class="col q-px-xs">
            <q-btn
              class="full-width select-delete"
              :class="{ active: selectedItems.length }"
              :disable="!selectedItems.length"
              label="전체선택"
              padding="0px"
              @click="$emit('deleteItems', selectedItems)"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import PropertyItem from "components/Utilities/PropertyItem";


export default {
  components: {
    "property-item": PropertyItem
  },
  mounted () {
    
  },
  data() {
    return {
      selectedItems: [],
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
  },
  watch: {
    isEdit(editValue) {
      !editValue && (this.selectedItems = []);
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  width: 100%;
  max-width: 1000px;
  height: 100%;
  background: transparent;
  box-shadow: none;
  .q-btn {
    font-weight: 500;
    font-size: 17px;
    line-height: 52px;
    text-align: center;
    letter-spacing: -1.275px;
    border-radius: 12px;
    text-shadow: none;

    &.select-delete {
      background: #e8e8e8;
      color: #a0a0a0;
    }
    &.active {
      background: #ff5100;
      color: aliceblue;
    }
  }
}
</style>
