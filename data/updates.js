(() => {
  if (!window.PORTFOLIO_DATA) return;

  const data = window.PORTFOLIO_DATA;
  const findProject = (id) => Array.isArray(data.projects) ? data.projects.find((project) => project.id === id) : null;
  const findExperience = (organisation) => Array.isArray(data.experience) ? data.experience.find((item) => item.organisation === organisation) : null;

  // Current positioning: use externally validated signals rather than project-count vanity metrics.
  if (data.profile) {
    data.profile.role = "Third-year MEng Electrical & Electronic Engineering Student";
    data.profile.tagline = "Engineering ideas into verified systems.";
    data.profile.summary = "Third-year MEng Electrical and Electronic Engineering student with First-class-level Year 2 results and industrial electronics experience at MBDA. I build and test hardware, embedded and control systems, with an emphasis on measurable evidence, design trade-offs and what changes after testing.";
    data.profile.statement = "This is a technical portfolio rather than a project gallery. The strongest case studies show requirements, architecture, implementation, verification, limitations and the next engineering gate—including work that failed or remains unfinished.";
    data.profile.highlights = [
      "MBDA electronics internship completed in 2026 — graduate offer received following the placement",
      "IAEA Global Virtual Student Challenge finalist — Uranium Initiative",
      "Electrical Systems Lead — Formula Student UEA · Vice-President — UEA Innovators"
    ];
  }

  data.metrics = [
    { value: "70.5%", label: "Year 2 average — First-class level" },
    { value: "MBDA", label: "Electronics internship + graduate offer" },
    { value: "IAEA", label: "Global Virtual Student Challenge finalist" },
    { value: "3,000+", label: "Technical readers reached in three months" }
  ];

  // Current experience and leadership.
  const mbda = findExperience("MBDA, Stevenage");
  if (mbda) {
    mbda.period = "Jun–Aug 2026";
    mbda.summary = "Completed an electronics engineering placement spanning circuit prototyping, PCB/manufacturing workflows, electronic test and failure analysis using optical microscopy, CT and CSAM, followed by technical reporting and presentation. Received a graduate offer following the placement.";
  }

  const formula = findExperience("Formula Student UEA");
  if (formula) {
    formula.period = "2025–Present";
    formula.summary = "Electrical Systems Lead for low-voltage architecture, CAN integration, signal integrity, safety-related circuitry and cross-subsystem electrical interfaces, with current work focused on requirements, architecture and validation planning before implementation.";
  }

  const innovators = findExperience("UEA Innovators");
  if (innovators) {
    innovators.title = "Vice-President";
    innovators.period = "2026–2027";
    innovators.summary = "Vice-President supporting engineering micro-projects, electronics activity, hackathon planning, fundraising and the society’s technical direction; helping shift effort toward deliverable prototypes before returning to larger autonomy ambitions.";
  }

  // Replace the superseded RF/BCI dissertation concept with the formal ePaper project.
  const dissertation = findProject("rf-energy-harvesting-bci") || findProject("energy-harvesting-epaper");
  if (dissertation) {
    dissertation.id = "energy-harvesting-epaper";
    dissertation.featured = true;
    dissertation.category = "Power & Embedded";
    dissertation.coverImage = "";
    dissertation.coverLabel = "ePAPER ENERGY HARVESTING";
    dissertation.coverDetail = "Power path · EPD bring-up · energy budget · experimental validation";
    dissertation.title = "Energy Harvesting Circuit to Power ePaper Badges";
    dissertation.subtitle = "MEng dissertation developing and validating an ultra-low-power power path for electronic paper";
    dissertation.year = "2026–2027";
    dissertation.status = "Active MEng dissertation — early practical and literature phase";
    dissertation.accent = "orange";
    dissertation.summary = "My final-year project investigates an energy-harvesting circuit capable of powering electronic-paper badges. The current phase is deliberately practical: bring up and program the displays, establish the load behaviour, then develop a defensible energy budget and harvesting/power-management architecture around measured requirements.";
    dissertation.challenge = "ePaper is attractive for harvested-energy systems because it is bistable and can retain an image without continuous display power, but image updates still create real voltage, current and timing demands. The engineering problem is to match an intermittent harvested source, storage and power management to those update events without inventing an unrealistic power budget.";
    dissertation.approach = "Start with the actual ePaper load. Program and characterise the displays first, measure the energy required for useful update cycles, then work backwards through storage, regulation and energy harvesting. Literature review and circuit development run in parallel so topology choices are justified by both prior work and bench evidence.";
    dissertation.testing = "The first milestone is a programmed ePaper display showing my name. Later validation will quantify display-update energy, supply behaviour, storage charge/discharge, cold-start or startup constraints, converter losses and successful operation from the selected harvested-energy path.";
    dissertation.impact = "The project is intended to produce a measured low-power electronics demonstrator and a rigorous dissertation. It also develops transferable skills in power budgeting, energy harvesting, embedded display control and experimental validation without claiming a medical or BCI application that is not part of the formal project.";
    dissertation.contribution = "Literature review, ePaper programming, load characterisation, energy-budget development, power-path design, prototype testing and final dissertation evidence.";
    dissertation.decisions = [
      "Treat the ePaper display as the formal load requirement; do not force an unrelated BCI application onto the dissertation.",
      "Program and measure the displays before choosing a harvesting topology.",
      "Keep source, converter, storage and load assumptions explicit so every power claim can be traced to a measurement, calculation or cited source."
    ];
    dissertation.nextSteps = [
      "Program the ordered Waveshare 4.2-inch raw ePaper and 2.9-inch ePaper module using Arduino/GxEPD libraries.",
      "Characterise the current/energy demand of representative display updates.",
      "Build a source-to-storage-to-load energy budget and shortlist suitable harvesting/power-management architectures.",
      "Prototype the selected power path and validate it against the measured ePaper load."
    ];
    dissertation.skills = [
      "Energy harvesting",
      "Power electronics",
      "Ultra-low-power systems",
      "Arduino / ePaper",
      "Experimental characterisation",
      "Research design"
    ];
    dissertation.facts = [
      { label: "Formal project", value: "Energy harvesting circuit to power electronic paper (ePaper) badges" },
      { label: "Supervisor", value: "Dr Dennis Fitzpatrick" },
      { label: "Displays ordered", value: "Waveshare 4.2-inch raw B/W + 2.9-inch B/W module" },
      { label: "Initial controller", value: "Arduino Nano-class platform for display bring-up" },
      { label: "Display libraries", value: "GxEPD / GxEPD2" },
      { label: "First practical milestone", value: "Program an ePaper display with my name" }
    ];
    dissertation.caseStudySections = [
      {
        title: "Why ePaper suits harvested-energy systems",
        intro: "Electronic paper is bistable: once an image has been written, the display can retain it without continuously refreshing like an LCD. That shifts the power problem from constant display consumption toward short but significant update events, controller overhead and power-management losses."
      },
      {
        title: "Start with the load",
        intro: "The first engineering task is not to choose an antenna or harvester. It is to establish what the ePaper system actually needs: supply voltage, startup behaviour, active-update current, update duration, sleep behaviour and the energy required per useful image change."
      },
      {
        title: "Practical display bring-up",
        intro: "The initial hardware work uses the Waveshare 4.2-inch raw black/white display and 2.9-inch module with an Arduino Nano-class controller and GxEPD/GxEPD2 libraries. The first supervisor-set milestone is deliberately simple and verifiable: show a programmed display with my name before adding the harvesting circuit."
      },
      {
        title: "Energy budget before topology",
        intro: "Once update energy is measured, the system can be worked backwards through storage, regulation and the harvested source. This prevents a common energy-harvesting mistake: choosing a source or rectifier first and only later discovering that the load cannot be supported."
      },
      {
        title: "Research workflow",
        intro: "The dissertation combines literature review with bench development. Papers are being organised through a Zotero/Obsidian workflow so component and topology decisions can be linked to prior results rather than relying on unsourced design intuition."
      },
      {
        title: "Claim boundary",
        intro: "This portfolio no longer presents the project as an RF-powered BCI. Neurotechnology remains a longer-term career interest, but the formal dissertation requirement is an energy-harvesting circuit for ePaper and the public claims are kept to that scope."
      }
    ];
  }

  // Update all capability links that pointed to the superseded dissertation id.
  if (Array.isArray(data.skills)) {
    data.skills.forEach((skill) => {
      if (!Array.isArray(skill.projectIds)) return;
      skill.projectIds = skill.projectIds.map((id) => id === "rf-energy-harvesting-bci" ? "energy-harvesting-epaper" : id);
    });
  }
})();
