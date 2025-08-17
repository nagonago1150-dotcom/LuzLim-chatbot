class KalcalaChatbot {
    constructor() {
        this.chatContainer = document.getElementById('chatbot-container');
        this.chatTrigger = document.getElementById('chatbot-trigger');
        this.chatClose = document.getElementById('chatbot-close');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.optionsContainer = document.getElementById('chatbot-options');
        
        this.currentState = 'initial';
        this.selectedConcern = null;
        
        this.init();
    }
    
    init() {
        this.chatTrigger.addEventListener('click', () => this.openChat());
        this.chatClose.addEventListener('click', () => this.closeChat());
        
        setTimeout(() => {
            this.openChat();
            this.showInitialMessage();
        }, 2000);
    }
    
    openChat() {
        this.chatContainer.classList.add('open');
        this.chatTrigger.style.display = 'none';
    }
    
    closeChat() {
        this.chatContainer.classList.remove('open');
        this.chatTrigger.style.display = 'flex';
    }
    
    addMessage(content, isBot = true, isHTML = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (isHTML) {
            contentDiv.innerHTML = content;
        } else {
            contentDiv.textContent = content;
        }
        
        messageDiv.appendChild(contentDiv);
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
    
    showOptions(options) {
        this.optionsContainer.innerHTML = '';
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-button';
            if (option.isCTA) {
                button.classList.add('cta-option');
            }
            button.textContent = option.text;
            button.addEventListener('click', () => {
                this.handleOptionClick(option);
            });
            this.optionsContainer.appendChild(button);
        });
    }
    
    showInitialMessage() {
        this.addMessage('こんにちは！KALCALAについて知りたいことはありませんか？');
        
        setTimeout(() => {
            this.showOptions([
                { id: 'fat', text: 'お腹の脂肪が気になる' },
                { id: 'swelling', text: 'むくみが気になる' },
                { id: 'cold', text: '冷えが気になる' }
            ]);
        }, 1000);
    }
    
    handleOptionClick(option) {
        this.addMessage(option.text, false);
        
        this.optionsContainer.innerHTML = '';
        
        setTimeout(() => {
            this.handleUserChoice(option.id);
        }, 500);
    }
    
    handleUserChoice(choiceId) {
        this.selectedConcern = choiceId;
        
        switch (choiceId) {
            case 'fat':
                this.addMessage('お腹の脂肪にお悩みなんですね。KALCALAには、BMIが高めの方のお腹の脂肪を減らすのを助けるブラックジンジャー由来ポリメトキシフラボンが含まれていますよ！※BMI高めの方');
                break;
                
            case 'swelling':
                this.addMessage('脚のむくみ、気になりますよね。KALCALAは、夕方の脚のむくみを軽減するヒハツ由来ピペリンを配合しています。※病的ではない一過性のむくみ');
                break;
                
            case 'cold':
                this.addMessage('冷えにお悩みですか？KALCALAに含まれるヒハツ由来ピペリンが、冷えの軽減をサポートします！※末梢血流量を増加させ、冷えの軽減に役立つ機能が報告されています');
                break;
        }
        
        setTimeout(() => {
            this.showSecondaryOptions();
        }, 2000);
    }
    
    showSecondaryOptions() {
        this.showOptions([
            { id: 'more_info', text: 'もっと詳しく知りたい' },
            { id: 'other_concerns', text: '他の悩みも相談したい' }
        ]);
    }
    
    showDetailedInfo() {
        this.addMessage('さらに、現役医師も注目しているんです！92.9%の医師が『継続を勧めたい』と回答した医師推奨製品です。', true, true);
        
        setTimeout(() => {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'small-text';
            noteDiv.textContent = 'Dr\'s Review事務局調べ';
            this.messagesContainer.lastChild.querySelector('.message-content').appendChild(noteDiv);
        }, 500);
        
        setTimeout(() => {
            this.addMessage('Amazonと楽天でランキング1位を獲得しました！', true, true);
            
            setTimeout(() => {
                const noteDiv = document.createElement('div');
                noteDiv.className = 'small-text';
                noteDiv.textContent = '※各種レギュレーションに基づく表記';
                this.messagesContainer.lastChild.querySelector('.message-content').appendChild(noteDiv);
            }, 500);
        }, 2000);
        
        setTimeout(() => {
            this.showPriceOffer();
        }, 4000);
    }
    
    showPriceOffer() {
        this.addMessage('今なら、初回定期価格500円（税込・送料無料）でお試しいただけます！2回目以降も約23%OFFです。');
        
        setTimeout(() => {
            this.showOptions([
                { id: 'purchase', text: '今すぐお得に始める！', isCTA: true }
            ]);
        }, 1500);
    }
    
    resetToInitialOptions() {
        this.showOptions([
            { id: 'fat', text: 'お腹の脂肪が気になる' },
            { id: 'swelling', text: 'むくみが気になる' },
            { id: 'cold', text: '冷えが気になる' }
        ]);
    }
    
    redirectToPurchase() {
        window.open('https://shop.sain-clarte.com/kalcala/15_nensyo2_mu_ka.lp_ishi/sp.html', '_blank');
    }
    
    handleSecondaryChoice(choiceId) {
        switch (choiceId) {
            case 'more_info':
                this.addMessage('もっと詳しく知りたい', false);
                setTimeout(() => {
                    this.showDetailedInfo();
                }, 500);
                break;
                
            case 'other_concerns':
                this.addMessage('他の悩みも相談したい', false);
                setTimeout(() => {
                    this.addMessage('他にもお悩みがあるのですね。どちらが気になりますか？');
                    setTimeout(() => {
                        this.resetToInitialOptions();
                    }, 1000);
                }, 500);
                break;
                
            case 'purchase':
                this.addMessage('今すぐお得に始める！', false);
                setTimeout(() => {
                    this.addMessage('ありがとうございます！お得な定期コースをご案内いたします。');
                    setTimeout(() => {
                        this.redirectToPurchase();
                    }, 1000);
                }, 500);
                break;
        }
    }
}

// パーティクルアニメーション
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }
    
    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '0.6';
        document.body.appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                color: `hsl(${45 + Math.random() * 15}, 70%, 60%)`
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// スクロールアニメーション
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.observeElements();
        this.initCounterAnimation();
    }
    
    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // アニメーション対象要素を監視
        document.querySelectorAll('.hero h2, .hero p, .features h3, .tab-button, .benefits-section h3, .concern-illustration, .solution-illustration, .scientific-evidence, .cta-section h3').forEach(el => {
            observer.observe(el);
        });
    }
    
    initCounterAnimation() {
        const counterElements = document.querySelectorAll('[data-counter]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterElements.forEach(el => {
            counterObserver.observe(el);
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.dataset.counter);
        const duration = 2000;
        const start = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.floor(progress * target);
            element.textContent = currentValue + '%';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target + '%';
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// インタラクティブタブシステム
class InteractiveFeatures {
    constructor() {
        this.init();
    }
    
    init() {
        this.initTabs();
        this.initProgressRings();
    }
    
    initTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanels = document.querySelectorAll('.tab-panel');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                
                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button and corresponding panel
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
                
                // Restart animations for the active panel
                this.animateActiveTab(targetTab);
            });
        });
    }
    
    animateActiveTab(tabId) {
        const activePanel = document.getElementById(tabId);
        const benefitItems = activePanel.querySelectorAll('.benefit-item');
        
        // Reset and restart benefit item animations
        benefitItems.forEach((item, index) => {
            item.style.animation = 'none';
            item.offsetHeight; // Trigger reflow
            item.style.animation = `fadeInLeft 0.6s ease-out ${index * 0.1}s both`;
        });
        
        // Animate progress ring if present
        const progressCircle = activePanel.querySelector('.progress-circle');
        if (progressCircle) {
            progressCircle.style.animation = 'none';
            progressCircle.offsetHeight; // Trigger reflow
            progressCircle.style.animation = 'progressAnimation 2s ease-in-out';
        }
        
        // Animate counter if present
        const counterElement = activePanel.querySelector('[data-counter]');
        if (counterElement) {
            this.animateCounter(counterElement);
        }
    }
    
    initProgressRings() {
        const progressCircles = document.querySelectorAll('.progress-circle');
        progressCircles.forEach(circle => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        circle.style.animation = 'progressAnimation 2s ease-in-out';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(circle);
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.dataset.counter);
        const duration = 1500;
        const start = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(easeOutQuart * target);
            
            element.textContent = currentValue + '%';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target + '%';
            }
        };
        
        requestAnimationFrame(animate);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const chatbot = new KalcalaChatbot();
    
    // パーティクルシステム初期化
    new ParticleSystem();
    
    // スクロールアニメーション初期化
    new ScrollAnimations();
    
    // インタラクティブ機能初期化
    new InteractiveFeatures();
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('option-button')) {
            const optionId = e.target.textContent;
            
            if (optionId === 'もっと詳しく知りたい') {
                chatbot.handleSecondaryChoice('more_info');
            } else if (optionId === '他の悩みも相談したい') {
                chatbot.handleSecondaryChoice('other_concerns');
            } else if (optionId === '今すぐお得に始める！') {
                chatbot.handleSecondaryChoice('purchase');
            }
        }
    });
    
    document.querySelector('.cta-button').addEventListener('click', function(e) {
        // CTAボタンは既にhrefで適切なURLに設定されているため、デフォルト動作を許可
        // e.preventDefault(); を削除
    });
});