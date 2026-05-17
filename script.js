// ==========================================
// [교사용 기본 탑재] 4과 전체 단어 데이터 세팅 (22개)
// ==========================================
const UNIT_TITLE = "Lesson 4. Smart Spending";

const VOCAB_DATA = [
    { word: "spender", meaning: "돈을 쓰는 사람", definition: "someone who spends money", example: "Tourists are big spenders." },
    { word: "exchange", meaning: "교환하다", definition: "to give something to someone and receive something from that person", example: "My family and I exchange presents on Christmas." },
    { word: "refund", meaning: "환불", definition: "a sum of money which is returned to you", example: "The clerk is going to refund my money." },
    { word: "receipt", meaning: "영수증", definition: "a piece of paper that shows you have paid for something", example: "Don't throw away the receipt after you buy something." },
    { word: "receive", meaning: "받다", definition: "to get something after someone gives it to you or sends it to you", example: "The singer received lots of gifts from his fans." },
    { word: "budget", meaning: "예산", definition: "an amount of money that a person or company can spend", example: "We should plan our trip within a budget." },
    { word: "donate", meaning: "기부하다", definition: "to give money to a group that needs help", example: "He donated money to the school in Africa." },
    { word: "allowance", meaning: "용돈", definition: "money given by parents to a child regularly that the child can spend", example: "I have saved my allowance to buy a hat." },
    { word: "effort", meaning: "노력", definition: "hard work that you do when you are trying to achieve something", example: "People made an effort to clean the beach." },
    { word: "majority", meaning: "대다수", definition: "most of the people or things in a group", example: "The majority of people agree with this view." },
    { word: "balance", meaning: "잔액", definition: "the amount of money you have in your bank account", example: "It is easy to check your bank balance on the Internet." },
    { word: "have difficulty -ing", meaning: "~ 하는 데 어려움을 겪다", definition: "under the state or situation of having a problem", example: "Mike has difficulty using his new camera." },
    { word: "charity", meaning: "자선 단체", definition: "an organization that gives money or help to people who need it", example: "Many people give food and clothes to the charity." },
    { word: "remaining", meaning: "남아 있는", definition: "left over after a part has been taken, used, or lost", example: "Jack drank the remaining juice." },
    { word: "tight", meaning: "빠듯한", definition: "(of money or time) limited or restricted", example: "They have a tight schedule this week." },
    { word: "although", meaning: "비록~일지라도", definition: "in spite of the fact that; even though", example: "Although the bag is old, I like the bag's design." },
    { word: "on the spot", meaning: "즉각, 즉석에서", definition: "in the exact place where something is happening", example: "Justin played the guitar on the spot." },
    { word: "on sale", meaning: "판매 중인, 할인 중인", definition: "available to be bought, especially in a shop or store being offered at a reduced price", example: "Ice cream is on sale for half price." },
    { word: "native", meaning: "토착민, 현지인", definition: "a local inhabitant", example: "There is a picture of a native of this area in this book." },
    { word: "loose", meaning: "헐렁한", definition: "not fitting tightly or closely", example: "These pants are a little loose for me." }
];

// 학생 인적사항 관리 상태값
let studentID = "";
let studentName = "";

let currentWords = [];
let quizQueue = [];       
let wrongAnswers = [];     
let currentIndex = 0;
let isFlipped = false;
let appMode = "login";     // login, study, quiz, wrongReview, spelling, result
let totalWordsCount = VOCAB_DATA.length;

// DOM 연결 변수
const progressBar = document.getElementById("progress-bar");
const studentBadge = document.getElementById("student-info-badge");
const displayID = document.getElementById("display-student-id");
const displayName = document.getElementById("display-student-name");

const stepLoginSection = document.getElementById("step-login");
const inputID = document.getElementById("input-student-id");
const inputName = document.getElementById("input-student-name");
const btnStartApp = document.getElementById("btn-start-app");

const stepStudySection = document.getElementById("step-study");
const flashcard = document.getElementById("flashcard");
const studyWord = document.getElementById("study-word");
const studyMeaning = document.getElementById("study-meaning");
const studyExample = document.getElementById("study-example");
const btnPrev = document.getElementById("btn-prev");
const btnNextWord = document.getElementById("btn-next-word");
const btnSpeak = document.getElementById("btn-speak");

const stepQuizSection = document.getElementById("step-quiz");
const quizBadge = document.getElementById("quiz-badge");
const quizDefinition = document.getElementById("quiz-definition");
const quizOptions = document.getElementById("quiz-options");
const quizFeedback = document.getElementById("quiz-feedback");

const stepSpellingSection = document.getElementById("step-spelling");
const spellDefinition = document.getElementById("spell-definition");
const spellHintMeaning = document.getElementById("spell-hint-meaning");
const spellInput = document.getElementById("spell-input");
const btnSpellSubmit = document.getElementById("btn-spell-submit");
const spellFeedback = document.getElementById("spell-feedback");

const stepResultSection = document.getElementById("step-result");
const reportId = document.getElementById("report-id");
const reportName = document.getElementById("report-name");
const reportDate = document.getElementById("report-date");
const reportHash = document.getElementById("report-hash");
const btnCopyReport = document.getElementById("btn-copy-report");
const btnRestart = document.getElementById("btn-restart");

// ==========================================
// 0단계: 학번 이름 검증 및 로그인 제어
// ==========================================
btnStartApp.addEventListener("click", () => {
    studentID = inputID.value.trim();
    studentName = inputName.value.trim();
    
    if (!studentID || !studentName) {
        alert("학번과 이름을 모두 입력해야 어휘 학습기를 시작할 수 있습니다!");
        return;
    }
    
    // 학생 상단 배치 배지 활성화
    displayID.textContent = studentID;
    displayName.textContent = studentName;
    studentBadge.classList.remove("hidden");
    
    // 섹션 전환 및 암기 개시
    stepLoginSection.classList.add("hidden");
    stepStudySection.classList.remove("hidden");
    
    currentWords = [...VOCAB_DATA];
    currentIndex = 0;
    wrongAnswers = [];
    appMode = "study";
    showWordCard();
});

function speak(text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
}

// ==========================================
// 1단계: 카드 학습 제어
// ==========================================
function showWordCard() {
    isFlipped = false;
    flashcard.classList.remove("flipped");
    
    const current = currentWords[currentIndex];
    studyWord.textContent = current.word;
    studyMeaning.textContent = current.meaning;
    studyExample.textContent = current.example;
    
    btnPrev.disabled = currentIndex === 0;
    btnNextWord.textContent = (currentIndex === totalWordsCount - 1) ? "2단계 객관식 퀴즈 풀기" : "다음 단어";
    
    updateProgressBar();
    setTimeout(() => { speak(current.word); }, 100);
}

btnSpeak.addEventListener("click", (e) => {
    e.stopPropagation();
    speak(currentWords[currentIndex].word);
});

flashcard.addEventListener("click", () => {
    isFlipped = !isFlipped;
    flashcard.classList.toggle("flipped", isFlipped);
});

btnNextWord.addEventListener("click", () => {
    if (currentIndex < totalWordsCount - 1) {
        currentIndex++;
        showWordCard();
    } else {
        // 2단계 객관식 세팅 진입
        appMode = "quiz";
        quizQueue = [...currentWords];
        shuffleArray(quizQueue);
        currentIndex = 0;
        stepStudySection.classList.add("hidden");
        stepQuizSection.classList.remove("hidden");
        showQuizQuestion();
    }
});

btnPrev.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        showWordCard();
    }
});

// ==========================================
// 2단계: 객관식 퀴즈 + 오답 무한 피드백 루프
// ==========================================
function showQuizQuestion() {
    quizFeedback.textContent = "";
    
    if (appMode === "wrongReview") {
        quizBadge.textContent = "🔄 2단계: 오답 집중 재학습 모드";
        quizBadge.style.backgroundColor = "#fee2e2";
        quizBadge.style.color = "var(--danger-color)";
    } else {
        quizBadge.textContent = "2단계: 영영 뜻풀이 퀴즈";
        quizBadge.style.backgroundColor = "#dbeafe";
        quizBadge.style.color = "var(--primary-color)";
    }

    const current = quizQueue[currentIndex];
    quizDefinition.textContent = current.definition;
    
    const options = [current.word];
    const pool = currentWords.filter(w => w.word !== current.word).map(w => w.word);
    shuffleArray(pool);
    
    for (let i = 0; i < Math.min(3, pool.length); i++) {
        options.push(pool[i]);
    }
    shuffleArray(options);
    
    quizOptions.innerHTML = "";
    options.forEach(text => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.textContent = text;
        button.addEventListener("click", () => checkQuizAnswer(button, text, current));
        quizOptions.appendChild(button);
    });
    
    updateProgressBar();
}

function checkQuizAnswer(selectedBtn, selectedText, currentObj) {
    const buttons = quizOptions.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedText === currentObj.word) {
        selectedBtn.classList.add("correct");
        quizFeedback.style.color = "var(--success-color)";
        quizFeedback.textContent = "정답입니다! Perfect! ✨";
    } else {
        selectedBtn.classList.add("wrong");
        quizFeedback.style.color = "var(--danger-color)";
        quizFeedback.textContent = `틀렸습니다! 올바른 단어는 [ ${currentObj.word} ]`;
        
        buttons.forEach(btn => {
            if (btn.textContent === currentObj.word) btn.classList.add("correct");
        });
        
        if (!wrongAnswers.some(w => w.word === currentObj.word)) {
            wrongAnswers.push(currentObj);
        }
    }
    
    setTimeout(() => {
        if (currentIndex < quizQueue.length - 1) {
            currentIndex++;
            showQuizQuestion();
        } else {
            if (wrongAnswers.length > 0) {
                appMode = "wrongReview";
                quizQueue = [...wrongAnswers];
                wrongAnswers = []; 
                currentIndex = 0;
                showQuizQuestion();
            } else {
                // 철자 쓰기 3단계 진입
                appMode = "spelling";
                quizQueue = [...currentWords];
                shuffleArray(quizQueue);
                currentIndex = 0;
                stepQuizSection.classList.add("hidden");
                stepSpellingSection.classList.remove("hidden");
                showSpellingQuestion();
            }
        }
    }, 1800);
}

// ==========================================
// 3단계: 주관식 철자 쓰기(Spelling) 제어
// ==========================================
function showSpellingQuestion() {
    spellFeedback.textContent = "";
    spellInput.value = "";
    spellInput.focus();
    
    const current = quizQueue[currentIndex];
    spellDefinition.textContent = current.definition;
    spellHintMeaning.textContent = `💡 한글 힌트: [ ${current.meaning} ]`;
    
    updateProgressBar();
}

function checkSpellingAnswer() {
    const userInput = spellInput.value.trim().toLowerCase();
    const correctAnswer = quizQueue[currentIndex].word.trim().toLowerCase();
    
    if (!userInput) return;
    
    spellInput.disabled = true;
    btnSpellSubmit.disabled = true;
    
    if (userInput === correctAnswer) {
        spellFeedback.style.color = "var(--success-color)";
        spellFeedback.textContent = "정답입니다! 철자 암기 통과 💯";
        speak(quizQueue[currentIndex].word);
        
        setTimeout(() => {
            spellInput.disabled = false;
            btnSpellSubmit.disabled = false;
            if (currentIndex < quizQueue.length - 1) {
                currentIndex++;
                showSpellingQuestion();
            } else {
                showFinalResult();
            }
        }, 1500);
    } else {
        spellFeedback.style.color = "var(--danger-color)";
        spellFeedback.textContent = `틀렸습니다! 정답은 [ ${quizQueue[currentIndex].word} ] 입니다. 다시 풀어보세요!`;
        
        setTimeout(() => {
            spellInput.disabled = false;
            btnSpellSubmit.disabled = false;
            spellInput.value = "";
            spellInput.focus();
            spellFeedback.textContent = "";
        }, 2200);
    }
}

btnSpellSubmit.addEventListener("click", checkSpellingAnswer);
spellInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") checkSpellingAnswer();
});

// ==========================================
// 4단계: 교사 제출용 보안 결과 리포트 출력
// ==========================================
function showFinalResult() {
    appMode = "result";
    stepSpellingSection.classList.add("hidden");
    stepResultSection.classList.remove("hidden");
    
    // 리포트 데이터 바인딩
    reportId.textContent = studentID;
    reportName.textContent = studentName;
    
    const now = new Date();
    reportDate.textContent = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    
    // 교사 확인용 단방향 체크섬 해시 추출 (학생 이름 수정 및 조작 검증용 고유 키)
    reportHash.textContent = generateSecureCode(studentID, studentName);
    
    updateProgressBar();
}

function generateSecureCode(id, name) {
    let hash = 0;
    const secureString = `${id}_${name}_L4_Complete_Success_2026`;
    for (let i = 0; i < secureString.length; i++) {
        hash = (hash << 5) - hash + secureString.charCodeAt(i);
        hash |= 0;
    }
    return "CERT-L4-" + Math.abs(hash).toString(16).toUpperCase().substring(0, 8);
}

// 원클릭 복사 기능 구현
btnCopyReport.addEventListener("click", () => {
    const textToCopy = document.getElementById("cert-code-box").innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("인증서 내용이 클립보드에 복사되었습니다! 그대로 과제방에 제출하면 됩니다.");
    }).catch(err => {
        alert("자동 복사에 실패했습니다. 직접 드래그하여 복사해 주세요.");
    });
});

// ==========================================
// 공통 내부 유틸리티
// ==========================================
function updateProgressBar() {
    let percent = 0;
    if (appMode === "study") {
        percent = ((currentIndex) / totalWordsCount) * 33.3;
    } else if (appMode === "quiz" || appMode === "wrongReview") {
        percent = 33.3 + ((currentIndex) / quizQueue.length) * 33.3;
    } else if (appMode === "spelling") {
        percent = 66.6 + ((currentIndex) / quizQueue.length) * 33.4;
    } else if (appMode === "result") {
        percent = 100;
    }
    progressBar.style.width = `${percent}%`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 처음부터 다시하면 초기 입력값까지 싹 리셋하여 보안 유지
btnRestart.addEventListener("click", () => {
    inputID.value = "";
    inputName.value = "";
    studentBadge.classList.add("hidden");
    stepResultSection.classList.add("hidden");
    stepLoginSection.classList.remove("hidden");
    appMode = "login";
    updateProgressBar();
});
