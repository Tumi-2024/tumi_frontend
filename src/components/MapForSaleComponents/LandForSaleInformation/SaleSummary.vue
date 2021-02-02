<template>
  <q-card-section>
    <div class="row q-mb-md bg-green">
      <q-btn flat class="col-3 information-btn ">
        <div class="column justify-center content-center items-center">
          <q-icon size="32px">
            <img
              src="~/assets/icons/LandForSaleInformationIcons/land_area.svg"
            />
          </q-icon>
          <div class="title q-mt-sm">2,275㎡</div>
          <div class="sub-title q-mt-xs">대지면적</div>
        </div>
      </q-btn>

      <q-btn flat class="col-3 information-btn ">
        <div class="column justify-center content-center items-center">
          <q-icon size="32px">
            <img
              src="~/assets/icons/LandForSaleInformationIcons/building_area.svg"
            />
          </q-icon>
          <div class="title q-mt-sm">2,275㎡</div>
          <div class="sub-title q-mt-xs">대지면적</div>
        </div>
      </q-btn>

      <q-btn flat class="col-3 information-btn ">
        <div class="column justify-center content-center items-center">
          <q-icon size="32px">
            <img src="~/assets/icons/LandForSaleInformationIcons/rent.svg" />
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
            <img
              src="~/assets/icons/LandForSaleInformationIcons/completion.svg"
            />
          </q-icon>
          <div class="title q-mt-sm">2,275㎡</div>
          <div class="sub-title q-mt-xs">대지면적</div>
        </div>
      </q-btn>
    </div>
    <q-separator inset color="white" class="broken-separator" />
    <div class="row">
      <q-btn flat class="col-3 information-btn ">
        <div class="column justify-center content-center items-center">
          <q-icon size="32px">
            <img
              src="~/assets/icons/LandForSaleInformationIcons/building_area.svg"
            />
          </q-icon>
          <div class="title q-mt-sm">2,275㎡</div>
          <div class="sub-title q-mt-xs">대지면적</div>
        </div>
      </q-btn>

      <q-btn flat class="col-3 information-btn ">
        <div class="column justify-center content-center items-center">
          <q-icon size="32px">
            <img src="~/assets/icons/LandForSaleInformationIcons/rent.svg" />
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
            <img
              src="~/assets/icons/LandForSaleInformationIcons/completion.svg"
            />
          </q-icon>
          <div class="title q-mt-sm">2,275㎡</div>
          <div class="sub-title q-mt-xs">대지면적</div>
        </div>
      </q-btn>
    </div>
  </q-card-section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.information-btn {
  height: 88px;

  .title {
    font-family: "notosanskr-medium";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -1.2px;
    color: #1a1a1a;
  }
  .sub-title {
    font-family: "notosanskr-medium";
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
  font-family: "notosanskr-medium";
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  text-align: center;
  letter-spacing: -1.25px;
  color: #ffffff;
}

.broken-separator {
  border: 1px dashed #e8e8e8;
  box-sizing: border-box;
}
</style>
