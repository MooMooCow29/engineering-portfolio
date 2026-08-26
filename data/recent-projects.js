(() => {
  const data = window.PORTFOLIO_DATA;
  if (!data || !Array.isArray(data.projects)) return;

  const addProject = (project) => {
    if (!data.projects.some((item) => item.id === project.id)) data.projects.unshift(project);
  };

  addProject({
    id: "iaea-uranium-initiative",
    title: "IAEA Challenge Finalist — Uranium Initiative",
    subtitle: "Systems-level uranium production concept covering in-situ recovery, wellfield control, surface processing and sustainability",
    year: "2026",
    status: "Finalist",
    accent: "orange",
    coverImage: "assets/social-preview.jpg",
    summary:
      "Finalist work for an international IAEA engineering challenge. Our UEA team developed a systems concept for uranium production; my assigned technical sections focused on wellfield control and surface processing, with preparation for finalist judging and Q&A.",
    challenge:
      "The project had to connect geology, extraction, instrumentation, process engineering, environmental protection and digital monitoring into one coherent system rather than treating uranium production as a single isolated operation.",
    approach:
      "I developed and communicated the control path from injection and recovery wells through monitoring instrumentation to surface processing, including ion exchange, elution, precipitation, dewatering, drying and calcining to U3O8. The team also linked process choices to water recovery, solution recirculation and aquifer-restoration requirements.",
    decisions: [
      "Present the process as a traceable flow from ore body to yellowcake so technical reviewers can see where sensing and control act.",
      "Use monitoring wells as an explicit early-warning layer rather than describing environmental protection only qualitatively.",
      "Keep AI and digital-twin ideas tied to defined engineering decisions such as flow, pressure, pH and grade monitoring."
    ],
    testing:
      "The finalist stage required a 20–25 minute team presentation followed by technical Q&A. I prepared the wellfield-control and surface-processing material so assumptions, process stages and sustainability claims could be defended under questioning.",
    impact:
      "The challenge expanded my systems-engineering experience beyond electronics: it required integrating sensing, control, process flow, sustainability and technical communication across a multidisciplinary problem.",
    nextSteps: [
      "Retain the project as evidence of systems thinking and technical communication rather than presenting it as specialist mining experience.",
      "Document the instrumentation/control architecture more formally if the concept is revisited.",
      "Link any future digital-twin work to measurable process states and explicit control decisions."
    ],
    skills: ["Systems engineering", "Process control", "Technical presentation", "Sustainability", "Engineering communication"],
    gallery: []
  });

  addProject({
    id: "aurora-vx",
    title: "AURORA-VX Embedded Avionics & Digital Twin",
    subtitle: "Requirements-driven eVTOL digital twin, embedded controller and PIL/HIL assurance platform",
    year: "2026",
    status: "Release candidate",
    accent: "navy",
    coverImage: "assets/images/lab-portrait.webp",
    summary:
      "A public, synthetic engineering demonstrator connecting six-degree-of-freedom vehicle dynamics, multirate sensing, navigation estimation, fault-tolerant control, embedded C and verification evidence in one traceable workflow.",
    challenge:
      "The project asks how an analytical control concept can be turned into an auditable embedded implementation without hiding the gap between desktop simulation and physical hardware evidence.",
    approach:
      "I structured the project around explicit requirements, architecture, simulation models, independently compiled embedded C, binary communications, fault injection and named verification artefacts rather than a single attractive simulation.",
    decisions: [
      "Keep the platform public, synthetic, non-flight and non-certified.",
      "Separate implemented desktop/POSIX evidence from planned physical STM32 promotion gates.",
      "Treat requirements and verification mappings as controlled engineering objects."
    ],
    testing:
      "Desktop simulation, compiled-host controller qualification, protocol fault testing and processor-in-the-loop workflows are linked to explicit requirements and generated evidence. Physical STM32 PIL and closed-loop HIL remain deliberately visible as pending promotion gates.",
    impact:
      "AURORA-VX demonstrates systems engineering, control, embedded software and verification as one digital thread rather than isolated technical exercises.",
    nextSteps: [
      "Promote the portable controller to an STM32-class target.",
      "Run physical serial PIL qualification with timing and reset evidence.",
      "Complete closed-loop hardware-in-the-loop testing without overstating the platform as flight hardware."
    ],
    skills: ["MATLAB/Simulink", "Embedded C", "Control systems", "PIL/HIL", "Requirements & traceability", "Verification"],
    gallery: []
  });
})();
