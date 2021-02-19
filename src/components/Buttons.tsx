import { Component } from 'vue-property-decorator';
import { VueComponent } from '../shims-vue';

import styles from './Buttons.css?module';

@Component
export default class Buttons extends VueComponent {
  private buttons = ['7', '8', '9', 'C', '4', '5', '6', '-', '1', '2', '3', '+'];

  onClick(event: MouseEvent) {
    if (event.target && (event.target as HTMLElement).tagName === 'BUTTON') {
      const buttonText: string = event.target ? (event.target as HTMLElement).innerHTML : '';
      this.$emit('buttonClick', buttonText);
    }
  }

  render() {
    return (
      <div
        class={styles.buttons}
        onClick={this.onClick}
      >
        {
          this.buttons.map((button) => (
            <button
              key={`button-${button}`}
              class={styles.button}
            >
              {button}
            </button>
          ))
        }
        <button class={`${styles.button} ${styles.zeroButton}`}>
          0
        </button>
        <button class={styles.button}>
          =
        </button>
      </div>
    )
  }
}
