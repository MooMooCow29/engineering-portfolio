(() => {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  data.profile.tagline = "Electronics engineer in training — building, testing and documenting real systems.";
  data.profile.summary =
    "I am an MEng Electrical & Electronic Engineering student entering third year, with industrial electronics experience at MBDA, a PCBWay-sponsored custom PCB project, Formula Student electrical leadership and finalist experience in an IAEA engineering challenge. I focus on evidence: requirements, prototypes, measurements, failure analysis, verification and what changed after testing.";
  data.profile.highlights = [
    "MBDA Electronics Intern — graduate return offer communicated",
    "IAEA Challenge Finalist — 2026",
    "Vice-President — UEA Innovators",
    "Electrical Systems Lead — Formula Student UEA",
    "PCBWay-sponsored custom robot-controller PCB",
    "AURORA-VX embedded avionics & digital-twin project"
  ];

  data.metrics = [
    { value: "IAEA", label: "Challenge finalist — 2026" },
    { value: "3,000+", label: "Medium readers reached in three months" },
    { value: "MBDA", label: "Electronics internship completed; return offer communicated" },
    { value: "Build → verify", label: "Preferred engineering workflow" }
  ];

  data.skills = [
    {
      title: "Embedded systems",
      items: ["Microcontroller integration", "Sensor interfaces", "Embedded C/C++", "Hardware–software debugging"]
    },
    {
      title: "Robotics",
      items: ["Differential-drive platforms", "Motor and sensor integration", "CAN systems", "Prototype iteration"]
    },
    {
      title: "Control & verification",
      items: ["MATLAB/Simulink", "Requirements & traceability", "PIL/HIL workflows", "Testing strategy"]
    },
    {
      title: "Electronics design",
      items: ["KiCad / OrCAD / Altium", "Analogue & digital circuits", "Power architecture", "PCB release & DRC"]
    },
    {
      title: "Research & communication",
      items: ["First-principles explanation", "Technical reports", "Failure analysis", "Peer mentoring"]
    }
  ];

  const replaceExperience = (title, replacement) => {
    const i = data.experience.findIndex((item) => item.title === title);
    if (i >= 0) data.experience[i] = replacement;
    else data.experience.push(replacement);
  };

  replaceExperience("Electronics Engineering Placement", {
    title: "Electronics Engineering Placement",
    organisation: "MBDA, Stevenage",
    period: "Jun–Aug 2026",
    summary:
      "Completed an industrial electronics placement covering circuit design and prototyping, PCB routing/manufacturing workflows, and failure analysis using electronic test equipment, optical microscopy, CT and CSAM. Produced technical reports for engineering stakeholders; my manager also confirmed a graduate return offer, with formal documentation pending."
  });

  const innovatorIndex = data.experience.findIndex((item) => item.organisation === "UEA Innovators");
  const innovator = {
    title: "Vice-President",
    organisation: "UEA Innovators",
    period: "2026–Present",
    summary:
      "Support society strategy, fundraising and student-led engineering activity, including hackathon planning, electronics micro-projects and technical workshops."
  };
  if (innovatorIndex >= 0) data.experience[innovatorIndex] = innovator;
  else data.experience.push(innovator);

  if (!data.experience.some((item) => item.title === "IAEA Challenge Finalist")) {
    data.experience.push({
      title: "IAEA Challenge Finalist",
      organisation: "Uranium Initiative — University of East Anglia team",
      period: "2026",
      summary:
        "Selected as a finalist in an international IAEA engineering challenge. Contributed the wellfield-control and surface-processing sections of a uranium-production concept and prepared technical material for finalist judging and Q&A."
    });
  }

  if (!data.experience.some((item) => item.title === "Technical Writer")) {
    data.experience.push({
      title: "Technical Writer",
      organisation: "Medium",
      period: "2025–Present",
      summary:
        "Publish first-principles engineering articles on robotics, control and electronics; reached 3,000+ readers in three months, and the work led to PCBWay sponsorship for a custom robot-controller PCB."
    });
  }

  const robot = data.projects.find((project) => project.id === "advanced-2wd-robot-controller");
  if (robot) {
    robot.title = "Advanced 2WD Robot Controller PCB";
    robot.subtitle = "PCBWay-sponsored custom controller taken through requirements, routing, DRC and manufacturing release";
    robot.year = "2026";
    robot.status = "Manufacturing release complete";
    robot.summary =
      "A PCBWay-sponsored redesign of a non-functional differential-drive robot around a 95 mm × 55 mm two-layer controller PCB with an Arduino Nano ESP32, protected power distribution, conditioned quadrature-encoder channels and expansion interfaces.";
    robot.challenge =
      "The starting platform was mechanically usable but electrically uncertain. The design had to separate confirmed physical facts from assumptions, handle battery and encoder interfaces safely, preserve debug access and reach a manufacturable release without pretending that DRC alone proves physical operation.";
    robot.approach =
      "I converted the platform into explicit requirements, selected an architecture that keeps high-current motor drive external via a Cytron MDD3A, routed multiple candidate boards, returned the chosen design to native KiCad for verification and audited the Gerber/Excellon outputs before sponsor submission.";
    robot.decisions = [
      "Use a removable Arduino Nano ESP32 for Wi-Fi/BLE, USB-C access and replaceability.",
      "Keep high-current motor switching off the custom PCB and use the board for protected power, sensing, encoder conditioning and expansion.",
      "Treat native KiCad DRC and Gerber inspection as release gates, not as substitutes for physical bring-up."
    ];
    robot.testing =
      "The released board has zero unconnected pads and zero footprint errors; routing, power-net comprehension, bypass placement, antenna keepout and manufacturing outputs were checked. Physical assembly, power-up and 3 m closed-loop motion testing remain the next evidence gates.";
    robot.impact =
      "The project now shows a complete design-release workflow: uncertain legacy hardware → requirements → architecture → candidate routing → native verification → audited manufacturing package.";
    robot.nextSteps = [
      "Assemble and inspect the manufactured PCB.",
      "Perform staged continuity and power-rail bring-up before fitting the controller and sensors.",
      "Close the loop with encoder feedback and document a repeatable 3 m motion test."
    ];
    robot.skills = ["PCB design", "KiCad", "Embedded systems", "Power architecture", "Design verification"];
  }

  const research = data.projects.find((project) => project.id === "energy-harvesting-epaper");
  if (research) {
    research.title = "RF Energy Harvesting for Ultra-Low-Power BCI Hardware";
    research.subtitle = "MEng dissertation direction — rectification, storage, power management and intermittent ultra-low-power loads";
    research.year = "2026–2028";
    research.status = "Research direction";
    research.summary =
      "An emerging dissertation direction exploring whether ambient or intentionally supplied RF energy can be rectified, conditioned, stored and used to support ultra-low-power brain-computer-interface electronics.";
    research.challenge =
      "The interesting engineering problem is not simply collecting RF energy; it is maintaining useful operation when the available harvested power is small, variable and intermittent while the sensing or interface electronics still require predictable voltage and energy.";
    research.approach =
      "The work is being framed from first principles around RF source assumptions, rectifier efficiency, impedance matching, power-management thresholds, energy storage, cold-start behaviour and realistic load duty cycles. Early stripboard validation is planned before committing the architecture to a PCB.";
    research.decisions = [
      "Separate speculative long-term BCI applications from what the laboratory prototype can actually demonstrate.",
      "Measure harvested power and conversion efficiency before selecting a final load architecture.",
      "Use staged prototyping so rectification, storage and load behaviour can be verified independently."
    ];
    research.testing =
      "Planned evidence includes RF input/power assumptions, rectifier and power-management efficiency, capacitor/storage charge curves, cold-start behaviour and the ability to run a defined ultra-low-power load intermittently.";
    research.impact =
      "The project is intended to bridge RF/power electronics and neurotechnology while keeping claims tied to measurable electrical performance.";
    research.nextSteps = [
      "Define a defensible RF source and power budget.",
      "Prototype and characterise the rectifier/power-management chain.",
      "Select a representative ultra-low-power load before PCB integration."
    ];
    research.skills = ["RF energy harvesting", "Power electronics", "Low-power design", "Experimental research"];
  }
})();
