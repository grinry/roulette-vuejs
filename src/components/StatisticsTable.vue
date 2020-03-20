<template>
    <div class="row my-5">
        <div class="col-12">
            <h4 class="mb-4">Stats (last 200)</h4>
        </div>
        <div class="col-12">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                    <tr>
                        <td>&nbsp;</td>
                        <td colspan="5" class="cold">Cold</td>
                        <td :colspan="neutralCells">Neutral</td>
                        <td colspan="5" class="hot">Hot</td>
                    </tr>
                    </thead>
                    <tbody v-if="list.length">
                    <tr>
                        <td class="font-weight-bold">Slots</td>
                        <td v-for="(item, index) in list" :key="index" :class="'text-white ' + item.className">{{
                            item.value
                            }}
                        </td>
                    </tr>
                    <tr class="hits-row">
                        <td class="font-weight-bold">Hits</td>
                        <td v-for="(item, index) in list" :key="index">{{ item.count }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { APIConfigurationResponse, APIStatsResponse } from '@/interfaces';
  import PlayerButton from '@/components/PlayerButton.vue';
  import { mapColor } from '@/helpers/color-mapper.helper';
  import Spinner from '@/components/Spinner.vue';
  import { mapColorToClass } from '@/helpers/color-mapper.helper';
  import { repositoryFactory } from '@/repositories/repository.factory';
  import { delay } from '@/helpers/delay.helper';
  import { EventBus } from '@/eventBus';
  import { ApiRepository } from '@/repositories/api.repository';

  @Component({
    components: {
      'app-player-button': PlayerButton,
      'app-spinner': Spinner,
    },
  })
  export default class StatisticsTable extends Vue {
    @Prop({required: false, default: false})
    public winningNumber?: number;
    public list: Array<{ value: number; count: number; className: string }> = [];
    public neutralCells?: number;

    private repository: ApiRepository = repositoryFactory.get('api');

    public get configurations(): APIConfigurationResponse {
      return this.$store.state.configurations;
    }

    private created(): void {
      this.generateDefaultStatisticsList();

      EventBus.$on('config', this.retrieveStats);
      EventBus.$on('game.result', this.retrieveStats);
    }

    private mounted(): void {
      this.retrieveStats();
    }

    private beforeDestroy(): void {
      EventBus.$on('config', this.retrieveStats);
      EventBus.$off('game.result');
    }

    private generateDefaultStatisticsList(): void {
      this.neutralCells = this.configurations.slots - 10;
    }

    /**
     * Retrieve statistics from API, retry request after half a second in case of error.
     */
    private retrieveStats(): void {
      this.repository.getLatestGames(200)
        .then(response => this.updateStatisticsList(response))
        .catch(async () => await delay(500, this.retrieveStats()));
    }

    private updateStatisticsList(data: APIStatsResponse): void {
      this.list = data.map(item => ({
        value: item.result,
        count: item.count,
        className: mapColorToClass(mapColor(item.result, this.configurations)),
      }));
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
