import { css } from 'lit';

const track = css`
  height: var(--slider-track-size);
  border: 0;
  -webkit-appearance: none;
  background: transparent;
`;

const thumb = css`
  width: var(--slider-thumb-size);
  height: var(--slider-thumb-size);
  margin-top: calc(
    ((var(--slider-thumb-size) - var(--slider-track-size)) / 2) * -1
  );
  // margin-top: -4px;
  border: 0;
  box-shadow: var(--slider-thumb-box-shadow);
  background-color: var(--slider-thumb-background-color);
  border-radius: 20px;
  -webkit-appearance: none;
`;

export default css`
:host {
  --global-spacing-x1: calc(0.25rem * 1);
  --global-spacing-x2: calc(0.25rem * 2);
  --global-spacing-x3: calc(0.25rem * 3);
  --global-spacing-x4: calc(0.25rem * 4);
  --global-spacing-x5: calc(0.25rem * 5);
  --global-spacing-x6: calc(0.25rem * 6);
  --global-spacing-x7: calc(0.25rem * 7);
  --global-spacing-x8: calc(0.25rem * 8);
  --slider-thumb-size: 24px;
  --slider-track-size: var(--global-spacing-x2);
  --slider-thumb-background-color: white;
  --slider-thumb-box-shadow: 0 0.0625rem 0.1875rem 0 hsla(0, 0%, 25%, 0.14), 0 0.0625rem 0.125rem 0.03125rem hsla(0, 0%, 25%, 0.15);
  --slider-thumb-focus-box-shadow: inset 0px 0px 0px 2px rgb(35, 158, 219), 0px 0px 0px 2px rgba(35, 158, 219, 0.3);
    position: relative;
    --tooltip-offset: 4px;
}

  ::slotted([slot="min"]) {
    border: 2px solid green;
    width: 20px;
    height: 20px;
  }

  .slider__min-max{
    display: flex;
    justify-content: space-between;
  }

   input[type="range"]::-webkit-slider-runnable-track {
    ${track};
  }

   input[type="range"]::-moz-range-track {
    ${track};
  }

   input[type="range"]::-ms-track {
    ${track};
  }

   input[type="range"]::-webkit-slider-thumb {
    ${thumb};
  }

   input[type="range"]::-moz-range-thumb {
    ${thumb};
  }

   input[type="range"]::-ms-thumb {
    ${thumb};
  }

  input[type="range",disabled] {
    pointer-events:none;
  }

  input[type='range'] {
    width: 100%;
    height: var(--slider-track-size);
    background-image: var(--slider-track-background);
    border-radius: var(--global-spacing-x4);
    cursor: pointer;
    -webkit-appearance: none;
  }

  input[type='range']:focus-visible {
    outline: none;
  }

  input[type="range"]:focus-visible::-webkit-slider-thumb {
    box-shadow: var(--slider-thumb-focus-box-shadow);
  }

  input[type="range"]:focus-visible::-moz-range-thumb {
    box-shadow: var(--slider-thumb-focus-box-shadow);
  }

  input[type="range"]:focus-visible::-ms-thumb {
    box-shadow: var(--slider-thumb-focus-box-shadow);
  }

  .ax-slider__tooltip {
    position: absolute;
    background-color: white;
    font-size: 12px;
    color: black;
    opacity: 0;
    padding: var(--global-spacing-x1);
    transition: 0.2s opacity;
    pointer-events: none;
    top: calc(-1 * var(--slider-thumb-size) - var(--tooltip-offset));
  }
  .ax-slider__tooltip--visible  {
    opacity: 1;
  }

`;

// tooltip info /* https://css-tricks.com/value-bubbles-for-range-inputs/ /*
