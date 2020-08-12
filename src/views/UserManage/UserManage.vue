<template>
  <div class="manage">
    <div class="manage-header">
      <common-from></common-from>
    </div>
    <div class="manage-content">
      <common-table></common-table>
    </div>
  </div>
</template>

<script>
import CommonFrom from "../../components/CommonFrom";
import CommonTable from "../../components/CommonTable";
export default {
  components: {
    CommonFrom,
    CommonTable
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>
