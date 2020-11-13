<template>
  <q-card flat class="q-mt-sm"  style="margin-top: 0px;">
    <q-card-section class="row justify-between card-section" style="">
      <div class="notosanskr-medium" style="">
        <q-btn unelevated class="q-mr-sm">#전체(15)</q-btn>
        <q-btn unelevated class="q-mr-sm">#아파트(2)</q-btn>
        <q-btn unelevated class="q-mr-sm">#오피스텔(3)</q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
    export default { };
</script>

<style lang="scss" scoped>
  .card-section {
    border-bottom: 1px solid #e0e0e0; 
    border-radius: 1;
  }

  .notosanskr-medium {
    white-space:nowrap; 
    overflow-x:auto;
  }
  
  ::-webkit-scrollbar { 
    display: none; 
  }

  .q-btn {
      background: #ffffff;
      /* Line/Gray_20 */

      border: 1px solid #dbdbdb;
      box-sizing: border-box;
      border-radius: 8px;

      font-weight: 500;
      font-size: 14px;
      line-height: 36px;
      text-align: center;
      letter-spacing: -1.05px;
      color: #1a1a1a;

      display:inline-block

  }

  .q-btn:hover {
    background: #3a3a3a;
    color: #ffffff;
  }
</style>
