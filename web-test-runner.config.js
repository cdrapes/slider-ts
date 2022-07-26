export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  files: "src/**/*.test.js",
  nodeResolve: true,
  testRunnerHtml: (testFramework) =>
    `<html>
      <body>
        <script>window.process = { env: { NODE_ENV: "development" } }</script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`
});
