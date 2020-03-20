<template>
    <button :class="'btn btn-sm text-white ' + className">{{ value }}</button>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { RouletteTableItemColor } from '@/interfaces';

  @Component
  export default class PlayerButton extends Vue {
    // Properties
    @Prop({required: true, default: 0})
    public value?: number;
    @Prop({required: true, default: 'green'})
    public color?: RouletteTableItemColor;
    @Prop({required: true, default: false})
    public winner?: boolean;

    // Computed data
    public get className() {
      let className = '';
      switch (this.color) {
        case 'green':
          className = 'bg-success';
          break;
        case 'black':
          className = 'bg-dark';
          break;
        case 'red':
          className = 'bg-danger';
          break;
      }

      if (this.winner) {
        className += ' is-winner';
      }
      return className;
    }
  }
</script>

<style scoped lang="scss">
    button {
        width: 35px;
        margin: 1px;
        will-change: opacify;
        transition: opacity 0.5s;
    }

    @keyframes winner {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    .is-winner {
        animation: winner 0.5s linear infinite alternate;
    }

</style>
