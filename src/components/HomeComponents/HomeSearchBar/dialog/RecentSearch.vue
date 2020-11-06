<template>
  <q-list separator class="rounded-borders">
    <q-item-label class="no-margin no-padding" header>
      <p style="font-size: 14px" class="text-black notosanskr-medium">
        최근 검색 한
      </p>
    </q-item-label>

      <q-item clickable v-for="list in 2" :key="list">
        <q-item-section class="item-result">
          <q-icon size="20px" class="item-result-icon" name="img:icons/home-page-icon/search-result-icon/location-mark.svg"></q-icon>
          <q-item-label lines="1" class="text-black notosanskr-regular">반포동 재개발</q-item-label>
          <q-icon size="16px" class="item-right-icon" name="img:icons/home-page-icon/search-result-icon/remove.svg"></q-icon>
        </q-item-section>
      </q-item>
    </q-list>
</template>

<script>
export default {
}
</script>

<style>
  .item-result {
    position: absolute;
    display: flexbox;
    flex-direction: row;
    left: 0;
    margin-top: 10px;
    max-height: 48px;
  }

  .item-right-icon {
    margin-left: 10px
  }

  .item-result-icon{
    margin-right: 20px;
  }
</style>