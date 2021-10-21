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
          <area-item
            :item="item"
            :query="{ sellid: item.id }"
            v-bind="{
              ctgr: item.category,
              type: item.type,
            }"
            :is_selected="isSelected(item.id)"
            :disabled="isEdit"
          ></area-item>
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
import { AreaItem } from "components/MapListSaleComponents";


export default {
  components: {
    "area-item": AreaItem,
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
      return this.selectedItems.some(item => item === id);
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
