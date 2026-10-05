(() => {
  if (!window.PORTFOLIO_DATA) return;

  const data = window.PORTFOLIO_DATA;
  const findProject = (id) => Array.isArray(data.projects) ? data.projects.find((project) => project.id === id) : null;
  const findExperience = (organisation) => Array.isArray(data.experience) ? data.experience.find((item) => item.organisation === organisation) : null;

  // Current profile and project evidence, updated 5 October 2026.
  Object.assign(data.profile, {
  "name": "Karanveer Singh",
  "initials": "KS",
  "role": "Third-year MEng Electrical & Electronic Engineering Student",
  "organisation": "University of East Anglia",
  "location": "Norwich, United Kingdom",
  "siteUrl": "https://moomoocow29.github.io/engineering-portfolio/",
  "cv": "",
  "tagline": "PCBWay-sponsored robot controller PCB",
  "summary": "I am a third-year MEng Electrical and Electronic Engineering student at UEA, based in Norwich, with industrial electronics experience at MBDA. My current project turns a non-functional robot into a modular Nano ESP32 controller PCB, with the high-current motor stage kept off-board.",
  "statement": "PCBWay manufactured five bare boards. I completed 32 selected unpowered continuity and isolation checks; component assembly and powered testing are the next stages. The published case study records the design decisions, rejected candidates and inspection evidence.",
  "ctaPrimary": {
    "label": "Explore the PCB case study",
    "href": "projects/advanced-2wd-robot-controller/"
  },
  "ctaSecondary": {
    "label": "Read the published article",
    "href": "https://medium.com/@ks683557/i-designed-a-custom-robot-controller-pcb-from-scratch-fc130351fc59"
  },
  "links": [
    {
      "label": "LinkedIn",
      "href": "https://www.linkedin.com/in/karan-singh-6901a7246/"
    },
    {
      "label": "GitHub",
      "href": "https://github.com/MooMooCow29"
    },
    {
      "label": "Medium",
      "href": "https://medium.com/@ks683557"
    }
  ],
  "portrait": {
    "src": "assets/images/professional-headshot.webp",
    "alt": "Professional portrait of Karanveer Singh"
  },
  "heroImages": [
    {
      "src": "assets/images/pcbway-manufactured-board.webp",
      "alt": "Manufactured bare PCB, front and back",
      "caption": "Manufactured bare PCB, front and back",
      "href": "projects/advanced-2wd-robot-controller/"
    },
    {
      "src": "assets/images/pcbway-routing-candidates.webp",
      "alt": "Routed design candidates",
      "caption": "Routed design candidates",
      "href": "projects/advanced-2wd-robot-controller/"
    },
    {
      "src": "assets/images/pcbway-robot-platforms.webp",
      "alt": "The two robot platforms",
      "caption": "The two robot platforms",
      "href": "projects/advanced-2wd-robot-controller/"
    },
    {
      "src": "assets/images/pcbway-robot-teardown.webp",
      "alt": "Robot opened for inspection",
      "caption": "Robot opened for inspection",
      "href": "projects/advanced-2wd-robot-controller/"
    },
    {
      "src": "assets/images/pcbway-unpowered-probing.webp",
      "alt": "Unpowered continuity and isolation checks",
      "caption": "Unpowered continuity and isolation checks",
      "href": "projects/advanced-2wd-robot-controller/"
    }
  ],
  "highlights": [
    "MBDA electronics placement, 2026; graduate return offer received",
    "Electrical Systems Lead, Formula Student UEA, 2025-2026",
    "Vice-President, UEA Innovators, 2026-2027"
  ],
  "heroEyebrow": "Current project - PCBWay sponsorship"
});
  data.metrics = [
  {
    "value": "5",
    "label": "Bare PCBs manufactured by PCBWay"
  },
  {
    "value": "32",
    "label": "Selected unpowered incoming checks"
  },
  {
    "value": "MBDA",
    "label": "Electronics placement and return offer"
  },
  {
    "value": "70.5%",
    "label": "Year 2 average, First-class level"
  }
];
  { const project = findProject("advanced-2wd-robot-controller"); if (project) Object.assign(project, {
  "featured": true,
  "category": "Hardware & Embedded",
  "coverImage": "assets/images/pcbway-manufactured-board.webp",
  "coverPosition": "50% 50%",
  "coverLabel": "",
  "coverDetail": "",
  "links": [
    {
      "label": "Published PCBWay case study",
      "href": "https://medium.com/@ks683557/i-designed-a-custom-robot-controller-pcb-from-scratch-fc130351fc59"
    }
  ],
  "contribution": "Robot teardown, requirements, architecture revision, component and footprint selection, schematic capture, comparison of ten routing candidates, manufacturing-file review, incoming inspection and the published engineering case study.",
  "verification": [
    {
      "metric": "Routing candidates reviewed",
      "result": "10",
      "note": "The article distinguishes rejected candidates from candidates that were simply not selected."
    },
    {
      "metric": "Final CAD connectivity/footprint checks",
      "result": "0 unconnected pads; 0 footprint errors",
      "note": "Specific check categories; retained footprint-library warnings are documented."
    },
    {
      "metric": "Physical manufacture",
      "result": "5 bare PCBs",
      "note": "Manufacture was sponsored by PCBWay; boards are not yet populated."
    },
    {
      "metric": "Incoming electrical checks",
      "result": "32 selected checks",
      "note": "Unpowered continuity and isolation, rather than complete net or functional validation."
    }
  ],
  "gallery": [
    {
      "src": "assets/images/pcbway-manufactured-board.webp",
      "alt": "Manufactured bare PCB, front and back",
      "caption": "Five bare boards were manufactured by PCBWay. This photograph shows the board before component assembly."
    },
    {
      "src": "assets/images/pcbway-routing-candidates.webp",
      "alt": "Routed design candidates",
      "caption": "Candidate 10 and a rejected repair attempt, retained in the article to show how routing decisions were reviewed."
    },
    {
      "src": "assets/images/pcbway-robot-platforms.webp",
      "alt": "The two robot platforms",
      "caption": "The original robot and the separate plywood platform, photographed before the controller redesign."
    },
    {
      "src": "assets/images/pcbway-robot-teardown.webp",
      "alt": "Robot opened for inspection",
      "caption": "The opened robot and its original RoboPad controller. Teardown established the real hardware and interfaces."
    },
    {
      "src": "assets/images/pcbway-unpowered-probing.webp",
      "alt": "Unpowered continuity and isolation checks",
      "caption": "Selected incoming checks on the manufactured bare board. These measurements do not establish powered operation."
    }
  ],
  "decisions": [
    "Keep high-current motor switching on an external Cytron MDD3A so motor current does not traverse the custom PCB.",
    "Use a removable Arduino Nano ESP32 for Wi-Fi/BLE/USB-C access and recoverability during bring-up.",
    "Move from the earlier 2S LiPo/integrated-driver concept to a 6-cell 7.2 V NiMH controller/interface architecture.",
    "Preserve test points, antenna keep-out and connector access rather than optimising only for compactness."
  ],
  "nextSteps": [
    "Assemble the accepted board and inspect component orientation, solder joints and connectors.",
    "Apply current-limited power in stages and measure the input-protection path, controller supply and logic rails.",
    "Validate encoder conditioning, sensor/expansion interfaces and the external MDD3A controls independently.",
    "Only then run the defined 3 m closed-loop straight-line test and record measured motion results."
  ],
  "skills": [
    "PCB design",
    "KiCad",
    "Embedded systems",
    "Design for test",
    "Power/interface architecture",
    "Robotics",
    "Verification gating"
  ],
  "id": "advanced-2wd-robot-controller",
  "title": "PCBWay-Sponsored Robot Controller PCB",
  "subtitle": "From teardown and ten routing candidates to manufactured boards and incoming inspection",
  "year": "2026",
  "status": "Bare boards manufactured; incoming checks complete",
  "accent": "teal",
  "summary": "A PCBWay-sponsored 95 mm x 55 mm Nano ESP32 carrier for a redesigned two-wheel robot. Five bare boards have been manufactured and 32 selected unpowered continuity/isolation checks completed. Assembly and powered validation are next.",
  "challenge": "The original robot could not provide measured motor current, so an integrated motor driver would have relied on unverified current, thermal and switching assumptions. The first manufactured revision therefore separates controller interfaces from the high-current motor path.",
  "approach": "Teardown and electrical checks established the real hardware. The design then partitioned the Nano ESP32 carrier from the external MDD3A, compared routing candidates, reviewed manufacturing outputs and progressed to inspection of the received bare boards.",
  "testing": "Final CAD checks recorded zero unconnected pads and zero footprint errors, alongside retained footprint-library warnings. On receipt, 32 selected unpowered continuity and isolation checks supported acceptance for controlled assembly. This is incoming inspection, not proof of populated-board operation, motor control or closed-loop performance.",
  "impact": "The project now includes physical manufacturing and inspection evidence, rather than only CAD screenshots. The article explains which designs were rejected, why the motor power stage was moved off-board and what remains to be tested.",
  "facts": [
    {
      "label": "Controller",
      "value": "Removable Arduino Nano ESP32"
    },
    {
      "label": "Motor power stage",
      "value": "External Cytron MDD3A"
    },
    {
      "label": "Board",
      "value": "95 mm x 55 mm, two layers"
    },
    {
      "label": "Manufacture",
      "value": "Five bare boards sponsored by PCBWay"
    },
    {
      "label": "Incoming inspection",
      "value": "32 selected unpowered continuity/isolation checks"
    },
    {
      "label": "Current stage",
      "value": "Unpopulated board accepted for controlled assembly"
    }
  ],
  "caseStudySections": [
    {
      "title": "Teardown before design",
      "intro": "The original robot was non-functional. Opening it established the RoboPad RP-B0027 controller, SN754410NE motor driver, geared motors and battery wiring. Probe location mattered: a robot-side reading could not be treated as an isolated battery measurement."
    },
    {
      "title": "Why the motor stage moved off-board",
      "intro": "The non-functional original robot could not provide measured current for the fitted motors. Keeping the high-current stage on an external Cytron MDD3A reduced the current and thermal assumptions carried into the custom controller board."
    },
    {
      "title": "The final controller partition",
      "intro": "The Nano ESP32 carrier handles protected controller power, conditioned encoder signals, sensing and expansion. The external Cytron MDD3A carries the motor current. The removable controller and accessible interfaces support staged assembly, diagnosis and recovery."
    },
    {
      "title": "Ten candidates and a failed repair",
      "intro": "Ten routing candidates were compared. Candidate 10 was selected, but a later repair attempt produced 419 reported DRC errors. The reviewed connectivity was restored and checked before manufacturing release. The case study retains that failure because it explains the final decision."
    },
    {
      "title": "Release files and their limits",
      "intro": "The final record shows zero unconnected pads and zero footprint errors, with 46 footprint-library warnings retained and documented. Gerber and drill outputs were reviewed. These checks concern design and manufacturing files; they do not establish electrical performance after assembly."
    },
    {
      "title": "Manufacture and incoming inspection",
      "intro": "PCBWay manufactured five bare boards. Incoming inspection included 32 selected unpowered continuity and isolation checks across ground distribution, supply isolation, input protection and signal paths. The board was accepted for controlled assembly, rather than declared a working controller."
    },
    {
      "title": "What happens next",
      "intro": "Assembly and current-limited bring-up will precede interface checks and closed-loop robot tests. Rail behaviour, loaded motor-control operation and measured straight-line performance remain future evidence. The linked article and photographs show the completed manufacturing and inspection stage."
    }
  ],
  "coverFit": "contain"
}); }
  { const project = findProject("rf-energy-harvesting-bci") || findProject("energy-harvesting-epaper"); if (project) Object.assign(project, {
  "featured": true,
  "category": "Power & Embedded",
  "coverImage": "",
  "coverPosition": "50% 50%",
  "coverLabel": "ePAPER ENERGY HARVESTING",
  "coverDetail": "Power path · EPD bring-up · energy budget · experimental validation",
  "links": [],
  "contribution": "Literature review, programmed module baseline, raw-display firmware and driver investigation, complete-update measurement planning, wireless power/data comparison and staged circuit/PCB development.",
  "verification": [
    {
      "metric": "2.9-inch module programming",
      "result": "Demonstrated",
      "note": "Custom text and image displayed with an Arduino Nano."
    },
    {
      "metric": "Image retention after power removal",
      "result": "Observed",
      "note": "Retention does not prove that a new image can be written from harvested energy."
    },
    {
      "metric": "4.2-inch raw-panel baseline",
      "result": "Current work",
      "note": "Repeatable raw-panel operation is the next practical milestone."
    },
    {
      "metric": "Wireless batteryless update",
      "result": "Planned",
      "note": "The wireless link and integrated PCB have not yet been demonstrated."
    }
  ],
  "gallery": [],
  "decisions": [
    "Characterise the complete image update rather than treating display refresh alone as the load.",
    "Choose one wireless power/data route after comparing NFC and radiative RF against measured requirements.",
    "Prove the selected route on the bench before releasing the integrated PCB.",
    "Keep calibration/pilot trials separate from independent validation and retain failed outcomes."
  ],
  "nextSteps": [
    "Establish repeatable operation of the 4.2-inch raw display using the programmed module as a debugging reference.",
    "Measure complete-update energy, current peaks, usable supply voltage and measurement burden.",
    "Compare NFC and radiative RF, including data compatibility, coupling and charging/service time.",
    "Demonstrate a complete batteryless update on the bench before PCB design and manufacture.",
    "Validate the integrated board and its operating boundary; test startup/storage resistance where the chosen architecture requires buffering."
  ],
  "skills": [
    "Energy harvesting",
    "Power electronics",
    "Ultra-low-power systems",
    "Arduino / ePaper",
    "Experimental characterisation",
    "Research design"
  ],
  "id": "energy-harvesting-epaper",
  "title": "Wirelessly Powered ePaper Conference Badge",
  "subtitle": "MEng dissertation: complete image updates on one 4.2-inch raw display without a battery",
  "year": "2026–2027",
  "status": "Module baseline working; raw-panel development under way",
  "accent": "orange",
  "summary": "Investigating a compact batteryless conference badge around a 4.2-inch raw ePaper display. A 2.9-inch module has been programmed with custom text and an image using an Arduino Nano; the current work moves to the raw panel and measures the complete update before choosing the wireless power/data route.",
  "challenge": "Image retention after power removal is not the same as a batteryless image update. The project must support controller initialisation, payload reception and refresh, while excluding battery assistance and hidden power from programmers or measurement connections.",
  "approach": "Use the working 2.9-inch module as a debugging baseline, establish repeatable 4.2-inch raw-panel operation, then measure voltage, current and timing at defined electrical boundaries. Compare NFC with radiative RF against the measured load and available data path before committing to one architecture.",
  "testing": "The module baseline demonstrated custom text/image programming and retained the image after power removal. Raw-panel operation, complete transaction energy, a selected wireless link and a functioning batteryless integrated PCB remain to be demonstrated. Planned validation separates calibration and pilot trials from the primary dataset.",
  "impact": "The project connects embedded display control with low-power hardware, energy storage and experimental validation. The committed demonstrator is one conference badge; multi-display operation is outside the current plan.",
  "facts": [
    {
      "label": "Target",
      "value": "One 4.2-inch raw black-and-white ePaper conference badge"
    },
    {
      "label": "Demonstrated baseline",
      "value": "2.9-inch module programmed with an Arduino Nano"
    },
    {
      "label": "Update boundary",
      "value": "Initialisation, image reception and refresh"
    },
    {
      "label": "Candidate links",
      "value": "NFC or radiative RF; selection follows load measurements"
    },
    {
      "label": "Batteryless proof",
      "value": "No battery or hidden cable/programmer power"
    },
    {
      "label": "Supervisor",
      "value": "Dr Dennis Fitzpatrick"
    }
  ],
  "caseStudySections": [
    {
      "title": "A working display baseline",
      "intro": "The 2.9-inch Waveshare module was programmed from an Arduino Nano, first with the manufacturer demo and then with a custom badge image. The display retained that image after power was removed. This establishes a firmware/display baseline, while the 4.2-inch raw panel remains the next hardware stage."
    },
    {
      "title": "The complete update is the load",
      "intro": "A useful badge transaction includes controller initialisation, image reception and display refresh. Voltage/current and timing measurements must cover those stages at defined ports. Image retention is a property of the display; it does not establish the energy needed to write the next image."
    },
    {
      "title": "Choose the power and data route from measurements",
      "intro": "NFC offers a shared power/data link for a badge presented to a programming station. Radiative RF offers a separate receiver approach but also requires a compatible image-data route. Neither has been selected as a finished implementation; measured load, coupling, host availability and integration effort determine the choice."
    },
    {
      "title": "Storage and startup behaviour",
      "intro": "If the selected source cannot support update transients directly, temporary storage and startup gating will be evaluated. The plan compares energy-window and transient predictions against independent starting-voltage trials with two storage-path resistance configurations. If gating is unnecessary, validation instead characterises source and coupling limits."
    },
    {
      "title": "Bench proof before PCB release",
      "intro": "A complete update without battery or hidden connection power must be demonstrated before manufacturing the integrated receiver, controller and raw-display driver board. Supply paths through USB, programmers and instrumentation will be checked so they cannot conceal insufficient harvested energy."
    },
    {
      "title": "Current scope",
      "intro": "The committed scope is a single 4.2-inch conference badge. Complete-update outcomes, charging time, photographs and electrical records form the planned validation evidence. Multi-display operation is outside the current plan; bounded interruption/restart testing follows the primary dataset."
    }
  ]
}); }
  { const project = findProject("formula-student-electrical"); if (project) Object.assign(project, {
  "featured": true,
  "category": "Leadership & Systems",
  "coverImage": "assets/images/formula-student-requirements-plan.webp",
  "coverFit": "contain",
  "coverPosition": "50% 42%",
  "coverLabel": "FORMULA STUDENT",
  "coverDetail": "Electrical architecture · CAN · safety · integration",
  "links": [],
  "contribution": "Electrical Systems Lead responsible for architecture direction, technical coordination and interfaces across electrical subsystems.",
  "verification": [],
  "gallery": [
    {
      "src": "assets/images/formula-student-requirements-plan.webp",
      "caption": "Electrical Systems research and requirements presentation prepared in my role as Electrical Systems Lead."
    },
    {
      "src": "assets/images/formula-student-meeting-context.webp",
      "caption": "Concept-class electrical systems planning material used during team discussion."
    }
  ],
  "decisions": [
    "Treat CAN and grounding as system architecture, not wiring afterthoughts.",
    "Prioritise clear subsystem ownership and interface definitions.",
    "Use measurement and bring-up planning to reduce integration risk."
  ],
  "nextSteps": [
    "Extend the architecture and interface record with measured subsystem and vehicle-integration results as they become available.",
    "Capture public technical evidence of communication, supply and shutdown behaviour."
  ],
  "skills": [
    "Electrical architecture",
    "CAN bus",
    "Signal integrity",
    "Leadership",
    "Safety-related systems"
  ],
  "id": "formula-student-electrical",
  "title": "Formula Student Electrical Systems",
  "subtitle": "Low-voltage architecture, CAN integration and technical leadership",
  "year": "2025-2026",
  "status": "Electrical Systems Lead, 2025-2026",
  "accent": "navy",
  "summary": "Led low-voltage architecture and CAN integration for Formula Student UEA in 2025-2026, coordinating sensors, control and telemetry interfaces with mechanical and controls members.",
  "challenge": "A race-car electrical system is an interface problem as much as a circuit problem: subsystem ownership, grounding, communications, safety and testability all interact under a fixed competition schedule.",
  "approach": "Break the electrical system into clear interfaces, use architecture-level diagrams and design reviews, and keep vehicle-level integration visible while individual subsystem owners develop their hardware.",
  "testing": "Used CAN analysers and oscilloscopes to investigate communication frames and physical signals. Safety-related design and integration planning are documented; a completed vehicle-validation programme is not claimed.",
  "impact": "This is the portfolio’s strongest evidence of technical leadership and multidisciplinary systems work beyond an individual project.",
  "facts": [
    {
      "label": "Role",
      "value": "Electrical Systems Lead / Electronics & Controls"
    },
    {
      "label": "Vehicle context",
      "value": "Formula Student Concept Class"
    },
    {
      "label": "Primary scope",
      "value": "LV architecture, CAN, signal integrity, shutdown/safety interfaces"
    },
    {
      "label": "Tools",
      "value": "Architecture diagrams, CAN analysis, oscilloscope/logic analysis, design reviews"
    },
    {
      "label": "Engineering emphasis",
      "value": "Requirements before implementation"
    },
    {
      "label": "Status",
      "value": "Leadership role dated 2025-2026"
    }
  ],
  "caseStudySections": [
    {
      "title": "Leadership problem",
      "intro": "Formula Student electrical work is not one circuit. It is a set of interacting subsystems developed by different people under deadline pressure. My role was therefore to keep interfaces, safety assumptions, communication architecture and validation visible while individual subsystem owners make detailed design decisions."
    },
    {
      "title": "Research and requirements first",
      "intro": "The presentation shown on this page was part of establishing a requirements-led approach for the Concept Class electrical system. The objective is to avoid choosing components first and discovering later that voltage levels, communications, safety logic or subsystem boundaries do not fit together.",
      "bullets": [
        "Define the function and failure consequence of each electrical subsystem.",
        "Identify interfaces before assigning implementation details.",
        "Separate mandatory competition/safety constraints from discretionary design choices.",
        "Record assumptions so later changes can be justified rather than improvised."
      ]
    },
    {
      "title": "Low-voltage architecture",
      "intro": "The LV architecture has to distribute power to controllers, sensing, dashboards and communications while remaining diagnosable and compatible with vehicle safety requirements. This includes grounding/return strategy, protection, connectorisation, supply sequencing and the relationship between logic power and noisier loads."
    },
    {
      "title": "CAN and subsystem communication",
      "intro": "CAN is treated as a vehicle network with defined ownership, identifiers and failure modes, not just a pair of wires between modules. Integration planning includes where messages originate, which modules depend on them, how the bus is terminated and how a fault is isolated during testing.",
      "bullets": [
        "Use a CAN analyser during integration rather than debugging only through application code.",
        "Keep message definitions and node ownership explicit.",
        "Test missing/stale data behaviour rather than assuming every node is always healthy."
      ]
    },
    {
      "title": "Signal integrity and EMI thinking",
      "intro": "The electrical system combines fast digital edges, motors/actuation, long harnesses and multiple grounds. The design process therefore considers routing, return paths, termination, separation of noisy and sensitive circuits, and how test equipment will be attached during bring-up."
    },
    {
      "title": "Shutdown and safety-related interfaces",
      "intro": "Safety circuitry is approached as an independent chain whose state should not rely on high-level software behaving correctly. The design work therefore distinguishes between functional controls and safety-related shutdown paths, and keeps testability visible."
    },
    {
      "title": "Integration and verification strategy",
      "intro": "The plan is to bring subsystems up individually, verify supply and communications behaviour, then integrate progressively at vehicle level. Oscilloscopes, logic/CAN analysis and deliberately injected communication/power faults are more useful than waiting for a full-car failure.",
      "bullets": [
        "Bench-test each subsystem with known-good power and communications.",
        "Verify bus termination and message timing before vehicle integration.",
        "Record failure symptoms and fixes so the team builds institutional knowledge."
      ]
    },
    {
      "title": "What this role demonstrates",
      "intro": "This case study is less about a single finished artefact and more about engineering leadership: turning an ambiguous student-vehicle electrical problem into requirements, interfaces, ownership and a testable integration plan."
    }
  ]
}); }
  { const project = findProject("analogue-communications-prototype"); if (project) Object.assign(project, {
  "featured": false,
  "category": "Hardware & Embedded",
  "coverImage": "assets/images/oscilloscope-periodic.webp",
  "coverPosition": "50% 50%",
  "coverLabel": "",
  "coverDetail": "",
  "links": [],
  "contribution": "Hands-on circuit/sensor integration, staged testing and documentation.",
  "verification": [],
  "gallery": [
    {
      "src": "assets/images/analogue-breadboard-multistage.webp",
      "caption": "Multi-stage operational-amplifier breadboard build."
    },
    {
      "src": "assets/images/analogue-breadboard-blue-bin.webp",
      "caption": "Circuit section isolated for staged testing."
    },
    {
      "src": "assets/images/analogue-breadboard-probes-wide.webp",
      "caption": "Breadboard setup with laboratory probe connections."
    },
    {
      "src": "assets/images/analogue-breadboard-probes-close.webp",
      "caption": "Closer view of test leads and circuit nodes."
    },
    {
      "src": "assets/images/analogue-breadboard-mid.webp",
      "caption": "Intermediate integrated analogue circuit revision."
    },
    {
      "src": "assets/images/analogue-breadboard-close.webp",
      "caption": "Close-up of component placement and short interconnects."
    },
    {
      "src": "assets/images/analogue-breadboard-probes-vertical.webp",
      "caption": "Vertical view of the breadboard under test."
    },
    {
      "src": "assets/images/analogue-breadboard-blue-bin-wide.webp",
      "caption": "Wider view of the circuit inside the laboratory tray."
    },
    {
      "src": "assets/images/analogue-breadboard-scope-probes.webp",
      "caption": "Oscilloscope leads connected to the circuit under test."
    },
    {
      "src": "assets/images/analogue-breadboard-banana-jacks.webp",
      "caption": "Circuit connected to laboratory supply terminals."
    },
    {
      "src": "assets/images/opamp-breadboard-simple.webp",
      "caption": "Simpler operational-amplifier subcircuit used during development."
    },
    {
      "src": "assets/images/oscilloscope-periodic.webp",
      "caption": "Periodic waveform captured during bench testing."
    },
    {
      "src": "assets/images/oscilloscope-transients.webp",
      "caption": "Waveform capture showing repeated transient features."
    }
  ],
  "decisions": [
    "Build and test one stage at a time instead of powering the complete circuit immediately.",
    "Prioritise probe access and readable wiring over compactness.",
    "Retain raw waveform photographs without overstating undocumented measurements."
  ],
  "nextSteps": [
    "Record probe point, supply conditions and scaling alongside future captures.",
    "Compare measured gain and bandwidth against calculations.",
    "Rebuild the final circuit with shorter signal paths."
  ],
  "skills": [
    "Analogue electronics",
    "Oscilloscope use",
    "Breadboarding",
    "Signal debugging"
  ],
  "id": "analogue-communications-prototype",
  "title": "Analogue Communications Prototype",
  "subtitle": "Staged breadboard development and oscilloscope-led validation",
  "year": "2025–2026",
  "status": "Completed prototype",
  "accent": "orange",
  "summary": "A multi-stage analogue breadboard built one block at a time, using DC operating-point checks and intermediate-node measurements before integration. Bench work investigated clipping, loading and transients against MATLAB/Simulink models.",
  "challenge": "Multi-stage analogue circuits can fail through biasing, loading, gain, bandwidth and wiring interactions. The difficulty is not only building each section, but verifying that the complete signal path behaves as expected.",
  "approach": "The circuit was built as testable stages, with accessible probe points and oscilloscope checks used before and after integration.",
  "testing": "Used a lab supply, signal generator and oscilloscope to investigate clipping, loading and transient behaviour and compare measured waveforms with the model. A numerical accuracy or final performance specification is not claimed.",
  "impact": "The work strengthened practical analogue-debugging ability and reinforced the difference between a circuit that looks complete and one that has been instrumentally verified.",
  "facts": [
    {
      "label": "Build style",
      "value": "Multi-stage breadboard analogue circuit"
    },
    {
      "label": "Validation",
      "value": "Oscilloscope-led staged bring-up"
    },
    {
      "label": "Primary risks",
      "value": "Bias, loading, gain, bandwidth, wiring and transients"
    },
    {
      "label": "Evidence",
      "value": "Bench photos + waveform captures"
    },
    {
      "label": "Stage",
      "value": "Completed coursework prototype"
    }
  ],
  "caseStudySections": [
    {
      "title": "Why staged bring-up mattered",
      "intro": "A multi-stage analogue circuit can fail even if every individual subcircuit looks correct on paper. Bias points, source/load impedance, breadboard parasitics and wiring mistakes compound when stages are connected."
    },
    {
      "title": "Build strategy",
      "intro": "I kept probe points accessible and built in stages. DC conditions were checked before applying the dynamic signal, then intermediate nodes were measured before the next stage was connected."
    },
    {
      "title": "Oscilloscope use",
      "intro": "The oscilloscope was used to compare periodic behaviour, amplitude and transient features at different nodes. The portfolio keeps the raw captures rather than inventing performance figures that were not recorded at the time."
    },
    {
      "title": "Debugging approach",
      "intro": "When the waveform was wrong, the debugging sequence was supply → bias/DC node → input signal → stage output → interstage loading, rather than replacing parts at random."
    },
    {
      "title": "Breadboard limitations",
      "intro": "Long leads and shared breadboard rails add resistance, capacitance and coupling. A successful breadboard therefore demonstrates the concept but not automatically the final bandwidth/noise performance of a PCB implementation."
    },
    {
      "title": "What I would improve",
      "intro": "Future analogue work should pair each photo/capture with probe point, supply voltage, time/div, volts/div and expected value so the evidence is quantitatively reusable later."
    }
  ]
}); }
  { const project = findProject("pipe-climbing-robot"); if (project) Object.assign(project, {
  "featured": false,
  "category": "Hardware & Embedded",
  "coverImage": "",
  "coverPosition": "50% 50%",
  "coverLabel": "PIPE ROBOT",
  "coverDetail": "Constrained mechanics · motor selection · integration",
  "links": [],
  "contribution": "Electrical architecture, motor/controller interfaces, component and datasheet checks, OrCAD ERC, pin mapping and bill of materials.",
  "verification": [],
  "gallery": [],
  "decisions": [
    "Avoid over-designing beyond the challenge objective.",
    "Keep mechanical grip and electrical actuation decisions coupled."
  ],
  "nextSteps": [
    "Prototype the drive/grip mechanism.",
    "Measure traction and motor-current requirements before adding control complexity."
  ],
  "skills": [
    "Mechanism design",
    "Motor selection",
    "Rapid prototyping",
    "Constraint analysis"
  ],
  "id": "pipe-climbing-robot",
  "title": "IMechE Pipe-Mounted Inspection Robot",
  "subtitle": "Competition design under severe mechanical and budget constraints",
  "year": "2026",
  "status": "Electrical design and integration preparation",
  "accent": "orange",
  "summary": "Defined Arduino Nano, H-bridge, servo and battery interfaces for a robot travelling along 22 mm copper pipe within a strict component budget. Competition rules, motor dependencies and datasheet checks informed the pin map and bill of materials.",
  "challenge": "The pipe geometry removes many conventional chassis options and makes centre of mass, grip and drive architecture decisive.",
  "approach": "Start from the physical constraint, then build the actuation and electrical architecture around the minimum system needed to traverse the pipe.",
  "testing": "OrCAD ERC and interface/datasheet review supported design preparation. Integrated traversal reliability and motor-current measurements remain future physical evidence.",
  "impact": "A useful example of engineering under strict physical constraints rather than open-ended prototyping.",
  "facts": [
    {
      "label": "Target",
      "value": "22 mm copper pipe"
    },
    {
      "label": "Design driver",
      "value": "Grip / centre of mass / geometry"
    },
    {
      "label": "Constraint",
      "value": "Low budget / fast competition build"
    },
    {
      "label": "Approach",
      "value": "Mechanical constraint first, then electrical architecture"
    },
    {
      "label": "Stage",
      "value": "Concept / prototype planning"
    }
  ],
  "caseStudySections": [
    {
      "title": "Constraint-led design",
      "intro": "A robot that must traverse a narrow copper pipe cannot begin with a conventional flat chassis. The pipe diameter sets the contact geometry, which then drives motor placement, centre of mass, grip and the available space for electronics."
    },
    {
      "title": "Mechanical concept",
      "intro": "The concept used a cantilevered arrangement so the drive/contact system could maintain pressure against the pipe while keeping the mass distribution controllable."
    },
    {
      "title": "Electrical implications",
      "intro": "Motor voltage/current, battery mass and controller placement feed directly back into traction and balance. Electrical component selection therefore cannot be separated from the mechanical concept."
    },
    {
      "title": "Acceptance criteria",
      "intro": "The meaningful test is physical traversal: start reliably, maintain grip, avoid rotating around the pipe, and cover the required distance within the competition constraints."
    },
    {
      "title": "Next iteration",
      "intro": "Prototype the simplest contact/drive geometry first and measure failure modes before adding sophisticated sensing or control."
    }
  ]
}); }
  { const project = findProject("emg-controlled-rc-car"); if (project) Object.assign(project, {
  "featured": false,
  "category": "Hardware & Embedded",
  "coverImage": "",
  "coverPosition": "50% 50%",
  "coverLabel": "EMG CONTROL",
  "coverDetail": "Biomedical signal input · embedded control · mobile robotics",
  "links": [
    {
      "label": "Medium profile",
      "href": "https://medium.com/@ks683557"
    }
  ],
  "contribution": "Project architecture, signal-chain and interface definition, calibration and safe-stop planning.",
  "verification": [],
  "gallery": [],
  "decisions": [
    "Keep the command mapping simple enough to debug.",
    "Treat the project as an interface experiment, not a medical device claim."
  ],
  "nextSteps": [
    "Rebuild with better analogue front-end design and signal processing.",
    "Add calibrated features and quantified classification performance."
  ],
  "skills": [
    "EMG",
    "Embedded systems",
    "Human-machine interfaces",
    "Robotics"
  ],
  "id": "emg-controlled-rc-car",
  "title": "EMG-Controlled RC Car",
  "subtitle": "Using muscle signals as an input to a mobile robotic system",
  "year": "2026",
  "status": "Prototype architecture; quantified validation planned",
  "accent": "orange",
  "summary": "A team prototype architecture separating EMG acquisition, analogue conditioning, sampling, decision logic and wireless vehicle control into testable blocks. Calibration, confidence thresholds and safe-stop behaviour are defined; false-trigger and latency checks remain planned.",
  "challenge": "Muscle signals are noisy and variable, so the interface has to turn a biological signal into a stable, understandable command rather than simply reading a sensor value.",
  "approach": "Use a simple signal-to-command chain first, then integrate the output with the mobile platform and document the limitations.",
  "testing": "Planned checks address false triggers, command latency, calibration sensitivity and safe-stop response. Calibrated classification performance or clinical validation is not claimed.",
  "impact": "An early bridge between electronics, human-machine interfaces and the later interest in neurotechnology/medtech.",
  "facts": [
    {
      "label": "Domain",
      "value": "Human-machine interface / embedded robotics"
    },
    {
      "label": "Input",
      "value": "EMG muscle activity"
    },
    {
      "label": "Output",
      "value": "Vehicle command"
    },
    {
      "label": "Primary issue",
      "value": "Noise, variability and threshold stability"
    },
    {
      "label": "Current evidence",
      "value": "Architecture and test planning; quantified performance not reported"
    }
  ],
  "caseStudySections": [
    {
      "title": "Signal chain and interfaces",
      "intro": "The team architecture separates acquisition, analogue conditioning, sampling, decision logic and wireless vehicle control. That separation allows noise and timing problems to be located before the full prototype is integrated."
    },
    {
      "title": "Calibration and safe behaviour",
      "intro": "EMG amplitude depends on the user, electrode placement and muscle state. Calibration, confidence thresholds and safe-stop behaviour therefore belong in the control plan rather than being added after a command failure."
    },
    {
      "title": "Planned validation",
      "intro": "False-trigger behaviour and command latency require measured trials with documented conditions. Those checks are planned; this case study does not claim a completed classifier or clinical-grade acquisition system."
    }
  ]
}); }
  { const item = findExperience("Formula Student UEA"); if (item) Object.assign(item, {
  "title": "Electrical Systems Lead",
  "organisation": "Formula Student UEA",
  "period": "2025-2026",
  "summary": "Led low-voltage architecture and CAN integration, worked on shutdown and brake-plausibility circuitry, and coordinated electrical interfaces with the mechanical and controls teams. Used CAN analysis and oscilloscope measurements to support debugging and documentation."
}); }
  { const item = findExperience("MBDA, Stevenage"); if (item) Object.assign(item, {
  "title": "Electronics Engineering Placement",
  "organisation": "MBDA, Stevenage",
  "period": "Jun-Aug 2026",
  "summary": "Designed and prototyped circuits, defined component/pin implementation and supporting C code, and used OrCAD/Zuken for PCB development. Investigated prototype failures with bench measurements, microscopy, CT and CSAM, documented findings and presented the PCB work. Received a graduate return offer after the placement."
}); }

  // Update all capability links that pointed to the superseded dissertation id.
  if (Array.isArray(data.skills)) {
    data.skills.forEach((skill) => {
      if (!Array.isArray(skill.projectIds)) return;
      skill.projectIds = skill.projectIds.map((id) => id === "rf-energy-harvesting-bci" ? "energy-harvesting-epaper" : id);
    });
  }
})();
