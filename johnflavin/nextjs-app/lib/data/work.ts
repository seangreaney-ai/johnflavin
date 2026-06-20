export interface WorkItem {
  room: string;
  roomLabel: string;
  title: string;
  description: string;
  images: string[];
  specs: Record<string, string>;
  featured?: boolean;
}

export const WORK: WorkItem[] = [
  {
    featured: true,
    room: "kitchen",
    roomLabel: "Kitchen",
    title: "Shaker Kitchen — Ivory & Slaked Lime",
    description: "This kitchen was designed to work beautifully in a compact space without compromising on the essentials. The clever use of a peninsula unit really opens up the room — moving the sink, dishwasher, and bin to the peninsula frees up the other walls for ovens, hobs, and full-height fridge-freezer storage. The combination of Ivory units and Slaked Lime Dark on the lower section adds warmth and character, while the Blanco Stellar quartz worktop ties everything together. Finished to the ceiling with a traditional coving for a clean, polished look.",
    images: [1,2,3,4,5,6,7,8,9,10].map(n => `/images/work1/shaker-kitchen-${String(n).padStart(2,"0")}.jpg`),
    specs: { door_style:"Shaker", finish:"Smooth", worktop:"Quartz — Blanco Stellar", colour_units:"Ivory", colour_island:"Slaked Lime Dark (Little Green)", handles:"Queen Ann Beehive Knobs / Cup Handles" },
  },
  {
    room: "living",
    roomLabel: "Living Room",
    title: "Cardiff Sitting Room Unit",
    description: "The customer wanted open shelving that complemented the floor colour, combined with some enclosed storage below. The Pacific B shelf finish works perfectly alongside the floor tone, while Wimborne White keeps the room light and bright. Integrated strip lighting on the shelves adds a warm, ambient glow in the evenings.",
    images: [1,2,3,4].map(n => `/images/work2/cardiff-sitting-room-${String(n).padStart(2,"0")}.jpg`),
    specs: { door_style:"Cardiff", finish:"Smooth", shelves:"Pacific B", lighting:"Strip lighting", colour:"Wimborne White (Farrow & Ball)", handles:"Crystal Knobs" },
  },
  {
    room: "bedroom",
    roomLabel: "Bedroom",
    title: "2-Door Mirror Sliderobe",
    description: "A clean, practical sliderobe combining a full-length mirror door with a Bordolino Oak panel door — giving the room both a sense of light and warmth. Chrome track and surround finishes the whole unit neatly. The interior is fitted in Ivory for a bright, easy-to-use wardrobe space.",
    images: [1,2,3,4,5].map(n => `/images/work3/sliderobe-${String(n).padStart(2,"0")}.jpg`),
    specs: { type:"2-Door Sliderobe", interior:"Ivory", doors:"1 × Mirror / 1 × Bordolino Oak", surround:"Chrome track and door surround" },
  },
  {
    featured: true,
    room: "bedroom",
    roomLabel: "Bedroom",
    title: "Micro Shaker Wardrobe — Pigeon",
    description: "A beautifully understated wardrobe in Farrow & Ball's Pigeon — a muted blue-grey that works equally well in a contemporary or traditional bedroom. The Micro Shaker door adds subtle detail without being fussy, while the Sand Gladstone Oak interior brings warmth to the inside. Gold bar handles tie together the whole look.",
    images: [1,2,3,4,5].map(n => `/images/work4/micro-shaker-wardrobe-${String(n).padStart(2,"0")}.jpg`),
    specs: { door_style:"Micro Shaker", finish:"Smooth", interior:"Sand Gladstone Oak", colour:"Pigeon (Farrow & Ball)", handles:"Gold Bar Handle", hardware:"Soft-close drawers" },
  },
  {
    featured: true,
    room: "living",
    roomLabel: "Living Room",
    title: "Calaway Sitting Room Unit — Graphite Grey",
    description: "A striking sitting room unit in Graphite Grey with Calaway Ash grained doors and rich raw endgrain oak shelving and tops. The combination of dark grey and natural timber gives a high-end, contemporary look. System Knurled Gold hardware adds a touch of warmth and luxury.",
    images: [1,2,3,4,5].map(n => `/images/work5/calaway-sitting-room-${String(n).padStart(2,"0")}.jpg`),
    specs: { door_style:"Calaway Ash", finish:"Grained", colour:"Graphite Grey", shelves_and_top:"Raw Endgrain Oak", interior:"Raw Endgrain Oak", handles:"System Knurled Gold" },
  },
  {
    room: "living",
    roomLabel: "Living Room",
    title: "Telford TV Unit — Alabaster White",
    description: "A clean, contemporary TV unit finished in Colortrend Alabaster White with Hamilton Oak interior shelving. The Telford door gives a subtle vertical detail without being overpowering. Strip lighting on the shelves adds atmosphere. Tapered Bow Brushed handles complete the look.",
    images: [1,2,3,4].map(n => `/images/work6/tv-unit-${String(n).padStart(2,"0")}.jpg`),
    specs: { door_style:"Telford", finish:"Smooth", colour:"Alabaster White (Colortrend)", interior:"Hamilton Oak", lighting:"Strip lighting", handles:"Tapered Bow Brushed" },
  },
  {
    room: "living",
    roomLabel: "Living Room",
    title: "Display & Storage Unit — Inchyra",
    description: "Farrow & Ball's Inchyra is a complex blue-green that looks different in different lights — perfect for a display unit that you want to notice. Calaway Ash grained doors add texture and depth, while Tobacco Halifax Oak on the interior creates a rich contrast. Knurled Bronze handles are the ideal finishing touch.",
    images: [1,2,3].map(n => `/images/work7/display-storage-unit-${String(n).padStart(2,"0")}.jpg`),
    specs: { door_style:"Calaway Ash", finish:"Grained", colour:"Inchyra (Farrow & Ball)", interior:"Tobacco Halifax Oak", handles:"Knurled Bronze" },
  },
  {
    room: "bedroom",
    roomLabel: "Bedroom",
    title: "Step Shaker Wardrobe — Shaded White",
    description: "A classic Step Shaker wardrobe in Farrow & Ball's Shaded White — a warm, soft off-white that works beautifully in a bright bedroom. The grained Ash door adds subtle texture, while the Bordino Oak interior brings warmth and character. Fitted with Blum soft-close hinges and Häfele drawer runners throughout.",
    images: [1,2,3].map(n => `/images/work8/step-shaker-wardrobe-${String(n).padStart(2,"0")}.jpg`),
    specs: { door_style:"Step Shaker Ash", finish:"Grained", colour:"Shaded White (Farrow & Ball)", interior:"Bordino Oak", hardware:"Blum soft-close / Häfele drawer runners", handles:"System Knurled Gold" },
  },
  {
    room: "bedroom",
    roomLabel: "Bedroom",
    title: "Mirror Sliderobe — Black Track",
    description: "A sleek, modern sliderobe with two full-length mirror doors set in a matte black track and surround. The all-white interior keeps the inside bright and easy to use. A driftwood panel on the outside face of the unit ties it into the room's décor.",
    images: [1,2,3,4].map(n => `/images/work9/black-mirror-sliderobe-${String(n).padStart(2,"0")}.jpg`),
    specs: { type:"Sliderobe", interior:"White", doors:"2 × Mirror — black track and surround", exterior:"Driftwood panel" },
  },
  {
    featured: true,
    room: "utility",
    roomLabel: "Utility Room",
    title: "MFC Utility Room — Tyrolean Blue",
    description: "A hardworking utility room designed with storage at the forefront. Raised washing machine and dryer with pull-out shelves and drawers underneath, a tall corner shelving unit, coat hanging and hoover storage, plus overhead presses throughout. The Tyrolean Blue MFC finish is practical and stylish, topped with a 25mm Topshape Carrara Marble worktop.",
    images: [1,2,3,4,5,6].map(n => `/images/work10/mfc-utility-${String(n).padStart(2,"0")}.jpg`),
    specs: { door_style:"MFC", finish:"Smooth", colour:"Tyrolean Blue", interior:"Raw Endgrain Oak", worktop:"Topshape Carrara Marble 25mm", handles:"System Knurled Brushed Nickel", hardware:"Blum soft-close / Häfele drawer system" },
  },
  {
    room: "bedroom",
    roomLabel: "Bedroom",
    title: "2-Door Sliderobe — Reed Green",
    description: "A practical two-door sliderobe with a striking Reed Green exterior paired with Tobacco Halifax Oak on the interior. The Champagne surround on the doors adds a warm contrast against the deep green, giving the piece a considered, finished look. Both the door and interior finishes are from the Tailored Collection.",
    images: [1,2,3].map(n => `/images/work11/sliderobe-listowel-${String(n).padStart(2,"0")}.jpg`),
    specs: { type:"2-Door Sliderobe", exterior:"Reed Green (MFC — Tailored Collection)", interior:"Tobacco Halifax Oak (MFC — Tailored Collection)", surround:"Champagne" },
  },
  {
    room: "living",
    roomLabel: "Living Room",
    title: "Cummane TV Unit — Ammonite",
    description: "A clean TV unit in Farrow & Ball's Ammonite — a warm greige that works in virtually any room. Shaker doors from the Makers Collection keep the profile classic without being heavy. A versatile, timeless piece that sits quietly in the room and lets everything else breathe.",
    images: [1,2].map(n => `/images/work12/cummane-tv-unit-${String(n).padStart(2,"0")}.jpg`),
    specs: { door_style:"Shaker", finish:"Smooth", colour:"Ammonite (Farrow & Ball)" },
  },
  {
    room: "living",
    roomLabel: "Living Room",
    title: "Daly TV Unit — Pigeon",
    description: "The Porto door in Farrow & Ball's Pigeon — a soft, muted blue-grey — gives this TV unit a calm, understated elegance. Brass knobs add a warm metallic detail that lifts the whole piece. Porto's raised shaker profile brings a little more presence than a plain shaker without tipping into ornate territory.",
    images: [1,2].map(n => `/images/work13/daly-tv-unit-${String(n).padStart(2,"0")}.jpg`),
    specs: { door_style:"Porto", finish:"Smooth", colour:"Pigeon (Farrow & Ball)", handles:"Brass Knobs" },
  },
  {
    room: "utility",
    roomLabel: "Utility Room",
    title: "Moloney Utility Room — French Grey",
    description: "A hardworking utility room finished in Farrow & Ball's French Grey — a cool, classic tone that keeps the space feeling light and organised. Step Shaker doors from the Makers Collection add a traditional touch, while Oxford chrome knobs and cup handles bring a polished finish. Cashmere MFC interior, quartz worktop.",
    images: [1,2,3,4,5,6,7,8].map(n => `/images/work14/moloney-utility-${String(n).padStart(2,"0")}.jpg`),
    specs: { door_style:"Step Shaker", finish:"Smooth", colour:"French Grey (Farrow & Ball)", handles:"Oxford Chrome Knobs & Cup Handles", worktop:"Quartz", interior:"Cashmere (MFC — Tailored Collection)" },
  },
  {
    room: "utility",
    roomLabel: "Utility Room",
    title: "O'Brien Utility Room — Reed Green",
    description: "A bold utility room in Reed Green MFC from the Tailored Collection — a deep, earthy tone that makes the space feel purposeful rather than purely functional. Raw Endgrain Oak on the interior adds warmth and contrast. Monza bronze cup handles and knobs complete the look with a touch of aged character.",
    images: [1,2,3,4,5,6,7].map(n => `/images/work15/obrien-utility-${String(n).padStart(2,"0")}.jpg`),
    specs: { finish:"MFC", colour:"Reed Green (Tailored Collection)", interior:"Raw Endgrain Oak (Tailored Collection)", handles:"Monza Bronze Cups & Knobs", worktop:"Quartz" },
  },
  {
    featured: false,
    room: "kitchen",
    roomLabel: "Kitchen",
    title: "O'Brien Kitchen — All White",
    description: "A bright, airy kitchen finished in Farrow & Ball's All White — clean and timeless. Telford doors from the Makers Collection bring a subtle three-piece vertical groove detail that adds interest without complicating the overall freshness of the room. Raw Endgrain Oak shelving and interior finishes bring warmth against the white. Monza cup handles and knobs throughout.",
    images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].map(n => `/images/work16/obrien-kitchen-${String(n).padStart(2,"0")}.jpg`),
    specs: { door_style:"Telford", finish:"Smooth", colour:"All White (Farrow & Ball)", interior:"Raw Endgrain Oak (Tailored Collection)", handles:"Monza Cups & Knobs", worktop:"Quartz" },
  },
  {
    room: "kitchen",
    roomLabel: "Kitchen",
    title: "Clancy Kitchen — Ammonite",
    description: "A kitchen and utility finished in Farrow & Ball's Ammonite — a warm stone tone with just enough grey to feel contemporary. Porto doors from the Makers Collection bring a refined raised detail to the cabinetry. Bordilino Oak interiors add warmth, Windsor brushed nickel cups and knobs provide a clean, classic hardware finish throughout, and a Formica Frosty worktop ties it all together.",
    images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21].map(n => `/images/work17/clancy-kitchen-${String(n).padStart(2,"0")}.jpg`),
    specs: { door_style:"Porto", finish:"Smooth", colour:"Ammonite (Farrow & Ball)", interior:"Bordilino Oak (MFC — Tailored Collection)", handles:"Windsor Brushed Nickel Cups & Knobs", worktop:"Formica — Frosty" },
  },
];

export const FEATURED_WORK = WORK.filter(w => w.featured);
