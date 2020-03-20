<template>
    <span>
        <i class="fas fa-fw fa-spin fa-spinner"/>
    </span>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Spinner extends Vue {
  }
</script>

<style scoped lang="scss">
    span {
        font-size: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
