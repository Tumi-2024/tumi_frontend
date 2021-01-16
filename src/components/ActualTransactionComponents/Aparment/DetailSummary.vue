<template>
  <div class="row bg-white" style="padding: 20px 16px; border-bottom: 1px solid #E8E8E8;">
    <div class="col-12" style="margin-bottom: 6px;">
      <apartment-badges :tags="tags" />
    </div>
    <div class="col-12" style="margin-bottom: 4px;">
      <span style="font-size: 16px; color: #707070; line-height: 24px; letter-spacing: -1.2px; color: #707070;">한남 3구역</span>
    </div>
    <div class="col-12" style="font-size: 24px; line-height: 36px; letter-spacing: -1.8px; margin-bottom: 12px;">
      <span style="color: #00A4AA">매매 </span><span>12억 8,500만</span>
    </div>
    <div class="col-12">
      <div class="w-100" style="border-radius: 8px; background: #F7F7F7; padding: 12px 16px">
        <div class="row">
          <q-icon :name="`img:icons/actual-transaction/coins.svg`" size="24px" style="margin: 0 4px 0 0"/>
          <span class="notosanskr-regular" style="margin-right: 4px; font-size: 17px; color: #707070; font-weight: 400;">초기투자금</span>
          <q-separator vertical style="margin-right: 4px" />
          <span style="font-size: 17px;">6억 5,500만</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ApartmentBadges from "src/components/Utilities/ApartmentBadges"
export default {
  name: 'Summary',
  components: {
    "apartment-badges": ApartmentBadges,
  },
  props: {
    tags: Object
  }
}
</script>