import { shallowMount } from '@vue/test-utils';
import PlayerButton from '@/components/PlayerButton.vue';

describe('Spinner.vue', () => {
  it('renders green', () => {
    const value = 0;
    const color = 'green';
    const winner = false;
    const wrapper = shallowMount(PlayerButton, {
      propsData: { value, color, winner },
    });
    expect(wrapper.text()).toMatch(String(value));
    expect(wrapper.classes().join(' ')).toMatch('bg-success');
  });

  it('renders 17 black when winner', () => {
    const value = 17;
    const color = 'black';
    const winner = true;
    const wrapper = shallowMount(PlayerButton, {
      propsData: { value, color, winner },
    });
    expect(wrapper.text()).toMatch(String(value));
    expect(wrapper.classes().join(' ')).toMatch('bg-dark is-winner');
  });

});
