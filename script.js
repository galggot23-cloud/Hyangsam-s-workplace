// ==========================================
// [선생님 전용] 단어 데이터 설정 구역
// 새로운 단원을 만드실 때는 아래 내용만 교체하시면 됩니다!
// ==========================================
const UNIT_TITLE = "Lesson 1. New Beginnings";

const VOCAB_DATA = [
    { 
        word: "experience", 
        meaning: "경험", 
        definition: "knowledge or skill that you get from doing or seeing things", 
        example: "Traveling is a great experience." 
    },
    { 
        word: "achieve", 
        meaning: "성취하다, 이루다", 
        definition: "to successfully bring about or reach a desired objective or result", 
        example: "You can achieve your goals." 
    },
    { 
        word: "encourage", 
        meaning: "격려하다, 장려하다", 
        definition: "to give support, confidence, or hope to someone", 
        example: "My teacher encouraged me to try again." 
    },
    { 
        word: "positive", 
        meaning: "긍정적인", 
        definition: "thinking about the good qualities of a situation; full of hope", 
        example: "Try to have a positive attitude." 
    },
    { 
        word: "improve", 
        meaning: "향상시키다, 나아지다", 
        definition: "to make or become better than before", 
        example: "I want to improve my English skills." 
    }
];

// ==========================================
// 앱 내부 제어 변수들
// ==========================================
let currentWords = [];
let currentIndex = 0;
let score = 0;
let isFlipped = false;
let appMode = "study"; 

// HTML 요소 연결
const unitTitleEl = document.getElementById("unit-title");
const progressBar = document.getElementById("progress-bar");

const stepStudySection = document.getElementById("step-study");
const flashcard = document.getElementById("flashcard");
const studyWord = document.getElementById("study-word");
const studyMeaning = document.getElementById("study-meaning");
const studyExample = document.getElementById("study-example");
const btnPrev = document.getElementById("btn-prev");
const btnNextWord = document.getElementById("btn-next-word");
const btnSpeak = document.getElementById("btn-speak");

const stepQuizSection = document.getElementById("step-quiz");
const quizDefinition = document.getElementById("quiz-definition");
const quizOptions = document.getElementById("quiz-options");
const quizFeedback = document.getElementById("quiz-feedback");

const stepResultSection = document.getElementById("step-result");
const finalScore = document.getElementById("final-score");
const totalWords = document.getElementById("total-words");
const btnRestart = document.getElementById("btn-restart");

// ==========================================
// 앱 최초 실행 및 초기화
// ==========================================
function initApp() {
    unitTitleEl.textContent = UNIT_TITLE;
    currentWords = [...VOCAB_DATA];
    currentIndex = 0;
    score = 0;
    appMode = "study";
    
    stepStudySection.classList.remove("hidden");
    stepQuizSection.classList.add("hidden");
    stepResultSection.classList.add("hidden");
    
    showWordCard();
}

// ==========================================
// 원어민 음성(TTS) 출력 기능
// ==========================================
function speak(text) {
    window.speechSynthesis.cancel(); // 이전 음성 안내 강제 취소
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // 미국식 영어 발음
    utterance.rate = 0.85;    // 중3 맞춤형 원어민 속도 조절 (기본 속도보다 15% 느리게)
    
    window.speechSynthesis.speak(utterance);
}

// ==========================================
// 1단계: 카드 학습 기능
// ==========================================
function showWordCard() {
    isFlipped = false;
    flashcard.classList.remove("flipped");
    
    const current = currentWords[currentIndex];
    studyWord.textContent = current.word;
    studyMeaning.textContent = current.meaning;
    studyExample.textContent = current.example;
    
    btnPrev.disabled = currentIndex === 0;
    
    if (currentIndex === currentWords.length - 1) {
        btnNextWord.textContent = "영영 퀴즈 풀러 가기";
    } else {
        btnNextWord.textContent = "다음 단어";
    }
    
    updateProgressBar();
    
    // 다음/이전 카드로 넘어오면 자동으로 영어 발음 재생
    setTimeout(() => {
        speak(current.word);
    }, 100);
}

// 🔊 스피커 아이콘 누를 때 (카드가 뒤집히지 않게 제어하며 발음 재생)
btnSpeak.addEventListener("click", (e) => {
    e.stopPropagation(); 
    const current = currentWords[currentIndex];
    speak(current.word);
});

// 카드 영역 클릭 시 예문 확인용 뒤집기 효과
flashcard.addEventListener("click", () => {
    isFlipped = !isFlipped;
    if (isFlipped) {
        flashcard.classList.add("flipped");
    } else {
        flashcard.classList.remove("flipped");
    }
});

btnNextWord.addEventListener("click", () => {
    if (currentIndex < currentWords.length - 1) {
        currentIndex++;
        showWordCard();
    } else {
        // 모든 카드 학습 완료 시 2단계 영영 퀴즈 단계로 이동
        appMode = "quiz";
        currentIndex = 0;
        stepStudySection.classList.add("hidden");
        stepQuizSection.classList.remove("hidden");
        showQuiz();
    }
});

btnPrev.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        showWordCard();
    }
});

// ==========================================
// 2단계: 영영 뜻풀이 퀴즈 기능
// ==========================================
function showQuiz() {
    quizFeedback.textContent = "";
    const current = currentWords[currentIndex];
    
    // 문제창에 영영 뜻풀이(definition) 노출
    quizDefinition.textContent = current.definition;
    
    // 보기 4개 랜덤 구성 (정답 1개 + 오답 3개)
    const options = [current.word];
    const otherWords = currentWords
        .filter(w => w.word !== current.word)
        .map(w => w.word);
    
    shuffleArray(otherWords);
    for (let i = 0; i < Math.min(3, otherWords.length); i++) {
        options.push(otherWords[i]);
    }
    
    // 입력된 총 단어가 4개 미만일 때 에러 방지용 기본 보기 단어 리스트
    const backupWords = ["challenge", "creative", "respect", "practice"];
    let backupIdx = 0;
    while (options.length < 4) {
        if (!options.includes(backupWords[backupIdx])) {
            options.push(backupWords[backupIdx]);
        }
        backupIdx++;
    }
    
    // 최종 보기 목록 셔플
    shuffleArray(options);
    
    // 화면에 4지선다형 영어 단어 버튼 생성
    quizOptions.innerHTML = "";
    options.forEach(optionText => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.textContent = optionText;
        button.addEventListener("click", () => checkAnswer(button, optionText, current.word));
        quizOptions.appendChild(button);
    });
    
    updateProgressBar();
}

function checkAnswer(selectedBtn, selectedText, correctText) {
    const buttons = quizOptions.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.disabled = true); // 채점 중 중복 클릭 차단
    
    if (selectedText === correctText) {
        selectedBtn.classList.add("correct");
        quizFeedback.style.color = "var(--success-color)";
        quizFeedback.textContent = "정답입니다! Perfect! 🌟";
        score++;
    } else {
        selectedBtn.classList.add("wrong");
        quizFeedback.style.color = "var(--danger-color)";
        quizFeedback.textContent = `틀렸습니다. 정답은 [ ${correctText} ] 입니다.`;
        
        // 학생들이 오답 노트를 인지하도록 정답 버튼도 함께 초록색 유도
        buttons.forEach(btn => {
            if (btn.textContent === correctText) btn.classList.add("correct");
        });
    }
    
    // 정답 피드백을 눈으로 본 후 2.5초 뒤 다음 문제로 자동 이동
    setTimeout(() => {
        if (currentIndex < currentWords.length - 1) {
            currentIndex++;
            showQuiz();
        } else {
            showResult();
        }
    }, 2500);
}

// ==========================================
// 3단계: 결과 및 유틸리티 기능
// ==========================================
function showResult() {
    stepQuizSection.classList.add("hidden");
    stepResultSection.classList.remove("hidden");
    
    finalScore.textContent = score;
    totalWords.textContent = currentWords.length;
    
    progressBar.style.width = "100%";
}

function updateProgressBar() {
    let percent = 0;
    if (appMode === "study") {
        percent = ((currentIndex) / currentWords.length) * 50;
    } else if (appMode === "quiz") {
        percent = 50 + ((currentIndex) / currentWords.length) * 50;
    }
    progressBar.style.width = `${percent}%`;
}

// 배열 무작위 믹스 함수
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

btnRestart.addEventListener("click", initApp);

window.onload = initApp;
