document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeLevelSystem();
    initializePracticeSystem();
    initializeProgressTracking();
});

// 初始化動畫效果
function initializeAnimations() {
    // 歡迎區塊動畫
    const welcomeSection = document.querySelector('.welcome-section');
    welcomeSection.style.opacity = '0';
    setTimeout(() => {
        welcomeSection.style.transition = 'opacity 1s ease-in-out';
        welcomeSection.style.opacity = '1';
    }, 100);

    // 開始按鈕動畫效果
    const startButton = document.querySelector('.start-button');
    startButton.addEventListener('mouseenter', () => {
        startButton.style.transform = 'scale(1.1)';
        startButton.style.transition = 'all 0.3s ease';
        startButton.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    });

    startButton.addEventListener('mouseleave', () => {
        startButton.style.transform = 'scale(1)';
        startButton.style.boxShadow = 'none';
    });

    // 滾動動畫
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        sectionObserver.observe(section);
    });
}

// 導航系統
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.header-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.textContent.toLowerCase();
            const section = document.querySelector(`.${target}-section`) || 
                           document.querySelector(`.${target == 'inicio' ? 'welcome' : target}-section`);
            
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }

            // 導航高亮效果
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// 課程等級系統
function initializeLevelSystem() {
    const levelCards = document.querySelectorAll('.level-card');
    
    levelCards.forEach(card => {
        // 懸停效果
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotate(2deg)';
            card.style.transition = 'all 0.3s ease';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotate(0)';
            card.style.boxShadow = 'none';
        });

        // 點擊展開課程內容
        card.addEventListener('click', () => {
            const level = card.querySelector('h3').textContent;
            showLevelContent(level);
        });
    });
}

// 練習系統
function initializePracticeSystem() {
    const practiceCards = document.querySelectorAll('.practice-card');
    
    practiceCards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.querySelector('.practice-label p:first-child').textContent;
            startPracticeActivity(type);
        });

        // 動態效果
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.practice-icon');
            icon.style.transform = 'scale(1.1) rotate(10deg)';
            icon.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.practice-icon');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });
}

// 學習進度追蹤
function initializeProgressTracking() {
    let progress = JSON.parse(localStorage.getItem('spanishProgress')) || {
        completedLessons: [],
        points: 0,
        level: 'beginner'
    };

    // 更新進度顯示
    function updateProgressDisplay() {
        const footer = document.querySelector('.footer');
        const progressDiv = document.createElement('div');
        progressDiv.className = 'progress-display';
        progressDiv.innerHTML = `
            <span>Points: ${progress.points}</span>
            <span>Level: ${progress.level}</span>
        `;
        footer.appendChild(progressDiv);
    }

    updateProgressDisplay();
}

// 顯示課程內容
function showLevelContent(level) {
    const modal = document.createElement('div');
    modal.className = 'course-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${level} 課程內容</h2>
            <div class="lesson-grid">
                <div class="lesson-card">
                    <h3>基礎會話</h3>
                    <p>學習日常對話的基本句型</p>
                    <button onclick="startLesson('conversation')">開始學習</button>
                </div>
                <div class="lesson-card">
                    <h3>詞彙建構</h3>
                    <p>擴充常用詞彙量</p>
                    <button onclick="startLesson('vocabulary')">開始學習</button>
                </div>
                <div class="lesson-card">
                    <h3>文法練習</h3>
                    <p>掌握重要文法規則</p>
                    <button onclick="startLesson('grammar')">開始學習</button>
                </div>
            </div>
            <button class="close-modal">關閉</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').onclick = () => modal.remove();
}

// 開始練習活動
function startPracticeActivity(type) {
    const activities = {
        'juego': () => startGame(),
        'Práctica': () => startPractice(),
        'escucha': () => startListening()
    };

    if (activities[type]) {
        activities[type]();
    }
}

// 遊戲系統
function startGame() {
    const gameModal = document.createElement('div');
    gameModal.className = 'game-modal';
    const words = [
        {es: 'perro', en: 'dog'},
        {es: 'gato', en: 'cat'},
        {es: 'casa', en: 'house'},
        {es: 'libro', en: 'book'},
        {es: 'agua', en: 'water'}
    ];
    
    let currentWord = words[Math.floor(Math.random() * words.length)];
    let score = 0;
    
    gameModal.innerHTML = `
        <div class="game-content">
            <h2>西班牙文詞彙遊戲</h2>
            <div class="score">得分: <span>${score}</span></div>
            <div class="word-display">${currentWord.es}</div>
            <input type="text" placeholder="輸入英文翻譯" class="answer-input">
            <button class="submit-answer">確認答案</button>
            <button class="close-game">結束遊戲</button>
        </div>
    `;
    
    document.body.appendChild(gameModal);

    // 添加遊戲邏輯...
}// Smooth scroll function
const smoothScroll = (targetId) => {
    const target = document.querySelector(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

// Add click events to navigation links
document.querySelectorAll('.header-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId && targetId !== '#') {
            smoothScroll(targetId);
        }
    });
});

// Add click event to start button
const startButton = document.querySelector('.start-button');
if (startButton) {
    startButton.addEventListener('click', () => {
        smoothScroll('#courses');
    });
}

// Add click events to practice cards
document.querySelectorAll('.practice-card').forEach(card => {
    card.addEventListener('click', function() {
        const labelElement = this.querySelector('.practice-label p:first-child');
        if (labelElement) {
            const type = labelElement.textContent;
            switch(type.toLowerCase().trim()) {
                case 'juego':
                    alert('為什麼JavaScript總是心情不好？ 因為它總是處於「undefined」的狀態。');
                    break;
                case 'práctica':
                    alert('“我寫的程式再也沒有錯誤了！”朋友：“哇，怎麼做到的？”我淡定地說：“簡單，我把整個檔案都刪了。');
                    break;
                case 'escucha':
                    alert('學打程式的人有三種狀態：寫不出來、跑不起來、修不好。');
                    break;
                default:
                    alert('當程式員遇到麻煩時，他們會說：“這是一個無解的問題！”但事實上，這只是他們忘了加分號。');
            }
        }
    });
});

// Add hover effects
const addHoverEffect = (element) => {
    element.style.transition = 'transform 0.3s ease';
    element.style.transform = 'translateY(-5px)';
};

const removeHoverEffect = (element) => {
    element.style.transform = 'translateY(0)';
};

document.querySelectorAll('.practice-card, .level-card').forEach(card => {
    card.addEventListener('mouseenter', () => addHoverEffect(card));
    card.addEventListener('mouseleave', () => removeHoverEffect(card));
});