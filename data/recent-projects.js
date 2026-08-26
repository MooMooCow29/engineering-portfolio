(() => {
  /*
   * Legacy project injection layer.
   *
   * AURORA-VX, the IAEA project and the rest of the portfolio now live in
   * data/content.js. Keeping a second runtime source of project definitions
   * caused stale covers and shallower project data to overwrite or conflict
   * with the generated case studies. This file remains only for backwards
   * compatibility with older generated HTML pages.
   */
  if (!window.PORTFOLIO_DATA) return;
})();
