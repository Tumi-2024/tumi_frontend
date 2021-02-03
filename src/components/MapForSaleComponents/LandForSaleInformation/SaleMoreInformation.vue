<template>
  <q-card-section>
    <div
      v-for="(list, key) in MoreInformationList"
      :key="key"
      class="row q-mb-md"
    >
      <div class="col-5 label-info">
        <span :class="{ 'list-hightlight': list.highlight }">
          {{ list.label }}
        </span>
      </div>
      <div class="col field-info">
        <q-icon v-if="!list.value" size="14px" />
        <span v-if="list.value">{{ list.value }}</span>
        <q-icon v-else size="14px">
          <img src="~/assets/icons/empty.svg" />
        </q-icon>
      </div>
    </div>
  </q-card-section>
</template>

<script>
export default {
  data() {
    return {
      MoreInformationList: [
        {
          label: "거래유형",
          value: "토지매매"
        },
        {
          label: "대지면적",
          value: "2,275㎡ (688평)"
        },
        {
          label: "건물면적",
          value: "375㎡ (113평)"
        },
        {
          label: "공용면적",
          value: null
        },
        {
          label: "용도지역",
          value: "일반상업"
        },
        {
          label: "지목",
          value: "대"
        },
        {
          label: "이용상황",
          value: "상업용"
        },
        {
          label: "공지시가",
          value: "2천 115만"
        },
        {
          label: "도로접면",
          value: "세로한면(불)"
        },
        {
          label: "지세",
          value: "평지"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.title-heading {
  font-family: "notosanskr-bold";
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}

.list-hightlight {
  color: #ff5100;
}

.label-info {
  font-family: "notosanskr-regular";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: -1.05px;
  color: #707070;
}

.field-info {
  font-family: "notosanskr-regular";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: -1.05px;
  color: #1a1a1a;
}
</style>
