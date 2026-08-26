(() => {
  /*
   * Legacy portfolio patch layer.
   *
   * The current portfolio is fully defined in data/content.js. Older versions
   * used this file to mutate profile, capability and project data at runtime.
   * Those mutations are intentionally disabled because they conflict with the
   * newer evidence-linked capability schema and can stop the homepage from
   * rendering.
   */
  if (!window.PORTFOLIO_DATA) return;
})();
