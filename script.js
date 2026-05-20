let studentID = "";
let studentName = "";
let activeUnitTitle = "";
let currentWords = [];
let quizQueue = [];       
let wrongAnswers = [];     
let currentIndex = 0;
let isFlipped = false;
let appMode = "login";     
let totalWordsCount = 0;
let currentCombo = 0;
let maxCombo = 0;

// DOM 요소 선택
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
const selectUnitEl = document.getElementById("select-unit");
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

// 효과음 재생 함수 (오류 방지 안전장치 포함)
function playSound(type) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const now = ctx.currentTime;
        if (type === 'correct') {
            const osc1 = ctx.createOscillator(); const gain1 = ctx.createGain();
            osc1.type = 'sine'; osc1.frequency.setValueAtTime(523.25, now);
            gain1.gain.setValueAtTime(0.12, now); gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            osc1.connect(gain1); gain1.connect(ctx.destination); osc1.start(now); osc1.stop(now + 0.12);
            const osc2 = ctx.createOscillator(); const gain2 = ctx.createGain();
            osc2.type = 'sine'; osc2.frequency.setValueAtTime(659.25, now + 0.07);
            gain2.gain.setValueAtTime(0.12, now + 0.07); gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc2.connect(gain2); gain2.connect(ctx.destination); osc2.start(now + 0.07); osc2.stop(now + 0.3);
        } else if (type === 'wrong') {
            const osc = ctx.createOscillator(); const gain = ctx.createGain();
            osc.type = 'triangle'; osc.frequency.setValueAtTime(160.00, now);
            osc.frequency.linearRampToValueAtTime(100.00, now + 0.4);
            gain.gain.setValueAtTime(0.15, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.connect(gain); gain.connect(ctx.destination); osc.start(now); osc.stop(now + 0.4);
        } else if (type === 'victory') {
            const notes = [523.25, 587.33, 659.25, 783.99, 1046.50];
            notes.forEach((freq, index) => {
                const osc = ctx.createOscillator(); const gain = ctx.createGain();
                osc.type = 'sine'; osc.frequency.setValueAtTime(freq, now + (index * 0.08));
                gain.gain.setValueAtTime(0.1, now + (index * 0.08)); gain.gain.exponentialRampToValueAtTime(0.001, now + (index * 0.08) + 0.25);
                osc.connect(gain); gain.connect(ctx.destination); osc.start(now + (index * 0.08)); osc.stop(now + (index * 0.08) + 0.25);
            });
        }
    } catch (e) { console.log("Sound Error:", e); }
}

// 🌟 미션 스타트 버튼 핸들러 (완벽 버그 컷팅 버전)
if (btnStartApp) {
    btnStartApp.addEventListener("click", () => {
        studentID = inputID ? inputID.value.trim() : "";
        studentName = inputName ? inputName.value.trim() : "";
        const selectedUnitNum = selectUnitEl ? selectUnitEl.value : "unit5";
        
        if (!studentID || !studentName) {
            alert("학번과 이름을 올바르게 입력해주세요!");
            return;
        }
        
        // 데이터 불러오기 검증 및 보호막
        if (typeof ALL_VOCAB_DATA !== 'undefined' && ALL_VOCAB_DATA[selectedUnitNum]) {
            activeUnitTitle = ALL_VOCAB_DATA[selectedUnitNum].title;
            currentWords = [...ALL_VOCAB_DATA[selectedUnitNum].words];
        } else {
            alert("단원 데이터(words.js)를 불러올 수 없습니다. 파일 연결을 다시 확인해주세요.");
            return;
        }
        
        if (unitTitleEl) unitTitleEl.textContent = activeUnitTitle;
        totalWordsCount = currentWords.length;
        
        if (totalCountTxts) {
            totalCountTxts.forEach(el => { el.textContent = totalWordsCount; });
        }
        
        if (displayID) displayID.textContent = studentID;
        if (displayName) displayName.textContent = studentName;
        if (studentBadge) studentBadge.classList.remove("hidden");
        
        // 🌟 무조건 화면 이동을 보장하는 구조
        if (stepLoginSection) stepLoginSection.classList.add("hidden");
        if (stepStudySection) stepStudySection.classList.remove("hidden");
        
        currentIndex = 0; 
        wrongAnswers = []; 
        currentCombo = 0; 
        maxCombo = 0;
        appMode = "study";
        
        showWordCard();
    });
}

function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
    }
}

function showWordCard() {
    if (!stepStudySection || stepStudySection.classList.contains("hidden")) return;
    
    isFlipped = false; 
    if (flashcard) flashcard.classList.remove("flipped");
    if (studyCount) studyCount.textContent = currentIndex + 1;
    
    const current = currentWords[currentIndex];
    if (!current) return;

    if (studyWord) studyWord.textContent = current.word;
    if (studyMeaning) studyMeaning.textContent = current.meaning;
    if (studyExample) studyExample.textContent = current.example;
    
    if (btnPrev) btnPrev.disabled = (currentIndex === 0);
    if (btnNextWord) {
        btnNextWord.textContent = (currentIndex === totalWordsCount - 1) ? "퀴즈 스테이지 진입 ➔" : "다음 단어 ➔";
    }
    updateProgressBar();
    setTimeout(() => { speak(current.word); }, 150);
}

if (btnSpeak) {
    btnSpeak.addEventListener("click", (e) => { 
        e.stopPropagation(); 
        if (currentWords[currentIndex]) speak(currentWords[currentIndex].word); 
    });
}

if (flashcard) {
    flashcard.addEventListener("click", () => { 
        isFlipped = !isFlipped; 
        flashcard.classList.toggle("flipped", isFlipped); 
    });
}

if (btnNextWord) {
    btnNextWord.addEventListener("click", () => {
        if (currentIndex < totalWordsCount - 1) { 
            currentIndex++; 
            showWordCard(); 
        } else {
            appMode = "quiz"; 
            if (comboBadge) comboBadge.classList.remove("hidden");
            quizQueue = [...currentWords]; 
            shuffleArray(quizQueue); 
            currentIndex = 0;
            if (stepStudySection) stepStudySection.classList.add("hidden"); 
            if (stepQuizSection) stepQuizSection.classList.remove("hidden");
            showQuizQuestion();
        }
    });
}

if (btnPrev) {
    btnPrev.addEventListener("click", () => { 
        if (currentIndex > 0) { 
            currentIndex--; 
            showWordCard(); 
        } 
    });
}

function showQuizQuestion() {
    if (quizFeedback) quizFeedback.textContent = ""; 
    if (appContainer) appContainer.className = "app-container";
    
    if (quizBadge) {
        quizBadge.textContent = (appMode === "wrongReview") ? "🔄 오답 부스트 트랙" : "2단계: 영영 뜻풀이 퀴즈";
    }
    
    const current = quizQueue[currentIndex]; 
    if (!current) return;

    if (quizDefinition) quizDefinition.textContent = current.definition;
    
    const options = [current.word];
    const pool = currentWords.filter(w => w.word !== current.word).map(w => w.word);
    shuffleArray(pool); 
    for (let i = 0; i < Math.min(3, pool.length); i++) options.push(pool[i]);
    shuffleArray(options); 
    
    if (quizOptions) {
        quizOptions.innerHTML = "";
        options.forEach(text => {
            const button = document.createElement("button"); 
            button.className = "option-btn"; 
            button.textContent = text;
            button.addEventListener("click", () => checkQuizAnswer(button, text, current)); 
            quizOptions.appendChild(button);
        });
    }
    updateProgressBar();
}

function updateCombo(isCorrect) {
    if (!comboBadge) return;
    if (isCorrect) {
        currentCombo++; 
        if (currentCombo > maxCombo) maxCombo = currentCombo;
        comboBadge.textContent = `🔥 ${currentCombo} COMBO!`; 
        comboBadge.style.transform = "scale(1.3)";
        setTimeout(() => comboBadge.style.transform = "scale(1)", 150);
    } else { 
        currentCombo = 0; 
        comboBadge.textContent = `💥 COMBO 리셋!`; 
    }
}

function checkQuizAnswer(selectedBtn, selectedText, currentObj) {
    if (!quizOptions) return;
    const buttons = quizOptions.querySelectorAll(".option-btn"); 
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedText === currentObj.word) {
        selectedBtn.classList.add("correct"); 
        if (appContainer) appContainer.classList.add("correct-flash");
        if (quizFeedback) {
            quizFeedback.style.color = "#10b981"; 
            quizFeedback.textContent = "⭕ Excellent!";
        }
        playSound('correct'); 
        updateCombo(true); 
        speak(currentObj.word);
    } else {
        selectedBtn.classList.add("wrong"); 
        if (appContainer) appContainer.classList.add("wrong-flash");
        if (quizFeedback) {
            quizFeedback.style.color = "#ef4444"; 
            quizFeedback.textContent = `❌ 정답: [ ${currentObj.word} ]`;
        }
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
                alert(`💡 틀린 문제가 ${wrongAnswers.length}개 있습니다. 완벽 정복을 시작합니다!`);
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
                if (stepQuizSection) stepQuizSection.classList.add("hidden"); 
                if (stepSpellingSection) stepSpellingSection.classList.remove("hidden"); 
                showSpellingQuestion();
            }
        }
    }, 1500);
}

function showSpellingQuestion() {
    if (spellFeedback) spellFeedback.textContent = ""; 
    if (appContainer) appContainer.className = "app-container";
    if (spellInput) {
        spellInput.value = ""; 
        spellInput.disabled = false; 
    }
    if (btnSpellSubmit) btnSpellSubmit.disabled = false;
    if (spellCount) spellCount.textContent = currentIndex + 1; 
    if (spellInput) spellInput.focus();
    
    const current = quizQueue[currentIndex]; 
    if (!current) return;

    if (spellDefinition) spellDefinition.textContent = current.definition;
    if (spellHintMeaning) spellHintMeaning.textContent = `💡 한글 뜻:  ${current.meaning}`;
    updateProgressBar();
}

function checkSpellingAnswer() {
    if (!spellInput) return;
    const userInput = spellInput.value.trim().toLowerCase();
    const correctAnswer = quizQueue[currentIndex].word.trim().toLowerCase();
    if (!userInput) return;
    
    spellInput.disabled = true; 
    if (btnSpellSubmit) btnSpellSubmit.disabled = true;
    
    if (userInput === correctAnswer) {
        if (appContainer) appContainer.classList.add("correct-flash"); 
        if (spellFeedback) {
            spellFeedback.style.color = "#10b981";
            spellFeedback.textContent = "⭕ PERFECT SPELLED!";
        }
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
        if (appContainer) appContainer.classList.add("wrong-flash"); 
        if (spellFeedback) {
            spellFeedback.style.color = "#ef4444";
            spellFeedback.textContent = `❌ 정답은 [ ${quizQueue[currentIndex].word} ]`;
        }
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

function showFinalResult() {
    appMode = "result"; 
    if (appContainer) appContainer.className = "app-container";
    if (comboBadge) comboBadge.classList.add("hidden");
    if (stepSpellingSection) stepSpellingSection.classList.add("hidden"); 
    if (stepResultSection) stepResultSection.classList.remove("hidden");
    
    const repId = document.getElementById("report-id");
    const repName = document.getElementById("report-name");
    const repUnit = document.getElementById("report-unit");
    const repCombo = document.getElementById("report-combo");
    const repDate = document.getElementById("report-date");
    const repHash = document.getElementById("report-hash");
    const finalPraise = document.getElementById("final-praise");

    if (repId) repId.textContent = studentID;
    if (repName) repName.textContent = studentName;
    if (repUnit) repUnit.textContent = activeUnitTitle;
    if (repCombo) repCombo.textContent = maxCombo;
    
    playSound('victory');
    const praises = [
        "👑 명예의 전당 등극! 단어의 최고 존엄!",
        "🚀 역대급 집중력! 단원 올클리어 성공!",
        "🏅 완벽한 성적입니다. 어휘 수행평가 가뿐히 Pass!"
    ];
    if (finalPraise) finalPraise.textContent = praises[Math.floor(Math.random() * praises.length)];
    
    const now = new Date();
    if (repDate) {
        repDate.textContent = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}시 ${String(now.getMinutes()).padStart(2,'0')}분`;
    }
    if (repHash) repHash.textContent = generateSecureCode(studentID, studentName, activeUnitTitle, maxCombo);
    updateProgressBar();
}

function generateSecureCode(id, name, unit, combo) {
    let hash = 0; 
    const secureString = `${id}_${name}_${unit}_${combo}_2026_Pro`;
    for (let i = 0; i < secureString.length; i++) { 
        hash = (hash << 5) - hash + secureString.charCodeAt(i); 
        hash |= 0; 
    }
    return "CHAMP-" + Math.abs(hash).toString(16).toUpperCase().substring(0, 8);
}

if (btnSpellSubmit) btnSpellSubmit.addEventListener("click", checkSpellingAnswer);
if (spellInput) { 
    spellInput.addEventListener("keyup", (e) => { if (e.key === "Enter") checkSpellingAnswer(); }); 
}

const btnCopyReport = document.getElementById("btn-copy-report");
if (btnCopyReport) {
    btnCopyReport.addEventListener("click", () => {
        const certBox = document.getElementById("cert-code-box");
        if (certBox) {
            navigator.clipboard.writeText(certBox.innerText).then(() => { 
                alert("📋 완료 확인서가 클립보드에 복사되었습니다!"); 
            });
        }
    });
}

const btnRestart = document.getElementById("btn-restart");
if (btnRestart) {
    btnRestart.addEventListener("click", () => {
        if (inputID) inputID.value = ""; 
        if (inputName) inputName.value = "";
        if (studentBadge) studentBadge.classList.add("hidden");
        if (stepResultSection) stepResultSection.classList.add("hidden");
        if (stepLoginSection) stepLoginSection.classList.remove("hidden");
        if (unitTitleEl) unitTitleEl.textContent = "🎯 단원별 영어 어휘 챌린지";
        appMode = "login"; 
        updateProgressBar();
    });
}

function updateProgressBar() {
    if (!progressBar) return;
    let percent = 0;
    if (appMode === "study") percent = (currentIndex / totalWordsCount) * 33.3;
    else if (appMode === "quiz" || appMode === "wrongReview") percent = 33.3 + (currentIndex / quizQueue.length) * 33.3;
    else if (appMode === "spelling") percent = 66.6 + (currentIndex / quizQueue.length) * 33.4;
    else if (appMode === "result") percent = 100;
    progressBar.style.width = `${percent}%`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}
