<template>
  <q-card flat>
    <q-card-section class="list-items q-pa-none">
      <q-card-section class="list-items q-pa-none notosanskr-regular">
        <div style="display: flex; gap: 2px" class="q-pa-sm">
          <Badge value="개발유형" recommend />
          <Badge value="주택유형" houseType />
          <Badge value="전용면적" pyeong />
          <Badge value="희망매매가" price />
          <Badge value="매물수정일자" date />
        </div>
        <q-separator />
        <q-list>
          <div v-for="(item, i) of simple_houses" :key="i">
            <area-item-house
              class="q-py-sm"
              :query="{ sellid: item.id }"
              v-bind="{ item: item }"
            />
            <q-separator />
          </div>
        </q-list>
      </q-card-section>
      <q-list class="q-pt-md">
        <div
          style="width: 100%; display: flex"
          v-for="(item, i) of items"
          :key="i"
          @click.stop="setSelected(item.id)"
        >
          <q-checkbox v-show="isEdit" v-model="selectedItems" :val="item.id" />
          <area-item-house
            :item="item"
            :query="{ sellid: item.id }"
            v-bind="{
              ctgr: item.category,
              type: item.type
            }"
            :is_selected="isSelected(item.id)"
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
              class="full-width select-delete"
              :class="{ active: selectedItems.length }"
              :disable="!selectedItems.length"
              label="선택 삭제"
              padding="0px"
              @click="$emit('deleteItems', selectedItems)"
            />
          </div>
          <div class="col q-px-xs">
            <q-btn
              color="grey-8"
              text-color="white"
              class="full-width"
              label="전체 삭제"
              padding="0px"
              :disable="!items.length"
              @click="deleteAllItems"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { AreaItemHouse } from "components/MapListSaleComponents";
import Badge from "../Utilities/Badges/Badge.vue";

export default {
  components: {
    "area-item-house": AreaItemHouse,
    Badge
  },
  mounted() {},
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
      const checkSelected = this.selectedItems.find((item) => item === id);
      if (checkSelected) {
        this.selectedItems = this.selectedItems.filter((x) => x !== id);
      } else {
        this.selectedItems.push(id);
      }
    },
    isSelected(id) {
      return this.selectedItems.some((item) => item === id);
    },
    deleteAllItems() {
      this.$q
        .dialog({
          title: "관심 매물 삭제",
          message: "관심 매물을 전체 삭제하시겠습니까?",
          ok: "확인",
          cancel: "취소"
        })
        .onOk(() => {})
        .onCancel(() => {
          // this.$emit(
          //   "deleteItems",
          //   this.items.map((x) => x.id)
          // );
        });
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
