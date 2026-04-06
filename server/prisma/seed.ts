import { PrismaClient, ContentType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding ContentItems for Levels 1 and 2...');

  await prisma.contentItem.deleteMany({ where: { level: { in: [1, 2] } } });

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

  // ── INSERT ALL ────────────────────────────────────────────────────────────

  const result = await prisma.contentItem.createMany({ data: items });

  console.log(`Seeded ${result.count} ContentItems.`);
  console.log('LEVEL 1:');
  console.log(`  Module 1 (Alphabets):        ${5 + 21} items (5 vowels + 21 consonants)`);
  console.log(`  Module 2 (Core Words):      ${12 + 5 + 50 + 28 + 22 + 18} items (A:12 B:5 C:50 D:28 E:22 F:18)`);
  console.log(`  Module 3 (Basic Sentences): ${1 + 8 + 7 + 7} items (SVO:1 Positive:8 Negative:7 Questions:7)`);
  console.log(`  Module 4 (Daily Patterns):  ${8 + 8 + 10} items (Greetings:8 Requests:8 Numbers:10)`);
  console.log('LEVEL 2:');
  console.log('  Module 1 (Present Tense):   grammar rules + example sentences + time expressions');
  console.log('  Module 2 (Past Tense):      grammar + 24 irregular verbs + time expressions');
  console.log('  Module 3 (Future Tense):    will/going-to + articles + plurals');
  console.log('  Module 4 (Daily Convos):    shopping + restaurant + introductions + directions');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
