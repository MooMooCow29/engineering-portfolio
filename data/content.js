window.PORTFOLIO_DATA = {
  profile: {
    name: "Karanveer Singh",
    initials: "KS",
    role: "MEng Electrical & Electronic Engineering Student",
    organisation: "University of East Anglia",
    location: "Bedford, United Kingdom",
    siteUrl: "https://moomoocow29.github.io/engineering-portfolio/",
    cv: "assets/Karanveer_Singh_Public_CV.pdf",
    tagline: "Engineering ideas into reality.",
    summary:
      "I design, build and test electrical and embedded systems across robotics, sensing, control and energy-focused projects. The emphasis is on evidence: prototypes, measurements, trade-offs and what changed after testing.",
    statement:
      "This portfolio uses an industrial editorial visual system inspired by engineering drawings, technical notebooks and instrument panels. The style is distinctive, but the real project work remains the focus.",
    ctaPrimary: { label: "View projects", href: "#projects" },
    ctaSecondary: { label: "Explore evidence", href: "#archive" },
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/karan-singh-6901a7246/" },
      { label: "GitHub", href: "https://github.com/MooMooCow29" },
      { label: "Medium", href: "https://medium.com/@ks683557" }
    ],
    portrait: {
      src: "assets/images/lab-portrait.webp",
      alt: "Engineering student standing beside laboratory test equipment"
    },
    heroImages: [
      { src: "assets/images/robot-window-front-clean.webp", alt: "Front view of a small mobile robot prototype" },
      { src: "assets/images/oscilloscope-periodic.webp", alt: "Oscilloscope display showing a measured periodic waveform" },
      { src: "assets/images/analogue-breadboard-multistage.webp", alt: "Multistage analogue circuit built on a breadboard" },
      { src: "assets/images/robot-comparison-desk.webp", alt: "Two different mobile robot chassis designs photographed together" }
    ],
    highlights: [
      "Electrical Systems Lead — Formula Student UEA",
      "Head of Electrical Engineering — UEA Innovators",
      "Projects spanning robotics, embedded systems, power electronics and engineering communication"
    ]
  },

  navigation: [
    { label: "Home", href: "#top" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ],

  metrics: [
    { value: "7", label: "Engineering case studies and project directions" },
    { value: "30+", label: "Students supported through PCB learning sessions" },
    { value: "45+", label: "Students supported through simulation sessions" },
    { value: "Build → test", label: "Preferred engineering workflow" }
  ],

  skills: [
    {
      title: "Embedded systems",
      items: ["Microcontroller integration", "Sensor interfaces", "State logic", "Hardware–software debugging"]
    },
    {
      title: "Robotics",
      items: ["Differential-drive platforms", "Motor and sensor integration", "Packaging constraints", "Prototype iteration"]
    },
    {
      title: "Control & automation",
      items: ["Feedback-system thinking", "Mission and energy modelling", "Heading-control direction", "Testing strategy"]
    },
    {
      title: "Electronics design",
      items: ["Analogue breadboarding", "Motor drivers", "Power architecture", "PCB design planning"]
    },
    {
      title: "Research & communication",
      items: ["First-principles explanation", "Technical articles", "Design documentation", "Peer mentoring"]
    }
  ],

  experience: [
    {
      title: "Electronics Engineering Placement",
      organisation: "MBDA, Stevenage",
      period: "Jun–Aug 2026",
      summary:
        "Practical electronics placement covering circuit prototyping, PCB design and routing investigations, failure analysis using electronic test equipment and CT inspection, and technical reporting in a controlled engineering environment."
    },
    {
      title: "Electrical Systems Lead",
      organisation: "Formula Student UEA",
      period: "2025–Present",
      summary:
        "Leading work around low-voltage architecture, CAN integration, signal integrity, safety-related circuits and technical coordination across the electrical team."
    },
    {
      title: "Head of Electrical Engineering",
      organisation: "UEA Innovators",
      period: "Current",
      summary:
        "Supporting student-led electronics projects, PCB learning, prototyping sessions and cross-society engineering activity."
    },
    {
      title: "Nuffield Engineering Placement",
      organisation: "Cranfield University",
      period: "Jul–Aug 2023",
      summary:
        "Analysed VTOL aircraft performance across alternative designs and propulsion configurations using MATLAB, then presented the engineering trade-offs to a review panel."
    },
    {
      title: "Engineering Mentor",
      organisation: "University workshops",
      period: "2025–2026",
      summary:
        "Helped deliver and support OrCAD PCB and ANSYS Fluent sessions for groups of engineering students."
    }
  ],

  writing: [
    { title: "Why Stealth Is an Electrical Engineering Problem", href: "https://medium.com/@ks683557" },
    { title: "Ziegler–Nichols PID Tuning From First Principles", href: "https://medium.com/@ks683557" },
    { title: "Matrices From First Principles", href: "https://medium.com/@ks683557" },
    { title: "Engineering trade-offs in fighter jet design", href: "https://medium.com/@ks683557" }
  ],

  projects: [
    {
      id: "advanced-2wd-robot-controller",
      title: "Advanced 2WD Robot Controller",
      subtitle: "PCBWay-sponsored progression from exposed prototype hardware toward a cleaner PCB-backed mobile platform",
      year: "2026",
      status: "In development",
      accent: "teal",
      coverImage: "assets/images/robot-comparison-desk.webp",
      summary:
        "A long-form robotics project documenting the transition from an off-the-shelf Arduino and motor-shield prototype toward a more deliberate control, power and packaging architecture.",
      challenge:
        "The current robot is valuable because it exposes real engineering constraints: loose wiring, limited packaging space, uncertain power distribution, motor-driver decisions and sensor placement. The task is to learn from that prototype and convert the lessons into a more robust system.",
      approach:
        "I documented the chassis and electronics from multiple angles, separated the platform into mechanical, sensing, power and control concerns, and used the existing build as the baseline for a PCBWay-supported custom controller direction.",
      decisions: [
        "Keep the early prototype visible as engineering evidence rather than presenting only a polished final concept.",
        "Treat test access, power integrity and motor-current margin as first-order design constraints.",
        "Use the next chassis revision to improve integration, not merely appearance."
      ],
      testing:
        "Current validation focuses on subsystem identification, motor and wheel configuration, ultrasonic sensor placement, power-source limitations and the physical interfaces that the next controller must support.",
      impact:
        "The project demonstrates progression: rapid prototyping first, then requirements, architecture and custom hardware decisions grounded in what the physical platform revealed.",
      nextSteps: [
        "Complete the custom controller schematic and component review.",
        "Improve power distribution and wiring discipline.",
        "Add measured motor-current, regulator and control-performance results."
      ],
      skills: ["Robotics", "Embedded systems", "Power architecture", "PCB planning"],
      gallery: [
        { src: "assets/images/robot-window-top-threequarter.webp", caption: "Assembled robot viewed from above beside a window." },
        { src: "assets/images/robot-wood-side-angle.webp", caption: "Early side-angle view of the prototype platform." },
        { src: "assets/images/robot-window-low-side-a.webp", caption: "Low side profile showing wheel size, ground clearance and exposed wiring." },
        { src: "assets/images/robot-window-front-a.webp", caption: "Front view centred on the HC-SR04 ultrasonic sensor." },
        { src: "assets/images/robot-window-low-side-b.webp", caption: "Alternative low-angle view used to review chassis geometry." },
        { src: "assets/images/robot-comparison-desk.webp", caption: "Existing robot beside a cleaner next-generation chassis concept." },
        { src: "assets/images/robot-wheel-closeup-mounted.webp", caption: "Mounted wheel close-up showing tread and motor relationship." },
        { src: "assets/images/robot-comparison-low.webp", caption: "Low comparison view between the current and future platform directions." },
        { src: "assets/images/robot-wood-side.webp", caption: "Side view showing the electronics stack and battery location." },
        { src: "assets/images/robot-window-front-b.webp", caption: "Robot photographed from the front on a windowsill." },
        { src: "assets/images/robot-window-front-clean.webp", caption: "Cleaner front presentation of the prototype." },
        { src: "assets/images/robot-desk-front.webp", caption: "Front desk view showing sensor and caster arrangement." },
        { src: "assets/images/robot-desk-side.webp", caption: "Desk-side view used to inspect packaging and wheelbase." },
        { src: "assets/images/robot-desk-topside.webp", caption: "Top-side view showing controller stack and wiring." }
      ]
    },

    {
      id: "analogue-communications-prototype",
      title: "Analogue Communications Prototype",
      subtitle: "Staged breadboard development and oscilloscope-led validation",
      year: "2025–2026",
      status: "Completed prototype",
      accent: "orange",
      coverImage: "assets/images/oscilloscope-periodic.webp",
      summary:
        "A multi-stage analogue electronics build developed through incremental circuit construction, measured waveforms and repeated bench debugging.",
      challenge:
        "Multi-stage analogue circuits can fail through biasing, loading, gain, bandwidth and wiring interactions. The difficulty is not only building each section, but verifying that the complete signal path behaves as expected.",
      approach:
        "The circuit was built as testable stages, with accessible probe points and oscilloscope checks used before and after integration.",
      decisions: [
        "Build and test one stage at a time instead of powering the complete circuit immediately.",
        "Prioritise probe access and readable wiring over compactness.",
        "Retain raw waveform photographs without overstating undocumented measurements."
      ],
      testing:
        "DC conditions were checked before signal injection, intermediate nodes were probed, and waveform behaviour was compared across successive integration stages.",
      impact:
        "The work strengthened practical analogue-debugging ability and reinforced the difference between a circuit that looks complete and one that has been instrumentally verified.",
      nextSteps: [
        "Record probe point, supply conditions and scaling alongside future captures.",
        "Compare measured gain and bandwidth against calculations.",
        "Rebuild the final circuit with shorter signal paths."
      ],
      skills: ["Analogue electronics", "Oscilloscope use", "Breadboarding", "Signal debugging"],
      gallery: [
        { src: "assets/images/analogue-breadboard-multistage.webp", caption: "Multi-stage operational-amplifier breadboard build." },
        { src: "assets/images/analogue-breadboard-blue-bin.webp", caption: "Circuit section isolated for staged testing." },
        { src: "assets/images/analogue-breadboard-probes-wide.webp", caption: "Breadboard setup with laboratory probe connections." },
        { src: "assets/images/analogue-breadboard-probes-close.webp", caption: "Closer view of test leads and circuit nodes." },
        { src: "assets/images/analogue-breadboard-mid.webp", caption: "Intermediate integrated analogue circuit revision." },
        { src: "assets/images/analogue-breadboard-close.webp", caption: "Close-up of component placement and short interconnects." },
        { src: "assets/images/analogue-breadboard-probes-vertical.webp", caption: "Vertical view of the breadboard under test." },
        { src: "assets/images/analogue-breadboard-blue-bin-wide.webp", caption: "Wider view of the circuit inside the laboratory tray." },
        { src: "assets/images/analogue-breadboard-scope-probes.webp", caption: "Oscilloscope leads connected to the circuit under test." },
        { src: "assets/images/analogue-breadboard-banana-jacks.webp", caption: "Circuit connected to laboratory supply terminals." },
        { src: "assets/images/opamp-breadboard-simple.webp", caption: "Simpler operational-amplifier subcircuit used during development." },
        { src: "assets/images/oscilloscope-periodic.webp", caption: "Periodic waveform captured during bench testing." },
        { src: "assets/images/oscilloscope-transients.webp", caption: "Waveform capture showing repeated transient features." }
      ]
    },

    {
      id: "embedded-sensing-prototypes",
      title: "Embedded Sensing Prototypes",
      subtitle: "Low-cost sensors, threshold logic and physical demonstrators",
      year: "2025",
      status: "Prototype archive",
      accent: "navy",
      coverImage: "assets/images/smart-room-integration-wide.webp",
      summary:
        "A series of Arduino-based experiments using light and ultrasonic sensors, visual or audible outputs and physical integration into a larger demonstrator.",
      challenge:
        "The prototypes had to translate noisy or variable sensor readings into understandable physical responses while remaining easy to modify and diagnose.",
      approach:
        "Individual sensor-response experiments were validated before the electronics were integrated into a larger cardboard-room demonstrator.",
      decisions: [
        "Start with readable threshold logic before adding filtering or complex state behaviour.",
        "Validate sensing and output blocks separately before enclosure integration.",
        "Use photographs to preserve wiring history as the prototype became more complex."
      ],
      testing:
        "Light levels and target distance were varied while monitoring LED, buzzer and serial behaviour, followed by re-testing after physical installation.",
      impact:
        "These prototypes show a practical progression from isolated sensing to integrated system behaviour.",
      nextSteps: [
        "Replace fixed thresholds with calibration and filtering.",
        "Separate software into clearer sensing, logic and output functions.",
        "Document future builds with schematics alongside photographs."
      ],
      skills: ["Arduino", "Sensors", "Rapid prototyping", "Threshold logic"],
      gallery: [
        { src: "assets/images/light-sensor-led-arduino.webp", caption: "Light-sensor and LED experiment connected to an Arduino." },
        { src: "assets/images/hc-sr04-module-wood.webp", caption: "HC-SR04 ultrasonic sensor photographed as a standalone component." },
        { src: "assets/images/ultrasonic-alert-arduino.webp", caption: "Arduino, ultrasonic sensor and buzzer prototype." },
        { src: "assets/images/arduino-ide-code.webp", caption: "Development code implementing distance calculation and threshold response." },
        { src: "assets/images/smart-room-integration-wide.webp", caption: "Integrated room-scale prototype showing internal electronics." },
        { src: "assets/images/smart-room-top.webp", caption: "Top view of the physical demonstrator and wiring layout." }
      ]
    },

    {
      id: "formula-student-electrical",
      title: "Formula Student Electrical Systems",
      subtitle: "Architecture, integration and technical leadership",
      year: "Current",
      status: "Active role",
      accent: "navy",
      coverImage: "assets/images/lab-portrait.webp",
      summary:
        "Leading electrical work across low-voltage architecture, CAN integration, sensing, ECU interfaces, dashboards and safety-related systems.",
      challenge:
        "Formula Student combines time pressure, multidisciplinary integration and safety constraints. A subsystem can be individually correct and still fail at the vehicle level if interfaces and ownership are unclear.",
      approach:
        "I structure electrical work into ownership areas, create clearer architecture discussions and bring communication, grounding, signal integrity and testability into early design decisions.",
      decisions: [
        "Separate subsystem ownership while keeping shared interface reviews.",
        "Treat CAN topology, grounding and integration as architecture issues.",
        "Use documentation as engineering risk control."
      ],
      testing:
        "The work involves bench validation, integration checks, network review, interface documentation and repeated debugging across the wider vehicle system.",
      impact:
        "The role develops systems-level judgement and the ability to create clarity for other engineers, rather than only completing isolated technical tasks.",
      nextSteps: [
        "Improve subsystem interface definitions.",
        "Develop a clearer integration and verification plan.",
        "Create reusable documentation for future team members."
      ],
      skills: ["Leadership", "Systems engineering", "CAN", "Technical coordination"],
      gallery: []
    },

    {
      id: "autonomous-drone-systems",
      title: "Autonomous Drone Systems Software",
      subtitle: "Energy modelling, mission profiling and simulation",
      year: "2026",
      status: "Completed",
      accent: "orange",
      coverImage: "",
      summary:
        "A Python-based project modelling drone missions, energy consumption, battery behaviour, parking and charging infrastructure, simulation outputs and a graphical interface.",
      challenge:
        "Autonomous operations require software models that connect physical energy constraints with infrastructure, cost, validation and user interaction.",
      approach:
        "The software was structured around interacting entities—drone, battery, parking spot, charging station and payment card—rather than disconnected procedures.",
      decisions: [
        "Use object-oriented entities that mirror the physical system.",
        "Expose energy and cost calculations rather than returning only success or failure.",
        "Keep validation close to the state it protects."
      ],
      testing:
        "Tester functions, boundary conditions, voltage compatibility, state-of-charge limits, availability and manual GUI paths were checked.",
      impact:
        "The project strengthened modelling, software architecture and systems thinking across a physical engineering problem.",
      nextSteps: [
        "Add automated tests.",
        "Separate interface and simulation logic further.",
        "Calibrate the battery model using measured data."
      ],
      skills: ["Python", "Energy modelling", "Simulation", "Object-oriented design"],
      gallery: []
    },

    {
      id: "energy-harvesting-epaper",
      title: "Energy Harvesting for ePaper Badges",
      subtitle: "Low-power dissertation direction",
      year: "2026–2027",
      status: "Planned",
      accent: "orange",
      coverImage: "",
      summary:
        "A planned dissertation investigating how harvested energy, conversion, storage and intermittent ePaper demand can be combined into a reliable low-power system.",
      challenge:
        "ePaper has very low static demand, but updates and control electronics create bursts of energy use. The design must work under variable source conditions and realistic leakage and efficiency constraints.",
      approach:
        "The project will combine energy budgeting, source characterisation, circuit design, storage selection and experimental validation.",
      decisions: [
        "Measure the ePaper load profile before choosing the harvesting architecture.",
        "Treat conversion efficiency and storage leakage as system-level constraints.",
        "Define reproducible experimental conditions from the beginning."
      ],
      testing:
        "Expected work includes display energy measurement, harvested-power characterisation, converter efficiency, storage charge and discharge behaviour and repeated update cycles.",
      impact:
        "The topic aligns with interests in power electronics, sustainability and experimentally grounded hardware research.",
      nextSteps: [
        "Complete the literature review.",
        "Characterise the display energy profile.",
        "Build and validate an initial energy-budget model."
      ],
      skills: ["Power electronics", "Low-power systems", "Research", "Experimental design"],
      gallery: []
    },

    {
      id: "pipe-climbing-robot",
      title: "Pipe-Climbing Robot Concept",
      subtitle: "Constrained mobile-robot design for an IMechE challenge",
      year: "2026",
      status: "Prototype work",
      accent: "navy",
      coverImage: "assets/images/robot-chassis-underside-top.webp",
      summary:
        "A low-cost robot concept intended to climb and descend a 22 mm copper pipe using a mechanically constrained cantilever arrangement.",
      challenge:
        "The robot must balance grip, mass, torque, stability, available components and a strict budget while moving quickly enough to meet the challenge aim.",
      approach:
        "Mechanical and electrical decisions were treated as one system, with motor selection, battery placement and the electronics structure influencing the centre of mass and traction.",
      decisions: [
        "Use a simple Arduino-based architecture.",
        "Keep the system within the £50 budget.",
        "Use electronics placement as part of the mechanical counterweight strategy."
      ],
      testing:
        "Relevant tests include motor current, grip, stability, starts and stops, thermal behaviour and repeatable movement on the pipe.",
      impact:
        "The project develops practical judgement under tight performance and budget constraints.",
      nextSteps: [
        "Complete integrated testing.",
        "Refine the grip and centre-of-mass arrangement.",
        "Document measured performance."
      ],
      skills: ["Robotics", "Constrained design", "Motor control", "Integration"],
      gallery: [
        { src: "assets/images/robot-chassis-underside-bare.webp", caption: "Bare two-motor chassis arrangement used as a mechanical reference." },
        { src: "assets/images/robot-chassis-underside-top.webp", caption: "Top-down underside view showing motor and caster placement." },
        { src: "assets/images/single-tt-motor.webp", caption: "Single TT geared motor used as a drive reference." },
        { src: "assets/images/wheels-standalone-pair.webp", caption: "Wheel pair documented separately from the chassis." },
        { src: "assets/images/wheel-motor-pair.webp", caption: "Motor and wheel assemblies shown as loose subsystems." },
        { src: "assets/images/robot-battery-annotated.webp", caption: "Annotated battery image retained from the system-development process." }
      ]
    }
  ],

  archiveGroups: [
    {
      title: "Laboratory identity",
      description: "A human anchor for the portfolio and evidence of practical laboratory work.",
      images: [
        { src: "assets/images/lab-portrait.webp", caption: "Laboratory portrait beside electronic test equipment." }
      ]
    },
    {
      title: "Analogue electronics and measurement",
      description: "Breadboard development, test leads and oscilloscope captures from practical circuit work.",
      images: [
        { src: "assets/images/analogue-breadboard-multistage.webp", caption: "Multistage analogue circuit." },
        { src: "assets/images/analogue-breadboard-blue-bin.webp", caption: "Breadboard section in a laboratory tray." },
        { src: "assets/images/analogue-breadboard-probes-wide.webp", caption: "Circuit connected to measurement probes." },
        { src: "assets/images/analogue-breadboard-probes-close.webp", caption: "Close view of laboratory connections." },
        { src: "assets/images/analogue-breadboard-mid.webp", caption: "Intermediate circuit revision." },
        { src: "assets/images/analogue-breadboard-close.webp", caption: "Close-up of analogue component placement." },
        { src: "assets/images/analogue-breadboard-probes-vertical.webp", caption: "Vertical breadboard view." },
        { src: "assets/images/analogue-breadboard-blue-bin-wide.webp", caption: "Wide laboratory tray view." },
        { src: "assets/images/analogue-breadboard-scope-probes.webp", caption: "Oscilloscope probe setup." },
        { src: "assets/images/analogue-breadboard-banana-jacks.webp", caption: "Circuit connected to supply terminals." },
        { src: "assets/images/opamp-breadboard-simple.webp", caption: "Operational-amplifier subcircuit." },
        { src: "assets/images/oscilloscope-periodic.webp", caption: "Periodic waveform capture." },
        { src: "assets/images/oscilloscope-transients.webp", caption: "Transient-rich waveform capture." }
      ]
    },
    {
      title: "Embedded sensing and demonstrators",
      description: "Sensor components, Arduino integration and enclosure-scale prototypes.",
      images: [
        { src: "assets/images/light-sensor-led-arduino.webp", caption: "Light sensor and LED experiment." },
        { src: "assets/images/hc-sr04-module-wood.webp", caption: "HC-SR04 module close-up." },
        { src: "assets/images/ultrasonic-alert-arduino.webp", caption: "Ultrasonic alert prototype." },
        { src: "assets/images/arduino-ide-code.webp", caption: "Arduino distance-threshold code." },
        { src: "assets/images/smart-room-integration-wide.webp", caption: "Integrated physical demonstrator." },
        { src: "assets/images/smart-room-top.webp", caption: "Top view of demonstrator wiring." }
      ]
    },
    {
      title: "Robot platform and component studies",
      description: "The complete visual history of the differential-drive platform, its chassis and its component-level references.",
      images: [
        { src: "assets/images/robot-window-top-threequarter.webp", caption: "Robot top three-quarter view." },
        { src: "assets/images/robot-chassis-underside-bare.webp", caption: "Bare chassis underside." },
        { src: "assets/images/robot-wood-side-angle.webp", caption: "Robot side angle on a desk." },
        { src: "assets/images/robot-window-low-side-a.webp", caption: "Low side profile A." },
        { src: "assets/images/robot-window-front-a.webp", caption: "Front view A." },
        { src: "assets/images/robot-window-low-side-b.webp", caption: "Low side profile B." },
        { src: "assets/images/robot-comparison-desk.webp", caption: "Current and future chassis comparison." },
        { src: "assets/images/robot-chassis-underside-top.webp", caption: "Chassis underside top view." },
        { src: "assets/images/robot-battery-annotated.webp", caption: "Annotated battery reference." },
        { src: "assets/images/robot-wheel-closeup-mounted.webp", caption: "Mounted wheel close-up." },
        { src: "assets/images/single-tt-motor.webp", caption: "Single TT motor." },
        { src: "assets/images/wheels-standalone-pair.webp", caption: "Standalone wheel pair." },
        { src: "assets/images/robot-comparison-low.webp", caption: "Low comparison view." },
        { src: "assets/images/robot-wood-side.webp", caption: "Robot side view on wood." },
        { src: "assets/images/robot-window-front-b.webp", caption: "Front view B." },
        { src: "assets/images/robot-window-front-clean.webp", caption: "Clean front view." },
        { src: "assets/images/robot-desk-front.webp", caption: "Desk front view." },
        { src: "assets/images/robot-desk-side.webp", caption: "Desk side view." },
        { src: "assets/images/robot-desk-topside.webp", caption: "Desk top-side view." },
        { src: "assets/images/wheel-motor-pair.webp", caption: "Wheel and motor assemblies." }
      ]
    }
  ]
};
