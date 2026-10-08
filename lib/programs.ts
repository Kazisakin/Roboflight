/* Program content for /programs/[slug] pages, cards and the booking form.
   Photos are free Unsplash images (unsplash.com/license). */

const u = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type LearnIcon = "bot" | "cable" | "code" | "radar" | "wind" | "gauge" | "cpu" | "gamepad" | "plane" | "ruler" | "hammer" | "radio";

export type Program = {
  slug: string;
  title: string;
  short: string;
  tagline: [string, string];
  intro: string;
  hero: string;
  heroAlt: string;
  gallery: { src: string; alt: string }[];
  learn: { icon: LearnIcon; title: string; text: string }[];
  includes: string[];
  modules: { title: string; text: string }[];
  build: string;
  tag: string;
  /** ⚠️ Placeholder age requirement — edit to match RoboFlight's real policy. */
  ages: string;
  minAge: number;
  icon: "bot" | "drone" | "plane";
  accent: "blue" | "cyan" | "amber";
  featured?: boolean;
  /** Questions shown on the program page and in Google's FAQ data. */
  faqs: { q: string; a: string }[];
};

/** Questions every program shares. Age answer is filled per program. */
const commonFaqs = (p: { title: string; ages: string; build: string }) => [
  { q: `What age is ${p.title} for?`, a: `${p.title} is for ${p.ages.toLowerCase()}. If you're not sure it's the right fit, book a free trial class and we'll help you choose.` },
  { q: "Does my child need any experience?", a: "No. Our curriculum is designed for all skill levels, and every student starts with the basics before building." },
  { q: "How often are classes?", a: "One session per week, at RoboFlight, 50 Crowther Ln, Suite 140, Fredericton." },
  { q: "Do we need to buy a kit or tools?", a: "No. A training kit and all tools are provided for every student." },
  { q: "What will my child build?", a: `${p.build}.` },
  { q: "Can we try a class first?", a: "Yes. Your first class is a free trial with no obligation. Book it online in under a minute." },
];

const base: Omit<Program, "faqs">[] = [
  {
    slug: "basic-robotics",
    title: "Basic Robotics",
    short: "Learn robotics fundamentals, build robot cars, explore sensors, and write code that brings your robots to life.",
    tagline: ["Build it. Wire it.", "Code it to drive."],
    intro:
      "Our most popular program and the perfect starting point. Students go from an empty table to a working, programmable robot car — learning electronics, sensors and real Arduino code along the way.",
    hero: u("1678225867994-e7a5b071ebfd"),
    heroAlt: "An Arduino robot car with an ultrasonic sensor and wires",
    gallery: [
      { src: u("1553406830-ef2513450d76", 900),  alt: "An Arduino Uno microcontroller board" },
      { src: u("1631378297854-185cff6b0986", 900), alt: "A breadboard wired to an Arduino" },
      { src: u("1518314916381-77a37c2a49ae", 900), alt: "Small wheeled robots lined up on a table" },
    ],
    learn: [
      { icon: "bot", title: "Robotics fundamentals", text: "How motors, sensors and controllers work together to make a machine move and react." },
      { icon: "cable", title: "Circuits & wiring", text: "Reading a wiring diagram, using a breadboard, and connecting a motor driver safely." },
      { icon: "code", title: "Coding with Arduino", text: "Writing, uploading and debugging real Arduino code — variables, loops, and logic." },
      { icon: "radar", title: "Sensors & control", text: "Using distance sensors so the robot can detect obstacles and make decisions." },
    ],
    includes: ["1 session per week", "Training kit provided", "Expert instruction", "Build your own robot car", "All skill levels welcome"],
    modules: [
      { title: "Meet the parts", text: "Unbox the kit: Arduino Uno, L298N motor driver, DC motors, wheels and chassis." },
      { title: "Build the chassis", text: "Assemble the frame and mount the motors and wheels." },
      { title: "Wire the electronics", text: "Connect the motor driver, battery pack and Arduino." },
      { title: "First program", text: "Upload code and make the car drive forward, turn and stop." },
      { title: "Add a sensor", text: "Mount an ultrasonic sensor and teach the car to avoid obstacles." },
      { title: "Robot challenge", text: "Tune, test and take your robot into the ring against classmates." },
    ],
    build: "A programmable Arduino robot car",
    tag: "Most popular",
    ages: "Ages 8+",
    minAge: 8,
    icon: "bot",
    accent: "blue",
    featured: true,
  },
  {
    slug: "quadcopter-drone",
    title: "Quadcopter Drone",
    short: "Understand flight dynamics, build your own functional drone, and learn aerodynamics, electronics, and programming.",
    tagline: ["Build a drone.", "Then fly it."],
    intro:
      "Students discover what keeps a quadcopter in the air — then build their own. From frame and motors to flight controller and first hover, every step is hands-on, and the finished drone goes home with them.",
    hero: u("1473968512647-3e447244af8f"),
    heroAlt: "A white quadcopter drone flying over a forest",
    gallery: [
      { src: u("1527977966376-1c8408f9f108", 900), alt: "Close-up of a quadcopter drone in flight" },
      { src: u("1487219116710-23ffcb172b2b", 900), alt: "A dark quadcopter hovering against a pale sky" },
      { src: u("1507582020474-9a35b7d455d9", 900), alt: "A drone flying over water" },
    ],
    learn: [
      { icon: "wind", title: "Flight dynamics", text: "Thrust, lift, pitch, roll and yaw — the physics of how a quadcopter flies." },
      { icon: "gauge", title: "Aerodynamics", text: "How propeller size, weight and balance change the way a drone behaves." },
      { icon: "cpu", title: "Drone electronics", text: "Motors, speed controllers, batteries and the flight controller that ties them together." },
      { icon: "gamepad", title: "Programming & control", text: "Configuring the flight controller and learning to fly safely and responsibly." },
    ],
    includes: ["1 session per week", "Training kit provided", "Expert instruction", "Build a functional drone", "Take home your drone"],
    modules: [
      { title: "How drones fly", text: "The four forces of flight and how four propellers keep a craft stable." },
      { title: "Frame & motors", text: "Assemble the frame and mount motors and propellers." },
      { title: "Power & wiring", text: "Wire speed controllers, battery and power distribution." },
      { title: "Flight controller", text: "Install and configure the brain of the drone." },
      { title: "Safety & first hover", text: "Pre-flight checks, safety rules, and a first controlled hover." },
      { title: "Flight practice", text: "Practise manoeuvres and fine-tune your drone for smooth flight." },
    ],
    build: "A working quadcopter drone you take home",
    tag: "Fan favourite",
    ages: "Ages 11+",
    minAge: 11,
    icon: "drone",
    accent: "cyan",
  },
  {
    slug: "rc-plane-making",
    title: "RC Plane Making",
    short: "Design, build, and fly your own remote-controlled planes while developing aeronautical and mechanical skills.",
    tagline: ["Design. Build.", "Take to the sky."],
    intro:
      "An advanced program for students ready to think like aeronautical engineers. They design a plane, build the airframe, install the radio control system — and fly what they made.",
    hero: u("1717645730191-b0e2d1962a2b"),
    heroAlt: "A model airplane on an asphalt runway with trees behind",
    gallery: [
      { src: u("1643067054079-26d1461d222e", 900), alt: "A small model biplane on a table" },
      { src: u("1689092915353-85526e60094d", 900), alt: "A person watching a small plane fly at sunset" },
      { src: u("1606370744289-16795bbded58", 900), alt: "A red and white model airplane on a grass field" },
    ],
    learn: [
      { icon: "plane", title: "Principles of aeronautics", text: "Lift, drag, thrust and weight — and how wing shape makes flight possible." },
      { icon: "ruler", title: "Design thinking", text: "Sketching, measuring and planning an airframe before a single cut is made." },
      { icon: "hammer", title: "Mechanical build skills", text: "Cutting, shaping and assembling a strong, light airframe." },
      { icon: "radio", title: "RC systems", text: "Servos, receivers, transmitters and control surfaces — and how they work together." },
    ],
    includes: ["1 session per week", "Training kit provided", "Expert instruction", "Build a flying RC plane", "For students ready for a challenge"],
    modules: [
      { title: "Why planes fly", text: "Aerofoils, lift and the forces acting on an aircraft." },
      { title: "Design your plane", text: "Plan wingspan, fuselage and tail with simple calculations." },
      { title: "Build the airframe", text: "Cut, shape and assemble the wings, body and tail." },
      { title: "Install RC electronics", text: "Fit the motor, servos, receiver and battery." },
      { title: "Balance & checks", text: "Find the centre of gravity and test every control surface." },
      { title: "Maiden flight", text: "Take your plane outside for its first flight." },
    ],
    build: "A flying remote-controlled plane",
    tag: "Advanced",
    ages: "Ages 13+",
    minAge: 13,
    icon: "plane",
    accent: "amber",
  },
];

export const programs: Program[] = base.map((p) => ({ ...p, faqs: commonFaqs(p) }));

export const getProgram = (slug: string) => programs.find((p) => p.slug === slug);
