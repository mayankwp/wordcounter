// Word Counter Application
class WordCounter {
    constructor() {
        this.textInput = document.getElementById('textInput');
        this.wordCountEl = document.getElementById('wordCount');
        this.charCountEl = document.getElementById('charCount');
        this.sentenceCountEl = document.getElementById('sentenceCount');
        this.paragraphCountEl = document.getElementById('paragraphCount');
        this.readingTimeEl = document.getElementById('readingTime');
        this.speakingTimeEl = document.getElementById('speakingTime');
        this.readingLevelEl = document.getElementById('readingLevel');
        this.keywordsListEl = document.getElementById('keywordsList');
        
        // Mode controls
        this.basicModeBtn = document.getElementById('basicModeBtn');
        this.sidebar = document.getElementById('sidebar');
        this.toolContent = document.querySelector('.tool-content');
        
        // Modal elements
        this.optionsModal = document.getElementById('optionsModal');
        this.optionsBtn = document.getElementById('optionsBtn');
        this.modalClose = document.getElementById('modalClose');
        
        // Theme toggle
        this.themeToggle = document.getElementById('themeToggle');
        
        // Scroll elements
        this.scrollProgress = document.getElementById('scrollProgress');
        this.scrollToTop = document.getElementById('scrollToTop');
        
        // Auto-save
        this.autoSaveStatus = document.getElementById('autoSaveStatus');
        this.autoSaveTimer = null;
        
        // Activity tracking
        this.activityList = document.getElementById('activityList');
        this.activities = [];
        
        // Current mode
        this.isBasicMode = false;
        
        this.initializeEventListeners();
        this.loadSavedContent();
        this.initializeTheme();
        this.updateAllStats();
        this.initializeAutoResize();
        
        // Initial resize after setup with delay to ensure DOM is ready
        setTimeout(() => this.autoResize(), 100);
    }
    
    initializeEventListeners() {
        // Text input events
        this.textInput.addEventListener('input', this.handleTextInput.bind(this));
        this.textInput.addEventListener('paste', this.handlePaste.bind(this));
        
        // Mode toggle
        this.basicModeBtn.addEventListener('click', this.toggleMode.bind(this));
        
        // Modal events
        this.optionsBtn.addEventListener('click', this.openModal.bind(this));
        this.modalClose.addEventListener('click', this.closeModal.bind(this));
        this.optionsModal.addEventListener('click', this.handleModalClick.bind(this));
        
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', this.switchTab.bind(this));
        });
        
        // Theme toggle
        this.themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        
        // Scroll events
        window.addEventListener('scroll', this.handleScroll.bind(this));
        this.scrollToTop.addEventListener('click', this.scrollToTopAction.bind(this));
        
        // Action buttons
        this.initializeActionButtons();
        
        // Settings
        this.initializeSettings();
        
        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));
    }
    
    handleTextInput(e) {
        this.updateAllStats();
        this.scheduleAutoSave();
        this.trackActivity('Text modified');
    }
    
    handlePaste(e) {
        setTimeout(() => {
            this.updateAllStats();
            this.scheduleAutoSave();
            this.trackActivity('Text pasted');
        }, 10);
    }
    
    updateAllStats() {
        const text = this.textInput.value;
        
        // Basic counts
        const words = this.countWords(text);
        const characters = text.length;
        const sentences = this.countSentences(text);
        const paragraphs = this.countParagraphs(text);
        
        // Update basic stats
        this.wordCountEl.textContent = words.toLocaleString();
        this.charCountEl.textContent = characters.toLocaleString();
        this.sentenceCountEl.textContent = sentences.toLocaleString();
        this.paragraphCountEl.textContent = paragraphs.toLocaleString();
        
        // Update reading metrics
        this.updateReadingMetrics(words, sentences);
        
        // Update keywords
        this.updateKeywords(text);
        
        // Update modal details
        this.updateModalDetails(text, words, sentences);
    }
    
    countWords(text) {
        if (!text.trim()) return 0;
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    }
    
    countSentences(text) {
        if (!text.trim()) return 0;
        return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    }
    
    countParagraphs(text) {
        if (!text.trim()) return 0;
        return text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0).length;
    }
    
    updateReadingMetrics(words, sentences) {
        // Reading time (average 200 words per minute)
        const readingMinutes = Math.ceil(words / 200);
        this.readingTimeEl.textContent = `${readingMinutes} min`;
        
        // Speaking time (average 130 words per minute)
        const speakingMinutes = Math.ceil(words / 130);
        this.speakingTimeEl.textContent = `${speakingMinutes} min`;
        
        // Simple reading level calculation (Flesch-Kincaid approximation)
        if (words > 0 && sentences > 0) {
            const avgWordsPerSentence = words / sentences;
            const avgSyllablesPerWord = this.estimateAverageSyllables();
            const fleschScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
            
            let level = 'Graduate';
            if (fleschScore >= 90) level = 'Elementary';
            else if (fleschScore >= 80) level = 'Middle School';
            else if (fleschScore >= 70) level = 'High School';
            else if (fleschScore >= 60) level = 'College';
            else if (fleschScore >= 50) level = 'Graduate';
            else level = 'Post-Graduate';
            
            this.readingLevelEl.textContent = level;
        } else {
            this.readingLevelEl.textContent = '-';
        }
    }
    
    estimateAverageSyllables() {
        const text = this.textInput.value.toLowerCase();
        const words = text.match(/\b\w+\b/g) || [];
        if (words.length === 0) return 0;
        
        let totalSyllables = 0;
        words.forEach(word => {
            totalSyllables += this.countSyllables(word);
        });
        
        return totalSyllables / words.length;
    }
    
    countSyllables(word) {
        if (word.length <= 3) return 1;
        word = word.toLowerCase();
        let syllables = 0;
        const vowels = 'aeiouy';
        let prevWasVowel = false;
        
        for (let i = 0; i < word.length; i++) {
            const isVowel = vowels.includes(word[i]);
            if (isVowel && !prevWasVowel) {
                syllables++;
            }
            prevWasVowel = isVowel;
        }
        
        if (word.endsWith('e')) syllables--;
        return Math.max(1, syllables);
    }
    
    updateKeywords(text) {
        if (!text.trim()) {
            this.keywordsListEl.innerHTML = '<p class="empty-state">Start typing to see keyword analysis</p>';
            return;
        }
        
        // Extract and count words
        const words = text.toLowerCase()
            .match(/\b\w{3,}\b/g) || [];
        
        // Filter out common stop words
        const stopWords = new Set([
            'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
            'this', 'that', 'these', 'those', 'is', 'are', 'was', 'were', 'be', 'been',
            'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
            'may', 'might', 'must', 'can', 'shall', 'not', 'no', 'yes', 'all', 'any',
            'each', 'every', 'some', 'many', 'much', 'more', 'most', 'other', 'such',
            'what', 'which', 'who', 'when', 'where', 'why', 'how', 'there', 'here'
        ]);
        
        const filteredWords = words.filter(word => !stopWords.has(word));
        
        // Count frequency
        const wordCount = {};
        filteredWords.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });
        
        // Sort by frequency and get top 10
        const sortedWords = Object.entries(wordCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10);
        
        if (sortedWords.length === 0) {
            this.keywordsListEl.innerHTML = '<p class="empty-state">No keywords found</p>';
            return;
        }
        
        // Display keywords
        this.keywordsListEl.innerHTML = sortedWords.map(([word, count]) => 
            `<div class="keyword-item">
                <span class="keyword-word">${word}</span>
                <span class="keyword-count">${count}</span>
            </div>`
        ).join('');
        
        // Update keyword density in modal
        this.updateKeywordDensity(sortedWords, filteredWords.length);
    }
    
    updateKeywordDensity(keywords, totalWords) {
        const densityList = document.getElementById('keywordDensityList');
        
        if (keywords.length === 0) {
            densityList.innerHTML = '<p class="empty-state">No keywords to analyze</p>';
            return;
        }
        
        densityList.innerHTML = keywords.map(([word, count]) => {
            const percentage = ((count / totalWords) * 100).toFixed(1);
            return `<div class="density-item">
                <span class="density-word">${word}</span>
                <span class="density-percentage">${percentage}%</span>
            </div>`;
        }).join('');
    }
    
    updateModalDetails(text, words, sentences) {
        // Average word length
        const avgWordLength = words > 0 ? 
            (text.match(/\b\w+\b/g) || []).reduce((sum, word) => sum + word.length, 0) / words : 0;
        document.getElementById('avgWordLength').textContent = avgWordLength.toFixed(1);
        
        // Longest word
        const wordsArray = text.match(/\b\w+\b/g) || [];
        const longestWord = wordsArray.reduce((longest, word) => 
            word.length > longest.length ? word : longest, '');
        document.getElementById('longestWord').textContent = longestWord || '-';
        
        // Average sentence length
        const avgSentenceLength = sentences > 0 ? (words / sentences).toFixed(1) : 0;
        document.getElementById('avgSentenceLength').textContent = avgSentenceLength;
    }
    
    toggleMode() {
        this.isBasicMode = !this.isBasicMode;
        
        if (this.isBasicMode) {
            this.toolContent.classList.add('basic-mode');
            this.basicModeBtn.textContent = 'Go Advanced';
            this.basicModeBtn.className = 'btn btn-primary';
            this.optionsBtn.style.display = 'none';
            this.trackActivity('Switched to Basic mode');
        } else {
            this.toolContent.classList.remove('basic-mode');
            this.basicModeBtn.textContent = 'Go Basic';
            this.basicModeBtn.className = 'btn btn-secondary';
            this.optionsBtn.style.display = 'inline-flex';
            this.trackActivity('Switched to Advanced mode');
        }
    }
    
    openModal() {
        this.optionsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.trackActivity('Opened Options modal');
    }
    
    closeModal() {
        this.optionsModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    handleModalClick(e) {
        if (e.target === this.optionsModal) {
            this.closeModal();
        }
    }
    
    switchTab(e) {
        const targetTab = e.target.dataset.tab;
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update tab panels
        document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
        document.getElementById(targetTab).classList.add('active');
    }
    
    initializeActionButtons() {
        // Clear text
        document.getElementById('clearText').addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all text?')) {
                this.textInput.value = '';
                this.updateAllStats();
                this.trackActivity('Cleared all text');
            }
        });
        
        // Copy text
        document.getElementById('copyText').addEventListener('click', () => {
            this.textInput.select();
            document.execCommand('copy');
            this.trackActivity('Copied text to clipboard');
            this.showToast('Text copied to clipboard!');
        });
        
        // Export text
        document.getElementById('exportText').addEventListener('click', () => {
            const text = this.textInput.value;
            const blob = new Blob([text], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'wordcounter-export.txt';
            a.click();
            URL.revokeObjectURL(url);
            this.trackActivity('Exported text as TXT file');
        });
        
        // Print text
        document.getElementById('printText').addEventListener('click', () => {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head><title>WordCounter - Text Print</title></head>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
                        <h1>WordCounter Export</h1>
                        <p><strong>Words:</strong> ${this.wordCountEl.textContent}</p>
                        <p><strong>Characters:</strong> ${this.charCountEl.textContent}</p>
                        <hr>
                        <div style="white-space: pre-wrap;">${this.textInput.value}</div>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
            this.trackActivity('Printed text');
        });
    }
    
    initializeSettings() {
        // Auto-save setting
        const autoSaveCheckbox = document.getElementById('autoSave');
        autoSaveCheckbox.addEventListener('change', (e) => {
            if (!e.target.checked) {
                clearTimeout(this.autoSaveTimer);
                this.autoSaveStatus.textContent = 'Auto-save disabled';
            }
        });
        
        // Spell check setting
        const spellCheckCheckbox = document.getElementById('spellCheck');
        spellCheckCheckbox.addEventListener('change', (e) => {
            this.textInput.spellcheck = e.target.checked;
        });
        
        // Word wrap setting
        const wordWrapCheckbox = document.getElementById('wordWrap');
        wordWrapCheckbox.addEventListener('change', (e) => {
            this.textInput.style.whiteSpace = e.target.checked ? 'pre-wrap' : 'pre';
        });
    }
    
    scheduleAutoSave() {
        const autoSaveCheckbox = document.getElementById('autoSave');
        if (!autoSaveCheckbox.checked) return;
        
        clearTimeout(this.autoSaveTimer);
        this.autoSaveStatus.textContent = 'Saving...';
        
        this.autoSaveTimer = setTimeout(() => {
            this.saveContent();
            this.autoSaveStatus.textContent = 'Auto-saved';
        }, 1000);
    }
    
    saveContent() {
        try {
            localStorage.setItem('wordcounter-text', this.textInput.value);
            localStorage.setItem('wordcounter-timestamp', Date.now().toString());
        } catch (e) {
            console.error('Failed to save content:', e);
            this.autoSaveStatus.textContent = 'Save failed';
        }
    }
    
    loadSavedContent() {
        try {
            const savedText = localStorage.getItem('wordcounter-text');
            if (savedText) {
                this.textInput.value = savedText;
                const timestamp = localStorage.getItem('wordcounter-timestamp');
                if (timestamp) {
                    const date = new Date(parseInt(timestamp));
                    this.trackActivity(`Loaded saved content from ${date.toLocaleString()}`);
                }
                // Auto-resize after loading content
                setTimeout(() => {
                    if (this.autoResize) this.autoResize();
                }, 50);
            }
        } catch (e) {
            console.error('Failed to load saved content:', e);
        }
    }
    
    trackActivity(action) {
        const activity = {
            action,
            timestamp: new Date().toLocaleString(),
            time: Date.now()
        };
        
        this.activities.unshift(activity);
        this.activities = this.activities.slice(0, 20); // Keep only last 20 activities
        
        this.updateActivityList();
    }
    
    updateActivityList() {
        if (this.activities.length === 0) {
            this.activityList.innerHTML = '<p class="empty-state">No recent activity</p>';
            return;
        }
        
        this.activityList.innerHTML = this.activities.map(activity => 
            `<div class="activity-item">
                <div class="activity-time">${activity.timestamp}</div>
                <div class="activity-action">${activity.action}</div>
            </div>`
        ).join('');
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('wordcounter-theme', newTheme);
        
        this.trackActivity(`Switched to ${newTheme} theme`);
    }
    
    initializeTheme() {
        const savedTheme = localStorage.getItem('wordcounter-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', theme);
    }
    
    handleScroll() {
        // Update scroll progress
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        this.scrollProgress.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
        
        // Show/hide scroll to top button
        if (window.scrollY > 300) {
            this.scrollToTop.classList.add('visible');
        } else {
            this.scrollToTop.classList.remove('visible');
        }
    }
    
    scrollToTopAction() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        this.trackActivity('Scrolled to top');
    }
    
    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + S to save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            this.saveContent();
            this.showToast('Content saved!');
        }
        
        // Ctrl/Cmd + K to clear
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (confirm('Clear all text?')) {
                this.textInput.value = '';
                this.updateAllStats();
                this.trackActivity('Cleared text via keyboard shortcut');
            }
        }
        
        // Ctrl/Cmd + D to toggle dark mode
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            this.toggleTheme();
        }
        
        // Escape to close modal
        if (e.key === 'Escape' && this.optionsModal.classList.contains('active')) {
            this.closeModal();
        }
    }
    
    showToast(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-primary);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: var(--shadow-medium);
            z-index: 1001;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100px)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    initializeAutoResize() {
        // Store minimum height to match CSS min-height (380px)
        this.minHeight = 380;
        
        // Set initial properties for auto-expanding textarea with !important fallback
        this.textInput.style.cssText = `
            overflow: hidden !important;
            resize: none !important;
            box-sizing: border-box !important;
            height: ${this.minHeight}px !important;
            min-height: ${this.minHeight}px !important;
        `;
        
        // Add comprehensive event listeners for all interactions
        const events = ['input', 'focus', 'blur', 'click'];
        events.forEach(event => {
            this.textInput.addEventListener(event, () => {
                this.autoResize();
            });
        });
        
        // Handle paste events with delay to ensure content is processed
        this.textInput.addEventListener('paste', () => {
            setTimeout(() => this.autoResize(), 10);
        });
        
        // Handle key events that modify content
        this.textInput.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Enter') {
                setTimeout(() => this.autoResize(), 10);
            }
        });
        
        // Handle key up events for immediate feedback
        this.textInput.addEventListener('keyup', () => {
            this.autoResize();
        });
        
        // Initial resize
        this.autoResize();
        
        // Force height check after a short delay to ensure it's applied
        setTimeout(() => {
            this.autoResize();
        }, 100);
        
        // Add periodic height check every 500ms to ensure consistency
        setInterval(() => {
            const currentHeight = parseInt(this.textInput.style.height) || 0;
            if (currentHeight < this.minHeight) {
                this.autoResize();
            }
        }, 500);
        
        // Add MutationObserver to watch for external style changes
        if (window.MutationObserver) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        const currentHeight = parseInt(this.textInput.style.height) || 0;
                        if (currentHeight < this.minHeight) {
                            this.autoResize();
                        }
                    }
                });
            });
            
            observer.observe(this.textInput, {
                attributes: true,
                attributeFilter: ['style']
            });
        }
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    autoResize() {
        // Always enforce minimum height first
        const currentHeight = parseInt(this.textInput.style.height) || this.minHeight;
        
        // Get the text content
        const text = this.textInput.value;
        
        // If textarea is empty or whitespace only, enforce minimum height
        if (!text || !text.trim()) {
            this.textInput.style.setProperty('height', this.minHeight + 'px', 'important');
            this.textInput.style.setProperty('min-height', this.minHeight + 'px', 'important');
            return;
        }
        
        // For non-empty content, calculate required height
        // Temporarily reset to minimum to get accurate scrollHeight
        this.textInput.style.setProperty('height', this.minHeight + 'px', 'important');
        
        // Get the scroll height (natural content height)
        const scrollHeight = this.textInput.scrollHeight;
        
        // Calculate new height (never less than minimum)
        const newHeight = Math.max(this.minHeight, scrollHeight);
        
        // Apply the new height
        this.textInput.style.setProperty('height', newHeight + 'px', 'important');
        this.textInput.style.setProperty('min-height', this.minHeight + 'px', 'important');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WordCounter();
});

// Add smooth scrolling for navigation links
document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    // Update layout if needed
    const toolContent = document.querySelector('.tool-content');
    if (window.innerWidth <= 768 && toolContent) {
        toolContent.classList.add('mobile-layout');
    } else if (toolContent) {
        toolContent.classList.remove('mobile-layout');
    }
});

// Service worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker would be implemented here for offline functionality
        console.log('WordCounter app loaded successfully');
    });
}

// Analytics and performance monitoring (placeholder)
const Analytics = {
    trackEvent: (category, action, label) => {
        // Implementation would go here for real analytics
        console.log(`Analytics: ${category} - ${action} - ${label}`);
    },
    
    trackPageView: (page) => {
        // Implementation would go here
        console.log(`Page view: ${page}`);
    }
};

// Initialize analytics
Analytics.trackPageView('Word Counter');

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WordCounter;
}
