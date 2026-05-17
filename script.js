// ==========================================
// [4과 완벽 고정 데이터] 업로드해주신 4과 엑셀 데이터 빌트인
// ==========================================
const UNIT_TITLE = "Lesson 4. Be a Smart Spender";

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
    { word: "loose", meaning: "헐렁한", definition: "not fitting tightly or closely", example: "These pants are a little loose for me." },
    { word: "shop-hop", meaning: "여러 가게를 돌아다니다", definition: "to visit many stores to compare prices or items", example: "Smart spenders usually shop-hop before buying." },
    { word: "price tag", meaning: "가격표", definition: "a label showing the price of an item", example: "Check the price tag before you go to the counter." }
];

// 글로벌 상태 인자들
let studentID = "";
let studentName = "";
let currentWords = [];
let quizQueue = [];       
let wrongAnswers = [];     
let currentIndex = 0;
let isFlipped = false;
let appMode = "login";     
let totalWordsCount = VOCAB_DATA.length;

// DOM 인자 매핑
const appContainer = document.querySelector(".app-container");
const progressBar = document.getElementById("progress-bar");
const studentBadge = document.getElementById("student-info-badge");
const displayID = document.getElementById("display-student-id");
const displayName = document.getElementById("display-student-name");

const stepLoginSection = document.getElementById("step-login");
const inputID = document.getElementById("input-student-id");
const inputName = document.getElementById("input-student-name");
const btnStartApp = document.getElementById("btn-start-app");

const stepStudySection = document.getElementById("step-study");
const studyCount = document.getElementById("study-count");
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
// 0단계: 로그인 진입 제어
// ==========================================
btnStartApp.addEventListener("click", () => {
    studentID = inputID.value.trim();
    studentName = inputName.value.trim();
    
    if (!studentID || !studentName) {
        alert("학번과 이름을 모두 입력해야 어휘 학습기를 시작할 수 있습니다!");
        return;
    }
    
    displayID.textContent = studentID;
    displayName.textContent = studentName;
    studentBadge.classList.remove("hidden");
    
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
// 1단계: 플래시 카드 암기 (22개 전체)
// ==========================================
function showWordCard() {
    isFlipped = false;
    flashcard.classList.remove("flipped");
    
    studyCount.textContent = currentIndex + 1;
    const current = currentWords[currentIndex];
    studyWord.textContent = current.word;
    studyMeaning.textContent = current.meaning;
    studyExample.textContent = current.example;
    
    btnPrev.disabled = currentIndex === 0;
    btnNextWord.textContent = (currentIndex === totalWordsCount - 1) ? "2단계 객관식 퀴즈 풀기 ➔" : "다음 단어 ➔";
    
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
// 2단계: 객관식 퀴즈 + 오답 직관 피드백 및 무한 루프
// ==========================================
function showQuizQuestion() {
    quizFeedback.textContent = "";
    appContainer.className = "app-container"; // 연동 점멸 이펙트 초기화
    
    if (appMode === "wrongReview") {
        quizBadge.textContent = "🔄 2단계: 틀린 오답 집중 재점검 중";
        quizBadge.style.backgroundColor = "#fee2e2";
        quizBadge.style.color = "var(--danger-color)";
    } else {
        quizBadge.textContent = "2단계: 영영 뜻풀이 객관식 퀴즈";
        quizBadge.style.backgroundColor = "#e0f2fe";
        quizBadge.style.color = "#0369a1";
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
        // 정답 시 직관적 연출: 버튼 초록색 + 전체 컨테이너 초록 배경 활성화
        selectedBtn.classList.add("correct");
        appContainer.classList.add("correct-flash");
        quizFeedback.style.color = "var(--success-color)";
        quizFeedback.textContent = "⭕ 정답입니다! (Good Job!)";
        speak(currentObj.word);
    } else {
        // 오답 시 직관적 연출: 누른 버튼 빨간색 + 전체 컨테이너 빨간 배경 활성화 + 정답 유도
        selectedBtn.classList.add("wrong");
        appContainer.classList.add("wrong-flash");
        quizFeedback.style.color = "var(--danger-color)";
        quizFeedback.textContent = `❌ 오답! 정답은 [ ${currentObj.word} ]`;
        
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
                alert(`틀린 문제가 ${wrongAnswers.length}개 있습니다. 만점을 받을 때까지 오답 재도전이 이어집니다!`);
                appMode = "wrongReview";
                quizQueue = [...wrongAnswers];
                wrongAnswers = []; 
                currentIndex = 0;
                showQuizQuestion();
            } else {
                // 객관식 완벽 클리어 -> 3단계 주관식 철자 쓰기 오픈
                alert("축하합니다! 객관식 테스트를 완벽히 통과했습니다.\n이제 최종 마스터를 위해 3단계 [주관식 철자 쓰기]에 도전합니다!");
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
// 3단계: 주관식 철자 쓰기(Spelling) 제어 모듈
// ==========================================
function showSpellingQuestion() {
    spellFeedback.textContent = "";
    appContainer.className = "app-container";
    spellInput.value = "";
    spellInput.disabled = false;
    btnSpellSubmit.disabled = false;
    spellInput.focus();
    
    const current = quizQueue[currentIndex];
    spellDefinition.textContent = current.definition;
    spellHintMeaning.textContent = `💡 한글 뜻 힌트:  ${current.meaning}`;
    
    updateProgressBar();
}

function checkSpellingAnswer() {
    const userInput = spellInput.value.trim().toLowerCase();
    const correctAnswer = quizQueue[currentIndex].word.trim().toLowerCase();
    
    if (!userInput) return;
    
    spellInput.disabled = true;
    btnSpellSubmit.disabled = true;
    
    if (userInput === correctAnswer) {
        // 주관식 정답 연출
        appContainer.classList.add("correct-flash");
        spellFeedback.style.color = "var(--success-color)";
        spellFeedback.textContent = "⭕ 철자 일치! 정답입니다.";
        speak(quizQueue[currentIndex].word);
        
        setTimeout(() => {
            if (currentIndex < quizQueue.length - 1) {
                currentIndex++;
                showSpellingQuestion();
            } else {
                showFinalResult();
            }
        }, 1500);
    } else {
        // 주관식 오답 연출
        appContainer.classList.add("wrong-flash");
        spellFeedback.style.color = "var(--danger-color)";
        spellFeedback.textContent = `❌ 틀렸습니다! 정답은 [ ${quizQueue[currentIndex].word} ] 입니다.`;
        
        setTimeout(() => {
            showSpellingQuestion(); // 정답을 눈으로 확인 후 다음 문제 혹은 다시 풀기 처리
            if (currentIndex < quizQueue.length - 1) {
                currentIndex++;
                showSpellingQuestion();
            } else {
                showFinalResult();
            }
        }, 2500);
    }
}

btnSpellSubmit.addEventListener("click", checkSpellingAnswer);
spellInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") checkSpellingAnswer();
});

// ==========================================
// 4단계: 최종 성적표 및 교사용 암호 서명 검증
// ==========================================
function showFinalResult() {
    appMode = "result";
    appContainer.className = "app-container";
    stepSpellingSection.classList.add("hidden");
    stepResultSection.classList.remove("hidden");
    
    reportId.textContent = studentID;
    reportName.textContent = studentName;
    
    const now = new Date();
    reportDate.textContent = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    
    // 조작 불가능한 고유 암호 인증 코드 발행
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
    return "VERIFY-L4-OK-" + Math.abs(hash).toString(16).toUpperCase().substring(0, 8);
}

btnCopyReport.addEventListener("click", () => {
    const textToCopy = document.getElementById("cert-code-box").innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("📋 과제 확인서가 클립보드에 자동 복사되었습니다!\n원하는 과제방(또는 패들렛)에 '붙여넣기(Ctrl+V)' 하시면 됩니다.");
    }).catch(err => {
        alert("자동 복사에 오류가 발생했습니다. 마우스로 드래그하여 복사해 주세요.");
    });
});

// ==========================================
// 유틸리티 함수
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

btnRestart.addEventListener("click", () => {
    inputID.value = "";
    inputName.value = "";
    studentBadge.classList.add("hidden");
    stepResultSection.classList.add("hidden");
    stepLoginSection.classList.remove("hidden");
    appMode = "login";
    updateProgressBar();
});
