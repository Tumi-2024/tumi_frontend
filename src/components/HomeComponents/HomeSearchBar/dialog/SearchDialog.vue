<template>
  <q-dialog
    v-model="dialog"
    persistent
    maximized
    transition-show="visible"
    transition-hide="visible"
  >
    <q-card class="bg-white text-primary" style="max-width: 1000px;">
      <q-bar class="bg-white">
        <q-btn class="back-btn flex justify-center content-center" flat @click="dialog = !dialog">
          <q-icon name="img:icons/home-page-icon/search-result-icon/back-btn.svg" />
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="row">
          <div class="col">
            <q-input 
              v-model="text" 
              color="white" 
              style="caret-color: #FF5A00;" 
              class="search-bar-field" 
              placeholder="지역명, 단지명,  지하철역, 주소 검색"
            >
              <template v-slot:after>
                <q-btn flat class="notosanskr-medium text-black" dense label="취소" />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <recent-search />
      </q-card-section>

      <q-separator color="positive" inset spaced size="12px" class="full-width" />

      <q-card-section>
        <list-result />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import ListResult from './ListResult';
import RecentSearch from './RecentSearch';

export default {
  props: {
    dialog: {
      default: false,
      type: Boolean,
    }
  },
  data() {
    return {
      text: null
    }
  },
  components: {
    ListResult,
    RecentSearch
  }
}
</script>

<style>
  .back-btn {
    width: 24px;
    height: 24px;
  }
  
  .search-bar-field {
    border-bottom: 2px solid #000;
  }
</style>