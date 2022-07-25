import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface SliderEvent {
  value: number;
}

@customElement('ax-slider-display')
export class SliderDisplay extends LitElement {
  @property({ type: Number }) sliderValue!: number;

  private _sliderListener = (e: CustomEvent<SliderEvent>) => {
    this.sliderValue = e.detail.value;
  };

  constructor() {
    super();
    this.addEventListener(
      'ax-slider-change',
      this._sliderListener as EventListener
    );
  }

  render() {
    const { sliderValue } = this;
    return html`
    <p>Slider Value: ${sliderValue}<slot></slot></p>
    `;
  }
}
