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
  classroom: 'linear-gradient(135deg, #0f2044 0%, #1a3a7a 100%)',
  market:    'linear-gradient(135deg, #3a1a00 0%, #6b3a10 100%)',
  home:      'linear-gradient(135deg, #0a2a1a 0%, #1a4a2a 100%)',
  street:    'linear-gradient(135deg, #1a1a2a 0%, #3a3a5a 100%)',
  office:    'linear-gradient(135deg, #0a0a2a 0%, #1a2a4a 100%)',
  restaurant:'linear-gradient(135deg, #2a0a0a 0%, #5a1a1a 100%)',
  hospital:  'linear-gradient(135deg, #0a2a2a 0%, #1a4a4a 100%)',
  park:      'linear-gradient(135deg, #0a2a0a 0%, #1a5a2a 100%)',
  university:'linear-gradient(135deg, #1a0a2a 0%, #3a1a5a 100%)',
  airport:   'linear-gradient(135deg, #0a1a2a 0%, #1a3a5a 100%)',
  stage:     'linear-gradient(135deg, #2a1a0a 0%, #5a2a0a 100%)',
  bank:      'linear-gradient(135deg, #0a1a0a 0%, #1a3a2a 100%)',
}

/* ─────────────────────────────────────────────────────────────────────
   All stories keyed by "level-module"
───────────────────────────────────────────────────────────────────── */
const STORIES: Record<string, Story> = {

  /* ── LEVEL 1 — BASE CAMP ── */

  '1-1': {
    title: 'Pehli Mulaqat',
    subtitle: 'Bilal pehli baar Ali se milta hai — Level 1, Module 1',
    nodes: [
      { type: 'panel', scene: 'street', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Bilal walks to school on a Monday morning. He sees a new boy standing alone near the gate.' },
      { type: 'panel', scene: 'street', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'Hello! My name is Bilal. What is your name?' },
      { type: 'panel', scene: 'street', speaker: 'Ali', speakerColor: '#34d399',
        text: 'Hi! I am Ali. Nice to meet you, Bilal!' },
      { type: 'choice', scene: 'street', speaker: 'Bilal', speakerColor: '#60a5fa',
        prompt: 'What does Bilal ask next?',
        options: ['Where are you from, Ali?', 'What is A for?'],
        acks: [
          'Good question! Ali says: "I am from Lahore. A is for Ali — that is my name!"',
          'Ha ha! Ali laughs and says: "A is for Ali — and B is for Bilal!"',
        ] },
      { type: 'panel', scene: 'street', speaker: 'Ali', speakerColor: '#34d399',
        text: 'English has 26 letters — A B C D E F G... Do you know all of them, Bilal?' },
      { type: 'panel', scene: 'street', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'Yes! A E I O U are vowels. The rest are consonants. I learned that today!' },
      { type: 'panel', scene: 'street', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Great work! You learned: Hello, My name is, Nice to meet you, 26 letters, vowels and consonants.' },
    ],
  },

  '1-2': {
    title: 'Bazaar Mein',
    subtitle: 'Ali aur Bilal market jaate hain — Level 1, Module 2',
    nodes: [
      { type: 'panel', scene: 'market', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Ali and Bilal go to the market on Saturday. The market is very colourful and busy.' },
      { type: 'panel', scene: 'market', speaker: 'Ali', speakerColor: '#34d399',
        text: 'Look, Bilal! Red apples, yellow bananas, orange mangoes. I love fruit!' },
      { type: 'panel', scene: 'market', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'My mother needs tomatoes and potatoes. Let us find a vegetable shop.' },
      { type: 'choice', scene: 'market', speaker: 'Shopkeeper', speakerColor: '#f59e0b',
        prompt: 'The shopkeeper asks: "How many tomatoes do you want?"',
        options: ['I want ten tomatoes, please.', 'Tomatoes are red.'],
        acks: [
          'Perfect! "Ten tomatoes — here you go! That will be fifty rupees."',
          'The shopkeeper smiles: "Yes they are red! How many do you want?"',
        ] },
      { type: 'panel', scene: 'market', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'My father is a doctor. My mother is a teacher. They work very hard every day.' },
      { type: 'panel', scene: 'market', speaker: 'Ali', speakerColor: '#34d399',
        text: 'My sister is a student. My brother is an engineer. We are a big family!' },
      { type: 'panel', scene: 'market', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Well done! Today you used: colours, fruits, vegetables, family words and numbers.' },
    ],
  },

  '1-3': {
    title: 'Ghar Pe',
    subtitle: 'Bilal ghar mein apni family se milwata hai — Level 1, Module 3',
    nodes: [
      { type: 'panel', scene: 'home', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Ali visits Bilal\'s house for the first time. Bilal introduces his family.' },
      { type: 'panel', scene: 'home', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'Ali, this is my mother. She is a teacher. She teaches English at school.' },
      { type: 'panel', scene: 'home', speaker: 'Bilal\'s Mother', speakerColor: '#a78bfa',
        text: 'Hello Ali! Welcome to our home. Please sit down. Are you hungry?' },
      { type: 'choice', scene: 'home', speaker: 'Ali', speakerColor: '#34d399',
        prompt: 'What does Ali say to Bilal\'s mother?',
        options: ['Thank you. Yes, I am a little hungry.', 'The table is in the room.'],
        acks: [
          'Perfect manners! Bilal\'s mother smiles: "Great! I will make rice and tea for you."',
          'Bilal laughs: "Ali means to say — thank you, yes he is hungry!"',
        ] },
      { type: 'panel', scene: 'home', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'In our house we have a table, four chairs, a bed, a fan and a window. It is a simple but happy home.' },
      { type: 'panel', scene: 'home', speaker: 'Ali', speakerColor: '#34d399',
        text: 'I like your home, Bilal. It is clean and bright. The door is brown and the walls are white.' },
      { type: 'panel', scene: 'home', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Excellent! You used SVO sentences, pronouns (he/she/it/we), am/is/are and home vocabulary.' },
    ],
  },

  '1-4': {
    title: 'School Ka Pehla Din',
    subtitle: 'Nayi class, naye dost — Level 1, Module 4',
    nodes: [
      { type: 'panel', scene: 'classroom', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'It is Monday. Bilal and Ali are in their new classroom. The teacher walks in.' },
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Good morning, class! Today is the first day. I am your English teacher. My name is Miss Sara.' },
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Let us start. Bilal, what day is today?' },
      { type: 'choice', scene: 'classroom', speaker: 'Bilal', speakerColor: '#60a5fa',
        prompt: 'How does Bilal answer?',
        options: ['Today is Monday, Miss.', 'Today is twenty.'],
        acks: [
          'Excellent, Bilal! Miss Sara says: "Very good! And tomorrow will be Tuesday."',
          'Miss Sara smiles: "A number is not a day! The answer is Monday."',
        ] },
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Good. Now, Ali — what is your phone number?' },
      { type: 'panel', scene: 'classroom', speaker: 'Ali', speakerColor: '#34d399',
        text: 'My number is zero-three-zero-zero, one-two-three, four-five-six. That is my phone number, Miss.' },
      { type: 'panel', scene: 'classroom', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Well done! You used: days of the week, numbers 1-100, greetings and self-introduction.' },
    ],
  },

  /* ── LEVEL 2 — VILLAGE ── */

  '2-1': {
    title: 'Abhi Kya Ho Raha Hai?',
    subtitle: 'Present tense ki duniya — Level 2, Module 1',
    nodes: [
      { type: 'panel', scene: 'home', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'It is Sunday morning. Bilal calls Ali. They talk about what everyone is doing right now.' },
      { type: 'panel', scene: 'home', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'Hello Ali! What are you doing?' },
      { type: 'panel', scene: 'home', speaker: 'Ali', speakerColor: '#34d399',
        text: 'I am reading a book. My sister is cooking in the kitchen. My father is watching TV.' },
      { type: 'choice', scene: 'home', speaker: 'Bilal', speakerColor: '#60a5fa',
        prompt: 'Bilal asks: "Can you come to the park?"',
        options: ['Yes, I can come! I am finishing my book now.', 'I cannot swim.'],
        acks: [
          'Ali says: "Great! I will be there in twenty minutes."',
          'Bilal laughs: "The park has no water! Can you walk there?"',
        ] },
      { type: 'panel', scene: 'park', speaker: 'Ali', speakerColor: '#34d399',
        text: 'Look at the children! They are running and playing. Some are sitting under the trees.' },
      { type: 'panel', scene: 'park', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'I usually go to the park on Sundays. I always feel happy here. I never miss it!' },
      { type: 'panel', scene: 'park', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Excellent! You practised: am/is/are + ing, can/cannot, always/usually/never.' },
    ],
  },

  '2-2': {
    title: 'Kal Kya Hua?',
    subtitle: 'Past tense ki kahani — Level 2, Module 2',
    nodes: [
      { type: 'panel', scene: 'classroom', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Monday morning. Miss Sara asks the class about their weekend.' },
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Good morning! What did you do on the weekend? Bilal, tell the class.' },
      { type: 'panel', scene: 'classroom', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'On Saturday I went to the market with Ali. We bought mangoes and bananas. Then we ate lunch at home.' },
      { type: 'choice', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        prompt: 'Miss Sara asks: "Did you study English this weekend?"',
        options: ['Yes, I studied for two hours on Sunday.', 'I go to school yesterday.'],
        acks: [
          '"Wonderful, Bilal! Two hours is excellent. Keep it up!"',
          '"Almost right! We say: I went to school yesterday — past tense."',
        ] },
      { type: 'panel', scene: 'classroom', speaker: 'Ali', speakerColor: '#34d399',
        text: 'Yesterday I woke up at seven. I had breakfast, then I walked to the library. I read three books!' },
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Very good, Ali! Remember: go → went, eat → ate, have → had, wake → woke. These are irregular verbs.' },
      { type: 'panel', scene: 'classroom', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Great job! You used: past simple regular (-ed) and irregular verbs, and did/did not.' },
    ],
  },

  '2-3': {
    title: 'Kal Kya Hoga?',
    subtitle: 'Future plans ki baat — Level 2, Module 3',
    nodes: [
      { type: 'panel', scene: 'home', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'It is Friday evening. Bilal and his family are making plans for the weekend.' },
      { type: 'panel', scene: 'home', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'Tomorrow I am going to study for three hours. Then I will play cricket with Ali in the evening.' },
      { type: 'panel', scene: 'home', speaker: 'Bilal\'s Mother', speakerColor: '#a78bfa',
        text: 'Good plan! I am going to cook biryani for lunch. Your father will come home early.' },
      { type: 'choice', scene: 'home', speaker: 'Bilal', speakerColor: '#60a5fa',
        prompt: 'Bilal asks: "Might it rain tomorrow, Ammi?"',
        options: ['Yes, it might rain. You should take an umbrella.', 'Tomorrow will be a day.'],
        acks: [
          '"Smart thinking! Always be prepared. You must take your umbrella."',
          '"Ha ha! Every tomorrow is a day. But check the weather forecast!"',
        ] },
      { type: 'panel', scene: 'home', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'I will message Ali. "Hey Ali — will you play cricket tomorrow? We should meet at four o\'clock."' },
      { type: 'panel', scene: 'home', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Well done! You practised: will, going to, might, should and must for future and advice.' },
    ],
  },

  '2-4': {
    title: 'Dukaan Pe',
    subtitle: 'Shopping aur conversations — Level 2, Module 4',
    nodes: [
      { type: 'panel', scene: 'market', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Bilal goes to buy a new school bag. He enters a shop and speaks with the shopkeeper.' },
      { type: 'panel', scene: 'market', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'Excuse me. I am looking for a school bag. Do you have any?' },
      { type: 'panel', scene: 'market', speaker: 'Shopkeeper', speakerColor: '#f59e0b',
        text: 'Yes, of course! We have blue bags, black bags and red bags. Which colour do you like?' },
      { type: 'choice', scene: 'market', speaker: 'Bilal', speakerColor: '#60a5fa',
        prompt: 'What does Bilal say?',
        options: ['I would like the blue one, please. How much does it cost?', 'The bag is big.'],
        acks: [
          '"Good choice! The blue bag costs eight hundred rupees. It is very strong."',
          '"Yes it is big! But which colour would you like to buy?"',
        ] },
      { type: 'panel', scene: 'market', speaker: 'Shopkeeper', speakerColor: '#f59e0b',
        text: 'Here you go! Would you like a receipt? Our shop is open from nine to nine every day.' },
      { type: 'panel', scene: 'market', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'Yes please. Thank you very much. Have a nice day!' },
      { type: 'panel', scene: 'market', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Excellent! You used: asking prices, I would like, excuse me, please and thank you.' },
    ],
  },

  '2-5': {
    title: 'Grammar Village Gate',
    subtitle: 'Teen tenses ka imtihan — Level 2, Module 5',
    nodes: [
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Welcome to the Level 2 Gate! Let us review everything. I will ask questions — you answer.' },
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Bilal, use present tense: "What do you do every morning?"' },
      { type: 'panel', scene: 'classroom', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'Every morning I wake up at six. I brush my teeth, have breakfast and walk to school.' },
      { type: 'choice', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        prompt: '"Now past tense — What did you do last Sunday?"',
        options: ['I played cricket, studied English and helped my mother.', 'I will play cricket.'],
        acks: [
          '"Perfect past tense! Played, studied, helped — all correct!"',
          '"That is future tense! Past tense: I played, I studied, I helped."',
        ] },
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: '"Last question — future tense: What will you do after this level?"' },
      { type: 'panel', scene: 'classroom', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'I will study Level 3 — Town. I am going to learn all twelve tenses and five hundred new words!' },
      { type: 'panel', scene: 'classroom', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Level 2 Gate cleared! You have mastered present, past and future tenses. Welcome to Level 3!' },
    ],
  },

  /* ── LEVEL 3 — TOWN ── */

  '3-1': {
    title: 'Barah Tenses Ki Kahani',
    subtitle: 'All 12 tenses ek jagah — Level 3, Module 1',
    nodes: [
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Today we will travel through time using all twelve English tenses. Are you ready?' },
      { type: 'panel', scene: 'classroom', speaker: 'Sara', speakerColor: '#f472b6',
        text: 'I study English every day. (Simple Present) I am studying right now. (Present Continuous)' },
      { type: 'panel', scene: 'classroom', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'I have studied for an hour. (Present Perfect) I have been studying since morning. (Present Perfect Continuous)' },
      { type: 'choice', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        prompt: '"Past tenses — Ali, can you give examples?"',
        options: ['I studied yesterday. I was studying when you called.', 'I will study tomorrow.'],
        acks: [
          '"Brilliant! Past Simple + Past Continuous — both correct!"',
          '"That is future tense! Past: I studied, I was studying, I had studied."',
        ] },
      { type: 'panel', scene: 'classroom', speaker: 'Ali', speakerColor: '#34d399',
        text: 'I had studied before the exam. (Past Perfect) I had been studying for hours. (Past Perfect Continuous)' },
      { type: 'panel', scene: 'classroom', speaker: 'Sara', speakerColor: '#f472b6',
        text: 'I will study tomorrow. (Simple Future) By evening I will have studied five chapters. (Future Perfect)' },
      { type: 'panel', scene: 'classroom', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Amazing! 12 tenses: 4 Present + 4 Past + 4 Future. You can travel through all of time in English!' },
    ],
  },

  '3-2': {
    title: 'Paanch Sau Alfaaz',
    subtitle: '500 words ki duniya — Level 3, Module 2',
    nodes: [
      { type: 'panel', scene: 'park', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Bilal and Sara sit in the park and talk about health, education and technology.' },
      { type: 'panel', scene: 'park', speaker: 'Sara', speakerColor: '#f472b6',
        text: 'I am feeling excited about my exams! If I pass, I will get a degree in computer science.' },
      { type: 'panel', scene: 'park', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'That is amazing! You should exercise too — a healthy body helps a healthy mind.' },
      { type: 'choice', scene: 'park', speaker: 'Sara', speakerColor: '#f472b6',
        prompt: 'Sara asks: "Do you use technology to study English?"',
        options: ['Yes! I use apps, websites and podcasts every day.', 'Technology is a computer.'],
        acks: [
          '"Me too! Apps, websites, videos — they all help so much. Bilal you are smart!"',
          '"Ha ha! Technology is much more — it is everything digital that helps us!"',
        ] },
      { type: 'panel', scene: 'park', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'I want to be a doctor one day. I am tired of studying sometimes, but I feel proud when I understand new things.' },
      { type: 'panel', scene: 'park', speaker: 'Sara', speakerColor: '#f472b6',
        text: 'I am nervous about speaking English at first, but now I am surprised by my own progress!' },
      { type: 'panel', scene: 'park', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Excellent! You used emotion words, health vocabulary, education and technology terms.' },
    ],
  },

  '3-3': {
    title: 'Bilal Ki Kahani',
    subtitle: 'Ek maqsad wali zindagi — Level 3, Module 3',
    nodes: [
      { type: 'panel', scene: 'home', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Bilal writes in his journal. He tells the story of why he started learning English.' },
      { type: 'panel', scene: 'home', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'Once upon a time, I could not speak a single word of English. I was shy and afraid to try.' },
      { type: 'panel', scene: 'home', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'Then one day my uncle visited from abroad. He spoke only English. I could not understand him at all.' },
      { type: 'choice', scene: 'home', speaker: 'Bilal', speakerColor: '#60a5fa',
        prompt: 'What did Bilal decide that day?',
        options: ['I decided I would learn English no matter what.', 'I decided to sleep.'],
        acks: [
          '"That was the turning point! From that day, Bilal studied every single day."',
          '"Ha! No — Bilal was too determined to sleep. He opened a book immediately!"',
        ] },
      { type: 'panel', scene: 'home', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'Suddenly, after months of hard work, I realised I could understand English movies, songs and books!' },
      { type: 'panel', scene: 'home', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'Finally, I spoke to my uncle on the phone — completely in English. He was amazed. I was proud.' },
      { type: 'panel', scene: 'home', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Wonderful narrative! You used: once upon a time, then, suddenly, finally — story connectors.' },
    ],
  },

  '3-4': {
    title: 'Akhbaar Ki Duniya',
    subtitle: 'Reading aur comprehension — Level 3, Module 4',
    nodes: [
      { type: 'panel', scene: 'home', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Bilal reads an English newspaper for the first time. He tries to understand every paragraph.' },
      { type: 'panel', scene: 'home', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'The headline says: "New school opens in the city — two hundred students enrolled on day one."' },
      { type: 'panel', scene: 'home', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'The article says the principal announced that she was very happy with the response from parents.' },
      { type: 'choice', scene: 'home', speaker: 'Bilal', speakerColor: '#60a5fa',
        prompt: 'What is the main idea of this article?',
        options: ['A new school opened and many students joined.', 'The principal is tall.'],
        acks: [
          '"Exactly! The main idea is always the most important point. Well read!"',
          '"The principal\'s height is not important here! Focus on the key event."',
        ] },
      { type: 'panel', scene: 'home', speaker: 'Ali', speakerColor: '#34d399',
        text: 'Bilal, reading English every day is the best way to improve. I read for fifteen minutes each night.' },
      { type: 'panel', scene: 'home', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'I agree. The teacher said that if we read regularly, we will improve our vocabulary and grammar together.' },
      { type: 'panel', scene: 'home', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Brilliant! You used reported speech, conditionals and comprehension skills.' },
    ],
  },

  '3-5': {
    title: 'Town Gate — Shahar Ka Imtihan',
    subtitle: 'Level 3 complete — Level 3, Module 5',
    nodes: [
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'The Town Gate test begins. You have learned 12 tenses, 500 words, stories and reading. Impressive!' },
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: '"Bilal, write a sentence using the present perfect tense."' },
      { type: 'panel', scene: 'classroom', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"I have studied English for three months and I have learned five hundred new words so far."' },
      { type: 'choice', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        prompt: '"Now Sara — use a conditional sentence."',
        options: ['If I study hard, I will pass the gate test easily!', 'I will study conditional.'],
        acks: [
          '"Perfect conditional! Real condition + future result. Brilliant, Sara!"',
          '"Almost! A conditional has two parts: If... then... Try again!"',
        ] },
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Excellent work everyone. Town level complete. The City gates are opening for you!' },
      { type: 'panel', scene: 'classroom', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Level 3 — Town cleared! You have 12 tenses, 500 words and reading skills. Enter Level 4 — City!' },
    ],
  },

  /* ── LEVEL 4 — CITY ── */

  '4-1': {
    title: 'Likhai Ki Duniya',
    subtitle: 'Writing skills ka safar — Level 4, Module 1',
    nodes: [
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Welcome to Level 4! Today we focus on writing. A good paragraph has a topic sentence, details and a conclusion.' },
      { type: 'panel', scene: 'classroom', speaker: 'Sara', speakerColor: '#f472b6',
        text: 'I wrote an essay about my hometown. However, my teacher said I need more linking words.' },
      { type: 'panel', scene: 'classroom', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'I can help! Use: However, Therefore, Moreover, In addition, As a result. These connect your ideas perfectly.' },
      { type: 'choice', scene: 'classroom', speaker: 'Sara', speakerColor: '#f472b6',
        prompt: 'Sara writes: "I love my city. _____, it is very crowded sometimes."',
        options: ['However, it is very crowded sometimes.', 'Therefore, it is very crowded sometimes.'],
        acks: [
          '"Correct! However shows contrast. City is good BUT also crowded — perfect!"',
          '"Therefore shows result, not contrast. However is the right connector here."',
        ] },
      { type: 'panel', scene: 'classroom', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"In my opinion, good writing is like building a house. Each paragraph is one strong wall."' },
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Beautiful metaphor, Bilal! Descriptive writing uses: adjectives, adverbs and sensory details — sight, sound, smell.' },
      { type: 'panel', scene: 'classroom', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Great progress! You learned: paragraph structure, linking words and descriptive writing techniques.' },
    ],
  },

  '4-2': {
    title: 'Khat Likhna',
    subtitle: 'Formal aur informal letters — Level 4, Module 2',
    nodes: [
      { type: 'panel', scene: 'office', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Bilal needs to write a formal letter to his school principal requesting a day off.' },
      { type: 'panel', scene: 'office', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'I start with the date, my address and the address of the school. Then: "Dear Sir/Madam,"' },
      { type: 'panel', scene: 'office', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"I am writing to respectfully request one day\'s leave on Friday 25th April due to a family wedding."' },
      { type: 'choice', scene: 'office', speaker: 'Bilal', speakerColor: '#60a5fa',
        prompt: 'How should Bilal end the formal letter?',
        options: ['Yours sincerely, Bilal Ahmed', 'Love, Bilal. PS — please say yes!'],
        acks: [
          '"Yours sincerely" — professional and correct for a formal letter. Well done!',
          '"Love" is only for informal letters to friends and family — never for formal!',
        ] },
      { type: 'panel', scene: 'home', speaker: 'Ali', speakerColor: '#34d399',
        text: 'Now write me an informal letter! Start with "Hi Ali!" and end with "Your best friend, Bilal." Much warmer!' },
      { type: 'panel', scene: 'home', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'Formal letters use: I am writing to, I would like to, Yours sincerely. Informal: Hey, Thanks a lot, Take care!' },
      { type: 'panel', scene: 'home', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Perfect! You mastered formal and informal letters — the tone, structure and vocabulary differ completely.' },
    ],
  },

  '4-3': {
    title: 'Mushkil Jumle',
    subtitle: 'Complex sentences ka jadoo — Level 4, Module 3',
    nodes: [
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Simple sentences are good. But complex sentences show advanced thinking. Let us level up!' },
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Relative clauses add detail. "The student WHO studied hard PASSED the exam." WHO refers to student.' },
      { type: 'panel', scene: 'classroom', speaker: 'Sara', speakerColor: '#f472b6',
        text: 'And conditionals! "Not only did Bilal study, but he also practised speaking every morning."' },
      { type: 'choice', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        prompt: '"Complete: The book _____ I am reading _____ very interesting."',
        options: ['that / is', 'who / are'],
        acks: [
          '"That is / is" — perfect! "That" refers to things, "who" refers to people.',
          '"Who" is for people, not books! Use "that" or "which" for things.',
        ] },
      { type: 'panel', scene: 'classroom', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"Although it was raining heavily, Bilal went to school because he never missed a class."' },
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Although, because, when, while, unless, until, even though — these make complex sentences rich!' },
      { type: 'panel', scene: 'classroom', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Excellent! You learned: relative clauses (who/that/which), subordinating conjunctions and complex structures.' },
    ],
  },

  '4-4': {
    title: 'Stage Pe Kharo',
    subtitle: 'Speaking confidence ka raaz — Level 4, Module 4',
    nodes: [
      { type: 'panel', scene: 'stage', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Bilal has to give a speech at school. He is nervous. Ali helps him prepare.' },
      { type: 'panel', scene: 'home', speaker: 'Ali', speakerColor: '#34d399',
        text: 'The secret is: speak to your mirror every morning for five minutes. Talk about your day. No notes!' },
      { type: 'panel', scene: 'home', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"Now I am making tea. I am putting water in the kettle. The water is heating up..." This is self-talk!' },
      { type: 'choice', scene: 'stage', speaker: 'Bilal', speakerColor: '#60a5fa',
        prompt: 'On stage, Bilal forgets a word. What should he do?',
        options: ['Pause, breathe, continue with simple words.', 'Run off the stage immediately.'],
        acks: [
          '"Exactly! Pause... breathe... continue. Fluency comes from confidence not perfection."',
          '"Never run! Every speaker forgets words sometimes. The pause is your friend."',
        ] },
      { type: 'panel', scene: 'stage', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"In my opinion, English opens doors. I believe that practice makes perfect. From my point of view..."' },
      { type: 'panel', scene: 'stage', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: '"In my opinion / I believe / I think / From my point of view" — express opinions with confidence!' },
    ],
  },

  '4-5': {
    title: 'Ibaarat Ka Jadoo',
    subtitle: 'Idioms aur phrases — Level 4, Module 5',
    nodes: [
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Idioms make English colourful! "Break a leg" does not mean your leg breaks — it means "good luck!"' },
      { type: 'panel', scene: 'classroom', speaker: 'Ali', speakerColor: '#34d399',
        text: '"Hit the sack" means go to sleep. "Piece of cake" means something easy. "Under the weather" means sick.' },
      { type: 'panel', scene: 'classroom', speaker: 'Sara', speakerColor: '#f472b6',
        text: '"Burn the midnight oil" — that is me before exams! It means working or studying very late at night.' },
      { type: 'choice', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        prompt: '"The exam was a piece of cake!" What does this mean?',
        options: ['The exam was very easy.', 'Someone brought cake to the exam.'],
        acks: [
          '"Perfect! Piece of cake = something very easy. Well understood!"',
          '"Ha! No food allowed in exams! It means the exam was easy — idiomatic meaning."',
        ] },
      { type: 'panel', scene: 'classroom', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"Keep your chin up" — stay positive. "The ball is in your court" — it is your decision now.' },
      { type: 'panel', scene: 'classroom', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Brilliant! Idioms give your English personality. Learn 5 per week and use them in conversation!' },
    ],
  },

  '4-6': {
    title: 'City Gate — Darul Hukumat Ki Taraf',
    subtitle: 'Level 4 complete — Level 4, Module 6',
    nodes: [
      { type: 'panel', scene: 'stage', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Level 4 Gate! Sixty days of writing, letters, complex sentences, speaking and idioms. You have come so far!' },
      { type: 'panel', scene: 'stage', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"Ladies and gentlemen, today I will speak for three minutes without any notes." — Bilal begins his speech.' },
      { type: 'panel', scene: 'stage', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"English is not merely a language — it is a key that opens the doors of opportunity worldwide."' },
      { type: 'choice', scene: 'stage', speaker: 'Teacher', speakerColor: '#f59e0b',
        prompt: 'Bilal writes a formal email. How does he begin?',
        options: ['Dear Mr Khan, I am writing to request...', 'Hey Mr Khan, I want to request...'],
        acks: [
          '"Dear Mr Khan, I am writing to..." — perfect formal register! Professional and clear.',
          '"Hey" is far too informal for a formal email! Always use "Dear" in professional context.',
        ] },
      { type: 'panel', scene: 'stage', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Level 4 — City CLEARED! Writing, speaking, letters and idioms mastered. Level 5 — Capital awaits!' },
    ],
  },

  /* ── LEVEL 5 — CAPITAL ── */

  '5-1': {
    title: 'Grammar Ka Qila',
    subtitle: 'Advanced grammar ki gehraai — Level 5, Module 1',
    nodes: [
      { type: 'panel', scene: 'university', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Bilal is now at university level English. The structures are more complex but incredibly powerful.' },
      { type: 'panel', scene: 'university', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Inversion for emphasis: instead of "I have never seen such beauty" we can say — "Never have I seen such beauty!"' },
      { type: 'panel', scene: 'university', speaker: 'Sara', speakerColor: '#f472b6',
        text: 'Mixed conditionals! "If I had studied harder in school, I would be a doctor now." Past unreal + present result.' },
      { type: 'choice', scene: 'university', speaker: 'Teacher', speakerColor: '#f59e0b',
        prompt: '"Rarely _____ he arrive on time." Which word completes the inversion?',
        options: ['does', 'do'],
        acks: [
          '"Rarely does he arrive — correct! Subject-auxiliary inversion after negative adverbs."',
          '"Close! With he/she/it we use does in questions and inversions, not do."',
        ] },
      { type: 'panel', scene: 'university', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'Cleft sentences add focus: "It was Ali who broke the window" — not Bilal, specifically Ali.' },
      { type: 'panel', scene: 'university', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Future Perfect: "By next year, I will have completed my degree." The action finishes before a future point.' },
      { type: 'panel', scene: 'university', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Advanced grammar unlocked! Inversions, cleft sentences, mixed conditionals, Future Perfect — mastered!' },
    ],
  },

  '5-2': {
    title: 'Passive Voice Ka Jadoo',
    subtitle: 'Academic writing ki taaqat — Level 5, Module 2',
    nodes: [
      { type: 'panel', scene: 'office', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Bilal is writing an academic essay. His professor says he must use passive voice more.' },
      { type: 'panel', scene: 'office', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Active: "Scientists discovered a new planet." Passive: "A new planet was discovered by scientists."' },
      { type: 'panel', scene: 'office', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'In academic writing we often omit "by scientists" — "A new planet was discovered." Sounds more formal!' },
      { type: 'choice', scene: 'office', speaker: 'Teacher', speakerColor: '#f59e0b',
        prompt: 'Make this passive: "They have completed the project."',
        options: ['The project has been completed.', 'The project was completing.'],
        acks: [
          '"The project has been completed" — perfect present perfect passive! Excellent command.',
          '"Was completing" is past continuous, not passive. Use: has been completed."',
        ] },
      { type: 'panel', scene: 'office', speaker: 'Sara', speakerColor: '#f472b6',
        text: '"The report will be submitted by Friday." "The results were analysed carefully." Passive is everywhere in formal writing.' },
      { type: 'panel', scene: 'office', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Passive voice mastered! is/am/are/was/were/has been/will be + past participle — the academic power formula.' },
    ],
  },

  '5-3': {
    title: 'Ibaarat Ki Duniya',
    subtitle: 'Native speaker idioms — Level 5, Module 3',
    nodes: [
      { type: 'panel', scene: 'office', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Bilal is in a business meeting. He hears idioms he has never encountered before.' },
      { type: 'panel', scene: 'office', speaker: 'Manager', speakerColor: '#f97316',
        text: '"Let\'s get the ball rolling on this project." "We need to touch base with the client by Friday."' },
      { type: 'panel', scene: 'office', speaker: 'Colleague', speakerColor: '#94a3b8',
        text: '"At the end of the day, what matters is the result." "Let\'s think outside the box on this one."' },
      { type: 'choice', scene: 'office', speaker: 'Manager', speakerColor: '#f97316',
        prompt: '"We should see eye to eye on the budget." What does this mean?',
        options: ['We should agree on the budget.', 'We should look at the budget carefully.'],
        acks: [
          '"See eye to eye = agree completely. Perfect understanding of business idiom!"',
          '"Close! Looking is literal. See eye to eye is figurative — it means to agree."',
        ] },
      { type: 'panel', scene: 'office', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"I will put my best foot forward in this presentation." — I will do my very best.' },
      { type: 'panel', scene: 'office', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Business idioms mastered! Get the ball rolling, touch base, think outside the box, see eye to eye.' },
    ],
  },

  '5-4': {
    title: 'Phrasal Verbs Ka Safar',
    subtitle: 'Top 20 phrasal verbs in context — Level 5, Module 4',
    nodes: [
      { type: 'panel', scene: 'office', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Sara\'s first day at a new job. Her manager explains the office rules using phrasal verbs.' },
      { type: 'panel', scene: 'office', speaker: 'Manager', speakerColor: '#f97316',
        text: '"Please fill out this form first. Then log in to your computer and set up your email account."' },
      { type: 'panel', scene: 'office', speaker: 'Manager', speakerColor: '#f97316',
        text: '"If you run into any problems, come to me. Do not give up if something is difficult at first."' },
      { type: 'choice', scene: 'office', speaker: 'Sara', speakerColor: '#f472b6',
        prompt: 'Sara asks: "Should I _____ up on the project we discussed?"',
        options: ['follow', 'give'],
        acks: [
          '"Follow up = to check progress. Yes! Please follow up on it every week."',
          '"Give up means to stop trying — definitely NOT that! Use follow up here."',
        ] },
      { type: 'panel', scene: 'office', speaker: 'Manager', speakerColor: '#f97316',
        text: '"Our team meetings are at nine. Never turn up late. Always speak up if you have an idea."' },
      { type: 'panel', scene: 'office', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Phrasal verbs: fill out, log in, set up, run into, give up, follow up, turn up, speak up — all in context!' },
    ],
  },

  '5-5': {
    title: 'Business Meeting',
    subtitle: 'Professional English ka amal — Level 5, Module 5',
    nodes: [
      { type: 'panel', scene: 'office', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Bilal presents his business proposal to a team. This is a high-stakes professional meeting.' },
      { type: 'panel', scene: 'office', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"Good morning everyone. Today I would like to present our Q3 strategy and revenue projections."' },
      { type: 'panel', scene: 'office', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"Our current revenue stands at five million. However, our analysis suggests a twenty percent growth is achievable."' },
      { type: 'choice', scene: 'office', speaker: 'Interviewer', speakerColor: '#a78bfa',
        prompt: 'A colleague asks: "Could you elaborate on the strategy?"',
        options: ['Certainly! The strategy involves three key phases...', 'I don\'t know, maybe.'],
        acks: [
          '"Certainly! The strategy involves..." — confident and professional. Excellent Bilal!',
          '"I don\'t know" in a business meeting is a confidence killer! Always say: Certainly / Of course.',
        ] },
      { type: 'panel', scene: 'office', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"To summarise, our proposal will maximise profit, minimise cost and strengthen client relationships."' },
      { type: 'panel', scene: 'office', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Business English mastered! Revenue, strategy, proposal, elaborate, summarise — professional vocabulary in action.' },
    ],
  },

  '5-6': {
    title: 'Capital Gate — World Stage Ki Taraf',
    subtitle: 'Level 5 complete — Level 5, Module 6',
    nodes: [
      { type: 'panel', scene: 'university', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'Level 5 Gate! Advanced grammar, passive voice, idioms, phrasal verbs and business English — all done!' },
      { type: 'panel', scene: 'university', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: '"IELTS Task 1 — describe this bar chart. The graph shows the population growth from 2000 to 2020."' },
      { type: 'panel', scene: 'university', speaker: 'Sara', speakerColor: '#f472b6',
        text: '"The graph illustrates that the population increased significantly, rising from five million to eight million."' },
      { type: 'choice', scene: 'university', speaker: 'Teacher', speakerColor: '#f59e0b',
        prompt: '"Now write a strong thesis for Task 2: Is technology harmful to society?"',
        options: ['While technology offers many benefits, its misuse poses significant risks to society.', 'Technology is good and bad.'],
        acks: [
          '"A balanced, sophisticated thesis! This would score IELTS Band 7+. Excellent!"',
          '"Too simple for IELTS! Show nuance: acknowledge both sides with academic language."',
        ] },
      { type: 'panel', scene: 'university', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Level 5 — Capital CLEARED! You are ready for the World Stage. Level 6 begins now!' },
    ],
  },

  /* ── LEVEL 6 — WORLD STAGE ── */

  '6-1': {
    title: 'Email Ki Duniya',
    subtitle: 'Professional emails — Level 6, Module 1',
    nodes: [
      { type: 'panel', scene: 'office', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Bilal applies for a job at an international company. He must write the perfect professional email.' },
      { type: 'panel', scene: 'office', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"Subject: Application for Marketing Manager Position — Bilal Ahmed"' },
      { type: 'panel', scene: 'office', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"Dear Mr Qureshi, I am writing to express my interest in the Marketing Manager role advertised on LinkedIn."' },
      { type: 'choice', scene: 'office', speaker: 'Bilal', speakerColor: '#60a5fa',
        prompt: 'What should Bilal include in the email body?',
        options: ['His key skills, relevant experience and enthusiasm for the role.', 'His favourite food and hobbies.'],
        acks: [
          '"Exactly! Skills + experience + motivation. Please find my CV attached. Looking forward to hearing from you."',
          '"A job email is professional! Stick to skills, experience and why you want this role."',
        ] },
      { type: 'panel', scene: 'office', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"Please find my CV attached. I would welcome the opportunity to discuss my application further."' },
      { type: 'panel', scene: 'office', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"Yours sincerely, Bilal Ahmed | bilal.ahmed@email.com | +92-300-1234567"' },
      { type: 'panel', scene: 'office', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Professional email mastered! Subject line, formal greeting, structured body, strong close and signature.' },
    ],
  },

  '6-2': {
    title: 'Interview Ki Tayari',
    subtitle: 'Job interview English — Level 6, Module 2',
    nodes: [
      { type: 'panel', scene: 'office', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Bilal gets a call for an interview! He practises with Sara who plays the role of the interviewer.' },
      { type: 'panel', scene: 'office', speaker: 'Interviewer', speakerColor: '#a78bfa',
        text: '"Tell me about yourself, Bilal."' },
      { type: 'panel', scene: 'office', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"I am a motivated marketing professional with five years of experience in digital campaigns and brand strategy."' },
      { type: 'choice', scene: 'office', speaker: 'Interviewer', speakerColor: '#a78bfa',
        prompt: '"What is your greatest strength?"',
        options: ['"My greatest strength is attention to detail — I ensure every project meets the highest standard."', '"I am very good at many things."'],
        acks: [
          '"Specific, confident and professional! A great interview answer with a concrete example."',
          '"Too vague! Interviewers want specific strengths with examples. Be precise."',
        ] },
      { type: 'panel', scene: 'office', speaker: 'Interviewer', speakerColor: '#a78bfa',
        text: '"Where do you see yourself in five years?" — "I aim to be leading a team and contributing to company growth."' },
      { type: 'panel', scene: 'office', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Interview English mastered! Tell me about yourself, strengths, weaknesses, five-year plan — all prepared.' },
    ],
  },

  '6-3': {
    title: 'Alfaaz Ka Khazana',
    subtitle: 'Advanced vocabulary in action — Level 6, Module 3',
    nodes: [
      { type: 'panel', scene: 'university', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Bilal reads an advanced news article. The vocabulary is rich and academic.' },
      { type: 'panel', scene: 'university', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"The government implemented comprehensive policies to alleviate poverty and address systemic inequalities."' },
      { type: 'panel', scene: 'university', speaker: 'Sara', speakerColor: '#f472b6',
        text: '"Climate change exacerbates existing challenges. Urgent, innovative solutions are inevitable and essential."' },
      { type: 'choice', scene: 'university', speaker: 'Teacher', speakerColor: '#f59e0b',
        prompt: '"What does alleviate mean in this context?"',
        options: ['To reduce or lessen (poverty).', 'To increase or worsen.'],
        acks: [
          '"Correct! Alleviate = make less severe. Exacerbate = make worse. Important antonyms!"',
          '"That is exacerbate! Alleviate is the opposite — it means to reduce or improve."',
        ] },
      { type: 'panel', scene: 'university', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'Learning advanced vocabulary in context is most powerful — read, encounter, use, remember!' },
      { type: 'panel', scene: 'university', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Advanced vocabulary: alleviate, exacerbate, inevitable, implement, systemic, comprehensive — IELTS Band 8.' },
    ],
  },

  '6-4': {
    title: 'IELTS Ki Tayyari',
    subtitle: 'Exam strategies and practice — Level 6, Module 4',
    nodes: [
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'IELTS has four parts: Listening, Reading, Writing, Speaking. Each tests a different skill.' },
      { type: 'panel', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'For Task 1: "The graph shows a significant upward trend, rising from 20% to 45% over the decade."' },
      { type: 'panel', scene: 'classroom', speaker: 'Sara', speakerColor: '#f472b6',
        text: 'For Task 2: "While some argue that... , others contend that... . In my view, the evidence suggests..."' },
      { type: 'choice', scene: 'classroom', speaker: 'Teacher', speakerColor: '#f59e0b',
        prompt: 'For IELTS Speaking Part 2, what is the first step?',
        options: ['Read the cue card and plan your answer for one minute.', 'Start speaking immediately.'],
        acks: [
          '"One minute planning is crucial! Use it to note: what, when, where, why, feelings."',
          '"Never start immediately! The planning minute is your most valuable tool. Use it well."',
        ] },
      { type: 'panel', scene: 'classroom', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'For True/False/Not Given: only mark True if the text explicitly confirms it. Not Given = text is silent on it.' },
      { type: 'panel', scene: 'classroom', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'IELTS strategies mastered! Skim for gist, scan for detail, plan before writing, extend speaking answers.' },
    ],
  },

  '6-5': {
    title: 'Awaaz Ki Taaqat',
    subtitle: 'Accent, delivery and fluency — Level 6, Module 5',
    nodes: [
      { type: 'panel', scene: 'stage', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Bilal is preparing to give a TED-style talk. He works on his pronunciation, pace and delivery.' },
      { type: 'panel', scene: 'stage', speaker: 'Teacher', speakerColor: '#f59e0b',
        text: 'The goal is not a British or American accent — the goal is CLARITY. Speak clearly and confidently.' },
      { type: 'panel', scene: 'stage', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: 'I practise shadowing — listening to a speaker and repeating at the same speed, same intonation, same rhythm.' },
      { type: 'choice', scene: 'stage', speaker: 'Teacher', speakerColor: '#f59e0b',
        prompt: '"Questions have rising intonation. Statements have falling intonation. Is this true?"',
        options: ['Yes — questions rise at the end, statements fall.', 'No — all sentences sound the same.'],
        acks: [
          '"Exactly! "Are you coming?" (rises) vs "I am coming." (falls) — intonation matters!"',
          '"Every language has intonation patterns! English questions typically rise at the end."',
        ] },
      { type: 'panel', scene: 'stage', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"Good evening. Today I want to share..." — pause — "...how English changed my life." — dramatic pause!' },
      { type: 'panel', scene: 'stage', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'Delivery mastered! Pace, pause, intonation, stress, shadowing — you speak like a world-stage communicator.' },
    ],
  },

  '6-6': {
    title: 'World Stage — Final Gate',
    subtitle: '300 din ka safar mukammal — Level 6, Module 6',
    nodes: [
      { type: 'panel', scene: 'stage', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: '300 days. 6 levels. Countless words, sentences, stories and challenges. This is the final moment.' },
      { type: 'panel', scene: 'stage', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"Ladies and gentlemen, my name is Bilal Ahmed. Three hundred days ago I could barely say hello in English."' },
      { type: 'panel', scene: 'stage', speaker: 'Bilal', speakerColor: '#60a5fa',
        text: '"Today I stand before you — confident, fluent and proud. This journey was not easy, but it was worth every minute."' },
      { type: 'choice', scene: 'stage', speaker: 'Bilal', speakerColor: '#60a5fa',
        prompt: 'What is Bilal\'s message to the audience?',
        options: ['"If I can do it, YOU can do it. Start today. One hour a day changes everything."', '"English is too hard for most people."'],
        acks: [
          '"That is the spirit! Determination + daily practice = fluency. You proved it!"',
          '"Bilal would never say that! He is living proof that anyone can learn English."',
        ] },
      { type: 'panel', scene: 'stage', speaker: 'Narrator', speakerColor: '#9ca3af',
        text: 'The audience applauds. Bilal smiles. He went from Base Camp to the World Stage — in just 300 days.' },
      { type: 'panel', scene: 'stage', speaker: 'Narrator', speakerColor: '#f59e0b',
        text: 'CONGRATULATIONS! You have completed the EnglishOS 300-Day Journey. You are ready for the World Stage!' },
    ],
  },
}

export function getStory(level: number, module: number): Story {
  return STORIES[`${level}-${module}`] ?? { title: '', subtitle: '', nodes: [] }
}
