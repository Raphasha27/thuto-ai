<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Difficulty Selection -->
    <div v-if="showingDifficultySelection" class="max-w-xl mx-auto text-center animate-fade-in">
      <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-8">Select Difficulty Layer</h2>
      
      <div class="grid gap-4">
        <button v-for="level in ['Easy', 'Medium', 'Hard']" :key="level"
          @click="startQuiz(level)"
          class="p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105"
          :class="{
            'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40': level === 'Easy',
            'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/40': level === 'Medium',
            'border-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40': level === 'Hard'
          }"
        >
          <div class="text-xl font-bold mb-1" :class="{
            'text-emerald-600 dark:text-emerald-400': level === 'Easy',
            'text-yellow-600 dark:text-yellow-400': level === 'Medium',
            'text-red-600 dark:text-red-400': level === 'Hard'
          }">
            {{ level }} Mode
          </div>
          <div class="text-sm text-slate-600 dark:text-slate-400">
            {{ level === 'Easy' ? 'Fundamentals & Basics' : level === 'Medium' ? 'Standard Curriculum' : 'Advanced & Challenge' }}
          </div>
        </button>
      </div>
    </div>

    <!-- Quiz Interface -->
    <div v-else-if="!showResult" class="transition-all duration-300 ease-in-out">
      <!-- Quiz Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <button @click="resetToDifficulty" class="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white text-sm flex items-center gap-1 mb-2">
            &larr; Change Difficulty
          </button>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white capitalize">{{ $route.params.id }} Quiz <span class="text-sm font-normal text-slate-500 ml-2">({{ currentDifficulty }})</span></h1>
        </div>
        <div class="text-right">
          <div class="text-sm text-slate-500 dark:text-slate-400">Time Remaining</div>
          <div class="text-xl font-mono text-sky-500 dark:text-sky-400 font-bold">{{ formattedTime }}</div>
        </div>
      </div>

      <!-- Question Card -->
      <div class="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl mb-8 relative overflow-hidden transition-colors duration-300">
        <!-- Progress Bar -->
        <div class="absolute top-0 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700">
          <div class="h-full bg-sky-500 transition-all duration-300" :style="{ width: progressPercentage + '%' }"></div>
        </div>
        
        <div class="mb-6">
          <span class="text-xs font-semibold tracking-wider text-indigo-500 dark:text-indigo-400 uppercase">Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}</span>
          <h2 class="text-xl md:text-2xl font-medium text-slate-800 dark:text-white mt-4 leading-relaxed">
            {{ currentQuestion.text }}
          </h2>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <button v-for="(option, idx) in currentQuestion.options" :key="idx" 
            @click="selectOption(idx)"
            :class="[
              'p-4 rounded-lg border text-left transition-all duration-200',
              selectedOption === idx 
                ? 'border-sky-500 bg-sky-50 dark:bg-sky-500/10 ring-1 ring-sky-500' 
                : 'border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            ]"
          >
            <div class="flex items-center">
              <span :class="[
                'min-w-[2rem] h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 border',
                selectedOption === idx 
                  ? 'bg-sky-500 border-sky-500 text-white' 
                  : 'border-slate-300 dark:border-slate-500 text-slate-500'
              ]">
                {{ ['A', 'B', 'C', 'D'][idx] }}
              </span>
              <span :class="selectedOption === idx ? 'text-slate-900 dark:text-white' : ''">{{ option }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-4">
        <button @click="skipQuestion" class="px-6 py-3 rounded-lg font-bold text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          Skip <span class="hidden sm:inline">Question</span>
        </button>
        <button @click="nextQuestion" 
          :disabled="selectedOption === null"
          :class="[
            'px-8 py-3 rounded-lg font-bold text-white transition-all',
            selectedOption === null 
              ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed text-slate-500' 
              : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20'
          ]">
          {{ isLastQuestion ? 'Finish Quiz' : 'Next Question' }}
        </button>
      </div>
      
      <!-- AI Hint Section -->
      <div class="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8">
        <div class="bg-indigo-50 dark:bg-slate-900/50 rounded-lg p-6 border border-indigo-100 dark:border-slate-700/50 border-dashed">
          <div class="flex items-start gap-4">
            <div class="p-2 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg">
               <span class="text-2xl">💡</span>
            </div>
            <div>
              <h3 class="text-indigo-600 dark:text-indigo-400 font-bold mb-1">Stuck? Ask Thuto AI</h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm mb-4">Our AI tutor can explain this concept without giving away the answer.</p>
              
              <div v-if="hintVisible" class="bg-indigo-100 dark:bg-slate-800/80 p-4 rounded mb-4 text-sm text-indigo-800 dark:text-sky-200 border border-indigo-200 dark:border-indigo-500/30">
                <p><strong>Hint:</strong> {{ currentQuestion.hint }}</p>
              </div>

              <button @click="toggleHint" class="text-xs bg-indigo-100 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 px-3 py-1.5 rounded hover:bg-indigo-200 dark:hover:bg-indigo-600/30 transition-colors">
                {{ hintVisible ? 'Hide Hint' : 'Get a Hint' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Results View -->
    <div v-else class="text-center py-12 animate-fade-in">
      <div class="inline-block p-6 rounded-full bg-slate-100 dark:bg-slate-800 mb-8 border border-slate-200 dark:border-slate-700 shadow-2xl">
        <span class="text-6xl">🎉</span>
      </div>
      <h2 class="text-4xl font-bold text-slate-900 dark:text-white mb-4">Quiz Completed!</h2>
      <p class="text-xl text-slate-600 dark:text-slate-400 mb-8">You have completed the {{ currentDifficulty }} stage.</p>
      
      <div class="bg-white dark:bg-slate-800 max-w-sm mx-auto rounded-xl p-8 border border-slate-200 dark:border-slate-700 mb-8 shadow-lg">
        <div class="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Your Score</div>
        <div class="text-5xl font-black text-indigo-600 dark:text-sky-400 mb-2">{{ score }}%</div>
        <div class="text-slate-600 dark:text-slate-500">
          {{ correctAnswers }} out of {{ questions.length }} correct
        </div>
      </div>

      <div class="flex justify-center gap-4">
        <router-link to="/subjects" class="px-6 py-3 rounded-lg font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-600 transition-colors">
          Choose Subject
        </router-link>
        <button @click="resetToDifficulty" class="px-8 py-3 rounded-lg font-bold bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const subjectId = route.params.id

// State
const showingDifficultySelection = ref(true)
const currentDifficulty = ref('Medium')
const currentQuestionIndex = ref(0)
const selectedOption = ref(null)
const showResult = ref(false)
const score = ref(0)
const correctAnswers = ref(0)
const hintVisible = ref(false)
const timeRemaining = ref(900)
let timerInterval = null

// Mock Questions Data (In a real app, this would be fetched from an API)
const questionsData = {
  math: [
    { text: "Solve for x: 2x² + 5x - 3 = 0", options: ['x = 0.5 or x = -3', 'x = -0.5 or x = 3', 'x = 2 or x = -1.5', 'x = 1 or x = -3'], correct: 0, hint: "Factorize the quadratic equation (2x - 1)(x + 3) = 0" },
    { text: "Calculate the derivative of f(x) = 3x² + 4x - 2", options: ['6x + 4', '3x + 4', '6x - 2', 'x² + 4'], correct: 0, hint: "Use the power rule: d/dx(axⁿ) = anxⁿ⁻¹" },
    { text: "What is the value of sin(30°)?", options: ['1', '0.5', '√3/2', '√2/2'], correct: 1, hint: "Think about the special right triangle (30-60-90) or the unit circle." },
    { text: "Simplify: log₁₀(1000)", options: ['10', '100', '3', '2'], correct: 2, hint: "10 raised to what power equals 1000?" },
    { text: "If a circle has a radius of 4cm, what is its area? (use π ≈ 3.14)", options: ['12.56 cm²', '25.12 cm²', '50.24 cm²', '16 cm²'], correct: 2, hint: "Area = πr²" }
  ],
  physics: [
    { text: "Which formula represents Newton's Second Law of Motion?", options: ['F = m/a', 'F = ma', 'F = mv', 'F = mgh'], correct: 1, hint: "Force is proportional to mass and acceleration." },
    { text: "What is the chemical formula for Sulphuric Acid?", options: ['HCl', 'HNO₃', 'H₂SO₄', 'CH₃COOH'], correct: 2, hint: "It contains 2 Hydrogen, 1 Sulphur, and 4 Oxygen atoms." },
    { text: "Which quantity is a vector?", options: ['Speed', 'Mass', 'Velocity', 'Distance'], correct: 2, hint: "Vectors have both magnitude and direction." },
    { text: "What is the unit of Power?", options: ['Joule', 'Newton', 'Watt', 'Pascal'], correct: 2, hint: "Power is the rate of doing work (Joules per second)." },
    { text: "In an organic alcohol, which functional group is present?", options: ['-COOH', '-OH', '-CHO', '-NH₂'], correct: 1, hint: "Think of the hydroxyl group found in ethanol." }
  ],
  'life-sciences': [
    { text: "Which organelle is known as the 'powerhouse' of the cell?", options: ['Nucleus', 'Ribosome', 'Mitochondrion', 'Chloroplast'], correct: 2, hint: "It is the site of cellular respiration and ATP production." },
    { text: "In DNA pairing, Adenine (A) always pairs with:", options: ['Guanine (G)', 'Cytosine (C)', 'Thymine (T)', 'Uracil (U)'], correct: 2, hint: "Think of the straight-line letters pairing together (A-T)." },
    { text: "How many chambers does the human heart have?", options: ['2', '3', '4', '6'], correct: 2, hint: "Two atria and two ventricles." },
    { text: "What is the primary product of photosynthesis?", options: ['Carbon Dioxide', 'Glucose', 'Water', 'Nitrogen'], correct: 1, hint: "Plants convert light energy into chemical energy stored as sugar." },
    { text: "What function do enzymes serve in biological systems?", options: ['Transport oxygen', 'Store energy', 'Biological catalysts', 'Structural support'], correct: 2, hint: "They speed up chemical reactions without being consumed." }
  ],
  accounting: [
    { text: "What is the fundamental Accounting Equation?", options: ['Assets = Liabilities - Owner\'s Equity', 'Assets + Liabilities = Owner\'s Equity', 'Assets = Owner\'s Equity + Liabilities', 'Assets = Owner\'s Equity - Liabilities'], correct: 2, hint: "Everything the business owns is funded by either the owner or external debts." },
    { text: "Which financial statement shows the financial position at a specific date?", options: ['Income Statement', 'Balance Sheet', 'Cash Flow Statement', 'General Ledger'], correct: 1, hint: "It lists assets, liabilities, and equity at a snapshot in time." },
    { text: "What is depreciation?", options: ['Increase in asset value', 'Allocation of cost over useful life', 'Cash outflow', 'Liability repayment'], correct: 1, hint: "Assets lose value over time due to wear and tear." },
    { text: "Which source document is generally issued for cash sales?", options: ['Invoice', 'Credit Note', 'Cash Register Roll', 'Cheque Counterfoil'], correct: 2, hint: "Think about what you receive at a till point." },
    { text: "The concept that requires expenses to be recorded in the period they occur is:", options: ['Prudence', 'Matching', 'Consistency', 'Going Concern'], correct: 1, hint: "Match expenses against the revenues they helped generate." }
  ],
  geography: [
    { text: "Which instrument is used to measure atmospheric pressure?", options: ['Thermometer', 'Anemometer', 'Barometer', 'Hygrometer'], correct: 2, hint: "It often uses mercury or an aneroid cell." },
    { text: "Which is the longest river in Africa?", options: ['Congo', 'Niger', 'Zambezi', 'Nile'], correct: 3, hint: "It flows northwards into the Mediterranean Sea." },
    { text: "Igneous rocks are formed from:", options: ['Cooling of magma/lava', 'Accumulation of sediments', 'Heat and pressure changes', 'Fossils'], correct: 0, hint: "Think 'ignis' meaning fire." },
    { text: "In which layer of the atmosphere is the ozone layer found?", options: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'], correct: 1, hint: "It is the second major layer, above the weather layer." },
    { text: "What does GIS stand for?", options: ['Global Internet System', 'Geographic Information System', 'General Information Service', 'Geological Input Source'], correct: 1, hint: "A computer system for capturing and analyzing spatial data." }
  ],
  history: [
    { text: "In which year was Nelson Mandela released from prison?", options: ['1985', '1989', '1990', '1994'], correct: 2, hint: "It was shortly before the end of Apartheid negotiations began in earnest." },
    { text: "What event marked the beginning of World War II?", options: ['Invasion of Poland', 'Bombing of Pearl Harbor', 'Treaty of Versailles', 'D-Day'], correct: 0, hint: "Germany invaded this neighbor in September 1939." },
    { text: "Which two superpowers were the main rivals during the Cold War?", options: ['USA & China', 'USA & USSR', 'UK & Germany', 'USSR & China'], correct: 1, hint: "It was a conflict between Capitalism and Communism." },
    { text: "When did the Soweto Uprising take place?", options: ['June 16, 1976', 'March 21, 1960', 'August 9, 1956', 'April 27, 1994'], correct: 0, hint: "This day is now celebrated as Youth Day in South Africa." },
    { text: "The fall of the Berlin Wall occurred in which year?", options: ['1961', '1989', '1991', '1985'], correct: 1, hint: "It symbolized the end of the Iron Curtain in Europe." }
  ]
}

// Get filtered questions based on subject (and potentially difficulty in future)
const questions = computed(() => {
  return questionsData[subjectId] || questionsData['math']
})

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1)
const progressPercentage = computed(() => ((currentQuestionIndex.value + 1) / questions.value.length) * 100)

const formattedTime = computed(() => {
  const minutes = Math.floor(timeRemaining.value / 60)
  const seconds = timeRemaining.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const startQuiz = (difficulty) => {
  currentDifficulty.value = difficulty
  showingDifficultySelection.value = false
  // In a real app, we would filter questions here based on difficulty
  startTimer()
}

const resetToDifficulty = () => {
  showingDifficultySelection.value = true
  showResult.value = false
  currentQuestionIndex.value = 0
  score.value = 0
  correctAnswers.value = 0
  timeRemaining.value = 900
  selectedOption.value = null
  hintVisible.value = false
  clearInterval(timerInterval)
}

const startTimer = () => {
  clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
    } else {
      finishQuiz()
    }
  }, 1000)
}

const selectOption = (idx) => {
  selectedOption.value = idx
}

const toggleHint = () => {
  hintVisible.value = !hintVisible.value
}

const nextQuestion = () => {
  if (selectedOption.value === currentQuestion.value.correct) {
    correctAnswers.value++
  }

  if (isLastQuestion.value) {
    finishQuiz()
  } else {
    currentQuestionIndex.value++
    selectedOption.value = null
    hintVisible.value = false
  }
}

const skipQuestion = () => {
  if (isLastQuestion.value) {
    finishQuiz()
  } else {
    currentQuestionIndex.value++
    selectedOption.value = null
    hintVisible.value = false
  }
}

const finishQuiz = () => {
  clearInterval(timerInterval)
  score.value = Math.round((correctAnswers.value / questions.value.length) * 100)
  showResult.value = true
}

const restartQuiz = () => {
  resetToDifficulty() // Or go straight to quiz? Let's go to difficulty select as "Restart"
  // showingDifficultySelection.value = false
  // startTimer()
}

onMounted(() => {
  // Don't start timer automatically anymore, wait for difficulty selection
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>
