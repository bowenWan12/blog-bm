<template>
  <el-form :inline="inline" :model="form" ref="form" label-width="100px">
    <el-form-item
      v-for="item in formLabel"
      :key="item.model"
      :label="item.label"
    >
      <el-input
        v-model="form[item.model]"
        :placeholder="'请输入' + item.label"
        v-if="!item.type"
      ></el-input>
      <el-checkbox-group v-if="item.type === 'checkbox'" v-model="form[item.model]">
       {{item.label}}
      <el-checkbox v-for="op in item.opts" :name="op.name" :label="op.value" :key="op.value">{{op.label}}</el-checkbox>
      </el-checkbox-group>
      <el-select
        v-model="form[item.model]"
        placeholder="请选择"
        v-if="item.type === 'select'"
      >
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-switch
        v-if="item.type === 'switch'"
        v-model="form[item.model]"
        :active-value="item.activeValue"
        :inactive-value="item.inactiveValue"
      ></el-switch>
      <el-date-picker
        v-model="form[item.model]"
        type="date"
        placeholder="选择日期"
        v-if="item.type === 'date'"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    inline: Boolean,
    form: Object,
    formLabel: Array
  }
};
</script>

<style lang="scss" scoped></style>
