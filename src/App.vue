<template>
    <div class="container my-3" v-if="initialized">
        <h1>Aardvark Roulette</h1>

        <div class="row">
            <div class="col-sm-12">
                <app-statistics-table/>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="row">
                    <div class="col">
                        <app-player-table/>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col">
                        <app-game-events/>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <app-game-logs/>
            </div>
        </div>

    </div>
    <div class="container my-5" v-else>
        <div class="row">
            <div class="col">
                <p>Initializing app.</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import PlayerTable from '@/components/PlayerTable.vue';
  import { repositoryFactory } from '@/repositories/repository.factory';
  import { delay } from '@/helpers/delay.helper';
  import StatisticsTable from '@/components/StatisticsTable.vue';
  import GameLogs from '@/components/GameLogs.vue';
  import { log } from '@/helpers/log';
  import GameEvents from '@/components/GameEvents.vue';
  import { ApiRepository } from '@/repositories/api.repository';
  import { EventBus } from '@/eventBus';

  @Component({
    components: {
      'app-player-table': PlayerTable,
      'app-statistics-table': StatisticsTable,
      'app-game-logs': GameLogs,
      'app-game-events': GameEvents,
    },
  })
  export default class App extends Vue {
    public initialized = false;
    private repository: ApiRepository = repositoryFactory.get('api');

    private created(): void {
      EventBus.$on('config', this.initGame);
      EventBus.$on('game.start', this.getGameResults);
      EventBus.$on('game.result', this.initGame);
    }

    private mounted(): void {
      log('Loading game board');
      this.initializeApp();
    }

    private initializeApp(): void {
      this.repository
        .getConfiguration()
        .then(response => {
          this.$store.dispatch('configurations', response);
          EventBus.$emit('config');
          this.initialized = true;
        }).catch(async () => {
        log('Error retrieving roulette configurations, will try again.');
        await delay(500, this.initializeApp());
      });
    }

    private initGame(): void {
      this.repository.getNextGame().then(response => {
        this.$store.dispatch('game', response);
        EventBus.$emit('game', response);
      }).catch(async () => {
        log('Failed loading game data, will try again.');
        await delay(500, this.initGame());
      });
    }

    private getGameResults(): void {
      const game = this.$store.state.game;
      this.$store.dispatch('spin', true);
      this.repository.getGameResults(game.id).then(response => {
        this.$store.dispatch('game', response);
        EventBus.$emit('game', response);
      }).catch(async () => {
        log('Failed loading game data, will try again.');
        await delay(500, this.getGameResults());
      });
    }

    private beforeDestroy(): void {
      EventBus.$off('config');
      EventBus.$off('game.start');
      EventBus.$off('game.result');
    }
  }
</script>
