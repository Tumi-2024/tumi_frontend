<template>
  <q-card flat>
    <q-card-section>
        <div class="heading-title">토지 매물정보</div>
    </q-card-section>

    <q-card-section>
      <div class="row q-mb-md">
        <q-btn flat class="col-3 information-btn ">
          <div class="column justify-center content-center items-center">
            <q-icon size="32px">
              <img src="~/assets/icons/LandForSaleInformationIcons/land_area.svg"/>
            </q-icon>
            <div class="title q-mt-sm">2,275㎡</div>
            <div class="sub-title q-mt-xs">대지면적</div>
          </div>
        </q-btn>

        <q-btn flat class="col-3 information-btn ">
          <div class="column justify-center content-center items-center">
            <q-icon size="32px">
              <img src="~/assets/icons/LandForSaleInformationIcons/building_area.svg"/>
            </q-icon>
            <div class="title q-mt-sm">2,275㎡</div>
            <div class="sub-title q-mt-xs">대지면적</div>
          </div>
        </q-btn>

        <q-btn flat class="col-3 information-btn ">
          <div class="column justify-center content-center items-center">
            <q-icon size="32px">
              <img src="~/assets/icons/LandForSaleInformationIcons/rent.svg"/>
            </q-icon>
            <div class="title q-mt-sm">
              <q-icon size="20px">
                <img src="~/assets/icons/empty.svg" />
              </q-icon>
            </div>
            <div class="sub-title q-mt-xs">대지면적</div>
          </div>
        </q-btn>

        <q-btn flat class="col-3 information-btn ">
          <div class="column justify-center content-center items-center">
            <q-icon size="32px">
              <img src="~/assets/icons/LandForSaleInformationIcons/completion.svg"/>
            </q-icon>
            <div class="title q-mt-sm">2,275㎡</div>
            <div class="sub-title q-mt-xs">대지면적</div>
          </div>
        </q-btn>
      </div>

      <!-- <div class="row justify-center q-mt-sm">
        <div class="col-12">
          <q-btn color="primary" class="full-width bottom-btn" label="전화로 문의하기" />
        </div>
      </div> -->
    </q-card-section>
    <q-separator inset color="white" class="broken-separator" />
    <q-card-section>
      <div class="row">
        <q-btn flat class="col-3 information-btn ">
          <div class="column justify-center content-center items-center">
            <q-icon size="32px">
              <img src="~/assets/icons/LandForSaleInformationIcons/building_area.svg"/>
            </q-icon>
            <div class="title q-mt-sm">2,275㎡</div>
            <div class="sub-title q-mt-xs">대지면적</div>
          </div>
        </q-btn>

        <q-btn flat class="col-3 information-btn ">
          <div class="column justify-center content-center items-center">
            <q-icon size="32px">
              <img src="~/assets/icons/LandForSaleInformationIcons/rent.svg"/>
            </q-icon>
            <div class="title q-mt-sm">
              <q-icon size="20px">
                <img src="~/assets/icons/empty.svg" />
              </q-icon>
            </div>
            <div class="sub-title q-mt-xs">대지면적</div>
          </div>
        </q-btn>

        <q-btn flat class="col-3 information-btn ">
          <div class="column justify-center content-center items-center">
            <q-icon size="32px">
              <img src="~/assets/icons/LandForSaleInformationIcons/completion.svg"/>
            </q-icon>
            <div class="title q-mt-sm">2,275㎡</div>
            <div class="sub-title q-mt-xs">대지면적</div>
          </div>
        </q-btn>
      </div>
    </q-card-section>

    <q-separator spaced />

    <q-card-section>
      <PlaceInformationList :payload="listPayload" />
    </q-card-section>
  </q-card>
</template>

<script>
import PlaceInformationList from './PlaceInformationList'

export default {
  name: 'land-for-sale-information',
  props: {
  },
  data() {
    return {
      listPayload: [
        {
          label: '거래유형',
          value: '토지매매'
        },
        {
          label: '대지면적',
          value: '2,275㎡ (688평)'
        },
        {
          label: '건물면적',
          value: '375㎡ (113평)'
        },
        {
          label: '공용면적',
          value: null
        },
        {
          label: '용도지역',
          value: '일반상업'
        },
        {
          label: '지목',
          value: '대'
        },
        {
          label: '이용상황',
          value: '상업용'
        },
        {
          label: '공지시가',
          value: '2천 115만'
        },
        {
          label: '도로접면',
          value: '세로한면(불)'
        },
        {
          label: '지세',
          value: '평지'
        }
      ]
    }
  },
  components: {
    PlaceInformationList
  }
}
</script>

<style lang="scss" scoped>
.heading-title {
  font-family:'notosanskr-medium';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  letter-spacing: -1.275px;
  color: #1A1A1A;
}

.information-btn {
  height: 88px;

  .title {
    font-family: 'notosanskr-medium';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -1.2px;
    color: #1A1A1A;
  }
  .sub-title {
    font-family: 'notosanskr-medium';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    /* identical to box height, or 154% */

    text-align: center;
    letter-spacing: -0.975px;

    /* Font/30 */

    color: #707070;
  }
}

.bottom-btn {
  height: 52px;
  border-radius: 12px;
  font-family: 'notosanskr-medium';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  text-align: center;
  letter-spacing: -1.25px;
  color: #FFFFFF;
}

.broken-separator {
  border: 1px dashed #E8E8E8; box-sizing: border-box;
}
</style>
