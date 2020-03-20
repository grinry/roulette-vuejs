<template>
    <div>
        <h4 class="mb-4">Game Events</h4>
        <div class="list-group">
            <div class="list-group-item" v-for="(item, index) in history" :key="index">
                Game {{ item.game }} ended, result is {{ item.result }}.
            </div>
            <div class="list-group-item" v-if="showGame && !spinning">
                Game {{ game.id }} will start in {{ game.fakeStartDelta }} sec.
            </div>
            <div class="list-group-item" v-else-if="showGame && spinning">
                Game {{ game.id }} spinning for results.
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { APINextGameResponse, GameHistoryItem } from '@/interfaces';
  import { EventBus } from '@/eventBus';
  import { log } from '@/helpers/log';

  @Component
  export default class GameEvents extends Vue {

    public showGame = false;
    private timer?: number;

    public get game(): APINextGameResponse {
      return this.$store.state.game;
    }

    public get spinning(): APINextGameResponse {
      return this.$store.state.spinning;
    }

    public get history(): Array<GameHistoryItem> {
      return this.$store.state.history;
    }

    private created(): void {
      EventBus.$on('game', this.handleGame);
    }

    private beforeDestroy(): void {
      EventBus.$off('game');
    }

    private handleGame() {
      this.showGame = true;
      if (this.game.fakeStartDelta > 0) {
        return this.waitForGame();
      }

      if (this.game.result === null) {
        log('Still no result, continue spinning.');
        setTimeout(() => EventBus.$emit('game.start'), 500);
        return;
      }
      this.showGame = false;
      log(`Result is ${this.game.result}`);
      this.$store.dispatch('history', {game: this.game.id, result: this.game.result});
      this.$store.dispatch('spin', false);
      EventBus.$emit('game.result', this.game.result);
    }

    private waitForGame(): void {
      if (this.game.fakeStartDelta <= 0) {
        EventBus.$emit('game.start');
        return;
      }

      if (this.timer) {
        clearInterval(this.timer);
      }

      this.timer = setInterval(() => {
        this.game.fakeStartDelta -= 1;
        if (this.game.fakeStartDelta <= 0) {
          clearInterval(this.timer);
          EventBus.$emit('game.start');
          return;
        }
      }, 1000);
    }
  }
</script>
