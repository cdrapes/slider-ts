import { expect, fixture, html } from "@open-wc/testing";

import "../index.js";
import { Slider } from "./slider.js";
// import slider

describe("ax-slider", () => {
  it("should be accessible", async () => {
    const el = await fixture<Slider>(
      html` <ax-slider label="slider"></ax-slider> `
    );
    await expect(el).shadowDom.to.be.accessible();
  });

  // it("should log a warning if no label is provided", async () => {
  // });
});
