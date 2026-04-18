export interface Scenario {
  icon: string
  title: string
  description: string
  hint: string
  descriptionUrdu: string
  hintUrdu: string
  modelResponse: string
  modelNotes: string
}

export interface FeynmanPromptInfo {
  concept: string
  prompt: string
}

// ─── Level 1 Scenarios (keyed by module) ─────────────────────────────────────

const LEVEL_1_SCENARIOS: Record<number, Scenario> = {
  1: {
    icon: '🔤',
    title: 'The Spelling Game',
    description:
      'Your younger sibling asks you to help them write the English alphabet for a school project. Spell out the vowels clearly and explain why they matter.',
    hint: 'Use words like: A, E, I, O, U — vowels are the most important letters',
    descriptionUrdu:
      'Aap ka chota bhai/behen aap se English alphabet likhne mein madad maang raha hai school project ke liye. Vowels clearly bolein aur samjhayein ke yeh kyun zaroori hain.',
    hintUrdu: 'In alfaz use karein: A, E, I, O, U — vowels sab se zaroori huroof hain',
    modelResponse:
      'The vowels are A, E, I, O, and U. Every English word needs at least one vowel. For example: "Apple" has A, "Egg" has E, "Ink" has I, "Orange" has O, and "Umbrella" has U.',
    modelNotes:
      'Notice: naming each vowel clearly, giving a real example for each, and explaining why they matter.',
  },
  2: {
    icon: '🍽️',
    title: 'At the Restaurant',
    description:
      'You are at a dhaba in Lahore. The waiter comes to your table. Order your meal and a drink in English using the words you have learned.',
    hint: 'Use words like: I want, I need, please, thank you',
    descriptionUrdu:
      'Aap Lahore mein ek dhabe par hain. Waiter aap ke paas aata hai. English mein apna khana aur peena order karein jo words aap ne seekhe hain unhe use karte hue.',
    hintUrdu: 'In alfaz use karein: I want, I need, please, thank you',
    modelResponse:
      'I want chicken karahi and one cold water, please. How much is that?',
    modelNotes:
      'Notice: "I want" (chahna), using "please" for politeness, naming items clearly, and asking a follow-up question.',
  },
  3: {
    icon: '🗣️',
    title: 'Introducing Yourself',
    description:
      'You meet a new colleague at your office for the first time. Introduce yourself in English using positive sentences, a negative sentence, and one question.',
    hint: 'Use the SVO formula: Subject + Verb + Object. Try: I am, I work, I do not, Are you?',
    descriptionUrdu:
      'Aap pehli baar apne office mein ek naye saathkaar se milte hain. English mein apna taruf karein — ek positive sentence, ek negative sentence, aur ek sawal zaroor bolein.',
    hintUrdu: 'SVO formula use karein: Subject + Verb + Object. Koshish karein: I am, I work, I do not, Are you?',
    modelResponse:
      'Hello! I am Ali. I work in the accounts department. I do not live far from here. Are you new to this office?',
    modelNotes:
      'Notice: one positive sentence, one negative (do not), and one question — all three sentence types in a natural flow.',
  },
  4: {
    icon: '🗓️',
    title: 'A New Work Day',
    description:
      'It is Monday morning. You arrive at work. Introduce yourself to a new colleague. Tell them your name, where you are from, and what you do — then ask what day the weekly meeting is and what time it starts.',
    hint: 'Use: My name is, I am from, I work in, Nice to meet you, What day is, What time is, It is, Please, Thank you',
    descriptionUrdu:
      'Somwar ki subah hai. Aap kaam par pahunchte hain. Ek naye saathkaar se milte hain. Unhe apna naam, shehr, aur kaam batayein — phir poochhein ke haftewar meeting kaunse din aur kis waqt hoti hai.',
    hintUrdu: 'Use karein: My name is, I am from, I work in, Nice to meet you, What day is, What time is, It is, Please, Thank you',
    modelResponse:
      'Good morning! My name is Ali. I am from Lahore. I work in the accounts department. Nice to meet you! Excuse me — what day is the weekly meeting? And what time does it start? Thank you very much!',
    modelNotes:
      'Notice: greeting + self-introduction (name, city, job), using "Nice to meet you", asking day and time politely, ending with "thank you".',
  },
}

// ─── Level 2 Scenarios ────────────────────────────────────────────────────────

const LEVEL_2_SCENARIOS: Record<number, Scenario> = {
  1: {
    icon: '☀️',
    title: 'My Daily Routine',
    description:
      'Your friend asks what you do every day. Describe your daily routine using Present Simple tense — morning to night.',
    hint: 'Use: I wake up, I eat, I go, I work, I study, I sleep — every day / usually / always',
    descriptionUrdu:
      'Aap ka dost poochhta hai ke aap roz kya karte hain. Present Simple mein apni roz ki zindagi describe karein — subah se raat tak.',
    hintUrdu: 'Use karein: I wake up, I eat, I go, I work, I study, I sleep — every day / usually / always',
    modelResponse:
      'I wake up at 6 AM every day. I eat breakfast and then I go to work. I usually work until 5 PM. In the evening, I study English for one hour. I sleep at 10 PM. On Sundays, I play cricket with my friends.',
    modelNotes:
      'Notice: using Present Simple for habits, time expressions (every day, usually), and covering morning, daytime, and evening activities.',
  },
  2: {
    icon: '📖',
    title: 'What Did You Do Yesterday?',
    description:
      'Your cousin calls and asks what you did yesterday. Tell them about your day using Past Simple tense — at least 5 sentences.',
    hint: 'Use past tense: I went, I ate, I watched, I played, I met, I came — yesterday / last night / in the morning',
    descriptionUrdu:
      'Aap ka cousin phone karta hai aur poochhta hai kal aap ne kya kiya. Past Simple mein apna din batayen — kam az kam 5 sentences.',
    hintUrdu: 'Past tense use karein: I went, I ate, I watched, I played, I met, I came — yesterday / last night / in the morning',
    modelResponse:
      'Yesterday was a busy day. I woke up at 7 AM and ate breakfast with my family. In the morning, I went to the market and bought some vegetables. In the afternoon, I met my friend Ahmed and we played cricket. At night, I watched a movie and then I went to sleep at 11 PM.',
    modelNotes:
      'Notice: time expressions (yesterday, in the morning, at night), past tense verbs (woke, ate, went, bought, met, played, watched), and natural flow.',
  },
  3: {
    icon: '🔮',
    title: 'Your Plans for Next Week',
    description:
      'You are talking with a friend about your plans for next week. Use "will" for spontaneous decisions and "going to" for pre-planned activities.',
    hint: 'Use: I will, I am going to, I am planning to, I think I will, Next Monday/Tuesday/weekend',
    descriptionUrdu:
      'Aap dost se agli hafte ke plans ke baare mein baat kar rahe hain. "Will" se abhi ke faislay aur "going to" se pehle se bane plans batayein.',
    hintUrdu: 'Use karein: I will, I am going to, I am planning to, I think I will, Next Monday/Tuesday/weekend',
    modelResponse:
      'Next week is going to be very busy. On Monday I am going to visit my uncle. On Tuesday I am going to attend an English class. I think I will also go to the library to get some books. On the weekend, I will probably relax at home and watch a film.',
    modelNotes:
      'Notice: "going to" for pre-planned events, "will" for spontaneous or uncertain decisions, and using specific days for the schedule.',
  },
  4: {
    icon: '🏪',
    title: 'At the Shop',
    description:
      'You want to buy a shirt at a clothing shop. The shopkeeper does not speak Urdu. Ask for the item, check the price, negotiate politely, and complete the transaction in English.',
    hint: 'Use: I am looking for, How much does it cost, Can you give me a discount, I would like to pay, Do you have it in another colour',
    descriptionUrdu:
      'Aap ek kapde ki dukaan se shirt khareedna chahte hain. Dukandaar Urdu nahi bolta. Cheez maangein, qeemat poochhein, shaaistagi se mol tol karein, aur English mein lein dein mukammal karein.',
    hintUrdu: 'Use karein: I am looking for, How much does it cost, Can you give me a discount, I would like to pay, Do you have it in another colour',
    modelResponse:
      'Excuse me, I am looking for a blue shirt in medium size. How much does it cost? That is a bit expensive — can you give me a small discount? Do you have it in any other colour? Alright, I would like to pay by cash. Thank you!',
    modelNotes:
      'Notice: polite openers, asking price, negotiating respectfully, checking for alternatives, and confirming payment.',
  },
  5: {
    icon: '🎓',
    title: 'Level 2 Grammar Review',
    description:
      'Your English teacher asks you to demonstrate all three tenses. Make one sentence in Present Simple, one in Past Simple, and one in Future tense about your life.',
    hint: 'Use: I eat (Present), I went (Past), I will study / I am going to (Future) — show all three!',
    descriptionUrdu:
      'Aapka English teacher aap se teeno tenses demonstrate karne ko kehta hai. Apni zindagi ke baare mein Present, Past, aur Future tense mein ek ek sentence banayein.',
    hintUrdu: 'Use karein: I eat (Present), I went (Past), I will study / I am going to (Future) — teeno dikhao!',
    modelResponse:
      'I study English every morning. Yesterday, I went to the library and borrowed two books. Tomorrow, I am going to practise speaking with my friend for one hour.',
    modelNotes:
      'Notice: clear use of all three tenses — Present Simple (every morning), Past Simple (yesterday, went), and Future with "going to" (tomorrow).',
  },
}

// ─── Level 3 Scenarios ────────────────────────────────────────────────────────

const LEVEL_3_SCENARIOS: Record<number, Scenario> = {
  1: {
    icon: '⏳',
    title: 'The Tense Expert',
    description:
      'A student asks you to explain the difference between Present Perfect and Past Simple using two examples from your own life.',
    hint: 'Present Perfect: I have + V3 (result matters). Past Simple: I + V2 (time is clear). Use: already, just, ever, never, yesterday, last week',
    descriptionUrdu:
      'Ek student aap se Present Perfect aur Past Simple ka farq poochhta hai. Apni zindagi se do misaalein do.',
    hintUrdu: 'Present Perfect: I have + V3 (natija zaroori). Past Simple: I + V2 (waqt clear). Use: already, just, ever, never, yesterday, last week',
    modelResponse:
      'The difference is about time and result. For example: "I have eaten biryani" — I ate it some time ago and I am talking about the experience. But "I ate biryani yesterday" — the time is clear and specific. I have already finished today\'s lesson. But yesterday I studied for two hours.',
    modelNotes:
      'Notice: explaining the core difference (time vs experience), using "have + V3" for Present Perfect, past V2 for Past Simple, and trigger words (already, yesterday).',
  },
  2: {
    icon: '📚',
    title: 'The Vocabulary Challenge',
    description:
      'Your friend has just started learning English. Use 5 new words from different categories (emotion, health, education, technology, nature) in sentences to teach them.',
    hint: 'Use one word from each category: emotion (happy/frustrated), health (fever/recover), education (knowledge/exam), technology (download/Wi-Fi), nature (storm/harvest)',
    descriptionUrdu:
      'Aapka dost abhi English seekhna shuru kar raha hai. Alag alag categories se 5 naye alfaaz sentences mein use karein unhe sikhane ke liye.',
    hintUrdu: 'Har category se ek word: emotion (happy/frustrated), health (fever/recover), education (knowledge/exam), technology (download/Wi-Fi), nature (storm/harvest)',
    modelResponse:
      'Let me teach you five new words! First: "grateful" — I am grateful for this opportunity to learn English. Second: "recover" — After resting, she recovered from her illness quickly. Third: "knowledge" — Knowledge is the greatest gift you can give yourself. Fourth: "Wi-Fi" — The Wi-Fi in this cafe is very fast. Fifth: "harvest" — The harvest was good this year because there was enough rain.',
    modelNotes:
      'Notice: using each word naturally in a sentence, choosing relatable contexts, and giving brief meaning through the sentence itself.',
  },
  3: {
    icon: '📖',
    title: 'Story Time',
    description:
      'Tell a short 3-sentence story about a farmer or a young student who works hard and achieves something. Use past tense and at least one emotion word.',
    hint: 'Use: There was a ___ who, He/She worked hard every day, In the end / Finally, He/She felt proud/grateful/happy',
    descriptionUrdu:
      'Ek kisaan ya mehnat karne wale student ke baare mein 3 sentences ki kahani batayen. Past tense aur kam az kam ek jazbaat wala word zaror use karein.',
    hintUrdu: 'Use karein: There was a ___ who, He/She worked hard every day, In the end / Finally, He/She felt proud/grateful/happy',
    modelResponse:
      'There was a young student named Bilal who woke up at 5 AM every day to study. He worked hard for six months and never gave up, even when the lessons were difficult. In the end, he passed his exam with excellent marks and felt extremely proud of himself.',
    modelNotes:
      'Notice: story structure (introduction, struggle, resolution), past tense verbs (woke, worked, passed, felt), and emotion word (proud) at the end.',
  },
  4: {
    icon: '📰',
    title: 'Reading Comprehension',
    description:
      'Read this short passage and answer the three questions in complete English sentences:\n\n"Sara is a doctor in Karachi. She wakes up at 5 AM every day. She works at a government hospital for ten hours. After work, she teaches English to children in her neighbourhood. She says: Learning never stops."\n\nQuestions: (1) What does Sara do? (2) How many hours does she work? (3) What does she do after work?',
    hint: 'Use: According to the passage, Sara is... / She works for... / After work, she...',
    descriptionUrdu:
      'Yeh chhota passage parho aur 3 sawaalon ke jawab poore English sentences mein do:\n\n"Sara Karachi mein doctor hain. Woh roz subah 5 baje uthti hain. Woh government hospital mein 10 ghante kaam karti hain. Kaam ke baad woh apne mohalle ke bachchon ko English padhati hain. Woh kehti hain: Seekhna kabhi nahi rukta."\n\nSawaal: (1) Sara kya karti hain? (2) Woh kitne ghante kaam karti hain? (3) Kaam ke baad woh kya karti hain?',
    hintUrdu: 'Use karein: According to the passage, Sara is... / She works for... / After work, she...',
    modelResponse:
      'According to the passage, Sara is a doctor who works in Karachi at a government hospital. She works for ten hours every day, starting very early in the morning. After work, she teaches English to the children in her neighbourhood because she believes that learning never stops.',
    modelNotes:
      'Notice: using "According to the passage" to start, answering each question in a full sentence, and incorporating details from the text naturally.',
  },
  5: {
    icon: '🎯',
    title: 'Level 3 Mastery Check',
    description:
      'Demonstrate Level 3 skills. Write 4 sentences: (1) Present Perfect, (2) Past Continuous, (3) a sentence using a reading comprehension phrase, and (4) a vocabulary sentence using one word from nature, health, or emotion.',
    hint: 'Use: I have + V3 | I was + V-ing when... | According to... / In conclusion... | She felt / The storm / He recovered',
    descriptionUrdu:
      'Level 3 ki qaabiliyat dikhao. 4 sentences likhein: (1) Present Perfect, (2) Past Continuous, (3) reading phrase use karein, (4) nature/health/emotion word use karein.',
    hintUrdu: 'Use karein: I have + V3 | I was + V-ing when... | According to... / In conclusion... | She felt / The storm / He recovered',
    modelResponse:
      'I have studied all twelve tenses in Level 3. I was reading a story when my phone rang. According to the passage, the farmer worked very hard every day. In conclusion, I believe that consistent effort leads to great results. The storm was strong, but the farmer felt hopeful and continued working.',
    modelNotes:
      'Notice: correct Present Perfect (I have studied), Past Continuous (I was reading + when), reading phrase (According to / In conclusion), and vocabulary in context (storm, felt hopeful).',
  },
}

// ─── Level 4 Scenarios ────────────────────────────────────────────────────────

const LEVEL_4_SCENARIOS: Record<number, Scenario> = {
  1: {
    icon: '✍️',
    title: 'Write a Paragraph',
    description:
      'Write a 5-sentence paragraph about "The Importance of English in Pakistan". Use linking words: furthermore, however, therefore, for example, in conclusion.',
    hint: 'Structure: topic sentence → supporting point 1 → supporting point 2 (use however) → example → conclusion',
    descriptionUrdu:
      '"Pakistan mein English ki Zaroorat" ke baare mein 5 sentences ka paragraph likhein. Linking words use karein: furthermore, however, therefore, for example, in conclusion.',
    hintUrdu: 'Structure: topic sentence → supporting point 1 → supporting point 2 (however use karein) → misaal → conclusion',
    modelResponse:
      'English is one of the most important languages in Pakistan today. It is the language of business, education, and international communication. Furthermore, many high-paying jobs require English fluency as a basic requirement. However, many students struggle because they do not get enough practice in speaking. Therefore, learning English through daily practice is essential for career growth in Pakistan.',
    modelNotes:
      'Notice: clear topic sentence, two supporting points, contrast with "however", and a conclusion with "therefore".',
  },
  2: {
    icon: '📝',
    title: 'Write a Formal Letter',
    description:
      'You want a fee concession from your college principal. Write a short formal letter (5 sentences) using the correct format: salutation, request, reason, closing.',
    hint: 'Use: Respected Sir/Madam, I am writing to request, I humbly request you to, I shall be very grateful, Yours sincerely',
    descriptionUrdu:
      'Aap apne college principal se fee concession mangna chahte hain. Sahi format mein chhota formal letter likhein (5 sentences): salutation, request, wajah, closing.',
    hintUrdu: 'Use karein: Respected Sir/Madam, I am writing to request, I humbly request you to, I shall be very grateful, Yours sincerely',
    modelResponse:
      'Respected Sir,\nI hope this letter finds you in good health. I am writing to humbly request a fee concession for this academic term. My father recently lost his job and our family is facing financial difficulties. I assure you that I am a dedicated student with excellent attendance and grades. I shall be very grateful for your kind consideration.\nYours sincerely,\nAli Hassan',
    modelNotes:
      'Notice: formal salutation, clear purpose in the first line, reason given respectfully, promise of commitment, and formal closing.',
  },
  3: {
    icon: '🔗',
    title: 'Complex Sentence Challenge',
    description:
      'Make 4 complex sentences about your life using these connectors: although, unless, not only...but also, the more...the more.',
    hint: 'Although I was tired, I still studied. Unless you practise, you will not improve. Not only did I finish the work, but I also helped my friend. The more I read, the more I learn.',
    descriptionUrdu:
      'Apni zindagi ke baare mein 4 complex sentences banayein inhe use karke: although, unless, not only...but also, the more...the more.',
    hintUrdu: 'Misaalein: Although I was tired, I still studied. Unless you practise, you will not improve. The more I read, the more I learn.',
    modelResponse:
      'Although I was very tired after work, I still studied English for an hour. Unless I practise every day, I will not become fluent. Not only do I study vocabulary, but I also practise speaking with friends. The more I study English, the more confident I become in every situation.',
    modelNotes:
      'Notice: four different complex structures, each showing a different relationship (contrast, condition, addition, parallel increase).',
  },
  4: {
    icon: '💬',
    title: 'Speaking with Confidence',
    description:
      'You are presenting yourself at a community event. Speak for 5–6 sentences about who you are, what you do, and what your dream is. Avoid the 3 most common mistakes.',
    hint: 'AVOID: "I am agree" (say I agree), "Since 3 years" (say For 3 years), "More better" (say better). USE: Hello everyone, My name is, I work as, My dream is to',
    descriptionUrdu:
      'Aap ek community event mein apna taaruf karwa rahe hain. 5-6 sentences mein batayen aap kaun hain, kya karte hain, aur kya sapna hai. 3 common mistakes se bachein.',
    hintUrdu: 'BACHEIN: "I am agree" → I agree | "Since 3 years" → For 3 years | "More better" → better. USE: Hello everyone, My name is, I work as, My dream is to',
    modelResponse:
      'Hello everyone! My name is Ali Hassan and I am from Lahore. I work as an accountant at a private company and I have been working there for three years. I agree that English is essential for career growth in today\'s world. My dream is to start my own business and communicate confidently with international partners. Thank you for listening!',
    modelNotes:
      'Notice: avoiding common mistakes (for 3 years, not since; I agree, not I am agree), clear personal introduction, and a motivating dream statement.',
  },
  5: {
    icon: '🎭',
    title: 'Idiom in Action',
    description:
      'Use 3 idioms in a short story or conversation. Choose from: break a leg, piece of cake, burn the midnight oil, under the weather, spill the beans.',
    hint: 'Each idiom must be used naturally in context. Remember their meanings: break a leg = good luck, piece of cake = very easy, burn the midnight oil = work late at night',
    descriptionUrdu:
      'Ek chhoti kahani ya conversation mein 3 idioms use karein. Chunein: break a leg, piece of cake, burn the midnight oil, under the weather, spill the beans.',
    hintUrdu: 'Har idiom context mein naturally use karein. Yaad karein: break a leg = kamiyaabi ki dua, piece of cake = bahut aasaan, burn the midnight oil = raat ko der tak kaam karna',
    modelResponse:
      'Before my English presentation yesterday, my friend said "Break a leg!" I had burned the midnight oil preparing for it, so I was confident. The presentation went well — the questions were a piece of cake for me because I had practised so much. However, I was feeling a little under the weather afterwards because I had not slept enough.',
    modelNotes:
      'Notice: all three idioms used in natural context, correct meanings shown through the story, and the story flows naturally from preparation to presentation to aftermath.',
  },
  6: {
    icon: '🏙️',
    title: 'Level 4 Gate Review',
    description:
      'Write a short paragraph (5 sentences) about any topic you choose. Use: one linking word (furthermore/however/therefore), one complex structure (although/unless), one idiom, and one formal phrase.',
    hint: 'Show off all Level 4 skills in one paragraph: linking word + complex sentence + idiom + formal phrase',
    descriptionUrdu:
      'Apni marzi ke kisi bhi topic par 5 sentences ka paragraph likhein. Include karein: ek linking word, ek complex structure, ek idiom, ek formal phrase.',
    hintUrdu: 'Level 4 ki tamam skills ek paragraph mein dikhayein: linking word + complex sentence + idiom + formal phrase',
    modelResponse:
      'Learning English is one of the best decisions I have made. Although it is challenging at first, the results are worth every effort. Furthermore, English opens doors to better job opportunities and global communication. I have been burning the midnight oil to improve, and I am proud to say that this level has been a piece of cake for me. I sincerely believe that consistent practice is the key to success.',
    modelNotes:
      'Notice: complex structure (Although), linking word (Furthermore), two idioms (burning the midnight oil, piece of cake), and formal phrase (I sincerely believe).',
  },
}

// ─── Level 5 Scenarios ────────────────────────────────────────────────────────

const LEVEL_5_SCENARIOS: Record<number, Scenario> = {
  1: {
    icon: '🔀',
    title: 'Conditional Conversations',
    description:
      'A friend asks you about your dreams and regrets. Answer using all three conditional types: Type 1 (possible future), Type 2 (imaginary present), and Type 3 (impossible past).',
    hint: 'Type 1: If I study hard, I will pass. Type 2: If I had more time, I would travel. Type 3: If I had started earlier, I would have finished by now.',
    descriptionUrdu:
      'Dost aap se aap ke sapnon aur pachtaawon ke baare mein poochhta hai. Teeno conditional types use karke jawab dein: Type 1 (mumkin mustaqbil), Type 2 (arzoo), Type 3 (na mumkin maazi).',
    hintUrdu: 'Type 1: If I study hard, I will pass. Type 2: If I had more time, I would travel. Type 3: If I had started earlier, I would have finished by now.',
    modelResponse:
      'If I keep practising English every day, I will become fluent within a year — that is my goal! If I had more free time, I would travel to London to experience English in a native environment. And honestly, if I had started learning English five years ago, I would have had so many more opportunities by now. But it is never too late to begin!',
    modelNotes:
      'Notice: all three conditional types in natural conversation — Type 1 (keep practising → will become), Type 2 (had more time → would travel), Type 3 (had started → would have had).',
  },
  2: {
    icon: '🔄',
    title: 'Active to Passive',
    description:
      'Your teacher asks you to rewrite 3 active sentences as passive sentences and then use passive voice in a short paragraph about your neighbourhood.',
    hint: 'Active: Ali wrote the letter. → Passive: The letter was written by Ali. | The project will be completed. | English is spoken worldwide.',
    descriptionUrdu:
      'Aap ka teacher 3 active sentences ko passive mein likhne ko keh raha hai, phir apne mohalle ke baare mein ek chhota passive voice paragraph likhein.',
    hintUrdu: 'Active: Ali wrote the letter. → Passive: The letter was written by Ali. | The project will be completed. | English is spoken worldwide.',
    modelResponse:
      'The letter was written by the manager and sent to all employees. The new mosque in our neighbourhood is being built by a local charity. The roads were repaired last month by the city council. In my area, fresh vegetables are sold every morning, new buildings are being constructed, and many improvements have been made this year.',
    modelNotes:
      'Notice: correct passive forms (was written, is being built, were repaired, are sold, are being constructed, have been made), covering different tenses in passive.',
  },
  3: {
    icon: '🎭',
    title: 'Idiom Master',
    description:
      'Your English teacher challenges you to use 4 idioms in a single story or conversation. Use: burn the midnight oil, piece of cake, the ball is in your court, a blessing in disguise.',
    hint: 'burn the midnight oil = work late | piece of cake = very easy | the ball is in your court = your decision | a blessing in disguise = bad but actually good',
    descriptionUrdu:
      'Aapka English teacher aapko challenge karta hai ke 4 idioms ek kahani ya conversation mein use karein.',
    hintUrdu: 'burn the midnight oil = raat ko der tak kaam karna | piece of cake = bahut aasaan | the ball is in your court = aapka faisla | a blessing in disguise = bura lage lekin acha nikle',
    modelResponse:
      'I burned the midnight oil to prepare for my job interview. When I arrived, the questions were a piece of cake because I had prepared so well. The manager said: "We are very impressed. The ball is in your court — let us know your decision by Friday." Losing my previous job was actually a blessing in disguise, because it pushed me to find this much better opportunity.',
    modelNotes:
      'Notice: all four idioms used naturally in a real-world interview story, each used in the correct context, and the story flows logically.',
  },
  4: {
    icon: '🚀',
    title: 'Phrasal Verb Story',
    description:
      'Tell a short story (5 sentences) about someone who faces a challenge using at least 5 phrasal verbs: give up, look up, run out of, break down, find out, carry on, look after.',
    hint: 'give up = haar maanna | look up = dhundhna | run out of = khatam ho jaana | break down = kharab hona | carry on = jaari rakhna',
    descriptionUrdu:
      'Kisi aisi shakhsiyat ke baare mein 5 sentences ki kahani bataen jo mushkil ka samna karta hai. Kam az kam 5 phrasal verbs use karein.',
    hintUrdu: 'give up = haar maanna | look up = dhundhna | run out of = khatam ho jaana | break down = kharab hona | carry on = jaari rakhna',
    modelResponse:
      'Last year, Ahmed was trying to set up his own business but things were difficult. His laptop broke down, and he ran out of money for rent. He looked up every possible solution online and refused to give up. His friends looked after him during the hard times, always encouraging him to carry on. Finally, he found out about a government grant that saved his business.',
    modelNotes:
      'Notice: 6 phrasal verbs (set up, broke down, ran out of, looked up, give up, looked after, carry on, found out) used naturally in a story with clear challenge and resolution.',
  },
  5: {
    icon: '💼',
    title: 'Business Meeting',
    description:
      'You are chairing a team meeting at your office. Open the meeting, present one agenda item, invite a response from your team, and close the meeting professionally.',
    hint: 'Use: The purpose of today\'s meeting is, I would like to propose, Could I add something, Let us schedule a follow-up, I look forward to a long-term solution',
    descriptionUrdu:
      'Aap apne office mein ek team meeting lead kar rahe hain. Meeting kholein, ek agenda item present karein, team se raaye maangein, aur professionally meeting khatam karein.',
    hintUrdu: 'Use karein: The purpose of today\'s meeting is, I would like to propose, Could I add something, Let us schedule a follow-up, I look forward to',
    modelResponse:
      'Good morning everyone. The purpose of today\'s meeting is to review our progress for this quarter. I would like to propose that we increase our social media activity to reach more customers. Could anyone add something about the budget for this? Thank you for your input. Let us schedule a follow-up meeting for next Monday at 10 AM. I look forward to seeing your reports then.',
    modelNotes:
      'Notice: formal opening with purpose, making a proposal, inviting input, scheduling follow-up, and closing professionally — all key business English elements.',
  },
  6: {
    icon: '🎯',
    title: 'Level 5 Showcase',
    description:
      'Write 5 sentences that showcase all Level 5 skills: one conditional, one passive voice, one idiom, one phrasal verb, and one business English phrase.',
    hint: 'One of each: If I had... → would have | was written by | burn the midnight oil | give up | The purpose of this is to',
    descriptionUrdu:
      'Level 5 ki tamam skills dikhane ke liye 5 sentences likhein: ek conditional, ek passive voice, ek idiom, ek phrasal verb, aur ek business English phrase.',
    hintUrdu: 'Har ek: If I had... → would have | was written by | burn the midnight oil | give up | The purpose of this is to',
    modelResponse:
      'If I had joined this English course two years ago, I would have already achieved my goals. The new business proposal was presented by our team at the annual conference. I have been burning the midnight oil to master every level of this course. I decided never to give up, even when the lessons were difficult. The purpose of all this hard work is to become a confident English speaker.',
    modelNotes:
      'Notice: Type 3 conditional, passive voice (was presented), idiom (burning the midnight oil), phrasal verb (give up), and business phrase (The purpose of) — all five skills in one paragraph.',
  },
}

// ─── Level 6 Scenarios ────────────────────────────────────────────────────────

const LEVEL_6_SCENARIOS: Record<number, Scenario> = {
  1: {
    icon: '📧',
    title: 'Professional Email',
    description:
      'Write a professional email applying for a job as a content writer at a digital marketing agency. Include: subject, salutation, why you are applying, your skills, a request for an interview, and a formal closing.',
    hint: 'Use: Subject: Application for... | I hope this email finds you well | I am writing to apply | Please find attached my CV | I would welcome the opportunity | Looking forward to hearing from you',
    descriptionUrdu:
      'Ek digital marketing agency mein content writer ki position ke liye professional email likhein. Include karein: subject, salutation, kyun apply kar rahe hain, skills, interview request, formal closing.',
    hintUrdu: 'Use karein: Subject: Application for... | I hope this email finds you well | I am writing to apply | Please find attached my CV | I would welcome the opportunity',
    modelResponse:
      'Subject: Application for Content Writer Position\n\nDear Hiring Manager,\n\nI hope this email finds you well. I am writing to apply for the position of Content Writer at your esteemed agency. I have three years of experience in digital content creation and I am skilled at writing engaging articles, social media posts, and email campaigns. Please find attached my CV and a portfolio of my previous work. I would welcome the opportunity to discuss how I can contribute to your team. Looking forward to hearing from you.\n\nBest regards,\nAli Hassan',
    modelNotes:
      'Notice: professional subject line, formal salutation, clear purpose in first line, relevant skills mentioned, portfolio attached, interview requested, and formal closing.',
  },
  2: {
    icon: '👔',
    title: 'The Job Interview',
    description:
      'You are in a job interview. Answer these four questions professionally: (1) Tell me about yourself. (2) What is your greatest strength? (3) Where do you see yourself in 5 years? (4) Why do you want to work here?',
    hint: 'Use: My name is... I have worked for... | My greatest strength is... | In five years, I see myself... | I have researched your company and I admire...',
    descriptionUrdu:
      'Aap job interview mein hain. Yeh chaar sawaalon ke professional jawab dein: (1) Apne baare mein batayein. (2) Aapki sabse bari khoobee kya hai? (3) Aap khud ko 5 saalon mein kahan dekhte hain? (4) Aap yahaan kyun kaam karna chahte hain?',
    hintUrdu: 'Use karein: My name is... I have worked for... | My greatest strength is... | In five years, I see myself... | I have researched your company and I admire...',
    modelResponse:
      'My name is Ahmed Hassan. I have worked in content writing for three years and I am a quick learner who adapts well to new environments. My greatest strength is my dedication to quality — I always review my work carefully before submission. In five years, I see myself leading a content team and managing large-scale campaigns. I have researched your company and I admire your innovative approach to digital marketing, which is why I am excited about this opportunity.',
    modelNotes:
      'Notice: personal introduction + experience, clear strength with evidence, forward-looking goal (leading a team), and company-specific answer showing research was done.',
  },
  3: {
    icon: '🌟',
    title: 'Power Words in Action',
    description:
      'Write a short motivational speech (5 sentences) for young English learners. Use at least 5 power words: achieve, resilient, empower, consistent, overcome, inspire, transform.',
    hint: 'Power words: achieve (haasil karna), resilient (haar na maanney wala), empower (taqat dena), consistent (hamesha ek jesa), overcome (qabu paana)',
    descriptionUrdu:
      'Naujawan English seekhne waalon ke liye 5 sentences ki chhoti motivational speech likhein. Kam az kam 5 power words use karein.',
    hintUrdu: 'Power words: achieve (haasil karna), resilient (haar na maanney wala), empower (taqat dena), consistent (hamesha ek jesa), overcome (qabu paana)',
    modelResponse:
      'Every one of you has the power to achieve great things through the English language. Stay consistent in your practice — even fifteen minutes daily can transform your life. Be resilient when lessons feel difficult; every challenge you overcome makes you stronger. Knowledge empowers you to communicate with the world and opens doors that were once closed. Let your journey inspire others, because your success story will show them what is possible.',
    modelNotes:
      'Notice: all five power words used naturally (achieve, consistent, transform, resilient, overcome, empower, inspire) in a motivational context that is sincere and uplifting.',
  },
  4: {
    icon: '📊',
    title: 'IELTS Writing Task 2',
    description:
      'Write an IELTS-style opinion essay response (5–6 sentences): "Some people argue that social media does more harm than good. To what extent do you agree or disagree?"',
    hint: 'Structure: state your opinion → acknowledge the other side → give your main argument → support with example → conclude. Use: In my opinion, Some argue, However, For example, In conclusion',
    descriptionUrdu:
      'IELTS-style opinion essay likhein (5-6 sentences): "Kuch log kehte hain ke social media zyada nuqsan karta hai. Aap kitna agree ya disagree karte hain?"',
    hintUrdu: 'Structure: apni raaye → doosri taraf → main argument → misaal → conclusion. Use: In my opinion, Some argue, However, For example, In conclusion',
    modelResponse:
      'In my opinion, social media brings more benefits than harm when used responsibly. Some argue that it causes addiction and spreads misinformation, which are valid concerns. However, I believe that social media primarily empowers people by connecting them to information, education, and opportunities worldwide. For example, millions of students in developing countries access free learning resources through YouTube and Instagram. In conclusion, both sides have valid arguments, but the benefits of social media outweigh its risks when proper digital literacy is taught.',
    modelNotes:
      'Notice: clear opinion stated upfront, acknowledging the opposing view, personal stance with reasoning, specific example, and balanced conclusion — classic IELTS Task 2 structure.',
  },
  5: {
    icon: '🎤',
    title: 'Present with Confidence',
    description:
      'Deliver a 5-sentence presentation about "Why English is a life-changing skill." Use: a strong opening, a transition phrase, correct stress on key words, and a professional closing.',
    hint: 'Open: Good morning everyone, today I will be talking about... | Transition: Moving on to my next point... | Close: To summarize... Are there any questions?',
    descriptionUrdu:
      '"English kyun zindagi badalne wali skill hai" ke baare mein 5-sentence presentation dein. Use karein: strong opening, transition phrase, key words par stress, aur professional closing.',
    hintUrdu: 'Open: Good morning everyone, today I will be talking about... | Transition: Moving on to my next point... | Close: To summarize... Are there any questions?',
    modelResponse:
      'Good morning everyone. Today I will be talking about why ENGLISH is a life-CHANGING skill for our generation. English opens doors to BETTER jobs, HIGHER education, and GLOBAL connections that are simply not possible without it. Moving on to my next point — English also builds confidence, because when you can express yourself clearly, people listen. To summarize: English is not just a language, it is a passport to a better future. Are there any questions?',
    modelNotes:
      'Notice: formal opening with topic, capitalised words show stress points, transition phrase (Moving on to), clear argument, and professional close with question invitation.',
  },
  6: {
    icon: '🏆',
    title: 'Final Gate — Your Story',
    description:
      'Write your English learning journey in 5 sentences. Use: one conditional (if I had...), one passive (English was learned by...), one idiom, one power word, and one professional phrase.',
    hint: 'Show mastery of ALL levels: conditional + passive + idiom + power word + professional phrase. This is your final showcase!',
    descriptionUrdu:
      'Apna English seekhne ka safar 5 sentences mein likhein. Use karein: ek conditional, ek passive voice, ek idiom, ek power word, aur ek professional phrase.',
    hintUrdu: 'Tamam levels ki mastery dikhayein: conditional + passive + idiom + power word + professional phrase. Yeh aapka final showcase hai!',
    modelResponse:
      'If I had known how much English would transform my life, I would have started this journey much sooner. This language was not given to me — it was earned through three hundred days of consistent effort. I burned the midnight oil, I pushed through doubts, and I never gave up. I have become resilient, empowered, and confident — skills that will serve me throughout my entire career. I sincerely believe that this is only the beginning, and I look forward to achieving even greater things.',
    modelNotes:
      'Notice: Type 3 conditional (if I had known → would have started), passive voice (was earned), idiom (burned the midnight oil), power words (resilient, empowered), and professional phrase (I sincerely believe, I look forward to).',
  },
}

// ─── Level-aware lookup tables ────────────────────────────────────────────────

const ALL_SCENARIOS: Record<number, Record<number, Scenario>> = {
  1: LEVEL_1_SCENARIOS,
  2: LEVEL_2_SCENARIOS,
  3: LEVEL_3_SCENARIOS,
  4: LEVEL_4_SCENARIOS,
  5: LEVEL_5_SCENARIOS,
  6: LEVEL_6_SCENARIOS,
}

// ─── Feynman Prompts (level-aware) ───────────────────────────────────────────

const LEVEL_1_FEYNMAN: Record<number, FeynmanPromptInfo> = {
  1: {
    concept: 'Alphabets & Vowels — Level 1 Module 1',
    prompt: 'Explain what vowels are and why they are important in English, as if you are teaching a 10-year-old. Use simple words and give one example word for each vowel.',
  },
  2: {
    concept: 'Core 100 Words — Level 1 Module 2',
    prompt: 'Explain what pronouns are and give three examples of how to use I, He, She, and They in sentences, as if you are telling a 10-year-old. Use simple English words.',
  },
  3: {
    concept: 'Basic Sentences (SVO) — Level 1 Module 3',
    prompt: 'Explain the Subject-Verb-Object formula for making English sentences. Give one positive sentence, one negative sentence, and one question as examples.',
  },
  4: {
    concept: 'Numbers, Days & Speaking — Level 1 Module 4',
    prompt: 'Explain how to introduce yourself in English. Include: how to greet someone, say your name, count from one to ten, say today\'s day of the week, and tell the time. Give examples for each.',
  },
}

const LEVEL_2_FEYNMAN: Record<number, FeynmanPromptInfo> = {
  1: {
    concept: 'Present Tense — Level 2 Module 1',
    prompt: 'Explain the difference between Present Simple and Present Continuous tenses. Give two examples each and explain when to use each one.',
  },
  2: {
    concept: 'Past Tense — Level 2 Module 2',
    prompt: 'Explain Past Simple tense. What is the difference between regular verbs (add -ed) and irregular verbs? Give three examples of irregular verbs with their past forms.',
  },
  3: {
    concept: 'Future Tense — Level 2 Module 3',
    prompt: 'Explain the difference between "will" and "going to" for talking about the future. Give one example of each and explain when you choose one over the other.',
  },
  4: {
    concept: 'Daily Conversations — Level 2 Module 4',
    prompt: 'Explain how to have a polite shopping conversation in English. What phrases do you use to ask for an item, check the price, ask for a discount, and say goodbye?',
  },
  5: {
    concept: 'Level 2 Grammar Review — Gate',
    prompt: 'Explain all three main tenses (Present, Past, Future) in simple terms. Give one example sentence for each. Which one do you find most useful in everyday life and why?',
  },
}

const LEVEL_3_FEYNMAN: Record<number, FeynmanPromptInfo> = {
  1: {
    concept: 'All 12 Tenses — Level 3 Module 1',
    prompt: 'Explain the Present Perfect tense. When do you use it instead of Past Simple? Give two examples with trigger words like "already", "just", or "ever".',
  },
  2: {
    concept: '500 Core Words — Level 3 Module 2',
    prompt: 'Choose one word from each category: emotion, health, education, and technology. Use each word in a sentence and briefly explain its meaning in Roman Urdu.',
  },
  3: {
    concept: 'Short Stories — Level 3 Module 3',
    prompt: 'Tell a short 3-sentence story about a hardworking person from your community. Use Past Simple tense and at least one emotion word.',
  },
  4: {
    concept: 'Reading Comprehension — Level 3 Module 4',
    prompt: 'Explain how to find the main idea of a paragraph. What is the difference between the "topic sentence" and the "supporting details"? Give an example.',
  },
  5: {
    concept: 'Level 3 Mastery — Gate',
    prompt: 'Use Present Perfect and Past Continuous in two separate sentences about something that happened to you. Then explain the difference between the two tenses.',
  },
}

const LEVEL_4_FEYNMAN: Record<number, FeynmanPromptInfo> = {
  1: {
    concept: 'Writing Skills — Level 4 Module 1',
    prompt: 'Explain what "linking words" are and why they are important in English writing. Give examples of: a contrast word (however), an addition word (furthermore), and a result word (therefore).',
  },
  2: {
    concept: 'Letter Writing — Level 4 Module 2',
    prompt: 'Explain how to write a formal letter or email in English. What are the four main parts? Give the opening and closing phrases that make it sound professional.',
  },
  3: {
    concept: 'Complex Sentences — Level 4 Module 3',
    prompt: 'Explain what a complex sentence is. Give examples using "although", "unless", and "not only...but also". How are these different from simple sentences?',
  },
  4: {
    concept: 'Speaking Confidence — Level 4 Module 4',
    prompt: 'Explain three common English mistakes that Pakistani learners make. For each: show the wrong version, the correct version, and explain the rule.',
  },
  5: {
    concept: 'Idioms & Phrases — Level 4 Module 5',
    prompt: 'Explain what idioms are and why they are tricky. Choose three idioms you have learned and explain each one\'s meaning and how you would use it in a sentence.',
  },
  6: {
    concept: 'Level 4 Mastery — Gate',
    prompt: 'Write a short paragraph (4 sentences) about any topic. Use one linking word, one complex sentence structure, and one idiom. Then explain why you chose each one.',
  },
}

const LEVEL_5_FEYNMAN: Record<number, FeynmanPromptInfo> = {
  1: {
    concept: 'Conditionals — Level 5 Module 1',
    prompt: 'Explain the three types of conditionals. Give one example sentence for each type and explain what kind of situation each one describes.',
  },
  2: {
    concept: 'Passive Voice — Level 5 Module 2',
    prompt: 'Explain what passive voice is. Give two examples — one in Present Simple passive and one in Past Simple passive. When do native speakers prefer to use the passive?',
  },
  3: {
    concept: 'Idioms & Expressions — Level 5 Module 3',
    prompt: 'Choose four idioms you have learned. For each one: say the idiom, explain what it really means, and give an example sentence using it naturally.',
  },
  4: {
    concept: 'Phrasal Verbs — Level 5 Module 4',
    prompt: 'Explain what phrasal verbs are. Choose five phrasal verbs and use each in a sentence. Why are phrasal verbs important for sounding natural in English?',
  },
  5: {
    concept: 'Business English — Level 5 Module 5',
    prompt: 'Explain how to open and close a business meeting in English. What phrases do you use? What is the difference between formal business English and casual conversation?',
  },
  6: {
    concept: 'Level 5 Mastery — Gate',
    prompt: 'Explain the biggest grammar lesson you have learned in Level 5. Use one conditional, one passive voice sentence, and one phrasal verb in your explanation.',
  },
}

const LEVEL_6_FEYNMAN: Record<number, FeynmanPromptInfo> = {
  1: {
    concept: 'Professional Emails — Level 6 Module 1',
    prompt: 'Explain how to write a professional job application email. What are the key phrases to use at the beginning, middle, and end? Why does tone matter in professional writing?',
  },
  2: {
    concept: 'Interview English — Level 6 Module 2',
    prompt: 'Explain how to answer the question "Tell me about yourself" in a job interview. What four things should you include? Give an example answer.',
  },
  3: {
    concept: 'Advanced Vocabulary — Level 6 Module 3',
    prompt: 'Explain what "power words" are and why they make your English stronger. Choose four power words you have learned and use each one in a sentence.',
  },
  4: {
    concept: 'IELTS / Exam Prep — Level 6 Module 4',
    prompt: 'Explain the structure of an IELTS Task 2 opinion essay. What are the five key parts? Give a brief example introduction for the topic: "Technology makes people less social".',
  },
  5: {
    concept: 'Accent & Delivery — Level 6 Module 5',
    prompt: 'Explain what "word stress" and "sentence stress" mean in English pronunciation. Give two examples of each. How does correct stress make your English clearer?',
  },
  6: {
    concept: 'Final Gate — Level 6 Complete',
    prompt: 'You have completed 300 days of English learning. Explain the most important thing you have learned in each of the six levels, in English. Use at least one idiom and one power word in your answer.',
  },
}

const ALL_FEYNMAN: Record<number, Record<number, FeynmanPromptInfo>> = {
  1: LEVEL_1_FEYNMAN,
  2: LEVEL_2_FEYNMAN,
  3: LEVEL_3_FEYNMAN,
  4: LEVEL_4_FEYNMAN,
  5: LEVEL_5_FEYNMAN,
  6: LEVEL_6_FEYNMAN,
}

// ─── Getter functions (level-aware with fallback) ────────────────────────────

export function getScenario(module: number, level = 1): Scenario {
  const levelScenarios = ALL_SCENARIOS[level] ?? ALL_SCENARIOS[1]
  return levelScenarios[module] ?? levelScenarios[2] ?? ALL_SCENARIOS[1][2]
}

export function getFeynmanPrompt(module: number, level = 1): FeynmanPromptInfo {
  const levelPrompts = ALL_FEYNMAN[level] ?? ALL_FEYNMAN[1]
  return levelPrompts[module] ?? levelPrompts[2] ?? ALL_FEYNMAN[1][2]
}
