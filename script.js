// 📦 [원천 차단] 단원별 단어 데이터를 스크립트 내부에 직접 탑재합니다.
const ALL_VOCAB_DATA = {
    "unit4": {
        "title": "▶ [4과] Lesson 4. Be a Smart Spender",
        "words": [
            { "word": "spender", "meaning": "돈을 쓰는 사람", "definition": "someone who spends money", "example": "Tourists are big spenders." },
            { "word": "exchange", "meaning": "교환하다", "definition": "to give something to someone and receive something from that person", "example": "My family and I exchange presents on Christmas." },
            { "word": "refund", "meaning": "환불", "definition": "a sum of money which is returned to you", "example": "The clerk is going to refund my money." },
            { "word": "receipt", "meaning": "영수증", "definition": "a piece of paper that shows you have paid for something", "example": "Don't throw away the receipt after you buy something." },
            { "word": "receive", "meaning": "받다", "definition": "to get something after someone gives it to you or sends it to you", "example": "The singer received lots of gifts from his fans." },
            { "word": "budget", "meaning": "예산", "definition": "an amount of money that a person or company can spend", "example": "We should plan our trip within a budget." },
            { "word": "donate", "meaning": "기부하다", "definition": "to give money to a group that needs help", "example": "He donated money to the school in Africa." },
            { "word": "allowance", "meaning": "용돈", "definition": "money given by parents to a child regularly that the child can spend", "example": "I have saved my allowance to buy a hat." },
            { "word": "effort", "meaning": "노력", "definition": "hard work that you do when you are trying to achieve something", "example": "People made an effort to clean the beach." },
            { "word": "majority", "meaning": "대다수", "definition": "most of the people or things in a group", "example": "The majority of people agree with this view." },
            { "word": "balance", "meaning": "잔액", "definition": "the amount of money you have in your bank account", "example": "It is easy to check your bank balance on the Internet." },
            { "word": "have difficulty -ing", "meaning": "~ 하는 데 어려움을 겪다", "definition": "under the state or situation of having a problem", "example": "Mike has difficulty using his new camera." },
            { "word": "charity", "meaning": "자선 단체", "definition": "an organization that gives money or help to people who need it", "example": "Many people give food and clothes to the charity." },
            { "word": "remaining", "meaning": "남아 있는", "definition": "left over after a part has been taken, used, or lost", "example": "Jack drank the remaining juice." },
            { "word": "tight", "meaning": "빠듯한", "definition": "(of money or time) limited or restricted", "example": "They have a tight schedule this week." },
            { "word": "although", "meaning": "비록~일지라도", "definition": "in spite of the fact that; even though", "example": "Although the bag is old, I like the bag's design." },
            { "word": "on the spot", "meaning": "즉각, 즉석에서", "definition": "in the exact place where something is happening", "example": "Justin played the guitar on the spot." },
            { "word": "on sale", "meaning": "판매 중인, 할인 중인", "definition": "available to be bought, especially in a shop or store being offered at a reduced price", "example": "Ice cream is on sale for half price." },
            { "word": "native", "meaning": "토착민, 현지인", "definition": "a local inhabitant", "example": "There is a picture of a native of this area in this book." },
            { "word": "loose", "meaning": "헐렁한", "definition": "not fitting tightly or closely", "example": "These pants are a little loose for me." }
        ]
    },
    "unit5": {
        "title": "▶ [5과] Lesson 5. Teamwork in Sports",
        "words": [
            { "word": "register", "meaning": "등록하다", "definition": "to put someone’s or something’s name on an official list", "example": "How many students registered for the English class?" },
            { "word": "pit", "meaning": "피트 (자동차 경주의)", "definition": "the area beside a race track where cars are repaired or get more gas during a race", "example": "The racing cars can be repaired in the pit." },
            { "word": "pacer", "meaning": "페이서, 보조 조절자", "definition": "a person or thing that paces", "example": "Kate couldn't finish the marathon without the help of her pacer." },
            { "word": "crew", "meaning": "팀, 무리, 선원", "definition": "a group of people with a particular skill who work together", "example": "There are 10 members in our crew." },
            { "word": "on one's own", "meaning": "혼자서", "definition": "for or by oneself", "example": "He managed to fix the problem on his own." },
            { "word": "trophy", "meaning": "트로피", "definition": "a metal cup or other object that someone gets for winning a game or race", "example": "The winner held the trophy in the air." },
            { "word": "attention", "meaning": "주의, 주목", "definition": "listening or looking carefully", "example": "We have to pay attention to his speech." },
            { "word": "several", "meaning": "몇몇의", "definition": "some, but not many", "example": "Mina has seen the movie several times." },
            { "word": "achieve", "meaning": "달성하다, 성취하다", "definition": "to succeed in doing or getting something you want", "example": "I should try my best to achieve my goal." },
            { "word": "depending on", "meaning": "~에 따라", "definition": "determined by conditions or circumstances that follow", "example": "My personality changes depending on the person." },
            { "word": "target", "meaning": "목표", "definition": "the aim or result that you try to achieve", "example": "Our target customers are teenagers." },
            { "word": "particular", "meaning": "특정한", "definition": "special, or more than usual", "example": "Do you have a particular restaurant in mind?" },
            { "word": "keep track of", "meaning": "~에 대해 파악하다", "definition": "to pay attention to someone or something, so that you know where they are or what is happening to them", "example": "I followed the map, keeping track of our position." },
            { "word": "therefore", "meaning": "그러므로", "definition": "for the reason that you have mentioned", "example": "There is heavy traffic, therefore, we should take the subway." },
            { "word": "wear out", "meaning": "(낡아서) 떨어지다", "definition": "to use something a lot so that it no longer works, or can no longer be used", "example": "My boots are beginning to wear out." },
            { "word": "breathe", "meaning": "숨 쉬다", "definition": "to take air into your body and let it out again", "example": "Close your eyes and breathe deeply." },
            { "word": "hire", "meaning": "고용하다", "definition": "to pay someone to work for you", "example": "Tom was hired as a librarian." },
            { "word": "support", "meaning": "지원하다, 지지하다", "definition": "to help someone, often when they are having problems", "example": "Many students support the plans to change school uniforms." },
            { "word": "tribe", "meaning": "부족, 종족", "definition": "a group of people who have their own language and ways of living", "example": "We can learn the culture of the Masai tribe in this class." },
            { "word": "invisible", "meaning": "(눈에) 보이지 않는", "definition": "not able to be seen", "example": "Many stars are invisible without a telescope." }
        ]
    }
};

// 🎮 앱 상태 제어용 전역 변수들
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

// DOM 요소 안전하게 선택
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

// 효과음 제어 시스템
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
    } catch (e) { console.log("Sound Playback Error Blocked."); }
}

// 🌟 미션 스타트 (데이터 즉시 연결 방식)
btnStartApp?.addEventListener("click", () => {
    studentID = inputID ? inputID.value.trim() : "";
    studentName = inputName ? inputName.value.trim() : "";
    const selectedUnitNum = selectUnitEl ? selectUnitEl.value : "unit5";
    
    if (!studentID || !studentName) {
        alert("학번과 이름을 정확히 입력해 주세요!");
        return;
    }
    
    // 외부 words.js에 의존하지 않고 상단의 자체 데이터에서 추출합니다.
    if (ALL_VOCAB_DATA[selectedUnitNum]) {
        activeUnitTitle = ALL_VOCAB_DATA[selectedUnitNum].title;
        currentWords = [...ALL_VOCAB_DATA[selectedUnitNum].words];
    } else {
        alert("선택하신 단원의 데이터가 스크립트 내에 존재하지 않습니다.");
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
    
    if (stepLoginSection) stepLoginSection.classList.add("hidden");
    if (stepStudySection) stepStudySection.classList.remove("hidden");
    
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

btnSpeak?.addEventListener("click", (e) => { 
    e.stopPropagation(); 
    if (currentWords[currentIndex]) speak(currentWords[currentIndex].word); 
});

flashcard?.addEventListener("click", () => { 
    isFlipped = !isFlipped; 
    flashcard.classList.toggle("flipped", isFlipped); 
});

btnNextWord?.addEventListener("click", () => {
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

btnPrev?.addEventListener("click", () => { 
    if (currentIndex > 0) { 
        currentIndex--; 
        showWordCard(); 
    } 
});

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
                alert(`💡 틀린 문제가 ${wrongAnswers.length}개 있습니다. 오답 정복을 시작합니다!`);
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

btnSpellSubmit?.addEventListener("click", checkSpellingAnswer);
spellInput?.addEventListener("keyup", (e) => { if (e.key === "Enter") checkSpellingAnswer(); }); 

document.getElementById("btn-copy-report")?.addEventListener("click", () => {
    const certBox = document.getElementById("cert-code-box");
    if (certBox) {
        navigator.clipboard.writeText(certBox.innerText).then(() => { 
            alert("📋 완료 확인서가 클립보드에 복사되었습니다!"); 
        });
    }
});

document.getElementById("btn-restart")?.addEventListener("click", () => {
    if (inputID) inputID.value = ""; 
    if (inputName) inputName.value = "";
    if (studentBadge) studentBadge.classList.add("hidden");
    if (stepResultSection) stepResultSection.classList.add("hidden");
    if (stepLoginSection) stepLoginSection.classList.remove("hidden");
    if (unitTitleEl) unitTitleEl.textContent = "🎯 단원별 영어 어휘 챌린지";
    appMode = "login"; 
    updateProgressBar();
});

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
