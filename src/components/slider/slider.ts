import { html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { TemplateResult } from 'lit/html';
import { SliderEvent } from './slider-display';
import styles from './slider.styles';

/**
 * An Axiom Slider element
 *
 */

@customElement('ax-slider')
export class Slider extends LitElement {
  @query('#ax-slider', true) _input!: HTMLInputElement;
  @query('.ax-slider__tooltip') _output!: HTMLOutputElement;

  @property({ type: String }) label = '';

  @property({ type: Number }) value = 50;

  @property({ type: Number }) min = 0;

  @property({ type: Number }) max = 100;

  @property({ type: Boolean }) disabled!: boolean;

  @property({ type: Number }) step = 1;

  @property({ type: Boolean }) displayMinMax = true;

  @property({ type: Boolean }) tooltip = false;

  @state() private displayTooltip = false;

  private resizeObserver!: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.syncUI());

    this.updateComplete
      .then(() => {
        this.syncUI();
        this.onInputChange();
        this.resizeObserver.observe(this._input);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (
      changedProperties.has('value') ||
      changedProperties.has('min') ||
      changedProperties.has('max') ||
      changedProperties.has('disabled')
    ) {
      this.syncUI();
    }
  }

  static styles = styles;

  onInputChange(): void {
    this.value = parseFloat(this._input.value);

    const event = new CustomEvent<SliderEvent>('ax-slider-change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    });
    this.dispatchEvent(event);
  }

  private onFocus(): void {
    this.displayTooltip = true;
  }

  private onBlur(): void {
    this.displayTooltip = false;
  }

  private showTooltip(): void {
    this.displayTooltip = true;
  }

  private hideTooltip(): void {
    this.displayTooltip = false;
  }

  private syncTrack(percent: number): void {
    const _percent = percent * 100;
    const fillColor = this.disabled ? `grey` : `rgb(35, 158, 219)`;

    const backgroundColor = this.disabled ? `grey` : `rgba(63, 63, 63, 0.15)`;

    this._input.style.setProperty(
      '--slider-track-background',
      `linear-gradient(to right, ${fillColor} ${_percent}%, ${backgroundColor} ${_percent}%)`
    );
  }

  private syncTooltip(percent: number): void {
    if (this._output !== null) {
      const inputWidth = this._input.offsetWidth;
      const tooltipWidth = this._output.offsetWidth;
      const thumbSize = getComputedStyle(this._input).getPropertyValue(
        '--slider-thumb-size'
      );
      const percentAsWidth = inputWidth * percent;
      const x = `${percentAsWidth}px - ${percent} * ${thumbSize}`;
      this._output.style.transform = `translateX(calc(${x} - ${
        tooltipWidth / 2 - 2
      }px + ${thumbSize} / 2))`;
    }
  }

  private syncUI(): void {
    const percent = Math.max(
      0,
      (this.value - this.min) / (this.max - this.min)
    );
    this.syncTrack(percent);
    if (this.tooltip) {
      this.syncTooltip(percent);
    }
  }

  private minMaxElement(): TemplateResult | null {
    return this.displayMinMax
      ? html`
    <div class="slider__min-max">
      <span>${this.min}</span>
      <span>${this.max}</span>
    </div>`
      : null;
  }

  private tooltipElement(): TemplateResult | null {
    return this.tooltip
      ? html`<output class=${classMap({
          'ax-slider__tooltip': true,
          'ax-slider__tooltip--visible': this.displayTooltip,
        })}>${this.value}</output>`
      : null;
  }

  render(): TemplateResult {
    const {
      min,
      max,
      onInputChange,
      onFocus,
      onBlur,
      label,
      disabled,
      value,
      step,
    } = this;
    return html`
    <div>
    <label
        for="ax-slider"
        aria-hidden=${label.length ? 'false' : 'true'}
      ><slot name="label">${label}</slot></label>
      <input
        id="ax-slider"
        min=${ifDefined(min)}
        max=${ifDefined(max)}
        step=${ifDefined(step)}
        ?disabled=${(disabled)}
        .value=${live(value.toString())}
        @mousedown=${this.showTooltip}
        @mouseup=${this.hideTooltip}
        @input=${onInputChange}
        @focus=${onFocus}
        @blur=${onBlur}
        type="range"/>
        ${this.tooltipElement()}
        ${this.minMaxElement()}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ax-slider': Slider;
  }
}
