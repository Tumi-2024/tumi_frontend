<template>
  <q-card>
    <q-card-section>
      <div class="title-heading-transaction">최근 실거래가</div>
    </q-card-section>
    <q-card-section>
      <div class="column latest-transaction-board q-pa-md">
        <div class="col q-gutter-sm">
          <q-badge class="info-badge" color="white" text-color="primary" label="매매가" />
          <q-badge class="info-badge" color="white" text-color="grey-8" label="2015년 06월" />
        </div>
        <div class="col price q-mt-sm">
          118억 5,420만
        </div>
        <div class="col q-mt-sm">
          <div class="row">
            <div class="col">
              <div class="row unit-price">
                <span style="color: #707070;">토지면적당 단가</span>
                <q-separator spaced vertical />
                <span style="color: #D32C00;">1,130만 / 평</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="title-heading-transaction">인근지역 유사거래 사례</div>
      <InformationTable class="q-mt-md" />
    </q-card-section>
  </q-card>
</template>

<script>
import InformationTable from 'src/components/Utilities/InformationTable'

export default {
  components: {
    InformationTable
  }
}
</script>

<style lang="scss">
.info-badge {
  border: 1px solid #D5D5D5;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  font-family: 'notosanskr-bold';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  /* identical to box height, or 167% */

  text-align: center;
  letter-spacing: -0.9px;
}

.unit-price {
  font-family: 'notosanskr-regular';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -1.2px;
}

.latest-transaction-board {
  background-color: #F7F7F7;
  border-radius: 12px;
}

.price {
  font-family: 'notosanskr-bold';
  font-style: normal;
  font-weight: 500;
  font-size: 21px;
  line-height: 32px;
  letter-spacing: -1.575px;
  color: #1A1A1A;
}

.title-heading-transaction {
  font-family: 'notosanskr-bold';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  letter-spacing: -1.275px;
  color: #1A1A1A;
}
</style>
