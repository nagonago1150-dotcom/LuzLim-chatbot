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
        window.open('#purchase', '_blank');
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

document.addEventListener('DOMContentLoaded', function() {
    const chatbot = new KalcalaChatbot();
    
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
        e.preventDefault();
        alert('購入ページに遷移します（実際の実装では購入フォームページに遷移）');
    });
});