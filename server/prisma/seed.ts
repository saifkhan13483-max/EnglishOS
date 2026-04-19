import { PrismaClient, ContentType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding ContentItems for Levels 1–6...');

  await prisma.contentItem.deleteMany({ where: { level: { in: [1, 2, 3, 4, 5, 6] } } });

  const items: {
    level: number;
    module: number;
    groupName: string;
    type: ContentType;
    english: string;
    urduRoman: string;
    exampleSentence: string;
    isPowerPack: boolean;
    sortOrder: number;
  }[] = [];

  // ── MODULE 1: ALPHABETS ───────────────────────────────────────────────────

  const vowels = [
    { english: 'A', urduRoman: 'Ae ki awaaz — jaise "Ab"', exampleSentence: 'Apple' },
    { english: 'E', urduRoman: 'Eh ki awaaz — jaise "Ek"', exampleSentence: 'Egg' },
    { english: 'I', urduRoman: 'I ki awaaz — jaise "Is"', exampleSentence: 'Ink' },
    { english: 'O', urduRoman: 'Oh ki awaaz — jaise "Ohh"', exampleSentence: 'Orange' },
    { english: 'U', urduRoman: 'Uh ki awaaz — jaise "Upar"', exampleSentence: 'Umbrella' },
  ];

  vowels.forEach((v, i) => {
    items.push({
      level: 1, module: 1, groupName: 'Vowels',
      type: ContentType.ALPHABET,
      english: v.english, urduRoman: v.urduRoman, exampleSentence: v.exampleSentence,
      isPowerPack: true, sortOrder: i + 1,
    });
  });

  const consonants = [
    { english: 'B', urduRoman: 'Bee', exampleSentence: 'Ball — Gend' },
    { english: 'C', urduRoman: 'See', exampleSentence: 'Cat — Billi' },
    { english: 'D', urduRoman: 'Dee', exampleSentence: 'Dog — Kutta' },
    { english: 'F', urduRoman: 'Eff', exampleSentence: 'Fish — Machli' },
    { english: 'G', urduRoman: 'Jee', exampleSentence: 'Girl — Larki' },
    { english: 'H', urduRoman: 'Aych', exampleSentence: 'Hand — Haath' },
    { english: 'J', urduRoman: 'Jay', exampleSentence: 'Juice — Juice' },
    { english: 'K', urduRoman: 'Kay', exampleSentence: 'King — Badshah' },
    { english: 'L', urduRoman: 'El', exampleSentence: 'Lion — Sher' },
    { english: 'M', urduRoman: 'Em', exampleSentence: 'Mango — Aam' },
    { english: 'N', urduRoman: 'En', exampleSentence: 'Night — Raat' },
    { english: 'P', urduRoman: 'Pee', exampleSentence: 'Pen — Qalam' },
    { english: 'Q', urduRoman: 'Kyoo', exampleSentence: 'Queen — Malika' },
    { english: 'R', urduRoman: 'Ar', exampleSentence: 'Rain — Baarish' },
    { english: 'S', urduRoman: 'Es', exampleSentence: 'Sun — Suraj' },
    { english: 'T', urduRoman: 'Tee', exampleSentence: 'Tree — Darakht' },
    { english: 'V', urduRoman: 'Vee', exampleSentence: 'Van — Van' },
    { english: 'W', urduRoman: 'Double-yoo', exampleSentence: 'Water — Paani' },
    { english: 'X', urduRoman: 'Ex', exampleSentence: 'X-ray — X-ray' },
    { english: 'Y', urduRoman: 'Why', exampleSentence: 'Year — Saal' },
    { english: 'Z', urduRoman: 'Zed', exampleSentence: 'Zoo — Chiriya ghar' },
  ];

  consonants.forEach((c, i) => {
    items.push({
      level: 1, module: 1, groupName: 'Consonants',
      type: ContentType.ALPHABET,
      english: c.english, urduRoman: c.urduRoman, exampleSentence: c.exampleSentence,
      isPowerPack: false, sortOrder: 6 + i,
    });
  });

  // ── MODULE 2: CORE 100 WORDS ──────────────────────────────────────────────

  // Group A — Pronouns (isPowerPack: true)
  const groupA = [
    { english: 'I',    urduRoman: 'Mein',           exampleSentence: 'I am here.' },
    { english: 'You',  urduRoman: 'Tum / Aap',      exampleSentence: 'You are good.' },
    { english: 'He',   urduRoman: 'Woh (mard)',      exampleSentence: 'He is tall.' },
    { english: 'She',  urduRoman: 'Woh (aurat)',     exampleSentence: 'She is smart.' },
    { english: 'It',   urduRoman: 'Yeh / Woh (cheez)', exampleSentence: 'It is hot.' },
    { english: 'We',   urduRoman: 'Hum',             exampleSentence: 'We are friends.' },
    { english: 'They', urduRoman: 'Woh sab',         exampleSentence: 'They are students.' },
    { english: 'Me',   urduRoman: 'Mujhe',           exampleSentence: 'Help me.' },
    { english: 'Him',  urduRoman: 'Use (mard ko)',   exampleSentence: 'Tell him.' },
    { english: 'Her',  urduRoman: 'Use (aurat ko)',  exampleSentence: 'Ask her.' },
    { english: 'Us',   urduRoman: 'Humein',          exampleSentence: 'Join us.' },
    { english: 'Them', urduRoman: 'Unhe',            exampleSentence: 'Call them.' },
  ];

  groupA.forEach((w, i) => {
    items.push({
      level: 1, module: 2, groupName: 'Group A — Pronouns',
      type: ContentType.VOCAB,
      english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence,
      isPowerPack: true, sortOrder: 1 + i,
    });
  });

  // Group B — Be Verbs (isPowerPack: true)
  const groupB = [
    { english: 'am',   urduRoman: 'hoon',    exampleSentence: 'I am happy.' },
    { english: 'is',   urduRoman: 'hai',     exampleSentence: 'She is kind.' },
    { english: 'are',  urduRoman: 'hain/ho', exampleSentence: 'We are ready.' },
    { english: 'was',  urduRoman: 'tha/thi', exampleSentence: 'He was here.' },
    { english: 'were', urduRoman: 'the/thin', exampleSentence: 'They were students.' },
  ];

  groupB.forEach((w, i) => {
    items.push({
      level: 1, module: 2, groupName: 'Group B — Be Verbs',
      type: ContentType.GRAMMAR,
      english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence,
      isPowerPack: true, sortOrder: 13 + i,
    });
  });

  // Group C — Action Verbs (isPowerPack: true)
  const groupC = [
    { english: 'go',         urduRoman: 'jaana',             exampleSentence: 'I go to school.' },
    { english: 'come',       urduRoman: 'aana',              exampleSentence: 'Come here please.' },
    { english: 'eat',        urduRoman: 'khaana',            exampleSentence: 'I eat rice.' },
    { english: 'drink',      urduRoman: 'peena',             exampleSentence: 'She drinks water.' },
    { english: 'sleep',      urduRoman: 'sona',              exampleSentence: 'He sleeps early.' },
    { english: 'wake',       urduRoman: 'uthna',             exampleSentence: 'I wake at 6.' },
    { english: 'sit',        urduRoman: 'baithna',           exampleSentence: 'Sit down please.' },
    { english: 'stand',      urduRoman: 'khara hona',        exampleSentence: 'Stand up.' },
    { english: 'run',        urduRoman: 'bhaagna',           exampleSentence: "Don't run inside." },
    { english: 'walk',       urduRoman: 'chalna',            exampleSentence: "Let's walk together." },
    { english: 'see',        urduRoman: 'dekhna',            exampleSentence: 'I see you.' },
    { english: 'look',       urduRoman: 'gaur se dekhna',    exampleSentence: 'Look at this.' },
    { english: 'hear',       urduRoman: 'sunna (achanak)',   exampleSentence: 'I hear music.' },
    { english: 'listen',     urduRoman: 'dhyan se sunna',    exampleSentence: 'Listen carefully.' },
    { english: 'speak',      urduRoman: 'bolna',             exampleSentence: 'Speak slowly please.' },
    { english: 'say',        urduRoman: 'kehna',             exampleSentence: 'What did you say?' },
    { english: 'tell',       urduRoman: 'batana',            exampleSentence: 'Tell me the truth.' },
    { english: 'ask',        urduRoman: 'poochna',           exampleSentence: 'Can I ask a question?' },
    { english: 'know',       urduRoman: 'jaanna',            exampleSentence: 'I know the answer.' },
    { english: 'think',      urduRoman: 'sochna',            exampleSentence: 'I think you are right.' },
    { english: 'want',       urduRoman: 'chahna',            exampleSentence: 'I want water.' },
    { english: 'need',       urduRoman: 'zaroorat hona',     exampleSentence: 'I need help.' },
    { english: 'get',        urduRoman: 'lena/paana',        exampleSentence: 'I get it now.' },
    { english: 'give',       urduRoman: 'dena',              exampleSentence: 'Give me the book.' },
    { english: 'take',       urduRoman: 'lena (apne paas)',  exampleSentence: 'Take this.' },
    { english: 'make',       urduRoman: 'banana',            exampleSentence: 'Make a list.' },
    { english: 'do',         urduRoman: 'karna',             exampleSentence: 'Do your work.' },
    { english: 'have',       urduRoman: 'rakhna/hona',       exampleSentence: 'I have a pen.' },
    { english: 'use',        urduRoman: 'istemaal karna',    exampleSentence: 'Use this pen.' },
    { english: 'find',       urduRoman: 'dhundhna',          exampleSentence: "I can't find my keys." },
    { english: 'try',        urduRoman: 'koshish karna',     exampleSentence: 'Try again.' },
    { english: 'feel',       urduRoman: 'mehsoos karna',     exampleSentence: 'I feel tired.' },
    { english: 'love',       urduRoman: 'pyaar karna',       exampleSentence: 'I love my family.' },
    { english: 'like',       urduRoman: 'pasand karna',      exampleSentence: 'I like tea.' },
    { english: 'help',       urduRoman: 'madad karna',       exampleSentence: 'Can you help me?' },
    { english: 'work',       urduRoman: 'kaam karna',        exampleSentence: 'I work hard.' },
    { english: 'play',       urduRoman: 'khelna',            exampleSentence: 'Children play outside.' },
    { english: 'read',       urduRoman: 'parhna',            exampleSentence: 'I read books.' },
    { english: 'write',      urduRoman: 'likhna',            exampleSentence: 'Write your name.' },
    { english: 'learn',      urduRoman: 'seekhna',           exampleSentence: 'I am learning English.' },
    { english: 'understand', urduRoman: 'samajhna',          exampleSentence: 'Do you understand?' },
    { english: 'remember',   urduRoman: 'yaad karna',        exampleSentence: 'Remember this rule.' },
    { english: 'forget',     urduRoman: 'bhoola',            exampleSentence: "Don't forget!" },
    { english: 'start',      urduRoman: 'shuru karna',       exampleSentence: "Let's start now." },
    { english: 'stop',       urduRoman: 'rokna',             exampleSentence: 'Stop talking.' },
    { english: 'open',       urduRoman: 'kholna',            exampleSentence: 'Open the door.' },
    { english: 'close',      urduRoman: 'band karna',        exampleSentence: 'Close your eyes.' },
    { english: 'buy',        urduRoman: 'khareedna',         exampleSentence: 'I want to buy this.' },
    { english: 'pay',        urduRoman: 'ada karna',         exampleSentence: 'I will pay the bill.' },
    { english: 'live',       urduRoman: 'rehna',             exampleSentence: 'I live in Lahore.' },
    { english: 'travel',     urduRoman: 'safar karna',       exampleSentence: 'I love to travel.' },
  ];

  groupC.forEach((w, i) => {
    items.push({
      level: 1, module: 2, groupName: 'Group C — Action Verbs',
      type: ContentType.VOCAB,
      english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence,
      isPowerPack: true, sortOrder: 18 + i,
    });
  });

  // Group D — Nouns (isPowerPack: false)
  const groupD = [
    { english: 'man',     urduRoman: 'aadmi',     exampleSentence: 'The man is kind.' },
    { english: 'woman',   urduRoman: 'aurat',     exampleSentence: 'The woman is smart.' },
    { english: 'boy',     urduRoman: 'larka',     exampleSentence: 'The boy runs fast.' },
    { english: 'girl',    urduRoman: 'larki',     exampleSentence: 'The girl reads well.' },
    { english: 'child',   urduRoman: 'bacha',     exampleSentence: 'The child is happy.' },
    { english: 'baby',    urduRoman: 'shishu',    exampleSentence: 'The baby sleeps.' },
    { english: 'family',  urduRoman: 'khandan',   exampleSentence: 'My family is big.' },
    { english: 'friend',  urduRoman: 'dost',      exampleSentence: 'He is my friend.' },
    { english: 'mother',  urduRoman: 'ammi',      exampleSentence: 'My mother is kind.' },
    { english: 'father',  urduRoman: 'abbu',      exampleSentence: 'My father works hard.' },
    { english: 'brother', urduRoman: 'bhai',      exampleSentence: 'My brother is tall.' },
    { english: 'sister',  urduRoman: 'behen',     exampleSentence: 'My sister is smart.' },
    { english: 'teacher', urduRoman: 'ustaad',    exampleSentence: 'The teacher is good.' },
    { english: 'student', urduRoman: 'talib ilm', exampleSentence: 'I am a student.' },
    { english: 'doctor',  urduRoman: 'doctor',    exampleSentence: 'She is a doctor.' },
    { english: 'school',  urduRoman: 'school',    exampleSentence: 'I go to school.' },
    { english: 'home',    urduRoman: 'ghar',      exampleSentence: 'I am at home.' },
    { english: 'room',    urduRoman: 'kamra',     exampleSentence: 'My room is clean.' },
    { english: 'city',    urduRoman: 'shehar',    exampleSentence: 'Lahore is a big city.' },
    { english: 'country', urduRoman: 'mulk',      exampleSentence: 'Pakistan is my country.' },
    { english: 'time',    urduRoman: 'waqt',      exampleSentence: 'Time is important.' },
    { english: 'day',     urduRoman: 'din',       exampleSentence: 'Today is a good day.' },
    { english: 'year',    urduRoman: 'saal',      exampleSentence: 'This year is new.' },
    { english: 'week',    urduRoman: 'hafta',     exampleSentence: 'One week has 7 days.' },
    { english: 'morning', urduRoman: 'subah',     exampleSentence: 'Good morning!' },
    { english: 'evening', urduRoman: 'shaam',     exampleSentence: 'Good evening!' },
    { english: 'night',   urduRoman: 'raat',      exampleSentence: 'Good night!' },
    { english: 'water',   urduRoman: 'paani',     exampleSentence: 'I drink water.' },
  ];

  groupD.forEach((w, i) => {
    items.push({
      level: 1, module: 2, groupName: 'Group D — Nouns',
      type: ContentType.VOCAB,
      english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence,
      isPowerPack: false, sortOrder: 68 + i,
    });
  });

  // Group E — Adjectives (isPowerPack: false)
  const groupE = [
    { english: 'good',        urduRoman: 'acha',         exampleSentence: 'You are good.' },
    { english: 'bad',         urduRoman: 'bura',         exampleSentence: 'This is bad.' },
    { english: 'big',         urduRoman: 'bada',         exampleSentence: 'It is a big house.' },
    { english: 'small',       urduRoman: 'chhota',       exampleSentence: 'This is a small room.' },
    { english: 'new',         urduRoman: 'naya',         exampleSentence: 'I have a new pen.' },
    { english: 'old',         urduRoman: 'purana',       exampleSentence: 'This is an old book.' },
    { english: 'happy',       urduRoman: 'khush',        exampleSentence: 'I am happy today.' },
    { english: 'sad',         urduRoman: 'udaas',        exampleSentence: 'He looks sad.' },
    { english: 'hot',         urduRoman: 'garam',        exampleSentence: 'The tea is hot.' },
    { english: 'cold',        urduRoman: 'thanda',       exampleSentence: 'The water is cold.' },
    { english: 'fast',        urduRoman: 'tez',          exampleSentence: 'He runs fast.' },
    { english: 'slow',        urduRoman: 'dheema',       exampleSentence: 'Walk slow please.' },
    { english: 'easy',        urduRoman: 'aasaan',       exampleSentence: 'This is easy.' },
    { english: 'hard',        urduRoman: 'mushkil',      exampleSentence: 'This is hard.' },
    { english: 'right',       urduRoman: 'sahi',         exampleSentence: 'You are right.' },
    { english: 'wrong',       urduRoman: 'galat',        exampleSentence: 'That is wrong.' },
    { english: 'clean',       urduRoman: 'saaf',         exampleSentence: 'Keep it clean.' },
    { english: 'dirty',       urduRoman: 'ganda',        exampleSentence: 'The room is dirty.' },
    { english: 'beautiful',   urduRoman: 'khoobsoorat',  exampleSentence: 'She is beautiful.' },
    { english: 'ugly',        urduRoman: 'bhaddaa',      exampleSentence: "Don't say it's ugly." },
    { english: 'important',   urduRoman: 'zaroori',      exampleSentence: 'This is important.' },
    { english: 'interesting', urduRoman: 'dilchasp',     exampleSentence: 'This book is interesting.' },
  ];

  groupE.forEach((w, i) => {
    items.push({
      level: 1, module: 2, groupName: 'Group E — Adjectives',
      type: ContentType.VOCAB,
      english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence,
      isPowerPack: false, sortOrder: 96 + i,
    });
  });

  // Group F — Connectors (isPowerPack: true)
  const groupF = [
    { english: 'and',     urduRoman: 'aur',              exampleSentence: 'Tea and milk.' },
    { english: 'but',     urduRoman: 'lekin',            exampleSentence: 'I tried but failed.' },
    { english: 'or',      urduRoman: 'ya',               exampleSentence: 'Tea or coffee?' },
    { english: 'because', urduRoman: 'kyunki',           exampleSentence: 'Late because of rain.' },
    { english: 'so',      urduRoman: 'isliye/to',        exampleSentence: 'Tired so sleeping.' },
    { english: 'if',      urduRoman: 'agar',             exampleSentence: 'If you study, you pass.' },
    { english: 'when',    urduRoman: 'jab',              exampleSentence: 'Call when you arrive.' },
    { english: 'before',  urduRoman: 'pehle',            exampleSentence: 'Eat before sleeping.' },
    { english: 'after',   urduRoman: 'baad mein',        exampleSentence: 'Rest after work.' },
    { english: 'with',    urduRoman: 'ke saath',         exampleSentence: 'Come with me.' },
    { english: 'without', urduRoman: 'ke bina',          exampleSentence: 'Tea without sugar.' },
    { english: 'for',     urduRoman: 'ke liye',          exampleSentence: 'This is for you.' },
    { english: 'in',      urduRoman: 'mein',             exampleSentence: 'In the room.' },
    { english: 'on',      urduRoman: 'upar/par',         exampleSentence: 'On the table.' },
    { english: 'at',      urduRoman: 'par (jagah)',      exampleSentence: 'At the door.' },
    { english: 'to',      urduRoman: 'ko/taraf',         exampleSentence: 'Go to school.' },
    { english: 'from',    urduRoman: 'se',               exampleSentence: 'From Karachi.' },
    { english: 'about',   urduRoman: 'ke baare mein',    exampleSentence: 'Talk about yourself.' },
  ];

  groupF.forEach((w, i) => {
    items.push({
      level: 1, module: 2, groupName: 'Group F — Connectors',
      type: ContentType.PHRASE,
      english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence,
      isPowerPack: true, sortOrder: 118 + i,
    });
  });

  // Group G — Colors (Rang) — from roadmap Days 7-8
  const groupG = [
    { english: 'Red',    urduRoman: 'Laal',       exampleSentence: 'The rose is red.' },
    { english: 'Blue',   urduRoman: 'Neela',      exampleSentence: 'The sky is blue.' },
    { english: 'Green',  urduRoman: 'Hara',       exampleSentence: 'Grass is green.' },
    { english: 'Yellow', urduRoman: 'Peela',      exampleSentence: 'The sun is yellow.' },
    { english: 'White',  urduRoman: 'Safed',      exampleSentence: 'Snow is white.' },
    { english: 'Black',  urduRoman: 'Kaala',      exampleSentence: 'My bag is black.' },
    { english: 'Orange', urduRoman: 'Narangi',    exampleSentence: 'I like orange colour.' },
    { english: 'Pink',   urduRoman: 'Gulabi',     exampleSentence: 'She wears a pink shirt.' },
    { english: 'Purple', urduRoman: 'Baingani',   exampleSentence: 'The grapes are purple.' },
    { english: 'Brown',  urduRoman: 'Bhoora',     exampleSentence: 'The door is brown.' },
  ];
  groupG.forEach((w, i) => {
    items.push({ level: 1, module: 2, groupName: 'Group G — Colors', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: true, sortOrder: 136 + i });
  });

  // Group H — Body Parts (Jism ke Azaa) — from roadmap Day 9
  const groupH = [
    { english: 'Head',     urduRoman: 'Sir',        exampleSentence: 'My head is aching.' },
    { english: 'Eye',      urduRoman: 'Aankh',      exampleSentence: 'She has beautiful eyes.' },
    { english: 'Ear',      urduRoman: 'Kaan',       exampleSentence: 'Please clean your ears.' },
    { english: 'Nose',     urduRoman: 'Naak',       exampleSentence: 'My nose is running.' },
    { english: 'Mouth',    urduRoman: 'Munh',       exampleSentence: 'Open your mouth.' },
    { english: 'Neck',     urduRoman: 'Gardan',     exampleSentence: 'I have neck pain.' },
    { english: 'Shoulder', urduRoman: 'Kandha',     exampleSentence: 'He patted my shoulder.' },
    { english: 'Hand',     urduRoman: 'Haath',      exampleSentence: 'Wash your hands.' },
    { english: 'Finger',   urduRoman: 'Ungli',      exampleSentence: 'I cut my finger.' },
    { english: 'Leg',      urduRoman: 'Taang',      exampleSentence: 'My leg is hurt.' },
    { english: 'Foot',     urduRoman: 'Pair',       exampleSentence: 'My foot is sore.' },
    { english: 'Back',     urduRoman: 'Peeth',      exampleSentence: 'I have back pain.' },
  ];
  groupH.forEach((w, i) => {
    items.push({ level: 1, module: 2, groupName: 'Group H — Body Parts', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: false, sortOrder: 146 + i });
  });

  // Group I — Common Animals (Jaanwar) — from roadmap Day 10
  const groupI = [
    { english: 'Dog',      urduRoman: 'Kutta',      exampleSentence: 'The dog is barking.' },
    { english: 'Cat',      urduRoman: 'Billi',      exampleSentence: 'A cat is sleeping.' },
    { english: 'Cow',      urduRoman: 'Gaay',       exampleSentence: 'The cow gives milk.' },
    { english: 'Goat',     urduRoman: 'Bakri',      exampleSentence: 'We have two goats.' },
    { english: 'Horse',    urduRoman: 'Ghora',      exampleSentence: 'The horse runs fast.' },
    { english: 'Lion',     urduRoman: 'Sher',       exampleSentence: 'The lion is the king.' },
    { english: 'Elephant', urduRoman: 'Haathi',     exampleSentence: 'Elephants are very big.' },
    { english: 'Bird',     urduRoman: 'Parinda',    exampleSentence: 'A bird is singing.' },
    { english: 'Fish',     urduRoman: 'Machli',     exampleSentence: 'I eat fish on Fridays.' },
    { english: 'Monkey',   urduRoman: 'Bandar',     exampleSentence: 'Monkeys live in trees.' },
  ];
  groupI.forEach((w, i) => {
    items.push({ level: 1, module: 2, groupName: 'Group I — Common Animals', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: false, sortOrder: 158 + i });
  });

  // Group J — Fruits (Phal) — from roadmap Day 11
  const groupJ = [
    { english: 'Apple',      urduRoman: 'Seb',        exampleSentence: 'An apple a day keeps the doctor away.' },
    { english: 'Mango',      urduRoman: 'Aam',        exampleSentence: 'Mango is my favourite fruit.' },
    { english: 'Banana',     urduRoman: 'Kela',       exampleSentence: 'Eat a banana for energy.' },
    { english: 'Orange',     urduRoman: 'Narangi',    exampleSentence: 'Orange juice is healthy.' },
    { english: 'Grapes',     urduRoman: 'Angoor',     exampleSentence: 'I love eating grapes.' },
    { english: 'Watermelon', urduRoman: 'Tarbuz',     exampleSentence: 'Watermelon is cool in summer.' },
    { english: 'Strawberry', urduRoman: 'Frauli',     exampleSentence: 'Strawberries are red and sweet.' },
    { english: 'Guava',      urduRoman: 'Amrood',     exampleSentence: 'Guava is a common Pakistani fruit.' },
  ];
  groupJ.forEach((w, i) => {
    items.push({ level: 1, module: 2, groupName: 'Group J — Fruits', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: false, sortOrder: 168 + i });
  });

  // Group K — Vegetables (Sabziyan) — from roadmap Day 12
  const groupK = [
    { english: 'Tomato',    urduRoman: 'Tamatar',    exampleSentence: 'Tomatoes are used in cooking.' },
    { english: 'Potato',    urduRoman: 'Aloo',       exampleSentence: 'I like potato chips.' },
    { english: 'Onion',     urduRoman: 'Pyaaz',      exampleSentence: 'Onion makes you cry.' },
    { english: 'Carrot',    urduRoman: 'Gajar',      exampleSentence: 'Carrots are good for eyes.' },
    { english: 'Spinach',   urduRoman: 'Palak',      exampleSentence: 'Spinach is very healthy.' },
    { english: 'Cabbage',   urduRoman: 'Band Gobhi', exampleSentence: 'Cabbage soup is delicious.' },
    { english: 'Cucumber',  urduRoman: 'Kheera',     exampleSentence: 'Cucumbers are cool and fresh.' },
    { english: 'Peas',      urduRoman: 'Matar',      exampleSentence: 'I love peas in rice.' },
  ];
  groupK.forEach((w, i) => {
    items.push({ level: 1, module: 2, groupName: 'Group K — Vegetables', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: false, sortOrder: 176 + i });
  });

  // Group L — Home Objects (Ghar ki Cheezein) — from roadmap Day 13-14
  const groupL = [
    { english: 'Chair',   urduRoman: 'Kursi',      exampleSentence: 'Please sit on the chair.' },
    { english: 'Table',   urduRoman: 'Mez',        exampleSentence: 'The book is on the table.' },
    { english: 'Bed',     urduRoman: 'Palang',     exampleSentence: 'I sleep on a soft bed.' },
    { english: 'Door',    urduRoman: 'Darwaza',    exampleSentence: 'Please close the door.' },
    { english: 'Window',  urduRoman: 'Khirki',     exampleSentence: 'Open the window please.' },
    { english: 'Fan',     urduRoman: 'Pankha',     exampleSentence: 'Turn on the fan.' },
    { english: 'Light',   urduRoman: 'Batti',      exampleSentence: 'Switch off the light.' },
    { english: 'Bag',     urduRoman: 'Jhola/Bag',  exampleSentence: 'My bag is heavy.' },
    { english: 'Clock',   urduRoman: 'Ghadi',      exampleSentence: 'The clock shows 5 o\'clock.' },
    { english: 'Mirror',  urduRoman: 'Aaina',      exampleSentence: 'She looked in the mirror.' },
  ];
  groupL.forEach((w, i) => {
    items.push({ level: 1, module: 2, groupName: 'Group L — Home Objects', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: false, sortOrder: 184 + i });
  });

  // ── MODULE 3: BASIC SENTENCES ────────────────────────────────────────────
  // Din 13–20 — SVO Formula, Positive / Negative / Question sentences

  // The master SVO formula — isPowerPack: true (the 20% that unlocks everything)
  const svoFormula = [
    {
      english: 'Subject + Verb + Object',
      urduRoman: 'Kaam karne wala + Kaam + Jis par kaam ho',
      exampleSentence: 'I eat food. (I=subject, eat=verb, food=object)',
    },
  ];

  svoFormula.forEach((s, i) => {
    items.push({
      level: 1, module: 3, groupName: 'SVO Formula',
      type: ContentType.GRAMMAR,
      english: s.english, urduRoman: s.urduRoman, exampleSentence: s.exampleSentence,
      isPowerPack: true, sortOrder: 1 + i,
    });
  });

  // Positive sentences — isPowerPack: true
  const positiveSentences = [
    { english: 'I am happy.',            urduRoman: 'Mein khush hoon.',          exampleSentence: 'I am happy today.' },
    { english: 'She is a doctor.',        urduRoman: 'Woh doctor hai.',            exampleSentence: 'She is a good doctor.' },
    { english: 'He works every day.',     urduRoman: 'Woh roz kaam karta hai.',    exampleSentence: 'He works every day from 9 to 5.' },
    { english: 'We eat dinner at 8.',     urduRoman: 'Hum raat 8 baje khana khate hain.', exampleSentence: 'We eat dinner together at 8.' },
    { english: 'They live in Lahore.',    urduRoman: 'Woh Lahore mein rehte hain.', exampleSentence: 'They have lived in Lahore for years.' },
    { english: 'I like tea.',             urduRoman: 'Mujhe chai pasand hai.',      exampleSentence: 'I like tea more than coffee.' },
    { english: 'She reads books.',        urduRoman: 'Woh kitaabein parhti hai.',   exampleSentence: 'She reads books every evening.' },
    { english: 'We are friends.',         urduRoman: 'Hum dost hain.',             exampleSentence: 'We are friends since childhood.' },
  ];

  positiveSentences.forEach((s, i) => {
    items.push({
      level: 1, module: 3, groupName: 'Positive Sentences',
      type: ContentType.SENTENCE,
      english: s.english, urduRoman: s.urduRoman, exampleSentence: s.exampleSentence,
      isPowerPack: true, sortOrder: 2 + i,
    });
  });

  // Negative sentences — isPowerPack: true
  const negativeSentences = [
    { english: "I do not eat meat.",        urduRoman: 'Mein gosht nahi khata.',          exampleSentence: "I do not eat meat for health reasons." },
    { english: "She does not go out.",      urduRoman: 'Woh bahar nahi jaati.',            exampleSentence: "She does not go out at night." },
    { english: "He is not here today.",     urduRoman: 'Woh aaj yahan nahi hai.',          exampleSentence: "He is not here today, he is sick." },
    { english: "We are not ready yet.",     urduRoman: 'Hum abhi tayyar nahi hain.',       exampleSentence: "We are not ready yet, give us 5 minutes." },
    { english: "They don't study at night.",urduRoman: 'Woh raat ko nahi parhte.',         exampleSentence: "They don't study at night, only in the morning." },
    { english: "I am not tired.",           urduRoman: 'Mein thaka hua nahi hoon.',        exampleSentence: "I am not tired, I can keep working." },
    { english: "She does not know English.",urduRoman: 'Woh English nahi jaanti.',         exampleSentence: "She does not know English yet but she is learning." },
  ];

  negativeSentences.forEach((s, i) => {
    items.push({
      level: 1, module: 3, groupName: 'Negative Sentences',
      type: ContentType.SENTENCE,
      english: s.english, urduRoman: s.urduRoman, exampleSentence: s.exampleSentence,
      isPowerPack: true, sortOrder: 10 + i,
    });
  });

  // Questions — isPowerPack: true
  const questionSentences = [
    { english: 'Do you like tea?',         urduRoman: 'Kya tum chai pasand karte ho?',    exampleSentence: 'Do you like tea or coffee?' },
    { english: 'Does she eat rice?',        urduRoman: 'Kya woh chawal khati hai?',        exampleSentence: 'Does she eat rice every day?' },
    { english: 'Is he your brother?',       urduRoman: 'Kya woh tumhara bhai hai?',        exampleSentence: 'Is he your older or younger brother?' },
    { english: 'Are you ready?',            urduRoman: 'Kya tum tayyar ho?',               exampleSentence: 'Are you ready to start the lesson?' },
    { english: 'Where do you live?',        urduRoman: 'Tum kahan rehte ho?',              exampleSentence: 'Where do you live in this city?' },
    { english: 'What is your name?',        urduRoman: 'Tumhara naam kya hai?',            exampleSentence: 'What is your name, please?' },
    { english: 'Can you help me?',          urduRoman: 'Kya tum meri madad kar sakte ho?', exampleSentence: 'Can you help me with this problem?' },
  ];

  questionSentences.forEach((s, i) => {
    items.push({
      level: 1, module: 3, groupName: 'Questions',
      type: ContentType.SENTENCE,
      english: s.english, urduRoman: s.urduRoman, exampleSentence: s.exampleSentence,
      isPowerPack: true, sortOrder: 17 + i,
    });
  });

  // ── MODULE 4: DAILY SPEAKING PATTERNS ────────────────────────────────────
  // Din 21–30 — Essential greetings, requests, and conversational responses
  // These are the 20% of phrases used in 80% of daily English interactions.

  // Greetings — isPowerPack: true
  const greetings = [
    { english: 'Good morning.',          urduRoman: 'Subah bakhair.',              exampleSentence: 'Good morning! How are you today?' },
    { english: 'Good afternoon.',        urduRoman: 'Dopahar bakhair.',            exampleSentence: 'Good afternoon, nice to see you.' },
    { english: 'Good evening.',          urduRoman: 'Shaam bakhair.',              exampleSentence: 'Good evening! How was your day?' },
    { english: 'How are you?',           urduRoman: 'Aap kaise hain?',             exampleSentence: 'How are you today, sir?' },
    { english: 'I am fine, thank you.',  urduRoman: 'Mein theek hoon, shukriya.', exampleSentence: 'I am fine, thank you. And you?' },
    { english: 'Nice to meet you.',      urduRoman: 'Aap se milkar khushi hui.',   exampleSentence: 'Nice to meet you for the first time.' },
    { english: 'See you later.',         urduRoman: 'Phir milenge.',               exampleSentence: 'See you later, take care.' },
    { english: 'Goodbye.',               urduRoman: 'Khuda hafiz.',                exampleSentence: 'Goodbye, have a safe journey.' },
  ];

  greetings.forEach((s, i) => {
    items.push({
      level: 1, module: 4, groupName: 'Greetings',
      type: ContentType.PHRASE,
      english: s.english, urduRoman: s.urduRoman, exampleSentence: s.exampleSentence,
      isPowerPack: true, sortOrder: 1 + i,
    });
  });

  // Polite requests — isPowerPack: true
  const politeRequests = [
    { english: 'Please.',               urduRoman: 'Meherbani kar ke.',         exampleSentence: 'Please help me with this.' },
    { english: 'Thank you.',            urduRoman: 'Shukriya.',                  exampleSentence: 'Thank you very much for your help.' },
    { english: 'You are welcome.',      urduRoman: 'Koi baat nahi.',             exampleSentence: 'You are welcome, it was my pleasure.' },
    { english: 'Sorry.',                urduRoman: 'Maafi.',                     exampleSentence: 'Sorry, I did not understand you.' },
    { english: 'Excuse me.',            urduRoman: 'Maaf kijiye.',               exampleSentence: 'Excuse me, can you help me please?' },
    { english: 'Could you repeat that?',urduRoman: 'Kya aap dobara keh sakte hain?', exampleSentence: 'Could you repeat that more slowly?' },
    { english: 'I do not understand.',  urduRoman: 'Mujhe samajh nahi aaya.',   exampleSentence: 'I do not understand. Can you explain?' },
    { english: 'Can you speak slowly?', urduRoman: 'Kya aap aahista bol sakte hain?', exampleSentence: 'Can you speak slowly? My English is basic.' },
  ];

  politeRequests.forEach((s, i) => {
    items.push({
      level: 1, module: 4, groupName: 'Polite Requests',
      type: ContentType.PHRASE,
      english: s.english, urduRoman: s.urduRoman, exampleSentence: s.exampleSentence,
      isPowerPack: true, sortOrder: 9 + i,
    });
  });

  // Numbers 1–10 — isPowerPack: true (needed for time, age, and counting)
  const numbers = [
    { english: 'One',   urduRoman: 'Ek',  exampleSentence: 'I have one brother.' },
    { english: 'Two',   urduRoman: 'Do',  exampleSentence: 'I have two sisters.' },
    { english: 'Three', urduRoman: 'Teen',exampleSentence: 'We need three chairs.' },
    { english: 'Four',  urduRoman: 'Char',exampleSentence: 'There are four rooms.' },
    { english: 'Five',  urduRoman: 'Paanch', exampleSentence: 'I study for five hours.' },
    { english: 'Six',   urduRoman: 'Chhe', exampleSentence: 'The meeting is at six.' },
    { english: 'Seven', urduRoman: 'Saat', exampleSentence: 'Seven days in a week.' },
    { english: 'Eight', urduRoman: 'Aath', exampleSentence: 'I wake up at eight.' },
    { english: 'Nine',  urduRoman: 'Nau',  exampleSentence: 'Nine months of the year.' },
    { english: 'Ten',   urduRoman: 'Das',  exampleSentence: 'I scored ten out of ten.' },
  ];

  numbers.forEach((s, i) => {
    items.push({
      level: 1, module: 4, groupName: 'Numbers 1–10',
      type: ContentType.VOCAB,
      english: s.english, urduRoman: s.urduRoman, exampleSentence: s.exampleSentence,
      isPowerPack: true, sortOrder: 17 + i,
    });
  });

  // Numbers 11–20 — isPowerPack: true
  const numbers11to20 = [
    { english: 'Eleven',   urduRoman: 'Gyarah',  exampleSentence: 'I am eleven years old.' },
    { english: 'Twelve',   urduRoman: 'Barah',   exampleSentence: 'There are twelve months in a year.' },
    { english: 'Thirteen', urduRoman: 'Terah',   exampleSentence: 'She is thirteen years old.' },
    { english: 'Fourteen', urduRoman: 'Chaudah', exampleSentence: 'I have fourteen books.' },
    { english: 'Fifteen',  urduRoman: 'Pandrah', exampleSentence: 'The class has fifteen students.' },
    { english: 'Sixteen',  urduRoman: 'Solah',   exampleSentence: 'He is sixteen years old.' },
    { english: 'Seventeen',urduRoman: 'Satrah',  exampleSentence: 'There are seventeen chairs.' },
    { english: 'Eighteen', urduRoman: 'Atharah', exampleSentence: 'She is eighteen years old.' },
    { english: 'Nineteen', urduRoman: 'Unnees',  exampleSentence: 'I need nineteen rupees.' },
    { english: 'Twenty',   urduRoman: 'Bees',    exampleSentence: 'Twenty students passed the test.' },
  ];

  numbers11to20.forEach((s, i) => {
    items.push({
      level: 1, module: 4, groupName: 'Numbers 11–20',
      type: ContentType.VOCAB,
      english: s.english, urduRoman: s.urduRoman, exampleSentence: s.exampleSentence,
      isPowerPack: true, sortOrder: 27 + i,
    });
  });

  // Tens 30–100 — isPowerPack: true
  const tens = [
    { english: 'Thirty',  urduRoman: 'Tees',    exampleSentence: 'I am thirty years old.' },
    { english: 'Forty',   urduRoman: 'Chaalees', exampleSentence: 'Forty people attended.' },
    { english: 'Fifty',   urduRoman: 'Pachaas', exampleSentence: 'The price is fifty rupees.' },
    { english: 'Sixty',   urduRoman: 'Saath',   exampleSentence: 'Sixty seconds in a minute.' },
    { english: 'Seventy', urduRoman: 'Sattar',  exampleSentence: 'He scored seventy marks.' },
    { english: 'Eighty',  urduRoman: 'Assee',   exampleSentence: 'She scored eighty percent.' },
    { english: 'Ninety',  urduRoman: 'Nabbe',   exampleSentence: 'Ninety days is three months.' },
    { english: 'One Hundred', urduRoman: 'Ek Sau', exampleSentence: 'One hundred students in school.' },
  ];

  tens.forEach((s, i) => {
    items.push({
      level: 1, module: 4, groupName: 'Tens: 30–100',
      type: ContentType.VOCAB,
      english: s.english, urduRoman: s.urduRoman, exampleSentence: s.exampleSentence,
      isPowerPack: true, sortOrder: 37 + i,
    });
  });

  // Days of the Week — isPowerPack: true
  const daysOfWeek = [
    { english: 'Monday',    urduRoman: 'Peer',      exampleSentence: 'Monday is the first working day.' },
    { english: 'Tuesday',   urduRoman: 'Mangal',    exampleSentence: 'I have a meeting on Tuesday.' },
    { english: 'Wednesday', urduRoman: 'Budh',      exampleSentence: 'We play cricket on Wednesday.' },
    { english: 'Thursday',  urduRoman: 'Jumeraat',  exampleSentence: 'School ends early on Thursday.' },
    { english: 'Friday',    urduRoman: 'Juma',      exampleSentence: 'Friday is a holy day.' },
    { english: 'Saturday',  urduRoman: 'Hafta',     exampleSentence: 'We rest on Saturday.' },
    { english: 'Sunday',    urduRoman: 'Aitwar',    exampleSentence: 'Sunday is a holiday.' },
  ];

  daysOfWeek.forEach((s, i) => {
    items.push({
      level: 1, module: 4, groupName: 'Days of the Week',
      type: ContentType.VOCAB,
      english: s.english, urduRoman: s.urduRoman, exampleSentence: s.exampleSentence,
      isPowerPack: true, sortOrder: 45 + i,
    });
  });

  // Months of the Year — isPowerPack: false
  const months = [
    { english: 'January',   urduRoman: 'Janvari',   exampleSentence: 'January is a cold month.' },
    { english: 'February',  urduRoman: 'Farvari',   exampleSentence: 'February has 28 or 29 days.' },
    { english: 'March',     urduRoman: 'March',     exampleSentence: 'Spring starts in March.' },
    { english: 'April',     urduRoman: 'April',     exampleSentence: 'April is a warm month.' },
    { english: 'May',       urduRoman: 'May',       exampleSentence: 'May is very hot in Pakistan.' },
    { english: 'June',      urduRoman: 'June',      exampleSentence: 'School holidays are in June.' },
    { english: 'July',      urduRoman: 'July',      exampleSentence: 'It rains a lot in July.' },
    { english: 'August',    urduRoman: 'Agast',     exampleSentence: 'Pakistan Day is in August.' },
    { english: 'September', urduRoman: 'Sitambar',  exampleSentence: 'School starts in September.' },
    { english: 'October',   urduRoman: 'Aktoobar',  exampleSentence: 'October weather is nice.' },
    { english: 'November',  urduRoman: 'Navambar',  exampleSentence: 'November gets cold.' },
    { english: 'December',  urduRoman: 'Disambar',  exampleSentence: 'December is the coldest month.' },
  ];

  months.forEach((s, i) => {
    items.push({
      level: 1, module: 4, groupName: 'Months of the Year',
      type: ContentType.VOCAB,
      english: s.english, urduRoman: s.urduRoman, exampleSentence: s.exampleSentence,
      isPowerPack: false, sortOrder: 52 + i,
    });
  });

  // Telling Time — isPowerPack: true
  const tellingTime = [
    { english: 'What time is it?',    urduRoman: 'Kya waqt hua hai?',           exampleSentence: 'Excuse me, what time is it now?' },
    { english: 'It is 3 o\'clock.',   urduRoman: 'Teen baje hain.',              exampleSentence: 'It is 3 o\'clock in the afternoon.' },
    { english: 'It is half past 4.',  urduRoman: 'Sarrhe chaar baje hain.',      exampleSentence: 'The meeting is at half past 4.' },
    { english: 'It is quarter past 2.',urduRoman: 'Savaa do baje hain.',         exampleSentence: 'It is quarter past 2, hurry up!' },
    { english: 'It is quarter to 5.', urduRoman: 'Paune paanch baje hain.',      exampleSentence: 'It is quarter to 5, time to leave.' },
    { english: 'In the morning',      urduRoman: 'Subah ko',                     exampleSentence: 'I wake up in the morning at 6.' },
    { english: 'In the afternoon',    urduRoman: 'Dopahar ko',                   exampleSentence: 'We eat lunch in the afternoon.' },
    { english: 'At night',            urduRoman: 'Raat ko',                      exampleSentence: 'I study English at night.' },
  ];

  tellingTime.forEach((s, i) => {
    items.push({
      level: 1, module: 4, groupName: 'Telling Time',
      type: ContentType.PHRASE,
      english: s.english, urduRoman: s.urduRoman, exampleSentence: s.exampleSentence,
      isPowerPack: true, sortOrder: 64 + i,
    });
  });

  // Self-Introduction Phrases — isPowerPack: true
  const selfIntro = [
    { english: 'My name is ___.',            urduRoman: 'Mera naam ___ hai.',                 exampleSentence: 'My name is Ali Ahmed.' },
    { english: 'I am ___ years old.',        urduRoman: 'Meri umar ___ saal hai.',             exampleSentence: 'I am 22 years old.' },
    { english: 'I am from Lahore.',          urduRoman: 'Mein Lahore se hoon.',                exampleSentence: 'I am from Lahore, Pakistan.' },
    { english: 'I am a student.',            urduRoman: 'Mein ek talib ilm hoon.',             exampleSentence: 'I am a student at Government College.' },
    { english: 'I work in an office.',       urduRoman: 'Mein office mein kaam karta hoon.',   exampleSentence: 'I work in an office in the city.' },
    { english: 'My hobby is reading.',       urduRoman: 'Mera shauk kitaabein parhna hai.',    exampleSentence: 'My hobby is reading books.' },
    { english: 'Nice to meet you.',          urduRoman: 'Aap se milkar khushi hui.',           exampleSentence: 'Nice to meet you for the first time.' },
  ];

  selfIntro.forEach((s, i) => {
    items.push({
      level: 1, module: 4, groupName: 'Self-Introduction',
      type: ContentType.PHRASE,
      english: s.english, urduRoman: s.urduRoman, exampleSentence: s.exampleSentence,
      isPowerPack: true, sortOrder: 72 + i,
    });
  });

  // Direction Words — isPowerPack: false
  const directions = [
    { english: 'Go straight.',     urduRoman: 'Seedha jaaiye.',            exampleSentence: 'Go straight and you will see the school.' },
    { english: 'Turn left.',        urduRoman: 'Baayin taraf muriye.',       exampleSentence: 'Turn left at the traffic signal.' },
    { english: 'Turn right.',       urduRoman: 'Seedhi taraf muriye.',       exampleSentence: 'Turn right at the roundabout.' },
    { english: 'Where is ___?',     urduRoman: '___ kahan hai?',             exampleSentence: 'Excuse me, where is the hospital?' },
    { english: 'How far is it?',    urduRoman: 'Yeh kitna door hai?',        exampleSentence: 'How far is it from here?' },
    { english: 'About 5 minutes.',  urduRoman: 'Takriban 5 minute.',         exampleSentence: 'It is about 5 minutes by walk.' },
    { english: 'On the left.',      urduRoman: 'Baayin taraf.',              exampleSentence: 'The shop is on the left side.' },
    { english: 'On the right.',     urduRoman: 'Seedhi taraf.',              exampleSentence: 'The school is on the right.' },
  ];

  directions.forEach((s, i) => {
    items.push({
      level: 1, module: 4, groupName: 'Direction Words',
      type: ContentType.PHRASE,
      english: s.english, urduRoman: s.urduRoman, exampleSentence: s.exampleSentence,
      isPowerPack: false, sortOrder: 79 + i,
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // LEVEL 2 — ELEMENTARY (Days 31–75)
  // ════════════════════════════════════════════════════════════════════════

  // ── LEVEL 2, MODULE 1: Present Tense ────────────────────────────────────

  const presentTenseGrammar = [
    {
      english: 'Present Simple Formula',
      urduRoman: 'I/You/We/They + Verb | He/She/It + Verb+s/es',
      exampleSentence: 'I eat breakfast. He eats breakfast.',
      isPowerPack: true,
    },
    {
      english: 'Present Continuous Formula',
      urduRoman: 'Subject + am/is/are + Verb+ing',
      exampleSentence: 'I am eating. She is reading.',
      isPowerPack: true,
    },
    {
      english: 'do / does (Question & Negative)',
      urduRoman: 'I/You/We/They → do | He/She/It → does',
      exampleSentence: 'Do you like tea? Does she work here?',
      isPowerPack: true,
    },
    {
      english: 'am / is / are',
      urduRoman: 'I → am | He/She/It → is | You/We/They → are',
      exampleSentence: 'I am happy. She is smart. We are ready.',
      isPowerPack: true,
    },
  ];
  presentTenseGrammar.forEach((g, i) => {
    items.push({ level: 2, module: 1, groupName: 'Present Tense Grammar', type: ContentType.GRAMMAR, english: g.english, urduRoman: g.urduRoman, exampleSentence: g.exampleSentence, isPowerPack: g.isPowerPack, sortOrder: i + 1 });
  });

  const presentSimpleExamples = [
    { english: 'I eat breakfast every morning.', urduRoman: 'Mein roz subah naashta karta hoon.' },
    { english: 'He reads newspaper daily.', urduRoman: 'Woh roz akhbaar parhta hai.' },
    { english: 'She teaches English at school.', urduRoman: 'Woh school mein English parhati hai.' },
    { english: 'We play cricket on Sundays.', urduRoman: 'Hum Sunday ko cricket khelte hain.' },
    { english: "I don't like cold weather.", urduRoman: 'Mujhe thanda mausam pasand nahi.' },
    { english: "He doesn't eat spicy food.", urduRoman: 'Woh tez masale nahi khata.' },
    { english: 'Do you speak English?', urduRoman: 'Kya aap English bolte hain?' },
    { english: 'Where does she work?', urduRoman: 'Woh kahan kaam karti hai?' },
  ];
  presentSimpleExamples.forEach((s, i) => {
    items.push({ level: 2, module: 1, groupName: 'Present Simple Sentences', type: ContentType.SENTENCE, english: s.english, urduRoman: s.urduRoman, exampleSentence: s.english, isPowerPack: false, sortOrder: 5 + i });
  });

  const presentTimeWords = [
    { english: 'every day', urduRoman: 'roz', exampleSentence: 'I go to work every day.' },
    { english: 'always', urduRoman: 'hamesha', exampleSentence: 'She always wakes up early.' },
    { english: 'usually', urduRoman: 'aksar', exampleSentence: 'He usually drinks tea.' },
    { english: 'often', urduRoman: 'zyadatar', exampleSentence: 'We often eat together.' },
    { english: 'sometimes', urduRoman: 'kabhi kabhi', exampleSentence: 'I sometimes go for a walk.' },
    { english: 'never', urduRoman: 'kabhi nahi', exampleSentence: 'He never misses class.' },
    { english: 'right now', urduRoman: 'abhi is waqt', exampleSentence: 'What are you doing right now?' },
    { english: 'at the moment', urduRoman: 'is lamhe', exampleSentence: 'She is sleeping at the moment.' },
  ];
  presentTimeWords.forEach((w, i) => {
    items.push({ level: 2, module: 1, groupName: 'Present Time Expressions', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: false, sortOrder: 13 + i });
  });

  // Modal Verbs — from roadmap Days 39-41 (can, may, might, must, should)
  const modalVerbs = [
    { english: 'can', urduRoman: 'Sak sakna / qudrat hona', exampleSentence: 'I can speak English.', isPowerPack: true },
    { english: 'cannot / can\'t', urduRoman: 'Nahi kar sakta', exampleSentence: 'She cannot come today.', isPowerPack: true },
    { english: 'could', urduRoman: 'Sak sakta tha (past) / polite request', exampleSentence: 'Could you help me please?', isPowerPack: true },
    { english: 'should', urduRoman: 'Chahiye — salah ya zimmedaari', exampleSentence: 'You should study every day.', isPowerPack: true },
    { english: 'should not / shouldn\'t', urduRoman: 'Nahi karna chahiye', exampleSentence: 'You shouldn\'t eat too much junk food.', isPowerPack: true },
    { english: 'must', urduRoman: 'Zaroor karna hai — strict zaroorat', exampleSentence: 'You must wear a helmet.', isPowerPack: true },
    { english: 'must not / mustn\'t', urduRoman: 'Bilkul nahi karna chahiye', exampleSentence: 'You mustn\'t lie.', isPowerPack: true },
    { english: 'may', urduRoman: 'Shayad / Ijazat maangna', exampleSentence: 'May I come in?', isPowerPack: false },
    { english: 'might', urduRoman: 'Shayad — kam imkaan', exampleSentence: 'It might rain today.', isPowerPack: false },
    { english: 'have to', urduRoman: 'Karna zaroor hai (bahari zaroorat)', exampleSentence: 'I have to wake up early tomorrow.', isPowerPack: false },
    { english: 'would like to', urduRoman: 'Chahna hoon — polite tarika', exampleSentence: 'I would like to order a coffee please.', isPowerPack: false },
  ];
  modalVerbs.forEach((m, i) => {
    items.push({ level: 2, module: 1, groupName: 'Modal Verbs', type: ContentType.GRAMMAR, english: m.english, urduRoman: m.urduRoman, exampleSentence: m.exampleSentence, isPowerPack: m.isPowerPack, sortOrder: 21 + i });
  });

  // ── LEVEL 2, MODULE 2: Past Tense ───────────────────────────────────────

  const pastTenseGrammar = [
    {
      english: 'Past Simple Formula (Regular)',
      urduRoman: 'Subject + Verb+ed',
      exampleSentence: 'I worked. She played. He watched.',
      isPowerPack: true,
    },
    {
      english: 'Past Simple Formula (Irregular)',
      urduRoman: 'Subject + Special 2nd Form (yaad karna hoga)',
      exampleSentence: 'I went. She ate. He saw.',
      isPowerPack: true,
    },
    {
      english: 'Past Negative: did not / didn\'t',
      urduRoman: 'I/She/He/They + did not + Verb (base)',
      exampleSentence: "I didn't go. She didn't eat.",
      isPowerPack: true,
    },
    {
      english: 'Past Question: Did + Subject + Verb?',
      urduRoman: 'Did + Subject + Verb (base form) + ?',
      exampleSentence: 'Did you eat lunch? Did she call you?',
      isPowerPack: true,
    },
  ];
  pastTenseGrammar.forEach((g, i) => {
    items.push({ level: 2, module: 2, groupName: 'Past Tense Grammar', type: ContentType.GRAMMAR, english: g.english, urduRoman: g.urduRoman, exampleSentence: g.exampleSentence, isPowerPack: g.isPowerPack, sortOrder: i + 1 });
  });

  const irregularVerbs = [
    { english: 'go → went', urduRoman: 'jaana → gaya', exampleSentence: 'I went to the market yesterday.' },
    { english: 'come → came', urduRoman: 'aana → aaya', exampleSentence: 'She came to visit us.' },
    { english: 'eat → ate', urduRoman: 'khaana → khaya', exampleSentence: 'He ate biryani for dinner.' },
    { english: 'drink → drank', urduRoman: 'peena → piya', exampleSentence: 'I drank two glasses of water.' },
    { english: 'sleep → slept', urduRoman: 'sona → soya', exampleSentence: 'She slept early last night.' },
    { english: 'see → saw', urduRoman: 'dekhna → dekha', exampleSentence: 'I saw a beautiful bird.' },
    { english: 'say → said', urduRoman: 'kehna → kaha', exampleSentence: 'What did he say?' },
    { english: 'give → gave', urduRoman: 'dena → diya', exampleSentence: 'She gave me a gift.' },
    { english: 'take → took', urduRoman: 'lena → liya', exampleSentence: 'He took my pen.' },
    { english: 'make → made', urduRoman: 'banana → banaya', exampleSentence: 'They made a plan.' },
    { english: 'do → did', urduRoman: 'karna → kiya', exampleSentence: 'What did you do today?' },
    { english: 'have → had', urduRoman: 'rakhna → rakha/tha', exampleSentence: 'I had a good time.' },
    { english: 'know → knew', urduRoman: 'jaanna → jaanta tha', exampleSentence: 'She knew the answer.' },
    { english: 'think → thought', urduRoman: 'sochna → socha', exampleSentence: 'I thought you were busy.' },
    { english: 'buy → bought', urduRoman: 'khareedna → khareeda', exampleSentence: 'He bought a new phone.' },
    { english: 'write → wrote', urduRoman: 'likhna → likha', exampleSentence: 'She wrote a letter to him.' },
    { english: 'read → read', urduRoman: 'parhna → parha (same)', exampleSentence: 'I read the book last week.' },
    { english: 'run → ran', urduRoman: 'bhaagna → bhaaga', exampleSentence: 'He ran to catch the bus.' },
    { english: 'speak → spoke', urduRoman: 'bolna → bola', exampleSentence: 'She spoke very clearly.' },
    { english: 'find → found', urduRoman: 'dhundhna → mila', exampleSentence: 'I found my keys.' },
    { english: 'meet → met', urduRoman: 'milna → mila', exampleSentence: 'We met at the office.' },
    { english: 'leave → left', urduRoman: 'jaana/chhodna → gaya', exampleSentence: 'He left early.' },
    { english: 'send → sent', urduRoman: 'bhejna → bheja', exampleSentence: 'I sent you a message.' },
    { english: 'pay → paid', urduRoman: 'ada karna → ada kiya', exampleSentence: 'She paid the bill.' },
  ];
  irregularVerbs.forEach((v, i) => {
    items.push({ level: 2, module: 2, groupName: 'Irregular Verbs (Core 20%)', type: ContentType.VOCAB, english: v.english, urduRoman: v.urduRoman, exampleSentence: v.exampleSentence, isPowerPack: true, sortOrder: 5 + i });
  });

  const pastTimeWords = [
    { english: 'yesterday', urduRoman: 'kal', exampleSentence: 'I went to school yesterday.' },
    { english: 'last night', urduRoman: 'kal raat', exampleSentence: 'We watched a movie last night.' },
    { english: 'last week', urduRoman: 'pichle hafte', exampleSentence: 'She called me last week.' },
    { english: 'last year', urduRoman: 'pichle saal', exampleSentence: 'He started the job last year.' },
    { english: 'ago', urduRoman: 'pehle', exampleSentence: 'I came here two days ago.' },
    { english: 'when I was young', urduRoman: 'jab mein chota tha', exampleSentence: 'When I was young, I loved cricket.' },
  ];
  pastTimeWords.forEach((w, i) => {
    items.push({ level: 2, module: 2, groupName: 'Past Time Expressions', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: false, sortOrder: 29 + i });
  });

  // ── LEVEL 2, MODULE 3: Future Tense + Articles + Plurals ────────────────

  const futureTenseGrammar = [
    {
      english: 'Future with Will: Subject + will + Verb',
      urduRoman: 'Subject + will + Verb (base form)',
      exampleSentence: 'I will study hard. She will call you.',
      isPowerPack: true,
    },
    {
      english: 'Future Negative: will not / won\'t',
      urduRoman: 'Subject + will not (won\'t) + Verb',
      exampleSentence: "I won't eat junk food. She won't be late.",
      isPowerPack: true,
    },
    {
      english: 'Future Question: Will + Subject + Verb?',
      urduRoman: 'Will + Subject + Verb (base) + ?',
      exampleSentence: 'Will you come tomorrow? Will she pass?',
      isPowerPack: true,
    },
    {
      english: 'Going to: Subject + am/is/are + going to + Verb',
      urduRoman: 'Pehle se bana hua plan batane ke liye',
      exampleSentence: 'I am going to study tonight. She is going to visit.',
      isPowerPack: true,
    },
    {
      english: 'Article "a" — first mention, consonant sound',
      urduRoman: 'Pehli baar kisi cheez ka zikr (consonant sound)',
      exampleSentence: 'I saw a dog. She bought a book.',
      isPowerPack: true,
    },
    {
      english: 'Article "an" — first mention, vowel sound',
      urduRoman: 'Pehli baar kisi cheez ka zikr (vowel sound: A E I O U)',
      exampleSentence: 'He ate an apple. She is an engineer.',
      isPowerPack: true,
    },
    {
      english: 'Article "the" — specific / known thing',
      urduRoman: 'Kisi khaas cheez ya jagah ke liye',
      exampleSentence: 'Please close the door. The sun is bright.',
      isPowerPack: true,
    },
    {
      english: 'Plural Rule 1: + s (most words)',
      urduRoman: 'Zyaadatar words mein sirf "s" lagao',
      exampleSentence: 'book → books, car → cars, pen → pens',
      isPowerPack: false,
    },
    {
      english: 'Plural Rule 2: + es (words ending in s, sh, ch, x)',
      urduRoman: 's, sh, ch, x se khatam hon to "es" lagao',
      exampleSentence: 'bus → buses, dish → dishes, watch → watches',
      isPowerPack: false,
    },
    {
      english: 'Irregular Plurals (Yaad karo)',
      urduRoman: 'man→men, woman→women, child→children, tooth→teeth',
      exampleSentence: 'The children are playing. The men are working.',
      isPowerPack: false,
    },
  ];
  futureTenseGrammar.forEach((g, i) => {
    items.push({ level: 2, module: 3, groupName: 'Future Tense & Grammar', type: ContentType.GRAMMAR, english: g.english, urduRoman: g.urduRoman, exampleSentence: g.exampleSentence, isPowerPack: g.isPowerPack, sortOrder: i + 1 });
  });

  const futureTimeWords = [
    { english: 'tomorrow', urduRoman: 'kal (aane wala)', exampleSentence: 'I will call you tomorrow.' },
    { english: 'next week', urduRoman: 'agli hafte', exampleSentence: 'She will come next week.' },
    { english: 'next year', urduRoman: 'agli saal', exampleSentence: 'He will graduate next year.' },
    { english: 'soon', urduRoman: 'jald', exampleSentence: 'I will be there soon.' },
    { english: 'tonight', urduRoman: 'aaj raat', exampleSentence: 'Are you going to study tonight?' },
    { english: 'in an hour', urduRoman: 'ek ghante mein', exampleSentence: 'The meeting will start in an hour.' },
  ];
  futureTimeWords.forEach((w, i) => {
    items.push({ level: 2, module: 3, groupName: 'Future Time Expressions', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: false, sortOrder: 11 + i });
  });

  // Comparatives & Superlatives — from roadmap Days 45-46
  const comparatives = [
    { english: 'Comparative Rule 1: short adj + er (bigger, faster)', urduRoman: 'Chhotay adjective mein "-er" lagao', exampleSentence: 'He is taller than me.', isPowerPack: true },
    { english: 'Comparative Rule 2: long adj → more + adj (more beautiful)', urduRoman: 'Bade adjective ke aage "more" lagao', exampleSentence: 'This test is more difficult than the last one.', isPowerPack: true },
    { english: 'Superlative Rule 1: short adj + est (the biggest, the fastest)', urduRoman: 'Chhotay adjective mein "the ___est" lagao', exampleSentence: 'He is the tallest boy in class.', isPowerPack: true },
    { english: 'Superlative Rule 2: long adj → the most + adj', urduRoman: 'Bade adjective ke aage "the most" lagao', exampleSentence: 'She is the most intelligent student.', isPowerPack: true },
    { english: 'good → better → the best', urduRoman: 'Acha → behtar → sabse behtar (irregular)', exampleSentence: 'Your English is good but you can do better. She is the best!', isPowerPack: true },
    { english: 'bad → worse → the worst', urduRoman: 'Bura → bura tar → sabse bura (irregular)', exampleSentence: 'This is bad, but that idea is even worse.', isPowerPack: true },
    { english: 'big → bigger → the biggest', urduRoman: 'Bada → bara → sabse bada', exampleSentence: 'Karachi is bigger than Lahore. It is the biggest city.', isPowerPack: false },
    { english: 'fast → faster → the fastest', urduRoman: 'Tez → tez tar → sabse tez', exampleSentence: 'She runs faster than him. He is the fastest runner.', isPowerPack: false },
    { english: 'tall → taller → the tallest', urduRoman: 'Lamba → lamba tar → sabse lamba', exampleSentence: 'Ahmed is taller than Ali. Hassan is the tallest.', isPowerPack: false },
    { english: 'Comparing with "than": A is bigger than B.', urduRoman: '"than" = se zyada — A, B se bada hai.', exampleSentence: 'English is easier than I thought.', isPowerPack: false },
  ];
  comparatives.forEach((c, i) => {
    items.push({ level: 2, module: 3, groupName: 'Comparatives & Superlatives', type: ContentType.GRAMMAR, english: c.english, urduRoman: c.urduRoman, exampleSentence: c.exampleSentence, isPowerPack: c.isPowerPack, sortOrder: 17 + i });
  });

  // ── LEVEL 2, MODULE 4: Daily Conversation Topics ────────────────────────

  const shoppingPhrases = [
    { english: 'How much does this cost?', urduRoman: 'Iska kitna daam hai?', exampleSentence: 'Excuse me, how much does this shirt cost?' },
    { english: 'That is too expensive.', urduRoman: 'Yeh bahut mehenga hai.', exampleSentence: 'That is too expensive. Can you reduce the price?' },
    { english: 'Can you give me a discount?', urduRoman: 'Kya aap discount de sakte hain?', exampleSentence: 'Can you give me a discount on this?' },
    { english: 'Do you have it in another color?', urduRoman: 'Kya yeh doosre rang mein hai?', exampleSentence: 'Do you have this shirt in blue?' },
    { english: "I'll take it.", urduRoman: 'Mein yeh le leta hoon.', exampleSentence: "Okay, I'll take it. Here is the money." },
    { english: 'Do you accept cards?', urduRoman: 'Kya aap card lete hain?', exampleSentence: 'Do you accept credit cards here?' },
    { english: 'Where is the fitting room?', urduRoman: 'Fitting room kahan hai?', exampleSentence: 'Excuse me, where is the fitting room?' },
    { english: 'I am just looking, thank you.', urduRoman: 'Mein bas dekh raha hoon, shukriya.', exampleSentence: 'I am just looking, thank you.' },
  ];
  shoppingPhrases.forEach((p, i) => {
    items.push({ level: 2, module: 4, groupName: 'Shopping Conversations', type: ContentType.PHRASE, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: true, sortOrder: i + 1 });
  });

  const restaurantPhrases = [
    { english: 'A table for two, please.', urduRoman: 'Do logon ke liye mez chahiye.', exampleSentence: 'Good evening. A table for two, please.' },
    { english: 'Can I see the menu?', urduRoman: 'Kya mein menu dekh sakta hoon?', exampleSentence: 'Excuse me, can I see the menu please?' },
    { english: 'I would like to order...', urduRoman: 'Mein ... order karna chahta hoon.', exampleSentence: 'I would like to order biryani and naan.' },
    { english: 'What do you recommend?', urduRoman: 'Aap kya suggest karenge?', exampleSentence: 'What do you recommend here? What is popular?' },
    { english: 'The food is delicious.', urduRoman: 'Khaana bahut mazedaar hai.', exampleSentence: 'The food is absolutely delicious. Thank you!' },
    { english: 'Can I have the bill please?', urduRoman: 'Bill de dijiye please.', exampleSentence: 'Excuse me, can I have the bill please?' },
    { english: 'Is this dish spicy?', urduRoman: 'Kya yeh dish tez masale wali hai?', exampleSentence: 'Is this curry spicy? I prefer mild food.' },
  ];
  restaurantPhrases.forEach((p, i) => {
    items.push({ level: 2, module: 4, groupName: 'Restaurant Conversations', type: ContentType.PHRASE, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: true, sortOrder: 9 + i });
  });

  const introductionPhrases = [
    { english: 'My name is ___.', urduRoman: 'Mera naam ___ hai.', exampleSentence: 'Hello! My name is Ali. What is your name?' },
    { english: 'I am ___ years old.', urduRoman: 'Meri umar ___ saal hai.', exampleSentence: 'I am 25 years old and I work in an office.' },
    { english: 'I am from Lahore.', urduRoman: 'Mein Lahore se hoon.', exampleSentence: 'I am from Lahore, Pakistan. Where are you from?' },
    { english: 'I work as a ___.', urduRoman: 'Mein ___ ke tor par kaam karta hoon.', exampleSentence: 'I work as a teacher at a local school.' },
    { english: 'My hobby is ___.', urduRoman: 'Mera shauk ___ hai.', exampleSentence: 'My hobby is reading books and watching cricket.' },
    { english: 'I am learning English.', urduRoman: 'Mein English seekh raha hoon.', exampleSentence: 'I am learning English to improve my career.' },
    { english: 'It is nice to meet you.', urduRoman: 'Aap se milkar khushi hui.', exampleSentence: 'It is very nice to meet you. Let us talk more.' },
  ];
  introductionPhrases.forEach((p, i) => {
    items.push({ level: 2, module: 4, groupName: 'Self Introduction', type: ContentType.PHRASE, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: true, sortOrder: 16 + i });
  });

  const directionPhrases = [
    { english: 'Excuse me, where is ___?', urduRoman: 'Maaf kijiye, ___ kahan hai?', exampleSentence: 'Excuse me, where is the nearest hospital?' },
    { english: 'Go straight.', urduRoman: 'Seedha jaaiye.', exampleSentence: 'Go straight for two blocks, then turn left.' },
    { english: 'Turn left / Turn right.', urduRoman: 'Baayan / Seedhi taraf muriye.', exampleSentence: 'Turn right at the traffic signal.' },
    { english: 'It is near / far from here.', urduRoman: 'Yeh yahan se qareeb / door hai.', exampleSentence: 'The mosque is near here, just five minutes by walk.' },
    { english: 'How far is it?', urduRoman: 'Yeh kitni door hai?', exampleSentence: 'How far is the bus station from here?' },
    { english: 'You cannot miss it.', urduRoman: 'Aap bilkul miss nahi kar sakte.', exampleSentence: 'The building is on the corner. You cannot miss it.' },
  ];
  directionPhrases.forEach((p, i) => {
    items.push({ level: 2, module: 4, groupName: 'Directions & Places', type: ContentType.PHRASE, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: false, sortOrder: 23 + i });
  });

  // ── LEVEL 3 — PRE-INTERMEDIATE (Days 76–120) ────────────────────────────

  // Module 1 — All 12 Tenses
  const tenses12 = [
    { english: 'Present Simple', urduRoman: 'Roz hone wali baatein — S + V(s/es)', exampleSentence: 'I eat breakfast every morning.', isPowerPack: true },
    { english: 'Present Continuous', urduRoman: 'Abhi ho raha hai — S + am/is/are + V-ing', exampleSentence: 'She is cooking dinner right now.', isPowerPack: true },
    { english: 'Present Perfect', urduRoman: 'Abhi tak ka asar — S + have/has + V3', exampleSentence: 'I have finished my homework.', isPowerPack: true },
    { english: 'Present Perfect Continuous', urduRoman: 'Kuch waqt se ho raha hai — S + have/has been + V-ing', exampleSentence: 'She has been studying for two hours.', isPowerPack: false },
    { english: 'Past Simple', urduRoman: 'Jo ho gaya — S + V2', exampleSentence: 'He went to the market yesterday.', isPowerPack: true },
    { english: 'Past Continuous', urduRoman: 'Jab kuch aur hua — S + was/were + V-ing', exampleSentence: 'I was sleeping when the phone rang.', isPowerPack: true },
    { english: 'Past Perfect', urduRoman: 'Pehle ho chuka tha — S + had + V3', exampleSentence: 'She had left before he arrived.', isPowerPack: false },
    { english: 'Past Perfect Continuous', urduRoman: 'Pehle se chal raha tha — S + had been + V-ing', exampleSentence: 'He had been waiting for an hour.', isPowerPack: false },
    { english: 'Future Simple (will)', urduRoman: 'Aane wala — S + will + V', exampleSentence: 'I will study hard tomorrow.', isPowerPack: true },
    { english: 'Future Continuous', urduRoman: 'Us waqt ho raha hoga — S + will be + V-ing', exampleSentence: 'This time tomorrow I will be flying.', isPowerPack: false },
    { english: 'Future Perfect', urduRoman: 'Tab tak khatam ho jayega — S + will have + V3', exampleSentence: 'By June I will have finished this course.', isPowerPack: false },
    { english: 'Future Perfect Continuous', urduRoman: 'Tab tak chal raha hoga — S + will have been + V-ing', exampleSentence: 'By next year I will have been learning for 12 months.', isPowerPack: false },
  ];
  tenses12.forEach((g, i) => {
    items.push({ level: 3, module: 1, groupName: 'All 12 Tenses', type: ContentType.GRAMMAR, english: g.english, urduRoman: g.urduRoman, exampleSentence: g.exampleSentence, isPowerPack: g.isPowerPack, sortOrder: i + 1 });
  });

  // Present Perfect trigger words
  const ppTriggers = [
    { english: 'ever / never', urduRoman: 'kabhi / kabhi nahi', exampleSentence: 'Have you ever been to Karachi?' },
    { english: 'already', urduRoman: 'pehle se', exampleSentence: 'I have already eaten lunch.' },
    { english: 'just', urduRoman: 'abhi abhi', exampleSentence: 'She has just arrived.' },
    { english: 'yet', urduRoman: 'abhi tak', exampleSentence: 'He has not come yet.' },
    { english: 'for + duration', urduRoman: 'se (for 3 years = 3 saalon se)', exampleSentence: 'I have lived here for five years.' },
    { english: 'since + time', urduRoman: 'se (since Monday = Peer se)', exampleSentence: 'She has been sick since Monday.' },
  ];
  ppTriggers.forEach((w, i) => {
    items.push({ level: 3, module: 1, groupName: 'Present Perfect Triggers', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: true, sortOrder: 13 + i });
  });

  // Relative Clauses — from roadmap Day 62 (who, which, that, where)
  const relativeClauses = [
    { english: 'who (for people)', urduRoman: 'Jo — insanon ke liye', exampleSentence: 'The man who called you is my uncle.', isPowerPack: true },
    { english: 'which (for things)', urduRoman: 'Jo — cheezon ke liye', exampleSentence: 'The book which I bought is very good.', isPowerPack: true },
    { english: 'that (for people or things)', urduRoman: 'Jo — insanon ya cheezon ke liye', exampleSentence: 'The phone that I lost was expensive.', isPowerPack: true },
    { english: 'where (for places)', urduRoman: 'Jahan — jaghon ke liye', exampleSentence: 'This is the school where I studied.', isPowerPack: true },
    { english: 'whose (for possession)', urduRoman: 'Jiska — maliki ke liye', exampleSentence: 'The student whose bag was lost came to the office.', isPowerPack: false },
    { english: 'Relative clause joins two sentences about same thing.', urduRoman: 'Relative clause do sentences ko jod deta hai jo ek hi cheez ke baare mein hain.', exampleSentence: 'I know the teacher. She teaches English. → I know the teacher who teaches English.', isPowerPack: false },
  ];
  relativeClauses.forEach((r, i) => {
    items.push({ level: 3, module: 1, groupName: 'Relative Clauses', type: ContentType.GRAMMAR, english: r.english, urduRoman: r.urduRoman, exampleSentence: r.exampleSentence, isPowerPack: r.isPowerPack, sortOrder: 19 + i });
  });

  // Gerunds & Infinitives — from roadmap Day 63
  const gerundsInfinitives = [
    { english: 'Gerund: Verb + ing used as noun (Swimming is fun.)', urduRoman: 'Gerund: Verb+ing ko noun ki jagah use karein', exampleSentence: 'Swimming is good exercise. I enjoy reading books.', isPowerPack: true },
    { english: 'Infinitive: to + base verb (I want to eat.)', urduRoman: 'Infinitive: to + verb (mujhe khaana hai)', exampleSentence: 'I want to learn English. She hopes to become a doctor.', isPowerPack: true },
    { english: 'Verbs followed by Gerund: enjoy, avoid, finish, keep, mind', urduRoman: 'Yeh verbs ke baad gerund (V+ing) aata hai', exampleSentence: 'I enjoy reading. She avoids eating junk food. He finished working.', isPowerPack: true },
    { english: 'Verbs followed by Infinitive: want, hope, plan, decide, need', urduRoman: 'Yeh verbs ke baad infinitive (to+verb) aata hai', exampleSentence: 'I want to go. She plans to study. He decided to leave.', isPowerPack: true },
    { english: 'Verbs followed by both: like, love, hate, start, begin', urduRoman: 'Yeh verbs ke baad dono aa sakte hain — matlab same rehta hai', exampleSentence: 'I like reading. / I like to read. (dono sahi hain)', isPowerPack: false },
  ];
  gerundsInfinitives.forEach((g, i) => {
    items.push({ level: 3, module: 1, groupName: 'Gerunds & Infinitives', type: ContentType.GRAMMAR, english: g.english, urduRoman: g.urduRoman, exampleSentence: g.exampleSentence, isPowerPack: g.isPowerPack, sortOrder: 25 + i });
  });

  // Module 2 — 500 Core Words (5 categories × 20 words)
  const emotionWords = [
    { english: 'Happy', urduRoman: 'Khush', exampleSentence: 'I feel happy today.' },
    { english: 'Sad', urduRoman: 'Udaas', exampleSentence: 'She looks sad.' },
    { english: 'Angry', urduRoman: 'Gussa', exampleSentence: 'He is angry at me.' },
    { english: 'Scared', urduRoman: 'Dara hua', exampleSentence: 'The child was scared of dogs.' },
    { english: 'Excited', urduRoman: 'Utsaahit', exampleSentence: 'I am excited about the trip.' },
    { english: 'Surprised', urduRoman: 'Hairan', exampleSentence: 'I was surprised by the news.' },
    { english: 'Disappointed', urduRoman: 'Nirash', exampleSentence: 'She was disappointed with the result.' },
    { english: 'Proud', urduRoman: 'Fakhr mehsoos karna', exampleSentence: 'He is proud of his work.' },
    { english: 'Grateful', urduRoman: 'Shukar-guzaar', exampleSentence: 'I am grateful for your help.' },
    { english: 'Jealous', urduRoman: 'Hasad', exampleSentence: 'Do not be jealous of others.' },
    { english: 'Bored', urduRoman: 'Ooktaya hua', exampleSentence: 'I am bored with this routine.' },
    { english: 'Confused', urduRoman: 'Hairaan pareshan', exampleSentence: 'I am confused about this question.' },
    { english: 'Nervous', urduRoman: 'Ghabra hua', exampleSentence: 'She is nervous before the exam.' },
    { english: 'Calm', urduRoman: 'Sakoon mein', exampleSentence: 'Take a deep breath and stay calm.' },
    { english: 'Confident', urduRoman: 'Khud par yakeen', exampleSentence: 'Speak English with confidence.' },
    { english: 'Lonely', urduRoman: 'Tanhai mahsoos karna', exampleSentence: 'He feels lonely without friends.' },
    { english: 'Ashamed', urduRoman: 'Sharminda', exampleSentence: 'I am ashamed of my mistake.' },
    { english: 'Hopeful', urduRoman: 'Umeed waala', exampleSentence: 'Stay hopeful — things will improve.' },
    { english: 'Frustrated', urduRoman: 'Pareshan', exampleSentence: 'I get frustrated when things go wrong.' },
    { english: 'Relieved', urduRoman: 'Sukoon mila', exampleSentence: 'I felt relieved after the exam.' },
  ];
  emotionWords.forEach((w, i) => {
    items.push({ level: 3, module: 2, groupName: 'Emotions (Jazbaat)', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: i < 8, sortOrder: i + 1 });
  });

  const healthWords = [
    { english: 'Healthy', urduRoman: 'Tandurust', exampleSentence: 'Eat well to stay healthy.' },
    { english: 'Sick / Ill', urduRoman: 'Beemar', exampleSentence: 'He is sick today.' },
    { english: 'Fever', urduRoman: 'Bukhaar', exampleSentence: 'She has a high fever.' },
    { english: 'Headache', urduRoman: 'Sar dard', exampleSentence: 'I have a bad headache.' },
    { english: 'Cough', urduRoman: 'Khansi', exampleSentence: 'He has a bad cough.' },
    { english: 'Tired', urduRoman: 'Thaka hua', exampleSentence: 'I am very tired after work.' },
    { english: 'Rest', urduRoman: 'Aaram', exampleSentence: 'Take rest and drink water.' },
    { english: 'Medicine', urduRoman: 'Dawai', exampleSentence: 'Take this medicine twice a day.' },
    { english: 'Hospital', urduRoman: 'Shafa-khana', exampleSentence: 'He was taken to hospital.' },
    { english: 'Pain', urduRoman: 'Dard', exampleSentence: 'I feel pain in my back.' },
    { english: 'Recover', urduRoman: 'Thik hona', exampleSentence: 'She is recovering well.' },
    { english: 'Exercise', urduRoman: 'Kasrat', exampleSentence: 'Exercise daily for good health.' },
    { english: 'Diet', urduRoman: 'Khaane ka nizam', exampleSentence: 'Follow a healthy diet.' },
    { english: 'Stress', urduRoman: 'Tension', exampleSentence: 'Reduce stress with meditation.' },
    { english: 'Weak', urduRoman: 'Kamzor', exampleSentence: 'He feels weak after the illness.' },
    { english: 'Strong', urduRoman: 'Mazboot', exampleSentence: 'Regular exercise makes you strong.' },
    { english: 'Stomachache', urduRoman: 'Pait dard', exampleSentence: 'My stomach is aching.' },
    { english: 'Cold (illness)', urduRoman: 'Zukaam', exampleSentence: 'I caught a cold.' },
    { english: 'Sleep', urduRoman: 'Neend', exampleSentence: 'Get 8 hours of sleep every night.' },
    { english: 'Doctor', urduRoman: 'Doctor saab', exampleSentence: 'See a doctor immediately.' },
  ];
  healthWords.forEach((w, i) => {
    items.push({ level: 3, module: 2, groupName: 'Health (Sehat)', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: i < 8, sortOrder: 21 + i });
  });

  const educationWords = [
    { english: 'Study', urduRoman: 'Parhna', exampleSentence: 'I study for 3 hours daily.' },
    { english: 'Learn', urduRoman: 'Seekhna', exampleSentence: 'Learning never stops.' },
    { english: 'Exam', urduRoman: 'Imtehaan', exampleSentence: 'My exam is next week.' },
    { english: 'Pass', urduRoman: 'Paas karna', exampleSentence: 'I hope to pass with good marks.' },
    { english: 'Fail', urduRoman: 'Fail hona', exampleSentence: 'Do not fear failure — it is a lesson.' },
    { english: 'Grade', urduRoman: 'Darjah', exampleSentence: 'He got an A grade.' },
    { english: 'University', urduRoman: 'Jamia', exampleSentence: 'She studies at a top university.' },
    { english: 'Degree', urduRoman: 'Sanad', exampleSentence: 'He has a degree in engineering.' },
    { english: 'Homework', urduRoman: 'Ghar ka kaam', exampleSentence: 'Did you do your homework?' },
    { english: 'Knowledge', urduRoman: 'Ilm', exampleSentence: 'Knowledge is power.' },
    { english: 'Practice', urduRoman: 'Mashq', exampleSentence: 'Practice makes perfect.' },
    { english: 'Understand', urduRoman: 'Samajhna', exampleSentence: 'Do you understand the concept?' },
    { english: 'Question', urduRoman: 'Sawaal', exampleSentence: 'Ask questions when you are confused.' },
    { english: 'Answer', urduRoman: 'Jawaab', exampleSentence: 'Think before you answer.' },
    { english: 'Lesson', urduRoman: 'Sabak', exampleSentence: "Today's lesson is about grammar." },
    { english: 'Book', urduRoman: 'Kitaab', exampleSentence: 'This book is very helpful.' },
    { english: 'Teach', urduRoman: 'Parhana', exampleSentence: 'She teaches maths beautifully.' },
    { english: 'Class', urduRoman: 'Jamat', exampleSentence: 'Class starts at 8 AM.' },
    { english: 'School', urduRoman: 'Madrasa', exampleSentence: 'Children go to school at 7.' },
    { english: 'Notebook', urduRoman: 'Copy', exampleSentence: 'Write notes in your notebook.' },
  ];
  educationWords.forEach((w, i) => {
    items.push({ level: 3, module: 2, groupName: 'Education (Taleem)', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: i < 8, sortOrder: 41 + i });
  });

  const techWords = [
    { english: 'Phone', urduRoman: 'Phone', exampleSentence: 'My phone battery is low.' },
    { english: 'Internet', urduRoman: 'Internet', exampleSentence: 'Use the internet wisely.' },
    { english: 'Email', urduRoman: 'Email', exampleSentence: 'Send me an email.' },
    { english: 'App', urduRoman: 'App', exampleSentence: 'This app is very useful.' },
    { english: 'Download', urduRoman: 'Download karna', exampleSentence: 'Download the file.' },
    { english: 'Password', urduRoman: 'Password', exampleSentence: 'Keep your password safe.' },
    { english: 'Website', urduRoman: 'Website', exampleSentence: 'Visit our website for information.' },
    { english: 'Message', urduRoman: 'Paigham', exampleSentence: 'Send me a message.' },
    { english: 'Social media', urduRoman: 'Social media', exampleSentence: 'Limit social media time.' },
    { english: 'Camera', urduRoman: 'Camera', exampleSentence: 'Take a photo with the camera.' },
    { english: 'Battery', urduRoman: 'Battery', exampleSentence: 'My battery is dead.' },
    { english: 'Screen', urduRoman: 'Screen', exampleSentence: 'The screen is cracked.' },
    { english: 'Wi-Fi', urduRoman: 'Wi-Fi', exampleSentence: 'Connect to Wi-Fi.' },
    { english: 'Data', urduRoman: 'Data', exampleSentence: 'My data is finished.' },
    { english: 'Search', urduRoman: 'Dhundhna', exampleSentence: 'Search it on Google.' },
    { english: 'Computer', urduRoman: 'Computer', exampleSentence: 'I work on my computer.' },
    { english: 'Upload', urduRoman: 'Upload karna', exampleSentence: 'Upload your photo.' },
    { english: 'Video', urduRoman: 'Video', exampleSentence: 'Watch this video.' },
    { english: 'Keyboard', urduRoman: 'Keyboard', exampleSentence: 'Type on the keyboard.' },
    { english: 'Charge', urduRoman: 'Charge karna', exampleSentence: 'Charge your phone.' },
  ];
  techWords.forEach((w, i) => {
    items.push({ level: 3, module: 2, groupName: 'Technology', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: i < 8, sortOrder: 61 + i });
  });

  const natureWords = [
    { english: 'Sun', urduRoman: 'Suraj', exampleSentence: 'The sun is bright today.' },
    { english: 'Moon', urduRoman: 'Chaand', exampleSentence: 'The full moon is beautiful.' },
    { english: 'Rain', urduRoman: 'Baarish', exampleSentence: 'It rained heavily yesterday.' },
    { english: 'Wind', urduRoman: 'Hawa', exampleSentence: 'There is strong wind today.' },
    { english: 'Mountain', urduRoman: 'Pahaar', exampleSentence: 'We climbed the mountain.' },
    { english: 'River', urduRoman: 'Darya', exampleSentence: 'The river flows fast.' },
    { english: 'Tree', urduRoman: 'Darakht', exampleSentence: 'Plant more trees.' },
    { english: 'Flower', urduRoman: 'Phool', exampleSentence: 'Beautiful flowers in the garden.' },
    { english: 'Season', urduRoman: 'Mausam', exampleSentence: 'My favourite season is spring.' },
    { english: 'Cloud', urduRoman: 'Badal', exampleSentence: 'Dark clouds mean rain.' },
    { english: 'Storm', urduRoman: 'Toofaan', exampleSentence: 'A big storm is coming.' },
    { english: 'Hot', urduRoman: 'Garam', exampleSentence: 'It is very hot in summer.' },
    { english: 'Cold', urduRoman: 'Thanda', exampleSentence: 'Winter is very cold.' },
    { english: 'Warm', urduRoman: 'Meetha garam', exampleSentence: 'Spring is warm and pleasant.' },
    { english: 'Sky', urduRoman: 'Aasman', exampleSentence: 'The sky is clear and blue.' },
    { english: 'Star', urduRoman: 'Sitaara', exampleSentence: 'I love watching stars at night.' },
    { english: 'Bird', urduRoman: 'Parinda', exampleSentence: 'Birds sing in the morning.' },
    { english: 'Animal', urduRoman: 'Jaanwar', exampleSentence: 'Wild animals live in forests.' },
    { english: 'Foggy', urduRoman: 'Kohra wala', exampleSentence: 'Foggy mornings in winter.' },
    { english: 'Snow', urduRoman: 'Barf', exampleSentence: 'It snowed in the mountains.' },
  ];
  natureWords.forEach((w, i) => {
    items.push({ level: 3, module: 2, groupName: 'Nature & Weather', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: i < 8, sortOrder: 81 + i });
  });

  // Module 3 — Short Stories
  const story3 = [
    { english: 'Farmer', urduRoman: 'Kisaan', exampleSentence: 'The hardworking farmer woke up at 4 AM.' },
    { english: 'Hardworking', urduRoman: 'Mehnatee', exampleSentence: 'He was known for being hardworking.' },
    { english: 'Fields', urduRoman: 'Khet', exampleSentence: 'He worked hard on his fields.' },
    { english: 'Wisdom', urduRoman: 'Hikmat / Samajhdaari', exampleSentence: 'The son learned from his father\'s wisdom.' },
    { english: 'Passion', urduRoman: 'Josh / Lagan', exampleSentence: 'He worked with great passion.' },
    { english: 'Pride', urduRoman: 'Fakhr', exampleSentence: 'This land gives us food and pride.' },
    { english: 'Wheat', urduRoman: 'Gandum', exampleSentence: 'He grew wheat and rice in his fields.' },
    { english: 'Harvest', urduRoman: 'Fasal', exampleSentence: 'The harvest was very good this year.' },
  ];
  story3.forEach((w, i) => {
    items.push({ level: 3, module: 3, groupName: 'Story — The Hardworking Farmer', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: i < 4, sortOrder: i + 1 });
  });

  const storyPatterns3 = [
    { english: 'There was a ___ named ___.', urduRoman: 'Ek ___ tha jiska naam ___ tha.', exampleSentence: 'There was a farmer named Hassan.' },
    { english: 'He woke up every morning at ___.', urduRoman: 'Woh roz subah ___ baje uthta tha.', exampleSentence: 'He woke up every morning at 4 AM.' },
    { english: 'If we take care of it, it will take care of us.', urduRoman: 'Agar hum iska khayaal rakhein to yeh hamara khayaal rakhega.', exampleSentence: 'If we take care of the land, it will take care of us.' },
    { english: 'From that day, he started ___.', urduRoman: 'Us din se usne ___ shuru kar diya.', exampleSentence: 'From that day, he started working with passion.' },
  ];
  storyPatterns3.forEach((s, i) => {
    items.push({ level: 3, module: 3, groupName: 'Story Patterns', type: ContentType.SENTENCE, english: s.english, urduRoman: s.urduRoman, exampleSentence: s.exampleSentence, isPowerPack: true, sortOrder: 9 + i });
  });

  // Module 4 — Reading Practice
  const readingPatterns3 = [
    { english: 'What is the main idea of the text?', urduRoman: 'Text ka asli matlab kya hai?', exampleSentence: 'What is the main idea of this paragraph?' },
    { english: 'According to the text, ___.', urduRoman: 'Text ke mutabiq, ___.', exampleSentence: 'According to the text, Hassan woke up at 4 AM.' },
    { english: 'In your own words, explain ___.', urduRoman: 'Apne alfaaz mein ___ samjhao.', exampleSentence: 'In your own words, explain the farmer\'s lesson.' },
    { english: 'The author suggests that ___.', urduRoman: 'Likhne wala kehna chahta hai ke ___.', exampleSentence: 'The author suggests that hard work brings success.' },
    { english: 'What can you conclude from this story?', urduRoman: 'Is kahani se tum kya nateeja nikaal sakte ho?', exampleSentence: 'What can you conclude from this story?' },
  ];
  readingPatterns3.forEach((p, i) => {
    items.push({ level: 3, module: 4, groupName: 'Reading Comprehension', type: ContentType.SENTENCE, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: true, sortOrder: i + 1 });
  });

  // Reported Speech — from roadmap Day 59 / complete course Module 19
  const reportedSpeech = [
    { english: 'Direct: He said, "I am happy." → Reported: He said (that) he was happy.', urduRoman: 'Direct speech mein jo kaha, Reported mein "was/were/had" ban jaata hai', exampleSentence: 'He said he was happy. She said she was tired.', isPowerPack: true },
    { english: 'Direct: She said, "I will come." → Reported: She said she would come.', urduRoman: '"will" → "would" ban jaata hai reported mein', exampleSentence: 'She said she would come the next day.', isPowerPack: true },
    { english: 'Direct: He asked, "Do you like tea?" → Reported: He asked if I liked tea.', urduRoman: 'Question mein "if/whether" lagao aur word order badlo', exampleSentence: 'She asked if I could help her.', isPowerPack: true },
    { english: 'said / told / asked / replied / explained', urduRoman: 'Reporting verbs — Keh diya / Bataya / Poocha / Jawab diya / Samjhaya', exampleSentence: 'He told me he was leaving. She explained that she was busy.', isPowerPack: true },
    { english: 'Time changes: today → that day, tomorrow → the next day, now → then', urduRoman: 'Reported speech mein waqt ke words bhi badal jaate hain', exampleSentence: 'He said he would come the next day. (NOT: tomorrow)', isPowerPack: false },
    { english: 'Place changes: here → there, this → that, these → those', urduRoman: 'Jagah ke words bhi badal jaate hain reported mein', exampleSentence: 'She said that was her book. (NOT: this is my book)', isPowerPack: false },
  ];
  reportedSpeech.forEach((r, i) => {
    items.push({ level: 3, module: 4, groupName: 'Reported Speech', type: ContentType.GRAMMAR, english: r.english, urduRoman: r.urduRoman, exampleSentence: r.exampleSentence, isPowerPack: r.isPowerPack, sortOrder: 6 + i });
  });

  // ── LEVEL 4 — INTERMEDIATE (Days 121–180) ──────────────────────────────

  // Module 1 — Writing Skills
  const writingWords4 = [
    { english: 'Topic sentence', urduRoman: 'Paragraph ki pehli aur main baat', exampleSentence: 'Start with a strong topic sentence.', isPowerPack: true },
    { english: 'Supporting idea', urduRoman: 'Topic ki pukhtagi ke liye saboot ya misaal', exampleSentence: 'Add two or three supporting ideas.', isPowerPack: true },
    { english: 'Conclusion', urduRoman: 'Summary ya end mein last baat', exampleSentence: 'End with a strong conclusion.', isPowerPack: true },
    { english: 'Furthermore', urduRoman: 'Mazeed yeh ke', exampleSentence: 'Furthermore, the results were positive.', isPowerPack: true },
    { english: 'However', urduRoman: 'Lekin / Baawajood', exampleSentence: 'However, the situation improved later.', isPowerPack: true },
    { english: 'Therefore', urduRoman: 'Isliye / Iss liye', exampleSentence: 'Therefore, we must work harder.', isPowerPack: true },
    { english: 'For example', urduRoman: 'Misaal ke taur par', exampleSentence: 'For example, I wake up at 6 AM daily.', isPowerPack: true },
    { english: 'In conclusion', urduRoman: 'Aakhir mein / Khulaasa yeh hai', exampleSentence: 'In conclusion, education is the key to success.', isPowerPack: true },
    { english: 'In addition', urduRoman: 'Uske ilaawa', exampleSentence: 'In addition, she speaks three languages.', isPowerPack: false },
    { english: 'Although', urduRoman: 'Haalaanki / Baawajood is ke', exampleSentence: 'Although it was raining, we went out.', isPowerPack: false },
    { english: 'As a result', urduRoman: 'Nateeje ke taur par', exampleSentence: 'As a result, the project was a success.', isPowerPack: false },
    { english: 'On the other hand', urduRoman: 'Doosri taraf', exampleSentence: 'On the other hand, some people disagree.', isPowerPack: false },
  ];
  writingWords4.forEach((w, i) => {
    items.push({ level: 4, module: 1, groupName: 'Writing — Linking Words', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: w.isPowerPack, sortOrder: i + 1 });
  });

  const writingTopics4 = [
    { english: 'My Daily Routine', urduRoman: 'Roz ka routine apne alfaaz mein likho', exampleSentence: 'My day starts at 6 AM. First, I wash my face and brush my teeth.' },
    { english: 'My City', urduRoman: 'Apne shehar ke baare mein likho', exampleSentence: 'I live in Lahore, a beautiful and historic city in Pakistan.' },
    { english: 'My Favourite Food', urduRoman: 'Apni pasandida ghiza ke baare mein likho', exampleSentence: 'My favourite food is biryani because it has a rich and spicy flavour.' },
    { english: 'My Dream Job', urduRoman: 'Apni sapne ki job ke baare mein likho', exampleSentence: 'My dream is to become a software engineer and build useful apps.' },
    { english: 'An Unforgettable Day', urduRoman: 'Zindagi ka ek yaadgaar din', exampleSentence: 'The day I graduated was the most unforgettable day of my life.' },
  ];
  writingTopics4.forEach((t, i) => {
    items.push({ level: 4, module: 1, groupName: 'Writing Practice Topics', type: ContentType.PHRASE, english: t.english, urduRoman: t.urduRoman, exampleSentence: t.exampleSentence, isPowerPack: true, sortOrder: 13 + i });
  });

  // Essay Types — from roadmap Days 101-110 (narrative, descriptive, expository, persuasive, etc.)
  const essayTypes4 = [
    { english: 'Narrative Essay — Personal story (kahani)', urduRoman: 'Apna waqia sunao — Beginning, Middle, End structure', exampleSentence: 'The best day of my life was when I passed my final exams.', isPowerPack: true },
    { english: 'Descriptive Essay — Describe vividly (tafaseel)', urduRoman: 'Cheez ya jagah ko itna describe karo ke reader dekh sake', exampleSentence: 'The busy Lahore market was full of colour, sound, and the smell of food.', isPowerPack: true },
    { english: 'Expository Essay — Give information (malumat)', urduRoman: 'Factual information do — Topic, Explanation, Examples, Conclusion', exampleSentence: 'Education is the process of acquiring knowledge, skills, and values through learning.', isPowerPack: true },
    { english: 'Persuasive Essay — Convince the reader', urduRoman: 'Apni raay dena aur reader ko manaana — Argument + Evidence', exampleSentence: 'Exercise should be made compulsory in schools because it improves both physical and mental health.', isPowerPack: true },
    { english: 'Opinion Essay: I believe / In my opinion / I think / It seems to me', urduRoman: 'Apni raay batao — In my opinion, I believe, It seems to me', exampleSentence: 'In my opinion, social media does more harm than good.', isPowerPack: true },
    { english: 'Cause & Effect: Because of / As a result / Therefore / Consequently', urduRoman: 'Wajah aur nateeja — "because of", "as a result", "therefore"', exampleSentence: 'As a result of poor study habits, many students fail their exams.', isPowerPack: false },
    { english: 'Compare & Contrast: Similarly / On the other hand / In contrast / Unlike', urduRoman: 'Do cheezein compare karo — Similarly, On the other hand, In contrast', exampleSentence: 'City life offers more opportunities. On the other hand, village life is peaceful.', isPowerPack: false },
    { english: 'Essay structure: Introduction → Body (2-3 paragraphs) → Conclusion', urduRoman: 'Muqaddimah → Mazmoon (2-3 paragraphs) → Khulaasa', exampleSentence: 'Introduction: hook + background + thesis. Body: main points. Conclusion: summary + final thought.', isPowerPack: true },
  ];
  essayTypes4.forEach((e, i) => {
    items.push({ level: 4, module: 1, groupName: 'Essay Types & Structures', type: ContentType.PHRASE, english: e.english, urduRoman: e.urduRoman, exampleSentence: e.exampleSentence, isPowerPack: e.isPowerPack, sortOrder: 18 + i });
  });

  // Module 2 — Letter Writing
  const letterPhrases4 = [
    { english: 'Dear ___,', urduRoman: 'Aziz ___ / Muhtaram ___', exampleSentence: 'Dear Ahmed, I hope you are doing well.', isPowerPack: true },
    { english: 'I am writing to inform you that ___', urduRoman: 'Mein aapko yeh batana chahta hoon ke ___', exampleSentence: 'I am writing to inform you that the event has been postponed.', isPowerPack: true },
    { english: 'I hope this letter finds you in good health.', urduRoman: 'Umeed hai aap theek honge.', exampleSentence: 'I hope this letter finds you in good health.', isPowerPack: true },
    { english: 'Respected Sir/Madam,', urduRoman: 'Muhtaram Janab / Muhtrma', exampleSentence: 'Respected Sir, I am applying for the position of teacher.', isPowerPack: true },
    { english: 'I humbly request you to ___', urduRoman: 'Mein aap se guzarish karta hoon ke ___', exampleSentence: 'I humbly request you to grant me a fee concession.', isPowerPack: true },
    { english: 'I shall be very grateful for your kind consideration.', urduRoman: 'Aapki meherbani ke liye main bahut shukar-guzaar honga.', exampleSentence: 'I shall be very grateful for your kind consideration.', isPowerPack: true },
    { english: 'Yours sincerely, / Best regards,', urduRoman: 'Aapka / Aapki (khatam karne ka tarika)', exampleSentence: 'Yours sincerely, Ali Hassan.', isPowerPack: false },
    { english: 'Please give my regards to ___.', urduRoman: '___ ko mera salam kehna.', exampleSentence: 'Please give my regards to uncle and aunty.', isPowerPack: false },
    { english: 'I am looking forward to hearing from you.', urduRoman: 'Aapke jawab ka intezaar rahe ga.', exampleSentence: 'I am looking forward to hearing from you soon.', isPowerPack: false },
    { english: 'Subject: ___', urduRoman: 'Mauzoo / Mozu', exampleSentence: 'Subject: Application for Fee Concession.', isPowerPack: true },
  ];
  letterPhrases4.forEach((p, i) => {
    items.push({ level: 4, module: 2, groupName: 'Letter Writing Phrases', type: ContentType.PHRASE, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: p.isPowerPack, sortOrder: i + 1 });
  });

  // Informal Letter Patterns — from complete course Module 15 / roadmap Day 114
  const informalLetter4 = [
    { english: 'Dear [Name], / Hi [Name],', urduRoman: 'Dost ya rishtedaar ko informal khat — "Dear Ahmed," ya "Hi Sara,"', exampleSentence: 'Dear Ahmed, Assalam-o-Alaikum! I hope you are doing well.', isPowerPack: true },
    { english: 'I am writing to share some exciting news with you.', urduRoman: 'Kuch khaas baat share karne ke liye likh raha hoon.', exampleSentence: 'I am writing to share some exciting news about my new job.', isPowerPack: true },
    { english: 'Please give my salaam / regards to your family.', urduRoman: 'Apne gharwalon ko mera salam kehna.', exampleSentence: 'Please give my salaam to Uncle, Aunty, and your siblings.', isPowerPack: false },
    { english: 'I am looking forward to meeting you soon.', urduRoman: 'Umeed hai jald milenge.', exampleSentence: 'I am looking forward to seeing you at Eid.', isPowerPack: false },
    { english: 'Your friend, / With love, / Take care,', urduRoman: 'Informal khat ka aakhri hissa — dost waala tone', exampleSentence: 'Your friend, Ali. / With love, Sara. / Take care, Ahmed.', isPowerPack: true },
  ];
  informalLetter4.forEach((p, i) => {
    items.push({ level: 4, module: 2, groupName: 'Informal Letter Patterns', type: ContentType.PHRASE, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: p.isPowerPack, sortOrder: 11 + i });
  });

  // Email Writing — from roadmap Days 115-116
  const emailWriting4 = [
    { english: 'Subject: [Clear, short summary of the email]', urduRoman: 'Subject line — email ka maqsad ek line mein', exampleSentence: 'Subject: Application for Leave on Friday', isPowerPack: true },
    { english: 'Dear Mr. / Ms. [Last Name], (formal email)', urduRoman: 'Formal email ki shuruwaat', exampleSentence: 'Dear Ms. Khan, I hope this email finds you well.', isPowerPack: true },
    { english: 'Hi [Name], / Hello [Name], (informal email)', urduRoman: 'Informal email ki shuruwaat', exampleSentence: 'Hi Sara, How are you doing?', isPowerPack: false },
    { english: 'I am writing regarding ___ / I am writing to ___', urduRoman: 'Email ka maqsad batana', exampleSentence: 'I am writing regarding the meeting scheduled for Monday.', isPowerPack: true },
    { english: 'Please find attached ___ / I have attached ___', urduRoman: 'Attachment ka zikr', exampleSentence: 'Please find attached my CV for your review.', isPowerPack: false },
    { english: 'Best regards, / Yours sincerely, / Thanks,', urduRoman: 'Email khatam karne ke tarike', exampleSentence: 'Best regards, Ali Hassan.', isPowerPack: true },
  ];
  emailWriting4.forEach((e, i) => {
    items.push({ level: 4, module: 2, groupName: 'Email Writing', type: ContentType.PHRASE, english: e.english, urduRoman: e.urduRoman, exampleSentence: e.exampleSentence, isPowerPack: e.isPowerPack, sortOrder: 16 + i });
  });

  // Module 3 — Complex Sentences
  const complexSentences4 = [
    { english: 'Although / Even though', urduRoman: 'Haalaanki', exampleSentence: 'Although it was raining, she went to school.', isPowerPack: true },
    { english: 'Unless', urduRoman: 'Jab tak nahi / Agar nahi', exampleSentence: 'You will not succeed unless you work hard.', isPowerPack: true },
    { english: 'As soon as', urduRoman: 'Jaise hi', exampleSentence: 'Call me as soon as you arrive.', isPowerPack: true },
    { english: 'Not only... but also', urduRoman: 'Sirf nahi... balke bhi', exampleSentence: 'She is not only beautiful but also intelligent.', isPowerPack: true },
    { english: 'The more... the more', urduRoman: 'Jitna zyada... utna zyada', exampleSentence: 'The more you practise, the better you become.', isPowerPack: true },
    { english: 'So... that', urduRoman: 'Itna... ke', exampleSentence: 'He was so tired that he fell asleep immediately.', isPowerPack: false },
    { english: 'Such... that', urduRoman: 'Aisa... ke', exampleSentence: 'It was such a hot day that we stayed indoors.', isPowerPack: false },
    { english: 'Whether... or not', urduRoman: 'Chahe... ya nahi', exampleSentence: 'Tell me whether you can come or not.', isPowerPack: false },
  ];
  complexSentences4.forEach((s, i) => {
    items.push({ level: 4, module: 3, groupName: 'Complex Sentence Structures', type: ContentType.GRAMMAR, english: s.english, urduRoman: s.urduRoman, exampleSentence: s.exampleSentence, isPowerPack: s.isPowerPack, sortOrder: i + 1 });
  });

  // Synonyms — from roadmap Day 128 (hum ma'ana alfaaz)
  const synonyms4 = [
    { english: 'happy → joyful, glad, delighted, content', urduRoman: '"Happy" ke hum ma\'ana: Joyful (khushi bhara), Glad (khush), Delighted (bahut khush)', exampleSentence: 'She was delighted to hear the good news.', isPowerPack: true },
    { english: 'sad → unhappy, miserable, gloomy, sorrowful', urduRoman: '"Sad" ke hum ma\'ana: Miserable, Gloomy, Sorrowful', exampleSentence: 'He felt miserable after losing the match.', isPowerPack: true },
    { english: 'big → large, huge, enormous, massive, vast', urduRoman: '"Big" ke hum ma\'ana: Large, Huge, Enormous, Massive', exampleSentence: 'The crowd was enormous at the cricket match.', isPowerPack: true },
    { english: 'fast → quick, rapid, swift, speedy', urduRoman: '"Fast" ke hum ma\'ana: Quick, Rapid, Swift', exampleSentence: 'She is a quick learner.', isPowerPack: true },
    { english: 'good → excellent, wonderful, great, fine, superb', urduRoman: '"Good" ke hum ma\'ana: Excellent, Wonderful, Superb', exampleSentence: 'The presentation was excellent.', isPowerPack: true },
    { english: 'bad → terrible, awful, dreadful, poor', urduRoman: '"Bad" ke hum ma\'ana: Terrible, Awful, Dreadful', exampleSentence: 'The weather was dreadful yesterday.', isPowerPack: false },
    { english: 'smart → intelligent, clever, bright, sharp', urduRoman: '"Smart" ke hum ma\'ana: Intelligent, Clever, Bright', exampleSentence: 'She is a very clever student.', isPowerPack: false },
  ];
  synonyms4.forEach((s, i) => {
    items.push({ level: 4, module: 3, groupName: 'Synonyms (Hum Ma\'ana)', type: ContentType.VOCAB, english: s.english, urduRoman: s.urduRoman, exampleSentence: s.exampleSentence, isPowerPack: s.isPowerPack, sortOrder: 9 + i });
  });

  // Antonyms — from roadmap Day 129 (mutazaad alfaaz)
  const antonyms4 = [
    { english: 'hot ↔ cold', urduRoman: 'Garam ↔ Thanda', exampleSentence: 'The tea is hot but the water is cold.', isPowerPack: true },
    { english: 'happy ↔ sad', urduRoman: 'Khush ↔ Udaas', exampleSentence: 'I was happy yesterday but sad today.', isPowerPack: true },
    { english: 'rich ↔ poor', urduRoman: 'Ameer ↔ Ghareeb', exampleSentence: 'He was once poor but now he is rich.', isPowerPack: true },
    { english: 'early ↔ late', urduRoman: 'Jaldi ↔ Der se', exampleSentence: 'She came early but he was late.', isPowerPack: true },
    { english: 'strong ↔ weak', urduRoman: 'Mazboot ↔ Kamzor', exampleSentence: 'Exercise makes you strong; laziness makes you weak.', isPowerPack: false },
    { english: 'easy ↔ difficult / hard', urduRoman: 'Aasaan ↔ Mushkil', exampleSentence: 'The first test was easy but the second was difficult.', isPowerPack: false },
    { english: 'begin ↔ end / finish', urduRoman: 'Shuru karna ↔ Khatam karna', exampleSentence: 'We begin at 9 and finish at 5.', isPowerPack: false },
  ];
  antonyms4.forEach((a, i) => {
    items.push({ level: 4, module: 3, groupName: 'Antonyms (Mutazaad)', type: ContentType.VOCAB, english: a.english, urduRoman: a.urduRoman, exampleSentence: a.exampleSentence, isPowerPack: a.isPowerPack, sortOrder: 16 + i });
  });

  // Homonyms & Homophones — from roadmap Days 130-131
  const wordConfusions4 = [
    { english: 'bank: (1) naddi ka kinara / (2) paisa rakhne ki jagah', urduRoman: 'Homonym — ek word ke alag matlab', exampleSentence: 'We sat on the bank of the river. I went to the bank to withdraw money.', isPowerPack: true },
    { english: 'bat: (1) cricket bat / (2) chamgadar', urduRoman: 'Homonym — ek word, do cheezein', exampleSentence: 'He hit the ball with a bat. A bat flew out of the cave.', isPowerPack: true },
    { english: 'their / there / they\'re', urduRoman: 'Homophone — same sound, different spelling & meaning', exampleSentence: 'They\'re going to their school over there.', isPowerPack: true },
    { english: 'your / you\'re', urduRoman: 'your = tumhara | you\'re = tum hain (you are)', exampleSentence: 'You\'re my best friend. Is this your book?', isPowerPack: true },
    { english: 'to / too / two', urduRoman: 'to = ko/taraf | too = bhi/zyada | two = 2', exampleSentence: 'I want to go too. There are two books.', isPowerPack: false },
    { english: 'right / write / rite', urduRoman: 'right=sahi/seedha | write=likhna | rite=rasm', exampleSentence: 'Turn right. Write your name. It is right to be honest.', isPowerPack: false },
  ];
  wordConfusions4.forEach((w, i) => {
    items.push({ level: 4, module: 3, groupName: 'Homonyms & Homophones', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: w.isPowerPack, sortOrder: 23 + i });
  });

  // Prefixes & Suffixes — from roadmap Days 132-133
  const wordFormation4 = [
    { english: 'Prefix un-: unhappy, unfair, unknown, uncomfortable', urduRoman: '"un-" = nahi / ulta — unhappy = na-khush', exampleSentence: 'The result was unfair. She felt uncomfortable.', isPowerPack: true },
    { english: 'Prefix dis-: disagree, disappear, dishonest, dislike', urduRoman: '"dis-" = nahi / ulta — disagree = na-ittifaqi', exampleSentence: 'I disagree with your opinion. He disappeared suddenly.', isPowerPack: true },
    { english: 'Prefix re-: redo, restart, review, rewrite', urduRoman: '"re-" = dobara — restart = dobara shuru', exampleSentence: 'Please restart the computer. I need to review my notes.', isPowerPack: true },
    { english: 'Prefix over-: overwork, overconfident, overcooked', urduRoman: '"over-" = zyada — overwork = bahut zyada kaam', exampleSentence: 'Don\'t overwork yourself. The rice is overcooked.', isPowerPack: false },
    { english: 'Suffix -ful: hopeful, beautiful, helpful, powerful', urduRoman: '"-ful" = bhara hua — hopeful = umeed waala', exampleSentence: 'She is very hopeful about the results.', isPowerPack: true },
    { english: 'Suffix -less: helpless, useless, careless, hopeless', urduRoman: '"-less" = ke bina — helpless = be-bas', exampleSentence: 'He felt helpless in that situation.', isPowerPack: true },
    { english: 'Suffix -ness: happiness, sadness, kindness, darkness', urduRoman: '"-ness" lagao to adjective noun ban jaata hai', exampleSentence: 'Her kindness is known to everyone.', isPowerPack: false },
    { english: 'Suffix -ment: development, improvement, achievement, movement', urduRoman: '"-ment" lagao to verb noun ban jaata hai', exampleSentence: 'The improvement in his English is remarkable.', isPowerPack: false },
  ];
  wordFormation4.forEach((w, i) => {
    items.push({ level: 4, module: 3, groupName: 'Prefixes & Suffixes', type: ContentType.GRAMMAR, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: w.isPowerPack, sortOrder: 29 + i });
  });

  // Collocations — from roadmap Days 134-135
  const collocations4 = [
    { english: 'make a decision', urduRoman: 'Faisla karna (make + decision)', exampleSentence: 'It is time to make a decision.', isPowerPack: true },
    { english: 'do homework', urduRoman: 'Ghar ka kaam karna (do + homework)', exampleSentence: 'Always do your homework on time.', isPowerPack: true },
    { english: 'take a break', urduRoman: 'Chhoti chutti lena (take + break)', exampleSentence: 'Let us take a break before continuing.', isPowerPack: true },
    { english: 'have lunch / dinner / breakfast', urduRoman: 'Khaana khaana (have + meal)', exampleSentence: 'I had lunch with my colleague today.', isPowerPack: true },
    { english: 'catch a cold / bus / train', urduRoman: 'Zukaam hona / bus/train pakarna (catch + noun)', exampleSentence: 'I caught a cold after the rain. Did you catch the bus?', isPowerPack: true },
    { english: 'pay attention', urduRoman: 'Dhyan dena (pay + attention)', exampleSentence: 'Please pay attention to the teacher.', isPowerPack: false },
    { english: 'keep a secret / promise / diary', urduRoman: 'Raaz rakhna / wada nibhaana (keep + noun)', exampleSentence: 'Can you keep a secret? He keeps his promises.', isPowerPack: false },
    { english: 'break a rule / record / promise', urduRoman: 'Qanoon todhna / record todhna (break + noun)', exampleSentence: 'She broke the school record. Don\'t break the rules.', isPowerPack: false },
  ];
  collocations4.forEach((c, i) => {
    items.push({ level: 4, module: 3, groupName: 'Collocations (Milte Julate Alfaaz)', type: ContentType.PHRASE, english: c.english, urduRoman: c.urduRoman, exampleSentence: c.exampleSentence, isPowerPack: c.isPowerPack, sortOrder: 37 + i });
  });

  // Module 4 — Common Mistakes + Speaking Confidence
  const commonMistakes4 = [
    { english: 'WRONG: I am having a car. RIGHT: I have a car.', urduRoman: 'Possession mein Continuous nahi lagata', exampleSentence: 'I have a car. (NOT: I am having a car.)', isPowerPack: true },
    { english: 'WRONG: She did not went. RIGHT: She did not go.', urduRoman: '"did" ke baad hamesha base verb lagao', exampleSentence: 'She did not go to school. (NOT: did not went)', isPowerPack: true },
    { english: 'WRONG: He is more better. RIGHT: He is better.', urduRoman: '"more" aur comparative saath nahi aate', exampleSentence: 'He is better than me. (NOT: more better)', isPowerPack: true },
    { english: 'WRONG: I am agree. RIGHT: I agree.', urduRoman: '"agree" verb hai — "am" nahi lagta', exampleSentence: 'I agree with you. (NOT: I am agree)', isPowerPack: true },
    { english: 'WRONG: Since 3 years. RIGHT: For 3 years.', urduRoman: 'Duration ke liye "for" use karo', exampleSentence: 'I have lived here for 3 years. (NOT: since 3 years)', isPowerPack: true },
    { english: 'WRONG: Discuss about it. RIGHT: Discuss it.', urduRoman: '"discuss" already "about" include karta hai', exampleSentence: 'Let us discuss this matter. (NOT: discuss about)', isPowerPack: false },
    { english: 'WRONG: Today morning. RIGHT: This morning.', urduRoman: '"today morning" English mein galat hai', exampleSentence: 'I saw him this morning. (NOT: today morning)', isPowerPack: false },
    { english: 'WRONG: Return back. RIGHT: Return.', urduRoman: '"return" already "back" include karta hai', exampleSentence: 'She returned home at 8 PM. (NOT: returned back)', isPowerPack: false },
  ];
  commonMistakes4.forEach((m, i) => {
    items.push({ level: 4, module: 4, groupName: 'Common Mistakes to Avoid', type: ContentType.GRAMMAR, english: m.english, urduRoman: m.urduRoman, exampleSentence: m.exampleSentence, isPowerPack: m.isPowerPack, sortOrder: i + 1 });
  });

  const speakingTopics4 = [
    { english: 'Introduce Yourself (1 minute)', urduRoman: 'Hello everyone. My name is ___. I am ___ years old and I live in ___.', exampleSentence: 'Hello everyone. My name is Ali. I am 22 years old and I live in Lahore.', isPowerPack: true },
    { english: 'Describe Your Daily Routine', urduRoman: 'My day starts at ___. First I ___. Then I ___.', exampleSentence: 'My day starts at 6 AM. First I pray, then I exercise for 30 minutes.', isPowerPack: true },
    { english: 'Talk About Your Country', urduRoman: 'I come from Pakistan, a beautiful country in South Asia.', exampleSentence: 'I come from Pakistan. It has beautiful landscapes and warm hospitality.', isPowerPack: true },
    { english: 'Describe Your Best Friend', urduRoman: 'My best friend is ___. He/She is ___ and very ___.', exampleSentence: 'My best friend is Ahmed. He is kind, honest, and always there for me.', isPowerPack: false },
    { english: 'Talk About Your Dream', urduRoman: 'My dream is to ___. I want to ___ because ___.', exampleSentence: 'My dream is to become a doctor and help the people of my community.', isPowerPack: false },
  ];
  speakingTopics4.forEach((t, i) => {
    items.push({ level: 4, module: 4, groupName: 'Speaking Confidence Scripts', type: ContentType.PHRASE, english: t.english, urduRoman: t.urduRoman, exampleSentence: t.exampleSentence, isPowerPack: t.isPowerPack, sortOrder: 9 + i });
  });

  // ── LEVEL 5 — UPPER INTERMEDIATE (Days 181–240) ───────────────────────

  // Module 1 — Conditionals
  const conditionals5 = [
    { english: 'Type 1: If + Present Simple, will + Verb (real/possible)', urduRoman: 'Type 1 — Ho sakta hai', exampleSentence: 'If it rains, I will stay home.', isPowerPack: true },
    { english: 'If you study hard, you will pass.', urduRoman: 'Agar mehnat ki to pass ho jaoge.', exampleSentence: 'If you study hard, you will pass the exam.', isPowerPack: true },
    { english: 'If I have time, I will help you.', urduRoman: 'Agar waqt mila to madad karoonga.', exampleSentence: 'If I have time, I will help you with your homework.', isPowerPack: true },
    { english: 'Type 2: If + Past Simple, would + Verb (imaginary)', urduRoman: 'Type 2 — Kash hota (imagination)', exampleSentence: 'If I were rich, I would travel the world.', isPowerPack: true },
    { english: 'If I had a car, I would drive to Lahore.', urduRoman: 'Agar gaadi hoti to Lahore jaata.', exampleSentence: 'If I had a car, I would drive to Lahore every weekend.', isPowerPack: true },
    { english: 'Type 3: If + had + V3, would have + V3 (impossible past)', urduRoman: 'Type 3 — Jo hua hi nahi (past ki arzoo)', exampleSentence: 'If I had studied, I would have passed.', isPowerPack: true },
    { english: 'If she had slept early, she would not have been tired.', urduRoman: 'Agar jaldi soyi hoti to thaki nahi hoti.', exampleSentence: 'If she had slept early, she would not have been tired in the morning.', isPowerPack: false },
    { english: 'Unless you try, you will never know.', urduRoman: 'Jab tak try nahi karoge, kabhie pata nahi chalega.', exampleSentence: 'Unless you try, you will never know what you can achieve.', isPowerPack: false },
  ];
  conditionals5.forEach((g, i) => {
    items.push({ level: 5, module: 1, groupName: 'Conditionals (Agar...To)', type: ContentType.GRAMMAR, english: g.english, urduRoman: g.urduRoman, exampleSentence: g.exampleSentence, isPowerPack: g.isPowerPack, sortOrder: i + 1 });
  });

  // Module 2 — Passive Voice
  const passiveVoice5 = [
    { english: 'Active vs Passive: kaam karne wala vs kaam hi important', urduRoman: 'Active mein karne wala saamne, Passive mein chhupa', exampleSentence: 'Active: Ali wrote the letter. Passive: The letter was written by Ali.', isPowerPack: true },
    { english: 'Formula: Object + is/am/are + V3 (+ by + Subject)', urduRoman: 'Present Passive ka formula', exampleSentence: 'English is spoken all over the world.', isPowerPack: true },
    { english: 'The letter was written by Ali.', urduRoman: 'Yeh khat Ali ne likha tha.', exampleSentence: 'The letter was written by Ali last night.', isPowerPack: true },
    { english: 'The project will be completed by Friday.', urduRoman: 'Project Juma tak mukammal ho jayega.', exampleSentence: 'The project will be completed by the team by Friday.', isPowerPack: true },
    { english: 'The food was eaten (by the children).', urduRoman: 'Khaana (bachchon ne) khaya.', exampleSentence: 'The food was eaten before we arrived.', isPowerPack: false },
    { english: 'A new hospital is being built in the city.', urduRoman: 'Shehar mein ek naya hospital bana raha hai.', exampleSentence: 'A new hospital is being built in the city centre.', isPowerPack: false },
    { english: 'He was told to wait outside.', urduRoman: 'Use kaha gaya bahar intezaar karo.', exampleSentence: 'He was told to wait outside by the manager.', isPowerPack: false },
  ];
  passiveVoice5.forEach((g, i) => {
    items.push({ level: 5, module: 2, groupName: 'Passive Voice', type: ContentType.GRAMMAR, english: g.english, urduRoman: g.urduRoman, exampleSentence: g.exampleSentence, isPowerPack: g.isPowerPack, sortOrder: i + 1 });
  });

  // Module 3 — Idioms
  const idioms5 = [
    { english: 'Break a leg', urduRoman: 'Good luck! (Tang nahi, good luck kehna chahte hain)', exampleSentence: 'Break a leg in your interview today!', isPowerPack: true },
    { english: 'Hit the nail on the head', urduRoman: 'Bilkul sahi baat kahi', exampleSentence: 'You hit the nail on the head with that observation.', isPowerPack: true },
    { english: 'Piece of cake', urduRoman: 'Bohot aasaan', exampleSentence: 'The test was a piece of cake for her.', isPowerPack: true },
    { english: 'Under the weather', urduRoman: 'Beemar hona (halka)', exampleSentence: 'I am feeling a bit under the weather today.', isPowerPack: true },
    { english: 'Burn the midnight oil', urduRoman: 'Raat ko mehnat karna', exampleSentence: 'She burns the midnight oil before every exam.', isPowerPack: true },
    { english: 'Spill the beans', urduRoman: 'Raaz ufshan karna (galti se)', exampleSentence: 'Do not spill the beans about the surprise party!', isPowerPack: true },
    { english: 'Cost an arm and a leg', urduRoman: 'Bohot mehnga hona', exampleSentence: 'This phone costs an arm and a leg.', isPowerPack: true },
    { english: 'Once in a blue moon', urduRoman: 'Bahut mushkil se — kabhi kabhi', exampleSentence: 'He visits us once in a blue moon.', isPowerPack: true },
    { english: 'The ball is in your court', urduRoman: 'Ab tera faisla — teri zimmedaari', exampleSentence: 'I have done my part — the ball is in your court.', isPowerPack: false },
    { english: 'A blessing in disguise', urduRoman: 'Jo bura lage lekin acha nikle', exampleSentence: 'Losing that job was a blessing in disguise.', isPowerPack: false },
    { english: 'Hit the sack', urduRoman: 'So jaana', exampleSentence: 'I am exhausted — time to hit the sack.', isPowerPack: false },
    { english: 'Beat around the bush', urduRoman: 'Seedha baat na karna', exampleSentence: 'Stop beating around the bush — just tell me!', isPowerPack: false },
    { english: 'Let the cat out of the bag', urduRoman: 'Galti se raaz batana', exampleSentence: 'He let the cat out of the bag about the surprise.', isPowerPack: false },
    { english: 'Pull someone\'s leg', urduRoman: 'Mazaak karna / chhedna', exampleSentence: 'I was just pulling your leg — relax!', isPowerPack: false },
    { english: 'Bite the bullet', urduRoman: 'Mushkil accept kar ke aage barhna', exampleSentence: 'Just bite the bullet and get it done.', isPowerPack: false },
  ];
  idioms5.forEach((id, i) => {
    items.push({ level: 5, module: 3, groupName: 'Idioms (Muhawre)', type: ContentType.PHRASE, english: id.english, urduRoman: id.urduRoman, exampleSentence: id.exampleSentence, isPowerPack: id.isPowerPack, sortOrder: i + 1 });
  });

  // Module 4 — Phrasal Verbs
  const phrasalVerbs5 = [
    { english: 'Give up', urduRoman: 'Haar maanna / chhodna', exampleSentence: 'Never give up on your dreams.', isPowerPack: true },
    { english: 'Look up', urduRoman: 'Dhundhna (dictionary ya internet mein)', exampleSentence: 'Look up the word you do not know.', isPowerPack: true },
    { english: 'Turn on / Turn off', urduRoman: 'Chalaana / Band karna', exampleSentence: 'Turn on the fan and turn off the light.', isPowerPack: true },
    { english: 'Put off', urduRoman: 'Kal par talna / postpone karna', exampleSentence: 'Do not put off what you can do today.', isPowerPack: true },
    { english: 'Run out of', urduRoman: 'Khatam ho jaana', exampleSentence: 'We ran out of milk this morning.', isPowerPack: true },
    { english: 'Look after', urduRoman: 'Dekh bhal karna / khayal rakhna', exampleSentence: 'She looks after her aging parents.', isPowerPack: true },
    { english: 'Come across', urduRoman: 'Ittefaaqan milna ya paana', exampleSentence: 'I came across an old photo of my father.', isPowerPack: false },
    { english: 'Break down', urduRoman: 'Kharab ho jaana', exampleSentence: 'My car broke down on the highway.', isPowerPack: false },
    { english: 'Find out', urduRoman: 'Pata lagaana', exampleSentence: 'Find out what time the train arrives.', isPowerPack: false },
    { english: 'Set up', urduRoman: 'Qaayem karna / shuru karna', exampleSentence: 'He set up a successful new business.', isPowerPack: false },
    { english: 'Call off', urduRoman: 'Cancel karna', exampleSentence: 'They called off the meeting due to rain.', isPowerPack: false },
    { english: 'Figure out', urduRoman: 'Samajhna / hal karna', exampleSentence: 'I finally figured out the solution.', isPowerPack: false },
    { english: 'Go through', urduRoman: 'Mushkil daur se guzarna', exampleSentence: 'She went through a very difficult time.', isPowerPack: false },
    { english: 'Stand out', urduRoman: 'Alag aur behtar dikhna', exampleSentence: 'She always stands out in a crowd.', isPowerPack: false },
    { english: 'Carry on', urduRoman: 'Jaari rakhna', exampleSentence: 'Carry on with your good work!', isPowerPack: false },
    { english: 'Take off', urduRoman: 'Utarna (kapra) / urana (plane)', exampleSentence: 'The plane took off exactly on time.', isPowerPack: false },
    { english: 'Bring up', urduRoman: 'Parwarish karna / zikr karna', exampleSentence: 'She was brought up in a small village.', isPowerPack: false },
    { english: 'Make up', urduRoman: 'Jhooth banana / irtijaal karna', exampleSentence: 'Do not make up excuses for being late.', isPowerPack: false },
    { english: 'Get up', urduRoman: 'Uthna (subah)', exampleSentence: 'I get up at 6 AM every day.', isPowerPack: true },
    { english: 'Give back', urduRoman: 'Wapas karna / lawtaana', exampleSentence: 'Please give back my pen when you are done.', isPowerPack: false },
  ];
  phrasalVerbs5.forEach((pv, i) => {
    items.push({ level: 5, module: 4, groupName: 'Phrasal Verbs', type: ContentType.VOCAB, english: pv.english, urduRoman: pv.urduRoman, exampleSentence: pv.exampleSentence, isPowerPack: pv.isPowerPack, sortOrder: i + 1 });
  });

  // ── LEVEL 6 — ADVANCED (Days 241–300) ─────────────────────────────────

  // Module 1 — Professional Email Writing
  const emailPhrases6 = [
    { english: 'I am writing to apply for the position of ___.', urduRoman: 'Mein ___ ki job ke liye apply kar raha hoon.', exampleSentence: 'I am writing to apply for the position of Content Writer.', isPowerPack: true },
    { english: 'I hope this email finds you well.', urduRoman: 'Umeed hai aap khairiyat mein honge.', exampleSentence: 'Dear Mr. Ahmed, I hope this email finds you well.', isPowerPack: true },
    { english: 'Please find attached my CV and cover letter.', urduRoman: 'Baraye meherbani saath mein CV aur cover letter dekhein.', exampleSentence: 'Please find attached my CV and cover letter for your consideration.', isPowerPack: true },
    { english: 'I would welcome the opportunity to discuss ___.', urduRoman: 'Mujhe ___ ke baare mein baat karne ka mauqa mil jaye to khushi hogi.', exampleSentence: 'I would welcome the opportunity to discuss how I can contribute.', isPowerPack: true },
    { english: 'Looking forward to hearing from you.', urduRoman: 'Aapke jawab ka intezaar rahe ga.', exampleSentence: 'Thank you for your time. Looking forward to hearing from you.', isPowerPack: true },
    { english: 'I sincerely apologize for the inconvenience.', urduRoman: 'Takleef ke liye sacchi mein maafi chahta hoon.', exampleSentence: 'I sincerely apologize for the delay in response.', isPowerPack: true },
    { english: 'Could you please clarify / confirm ___?', urduRoman: 'Kya aap ___ waazeh / confirm kar sakte hain?', exampleSentence: 'Could you please confirm the meeting time?', isPowerPack: false },
    { english: 'I would be grateful if you could ___.', urduRoman: 'Agar aap ___ kar sako to bohot meherbani hogi.', exampleSentence: 'I would be grateful if you could respond by Friday.', isPowerPack: false },
    { english: 'Best regards, / Kind regards,', urduRoman: 'Aapka (formal khatam karne ka tarika)', exampleSentence: 'Best regards, Ali Hassan, ali@email.com', isPowerPack: false },
    { english: 'Subject: Application for ___', urduRoman: 'Mauzoo: ___ ke liye darkhwast', exampleSentence: 'Subject: Application for English Teacher Position', isPowerPack: true },
  ];
  emailPhrases6.forEach((p, i) => {
    items.push({ level: 6, module: 1, groupName: 'Professional Email Writing', type: ContentType.PHRASE, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: p.isPowerPack, sortOrder: i + 1 });
  });

  // Module 2 — Interview English
  const interviewPhrases6 = [
    { english: 'Tell me about yourself.', urduRoman: 'Apne baare mein batayein. (Opening formula use karo)', exampleSentence: 'My name is Ali. I have completed my degree from LUMS and have 2 years of experience.', isPowerPack: true },
    { english: 'I am a quick learner and a strong team player.', urduRoman: 'Mein jaldi seekhta hoon aur team mein acha kaam karta hoon.', exampleSentence: 'I am a quick learner and I thrive in team environments.', isPowerPack: true },
    { english: 'My greatest strength is my dedication to quality work.', urduRoman: 'Meri sab se bari khoobee mera kaam mein dedication hai.', exampleSentence: 'My greatest strength is my dedication to producing quality work.', isPowerPack: true },
    { english: 'I have researched your company and I admire your work in ___.', urduRoman: 'Meine aapki company ke baare mein parha hai aur mujhe ___ bohot pasand hai.', exampleSentence: 'I have researched your company and I admire your innovation in technology.', isPowerPack: true },
    { english: 'In 5 years, I see myself growing within this organization.', urduRoman: '5 saalon mein mein is organization mein barhna chahta hoon.', exampleSentence: 'In 5 years, I see myself in a senior role contributing to bigger projects.', isPowerPack: true },
    { english: 'My weakness is that I sometimes take on too many tasks.', urduRoman: 'Meri kamzori yeh hai ke mein ek saath bahut kaam le leta hoon.', exampleSentence: 'My weakness is taking on too many tasks, but I am improving with prioritization.', isPowerPack: true },
    { english: 'I believe I can make a meaningful contribution to your team.', urduRoman: 'Mujhe yaqeen hai mein aapki team mein acha yogdaan de sakta hoon.', exampleSentence: 'I believe I can make a meaningful contribution to your team from day one.', isPowerPack: false },
    { english: 'I work well under pressure and meet deadlines consistently.', urduRoman: 'Mein pressure mein acha kaam karta hoon aur deadlines par hamesha poora karta hoon.', exampleSentence: 'I work well under pressure and consistently meet deadlines.', isPowerPack: false },
  ];
  interviewPhrases6.forEach((p, i) => {
    items.push({ level: 6, module: 2, groupName: 'Job Interview English', type: ContentType.PHRASE, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: p.isPowerPack, sortOrder: i + 1 });
  });

  // Module 3 — Advanced Vocabulary (Power Words)
  const powerWords6 = [
    { english: 'Achieve', urduRoman: 'Haasil karna / paana', exampleSentence: 'She achieved her goal through hard work.', isPowerPack: true },
    { english: 'Ambitious', urduRoman: 'Khwahishmand / uncihi tadap wala', exampleSentence: 'He is very ambitious and sets high goals.', isPowerPack: true },
    { english: 'Commitment', urduRoman: 'Pakka wada / zaroorat poori karna', exampleSentence: 'Show your commitment to this project.', isPowerPack: true },
    { english: 'Consistent', urduRoman: 'Hamesha ek jesi performance dena', exampleSentence: 'Be consistent in your efforts every day.', isPowerPack: true },
    { english: 'Dedicated', urduRoman: 'Kisi cheez mein lage rehna / junoon', exampleSentence: 'She is dedicated to her work and family.', isPowerPack: true },
    { english: 'Empower', urduRoman: 'Taqat dena / himmat dena', exampleSentence: 'Knowledge empowers people to change their lives.', isPowerPack: true },
    { english: 'Inspire', urduRoman: 'Prerit karna / himmat dena', exampleSentence: 'His story inspired thousands of young people.', isPowerPack: true },
    { english: 'Overcome', urduRoman: 'Qabu paana / jeetna', exampleSentence: 'She overcame all her fears to speak publicly.', isPowerPack: true },
    { english: 'Resilient', urduRoman: 'Haar na maannaawala / phir uthne wala', exampleSentence: 'Stay resilient in tough times — this will pass.', isPowerPack: false },
    { english: 'Potential', urduRoman: 'Choopi hui salahiyat', exampleSentence: 'You have great potential — do not waste it.', isPowerPack: false },
    { english: 'Perspective', urduRoman: 'Nazar-iya / sochne ka andaaz', exampleSentence: 'Change your perspective and change your life.', isPowerPack: false },
    { english: 'Strategy', urduRoman: 'Tadbeer / mansoba', exampleSentence: 'Plan your strategy before you begin.', isPowerPack: false },
    { english: 'Transform', urduRoman: 'Tabdeel karna / badal dena', exampleSentence: 'Transform your daily habits and transform your life.', isPowerPack: false },
    { english: 'Vision', urduRoman: 'Duur ki soch / manzil ka tasawwur', exampleSentence: 'Have a clear vision for your future.', isPowerPack: false },
    { english: 'Wisdom', urduRoman: 'Hikmat / pakki samajh', exampleSentence: 'Seek wisdom from those who have more experience.', isPowerPack: false },
    { english: 'Proactive', urduRoman: 'Pehle se sochna aur kaam karna', exampleSentence: 'Be proactive, not reactive.', isPowerPack: false },
    { english: 'Progress', urduRoman: 'Taraqqi / aage barhna', exampleSentence: 'Track your progress every single day.', isPowerPack: false },
    { english: 'Opportunity', urduRoman: 'Mauqa / acha waqt', exampleSentence: 'Grab every opportunity that comes your way.', isPowerPack: false },
    { english: 'Challenge', urduRoman: 'Mushkil kaam ya muqabila', exampleSentence: 'Accept this challenge and grow from it.', isPowerPack: false },
    { english: 'Focus', urduRoman: 'Dhyan lagaana / concentrate karna', exampleSentence: 'Focus on one thing at a time for best results.', isPowerPack: false },
  ];
  powerWords6.forEach((w, i) => {
    items.push({ level: 6, module: 3, groupName: 'Advanced Power Words', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: w.isPowerPack, sortOrder: i + 1 });
  });

  // Weak→Strong word replacements
  const wordUpgrades6 = [
    { english: 'good → excellent, outstanding, superb', urduRoman: '"good" ki jagah mazboot alfaaz', exampleSentence: 'Her performance was outstanding.', isPowerPack: true },
    { english: 'bad → terrible, dreadful, awful', urduRoman: '"bad" ki jagah acha alternative', exampleSentence: 'The weather was dreadful yesterday.', isPowerPack: true },
    { english: 'big → enormous, massive, vast', urduRoman: '"big" ki jagah powerful word', exampleSentence: 'The crowd was enormous.', isPowerPack: false },
    { english: 'said → explained, stated, emphasized', urduRoman: '"said" ki jagah mazboot reporting verb', exampleSentence: 'She emphasized the importance of practice.', isPowerPack: false },
    { english: 'happy → delighted, thrilled, overjoyed', urduRoman: '"happy" ki jagah strong emotion words', exampleSentence: 'I was thrilled to receive the award.', isPowerPack: false },
    { english: 'important → crucial, vital, essential', urduRoman: '"important" ki jagah stronger words', exampleSentence: 'It is crucial to practise every day.', isPowerPack: false },
    { english: 'interesting → fascinating, captivating', urduRoman: '"interesting" ki jagah engaging words', exampleSentence: 'The lecture was absolutely captivating.', isPowerPack: false },
  ];
  wordUpgrades6.forEach((w, i) => {
    items.push({ level: 6, module: 3, groupName: 'Word Upgrades (Weak→Strong)', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: w.isPowerPack, sortOrder: 21 + i });
  });

  // Module 4 — IELTS / Exam Prep
  const ieltsPhrases6 = [
    { english: 'The graph shows that ___ increased significantly between ___ and ___.', urduRoman: 'Graph describe karne ka tarika', exampleSentence: 'The graph shows that internet usage increased significantly between 2010 and 2020.', isPowerPack: true },
    { english: 'There was a sharp rise / gradual decline in ___.', urduRoman: 'Trend describe karna', exampleSentence: 'There was a sharp rise in smartphone ownership after 2015.', isPowerPack: true },
    { english: 'Overall, it is clear that ___.', urduRoman: 'Summary sentence banana', exampleSentence: 'Overall, it is clear that technology has transformed daily life.', isPowerPack: true },
    { english: 'Some people argue that ___, while others believe ___.', urduRoman: 'Opinion essay mein dono sides', exampleSentence: 'Some people argue that social media is harmful, while others believe it connects communities.', isPowerPack: true },
    { english: 'In my opinion, ___ because ___.', urduRoman: 'Apni raaye dena', exampleSentence: 'In my opinion, education is the most important investment because it opens every door.', isPowerPack: true },
    { english: 'To support this point, consider the example of ___.', urduRoman: 'Misaal ke saath support karna', exampleSentence: 'To support this point, consider the example of Finland\'s education system.', isPowerPack: false },
    { english: 'In conclusion, both sides have valid arguments, however ___.', urduRoman: 'Essay khatam karne ka tarika', exampleSentence: 'In conclusion, both sides have valid arguments, however technology\'s benefits outweigh its risks.', isPowerPack: false },
    { english: 'Speaking: Describe a person you admire and explain why.', urduRoman: 'IELTS Speaking Part 2 — Cue Card', exampleSentence: 'I would like to talk about my father, who I admire for his honesty and hard work.', isPowerPack: false },
    { english: 'IELTS Band 5–6: Daily conversations comfortable', urduRoman: 'Band 5-6 matlab', exampleSentence: 'At Band 6 you can communicate effectively in most situations.', isPowerPack: false },
    { english: 'IELTS Band 7–8: Minor errors only, very good fluency', urduRoman: 'Band 7-8 matlab', exampleSentence: 'Band 7 speakers communicate clearly with only occasional inaccuracies.', isPowerPack: false },
  ];
  ieltsPhrases6.forEach((p, i) => {
    items.push({ level: 6, module: 4, groupName: 'IELTS / Exam Preparation', type: ContentType.PHRASE, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: p.isPowerPack, sortOrder: i + 1 });
  });

  // ── LEVEL 2, MODULE 5: Level 2 Gate (Review) ────────────────────────────

  const level2GateGrammar = [
    { english: 'Present Simple: I eat / He eats', urduRoman: 'Roz hoti baat — He/She/It ke saath "s" lagao', exampleSentence: 'I work every day. He works every day.', isPowerPack: true },
    { english: 'Present Continuous: I am eating', urduRoman: 'Abhi ho raha hai — am/is/are + V-ing', exampleSentence: 'She is studying right now. They are playing.', isPowerPack: true },
    { english: 'Past Simple: I ate / She went', urduRoman: 'Ho gaya — V2 (regular: +ed, irregular: yaad karo)', exampleSentence: 'I went to school. She ate biryani.', isPowerPack: true },
    { english: 'Future with Will: I will go', urduRoman: 'Hoga — will + Verb (base form)', exampleSentence: 'I will call you tomorrow. She will come soon.', isPowerPack: true },
    { english: 'Going to: I am going to study', urduRoman: 'Pehle se plan — am/is/are going to + Verb', exampleSentence: 'I am going to study tonight. He is going to leave.', isPowerPack: true },
    { english: 'Articles: a / an / the', urduRoman: 'a (consonant) / an (vowel) / the (khaas cheez)', exampleSentence: 'I saw a dog. He ate an apple. The sun is bright.', isPowerPack: true },
  ];
  level2GateGrammar.forEach((g, i) => {
    items.push({ level: 2, module: 5, groupName: 'Level 2 Gate — Grammar Review', type: ContentType.GRAMMAR, english: g.english, urduRoman: g.urduRoman, exampleSentence: g.exampleSentence, isPowerPack: g.isPowerPack, sortOrder: i + 1 });
  });

  const level2GatePhrases = [
    { english: 'I have been learning English for ___ weeks.', urduRoman: 'Mein ___ haftoon se English seekh raha hoon.', exampleSentence: 'I have been learning English for six weeks.', isPowerPack: true },
    { english: 'My English is getting better every day.', urduRoman: 'Meri English roz behtar ho rahi hai.', exampleSentence: 'I practise daily and my English is getting better every day.', isPowerPack: true },
    { english: 'Can you tell me what time it is?', urduRoman: 'Kya aap mujhe waqt bata sakte hain?', exampleSentence: 'Excuse me, can you tell me what time it is?', isPowerPack: false },
    { english: 'I used to ___ when I was younger.', urduRoman: 'Jab mein chota tha, mein ___ karta tha.', exampleSentence: 'I used to play cricket when I was younger.', isPowerPack: false },
    { english: 'I am going to improve my English.', urduRoman: 'Mein apni English behtar karney wala hoon.', exampleSentence: 'I am going to improve my English every day.', isPowerPack: true },
  ];
  level2GatePhrases.forEach((p, i) => {
    items.push({ level: 2, module: 5, groupName: 'Level 2 Gate — Key Phrases', type: ContentType.PHRASE, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: p.isPowerPack, sortOrder: 7 + i });
  });

  // ── LEVEL 3, MODULE 5: Level 3 Gate (Review) ────────────────────────────

  const level3GateGrammar = [
    { english: 'Present Perfect: I have eaten / She has gone', urduRoman: 'Abhi tak ka asar — have/has + V3', exampleSentence: 'I have finished the task. She has already left.', isPowerPack: true },
    { english: 'Past Continuous: I was sleeping when...', urduRoman: 'Jab kuch aur hua tab — was/were + V-ing', exampleSentence: 'I was studying when the lights went out.', isPowerPack: true },
    { english: 'All 12 tenses — I know the formula for each', urduRoman: 'Dono: simple aur continuous / perfect aur perfect continuous', exampleSentence: 'Simple, Continuous, Perfect, Perfect Continuous — 3 times = 12 tenses.', isPowerPack: true },
    { english: 'Reading: main idea + supporting details', urduRoman: 'Topic sentence = main idea | Baaki = details', exampleSentence: 'What is the main idea of this paragraph?', isPowerPack: true },
    { english: 'Story vocabulary: setting, characters, events', urduRoman: 'Setting (jagah), Characters (log), Events (waqiat)', exampleSentence: 'The story is set in Lahore. The main character is Hassan.', isPowerPack: false },
  ];
  level3GateGrammar.forEach((g, i) => {
    items.push({ level: 3, module: 5, groupName: 'Level 3 Gate — Grammar & Reading Review', type: ContentType.GRAMMAR, english: g.english, urduRoman: g.urduRoman, exampleSentence: g.exampleSentence, isPowerPack: g.isPowerPack, sortOrder: i + 1 });
  });

  const level3GatePhrases = [
    { english: 'According to the passage, ___.', urduRoman: 'Passage ke mutabiq, ___.', exampleSentence: 'According to the passage, Hassan woke up at 4 AM every day.', isPowerPack: true },
    { english: 'The author suggests that ___.', urduRoman: 'Likhne wale ka kehna hai ke ___.', exampleSentence: 'The author suggests that hard work always brings results.', isPowerPack: true },
    { english: 'In conclusion, ___.', urduRoman: 'Aakhir mein ___.', exampleSentence: 'In conclusion, dedication is the key to success.', isPowerPack: true },
    { english: 'I have learned ___ new words in this level.', urduRoman: 'Is level mein meine ___ naye alfaaz seekhe.', exampleSentence: 'I have learned over 500 new words in this level.', isPowerPack: false },
    { english: 'I can now use all 12 tenses in English.', urduRoman: 'Mein ab English ke tamam 12 tenses use kar sakta hoon.', exampleSentence: 'I can now use all 12 tenses correctly in my writing and speaking.', isPowerPack: false },
  ];
  level3GatePhrases.forEach((p, i) => {
    items.push({ level: 3, module: 5, groupName: 'Level 3 Gate — Key Phrases', type: ContentType.PHRASE, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: p.isPowerPack, sortOrder: 6 + i });
  });

  // ── LEVEL 4, MODULE 5: Idioms & Phrases ──────────────────────────────────

  const level4Idioms = [
    { english: 'Break a leg', urduRoman: 'Kamiyaabi ki dua (literally nahi — good luck!)', exampleSentence: 'Break a leg in your presentation today!', isPowerPack: true },
    { english: 'Piece of cake', urduRoman: 'Bahut aasaan kaam', exampleSentence: 'The test was a piece of cake for the top students.', isPowerPack: true },
    { english: 'Burn the midnight oil', urduRoman: 'Raat ko der tak kaam/parhaai karna', exampleSentence: 'She burns the midnight oil before every exam.', isPowerPack: true },
    { english: 'Under the weather', urduRoman: 'Thoda beemar / theek nahi', exampleSentence: 'I am feeling a bit under the weather today.', isPowerPack: true },
    { english: 'Hit the nail on the head', urduRoman: 'Bilkul sahi baat kehna', exampleSentence: 'You hit the nail on the head with that suggestion.', isPowerPack: true },
    { english: 'Spill the beans', urduRoman: 'Galti se raaz batana', exampleSentence: 'Do not spill the beans about the surprise party!', isPowerPack: true },
    { english: 'Once in a blue moon', urduRoman: 'Bahut kaam hi hota hai — bahut mushkil se', exampleSentence: 'He visits his relatives once in a blue moon.', isPowerPack: true },
    { english: 'Bite the bullet', urduRoman: 'Mushkil ko accept karo aur aage baro', exampleSentence: 'Just bite the bullet and finish the report.', isPowerPack: true },
    { english: 'Beat around the bush', urduRoman: 'Ghuma phira ke baat karna — seedhi baat nahi', exampleSentence: 'Stop beating around the bush. Tell me directly.', isPowerPack: false },
    { english: 'Hit the sack', urduRoman: 'So jaana / neend ke liye jaana', exampleSentence: 'I am exhausted. Time to hit the sack.', isPowerPack: false },
    { english: 'Cost an arm and a leg', urduRoman: 'Bahut zyada mehnga hona', exampleSentence: 'That phone costs an arm and a leg.', isPowerPack: false },
    { english: 'The ball is in your court', urduRoman: 'Ab aapki baari / aapki zimmedaari', exampleSentence: 'I offered to help. The ball is in your court now.', isPowerPack: false },
    { english: 'A blessing in disguise', urduRoman: 'Jo bura lage lekin baad mein acha nikle', exampleSentence: 'Losing that job was a blessing in disguise.', isPowerPack: false },
    { english: 'Let the cat out of the bag', urduRoman: 'Galti se chhupa hua raaz batana', exampleSentence: 'He let the cat out of the bag about the promotion.', isPowerPack: false },
    { english: 'Pull someone\'s leg', urduRoman: 'Kisi ke saath mazaak karna', exampleSentence: 'I was just pulling your leg — I did not mean it seriously!', isPowerPack: false },
  ];
  level4Idioms.forEach((id, i) => {
    items.push({ level: 4, module: 5, groupName: 'Idioms & Fixed Expressions', type: ContentType.PHRASE, english: id.english, urduRoman: id.urduRoman, exampleSentence: id.exampleSentence, isPowerPack: id.isPowerPack, sortOrder: i + 1 });
  });

  // ── LEVEL 4, MODULE 6: Level 4 Gate (Review) ────────────────────────────

  const level4GateGrammar = [
    { english: 'Although / Even though — contrast connector', urduRoman: 'Haalaanki / Baawajood is ke', exampleSentence: 'Although it rained, the match continued.', isPowerPack: true },
    { english: 'Not only... but also — adding strong points', urduRoman: 'Sirf nahi... balke bhi', exampleSentence: 'She is not only talented but also hardworking.', isPowerPack: true },
    { english: 'The more... the more — parallel comparison', urduRoman: 'Jitna zyada... utna zyada', exampleSentence: 'The more you practise, the more confident you become.', isPowerPack: true },
    { english: 'WRONG: She did not went. RIGHT: She did not go.', urduRoman: '"did" ke baad hamesha base verb — galti mat karo', exampleSentence: 'She did not go to school. (NOT: did not went)', isPowerPack: true },
    { english: 'Formal letter format: Respected Sir / Yours sincerely', urduRoman: 'Darkhwast mein shuroo aur aakhir ka tarika', exampleSentence: 'Respected Sir, I humbly request you to consider my application. Yours sincerely, Ali.', isPowerPack: true },
  ];
  level4GateGrammar.forEach((g, i) => {
    items.push({ level: 4, module: 6, groupName: 'Level 4 Gate — Key Concepts', type: ContentType.GRAMMAR, english: g.english, urduRoman: g.urduRoman, exampleSentence: g.exampleSentence, isPowerPack: g.isPowerPack, sortOrder: i + 1 });
  });

  const level4GatePhrases = [
    { english: 'Furthermore, this shows that ___.', urduRoman: 'Mazeed yeh ke yeh sabit karta hai ke ___.', exampleSentence: 'Furthermore, this shows that regular practice leads to fluency.', isPowerPack: true },
    { english: 'In conclusion, I believe that ___.', urduRoman: 'Aakhir mein, mujhe yaqeen hai ke ___.', exampleSentence: 'In conclusion, I believe that education is the greatest gift.', isPowerPack: true },
    { english: 'On the other hand, some people argue that ___.', urduRoman: 'Doosri taraf, kuch log kehte hain ke ___.', exampleSentence: 'On the other hand, some people argue that experience is more important than degrees.', isPowerPack: false },
    { english: 'I have been studying for four months and I feel confident.', urduRoman: 'Mein chaar mahine se parh raha hoon aur mujhe confidence hai.', exampleSentence: 'I have been studying English for four months and I feel very confident.', isPowerPack: false },
  ];
  level4GatePhrases.forEach((p, i) => {
    items.push({ level: 4, module: 6, groupName: 'Level 4 Gate — Review Phrases', type: ContentType.PHRASE, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: p.isPowerPack, sortOrder: 6 + i });
  });

  // ── LEVEL 5, MODULE 5: Business English ──────────────────────────────────

  const businessMeetings = [
    { english: 'Let us get started — shall we begin?', urduRoman: 'Shuru karte hain — kya shuru karein?', exampleSentence: 'Good morning everyone. Let us get started with today\'s agenda.', isPowerPack: true },
    { english: 'The purpose of today\'s meeting is to ___.', urduRoman: 'Aaj ki meeting ka maqsad ___ hai.', exampleSentence: 'The purpose of today\'s meeting is to review the monthly targets.', isPowerPack: true },
    { english: 'Could I add something here?', urduRoman: 'Kya mein yahaan kuch add kar sakta hoon?', exampleSentence: 'If I may — could I add something here about the budget?', isPowerPack: true },
    { english: 'To summarize what has been discussed...', urduRoman: 'Jo baat hui uska khulaasa — to summarize...', exampleSentence: 'To summarize what has been discussed, we need three more weeks.', isPowerPack: true },
    { english: 'Let us schedule a follow-up meeting.', urduRoman: 'Agli meeting fix karte hain.', exampleSentence: 'Let us schedule a follow-up meeting for next Monday at 10 AM.', isPowerPack: true },
    { english: 'I would like to propose / suggest that ___.', urduRoman: 'Mein yeh tawiza dena chahta hoon ke ___.', exampleSentence: 'I would like to propose that we extend the deadline by one week.', isPowerPack: true },
    { english: 'With respect, I disagree because ___.', urduRoman: 'Aadab ke saath, mein ikhtilaaf rakhta hoon kyunke ___.', exampleSentence: 'With respect, I disagree because the data does not support this conclusion.', isPowerPack: false },
    { english: 'That is a valid point. However, ___.', urduRoman: 'Yeh ek theek baat hai. Lekin, ___.', exampleSentence: 'That is a valid point. However, we must also consider the cost.', isPowerPack: false },
  ];
  businessMeetings.forEach((p, i) => {
    items.push({ level: 5, module: 5, groupName: 'Business Meetings', type: ContentType.PHRASE, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: p.isPowerPack, sortOrder: i + 1 });
  });

  const businessNegotiation = [
    { english: 'We are looking for a win-win solution.', urduRoman: 'Hum ek aisaa hal chahte hain jo dono ke liye behtar ho.', exampleSentence: 'We are looking for a win-win solution that works for both sides.', isPowerPack: true },
    { english: 'What is the best price you can offer?', urduRoman: 'Aap se behtar qeemat kya mil sakti hai?', exampleSentence: 'We are interested, but what is the best price you can offer?', isPowerPack: true },
    { english: 'We can offer ___ if you can commit to ___.', urduRoman: 'Agar aap ___ par raaz hoon to hum ___ de sakte hain.', exampleSentence: 'We can offer a 15% discount if you can commit to a one-year contract.', isPowerPack: true },
    { english: 'I will need to discuss this with my team.', urduRoman: 'Mujhe yeh apni team ke saath discuss karna hoga.', exampleSentence: 'This sounds promising. I will need to discuss this with my team first.', isPowerPack: false },
    { english: 'Do we have a deal?', urduRoman: 'Kya hum raaz hain? Kya deal pakki hai?', exampleSentence: 'We have agreed on all the terms. Do we have a deal?', isPowerPack: false },
    { english: 'I look forward to a long-term partnership.', urduRoman: 'Main uzwi shiraakat ki ummeed rakhta hoon.', exampleSentence: 'I look forward to a long-term partnership with your company.', isPowerPack: false },
  ];
  businessNegotiation.forEach((p, i) => {
    items.push({ level: 5, module: 5, groupName: 'Business Negotiations', type: ContentType.PHRASE, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: p.isPowerPack, sortOrder: 9 + i });
  });

  const businessVocab = [
    { english: 'Agenda', urduRoman: 'Meeting ka program / schedule', exampleSentence: 'Please review the agenda before the meeting.', isPowerPack: true },
    { english: 'Deadline', urduRoman: 'Kaam mukammal karne ki aakhri tarikh', exampleSentence: 'The deadline for this project is Friday at 5 PM.', isPowerPack: true },
    { english: 'Follow up', urduRoman: 'Kisi kaam ka baa\'d mein jaiza lena', exampleSentence: 'I will follow up with the client tomorrow morning.', isPowerPack: true },
    { english: 'Stakeholder', urduRoman: 'Woh log jin ka kisi project mein hissa ho', exampleSentence: 'We must inform all stakeholders about the changes.', isPowerPack: false },
    { english: 'KPI (Key Performance Indicator)', urduRoman: 'Kaam ki quality napne ka parameter', exampleSentence: 'Our main KPI this quarter is customer satisfaction.', isPowerPack: false },
    { english: 'Action item', urduRoman: 'Jo kaam meeting mein decide hua karna hai', exampleSentence: 'The action item from today\'s meeting is to prepare a new proposal.', isPowerPack: false },
  ];
  businessVocab.forEach((w, i) => {
    items.push({ level: 5, module: 5, groupName: 'Business Vocabulary', type: ContentType.VOCAB, english: w.english, urduRoman: w.urduRoman, exampleSentence: w.exampleSentence, isPowerPack: w.isPowerPack, sortOrder: 15 + i });
  });

  // ── LEVEL 5, MODULE 6: Level 5 Gate (Review) ────────────────────────────

  const level5GateGrammar = [
    { english: 'If + Present, will + Verb (Type 1 — real/possible)', urduRoman: 'Agar... to — Type 1: Ho sakta hai', exampleSentence: 'If you study hard, you will pass the exam.', isPowerPack: true },
    { english: 'If + Past, would + Verb (Type 2 — imaginary)', urduRoman: 'Type 2: Kash hota... (imagination)', exampleSentence: 'If I had a million rupees, I would start a school.', isPowerPack: true },
    { english: 'If + had + V3, would have + V3 (Type 3 — past impossible)', urduRoman: 'Type 3: Jo hua nahi us ki arzoo', exampleSentence: 'If she had studied, she would have passed easily.', isPowerPack: true },
    { english: 'Passive: The letter was written by Ali.', urduRoman: 'Object + was/were + V3 + by + Subject', exampleSentence: 'The project was completed by the team on time.', isPowerPack: true },
    { english: 'Never give up — phrasal verb example', urduRoman: 'Give up = haar maanna — kabhi haar mat maano', exampleSentence: 'Never give up on your dreams. Look up every word you do not know.', isPowerPack: true },
  ];
  level5GateGrammar.forEach((g, i) => {
    items.push({ level: 5, module: 6, groupName: 'Level 5 Gate — Grammar Mastery', type: ContentType.GRAMMAR, english: g.english, urduRoman: g.urduRoman, exampleSentence: g.exampleSentence, isPowerPack: g.isPowerPack, sortOrder: i + 1 });
  });

  const level5GatePhrases = [
    { english: 'Let us schedule a follow-up meeting for ___.', urduRoman: 'Agli meeting ___ ke liye fix karte hain.', exampleSentence: 'Let us schedule a follow-up meeting for next Monday at 10 AM.', isPowerPack: true },
    { english: 'I would like to propose that ___.', urduRoman: 'Mein tawiza karta hoon ke ___.', exampleSentence: 'I would like to propose that we extend the project timeline.', isPowerPack: true },
    { english: 'Once in a blue moon he visits. — Idiom check!', urduRoman: 'Idiom: Once in a blue moon = bahut kabhie kabhie', exampleSentence: 'He visits his parents once in a blue moon.', isPowerPack: false },
    { english: 'The report was submitted before the deadline.', urduRoman: 'Passive voice ka istimaal — report ka zikr aage', exampleSentence: 'The report was submitted by the team before the deadline.', isPowerPack: false },
  ];
  level5GatePhrases.forEach((p, i) => {
    items.push({ level: 5, module: 6, groupName: 'Level 5 Gate — Review Phrases', type: ContentType.PHRASE, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: p.isPowerPack, sortOrder: 6 + i });
  });

  // ── LEVEL 6, MODULE 5: Accent & Delivery ─────────────────────────────────

  const accentPronunciation = [
    { english: 'Word Stress: IM-por-tant (stress the first syllable)', urduRoman: 'Zabar (stress) pehle syllable par — IM-por-tant', exampleSentence: 'The MOST im-POR-tant thing is to practise daily.', isPowerPack: true },
    { english: 'Sentence Stress: stress content words (nouns, verbs, adjectives)', urduRoman: 'Sentence mein zaroori alfaaz (noun, verb, adjective) zor se bolain', exampleSentence: 'I WANT to LEARN ENGLISH WELL. (want, learn, English, well = stressed)', isPowerPack: true },
    { english: 'Rising intonation for questions: Are you coming? ↗', urduRoman: 'Sawaal mein awaaz upar jaati hai ↗', exampleSentence: 'Are you COMING? Did you FINISH? (voice rises at end)', isPowerPack: true },
    { english: 'Falling intonation for statements: I am coming. ↘', urduRoman: 'Bayaan mein awaaz neeche aati hai ↘', exampleSentence: 'I am coming home. ↘ She finished her work. ↘', isPowerPack: true },
    { english: 'Linking words: "I am" sounds like "I\'m" in fast speech', urduRoman: 'Tez bolne mein words aapas mein jur jaate hain', exampleSentence: 'I am → I\'m | Do not → Don\'t | Going to → Gonna (informal)', isPowerPack: true },
    { english: 'Silent letters: know (k silent), write (w silent)', urduRoman: 'Kuch letters likhe jaate hain lekin bole nahi jaate', exampleSentence: 'know (n-OH), write (r-ITE), hour (OW-er), honest (ON-est)', isPowerPack: true },
    { english: 'th sound: think (soft th) vs this (hard th)', urduRoman: '"th" ki do awazein — soft (think) aur hard (this)', exampleSentence: 'THINK (soft th — zabaaan daant ke beech) | THIS (hard th — same but with voice)', isPowerPack: false },
    { english: 'Pace: slow down for clarity, pause at commas', urduRoman: 'Aahista bolain — clearly bolna zaroori hai, comma par rukain', exampleSentence: 'Speak slowly and clearly. Pause at punctuation marks for natural rhythm.', isPowerPack: false },
  ];
  accentPronunciation.forEach((p, i) => {
    items.push({ level: 6, module: 5, groupName: 'Pronunciation & Accent', type: ContentType.GRAMMAR, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: p.isPowerPack, sortOrder: i + 1 });
  });

  const deliveryPhrases = [
    { english: 'Good morning / afternoon everyone. Today I will be talking about ___.', urduRoman: 'Presentation shuru karne ka tarika', exampleSentence: 'Good morning everyone. Today I will be talking about digital marketing.', isPowerPack: true },
    { english: 'Let me begin by explaining ___.', urduRoman: 'Shuraat mein ___ samjhaata hoon.', exampleSentence: 'Let me begin by explaining the background of this issue.', isPowerPack: true },
    { english: 'Moving on to my next point...', urduRoman: 'Agla nuqta — transition phrase', exampleSentence: 'Moving on to my next point, let us look at the data.', isPowerPack: true },
    { english: 'To summarize, the key takeaways are ___.', urduRoman: 'Khulaasa — is presentation ki key baatein', exampleSentence: 'To summarize, the key takeaways are: plan, practise, and persist.', isPowerPack: true },
    { english: 'Are there any questions?', urduRoman: 'Koi sawaal? — Presentation ke baad bolne ka tarika', exampleSentence: 'Thank you for listening. Are there any questions?', isPowerPack: true },
    { english: 'I would like to draw your attention to ___.', urduRoman: 'Dhyan dilan chahta hoon ___ ki taraf.', exampleSentence: 'I would like to draw your attention to the chart on the right.', isPowerPack: false },
    { english: 'That is an excellent question. My answer is ___.', urduRoman: 'Q&A mein sawaal ka jawab dene ka professional tarika', exampleSentence: 'That is an excellent question. My answer is that consistency is the key.', isPowerPack: false },
  ];
  deliveryPhrases.forEach((p, i) => {
    items.push({ level: 6, module: 5, groupName: 'Public Speaking & Delivery', type: ContentType.PHRASE, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: p.isPowerPack, sortOrder: 9 + i });
  });

  // ── LEVEL 6, MODULE 6: Final Gate (Mastery Review) ───────────────────────

  const finalGateGrammar = [
    { english: 'Professional email opener: I hope this email finds you well.', urduRoman: 'Professional email ka aaghaz — formal aur polite', exampleSentence: 'Dear Sir, I hope this email finds you well. I am writing to apply for the position.', isPowerPack: true },
    { english: 'Interview: My greatest strength is my dedication to quality.', urduRoman: 'Interview mein apni khoobee kehna — confidently', exampleSentence: 'My greatest strength is my dedication to producing quality work on time.', isPowerPack: true },
    { english: 'IELTS Task 2: Some argue... while others believe...', urduRoman: 'IELTS Opinion essay — dono taraf ki raaye', exampleSentence: 'Some argue that social media is harmful, while others believe it connects the world.', isPowerPack: true },
    { english: 'Conditionals review: If I had known, I would have acted.', urduRoman: 'Type 3 conditional — past ki arzoo', exampleSentence: 'If I had known about this course earlier, I would have started sooner.', isPowerPack: true },
    { english: 'Word upgrade: good → outstanding, bad → dreadful', urduRoman: 'Weak words ki jagah strong words — advanced vocabulary', exampleSentence: 'Her performance was not just good — it was outstanding and captivating.', isPowerPack: true },
    { english: 'Passive voice in reports: The data was collected by the team.', urduRoman: 'Report writing mein passive voice zaroori hai', exampleSentence: 'The survey was conducted in three cities and the data was analysed carefully.', isPowerPack: true },
  ];
  finalGateGrammar.forEach((g, i) => {
    items.push({ level: 6, module: 6, groupName: 'Final Gate — Mastery Review', type: ContentType.GRAMMAR, english: g.english, urduRoman: g.urduRoman, exampleSentence: g.exampleSentence, isPowerPack: g.isPowerPack, sortOrder: i + 1 });
  });

  const finalGatePhrases = [
    { english: 'I have completed 300 days of English learning.', urduRoman: 'Mein ne 300 din ki English seekh mukammal ki.', exampleSentence: 'I have completed 300 days of consistent English learning. I am proud of this achievement.', isPowerPack: true },
    { english: 'My English has improved from basic to professional level.', urduRoman: 'Meri English basic se professional level tak pahunchi.', exampleSentence: 'Over the past year, my English has improved from basic to a professional level.', isPowerPack: true },
    { english: 'I can now write professional emails, give interviews, and present ideas in English.', urduRoman: 'Ab mein professional emails likh sakta, interviews de sakta, aur ideas present kar sakta hoon.', exampleSentence: 'I can now confidently write emails, attend interviews, and present my ideas in English.', isPowerPack: true },
    { english: 'The journey of a thousand miles begins with a single step.', urduRoman: 'Hazaar mile ka safar ek qadam se shuru hota hai.', exampleSentence: 'You started with A, E, I, O, U. The journey of a thousand miles begins with a single step.', isPowerPack: true },
    { english: 'Keep going. Your best English is still ahead of you.', urduRoman: 'Chalte raho. Tumhari sabse behtar English abhi aani hai.', exampleSentence: 'Keep going. Your best English is still ahead of you. Never stop learning.', isPowerPack: true },
  ];
  finalGatePhrases.forEach((p, i) => {
    items.push({ level: 6, module: 6, groupName: 'Final Gate — Achievement Phrases', type: ContentType.PHRASE, english: p.english, urduRoman: p.urduRoman, exampleSentence: p.exampleSentence, isPowerPack: p.isPowerPack, sortOrder: 7 + i });
  });

  // ── INSERT ALL ────────────────────────────────────────────────────────────

  const result = await prisma.contentItem.createMany({ data: items });

  console.log(`Seeded ${result.count} ContentItems.`);
  console.log('LEVEL 1:');
  console.log('  Module 1 (Alphabets):          5 vowels + 21 consonants');
  console.log('  Module 2 (Core Words):         194 words: Family, Food, Body, Clothes, Weather + Colors, Body Parts, Animals, Fruits, Veg, Home Objects');
  console.log('  Module 3 (Basic Sentences):    SVO + positive/negative/question patterns');
  console.log('  Module 4 (Numbers/Days/Time):  greetings + polite requests + numbers + days + months + time + self-intro + directions');
  console.log('LEVEL 2:');
  console.log('  Module 1 (Present Tense):      grammar rules + time expressions + 8 modal verbs (can/could/should/must/may/might/have to/would like)');
  console.log('  Module 2 (Past Tense):         grammar + 24 irregular verbs + time expressions');
  console.log('  Module 3 (Future Tense):       will/going-to + articles + plurals + comparatives/superlatives');
  console.log('  Module 4 (Daily Convos):       shopping + restaurant + introductions + directions');
  console.log('  Module 5 (Level 2 Gate):       tense review + key phrases');
  console.log('LEVEL 3:');
  console.log('  Module 1 (All 12 Tenses):      12 tense formulas + 6 PP trigger words + 6 relative clauses + 5 gerunds/infinitives');
  console.log('  Module 2 (500 Core Words):     100 words across 5 categories');
  console.log('  Module 3 (Short Stories):      8 vocab + 4 sentence patterns');
  console.log('  Module 4 (Reading Practice):   5 comprehension patterns + 6 reported speech rules');
  console.log('  Module 5 (Level 3 Gate):       grammar & reading review + key phrases');
  console.log('LEVEL 4:');
  console.log('  Module 1 (Writing Skills):     12 linking words + 5 topics + 8 essay types (narrative/descriptive/expository/persuasive/opinion/C&E/compare)');
  console.log('  Module 2 (Letter Writing):     10 formal letter phrases + 5 informal letter patterns + 6 email writing phrases');
  console.log('  Module 3 (Complex Sentences):  8 complex structures + 7 synonyms + 7 antonyms + 6 homonyms/homophones + 8 prefixes/suffixes + 8 collocations');
  console.log('  Module 4 (Speaking Confidence):8 common mistakes + 5 speaking scripts');
  console.log('  Module 5 (Idioms & Phrases):   15 everyday idioms');
  console.log('  Module 6 (Level 4 Gate):       key concepts + review phrases');
  console.log('LEVEL 5:');
  console.log('  Module 1 (Advanced Grammar):   8 conditional structures');
  console.log('  Module 2 (Passive Voice):      7 passive voice patterns');
  console.log('  Module 3 (Idioms & Expressions): 15 common idioms');
  console.log('  Module 4 (Phrasal Verbs):      20 phrasal verbs');
  console.log('  Module 5 (Business English):   meetings + negotiations + business vocab');
  console.log('  Module 6 (Level 5 Gate):       grammar mastery + review phrases');
  console.log('LEVEL 6:');
  console.log('  Module 1 (Professional Emails):10 email phrases');
  console.log('  Module 2 (Interview English):  8 interview answers');
  console.log('  Module 3 (Advanced Vocabulary):20 power words + 7 word upgrades');
  console.log('  Module 4 (IELTS/Exam Prep):    10 IELTS phrases');
  console.log('  Module 5 (Accent & Delivery):  pronunciation tips + public speaking phrases');
  console.log('  Module 6 (Final Gate):         mastery review + achievement phrases');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
