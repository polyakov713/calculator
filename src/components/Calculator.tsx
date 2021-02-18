import { Component } from 'vue-property-decorator';
import { VueComponent } from '../shims-vue';

import Buttons from './Buttons';

import styles from './Calculator.css?module'

@Component
export default class Calculator extends VueComponent {
  render() {
    return (
      <div class={styles.calculator}>
        <header class={styles.header}>
          <p class={styles.buffer}>
            2 + 2
          </p>
          <strong class={styles.result}>
            4
          </strong>
        </header>
        <div class='calculator__body'>
          <Buttons/>
        </div>
      </div>
    )
  }
}
