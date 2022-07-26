import { esbuildPlugin } from "@web/dev-server-esbuild";

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  files: "src/**/*.test.ts",
  nodeResolve: true,
  plugins: [esbuildPlugin({ ts: true })],
  testRunnerHtml: (testFramework) =>
    `<html>
      <body>
        <script>window.process = { env: { NODE_ENV: "development" } }</script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`,
});
