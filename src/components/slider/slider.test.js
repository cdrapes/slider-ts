import { expect, fixture } from "@open-wc/testing";

describe("ax-slider", () => {
  it("should be accessible", async () => {
    const html = `
            <ax-slider></ax-slider>
        `;
    const element = await fixture(html);
    await expect(element).to.be.accessible();
  });
});
