<template>
  <div v-if="data && data.length">
    <Table :columns="columns" :data="data">
      <!-- <template
        v-for="column in columns"
        :slot="column.slot ? column.slot : ''"
        slot-scope="params"
      >
        <slot :name="column.slot ? column.slot : ''" v-bind="params">
        </slot>
      </template> -->
      <template slot-scope="{ row, index }" slot="operation">
        <span>{{ row.operation }}</span>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  name: "ITable",
  props: {
    columns: {
      type: Array,
      require: true,
    },
    data: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {};
  },

  created() {
    this.data.forEach((i) => {
      i.operation = 80;
    });
  },

  mounted() {
    this.data.forEach((i) => {
      i.operation = 99;
    });
  },
};
</script>