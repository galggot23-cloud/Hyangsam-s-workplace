// 글로벌 상태 변수
let studentID = "";
let studentName = "";
let currentWords = [];
let quizQueue = [];       
let wrongAnswers = [];     
let currentIndex = 0;
let isFlipped = false;
let appMode = "login";     
let totalWordsCount = 0;

// 동기부여 요소 변수
let currentCombo = 0;
let maxCombo = 0;

// DOM 맵핑
const appContainer = document.querySelector(".app-container");
const unitTitleEl = document.getElementById("unit-title");
const progressBar = document.getElementById("progress-bar");
const studentBadge = document.getElementById("student-info-badge");
const comboBadge = document.getElementById("combo-badge");
const displayID = document.getElementById("display-student-id");
const displayName = document.getElementById("display-student-name");

const stepLoginSection = document.getElementById("step-login");
const inputID = document.getElementById("input-student-id");
const inputName = document.getElementById("input-student-name");
const btnStartApp = document.getElementById("btn-start-app");

const stepStudySection = document.getElementById("step-study");
const studyCount = document.getElementById("study-count");
const totalCountTxts = document.querySelectorAll(".total-count-txt");
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
const spellCount = document.getElementById("spell-count");
const spellDefinition = document.getElementById("spell-definition");
const spellHintMeaning = document.getElementById("spell-hint-meaning");
const spellInput = document.getElementById("spell-input");
const btnSpellSubmit = document.getElementById("btn-spell-submit");
const spellFeedback = document.getElementById("spell-feedback");

const stepResultSection = document.getElementById("step-result");
const reportId = document.getElementById("report-id");
const reportName = document.getElementById("report-name");
const reportUnit = document.getElementById("report-unit");
const reportDate = document.getElementById("report-date");
const reportCombo = document.getElementById("report-combo");
const reportHash = document.getElementById("report-hash");
const btnCopyReport = document.getElementById("btn-copy-report");
const btnRestart = document.getElementById("btn-restart");
const finalPraise = document.getElementById("final-praise");

// 안전 로딩 메커니즘 가동
window.addEventListener("load", () => {
    initEngine();
});

function initEngine() {
    // 윈도우 로드가 끝난 시점에 단어장이 정의되어 있는지 더 꼼꼼히 확인합니다
    if (typeof UNIT_TITLE !== 'undefined' && typeof VOCAB_DATA !== 'undefined') {
        unitTitleEl.textContent = UNIT_TITLE;
        currentWords = [...VOCAB_DATA];
        totalWordsCount = currentWords.length;
        totalCountTxts.forEach(el => el.textContent = totalWordsCount);
    } else {
        unitTitleEl.textContent = "⚠️ 데이터 연결을 재시도 중입니다. (Ctrl+F5를 눌러주세요)";
        // 0.5초 뒤 마지막 백업 시도
        setTimeout(initEngine, 500);
    }
}

function playSound(type) {
    if (!window.AudioContext && !window.webkitAudioContext) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'correct') {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); 
        osc.frequency.setValueAtTime(880.00, ctx.currentTime + 0.1); 
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'wrong') {
        osc.frequency.setValueAtTime(220.00, ctx.currentTime); 
        osc.frequency.setValueAtTime(146.83, ctx.currentTime + 0.15); 
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
    }
}

btnStartApp.addEventListener("click", () => {
    studentID = inputID.value.trim();
    studentName = inputName.value.trim();
    
    if (!studentID || !studentName) {
        alert("학번과 이름을 입력해야 챌린지를 시작할 수 있습니다!");
        return;
    }
    
    if (currentWords.length === 0) {
        alert("아직 단어 데이터가 준비되지 않았습니다. 잠시만 기다려주세요.");
        return;
    }
    
    displayID.textContent = studentID;
    displayName.textContent = studentName;
    studentBadge.classList.remove("hidden");
    
    stepLoginSection.classList.add("hidden");
    stepStudySection.classList.remove("hidden");
    
    currentIndex = 0;
    wrongAnswers = [];
    currentCombo = 0;
    maxCombo = 0;
    appMode = "study";
    showWordCard();
});

function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    }
}

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

btnSpeak.addEventListener("click", (e) => { e.stopPropagation(); speak(currentWords[currentIndex].word); });
flashcard.addEventListener("click", () => { isFlipped = !isFlipped; flashcard.classList.toggle("flipped", isFlipped); });

btnNextWord.addEventListener("click", () => {
    if (currentIndex < totalWordsCount - 1) {
        currentIndex++;
        showWordCard();
    } else {
        appMode = "quiz";
        if(comboBadge) comboBadge.classList.remove("hidden");
        quizQueue = [...currentWords];
        shuffleArray(quizQueue);
        currentIndex = 0;
        stepStudySection.classList.add("hidden");
        stepQuizSection.classList.remove("hidden");
        showQuizQuestion();
    }
});

btnPrev.addEventListener("click", () => { if (currentIndex > 0) { currentIndex--; showWordCard(); } });

function showQuizQuestion() {
    quizFeedback.textContent = "";
    appContainer.className = "app-container";
    
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
    for (let i = 0; i < Math.min(3, pool.length); i++) options.push(pool[i]);
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

function updateCombo(isCorrect) {
    if(!comboBadge) return;
    if (isCorrect) {
        currentCombo++;
        if (currentCombo > maxCombo) maxCombo = currentCombo;
        comboBadge.textContent = `🔥 ${currentCombo} COMBO!`;
        comboBadge.style.transform = "scale(1.2)";
        setTimeout(() => comboBadge.style.transform = "scale(1)", 150);
    } else {
        currentCombo = 0;
        comboBadge.textContent = `💥 COMBO 깨짐!`;
    }
}

function checkQuizAnswer(selectedBtn, selectedText, currentObj) {
    const buttons = quizOptions.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedText === currentObj.word) {
        selectedBtn.classList.add("correct");
        appContainer.classList.add("correct-flash");
        quizFeedback.style.color = "var(--success-color)";
        quizFeedback.textContent = "⭕ 정답입니다! 완벽해요!";
        playSound('correct');
        updateCombo(true);
        speak(currentObj.word);
    } else {
        selectedBtn.classList.add("wrong");
        appContainer.classList.add("wrong-flash");
        quizFeedback.style.color = "var(--danger-color)";
        quizFeedback.textContent = `❌ 정답은 [ ${currentObj.word} ] 입니다`;
        playSound('wrong');
        updateCombo(false);
        buttons.forEach(btn => { if (btn.textContent === currentObj.word) btn.classList.add("correct"); });
        if (!wrongAnswers.some(w => w.word === currentObj.word)) wrongAnswers.push(currentObj);
    }
    
    setTimeout(() => {
        if (currentIndex < quizQueue.length - 1) {
            currentIndex++;
            showQuizQuestion();
        } else {
            if (wrongAnswers.length > 0) {
                alert(`💡 오답이 ${wrongAnswers.length}개 있습니다! 만점을 위해 완벽 마스터 재도전 단계로 이동합니다.`);
                appMode = "wrongReview";
                quizQueue = [...wrongAnswers];
                wrongAnswers = []; 
                currentIndex = 0;
                showQuizQuestion();
            } else {
                appMode = "spelling";
                quizQueue = [...currentWords];
                shuffleArray(quizQueue);
                currentIndex = 0;
                stepQuizSection.classList.add("hidden");
                stepSpellingSection.classList.remove("hidden");
                showSpellingQuestion();
            }
        }
    }, 1500);
}

function showSpellingQuestion() {
    spellFeedback.textContent = "";
    appContainer.className = "app-container";
    spellInput.value = "";
    spellInput.disabled = false;
    btnSpellSubmit.disabled = false;
    spellCount.textContent = currentIndex + 1;
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
        appContainer.classList.add("correct-flash");
        spellFeedback.style.color = "var(--success-color)";
        spellFeedback.textContent = "⭕ 정답 타이핑 성공!";
        playSound('correct');
        updateCombo(true);
        speak(quizQueue[currentIndex].word);
        setTimeout(() => {
            if (currentIndex < quizQueue.length - 1) {
                currentIndex++;
                showSpellingQuestion();
            } else {
                showFinalResult();
            }
        }, 1300);
    } else {
        appContainer.classList.add("wrong-flash");
        spellFeedback.style.color = "var(--danger-color)";
        spellFeedback.textContent = `❌ 오답! 정답은 [ ${quizQueue[currentIndex].word} ]`;
        playSound('wrong');
        updateCombo(false);
        setTimeout(() => {
            if (currentIndex < quizQueue.length - 1) {
                currentIndex++;
                showSpellingQuestion();
            } else {
                showFinalResult();
            }
        }, 2200);
    }
}

btnSpellSubmit.addEventListener("click", checkSpellingAnswer);
spellInput.addEventListener("keyup", (e) => { if (e.key === "Enter") checkSpellingAnswer(); });

function showFinalResult() {
    appMode = "result";
    appContainer.className = "app-container";
    if(comboBadge) comboBadge.classList.add("hidden");
    stepSpellingSection.classList.add("hidden");
    stepResultSection.classList.remove("hidden");
    
    reportId.textContent = studentID;
    reportName.textContent = studentName;
    reportUnit.textContent = UNIT_TITLE;
    if(reportCombo) reportCombo.textContent = maxCombo;
    
    const praises = [
        "🎉 영어 어휘 마스터의 탄생을 축하합니다!",
        "🚀 엄청난 집중력으로 단어를 완전히 점령했습니다!",
        "🏅 완벽한 실력입니다! 수행평가 만점 예약!",
        "✨ 지치지 않는 열정에 큰 박수를 보냅니다!"
    ];
    if(finalPraise) finalPraise.textContent = praises[Math.floor(Math.random() * praises.length)];
    
    const now = new Date();
    reportDate.textContent = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    reportHash.textContent = generateSecureCode(studentID, studentName, UNIT_TITLE, maxCombo);
    updateProgressBar();
}

function generateSecureCode(id, name, unit, combo) {
    let hash = 0;
    const secureString = `${id}_${name}_${unit}_${combo}_2026_Smart`;
    for (let i = 0; i < secureString.length; i++) {
        hash = (hash << 5) - hash + secureString.charCodeAt(i);
        hash |= 0;
    }
    return "MASTER-" + Math.abs(hash).toString(16).toUpperCase().substring(0, 8);
}

btnCopyReport.addEventListener("click", () => {
    const textToCopy = document.getElementById("cert-code-box").innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("📋 과제 확인서 내용이 성공적으로 복사되었습니다!\n구글 클래스룸이나 패들렛에 그대로 붙여넣기(Ctrl+V) 하세요.");
    });
});

function updateProgressBar() {
    let percent = 0;
    if (appMode === "study") percent = ((currentIndex) / totalWordsCount) * 33.3;
    else if (appMode === "quiz" || appMode === "wrongReview") percent = 33.3 + ((currentIndex) / quizQueue.length) * 33.3;
    else if (appMode === "spelling") percent = 66.6 + ((currentIndex) / quizQueue.length) * 33.4;
    else if (appMode === "result") percent = 100;
    progressBar.style.width = `${percent}%`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

btnRestart.addEventListener("click", () => {
    inputID.value = ""; inputName.value = "";
    studentBadge.classList.add("hidden");
    stepResultSection.classList.add("hidden");
    stepLoginSection.classList.remove("hidden");
    appMode = "login";
    updateProgressBar();
});
