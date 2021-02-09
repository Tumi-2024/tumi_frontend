<template>
  <div class="image-material">
    <div class="related-images">
      <div class="title-heading notosanskr-medium">
        관련 이미지
      </div>

      <div class="no-registered-data">
        <div class="text-no-data notosanskr-medium">
          등록된 자료가 없습니다
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.image-material {
  overflow-y: auto;
  height: 90vh;

  .related-images {
    background: white;
    padding: 24px 16px;

    .title-heading {
      font-weight: 500;
      font-size: 17px;
      line-height: 26px;
      letter-spacing: -1.275px;
      color: #1a1a1a;
    }

    .no-registered-data {
      height: 188px;
      background: #f7f7f7;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      .text-no-data {
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        letter-spacing: -1.2px;
        color: #909090;
      }
    }
  }
}
</style>
