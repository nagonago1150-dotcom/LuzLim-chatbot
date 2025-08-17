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
        this.chatTrigger.addEventListener('click', () => {
            this.openChat();
            this.showInitialMessage();
        });
        this.chatClose.addEventListener('click', () => this.closeChat());
    }
    
    openChat() {
        this.chatContainer.classList.add('open');
        this.chatTrigger.style.display = 'none';
    }
    
    closeChat() {
        this.chatContainer.classList.remove('open');
        this.chatTrigger.style.display = 'flex';
        // チャット履歴をリセット
        this.resetChat();
    }
    
    resetChat() {
        this.messagesContainer.innerHTML = '';
        this.optionsContainer.innerHTML = '';
        this.currentState = 'initial';
        this.selectedConcern = null;
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
        
        // スムーズスクロール
        setTimeout(() => {
            this.messagesContainer.scrollTo({
                top: this.messagesContainer.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
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
            button.dataset.optionId = option.id;
            button.addEventListener('click', () => {
                this.handleOptionClick(option);
            });
            this.optionsContainer.appendChild(button);
        });
    }
    
    showInitialMessage() {
        // メッセージが既に表示されている場合はスキップ
        if (this.messagesContainer.children.length > 0) {
            return;
        }
        
        this.addMessage('こんにちは！KALCALAサポートです😊');
        
        setTimeout(() => {
            this.addMessage('どのようなお悩みでお困りですか？');
            setTimeout(() => {
                this.showOptions([
                    { id: 'fat', text: 'お腹の脂肪が気になる' },
                    { id: 'swelling', text: 'むくみが気になる' },
                    { id: 'cold', text: '冷えが気になる' }
                ]);
            }, 800);
        }, 1000);
    }
    
    handleOptionClick(option) {
        this.addMessage(option.text, false);
        
        this.optionsContainer.innerHTML = '';
        
        setTimeout(() => {
            if (option.id === 'purchase') {
                this.handlePurchaseAction();
            } else if (['more_info', 'other_concerns'].includes(option.id)) {
                this.handleSecondaryChoice(option.id);
            } else {
                this.handleUserChoice(option.id);
            }
        }, 500);
    }
    
    handleUserChoice(choiceId) {
        this.selectedConcern = choiceId;
        
        switch (choiceId) {
            case 'fat':
                this.addMessage('お腹の脂肪にお悩みなんですね。');
                setTimeout(() => {
                    this.addMessage('KALCALAのブラックジンジャー由来成分が脂肪燃焼をサポートしますよ！✨');
                    setTimeout(() => {
                        this.showSpecialOffer();
                    }, 1200);
                }, 1000);
                return;
                
            case 'swelling':
                this.addMessage('むくみにお悩みなんですね。');
                setTimeout(() => {
                    this.addMessage('KALCALAなら6時間後にむくみを44%軽減できます！👍');
                    setTimeout(() => {
                        this.showSpecialOffer();
                    }, 1200);
                }, 1000);
                return;
                
            case 'cold':
                this.addMessage('冷えにお悩みなんですね。');
                setTimeout(() => {
                    this.addMessage('KALCALAのヒハツ由来成分が血流改善で冷えを軽減できます！🔥');
                    setTimeout(() => {
                        this.showSpecialOffer();
                    }, 1200);
                }, 1000);
                return;
        }
    }
    
    showSecondaryOptions() {
        this.showOptions([
            { id: 'more_info', text: 'もっと詳しく知りたい' },
            { id: 'other_concerns', text: '他の悩みも相談したい' }
        ]);
    }
    
    showSpecialOffer() {
        this.addMessage('そんなあなたに朗報です！🎉');
        
        setTimeout(() => {
            this.addMessage('今なら特別キャンペーン中です！');
            setTimeout(() => {
                // 画像を表示
                const imageDiv = document.createElement('div');
                imageDiv.className = 'message bot';
                const imageContent = document.createElement('div');
                imageContent.className = 'message-content';
                const img = document.createElement('img');
                img.src = 'hero-main-image.jpg';
                img.alt = 'KALCALA特別キャンペーン';
                img.style.width = '100%';
                img.style.borderRadius = '8px';
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => this.redirectToPurchase());
                imageContent.appendChild(img);
                imageDiv.appendChild(imageContent);
                this.messagesContainer.appendChild(imageDiv);
                this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
                
                setTimeout(() => {
                    this.addMessage('初回83%OFF、たった500円でお試しできます！💰');
                    setTimeout(() => {
                        this.showFinalOptions();
                    }, 1200);
                }, 1000);
            }, 1000);
        }, 1000);
    }
    
    showFinalOptions() {
        this.showOptions([
            { id: 'purchase', text: '今すぐ500円で試す！', isCTA: true },
            { id: 'more_info', text: 'もう少し詳しく' },
            { id: 'other_concerns', text: '他の悩みも' }
        ]);
    }
    
    showPriceOffer() {
        this.addMessage('今なら、初回定期価格500円（税込・送料無料）でお試しいただけます！2回目以降も約23%OFFです。');
        
        setTimeout(() => {
            this.showOptions([
                { id: 'purchase', text: '今すぐ500円で試す！', isCTA: true }
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
    
    handlePurchaseAction() {
        setTimeout(() => {
            this.addMessage('素晴らしい判断ですね！🎉');
            setTimeout(() => {
                this.addMessage('お得な定期コースページにご案内いたします...');
                
                // 購入ページへのリンクボタンも表示
                const linkDiv = document.createElement('div');
                linkDiv.className = 'message bot';
                const linkContent = document.createElement('div');
                linkContent.className = 'message-content';
                const linkButton = document.createElement('a');
                linkButton.href = 'https://shop.sain-clarte.com/kalcala/15_nensyo2_mu_ka.lp_ishi/sp.html';
                linkButton.target = '_blank';
                linkButton.rel = 'noopener noreferrer';
                linkButton.style.cssText = `
                    display: inline-block;
                    background: linear-gradient(145deg, #DAA520 0%, #FFD700 50%, #DAA520 100%);
                    color: #000000;
                    padding: 12px 24px;
                    border-radius: 25px;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 16px;
                    margin: 10px 0;
                    transition: transform 0.2s ease;
                `;
                linkButton.textContent = '🛒 今すぐ購入ページへ';
                linkButton.addEventListener('mouseenter', () => {
                    linkButton.style.transform = 'translateY(-2px)';
                });
                linkButton.addEventListener('mouseleave', () => {
                    linkButton.style.transform = 'translateY(0)';
                });
                
                linkContent.appendChild(linkButton);
                linkDiv.appendChild(linkContent);
                this.messagesContainer.appendChild(linkDiv);
                
                setTimeout(() => {
                    this.messagesContainer.scrollTo({
                        top: this.messagesContainer.scrollHeight,
                        behavior: 'smooth'
                    });
                }, 100);
                
                setTimeout(() => {
                    this.redirectToPurchase();
                }, 1500);
            }, 800);
        }, 300);
    }
    
    redirectToPurchase() {
        const lpUrl = 'https://shop.sain-clarte.com/kalcala/15_nensyo2_mu_ka.lp_ishi/sp.html';
        
        // ポップアップブロッカー対策として複数の方法を試行
        try {
            const newWindow = window.open(lpUrl, '_blank', 'noopener,noreferrer');
            if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
                // ポップアップがブロックされた場合、同じタブで開く
                window.location.href = lpUrl;
            }
        } catch (e) {
            // エラーの場合は同じタブで開く
            window.location.href = lpUrl;
        }
    }
    
    handleSecondaryChoice(choiceId) {
        switch (choiceId) {
            case 'more_info':
                setTimeout(() => {
                    this.addMessage('KALCALAの詳細をご説明しますね！📋');
                    setTimeout(() => {
                        this.addMessage('✅ 92.9%の医師が推奨\n✅ 機能性表示食品として届け出済み\n✅ 30日間全額返金保証付き');
                        setTimeout(() => {
                            this.addMessage('安心してお試しいただけます！');
                            setTimeout(() => {
                                this.showFinalOptions();
                            }, 1000);
                        }, 1500);
                    }, 1000);
                }, 300);
                break;
                
            case 'other_concerns':
                setTimeout(() => {
                    this.addMessage('他にもお悩みがあるのですね😊');
                    setTimeout(() => {
                        this.addMessage('KALCALAは複数のお悩みに同時にアプローチできます！どちらが一番気になりますか？');
                        setTimeout(() => {
                            this.resetToInitialOptions();
                        }, 1000);
                    }, 1000);
                }, 300);
                break;
                
            case 'purchase':
                this.handlePurchaseAction();
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
    
    // グローバルイベントリスナーは削除（各ボタンに直接イベントを設定）
    
    // 相談ボタンでチャットボットを開く
    document.getElementById('consultation-trigger').addEventListener('click', function(e) {
        e.preventDefault();
        chatbot.openChat();
        chatbot.showInitialMessage();
    });
    
    // ヒーローセクションの相談ボタンでチャットボットを開く
    document.getElementById('hero-consultation-trigger').addEventListener('click', function(e) {
        e.preventDefault();
        chatbot.openChat();
        chatbot.showInitialMessage();
    });
});