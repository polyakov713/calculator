import { Component } from 'vue-property-decorator';
import { VueComponent } from '../shims-vue';

import styles from './Buttons.css?module'

@Component
export default class Buttons extends VueComponent {
  private buttons = {
    rows: [
      ['7', '8', '9', 'C'],
      ['4', '5', '6', '-'],
      ['1', '2', '3', '+'],
    ],
  };

  render() {
    return (
      <table class={styles.buttons}>
        <thead></thead>
        <tbody>
          {
            this.buttons.rows.map((row, index) => {
              console.log(row);

              return (
                <tr
                  key={`tr-${index}`}
                  class={styles.tr}
                >
                  {
                    row.map(item => {
                      return (
                        <td
                          key={`td-${item}`}
                          class={styles.td}
                        >
                          <button class={styles.button}>
                            {item}
                          </button>
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
          <tr class={styles.tr}>
            <td
              colspan="3"
              class={styles.td}
            >
              <button class={styles.button}>
                0
              </button>
            </td>
            <td class={styles.td}>
              <button class={styles.button}>
                =
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}
