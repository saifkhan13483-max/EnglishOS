import { PrismaClient, ContentType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding ContentItems for Level 1...');

  await prisma.contentItem.deleteMany({ where: { level: 1 } });

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

  // ── INSERT ALL ────────────────────────────────────────────────────────────

  const result = await prisma.contentItem.createMany({ data: items });

  console.log(`Seeded ${result.count} ContentItems.`);
  console.log(`  Module 1 (Alphabets):   ${5 + 21} items (5 vowels + 21 consonants)`);
  console.log(`  Module 2 (Core Words): ${12 + 5 + 50 + 28 + 22 + 18} items (A:12 B:5 C:50 D:28 E:22 F:18)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
