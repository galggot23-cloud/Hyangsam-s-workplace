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

// [초강력 방어 메커니즘] 어떤 상황에서든 화면을 강제로 깨우는 엔진
window.addEventListener("load", () => {
    forceStartEngine();
});

function forceStartEngine() {
    // 1단계 안전장치: 단어장 파일 이름이 word든 words든 상관없이 존재하는 데이터 강제 연결
    if (typeof VOCAB_DATA !== 'undefined' && typeof UNIT_TITLE !== 'undefined') {
        executeInitialization(UNIT_TITLE, VOCAB_DATA);
        return;
    }
    
    // 2단계 안전장치: 만약 깃허브 서버가 예전 에러 코드를 기억하며 버틴다면, 아래에 교사 원본 데이터를 직접 심어서 강제 주입해버립니다!
    const BACKUP_TITLE = "Lesson 4. Be a Smart Spender";
    const BACKUP_DATA = [
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

    executeInitialization(BACKUP_TITLE, BACKUP_DATA);
}

function executeInitialization(title, data) {
    unitTitleEl.textContent = title;
    currentWords = [...data];
    totalWordsCount = currentWords.length;
    totalCountTxts.forEach(el => el.textContent = totalWordsCount);
}

// 🔊 학생들이 환호할 고품질 이펙트 사운드 주파수 웹오디오 가동
function playSound(type) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const now = ctx.currentTime;
        
        if (type === 'correct') {
            // 맑은 하이톤의 띵동~!
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(523.25, now);
            gain1.gain.setValueAtTime(0.12, now);
            gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            osc1.connect(gain1); gain1.connect(ctx.destination);
            osc1.start(now); osc1.stop(now + 0.12);
            
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(659.25, now + 0.07);
            gain2.gain.setValueAtTime(0.12, now + 0.07);
            gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc2.connect(gain2); gain2.connect(ctx.destination);
            osc2.start(now + 0.07); osc2.stop(now + 0.3);
            
        } else if (type === 'wrong') {
            // 게임오버 느낌의 우웅~ 웅장한 진동음
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(160.00, now);
            osc.frequency.linearRampToValueAtTime(100.00, now + 0.4);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(now); osc.stop(now + 0.4);
            
        } else if (type === 'victory') {
            // 최종 성공 미션 클리어 브금 효과음
            const notes = [523.25, 587.33, 659.25, 783.99, 1046.50];
            notes.forEach((freq, index) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + (index * 0.08));
                gain.gain.setValueAtTime(0.1, now + (index * 0.08));
                gain.gain.exponentialRampToValueAtTime(0.001, now + (index * 0.08) + 0.25);
                osc.connect(gain); gain.connect(ctx.destination);
                osc.start(now + (index * 0.08)); osc.stop(now + (index * 0.08) + 0.25);
            });
        }
    } catch (e) { console.log(e); }
}

btnStartApp.addEventListener("click", () => {
    studentID = inputID.value.trim();
    studentName = inputName.value.trim();
    
    if (!studentID || !studentName) {
        alert("학번과 이름을 올바르게 입력해주세요!");
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
        utterance.rate = 0.88;
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
    btnNextWord.textContent = (currentIndex === totalWordsCount - 1) ? "2단계 객관식 퀴즈 풀기 시작! ➔" : "다음 단어 ➔";
    
    updateProgressBar();
    setTimeout(() => { speak(current.word); }, 150);
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
        quizBadge.textContent = "🔄 2단계: 틀린 오답 완벽 재점검 코스";
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
        comboBadge.style.transform = "scale(1.25)";
        setTimeout(() => comboBadge.style.transform = "scale(1)", 150);
    } else {
        currentCombo = 0;
        comboBadge.textContent = `💥 COMBO 리셋!`;
    }
}

function checkQuizAnswer(selectedBtn, selectedText, currentObj) {
    const buttons = quizOptions.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedText === currentObj.word) {
        selectedBtn.classList.add("correct");
        appContainer.classList.add("correct-flash");
        quizFeedback.style.color = "var(--success-color)";
        quizFeedback.textContent = "⭕ 완벽한 정답입니다! 지식이 +1 상승했습니다.";
        playSound('correct');
        updateCombo(true);
        speak(currentObj.word);
    } else {
        selectedBtn.classList.add("wrong");
        appContainer.classList.add("wrong-flash");
        quizFeedback.style.color = "var(--danger-color)";
        quizFeedback.textContent = `❌ 아쉽습니다! 정답은 [ ${currentObj.word} ]`;
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
                alert(`💡 틀린 문제가 ${wrongAnswers.length}개 발견되었습니다. 완벽한 마스터를 위해 무한 복습 라운드가 시작됩니다!`);
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
        spellFeedback.textContent = "⭕ 대단해요! 정확한 스펠링 타이핑 성공!";
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
        spellFeedback.textContent = `❌ 오답! 올바른 철자는 [ ${quizQueue[currentIndex].word} ] 입니다.`;
        playSound('wrong');
        updateCombo(false);
        setTimeout(() => {
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
    
    playSound('victory'); // 🎉 완공 브금 재생
    
    const praises = [
        "👑 영예의 전당 등극! 단어의 신이 나타났습니다!",
        "🚀 역대급 집중력! 단원 올클리어에 성공했습니다!",
        "🏅 완벽한 성적입니다. 어휘 수행평가는 프리패스!",
        "✨ 지치지 않는 집중 레이스 완주를 격하게 축하합니다!"
    ];
    if(finalPraise) finalPraise.textContent = praises[Math.floor(Math.random() * praises.length)];
    
    const now = new Date();
    reportDate.textContent = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    reportHash.textContent = generateSecureCode(studentID, studentName, UNIT_TITLE, maxCombo);
    updateProgressBar();
}

function generateSecureCode(id, name, unit, combo) {
    let hash = 0;
    const secureString = `${id}_${name}_${unit}_${combo}_2026_Perfect`;
    for (let i = 0; i < secureString.length; i++) {
        hash = (hash << 5) - hash + secureString.charCodeAt(i);
        hash |= 0;
    }
    return "CHAMP-" + Math.abs(hash).toString(16).toUpperCase().substring(0, 8);
}

btnCopyReport.addEventListener("click", () => {
    const textToCopy = document.getElementById("cert-code-box").innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("📋 미션 수행 인증서가 복사되었습니다!\n과제 제출방에 그대로 붙여넣기(Ctrl+V) 하세요.");
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
