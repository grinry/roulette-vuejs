<template>
    <div class="row">
        <div class="col-md-10">
            <h4 class="mb-4">Game Board</h4>
            <app-player-button v-for="(item, index) of list"
                               :value="item.value"
                               :color="item.color"
                               :winner="winningNumber === item.value"
                               :key="index"
            />
        </div>
        <div class="col-md-2 text-center position-relative" v-if="spinning">
            <app-spinner/>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { APIConfigurationResponse, Nullable, RouletteTableItem } from '@/interfaces';
  import PlayerButton from '@/components/PlayerButton.vue';
  import { mapColor } from '@/helpers/color-mapper.helper';
  import Spinner from '@/components/Spinner.vue';
  import { EventBus } from '@/eventBus';

  @Component({
    components: {
      'app-player-button': PlayerButton,
      'app-spinner': Spinner,
    },
  })
  export default class PlayerTable extends Vue {
    public list?: Array<RouletteTableItem>;
    public winningNumber: Nullable<number> = null;

    private timer?: number;

    public get spinning(): boolean {
      return this.$store.state.spinning;
    }

    private created() {
      this.generateButtonList();
    }

    private mounted() {
      EventBus.$on('game.result', this.handleGameResult);
    }

    private beforeDestroy() {
      EventBus.$off('game.result');
      if (this.timer) {
        clearTimeout(this.timer);
      }
    }

    private handleGameResult(winner: number) {
      this.winningNumber = winner;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => this.winningNumber = null, 10e3);
    }

    private generateButtonList() {
      const configurations: APIConfigurationResponse = this.$store.state.configurations;
      this.list = configurations.positionToId.map(item => ({value: item, color: mapColor(item, configurations)}));
    }
  }
</script>

<style scoped lang="scss">

</style>
