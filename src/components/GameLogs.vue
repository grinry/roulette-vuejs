<template>
    <div class="row">
        <div class="col-12">
            <h4 class="mb-4">Log</h4>
            <pre class="pre-scrollable bg-light p-2">{{ logs }}</pre>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class GameLogs extends Vue {
    public get logs(): Array<string> {
      return this.$store.state.logs.join("\n");
    }
  }
</script>

<style scoped lang="scss">
    .hits-row td:nth-child(-n+6), .cold {
        background-color: #D9EDF7;
    }

    .hits-row td:nth-last-child(-n+5), .hot {
        background-color: #F2DEDE;
    }

    .hits-row td:first-child {
        background-color: transparent;
    }
</style>
