export type PanelNode = {
  type: 'panel'
  scene: string
  speaker: string
  speakerColor: string
  text: string
}

export type ChoiceNode = {
  type: 'choice'
  scene: string
  speaker: string
  speakerColor: string
  prompt: string
  options: [string, string]
  acks: [string, string]
}

export type StoryNode = PanelNode | ChoiceNode

export interface Story {
  title: string
  subtitle: string
  nodes: StoryNode[]
}

export const SCENE_GRADIENTS: Record<string, string> = {
  classroom: 'linear-gradient(135deg, #001a33 0%, #003366 50%, #001a33 100%)',
  street:    'linear-gradient(135deg, #0d0d1a 0%, #1a1a3d 50%, #0a0d1a 100%)',
  market:    'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #0d2137 100%)',
  tea:       'linear-gradient(135deg, #1a1200 0%, #3d2800 50%, #1a0c00 100%)',
  shop:      'linear-gradient(135deg, #001a1a 0%, #003333 50%, #001a2e 100%)',
  evening:   'linear-gradient(135deg, #1a0a00 0%, #3d1500 50%, #0d0000 100%)',
  home:      'linear-gradient(135deg, #0a0010 0%, #1a003d 50%, #0a0010 100%)',
}

const STORY_MODULE_1: Story = {
  title: 'The First Letter',
  subtitle: 'Bilal discovers the power of vowels',
  nodes: [
    {
      type: 'panel',
      scene: 'classroom',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      text: 'It is the first day of English class. Bilal sits at his desk. He looks at the board. He sees the letters: A, B, C, D, E…',
    },
    {
      type: 'panel',
      scene: 'classroom',
      speaker: 'Teacher',
      speakerColor: '#4A9EFF',
      text: '"Good morning, class! Today we learn five very important letters. They are called vowels. Say after me: A, E, I, O, U!"',
    },
    {
      type: 'choice',
      scene: 'classroom',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      prompt: 'Bilal wants to remember the vowels. What does he do?',
      options: ['"He writes A, E, I, O, U five times on his paper."', '"He says A, E, I, O, U out loud three times."'],
      acks: [
        'Bilal writes the vowels carefully: A, E, I, O, U. The teacher smiles. "Good! Writing helps you remember."',
        'Bilal says "A, E, I, O, U" out loud. His voice is clear and strong. "Excellent!" says the teacher.',
      ],
    },
    {
      type: 'panel',
      scene: 'classroom',
      speaker: 'Teacher',
      speakerColor: '#4A9EFF',
      text: '"Now, every English word has at least one vowel. Apple has A. Egg has E. Ink has I. Orange has O. Umbrella has U."',
    },
    {
      type: 'panel',
      scene: 'classroom',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      text: 'Bilal thinks: "A is for Apple. E is for Egg. I is for Ink. O is for Orange. U is for Umbrella." He says each word slowly.',
    },
    {
      type: 'choice',
      scene: 'classroom',
      speaker: 'Teacher',
      speakerColor: '#4A9EFF',
      prompt: 'The teacher asks: "Which letter starts the word Orange?"',
      options: ['"O!" says Bilal quickly.', '"A?" says Bilal slowly.'],
      acks: [
        '"O!" Bilal answers fast. "Correct!" The teacher claps. "O is for Orange. Very good, Bilal!"',
        '"Not quite," says the teacher kindly. "Orange starts with O. O is for Orange. Try to remember: O is round, like an orange!"',
      ],
    },
    {
      type: 'panel',
      scene: 'home',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      text: 'That evening, Bilal sits at home. He writes A, E, I, O, U on a paper. He puts it on the wall. Now he will see the vowels every day.',
    },
    {
      type: 'panel',
      scene: 'home',
      speaker: 'Bilal',
      speakerColor: '#2ECC71',
      text: '"Five letters. A, E, I, O, U. Every English word needs them. I will learn them. I will not forget them."',
    },
  ],
}

const STORY_MODULE_2: Story = {
  title: 'A Day at the Market',
  subtitle: 'Bilal uses his first 100 words',
  nodes: [
    {
      type: 'panel',
      scene: 'street',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      text: 'Bilal walks down the street in Lahore. It is a good morning. He is happy. He wants to go to the market to buy food.',
    },
    {
      type: 'panel',
      scene: 'market',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      text: 'A friendly man at the market sees him. The man is a shopkeeper. He wants to speak English too. He smiles at Bilal.',
    },
    {
      type: 'panel',
      scene: 'market',
      speaker: 'Shopkeeper',
      speakerColor: '#4A9EFF',
      text: '"Good morning, friend! Come, come. What do you need today? We have water, food, and more!"',
    },
    {
      type: 'choice',
      scene: 'market',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      prompt: 'How does Bilal reply to the shopkeeper?',
      options: ['"Hello! I want water and food, please."', '"Good morning! I need to buy some things."'],
      acks: [
        '"Hello! I want water and food, please." The shopkeeper claps. "Your English is good! I give you water and food."',
        '"Good morning! I need to buy some things." "Very good English!" says the shopkeeper. "Come, I will help you find what you need."',
      ],
    },
    {
      type: 'panel',
      scene: 'shop',
      speaker: 'Shopkeeper',
      speakerColor: '#4A9EFF',
      text: '"We have cold water and fresh food. Do you have money? How much do you want to spend today?"',
    },
    {
      type: 'panel',
      scene: 'shop',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      text: 'Bilal thinks of the words he knows: I, want, need, have, money, food, water, good, thank. He is ready to speak.',
    },
    {
      type: 'choice',
      scene: 'tea',
      speaker: 'Shopkeeper',
      speakerColor: '#4A9EFF',
      prompt: 'The shopkeeper asks: "Do you like tea?" What does Bilal say?',
      options: ['"Yes, I like tea very much!"', '"I do not drink tea. I drink water."'],
      acks: [
        '"Yes, I like tea very much!" Bilal says with a smile. The shopkeeper laughs. "Good! Tea is good for the morning. Sit down, friend!"',
        '"I do not drink tea. I drink water." The shopkeeper nods. "Good English! You use \'do not\' very well. Here is your cold water!"',
      ],
    },
    {
      type: 'panel',
      scene: 'evening',
      speaker: 'Shopkeeper',
      speakerColor: '#4A9EFF',
      text: '"Come again, friend! Your English is good. Every day you speak — every day you learn. You will go far!"',
    },
    {
      type: 'panel',
      scene: 'street',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      text: 'Bilal walks home. He used real English words today — want, need, have, like, good, water, food, money. He is happy. Tomorrow he will come back.',
    },
  ],
}

const STORY_MODULE_3: Story = {
  title: 'The New Office',
  subtitle: 'Bilal introduces himself using the SVO formula',
  nodes: [
    {
      type: 'panel',
      scene: 'street',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      text: 'Bilal starts a new job today. He walks into the office. He sees many people. He needs to introduce himself in English.',
    },
    {
      type: 'panel',
      scene: 'shop',
      speaker: 'Colleague',
      speakerColor: '#4A9EFF',
      text: '"Hello! I am Sara. I work in this office. Are you new here today?"',
    },
    {
      type: 'choice',
      scene: 'shop',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      prompt: 'How does Bilal introduce himself?',
      options: ['"Hello! I am Bilal. I work in accounts."', '"My name is Bilal. I am a new employee."'],
      acks: [
        '"Hello! I am Bilal. I work in accounts." Sara smiles. "Welcome, Bilal! You speak good English. The SVO formula works perfectly!"',
        '"My name is Bilal. I am a new employee." "Great introduction!" says Sara. "Subject + Verb + Object — you did it!"',
      ],
    },
    {
      type: 'panel',
      scene: 'shop',
      speaker: 'Sara',
      speakerColor: '#4A9EFF',
      text: '"I do not live far from here. Do you live in this area? The office is in a good place."',
    },
    {
      type: 'choice',
      scene: 'shop',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      prompt: 'Bilal wants to ask Sara a question. What does he say?',
      options: ['"Do you like working here?"', '"Is this your office?"'],
      acks: [
        '"Do you like working here?" Bilal asks. Sara nods. "Yes, I like it very much! Good question — that is a question sentence!"',
        '"Is this your office?" Bilal asks. "Yes, it is!" Sara says. "Good question! You used the question formula correctly."',
      ],
    },
    {
      type: 'panel',
      scene: 'evening',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      text: 'Bilal goes home happy. He made three types of sentences today: positive, negative, and question. The SVO formula worked perfectly.',
    },
  ],
}

const STORY_MODULE_4: Story = {
  title: 'Yesterday, Today, Tomorrow',
  subtitle: 'Bilal travels through the three tenses',
  nodes: [
    {
      type: 'panel',
      scene: 'home',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      text: 'Bilal\'s friend Ali sends him a message: "What did you do yesterday? What are you doing now? What will you do tomorrow?"',
    },
    {
      type: 'choice',
      scene: 'home',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      prompt: 'How does Bilal reply about yesterday?',
      options: ['"Yesterday I went to the market with my family."', '"Yesterday I was at home. I read my books."'],
      acks: [
        '"Yesterday I went to the market with my family." "Excellent past tense!" Ali replies. "You used \'went\' correctly — simple past!"',
        '"Yesterday I was at home. I read my books." "Perfect!" says Ali. "\'Was\' and \'read\' are past tense. You are learning fast!"',
      ],
    },
    {
      type: 'panel',
      scene: 'street',
      speaker: 'Ali',
      speakerColor: '#4A9EFF',
      text: '"And now? What are you doing right now? Tell me in present continuous tense!"',
    },
    {
      type: 'panel',
      scene: 'street',
      speaker: 'Bilal',
      speakerColor: '#2ECC71',
      text: '"Right now I am studying English. I am learning the three tenses. I am getting better every day!"',
    },
    {
      type: 'choice',
      scene: 'evening',
      speaker: 'Ali',
      speakerColor: '#4A9EFF',
      prompt: 'Ali asks: "And tomorrow? What will you do?" How does Bilal answer?',
      options: ['"Tomorrow I will practice English for one hour."', '"Tomorrow I will go to the market and speak English."'],
      acks: [
        '"Tomorrow I will practice English for one hour." "Perfect future tense!" Ali replies. "\'Will practice\' — you are a natural!"',
        '"Tomorrow I will go to the market and speak English." Ali laughs. "Excellent! Past, present, future — you know all three. Well done!"',
      ],
    },
    {
      type: 'panel',
      scene: 'home',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      text: 'Bilal puts down his phone. He used past tense for yesterday, present continuous for now, and future tense for tomorrow. Three tenses — mastered.',
    },
  ],
}

const STORY_MODULE_5: Story = {
  title: 'The Karachi Interview',
  subtitle: 'Bilal navigates a professional conversation',
  nodes: [
    {
      type: 'panel',
      scene: 'shop',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      text: 'Bilal walks into a big office building in Karachi. Today is his job interview. His heart is beating fast but he is ready.',
    },
    {
      type: 'panel',
      scene: 'shop',
      speaker: 'Interviewer',
      speakerColor: '#4A9EFF',
      text: '"Good morning! Please sit down. Tell me about yourself — your experience and why you want this job."',
    },
    {
      type: 'choice',
      scene: 'shop',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      prompt: 'How does Bilal begin his introduction?',
      options: ['"My name is Bilal Ahmed. I have worked in sales for two years."', '"I am Bilal. I am looking for a good job where I can grow."'],
      acks: [
        '"My name is Bilal Ahmed. I have worked in sales for two years." The interviewer nods and writes something. "Excellent! Clear and professional. Please continue."',
        '"I am Bilal. I am looking for a good job where I can grow." "Good start!" says the interviewer. "Tell me more about your experience and skills."',
      ],
    },
    {
      type: 'panel',
      scene: 'shop',
      speaker: 'Interviewer',
      speakerColor: '#4A9EFF',
      text: '"Why do you want to join our company? What makes you different from other candidates?"',
    },
    {
      type: 'choice',
      scene: 'shop',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      prompt: 'Bilal answers the question. What does he say?',
      options: ['"I admire your company\'s reputation. My goal is to contribute to your team."', '"I want this job because I need to grow my career and learn new skills."'],
      acks: [
        '"I admire your company\'s reputation. My goal is to contribute to your team." The interviewer smiles. "That is a strong and professional answer. Well done."',
        '"I want this job because I need to grow my career and learn new skills." "Honest and clear!" says the interviewer. "I like your confidence. You speak English very well."',
      ],
    },
    {
      type: 'panel',
      scene: 'evening',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      text: 'Bilal walks out of the office with a big smile. His English was clear, professional, and confident. This is what 300 days of practice builds.',
    },
  ],
}

const STORY_MODULE_6: Story = {
  title: 'The Final Test',
  subtitle: 'Bilal speaks English with complete confidence',
  nodes: [
    {
      type: 'panel',
      scene: 'shop',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      text: 'Six months have passed. Bilal stands at the front of a conference room. He is presenting his project to his company in English.',
    },
    {
      type: 'panel',
      scene: 'shop',
      speaker: 'Bilal',
      speakerColor: '#2ECC71',
      text: '"Good morning, everyone. I have prepared a presentation about our sales strategy for next year. Let me walk you through the key points."',
    },
    {
      type: 'choice',
      scene: 'shop',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      prompt: 'A colleague asks: "Bilal, how confident do you feel speaking English now?"',
      options: ['"I feel very confident. I practiced every day for six months."', '"I am still learning, but I am much more comfortable now than before."'],
      acks: [
        '"I feel very confident. I practiced every day for six months." The room applauds. "That is the power of consistency," says his manager. "Excellent work, Bilal."',
        '"I am still learning, but I am much more comfortable now than before." His colleagues smile. "That is wisdom," says his manager. "The best learners never stop growing."',
      ],
    },
    {
      type: 'panel',
      scene: 'evening',
      speaker: 'Manager',
      speakerColor: '#4A9EFF',
      text: '"Six months ago you were afraid to speak English. Today you presented to the entire company. You are an inspiration to everyone here."',
    },
    {
      type: 'panel',
      scene: 'home',
      speaker: 'Narrator',
      speakerColor: '#6A6A8A',
      text: 'That night, Bilal opens his phone and sees Day 1 of his English journey. He remembers writing A, E, I, O, U for the first time. From vowels to vocabulary to fluency — one step at a time.',
    },
  ],
}

const STORIES: Record<string, Story> = {
  '1_1': STORY_MODULE_1,
  '1_2': STORY_MODULE_2,
  '1_3': STORY_MODULE_3,
  '1_4': STORY_MODULE_4,
  '1_5': STORY_MODULE_5,
  '1_6': STORY_MODULE_6,
}

export function getStory(level: number, module: number): Story {
  const key = `${level}_${module}`
  return STORIES[key] ?? STORY_MODULE_2
}
