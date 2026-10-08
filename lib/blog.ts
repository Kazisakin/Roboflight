/* Parent guides (blog). Each article: plain data, rendered by app/blog/[slug].
   In body text, {{ages:<program-slug>}} is replaced with that program's age rule. */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "tip"; text: string };

export type Article = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  published: string; // YYYY-MM-DD
  updated: string;
  keyword: string;
  related: string[]; // program slugs
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "what-age-should-kids-start-robotics",
    title: "What Age Should Kids Start Robotics? A Parent's Guide",
    description:
      "When is a child ready for robotics, and what should they learn at each age? A practical guide for parents in Fredericton, from first circuits to drones and RC planes.",
    image: "/photos/kids-robot-car-kit-robotics-class.jpg",
    imageAlt: "Two students smiling beside the robot car kit they are building",
    published: "2026-10-06",
    updated: "2026-10-06",
    keyword: "best age to start robotics",
    related: ["basic-robotics", "quadcopter-drone", "rc-plane-making"],
    body: [
      { type: "p", text: "There is no single perfect age to start robotics. What matters more is matching the project to what a child can do with their hands, how long they can focus, and how comfortable they are reading instructions. Most children are ready for real, hands-on robot building somewhere between 8 and 10, and the projects grow with them from there." },
      { type: "h2", text: "Signs your child is ready" },
      { type: "list", items: [
        "They enjoy taking things apart, building with LEGO or following build instructions.",
        "They can focus on one task for 30–45 minutes, especially when they are making something.",
        "They can read short instructions and are comfortable asking for help when they get stuck.",
        "They are curious about how things work — remote controls, games, cars, drones.",
        "They don't give up the first time something doesn't work (or they want to learn not to).",
      ] },
      { type: "tip", text: "Being \"good at computers\" is not a requirement. Many kids who love robotics start with no coding experience at all — the robot gives them a reason to learn." },
      { type: "h2", text: "Ages 8–10: first circuits and a first robot" },
      { type: "p", text: "At this age, the best projects give quick, visible results: a motor that spins, a light that blinks, a car that drives forward when the code says so. Kids learn what a circuit is, how a breadboard works and how a few lines of code control a real object. A programmable robot car is a classic first build because every step — chassis, motors, wiring, code — shows up in how the car moves." },
      { type: "p", text: "RoboFlight's Basic Robotics program is built around exactly this: students assemble an Arduino robot car and write the code that drives it. It is for {{ages:basic-robotics}}." },
      { type: "h2", text: "Ages 11–13: sensors, flight and problem-solving" },
      { type: "p", text: "Pre-teens can handle longer builds and more abstract ideas. This is a great age to add sensors (so a robot can detect obstacles and make decisions) and to start on flight: what keeps a quadcopter level, why propeller balance matters, how a flight controller reads the drone's motion." },
      { type: "p", text: "Building a drone teaches patience and precision — a loose wire or an unbalanced propeller shows up immediately. Our Quadcopter Drone program is for {{ages:quadcopter-drone}}, and students take their drone home." },
      { type: "h2", text: "Ages 13 and up: design and engineering" },
      { type: "p", text: "Teenagers are ready to design, not just assemble. Planning a plane — wingspan, weight, balance — before cutting a single piece introduces real engineering thinking: measure, predict, test, adjust. Radio-control systems add servos, receivers and control surfaces to the electronics they already know." },
      { type: "p", text: "RC Plane Making is our most advanced program and is for {{ages:rc-plane-making}}." },
      { type: "h2", text: "What kids gain at any age" },
      { type: "list", items: [
        "Problem-solving: robots rarely work the first time, so kids learn to test, find the problem and fix it.",
        "Persistence and delayed gratification: a project that takes weeks feels very different from a game that rewards you instantly.",
        "Coding literacy that is connected to something real they can see and touch.",
        "Confidence: \"I built this\" is a powerful thing for a child to be able to say.",
      ] },
      { type: "h2", text: "How to choose a first program" },
      { type: "p", text: "Look for small groups, real hardware (not only on-screen simulations), kits included so you don't have to buy parts, and an instructor who explains why things work, not only what to plug in. Most importantly, let your child try it. A free trial class is the easiest way to see whether they light up when the motor spins." },
    ],
  },
  {
    slug: "arduino-for-kids",
    title: "Arduino for Kids: What It Is and Why It's a Great First Robot",
    description:
      "What is an Arduino, what can kids build with it, and why do so many robotics classes start there? A plain-English guide for parents.",
    image: "/photos/students-assembling-robot-electronics.jpg",
    imageAlt: "Students assembling electronics and wiring from their robotics kits",
    published: "2026-10-06",
    updated: "2026-10-06",
    keyword: "Arduino for kids",
    related: ["basic-robotics"],
    body: [
      { type: "p", text: "An Arduino is a small, inexpensive circuit board with a microcontroller on it — a tiny computer that runs one program over and over. You write the program on a laptop, upload it through a USB cable, and the board uses it to read sensors and control things like lights, buzzers and motors. That makes it one of the most popular ways for kids and beginners to start building robots." },
      { type: "h2", text: "Why Arduino works so well for kids" },
      { type: "list", items: [
        "It is real hardware. Kids aren't moving a robot on a screen — they're making an actual motor spin.",
        "Results are instant. Change a number in the code, upload, and the light blinks faster or the car turns sharper.",
        "It runs on low voltage from a USB cable or battery pack, which makes it a safe platform for beginners.",
        "It is open-source and widely used, so there are thousands of projects, parts and tutorials to grow into.",
        "The skills transfer. The same ideas — inputs, outputs, loops, conditions — are used in every kind of programming.",
      ] },
      { type: "h2", text: "What kids learn" },
      { type: "list", items: [
        "Circuits: how electricity flows, what a breadboard is, and why a connection must be complete.",
        "Coding: variables, loops and if-statements, written in the Arduino language (based on C++).",
        "Inputs and outputs: reading a sensor or button, then deciding what a motor or light should do.",
        "Debugging: finding out whether a problem is in the wiring or in the code — an engineering skill for life.",
      ] },
      { type: "h2", text: "What can you build with an Arduino?" },
      { type: "p", text: "Beginners usually start with a blinking light, then a buzzer or a button. From there, a robot car is the classic first big project: two DC motors, a motor driver board (such as the L298N), wheels, a chassis and a battery pack, all controlled by the Arduino. Add an ultrasonic distance sensor and the car can detect walls and steer around them." },
      { type: "tip", text: "Want to see how a robot car fits together before building one? Try RoboFlight's free online robot builder — drag each part onto the circuit, then drive the car." },
      { type: "h2", text: "Is my child too young for Arduino?" },
      { type: "p", text: "With good guidance, most kids aged 8 and up can build and code a simple Arduino project. They don't need to type long programs on day one — they start by changing a few values in working code and seeing what happens. The confidence comes from understanding each part, one step at a time." },
      { type: "h2", text: "Learning Arduino in Fredericton" },
      { type: "p", text: "RoboFlight's Basic Robotics program, for {{ages:basic-robotics}}, is built around an Arduino robot car. Every student gets a training kit, builds the car from the chassis up, wires the electronics and writes the code that brings it to life. The first class is a free trial." },
    ],
  },
  {
    slug: "choosing-a-stem-after-school-program-fredericton",
    title: "How to Choose a STEM After-School Program in Fredericton",
    description:
      "Comparing after-school robotics, coding and STEM programs in Fredericton? Use this parent checklist: hands-on time, group size, instructors, kits, schedule and trials.",
    image: "/photos/kids-thumbs-up-robotics-class-fredericton.jpg",
    imageAlt: "Kids giving a thumbs up during a robotics class",
    published: "2026-10-06",
    updated: "2026-10-06",
    keyword: "after school programs Fredericton",
    related: ["basic-robotics", "quadcopter-drone"],
    body: [
      { type: "p", text: "Fredericton families have more STEM options than ever — summer camps, school clubs, online courses and weekly after-school classes. The right choice depends on your child's age, interests and how much hands-on building they want. This checklist covers the questions worth asking before you sign up." },
      { type: "h2", text: "1. How much of the time is hands-on?" },
      { type: "p", text: "Kids learn engineering by building. Ask how much of each class is spent with real parts versus watching or working on a screen. A good program has students wiring, assembling and testing in every session." },
      { type: "h2", text: "2. What will my child actually make?" },
      { type: "p", text: "A clear end project keeps kids motivated over several weeks: a robot car, a drone, a plane. Ask what they build and whether they get to keep it." },
      { type: "h2", text: "3. Who teaches, and how big are the groups?" },
      { type: "p", text: "An instructor with a real engineering or technical background can explain why something works, not just what to plug in. Small groups mean your child gets help when they are stuck instead of waiting." },
      { type: "h2", text: "4. Are kits and tools included?" },
      { type: "p", text: "Electronics parts add up quickly. Check whether kits, tools and materials are provided, or whether you'll need to buy them separately." },
      { type: "h2", text: "5. Does it fit the age and level?" },
      { type: "list", items: [
        "Is there a clear age requirement for each program?",
        "Does it suit complete beginners as well as kids with some experience?",
        "Is there a next step once they finish — a more advanced program to grow into?",
      ] },
      { type: "h2", text: "6. Is it year-round or seasonal?" },
      { type: "p", text: "Summer and March break camps are a great way to try STEM in a short burst. A weekly, year-round program builds skills steadily and gives kids time to finish bigger projects. Many families do both." },
      { type: "h2", text: "7. Where is it, and when?" },
      { type: "p", text: "Check the location, parking and class times against your after-school routine. An easy commute is the difference between a program your child sticks with and one you abandon by November." },
      { type: "h2", text: "8. Can we try it first?" },
      { type: "p", text: "The best test is a trial class. Watch whether your child comes out excited and talking about what they built." },
      { type: "tip", text: "RoboFlight runs weekly robotics, drone and RC plane classes at 50 Crowther Ln, Suite 140, Fredericton. Kits are included, each program has a clear age requirement, and the first class is free." },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
