<template>
  <q-card flat class="q-mt-sm" style="margin-top: 0px">
    <q-card-section class="list-items q-pa-none">
      <q-list>
        <q-item
          class="q-my-md items-center"
          clickable
          v-ripple
          v-for="(item, i) of items"
          :key="i"
          @click.stop="setSelected(item)"
        >
          <q-checkbox v-show="isEdit" v-model="selectedItems" :val="item.id" />
          <span style="font-size: 16px; flex-basis: 200px" class="q-tex">
            {{ item.title }}
          </span>
          <div class="q-pa-sm row">
            <div class="col-md-6 col-12">
              <span
                style="
                  font-size: 14px;
                  color: #1a1a1a;
                  margin-right: 8px;
                  font-weight: 700;
                "
              >
                개발 세부유형
              </span>
              재개발 예정지 (건축허가제한)
            </div>
            <div class="col-md-6 col-12">
              <span
                style="
                  font-size: 14px;
                  color: #1a1a1a;
                  margin-right: 8px;
                  font-weight: 700;
                "
              >
                사업추진단계
              </span>
              조합설립인가
            </div>
            <div class="col-6">
              <span
                style="
                  font-size: 14px;
                  color: #1a1a1a;
                  margin-right: 8px;
                  font-weight: 700;
                "
              >
                건립 예상세대 수
              </span>
              2383
            </div>
            <div class="col-6">
              <span
                style="
                  font-size: 14px;
                  color: #1a1a1a;
                  margin-right: 8px;
                  font-weight: 700;
                "
              >
                조합원 수
              </span>
              414
            </div>
            <div style="flex-basis: 100%" class="q-mt-md">
              <span
                style="
                  font-size: 14px;
                  color: #1a1a1a;
                  margin-right: 8px;
                  font-weight: 700;
                "
              >
                주소
              </span>
              <span class="text-body2">
                {{ item.address }}
              </span>
            </div>
          </div>
          <q-separator />
        </q-item>
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
import { mapActions } from "vuex";

export default {
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
    ...mapActions("map", ["changeMapCenter", "setMapZoom"]),
    setSelected({ latitude, longitude }) {
      if (!this.isEdit) {
        // this.changeMapCenter({ lat: Number(latitude), lng: Number(longitude) });
        this.setMapZoom(17);
        this.$router.push({ name: "map_city" });
      }
    },
    isSelected(id) {
      return this.selectedItems.some((item) => item === id);
    },
    deleteAllItems() {
      this.$q
        .dialog({
          title: "관심 지역 삭제",
          message: "관심 지역을 전체 삭제하시겠습니까?",
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
