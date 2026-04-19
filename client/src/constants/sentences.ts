export interface Zone {
  id: string
  label: string
}

export interface SentenceExercise {
  mode: 'Positive' | 'Negative' | 'Question'
  hint: string
  zones: Zone[]
  tiles: string[]
  correct: Record<string, string>
  vocabWords: string[]
}

/* ─────────────────────────────────────────────────────────────────────
   All exercises keyed by "level-module"
   getSentences(module, level) returns the right set.
───────────────────────────────────────────────────────────────────── */
const EXERCISES: Record<string, SentenceExercise[]> = {

  /* ══════════════════════════════════════════════
     LEVEL 1 — BASE CAMP
  ══════════════════════════════════════════════ */

  '1-1': [
    {
      mode: 'Positive',
      hint: 'Yeh ek kitaab hai',
      zones: [{ id: 'z1', label: 'This' }, { id: 'z2', label: 'Verb' }, { id: 'z3', label: 'Article + Noun' }],
      tiles: ['This', 'is', 'are', 'a', 'book', 'pen', 'am'],
      correct: { z1: 'This', z2: 'is', z3: 'a' },
      vocabWords: ['book'],
    },
    {
      mode: 'Positive',
      hint: 'A apple ke liye hai',
      zones: [{ id: 'z1', label: 'Article' }, { id: 'z2', label: 'Noun' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Adjective' }],
      tiles: ['An', 'apple', 'is', 'red', 'a', 'mango', 'are', 'blue'],
      correct: { z1: 'An', z2: 'apple', z3: 'is', z4: 'red' },
      vocabWords: ['apple', 'red'],
    },
    {
      mode: 'Positive',
      hint: 'Billi ke chaar paon hote hain',
      zones: [{ id: 'z1', label: 'Article' }, { id: 'z2', label: 'Animal' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Number' }],
      tiles: ['A', 'cat', 'has', 'four', 'an', 'dog', 'two', 'is'],
      correct: { z1: 'A', z2: 'cat', z3: 'has', z4: 'four' },
      vocabWords: ['cat', 'four'],
    },
    {
      mode: 'Question',
      hint: 'Yeh kya hai?',
      zones: [{ id: 'z1', label: 'Question' }, { id: 'z2', label: 'Verb' }, { id: 'z3', label: 'This' }],
      tiles: ['What', 'is', 'this', 'Who', 'are', 'that'],
      correct: { z1: 'What', z2: 'is', z3: 'this' },
      vocabWords: ['what'],
    },
  ],

  '1-2': [
    {
      mode: 'Positive',
      hint: 'Mera baap doctor hai',
      zones: [{ id: 'z1', label: 'Pronoun' }, { id: 'z2', label: 'Possessive' }, { id: 'z3', label: 'Family' }, { id: 'z4', label: 'Verb' }, { id: 'z5', label: 'Job' }],
      tiles: ['My', 'father', 'is', 'a', 'doctor', 'mother', 'teacher', 'are'],
      correct: { z1: 'My', z2: 'father', z3: 'is', z4: 'a', z5: 'doctor' },
      vocabWords: ['father', 'doctor'],
    },
    {
      mode: 'Positive',
      hint: 'Billi kaali hai',
      zones: [{ id: 'z1', label: 'Article' }, { id: 'z2', label: 'Animal' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Colour' }],
      tiles: ['The', 'cat', 'is', 'black', 'A', 'dog', 'white', 'are'],
      correct: { z1: 'The', z2: 'cat', z3: 'is', z4: 'black' },
      vocabWords: ['cat', 'black'],
    },
    {
      mode: 'Positive',
      hint: 'Mere do haath hain',
      zones: [{ id: 'z1', label: 'Pronoun' }, { id: 'z2', label: 'Verb' }, { id: 'z3', label: 'Number' }, { id: 'z4', label: 'Body Part' }],
      tiles: ['I', 'have', 'two', 'hands', 'She', 'has', 'one', 'feet'],
      correct: { z1: 'I', z2: 'have', z3: 'two', z4: 'hands' },
      vocabWords: ['two', 'hands'],
    },
    {
      mode: 'Positive',
      hint: 'Woh meri behan hai',
      zones: [{ id: 'z1', label: 'Pronoun' }, { id: 'z2', label: 'Verb' }, { id: 'z3', label: 'Possessive' }, { id: 'z4', label: 'Family' }],
      tiles: ['She', 'is', 'my', 'sister', 'He', 'are', 'your', 'brother'],
      correct: { z1: 'She', z2: 'is', z3: 'my', z4: 'sister' },
      vocabWords: ['sister'],
    },
    {
      mode: 'Negative',
      hint: 'Yeh mera basta nahi hai',
      zones: [{ id: 'z1', label: 'This' }, { id: 'z2', label: 'Is' }, { id: 'z3', label: 'Not' }, { id: 'z4', label: 'Possessive' }, { id: 'z5', label: 'Noun' }],
      tiles: ['This', 'is', 'not', 'my', 'bag', 'That', 'are', 'your'],
      correct: { z1: 'This', z2: 'is', z3: 'not', z4: 'my', z5: 'bag' },
      vocabWords: ['bag'],
    },
  ],

  '1-3': [
    {
      mode: 'Positive',
      hint: 'Main talib-e-ilm hoon',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Verb' }, { id: 'z3', label: 'Article' }, { id: 'z4', label: 'Role' }],
      tiles: ['I', 'am', 'a', 'student', 'He', 'is', 'an', 'teacher'],
      correct: { z1: 'I', z2: 'am', z3: 'a', z4: 'student' },
      vocabWords: ['student'],
    },
    {
      mode: 'Positive',
      hint: 'Woh mera bhai hai',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Verb' }, { id: 'z3', label: 'Possessive' }, { id: 'z4', label: 'Family' }],
      tiles: ['He', 'is', 'my', 'brother', 'She', 'are', 'your', 'sister'],
      correct: { z1: 'He', z2: 'is', z3: 'my', z4: 'brother' },
      vocabWords: ['brother'],
    },
    {
      mode: 'Positive',
      hint: 'Woh aaj khush hai',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Verb' }, { id: 'z3', label: 'Feeling' }, { id: 'z4', label: 'Time' }],
      tiles: ['She', 'is', 'happy', 'today', 'He', 'are', 'sad', 'yesterday'],
      correct: { z1: 'She', z2: 'is', z3: 'happy', z4: 'today' },
      vocabWords: ['happy', 'today'],
    },
    {
      mode: 'Positive',
      hint: 'Hum ache dost hain',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Verb' }, { id: 'z3', label: 'Adjective' }, { id: 'z4', label: 'Noun' }],
      tiles: ['We', 'are', 'good', 'friends', 'They', 'is', 'bad', 'enemies'],
      correct: { z1: 'We', z2: 'are', z3: 'good', z4: 'friends' },
      vocabWords: ['friends'],
    },
    {
      mode: 'Negative',
      hint: 'Woh school mein nahi hain',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Are' }, { id: 'z3', label: 'Not' }, { id: 'z4', label: 'Location' }],
      tiles: ['They', 'are', 'not', 'here', 'We', 'is', 'also', 'there'],
      correct: { z1: 'They', z2: 'are', z3: 'not', z4: 'here' },
      vocabWords: ['here'],
    },
  ],

  '1-4': [
    {
      mode: 'Positive',
      hint: 'Aaj peer ka din hai',
      zones: [{ id: 'z1', label: 'Time' }, { id: 'z2', label: 'Verb' }, { id: 'z3', label: 'Day' }],
      tiles: ['Today', 'is', 'Monday', 'Tomorrow', 'are', 'Sunday'],
      correct: { z1: 'Today', z2: 'is', z3: 'Monday' },
      vocabWords: ['Monday'],
    },
    {
      mode: 'Negative',
      hint: 'Main chawal nahi khata',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Do not' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Object' }],
      tiles: ['I', 'do not', 'eat', 'rice', 'He', 'does not', 'drink', 'bread'],
      correct: { z1: 'I', z2: 'do not', z3: 'eat', z4: 'rice' },
      vocabWords: ['rice'],
    },
    {
      mode: 'Question',
      hint: 'Kya woh cricket khelta hai?',
      zones: [{ id: 'z1', label: 'Does' }, { id: 'z2', label: 'Subject' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Sport' }],
      tiles: ['Does', 'he', 'play', 'cricket', 'Do', 'she', 'eat', 'football'],
      correct: { z1: 'Does', z2: 'he', z3: 'play', z4: 'cricket' },
      vocabWords: ['cricket', 'play'],
    },
    {
      mode: 'Question',
      hint: 'Tum kahan rehte ho?',
      zones: [{ id: 'z1', label: 'Question' }, { id: 'z2', label: 'Do' }, { id: 'z3', label: 'Subject' }, { id: 'z4', label: 'Verb' }],
      tiles: ['Where', 'do', 'you', 'live', 'When', 'does', 'he', 'go'],
      correct: { z1: 'Where', z2: 'do', z3: 'you', z4: 'live' },
      vocabWords: ['live', 'where'],
    },
  ],

  /* ══════════════════════════════════════════════
     LEVEL 2 — VILLAGE
  ══════════════════════════════════════════════ */

  '2-1': [
    {
      mode: 'Positive',
      hint: 'Main abhi khaana kha raha hoon',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Am/Is/Are' }, { id: 'z3', label: 'V+ing' }, { id: 'z4', label: 'Object' }],
      tiles: ['I', 'am', 'eating', 'food', 'He', 'is', 'drinking', 'water'],
      correct: { z1: 'I', z2: 'am', z3: 'eating', z4: 'food' },
      vocabWords: ['eating', 'food'],
    },
    {
      mode: 'Positive',
      hint: 'Woh kitaab parh rahi hai',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Is' }, { id: 'z3', label: 'V+ing' }, { id: 'z4', label: 'Article + Noun' }],
      tiles: ['She', 'is', 'reading', 'a book', 'He', 'are', 'writing', 'a letter'],
      correct: { z1: 'She', z2: 'is', z3: 'reading', z4: 'a book' },
      vocabWords: ['reading', 'book'],
    },
    {
      mode: 'Positive',
      hint: 'Woh bohot achi tarah tair sakta hai',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Can' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Adverb' }],
      tiles: ['He', 'can', 'swim', 'well', 'She', 'could', 'run', 'fast'],
      correct: { z1: 'He', z2: 'can', z3: 'swim', z4: 'well' },
      vocabWords: ['swim', 'well'],
    },
    {
      mode: 'Negative',
      hint: 'Woh aaj nahi khel rahe',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Are' }, { id: 'z3', label: 'Not' }, { id: 'z4', label: 'V+ing' }],
      tiles: ['They', 'are', 'not', 'playing', 'We', 'is', 'also', 'running'],
      correct: { z1: 'They', z2: 'are', z3: 'not', z4: 'playing' },
      vocabWords: ['playing'],
    },
    {
      mode: 'Question',
      hint: 'Kya woh so raha hai?',
      zones: [{ id: 'z1', label: 'Is' }, { id: 'z2', label: 'Subject' }, { id: 'z3', label: 'V+ing' }],
      tiles: ['Is', 'he', 'sleeping', 'Are', 'she', 'running'],
      correct: { z1: 'Is', z2: 'he', z3: 'sleeping' },
      vocabWords: ['sleeping'],
    },
  ],

  '2-2': [
    {
      mode: 'Positive',
      hint: 'Main kal school gaya tha',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Past Verb' }, { id: 'z3', label: 'Where' }, { id: 'z4', label: 'When' }],
      tiles: ['I', 'went', 'to school', 'yesterday', 'She', 'goes', 'to market', 'today'],
      correct: { z1: 'I', z2: 'went', z3: 'to school', z4: 'yesterday' },
      vocabWords: ['went', 'yesterday'],
    },
    {
      mode: 'Positive',
      hint: 'Usne raat ke khaane mein chawal pakaye',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Past Verb' }, { id: 'z3', label: 'Object' }, { id: 'z4', label: 'Time' }],
      tiles: ['She', 'cooked', 'rice', 'for dinner', 'He', 'ate', 'bread', 'for lunch'],
      correct: { z1: 'She', z2: 'cooked', z3: 'rice', z4: 'for dinner' },
      vocabWords: ['cooked', 'rice'],
    },
    {
      mode: 'Negative',
      hint: 'Woh class mein nahi aaya',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Did not' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Where' }],
      tiles: ['He', 'did not', 'come', 'to class', 'She', 'does not', 'go', 'to school'],
      correct: { z1: 'He', z2: 'did not', z3: 'come', z4: 'to class' },
      vocabWords: ['come', 'class'],
    },
    {
      mode: 'Question',
      hint: 'Kya tumne nashta kiya?',
      zones: [{ id: 'z1', label: 'Did' }, { id: 'z2', label: 'Subject' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Meal' }],
      tiles: ['Did', 'you', 'eat', 'breakfast', 'Does', 'he', 'drink', 'lunch'],
      correct: { z1: 'Did', z2: 'you', z3: 'eat', z4: 'breakfast' },
      vocabWords: ['breakfast'],
    },
    {
      mode: 'Positive',
      hint: 'Main parh raha tha jab usne call kiya',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Was' }, { id: 'z3', label: 'V+ing' }, { id: 'z4', label: 'When clause' }],
      tiles: ['I', 'was', 'reading', 'when he called', 'She', 'were', 'sleeping', 'when you came'],
      correct: { z1: 'I', z2: 'was', z3: 'reading', z4: 'when he called' },
      vocabWords: ['reading'],
    },
  ],

  '2-3': [
    {
      mode: 'Positive',
      hint: 'Main kal parhoon ga',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Will' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Time' }],
      tiles: ['I', 'will', 'study', 'tomorrow', 'She', 'shall', 'cook', 'tonight'],
      correct: { z1: 'I', z2: 'will', z3: 'study', z4: 'tomorrow' },
      vocabWords: ['study', 'tomorrow'],
    },
    {
      mode: 'Positive',
      hint: 'Woh raat ka khaana pakane wali hai',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Is going to' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Meal' }],
      tiles: ['She', 'is going to', 'cook', 'dinner', 'He', 'will', 'eat', 'lunch'],
      correct: { z1: 'She', z2: 'is going to', z3: 'cook', z4: 'dinner' },
      vocabWords: ['cook', 'dinner'],
    },
    {
      mode: 'Question',
      hint: 'Kya tum party mein aaoge?',
      zones: [{ id: 'z1', label: 'Will' }, { id: 'z2', label: 'Subject' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Where' }],
      tiles: ['Will', 'you', 'come', 'to the party', 'Do', 'he', 'go', 'to school'],
      correct: { z1: 'Will', z2: 'you', z3: 'come', z4: 'to the party' },
      vocabWords: ['party', 'come'],
    },
    {
      mode: 'Positive',
      hint: 'Tumhe jaldi sona chahiye',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Should' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Adverb' }],
      tiles: ['You', 'should', 'sleep', 'early', 'He', 'must', 'study', 'hard'],
      correct: { z1: 'You', z2: 'should', z3: 'sleep', z4: 'early' },
      vocabWords: ['sleep', 'early'],
    },
  ],

  '2-4': [
    {
      mode: 'Question',
      hint: 'Yeh kitne ka hai?',
      zones: [{ id: 'z1', label: 'How' }, { id: 'z2', label: 'Verb' }, { id: 'z3', label: 'This' }],
      tiles: ['How much', 'does', 'this cost', 'How many', 'do', 'these cost'],
      correct: { z1: 'How much', z2: 'does', z3: 'this cost' },
      vocabWords: ['cost'],
    },
    {
      mode: 'Positive',
      hint: 'Mujhe chawal order karna hai',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Would like to' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Object' }],
      tiles: ['I', 'would like to', 'order', 'rice', 'She', 'wants to', 'eat', 'bread'],
      correct: { z1: 'I', z2: 'would like to', z3: 'order', z4: 'rice' },
      vocabWords: ['order', 'rice'],
    },
    {
      mode: 'Question',
      hint: 'Hospital kahan hai?',
      zones: [{ id: 'z1', label: 'Excuse me' }, { id: 'z2', label: 'Where' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Place' }],
      tiles: ['Excuse me,', 'where', 'is', 'the hospital', 'Sorry,', 'when', 'are', 'the school'],
      correct: { z1: 'Excuse me,', z2: 'where', z3: 'is', z4: 'the hospital' },
      vocabWords: ['hospital', 'excuse'],
    },
    {
      mode: 'Question',
      hint: 'Kya main manager se baat kar sakta hoon?',
      zones: [{ id: 'z1', label: 'Can' }, { id: 'z2', label: 'Subject' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Who' }],
      tiles: ['Can', 'I', 'speak to', 'the manager', 'Could', 'you', 'talk to', 'the teacher'],
      correct: { z1: 'Can', z2: 'I', z3: 'speak to', z4: 'the manager' },
      vocabWords: ['manager', 'speak'],
    },
  ],

  '2-5': [
    {
      mode: 'Positive',
      hint: 'Main do ghante se parh raha hoon',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Have been' }, { id: 'z3', label: 'V+ing' }, { id: 'z4', label: 'Duration' }],
      tiles: ['I', 'have been', 'studying', 'for two hours', 'She', 'has been', 'reading', 'since morning'],
      correct: { z1: 'I', z2: 'have been', z3: 'studying', z4: 'for two hours' },
      vocabWords: ['studying', 'hours'],
    },
    {
      mode: 'Positive',
      hint: 'Woh kal yahan hogi',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Will' }, { id: 'z3', label: 'Be' }, { id: 'z4', label: 'Location' }, { id: 'z5', label: 'Time' }],
      tiles: ['She', 'will', 'be', 'here', 'tomorrow', 'He', 'shall', 'is', 'there', 'today'],
      correct: { z1: 'She', z2: 'will', z3: 'be', z4: 'here', z5: 'tomorrow' },
      vocabWords: ['here', 'tomorrow'],
    },
    {
      mode: 'Positive',
      hint: 'Unhe ab tak khatam kar lena chahiye tha',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Should have' }, { id: 'z3', label: 'Past Participle' }, { id: 'z4', label: 'Time' }],
      tiles: ['They', 'should have', 'finished', 'by now', 'He', 'could have', 'started', 'already'],
      correct: { z1: 'They', z2: 'should have', z3: 'finished', z4: 'by now' },
      vocabWords: ['finished'],
    },
    {
      mode: 'Question',
      hint: 'Kya tumne kabhi London dekha hai?',
      zones: [{ id: 'z1', label: 'Have' }, { id: 'z2', label: 'Subject' }, { id: 'z3', label: 'Ever' }, { id: 'z4', label: 'Past Participle' }, { id: 'z5', label: 'Place' }],
      tiles: ['Have', 'you', 'ever', 'visited', 'London', 'Has', 'he', 'never', 'seen', 'Paris'],
      correct: { z1: 'Have', z2: 'you', z3: 'ever', z4: 'visited', z5: 'London' },
      vocabWords: ['visited', 'ever'],
    },
  ],

  /* ══════════════════════════════════════════════
     LEVEL 3 — TOWN
  ══════════════════════════════════════════════ */

  '3-1': [
    {
      mode: 'Positive',
      hint: 'Maine apna ghar ka kaam muka liya hai',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Have' }, { id: 'z3', label: 'Past Participle' }, { id: 'z4', label: 'Object' }],
      tiles: ['I', 'have', 'finished', 'my homework', 'She', 'has', 'started', 'the project'],
      correct: { z1: 'I', z2: 'have', z3: 'finished', z4: 'my homework' },
      vocabWords: ['finished', 'homework'],
    },
    {
      mode: 'Positive',
      hint: 'Usne mere aane se pehle khaana kha liya tha',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Had' }, { id: 'z3', label: 'Past Participle' }, { id: 'z4', label: 'Before clause' }],
      tiles: ['He', 'had', 'eaten', 'before I arrived', 'She', 'has', 'cooked', 'when you left'],
      correct: { z1: 'He', z2: 'had', z3: 'eaten', z4: 'before I arrived' },
      vocabWords: ['eaten', 'arrived'],
    },
    {
      mode: 'Positive',
      hint: 'Project agale hafte tak poori ho jaayegi',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Will have' }, { id: 'z3', label: 'Past Participle' }, { id: 'z4', label: 'Time' }],
      tiles: ['She', 'will have', 'completed', 'the project by Friday', 'He', 'would have', 'started', 'the work by Monday'],
      correct: { z1: 'She', z2: 'will have', z3: 'completed', z4: 'the project by Friday' },
      vocabWords: ['completed', 'project'],
    },
    {
      mode: 'Positive',
      hint: 'Yeh khat Ali ne likha tha',
      zones: [{ id: 'z1', label: 'Article + Noun' }, { id: 'z2', label: 'Was' }, { id: 'z3', label: 'Past Participle' }, { id: 'z4', label: 'Agent' }],
      tiles: ['The letter', 'was', 'written', 'by Ali', 'A report', 'were', 'read', 'by Sara'],
      correct: { z1: 'The letter', z2: 'was', z3: 'written', z4: 'by Ali' },
      vocabWords: ['letter', 'written'],
    },
  ],

  '3-2': [
    {
      mode: 'Positive',
      hint: 'Mujhe imtihan ki wajah se khushi ho rahi hai',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Feel' }, { id: 'z3', label: 'Emotion' }, { id: 'z4', label: 'About' }],
      tiles: ['I', 'feel', 'excited', 'about my exams', 'She', 'feels', 'nervous', 'about the test'],
      correct: { z1: 'I', z2: 'feel', z3: 'excited', z4: 'about my exams' },
      vocabWords: ['excited', 'exams'],
    },
    {
      mode: 'Positive',
      hint: 'Doctor ne mujhe nuskha diya',
      zones: [{ id: 'z1', label: 'Article + Noun' }, { id: 'z2', label: 'Gave' }, { id: 'z3', label: 'Pronoun' }, { id: 'z4', label: 'Object' }],
      tiles: ['The doctor', 'gave', 'me', 'a prescription', 'The teacher', 'told', 'him', 'the answer'],
      correct: { z1: 'The doctor', z2: 'gave', z3: 'me', z4: 'a prescription' },
      vocabWords: ['doctor', 'prescription'],
    },
    {
      mode: 'Positive',
      hint: 'Woh degree ke liye parh rahi hai',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Is' }, { id: 'z3', label: 'V+ing' }, { id: 'z4', label: 'For' }],
      tiles: ['She', 'is', 'studying', 'for a degree', 'He', 'are', 'working', 'for a diploma'],
      correct: { z1: 'She', z2: 'is', z3: 'studying', z4: 'for a degree' },
      vocabWords: ['studying', 'degree'],
    },
    {
      mode: 'Positive',
      hint: 'Sehat mend rehne ke liye kasrat karna zaroori hai',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Need to' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Reason' }],
      tiles: ['We', 'need to', 'exercise', 'to stay healthy', 'I', 'want to', 'rest', 'to feel better'],
      correct: { z1: 'We', z2: 'need to', z3: 'exercise', z4: 'to stay healthy' },
      vocabWords: ['exercise', 'healthy'],
    },
  ],

  '3-3': [
    {
      mode: 'Positive',
      hint: 'Usne sakht mehnat se imtihan diya aur pass ho gaya',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Studied' }, { id: 'z3', label: 'Connector' }, { id: 'z4', label: 'Result' }],
      tiles: ['He', 'studied hard', 'and', 'passed the exam', 'She', 'worked late', 'but', 'failed the test'],
      correct: { z1: 'He', z2: 'studied hard', z3: 'and', z4: 'passed the exam' },
      vocabWords: ['studied', 'passed'],
    },
    {
      mode: 'Positive',
      hint: 'Barishh ke baawajood main school gaya',
      zones: [{ id: 'z1', label: 'Connector' }, { id: 'z2', label: 'Condition' }, { id: 'z3', label: 'Subject' }, { id: 'z4', label: 'Action' }],
      tiles: ['Although', 'it was raining,', 'I', 'went to school', 'Because', 'it snowed,', 'he', 'stayed home'],
      correct: { z1: 'Although', z2: 'it was raining,', z3: 'I', z4: 'went to school' },
      vocabWords: ['although', 'raining'],
    },
    {
      mode: 'Positive',
      hint: 'Woh isliye khub parhti hai kyunke woh kamyab hona chahti hai',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Verb' }, { id: 'z3', label: 'Reason' }, { id: 'z4', label: 'Goal' }],
      tiles: ['She', 'studies hard', 'because', 'she wants to succeed', 'He', 'works late', 'so that', 'he can earn more'],
      correct: { z1: 'She', z2: 'studies hard', z3: 'because', z4: 'she wants to succeed' },
      vocabWords: ['succeed', 'because'],
    },
    {
      mode: 'Positive',
      hint: 'Pehle woh ek chhota bachcha tha, phir woh bara ho gaya',
      zones: [{ id: 'z1', label: 'First' }, { id: 'z2', label: 'Time' }, { id: 'z3', label: 'Then' }, { id: 'z4', label: 'Change' }],
      tiles: ['Once', 'he was a small child,', 'then', 'he grew up', 'Suddenly', 'the sky turned dark,', 'so', 'she ran inside'],
      correct: { z1: 'Once', z2: 'he was a small child,', z3: 'then', z4: 'he grew up' },
      vocabWords: ['once', 'grew'],
    },
  ],

  '3-4': [
    {
      mode: 'Positive',
      hint: 'Usne bola woh baad mein aayega',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Said that' }, { id: 'z3', label: 'Subject' }, { id: 'z4', label: 'Reported Verb' }, { id: 'z5', label: 'When' }],
      tiles: ['He', 'said that', 'he', 'would come', 'later', 'She', 'told me', 'she', 'had finished', 'already'],
      correct: { z1: 'He', z2: 'said that', z3: 'he', z4: 'would come', z5: 'later' },
      vocabWords: ['said', 'come'],
    },
    {
      mode: 'Positive',
      hint: 'Agar barish hoi toh main ghar pe rukunga',
      zones: [{ id: 'z1', label: 'If clause' }, { id: 'z2', label: 'Main clause' }],
      tiles: ['If it rains,', 'I will stay home', 'If she studies,', 'she will pass'],
      correct: { z1: 'If it rains,', z2: 'I will stay home' },
      vocabWords: ['rains', 'stay'],
    },
    {
      mode: 'Question',
      hint: 'Headline ka asli matlab kya tha?',
      zones: [{ id: 'z1', label: 'What' }, { id: 'z2', label: 'Was' }, { id: 'z3', label: 'Main idea' }],
      tiles: ['What', 'was', 'the main idea', 'Where', 'is', 'the headline'],
      correct: { z1: 'What', z2: 'was', z3: 'the main idea' },
      vocabWords: ['main', 'idea'],
    },
    {
      mode: 'Positive',
      hint: 'Usne likha ke woh kal aayegi',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Wrote that' }, { id: 'z3', label: 'She' }, { id: 'z4', label: 'Would' }, { id: 'z5', label: 'V + when' }],
      tiles: ['She', 'wrote that', 'she', 'would', 'arrive the next day', 'He', 'said that', 'he', 'could', 'come later'],
      correct: { z1: 'She', z2: 'wrote that', z3: 'she', z4: 'would', z5: 'arrive the next day' },
      vocabWords: ['wrote', 'arrive'],
    },
  ],

  '3-5': [
    {
      mode: 'Positive',
      hint: 'Agar main zyada parhunga toh main pass hounga',
      zones: [{ id: 'z1', label: 'If clause' }, { id: 'z2', label: 'Subject' }, { id: 'z3', label: 'Will' }, { id: 'z4', label: 'Result' }],
      tiles: ['If I study hard,', 'I', 'will', 'pass the test', 'If she rests,', 'she', 'would', 'feel better'],
      correct: { z1: 'If I study hard,', z2: 'I', z3: 'will', z4: 'pass the test' },
      vocabWords: ['study', 'pass'],
    },
    {
      mode: 'Positive',
      hint: 'Level teen poori ho gayi hai',
      zones: [{ id: 'z1', label: 'Level 3' }, { id: 'z2', label: 'Has been' }, { id: 'z3', label: 'Past Participle' }, { id: 'z4', label: 'Time' }],
      tiles: ['Level 3', 'has been', 'completed', 'successfully', 'Level 2', 'was', 'finished', 'yesterday'],
      correct: { z1: 'Level 3', z2: 'has been', z3: 'completed', z4: 'successfully' },
      vocabWords: ['completed', 'successfully'],
    },
    {
      mode: 'Question',
      hint: 'Kya tumne puri tenses seekh li hain?',
      zones: [{ id: 'z1', label: 'Have' }, { id: 'z2', label: 'You' }, { id: 'z3', label: 'Learnt' }, { id: 'z4', label: 'Object' }],
      tiles: ['Have', 'you', 'learnt', 'all the tenses', 'Did', 'she', 'study', 'grammar'],
      correct: { z1: 'Have', z2: 'you', z3: 'learnt', z4: 'all the tenses' },
      vocabWords: ['learnt', 'tenses'],
    },
  ],

  /* ══════════════════════════════════════════════
     LEVEL 4 — CITY
  ══════════════════════════════════════════════ */

  '4-1': [
    {
      mode: 'Positive',
      hint: 'Usne bohot sakht mehnat ki, isliye woh kamyab hua',
      zones: [{ id: 'z1', label: 'Subject + Verb' }, { id: 'z2', label: 'Connector' }, { id: 'z3', label: 'He' }, { id: 'z4', label: 'Result' }],
      tiles: ['He worked hard;', 'therefore,', 'he', 'succeeded', 'She arrived late;', 'however,', 'she', 'finished first'],
      correct: { z1: 'He worked hard;', z2: 'therefore,', z3: 'he', z4: 'succeeded' },
      vocabWords: ['therefore', 'succeeded'],
    },
    {
      mode: 'Positive',
      hint: 'Woh bohot zyada kaam karte rahe, isliye thak gaye',
      zones: [{ id: 'z1', label: 'Subject + Verb' }, { id: 'z2', label: 'Connector' }, { id: 'z3', label: 'She' }, { id: 'z4', label: 'Effect' }],
      tiles: ['She worked long hours;', 'as a result,', 'she', 'was tired', 'He slept late;', 'consequently,', 'he', 'missed class'],
      correct: { z1: 'She worked long hours;', z2: 'as a result,', z3: 'she', z4: 'was tired' },
      vocabWords: ['result', 'tired'],
    },
    {
      mode: 'Positive',
      hint: 'Iske alawa, iska tehseen karne wala bhi tha',
      zones: [{ id: 'z1', label: 'Connector' }, { id: 'z2', label: 'Subject' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Object' }],
      tiles: ['Moreover,', 'the essay', 'included', 'strong examples', 'However,', 'the report', 'lacked', 'a conclusion'],
      correct: { z1: 'Moreover,', z2: 'the essay', z3: 'included', z4: 'strong examples' },
      vocabWords: ['moreover', 'essay'],
    },
    {
      mode: 'Positive',
      hint: 'Mazak ke bawajood woh muskurate rahe',
      zones: [{ id: 'z1', label: 'In addition' }, { id: 'z2', label: 'Subject' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Complement' }],
      tiles: ['In addition,', 'the writing', 'was', 'very descriptive', 'In contrast,', 'the speech', 'sounded', 'too informal'],
      correct: { z1: 'In addition,', z2: 'the writing', z3: 'was', z4: 'very descriptive' },
      vocabWords: ['addition', 'descriptive'],
    },
  ],

  '4-2': [
    {
      mode: 'Positive',
      hint: 'Main is jagah ke liye درخواست karna chahta hoon',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Would like to' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'For what' }],
      tiles: ['I', 'would like to', 'apply', 'for the position', 'She', 'wants to', 'register', 'for the course'],
      correct: { z1: 'I', z2: 'would like to', z3: 'apply', z4: 'for the position' },
      vocabWords: ['apply', 'position'],
    },
    {
      mode: 'Positive',
      hint: 'Main yeh likhne ke liye likhta hoon',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Am writing' }, { id: 'z3', label: 'Purpose' }],
      tiles: ['I', 'am writing', 'to request a day\'s leave', 'She', 'is writing', 'to complain about the service'],
      correct: { z1: 'I', z2: 'am writing', z3: 'to request a day\'s leave' },
      vocabWords: ['writing', 'request'],
    },
    {
      mode: 'Positive',
      hint: 'Khushkhabri se aap ka CV attached hai',
      zones: [{ id: 'z1', label: 'Please' }, { id: 'z2', label: 'Find' }, { id: 'z3', label: 'Attached' }, { id: 'z4', label: 'Object' }],
      tiles: ['Please', 'find', 'attached', 'my CV', 'Kindly', 'see', 'enclosed', 'the documents'],
      correct: { z1: 'Please', z2: 'find', z3: 'attached', z4: 'my CV' },
      vocabWords: ['attached', 'CV'],
    },
    {
      mode: 'Positive',
      hint: 'Aap ki khidmat mein,',
      zones: [{ id: 'z1', label: 'Closing' }, { id: 'z2', label: 'Name' }],
      tiles: ['Yours sincerely,', 'Bilal Ahmed', 'Best regards,', 'Sara Khan', 'Love,', 'Yours truly,'],
      correct: { z1: 'Yours sincerely,', z2: 'Bilal Ahmed' },
      vocabWords: ['sincerely'],
    },
  ],

  '4-3': [
    {
      mode: 'Positive',
      hint: 'Woh talib-e-ilm jo mehnat se parha, imtihan mein kamyab hua',
      zones: [{ id: 'z1', label: 'Article + Noun' }, { id: 'z2', label: 'Who' }, { id: 'z3', label: 'Verb Clause' }, { id: 'z4', label: 'Main Verb' }],
      tiles: ['The student', 'who', 'studied hard', 'passed the exam', 'The girl', 'that', 'worked late', 'finished first'],
      correct: { z1: 'The student', z2: 'who', z3: 'studied hard', z4: 'passed the exam' },
      vocabWords: ['student', 'passed'],
    },
    {
      mode: 'Positive',
      hint: 'Sirf Bilal ne hi nahi, balke usne bhi practice ki',
      zones: [{ id: 'z1', label: 'Not only' }, { id: 'z2', label: 'Did + Subject' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'But also' }],
      tiles: ['Not only', 'did he', 'study,', 'but he also practised', 'Not only', 'did she', 'sing,', 'but she also danced'],
      correct: { z1: 'Not only', z2: 'did he', z3: 'study,', z4: 'but he also practised' },
      vocabWords: ['practised'],
    },
    {
      mode: 'Positive',
      hint: 'Barishh ke bawajood Bilal school gaya',
      zones: [{ id: 'z1', label: 'Although' }, { id: 'z2', label: 'Obstacle' }, { id: 'z3', label: 'Subject' }, { id: 'z4', label: 'Action' }],
      tiles: ['Although', 'it was raining heavily,', 'Bilal', 'went to school', 'Even though', 'she was tired,', 'Sara', 'kept working'],
      correct: { z1: 'Although', z2: 'it was raining heavily,', z3: 'Bilal', z4: 'went to school' },
      vocabWords: ['although', 'heavily'],
    },
    {
      mode: 'Positive',
      hint: 'Main ustaad ko janata hoon jinhone mujhe sikhaya',
      zones: [{ id: 'z1', label: 'I know' }, { id: 'z2', label: 'The teacher' }, { id: 'z3', label: 'Relative' }, { id: 'z4', label: 'Taught me' }],
      tiles: ['I know', 'the teacher', 'who', 'taught me English', 'She met', 'the person', 'that', 'helped her most'],
      correct: { z1: 'I know', z2: 'the teacher', z3: 'who', z4: 'taught me English' },
      vocabWords: ['teacher', 'taught'],
    },
  ],

  '4-4': [
    {
      mode: 'Positive',
      hint: 'Mere khayal mein taleem zaroori hai',
      zones: [{ id: 'z1', label: 'Opinion phrase' }, { id: 'z2', label: 'Subject' }, { id: 'z3', label: 'Verb' }, { id: 'z4', label: 'Adjective' }],
      tiles: ['In my opinion,', 'education', 'is', 'important', 'I believe that', 'practice', 'makes', 'perfect'],
      correct: { z1: 'In my opinion,', z2: 'education', z3: 'is', z4: 'important' },
      vocabWords: ['opinion', 'education'],
    },
    {
      mode: 'Positive',
      hint: 'Mera yaqeen hai ke mehnat se kamyaabi milti hai',
      zones: [{ id: 'z1', label: 'Believe' }, { id: 'z2', label: 'That' }, { id: 'z3', label: 'Hard work' }, { id: 'z4', label: 'Leads to' }],
      tiles: ['I believe', 'that', 'hard work', 'leads to success', 'She thinks', 'that', 'reading', 'improves vocabulary'],
      correct: { z1: 'I believe', z2: 'that', z3: 'hard work', z4: 'leads to success' },
      vocabWords: ['believe', 'success'],
    },
    {
      mode: 'Positive',
      hint: 'Main ne mirror ke saamne 5 minute bola',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Practised' }, { id: 'z3', label: 'Speaking' }, { id: 'z4', label: 'Duration' }],
      tiles: ['I', 'practised', 'speaking', 'for five minutes', 'She', 'rehearsed', 'her speech', 'for an hour'],
      correct: { z1: 'I', z2: 'practised', z3: 'speaking', z4: 'for five minutes' },
      vocabWords: ['practised', 'speaking'],
    },
    {
      mode: 'Question',
      hint: 'Aap ka kya khayal hai?',
      zones: [{ id: 'z1', label: 'What' }, { id: 'z2', label: 'Do' }, { id: 'z3', label: 'You' }, { id: 'z4', label: 'Think about' }],
      tiles: ['What', 'do', 'you', 'think about this?', 'How', 'does', 'she', 'feel about it?'],
      correct: { z1: 'What', z2: 'do', z3: 'you', z4: 'think about this?' },
      vocabWords: ['think', 'opinion'],
    },
  ],

  '4-5': [
    {
      mode: 'Positive',
      hint: 'Usne raat bhar parh ke project mukamal ki',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Burned' }, { id: 'z3', label: 'The midnight oil' }, { id: 'z4', label: 'To finish' }],
      tiles: ['She', 'burned', 'the midnight oil', 'to finish her project', 'He', 'hit', 'the books', 'to pass the exam'],
      correct: { z1: 'She', z2: 'burned', z3: 'the midnight oil', z4: 'to finish her project' },
      vocabWords: ['midnight', 'project'],
    },
    {
      mode: 'Positive',
      hint: 'Yeh exam bahut aasaan tha',
      zones: [{ id: 'z1', label: 'Article + Noun' }, { id: 'z2', label: 'Was' }, { id: 'z3', label: 'Idiom' }],
      tiles: ['The exam', 'was', 'a piece of cake', 'The match', 'is', 'a piece of cake', 'The task', 'were', 'very hard'],
      correct: { z1: 'The exam', z2: 'was', z3: 'a piece of cake' },
      vocabWords: ['exam', 'piece'],
    },
    {
      mode: 'Positive',
      hint: 'Usne mazhaqiya baat karke aaghaz kiya',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Broke' }, { id: 'z3', label: 'The ice' }, { id: 'z4', label: 'By' }],
      tiles: ['He', 'broke', 'the ice', 'by telling a joke', 'She', 'started', 'the conversation', 'by smiling warmly'],
      correct: { z1: 'He', z2: 'broke', z3: 'the ice', z4: 'by telling a joke' },
      vocabWords: ['broke', 'ice'],
    },
    {
      mode: 'Positive',
      hint: 'Positive raho!',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Told her to' }, { id: 'z3', label: 'Idiom' }],
      tiles: ['He', 'told her to', 'keep her chin up', 'She', 'asked him to', 'pull his socks up'],
      correct: { z1: 'He', z2: 'told her to', z3: 'keep her chin up' },
      vocabWords: ['chin', 'positive'],
    },
  ],

  '4-6': [
    {
      mode: 'Positive',
      hint: 'Ye theek nahi hai phir bhi yeh kaam karta hai',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Is not' }, { id: 'z3', label: 'Perfect' }, { id: 'z4', label: 'Connector' }, { id: 'z5', label: 'It works' }],
      tiles: ['It', 'is not', 'perfect;', 'however,', 'it works', 'He', 'was not', 'ready;', 'therefore,', 'he failed'],
      correct: { z1: 'It', z2: 'is not', z3: 'perfect;', z4: 'however,', z5: 'it works' },
      vocabWords: ['however', 'perfect'],
    },
    {
      mode: 'Positive',
      hint: 'Apni jaan ki aahatein jagaan wala khat likh raha hoon',
      zones: [{ id: 'z1', label: 'Dear' }, { id: 'z2', label: 'Name' }, { id: 'z3', label: 'I am' }, { id: 'z4', label: 'Purpose' }],
      tiles: ['Dear', 'Sir,', 'I am writing', 'to request a meeting', 'Hi', 'Ali,', 'I am texting', 'to say hello'],
      correct: { z1: 'Dear', z2: 'Sir,', z3: 'I am writing', z4: 'to request a meeting' },
      vocabWords: ['request', 'meeting'],
    },
    {
      mode: 'Positive',
      hint: 'Aik complex jumla banao with relative clause',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Relative clause' }, { id: 'z3', label: 'Main verb' }],
      tiles: ['The student', 'who studies every day', 'will succeed', 'The teacher', 'who is kind', 'inspires students'],
      correct: { z1: 'The student', z2: 'who studies every day', z3: 'will succeed' },
      vocabWords: ['student', 'succeed'],
    },
  ],

  /* ══════════════════════════════════════════════
     LEVEL 5 — CAPITAL
  ══════════════════════════════════════════════ */

  '5-1': [
    {
      mode: 'Positive',
      hint: 'Aisa khubsurat manzar maine kabhi nahi dekha tha',
      zones: [{ id: 'z1', label: 'Never' }, { id: 'z2', label: 'Have I' }, { id: 'z3', label: 'Seen' }, { id: 'z4', label: 'Object' }],
      tiles: ['Never', 'have I', 'seen', 'such beauty', 'Rarely', 'does he', 'arrive', 'on time'],
      correct: { z1: 'Never', z2: 'have I', z3: 'seen', z4: 'such beauty' },
      vocabWords: ['never', 'beauty'],
    },
    {
      mode: 'Positive',
      hint: 'Agar main zyada mehnat karta toh aaj kamyab hota',
      zones: [{ id: 'z1', label: 'If clause (past)' }, { id: 'z2', label: 'I' }, { id: 'z3', label: 'Would be' }, { id: 'z4', label: 'Now' }],
      tiles: ['If I had worked harder,', 'I', 'would be', 'successful now', 'If she had studied,', 'she', 'would have', 'passed'],
      correct: { z1: 'If I had worked harder,', z2: 'I', z3: 'would be', z4: 'successful now' },
      vocabWords: ['worked', 'successful'],
    },
    {
      mode: 'Positive',
      hint: 'Khidki John ne todi thi — yeh cleft sentence hai',
      zones: [{ id: 'z1', label: 'It was' }, { id: 'z2', label: 'Person' }, { id: 'z3', label: 'Who' }, { id: 'z4', label: 'Did What' }],
      tiles: ['It was', 'John', 'who', 'broke the window', 'It was', 'Sara', 'that', 'solved the problem'],
      correct: { z1: 'It was', z2: 'John', z3: 'who', z4: 'broke the window' },
      vocabWords: ['broke', 'window'],
    },
    {
      mode: 'Positive',
      hint: 'Kal raat aath baje woh parh raha hoga',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Will be' }, { id: 'z3', label: 'V+ing' }, { id: 'z4', label: 'At time' }],
      tiles: ['I', 'will be', 'studying', 'at 8pm tomorrow', 'She', 'shall be', 'working', 'when you arrive'],
      correct: { z1: 'I', z2: 'will be', z3: 'studying', z4: 'at 8pm tomorrow' },
      vocabWords: ['studying', 'tomorrow'],
    },
  ],

  '5-2': [
    {
      mode: 'Positive',
      hint: 'Yeh khat Sara ne likha',
      zones: [{ id: 'z1', label: 'Article + Noun' }, { id: 'z2', label: 'Was' }, { id: 'z3', label: 'Past Participle' }, { id: 'z4', label: 'By whom' }],
      tiles: ['The letter', 'was', 'written', 'by Sara', 'The report', 'were', 'read', 'by Ali'],
      correct: { z1: 'The letter', z2: 'was', z3: 'written', z4: 'by Sara' },
      vocabWords: ['written', 'letter'],
    },
    {
      mode: 'Positive',
      hint: 'Project waqt par mukammal ho gaya',
      zones: [{ id: 'z1', label: 'Article + Noun' }, { id: 'z2', label: 'Has been' }, { id: 'z3', label: 'Past Participle' }, { id: 'z4', label: 'Adverb' }],
      tiles: ['The project', 'has been', 'completed', 'on time', 'The work', 'have been', 'submitted', 'early'],
      correct: { z1: 'The project', z2: 'has been', z3: 'completed', z4: 'on time' },
      vocabWords: ['completed', 'project'],
    },
    {
      mode: 'Positive',
      hint: 'Naye madrasse agali hafta kholenge',
      zones: [{ id: 'z1', label: 'Article + Noun' }, { id: 'z2', label: 'Will be' }, { id: 'z3', label: 'Past Participle' }, { id: 'z4', label: 'Time' }],
      tiles: ['The new school', 'will be', 'opened', 'next week', 'The prize', 'shall be', 'awarded', 'tomorrow'],
      correct: { z1: 'The new school', z2: 'will be', z3: 'opened', z4: 'next week' },
      vocabWords: ['opened', 'school'],
    },
    {
      mode: 'Question',
      hint: 'Report kab submit ki jaayegi?',
      zones: [{ id: 'z1', label: 'When' }, { id: 'z2', label: 'Will' }, { id: 'z3', label: 'Article + Noun' }, { id: 'z4', label: 'Be submitted' }],
      tiles: ['When', 'will', 'the report', 'be submitted', 'Where', 'has', 'the document', 'been sent'],
      correct: { z1: 'When', z2: 'will', z3: 'the report', z4: 'be submitted' },
      vocabWords: ['report', 'submitted'],
    },
  ],

  '5-3': [
    {
      mode: 'Positive',
      hint: 'Woh apne manager se ittefaq rakhti hai',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Sees eye to eye' }, { id: 'z3', label: 'With' }, { id: 'z4', label: 'Who' }],
      tiles: ['She', 'sees eye to eye', 'with', 'her manager', 'He', 'disagrees', 'with', 'his colleague'],
      correct: { z1: 'She', z2: 'sees eye to eye', z3: 'with', z4: 'her manager' },
      vocabWords: ['manager', 'agree'],
    },
    {
      mode: 'Positive',
      hint: 'Usne kaam shuru karne se pehle team se rabta kiya',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Touched base' }, { id: 'z3', label: 'With' }, { id: 'z4', label: 'Before' }],
      tiles: ['He', 'touched base', 'with the team', 'before leaving', 'She', 'checked in', 'with her mentor', 'after the meeting'],
      correct: { z1: 'He', z2: 'touched base', z3: 'with the team', z4: 'before leaving' },
      vocabWords: ['team', 'leaving'],
    },
    {
      mode: 'Positive',
      hint: 'Unhone kaam shuru kar diya',
      zones: [{ id: 'z1', label: 'They' }, { id: 'z2', label: 'Got' }, { id: 'z3', label: 'The ball' }, { id: 'z4', label: 'Rolling' }],
      tiles: ['They', 'got', 'the ball', 'rolling', 'She', 'kicked', 'the project', 'off'],
      correct: { z1: 'They', z2: 'got', z3: 'the ball', z4: 'rolling' },
      vocabWords: ['rolling', 'started'],
    },
    {
      mode: 'Positive',
      hint: 'Aakhirkar jo ahem hai woh natija hai',
      zones: [{ id: 'z1', label: 'At the end' }, { id: 'z2', label: 'Of the day' }, { id: 'z3', label: 'What matters is' }, { id: 'z4', label: 'The result' }],
      tiles: ['At the end', 'of the day,', 'what matters is', 'the result', 'In the end,', 'nothing', 'compares to', 'hard work'],
      correct: { z1: 'At the end', z2: 'of the day,', z3: 'what matters is', z4: 'the result' },
      vocabWords: ['matters', 'result'],
    },
  ],

  '5-4': [
    {
      mode: 'Positive',
      hint: 'Yeh form carefully bharein',
      zones: [{ id: 'z1', label: 'Please' }, { id: 'z2', label: 'Fill out' }, { id: 'z3', label: 'This' }, { id: 'z4', label: 'Adverb' }],
      tiles: ['Please', 'fill out', 'this form', 'carefully', 'Kindly', 'fill in', 'the blanks', 'correctly'],
      correct: { z1: 'Please', z2: 'fill out', z3: 'this form', z4: 'carefully' },
      vocabWords: ['fill', 'form'],
    },
    {
      mode: 'Positive',
      hint: 'Usne pichle saal cigarette chhodna chhoda',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Gave up' }, { id: 'z3', label: 'What' }, { id: 'z4', label: 'When' }],
      tiles: ['She', 'gave up', 'smoking', 'last year', 'He', 'stopped', 'drinking', 'in January'],
      correct: { z1: 'She', z2: 'gave up', z3: 'smoking', z4: 'last year' },
      vocabWords: ['gave', 'smoking'],
    },
    {
      mode: 'Question',
      hint: 'Kya aap kisi bhi mushkil mein aa gaye?',
      zones: [{ id: 'z1', label: 'Did you' }, { id: 'z2', label: 'Run into' }, { id: 'z3', label: 'Any' }, { id: 'z4', label: 'Problems' }],
      tiles: ['Did you', 'run into', 'any', 'problems', 'Have you', 'come across', 'some', 'difficulties'],
      correct: { z1: 'Did you', z2: 'run into', z3: 'any', z4: 'problems' },
      vocabWords: ['problems', 'difficulties'],
    },
    {
      mode: 'Positive',
      hint: 'Usne meeting mein apni baat rakh di',
      zones: [{ id: 'z1', label: 'She' }, { id: 'z2', label: 'Spoke' }, { id: 'z3', label: 'Up' }, { id: 'z4', label: 'In the meeting' }],
      tiles: ['She', 'spoke', 'up', 'in the meeting', 'He', 'stood', 'out', 'at the event'],
      correct: { z1: 'She', z2: 'spoke', z3: 'up', z4: 'in the meeting' },
      vocabWords: ['spoke', 'meeting'],
    },
  ],

  '5-5': [
    {
      mode: 'Positive',
      hint: 'Hum partnership ka tarjoha karna chahte hain',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Would like to' }, { id: 'z3', label: 'Propose' }, { id: 'z4', label: 'Object' }],
      tiles: ['We', 'would like to', 'propose', 'a partnership', 'I', 'want to', 'suggest', 'a solution'],
      correct: { z1: 'We', z2: 'would like to', z3: 'propose', z4: 'a partnership' },
      vocabWords: ['propose', 'partnership'],
    },
    {
      mode: 'Positive',
      hint: 'Hamaari aamdani ne hamari umeedein paar kar li',
      zones: [{ id: 'z1', label: 'Article + Noun' }, { id: 'z2', label: 'Exceeded' }, { id: 'z3', label: 'Our' }, { id: 'z4', label: 'Expectations' }],
      tiles: ['The revenue', 'exceeded', 'our', 'expectations', 'The results', 'surpassed', 'all', 'predictions'],
      correct: { z1: 'The revenue', z2: 'exceeded', z3: 'our', z4: 'expectations' },
      vocabWords: ['revenue', 'exceeded'],
    },
    {
      mode: 'Positive',
      hint: 'Kya aap yeh mazeed samjha sakte hain?',
      zones: [{ id: 'z1', label: 'Could you' }, { id: 'z2', label: 'Elaborate' }, { id: 'z3', label: 'On' }, { id: 'z4', label: 'That point' }],
      tiles: ['Could you', 'elaborate', 'on', 'that point', 'Would you', 'clarify', 'what', 'you mean'],
      correct: { z1: 'Could you', z2: 'elaborate', z3: 'on', z4: 'that point' },
      vocabWords: ['elaborate', 'clarify'],
    },
    {
      mode: 'Positive',
      hint: 'Khulaasa karte hue keh sakte hain ke',
      zones: [{ id: 'z1', label: 'To summarise,' }, { id: 'z2', label: 'Our proposal' }, { id: 'z3', label: 'Will' }, { id: 'z4', label: 'Benefit all' }],
      tiles: ['To summarise,', 'our proposal', 'will', 'benefit all', 'In conclusion,', 'this strategy', 'could', 'reduce costs'],
      correct: { z1: 'To summarise,', z2: 'our proposal', z3: 'will', z4: 'benefit all' },
      vocabWords: ['summarise', 'proposal'],
    },
  ],

  '5-6': [
    {
      mode: 'Positive',
      hint: 'Graph ek significant izafe ko dikhata hai',
      zones: [{ id: 'z1', label: 'Article + Noun' }, { id: 'z2', label: 'Shows' }, { id: 'z3', label: 'A significant' }, { id: 'z4', label: 'Object' }],
      tiles: ['The graph', 'shows', 'a significant', 'increase', 'The chart', 'illustrates', 'a dramatic', 'decline'],
      correct: { z1: 'The graph', z2: 'shows', z3: 'a significant', z4: 'increase' },
      vocabWords: ['significant', 'increase'],
    },
    {
      mode: 'Positive',
      hint: 'Technology ke fayde aur nuksan hain',
      zones: [{ id: 'z1', label: 'While' }, { id: 'z2', label: 'Technology offers' }, { id: 'z3', label: 'Benefits,' }, { id: 'z4', label: 'Its misuse' }],
      tiles: ['While', 'technology offers', 'many benefits,', 'its misuse poses risks', 'Although', 'science advances,', 'some problems,', 'still remain'],
      correct: { z1: 'While', z2: 'technology offers', z3: 'many benefits,', z4: 'its misuse poses risks' },
      vocabWords: ['technology', 'benefits'],
    },
    {
      mode: 'Positive',
      hint: 'Bahut kam log aise faisle karte hain',
      zones: [{ id: 'z1', label: 'Rarely' }, { id: 'z2', label: 'Do people' }, { id: 'z3', label: 'Make such' }, { id: 'z4', label: 'Bold decisions' }],
      tiles: ['Rarely', 'do people', 'make such', 'bold decisions', 'Seldom', 'does one', 'find such', 'determination'],
      correct: { z1: 'Rarely', z2: 'do people', z3: 'make such', z4: 'bold decisions' },
      vocabWords: ['rarely', 'decisions'],
    },
  ],

  /* ══════════════════════════════════════════════
     LEVEL 6 — WORLD STAGE
  ══════════════════════════════════════════════ */

  '6-1': [
    {
      mode: 'Positive',
      hint: 'Main is jagah ke liye darchkwast karna chahta hoon',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Am writing to' }, { id: 'z3', label: 'Express' }, { id: 'z4', label: 'Interest in' }],
      tiles: ['I', 'am writing to', 'express', 'my interest in the role', 'She', 'is writing to', 'apply', 'for the position'],
      correct: { z1: 'I', z2: 'am writing to', z3: 'express', z4: 'my interest in the role' },
      vocabWords: ['express', 'interest'],
    },
    {
      mode: 'Positive',
      hint: 'Kripya attached mera CV dekhen',
      zones: [{ id: 'z1', label: 'Please' }, { id: 'z2', label: 'Find' }, { id: 'z3', label: 'Attached' }, { id: 'z4', label: 'My resume' }],
      tiles: ['Please', 'find', 'attached', 'my resume', 'Kindly', 'see', 'enclosed', 'the application'],
      correct: { z1: 'Please', z2: 'find', z3: 'attached', z4: 'my resume' },
      vocabWords: ['attached', 'resume'],
    },
    {
      mode: 'Positive',
      hint: 'Main iss baare mein aapki raay ka intezaar karunga',
      zones: [{ id: 'z1', label: 'I look' }, { id: 'z2', label: 'Forward to' }, { id: 'z3', label: 'Hearing' }, { id: 'z4', label: 'From you' }],
      tiles: ['I look', 'forward to', 'hearing', 'from you', 'She looks', 'forward to', 'meeting', 'with you'],
      correct: { z1: 'I look', z2: 'forward to', z3: 'hearing', z4: 'from you' },
      vocabWords: ['forward', 'hearing'],
    },
    {
      mode: 'Positive',
      hint: 'Main apni درخواست par baat karne ke liye khush hounga',
      zones: [{ id: 'z1', label: 'I would' }, { id: 'z2', label: 'Welcome' }, { id: 'z3', label: 'The opportunity' }, { id: 'z4', label: 'To discuss' }],
      tiles: ['I would', 'welcome', 'the opportunity', 'to discuss further', 'She would', 'appreciate', 'the chance', 'to present her work'],
      correct: { z1: 'I would', z2: 'welcome', z3: 'the opportunity', z4: 'to discuss further' },
      vocabWords: ['opportunity', 'discuss'],
    },
  ],

  '6-2': [
    {
      mode: 'Positive',
      hint: 'Meri sabse badi khobi detail par dhyan dena hai',
      zones: [{ id: 'z1', label: 'My greatest' }, { id: 'z2', label: 'Strength is' }, { id: 'z3', label: 'My ability to' }, { id: 'z4', label: 'Skill' }],
      tiles: ['My greatest', 'strength is', 'my ability to', 'pay attention to detail', 'One of my', 'skills is', 'my capacity to', 'work under pressure'],
      correct: { z1: 'My greatest', z2: 'strength is', z3: 'my ability to', z4: 'pay attention to detail' },
      vocabWords: ['strength', 'attention'],
    },
    {
      mode: 'Positive',
      hint: 'Mujhe digital marketing mein 5 saal ka tajurba hai',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Have' }, { id: 'z3', label: 'Years of experience' }, { id: 'z4', label: 'In field' }],
      tiles: ['I', 'have', 'five years of experience', 'in digital marketing', 'She', 'has', 'ten years of experience', 'in project management'],
      correct: { z1: 'I', z2: 'have', z3: 'five years of experience', z4: 'in digital marketing' },
      vocabWords: ['experience', 'marketing'],
    },
    {
      mode: 'Question',
      hint: 'Aap 5 saal baad khud ko kahan dekhte hain?',
      zones: [{ id: 'z1', label: 'Where' }, { id: 'z2', label: 'Do you see' }, { id: 'z3', label: 'Yourself' }, { id: 'z4', label: 'In 5 years' }],
      tiles: ['Where', 'do you see', 'yourself', 'in five years', 'What', 'are your', 'goals', 'for the future'],
      correct: { z1: 'Where', z2: 'do you see', z3: 'yourself', z4: 'in five years' },
      vocabWords: ['yourself', 'future'],
    },
    {
      mode: 'Positive',
      hint: 'Main team aur company ki taraqqi mein hissa daalna chahta hoon',
      zones: [{ id: 'z1', label: 'I aim to' }, { id: 'z2', label: 'Lead a team' }, { id: 'z3', label: 'And contribute to' }, { id: 'z4', label: 'Company growth' }],
      tiles: ['I aim to', 'lead a team', 'and contribute to', 'company growth', 'I hope to', 'manage projects', 'and help', 'expand the business'],
      correct: { z1: 'I aim to', z2: 'lead a team', z3: 'and contribute to', z4: 'company growth' },
      vocabWords: ['lead', 'contribute'],
    },
  ],

  '6-3': [
    {
      mode: 'Positive',
      hint: 'Hukumat ne ghurbat khatam karne ke liye polisiyan naafit kiyin',
      zones: [{ id: 'z1', label: 'The government' }, { id: 'z2', label: 'Implemented' }, { id: 'z3', label: 'Policies to' }, { id: 'z4', label: 'Alleviate poverty' }],
      tiles: ['The government', 'implemented', 'policies to', 'alleviate poverty', 'The agency', 'introduced', 'measures to', 'reduce inequality'],
      correct: { z1: 'The government', z2: 'implemented', z3: 'policies to', z4: 'alleviate poverty' },
      vocabWords: ['implemented', 'alleviate'],
    },
    {
      mode: 'Positive',
      hint: 'Climate change ne pehle se maujood mushkilaat ko aur bada diya',
      zones: [{ id: 'z1', label: 'Climate change' }, { id: 'z2', label: 'Exacerbates' }, { id: 'z3', label: 'Existing' }, { id: 'z4', label: 'Challenges' }],
      tiles: ['Climate change', 'exacerbates', 'existing', 'challenges', 'Pollution', 'worsens', 'current', 'health problems'],
      correct: { z1: 'Climate change', z2: 'exacerbates', z3: 'existing', z4: 'challenges' },
      vocabWords: ['exacerbates', 'challenges'],
    },
    {
      mode: 'Positive',
      hint: 'Berozgaari mein ijaafa laazmee lag raha tha',
      zones: [{ id: 'z1', label: 'A rise' }, { id: 'z2', label: 'In unemployment' }, { id: 'z3', label: 'Seemed' }, { id: 'z4', label: 'Inevitable' }],
      tiles: ['A rise', 'in unemployment', 'seemed', 'inevitable', 'A decline', 'in investment', 'appeared', 'unavoidable'],
      correct: { z1: 'A rise', z2: 'in unemployment', z3: 'seemed', z4: 'inevitable' },
      vocabWords: ['inevitable', 'unemployment'],
    },
    {
      mode: 'Positive',
      hint: 'Inqilaabi technology tezi se phal phool rahi hai',
      zones: [{ id: 'z1', label: 'Innovative' }, { id: 'z2', label: 'Technologies' }, { id: 'z3', label: 'Are' }, { id: 'z4', label: 'Proliferating rapidly' }],
      tiles: ['Innovative', 'technologies', 'are', 'proliferating rapidly', 'New', 'industries', 'have', 'emerged swiftly'],
      correct: { z1: 'Innovative', z2: 'technologies', z3: 'are', z4: 'proliferating rapidly' },
      vocabWords: ['technologies', 'proliferating'],
    },
  ],

  '6-4': [
    {
      mode: 'Positive',
      hint: 'Graph ek makhsoos izafe ko darshata hai',
      zones: [{ id: 'z1', label: 'The graph' }, { id: 'z2', label: 'Illustrates' }, { id: 'z3', label: 'A significant' }, { id: 'z4', label: 'Upward trend' }],
      tiles: ['The graph', 'illustrates', 'a significant', 'upward trend', 'The chart', 'shows', 'a steady', 'decline'],
      correct: { z1: 'The graph', z2: 'illustrates', z3: 'a significant', z4: 'upward trend' },
      vocabWords: ['illustrates', 'trend'],
    },
    {
      mode: 'Positive',
      hint: 'Mushkilaat ke bawajood team kamyab rahi',
      zones: [{ id: 'z1', label: 'Despite' }, { id: 'z2', label: 'The challenges,' }, { id: 'z3', label: 'The team' }, { id: 'z4', label: 'Succeeded' }],
      tiles: ['Despite', 'the challenges,', 'the team', 'succeeded', 'Although', 'it was difficult,', 'they', 'continued'],
      correct: { z1: 'Despite', z2: 'the challenges,', z3: 'the team', z4: 'succeeded' },
      vocabWords: ['despite', 'succeeded'],
    },
    {
      mode: 'Positive',
      hint: 'Skimming se aap main idea paate hain',
      zones: [{ id: 'z1', label: 'Skimming' }, { id: 'z2', label: 'Helps you' }, { id: 'z3', label: 'Find' }, { id: 'z4', label: 'The main idea' }],
      tiles: ['Skimming', 'helps you', 'find', 'the main idea', 'Scanning', 'allows you to', 'locate', 'specific details'],
      correct: { z1: 'Skimming', z2: 'helps you', z3: 'find', z4: 'the main idea' },
      vocabWords: ['skimming', 'idea'],
    },
    {
      mode: 'Question',
      hint: 'Kya yeh IELTS passage mein clearly likha hai?',
      zones: [{ id: 'z1', label: 'Is this' }, { id: 'z2', label: 'Information' }, { id: 'z3', label: 'Stated' }, { id: 'z4', label: 'In the passage' }],
      tiles: ['Is this', 'information', 'stated', 'in the passage', 'Has this', 'claim', 'been proven', 'in the text'],
      correct: { z1: 'Is this', z2: 'information', z3: 'stated', z4: 'in the passage' },
      vocabWords: ['stated', 'passage'],
    },
  ],

  '6-5': [
    {
      mode: 'Positive',
      hint: 'Usne apna khatba itmeenan se diya',
      zones: [{ id: 'z1', label: 'Subject' }, { id: 'z2', label: 'Delivered' }, { id: 'z3', label: 'Her speech' }, { id: 'z4', label: 'Adverb' }],
      tiles: ['She', 'delivered', 'her speech', 'confidently', 'He', 'presented', 'his report', 'clearly'],
      correct: { z1: 'She', z2: 'delivered', z3: 'her speech', z4: 'confidently' },
      vocabWords: ['delivered', 'confidently'],
    },
    {
      mode: 'Positive',
      hint: 'Awaaz ki sahi nakami aur ubthari se bol',
      zones: [{ id: 'z1', label: 'Speak' }, { id: 'z2', label: 'With' }, { id: 'z3', label: 'Clear' }, { id: 'z4', label: 'Intonation' }],
      tiles: ['Speak', 'with', 'clear', 'intonation', 'Talk', 'using', 'correct', 'pronunciation'],
      correct: { z1: 'Speak', z2: 'with', z3: 'clear', z4: 'intonation' },
      vocabWords: ['intonation', 'pronunciation'],
    },
    {
      mode: 'Positive',
      hint: 'Shadowing se native jesi awaaz aati hai',
      zones: [{ id: 'z1', label: 'Shadowing' }, { id: 'z2', label: 'Helps you' }, { id: 'z3', label: 'Sound' }, { id: 'z4', label: 'More natural' }],
      tiles: ['Shadowing', 'helps you', 'sound', 'more natural', 'Practice', 'makes', 'your speech', 'more fluent'],
      correct: { z1: 'Shadowing', z2: 'helps you', z3: 'sound', z4: 'more natural' },
      vocabWords: ['shadowing', 'natural'],
    },
  ],

  '6-6': [
    {
      mode: 'Positive',
      hint: 'Teen sau din mein main ne yeh safar poora kiya',
      zones: [{ id: 'z1', label: 'In' }, { id: 'z2', label: 'Three hundred days,' }, { id: 'z3', label: 'I have' }, { id: 'z4', label: 'Completed this journey' }],
      tiles: ['In', 'three hundred days,', 'I have', 'completed this journey', 'Over', 'many months,', 'she has', 'mastered English'],
      correct: { z1: 'In', z2: 'three hundred days,', z3: 'I have', z4: 'completed this journey' },
      vocabWords: ['completed', 'journey'],
    },
    {
      mode: 'Positive',
      hint: 'Agar main koshish kar sakta hoon toh tum bhi kar sakte ho',
      zones: [{ id: 'z1', label: 'If I can' }, { id: 'z2', label: 'Do it,' }, { id: 'z3', label: 'You' }, { id: 'z4', label: 'Can do it too' }],
      tiles: ['If I can', 'do it,', 'you', 'can do it too', 'If she could', 'succeed,', 'anyone', 'can achieve it'],
      correct: { z1: 'If I can', z2: 'do it,', z3: 'you', z4: 'can do it too' },
      vocabWords: ['succeed', 'achieve'],
    },
    {
      mode: 'Positive',
      hint: 'Har roz ek ghante ki mehnat sab kuch badal deti hai',
      zones: [{ id: 'z1', label: 'One hour' }, { id: 'z2', label: 'A day' }, { id: 'z3', label: 'Changes' }, { id: 'z4', label: 'Everything' }],
      tiles: ['One hour', 'a day', 'changes', 'everything', 'Daily practice', 'of English', 'transforms', 'your future'],
      correct: { z1: 'One hour', z2: 'a day', z3: 'changes', z4: 'everything' },
      vocabWords: ['changes', 'everything'],
    },
    {
      mode: 'Positive',
      hint: 'Main World Stage par khada hoon — Ingilish ki wajah se',
      zones: [{ id: 'z1', label: 'Thanks to' }, { id: 'z2', label: 'English,' }, { id: 'z3', label: 'I am' }, { id: 'z4', label: 'Ready for the world' }],
      tiles: ['Thanks to', 'English,', 'I am', 'ready for the world', 'Because of', 'hard work,', 'she has', 'achieved her dream'],
      correct: { z1: 'Thanks to', z2: 'English,', z3: 'I am', z4: 'ready for the world' },
      vocabWords: ['English', 'world'],
    },
  ],
}

export function getSentences(module: number, level = 1): SentenceExercise[] {
  return EXERCISES[`${level}-${module}`] ?? []
}
