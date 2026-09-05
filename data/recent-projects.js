(() => {
  if (!window.PORTFOLIO_DATA || !Array.isArray(window.PORTFOLIO_DATA.projects)) return;

  const project = window.PORTFOLIO_DATA.projects.find((item) => item.id === "pysignalscope");
  if (!project) return;

  project.status = "Merged upstream open-source contribution";
  project.contribution = "Upstream contribution to waveform arithmetic and numerical integration: timebase validation, malformed-data checks, nonuniform-sample trapezoidal integration, regression tests and contribution-quality validation.";
  project.summary = "A merged contribution to the open-source pySignalScope engineering library, correcting waveform arithmetic validation and integration behaviour for real time-domain data, including nonuniform sampling.";
  project.testing = "Before submission I ran 10 targeted regression tests and the complete project test suite (97 passed), with Ruff and pycodestyle also passing. Pull request #34 was merged into the upstream repository on 27 August 2026.";
  project.impact = "This is external validation that I can diagnose numerical problems, work within another team’s codebase, add regression evidence and get a technical change accepted upstream rather than only maintaining personal repositories.";
  project.nextSteps = [
    "Continue contributing small, reviewable engineering-software changes where numerical correctness can be demonstrated with regression evidence.",
    "Use the merged workflow as a model for future open-source work: reproduce the problem, patch minimally, test broadly and document the reasoning."
  ];

  if (Array.isArray(project.links)) {
    const pr = project.links.find((link) => link.href === "https://github.com/upb-lea/pySignalScope/pull/34");
    if (pr) pr.label = "Merged pull request #34";
  }

  project.facts = [
    { label: "Project type", value: "Merged contribution to an existing open-source engineering library" },
    { label: "Language", value: "Python" },
    { label: "Upstream domain", value: "Oscilloscope/time-domain and impedance data processing" },
    { label: "Contribution", value: "Waveform arithmetic validation + nonuniform-sample integration" },
    { label: "Pull request", value: "upb-lea/pySignalScope #34 — merged 27 Aug 2026" },
    { label: "Validation", value: "10 targeted tests; 97 full-suite tests; Ruff + pycodestyle passed" }
  ];

  if (Array.isArray(project.caseStudySections)) {
    const verification = project.caseStudySections.find((section) => section.title === "Verification workflow");
    if (verification) {
      verification.note = "Pull request #34 was merged upstream on 27 August 2026 after the contribution was submitted with targeted regression tests, full-suite validation and style/static checks.";
    }
  }
})();
