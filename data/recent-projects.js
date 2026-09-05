(() => {
  if (!window.PORTFOLIO_DATA || !Array.isArray(window.PORTFOLIO_DATA.projects)) return;

  const data = window.PORTFOLIO_DATA;

  // pySignalScope: contribution was merged upstream on 27 August 2026.
  const pySignal = data.projects.find((item) => item.id === "pysignalscope");
  if (pySignal) {
    pySignal.status = "Merged upstream open-source contribution";
    pySignal.contribution = "Upstream contribution to waveform arithmetic and numerical integration: timebase validation, malformed-data checks, nonuniform-sample trapezoidal integration, regression tests and contribution-quality validation.";
    pySignal.summary = "A merged contribution to the open-source pySignalScope engineering library, correcting waveform arithmetic validation and integration behaviour for real time-domain data, including nonuniform sampling.";
    pySignal.testing = "Before submission I ran 10 targeted regression tests and the complete project test suite (97 passed), with Ruff and pycodestyle also passing. Pull request #34 was merged into the upstream repository on 27 August 2026.";
    pySignal.impact = "This is external validation that I can diagnose numerical problems, work within another team’s codebase, add regression evidence and get a technical change accepted upstream rather than only maintaining personal repositories.";
    pySignal.nextSteps = [
      "Continue contributing small, reviewable engineering-software changes where numerical correctness can be demonstrated with regression evidence.",
      "Use the merged workflow as a model for future open-source work: reproduce the problem, patch minimally, test broadly and document the reasoning."
    ];

    if (Array.isArray(pySignal.links)) {
      const pr = pySignal.links.find((link) => link.href === "https://github.com/upb-lea/pySignalScope/pull/34");
      if (pr) pr.label = "Merged pull request #34";
    }

    pySignal.facts = [
      { label: "Project type", value: "Merged contribution to an existing open-source engineering library" },
      { label: "Language", value: "Python" },
      { label: "Upstream domain", value: "Oscilloscope/time-domain and impedance data processing" },
      { label: "Contribution", value: "Waveform arithmetic validation + nonuniform-sample integration" },
      { label: "Pull request", value: "upb-lea/pySignalScope #34 — merged 27 Aug 2026" },
      { label: "Validation", value: "10 targeted tests; 97 full-suite tests; Ruff + pycodestyle passed" }
    ];

    if (Array.isArray(pySignal.caseStudySections)) {
      const verification = pySignal.caseStudySections.find((section) => section.title === "Verification workflow");
      if (verification) {
        verification.note = "Pull request #34 was merged upstream on 27 August 2026 after the contribution was submitted with targeted regression tests, full-suite validation and style/static checks.";
      }
    }
  }

  // New research case study: uncertainty-aware evaluation for EEG seizure-detection algorithms.
  if (!data.projects.some((item) => item.id === "szcore-uncertainty-extension")) {
    data.projects.push({
      featured: true,
      category: "Research & Medtech",
      coverImage: "",
      coverPosition: "50% 50%",
      coverLabel: "EEG UNCERTAINTY",
      coverDetail: "Seizure detection · patient-cluster bootstrap · Monte Carlo · reproducibility",
      links: [
        { label: "GitHub repository", href: "https://github.com/MooMooCow29/szcore-uncertainty-extension" },
        { label: "SzCORE validation framework", href: "https://github.com/esl-epfl/sz-validation-framework" },
        { label: "timescoring upstream", href: "https://github.com/esl-epfl/timescoring" }
      ],
      contribution: "Research framing, reusable Python implementation, patient-cluster bootstrap analysis, paired algorithm comparison, hierarchical Monte Carlo experiment, automated tests and manuscript drafting.",
      verification: [
        { metric: "Automated tests", result: "27 passed", note: "Repository test suite for the executable research prototype." },
        { metric: "Monte Carlo experiment", result: "1,800 studies", note: "300 studies across each of six simulation scenarios." },
        { metric: "High-dependence result", result: "≈28–29% narrower", note: "Naïve recording-level bootstrap intervals versus patient-cluster intervals in the included high-ICC simulation scenarios." },
        { metric: "Clinical evidence", result: "Not claimed", note: "Real patient-separated benchmark outputs are explicitly still required before a strong applied paper." }
      ],
      gallery: [],
      decisions: [
        "Make the patient, not the recording, the primary resampling unit when repeated recordings create within-patient dependence.",
        "Use the naïve recording bootstrap as a comparator rather than presenting it as an acceptable default.",
        "Separate simulation evidence from clinical evidence and keep the manuscript explicitly pre-submission until real benchmark outputs are analysed.",
        "Build around documented public interfaces rather than copying upstream SzCORE/timescoring source code."
      ],
      nextSteps: [
        "Run the frozen analysis on patient-separated outputs from at least one public EEG benchmark.",
        "Pre-register the real-data protocol and primary endpoint before final test evaluation.",
        "Compare additional interval procedures and add subgroup/failure-tail analysis.",
        "Seek EEG/epilepsy specialist review before making medical interpretations or pursuing publication."
      ],
      skills: [
        "Python",
        "EEG / seizure detection",
        "Statistical uncertainty",
        "Monte Carlo simulation",
        "Research reproducibility",
        "Automated testing"
      ],
      id: "szcore-uncertainty-extension",
      title: "EEG Seizure-Detection Uncertainty Evaluation",
      subtitle: "Patient-aware statistical evaluation alongside the SzCORE/timescoring workflow",
      year: "2026",
      status: "Executable research prototype — real-data validation next",
      accent: "teal",
      summary: "A reproducible Python research prototype for uncertainty-aware evaluation of EEG seizure-detection algorithms. It tests how repeated recordings from the same patient affect confidence intervals and provides patient-cluster bootstrap estimates, paired algorithm comparisons, latency reporting and reproducible simulation evidence.",
      challenge: "Repeated EEG recordings from the same patient are correlated. Treating every recording as statistically independent can make an algorithm appear more precisely evaluated than the data justify, especially in small patient cohorts. The project asks how much that modelling choice can distort uncertainty estimates and how to expose the difference reproducibly.",
      approach: "Build a tested analysis layer that consumes recording-level event counts produced by a seizure-detection evaluation, but resamples at patient level. Compare this against a deliberately naïve recording-level bootstrap, then use a hierarchical beta-binomial Monte Carlo experiment to measure empirical confidence-interval coverage as patient dependence changes.",
      testing: "The repository currently has 27 passing automated tests and an included 1,800-study Monte Carlo experiment. In the stronger-dependence scenarios (ICC 0.20), the naïve recording-level intervals were roughly 28–29% narrower and showed materially lower empirical coverage than patient-cluster intervals. These are simulation results, not clinical results.",
      impact: "The project is a bridge between my electrical/embedded background and longer-term neurotechnology research interests. Its strongest evidence is methodological discipline: explicit resampling assumptions, reproducible experiments, automated testing and strict separation between synthetic research findings and claims that would require real patient-separated algorithm outputs.",
      facts: [
        { label: "Domain", value: "Evaluation of EEG seizure-detection algorithms" },
        { label: "Resampling unit", value: "Patient-cluster bootstrap" },
        { label: "Simulation", value: "1,800 studies across six scenarios" },
        { label: "Automated tests", value: "27 passing" },
        { label: "Included methods", value: "Confidence intervals, paired comparisons, patient-level metrics, detection latency" },
        { label: "Current boundary", value: "No clinical claim; real benchmark outputs still required" }
      ],
      caseStudySections: [
        {
          title: "Why the resampling unit matters",
          intro: "A seizure-detection dataset can contain multiple recordings from one patient. Those recordings are not automatically independent observations. Bootstrapping individual recordings can therefore exaggerate the effective sample size and produce confidence intervals that are too narrow."
        },
        {
          title: "Patient-cluster bootstrap",
          intro: "The primary procedure resamples patients and carries their repeated recordings with them. This preserves the within-patient clustering structure while still allowing uncertainty intervals to be estimated for pooled sensitivity, precision, F1 and false-positive rate."
        },
        {
          title: "Monte Carlo coverage experiment",
          intro: "A hierarchical beta-binomial simulation was used to create controlled studies where the true event sensitivity and within-patient dependence were known. The included experiment runs 300 studies in each of six scenarios, for 1,800 simulated studies overall."
        },
        {
          title: "What the simulation showed",
          intro: "At low patient dependence, the patient-cluster and naïve recording bootstrap behaved similarly. At ICC 0.20, treating recordings as independent produced intervals about 28–29% narrower and materially lower empirical coverage in the included scenarios. That result demonstrates a methodological risk; it is not a clinical performance result."
        },
        {
          title: "Paired comparisons and latency",
          intro: "The analysis layer also supports paired bootstrap differences between algorithms, patient-level sign-flip tests, patient-level performance tables and detection-onset latency summaries so evaluation is not reduced to one pooled headline metric."
        },
        {
          title: "Reproducibility and claim boundary",
          intro: "The repository includes automated tests, reproducible synthetic examples, a defined data schema and a serious draft manuscript. It explicitly states that real patient-separated outputs from a public benchmark and domain-expert review are still required before a strong applied publication or medical interpretation."
        }
      ]
    });
  }

  // Employer/research-facing hierarchy: lead with depth, external validation and current work.
  const featuredIds = new Set([
    "advanced-2wd-robot-controller",
    "aurora-vx",
    "energy-harvesting-epaper",
    "szcore-uncertainty-extension",
    "formula-student-electrical",
    "pysignalscope"
  ]);
  data.projects.forEach((project) => { project.featured = featuredIds.has(project.id); });

  const priority = [
    "advanced-2wd-robot-controller",
    "aurora-vx",
    "energy-harvesting-epaper",
    "szcore-uncertainty-extension",
    "formula-student-electrical",
    "pysignalscope",
    "iaea-uranium-initiative"
  ];
  const rank = new Map(priority.map((id, index) => [id, index]));
  data.projects = data.projects
    .map((project, index) => ({ project, index }))
    .sort((a, b) => (rank.get(a.project.id) ?? 1000 + a.index) - (rank.get(b.project.id) ?? 1000 + b.index))
    .map(({ project }) => project);

  // Curated writing: direct article links only, prioritising technical depth and relevance.
  data.writing = [
    {
      title: "PID Control from First Principles",
      category: "Control systems",
      description: "A first-principles treatment of proportional, integral and derivative control, connecting the mathematics to practical implementation.",
      href: "https://medium.com/gitconnected/pid-control-from-first-principles-the-mathematics-the-intuition-and-the-code-that-makes-your-653a475fe6b0"
    },
    {
      title: "Feedforward Control — The Missing Half of Every PID Tutorial",
      category: "Control systems",
      description: "Why feedback must react after an error appears, and how feedforward changes the architecture when disturbances can be measured or predicted.",
      href: "https://medium.com/gitconnected/feedforward-control-the-missing-half-of-every-pid-tutorial-you-have-ever-read-d70be69757ad"
    },
    {
      title: "Power Electronics in Modern Energy Systems",
      category: "Power electronics",
      description: "Converters, switching losses, grid interfaces, HVDC, thermal limits and wide-bandgap devices as the hidden layer behind modern energy systems.",
      href: "https://medium.com/@ks683557/power-electronics-in-modern-energy-systems-the-hidden-layer-behind-clean-power-e7b4012b6ae0"
    },
    {
      title: "Why Power Grids Don’t Collapse",
      category: "Power systems & control",
      description: "Grid inertia, governor response, network redundancy and the control layers that keep supply and demand synchronised.",
      href: "https://medium.com/@ks683557/why-power-grids-dont-collapse-even-when-millions-turn-things-on-6295fdc909ba"
    },
    {
      title: "How Fly-By-Wire Makes Fighter Jets Unstable on Purpose",
      category: "Control & systems engineering",
      description: "A systems-level explanation of active stability, feedback control, redundancy and the electrical/software architecture behind high-performance aircraft.",
      href: "https://medium.com/@ks683557/how-fly-by-wire-makes-fighter-jets-unstable-on-purpose-b79162245cea"
    },
    {
      title: "Why Fighter Jets Are Engineering Compromises",
      category: "Systems engineering",
      description: "Using aircraft design to explain coupled trade-offs between performance, stealth, range, sensors, power, cooling and cost.",
      href: "https://medium.com/@ks683557/why-fighter-jets-are-engineering-compromises-not-flying-superheroes-e979950133d3"
    },
    {
      title: "The Tech Frontiers: Real-World Science Behind the Next Great Leap",
      category: "Future technology",
      description: "A survey of emerging engineering directions including advanced energy, post-silicon computing and converging deep technologies.",
      href: "https://medium.com/@ks683557/the-tech-frontiers-real-world-science-behind-the-next-great-leap-6c7ff34ac6d9"
    },
    {
      title: "Matrices — A Short Metaphysical Analysis",
      category: "Engineering mathematics",
      description: "Matrices as transformations and compact representations of coupled engineering systems, with an emphasis on intuition rather than rote notation.",
      href: "https://medium.com/@ks683557/matrices-a-short-metaphysical-analysis-9a4db53d7563"
    }
  ];
})();
