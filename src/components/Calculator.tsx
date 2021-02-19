import { Component } from 'vue-property-decorator';
import { VueComponent } from '../shims-vue';

import Buttons from './Buttons';

import styles from './Calculator.css?module';

@Component({ 
  components: {
    Buttons
  } 
})
export default class Calculator extends VueComponent {
  private buffer: string = '';
  private result: number = 0;
  private prevResult: number = 0;
  private isClear: boolean = true;
  private isLoading: boolean = false;

  get truncatedBuffer(): string {
    return this.truncateLeft(this.buffer, 16);
  }

  get truncatedResult(): string {
    return this.truncateLeft(String(this.result), 16);
  }

  truncateLeft(str: string, count: number): string {
    const l = str.length;

    return l <= count
      ? str
      : `...${str.substr(-count)}`;
  }

  onClick(button: string) {
    if (this.isLoading) return;

    if (!isNaN(Number(button))) {
      this.onClickDigit(button);
    } else {
      this.onClickOperator(button);
    }
  }

  onClickDigit(digit: string) {
    this.buffer += digit;

    const splittedBuffer = this.buffer.split(' ');
    const l = splittedBuffer.length;

    if (l === 1) {
      this.result = Number(this.buffer);
    } else {
      this.isClear = false;
      const lastOperator = splittedBuffer[l - 2];

      if (lastOperator === '+') {
        this.result = this.prevResult + Number(splittedBuffer[l - 1]);
      } else {
        this.result = this.prevResult - Number(splittedBuffer[l - 1]);
      }
    }
  }

  onClickOperator(operator: string) {
    this.prevResult = this.result;

    switch(operator) {
      case '+':
        this.buffer += ' + ';
        break;
      case '-':
        this.buffer += ' - ';
        break;
      case '=':
        this.processing();
        break;
      case 'C':
        this.buffer = '';
        this.result = 0;
        this.isClear = true;
        break;
      default:
        console.log('unknown operator');
    }
  }

  async processing() {
    try {
      this.isLoading = true;
      await this.requestToServer();
      this.buffer = String(this.result);
      this.isClear = true;
    } catch (err) {
      console.log('Error:', err);
    } finally {
      this.isLoading = false;
    }
  }

  async requestToServer() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('success');
      }, 2000);
    });
  }

  render() {
    return (
      <div class={styles.calculator}>
        <header class={styles.header}>
          <p class={styles.buffer}>
            {this.truncatedBuffer}
          </p>
          <strong class={styles.result}>
            {this.isClear ? '' : this.truncatedResult}
          </strong>
        </header>
        <div class='calculator__body'>
          <Buttons onButtonClick={this.onClick}/>
        </div>
      </div>
    )
  }
}
