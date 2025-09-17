import React, { useState, useEffect } from 'react';
import './TranslatorScreen.css';

const TranslatorScreen = ({ backendConnected }) => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState(null);
  const [translationHistory, setTranslationHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // Common languages for emergency situations
  const languages = [
    { code: 'auto', name: 'Auto Detect', flag: '🌐' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
    { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
    { code: 'ta', name: 'Tamil', flag: '🇱🇰' },
    { code: 'te', name: 'Telugu', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', flag: '🇮🇳' },
  ];

  // Emergency phrases for quick translation
  const emergencyPhrases = [
    "Help me please",
    "Call the police",
    "I need a doctor",
    "Where is the hospital?",
    "I am lost",
    "Emergency contact",
    "I don't speak your language",
    "Can you help me?",
    "Where is the nearest pharmacy?",
    "I need help urgently"
  ];

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = sourceLanguage === 'auto' ? 'en-US' : `${sourceLanguage}-${sourceLanguage.toUpperCase()}`;
      
      speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSourceText(transcript);
        setIsListening(false);
      };
      
      speechRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setError('Speech recognition failed. Please try again.');
      };
      
      speechRecognition.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(speechRecognition);
    }
  }, [sourceLanguage]);

  // Translation function integrated with your Google Translate backend
  const translateText = async (text, from, to) => {
    setIsTranslating(true);
    setError(null);
    
    try {
      if (backendConnected) {
        // Use your Google Translate backend API
        const response = await fetch('http://localhost:8080/api/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            lang: to // Your backend expects 'lang' parameter
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.ok) {
            return data.translated;
          } else {
            throw new Error(data.error || 'Translation failed');
          }
        } else {
          throw new Error(`HTTP ${response.status}: Translation service error`);
        }
      }
      
      // Fallback to offline translations for emergency phrases when backend is not available
      const offlineResult = await getOfflineTranslation(text, to);
      if (offlineResult.confidence > 0.8) {
        return offlineResult.translatedText;
      }
      
      // Generic fallback for unknown phrases
      throw new Error('Translation service unavailable and no offline translation found');
      
    } catch (error) {
      console.error('Translation error:', error);
      
      // Try offline translation as last resort
      const offlineResult = await getOfflineTranslation(text, to);
      if (offlineResult.confidence > 0.5) {
        return offlineResult.translatedText;
      }
      
      throw new Error('Translation service unavailable');
    }
  };

  // Offline translation helper
  const getOfflineTranslation = async (text, targetLanguage) => {
    const offlineTranslations = {
      'Help me please': {
        es: 'Ayúdame por favor',
        fr: 'Aidez-moi s\'il vous plaît',
        de: 'Hilf mir bitte',
        hi: 'कृपया मेरी सहायता करें',
        ar: 'ساعدني من فضلك',
        zh: '请帮助我',
        ja: '助けてください',
        ko: '도와주세요',
        pt: 'Me ajude por favor',
        ru: 'Помогите мне, пожалуйста'
      },
      'Call the police': {
        es: 'Llama a la policía',
        fr: 'Appelez la police',
        de: 'Ruf die Polizei',
        hi: 'पुलिस को बुलाओ',
        ar: 'اتصل بالشرطة',
        zh: '报警',
        ja: '警察を呼んで',
        ko: '경찰을 불러주세요',
        pt: 'Chame a polícia',
        ru: 'Вызовите полицию'
      },
      'I need a doctor': {
        es: 'Necesito un médico',
        fr: 'J\'ai besoin d\'un médecin',
        de: 'Ich brauche einen Arzt',
        hi: 'मुझे डॉक्टर की जरूरत है',
        ar: 'أحتاج إلى طبيب',
        zh: '我需要医生',
        ja: '医者が必要です',
        ko: '의사가 필요해요',
        pt: 'Eu preciso de um médico',
        ru: 'Мне нужен врач'
      },
      'Where is the hospital?': {
        es: '¿Dónde está el hospital?',
        fr: 'Où est l\'hôpital?',
        de: 'Wo ist das Krankenhaus?',
        hi: 'अस्पताल कहाँ है?',
        ar: 'أين المستشفى؟',
        zh: '医院在哪里？',
        ja: '病院はどこですか？',
        ko: '병원이 어디에 있나요？',
        pt: 'Onde fica o hospital?',
        ru: 'Где больница?'
      },
      'I am lost': {
        es: 'Estoy perdido',
        fr: 'Je suis perdu',
        de: 'Ich bin verloren',
        hi: 'मैं खो गया हूँ',
        ar: 'أنا تائه',
        zh: '我迷路了',
        ja: '道に迷いました',
        ko: '길을 잃었어요',
        pt: 'Estou perdido',
        ru: 'Я потерялся'
      },
      'Emergency contact': {
        es: 'Contacto de emergencia',
        fr: 'Contact d\'urgence',
        de: 'Notfallkontakt',
        hi: 'आपातकालीन संपर्क',
        ar: 'جهة اتصال الطوارئ',
        zh: '紧急联系人',
        ja: '緊急連絡先',
        ko: '비상연락처',
        pt: 'Contato de emergência',
        ru: 'Экстренный контакт'
      },
      'I don\'t speak your language': {
        es: 'No hablo tu idioma',
        fr: 'Je ne parle pas votre langue',
        de: 'Ich spreche deine Sprache nicht',
        hi: 'मैं आपकी भाषा नहीं बोलता',
        ar: 'أنا لا أتكلم لغتك',
        zh: '我不会说你的语言',
        ja: 'あなたの言語を話せません',
        ko: '당신의 언어를 할 수 없어요',
        pt: 'Eu não falo sua língua',
        ru: 'Я не говорю на вашем языке'
      },
      'Can you help me?': {
        es: '¿Puedes ayudarme?',
        fr: 'Pouvez-vous m\'aider?',
        de: 'Können Sie mir helfen?',
        hi: 'क्या आप मेरी मदद कर सकते हैं?',
        ar: 'هل يمكنك مساعدتي؟',
        zh: '你能帮助我吗？',
        ja: '手伝ってもらえますか？',
        ko: '도와주실 수 있나요？',
        pt: 'Você pode me ajudar?',
        ru: 'Можете ли вы мне помочь?'
      },
      'Where is the nearest pharmacy?': {
        es: '¿Dónde está la farmacia más cercana?',
        fr: 'Où est la pharmacie la plus proche?',
        de: 'Wo ist die nächste Apotheke?',
        hi: 'सबसे नजदीकी फार्मेसी कहाँ है?',
        ar: 'أين أقرب صيدلية؟',
        zh: '最近的药店在哪里？',
        ja: '一番近い薬局はどこですか？',
        ko: '가장 가까운 약국이 어디에 있나요？',
        pt: 'Onde fica a farmácia mais próxima?',
        ru: 'Где ближайшая аптека?'
      },
      'I need help urgently': {
        es: 'Necesito ayuda urgentemente',
        fr: 'J\'ai besoin d\'aide de toute urgence',
        de: 'Ich brauche dringend Hilfe',
        hi: 'मुझे तुरंत मदद चाहिए',
        ar: 'أحتاج مساعدة عاجلة',
        zh: '我急需帮助',
        ja: '緊急に助けが必要です',
        ko: '긴급히 도움이 필요해요',
        pt: 'Preciso de ajuda urgentemente',
        ru: 'Мне срочно нужна помощь'
      }
    };

    if (offlineTranslations[text] && offlineTranslations[text][targetLanguage]) {
      return {
        translatedText: offlineTranslations[text][targetLanguage],
        confidence: 0.9
      };
    }

    return {
      translatedText: `[${targetLanguage.toUpperCase()}] ${text}`,
      confidence: 0.3
    };
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setError('Please enter text to translate');
      return;
    }
    
    try {
      const result = await translateText(sourceText, sourceLanguage, targetLanguage);
      setTranslatedText(result);
      
      // Add to history
      const historyItem = {
        id: Date.now(),
        source: sourceText,
        target: result,
        fromLang: languages.find(l => l.code === sourceLanguage)?.name || sourceLanguage,
        toLang: languages.find(l => l.code === targetLanguage)?.name || targetLanguage,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setTranslationHistory(prev => [historyItem, ...prev.slice(0, 9)]); // Keep last 10
    } catch (error) {
      setError(error.message);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleQuickTranslate = (phrase) => {
    setSourceText(phrase);
  };

  const startListening = () => {
    if (recognition && !isListening) {
      setIsListening(true);
      setError(null);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const swapLanguages = () => {
    if (sourceLanguage === 'auto') return;
    
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText('');
  };

  const clearAll = () => {
    setSourceText('');
    setTranslatedText('');
    setError(null);
  };

  const speakText = (text, lang) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'auto' ? 'en-US' : `${lang}-${lang.toUpperCase()}`;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="translator-screen">
      <div className="translator-header">
        <h2>🌐 Emergency Translator</h2>
        <p className="translator-subtitle">Communicate in any language during emergencies</p>
        
        {!backendConnected && (
          <div className="offline-indicator">
            ⚠️ Offline Mode - Limited functionality
          </div>
        )}
      </div>

      {/* Language Selection */}
      <div className="language-selector">
        <div className="language-input">
          <label>From</label>
          <select 
            value={sourceLanguage} 
            onChange={(e) => setSourceLanguage(e.target.value)}
            className="language-dropdown"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        <button 
          className="swap-button" 
          onClick={swapLanguages}
          disabled={sourceLanguage === 'auto'}
          title="Swap languages"
        >
          ⇄
        </button>

        <div className="language-input">
          <label>To</label>
          <select 
            value={targetLanguage} 
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="language-dropdown"
          >
            {languages.filter(lang => lang.code !== 'auto').map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Translation Interface */}
      <div className="translation-interface">
        <div className="text-input-section">
          <div className="input-header">
            <span>Enter text</span>
            <div className="input-controls">
              {recognition && (
                <button
                  className={`voice-button ${isListening ? 'listening' : ''}`}
                  onClick={isListening ? stopListening : startListening}
                  title={isListening ? 'Stop listening' : 'Start voice input'}
                >
                  {isListening ? '🛑' : '🎤'}
                </button>
              )}
              <button
                className="clear-button"
                onClick={clearAll}
                title="Clear all"
              >
                🗑️
              </button>
            </div>
          </div>
          
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder={isListening ? "Listening..." : "Enter text to translate or use voice input..."}
            className="source-textarea"
            rows="4"
            disabled={isListening}
          />
          
          {sourceText && (
            <button
              className="speak-button"
              onClick={() => speakText(sourceText, sourceLanguage)}
              title="Listen to source text"
            >
              🔊
            </button>
          )}
        </div>

        <button
          className="translate-button"
          onClick={handleTranslate}
          disabled={isTranslating || !sourceText.trim()}
        >
          {isTranslating ? (
            <span className="loading">Translating... ⏳</span>
          ) : (
            'Translate'
          )}
        </button>

        <div className="text-output-section">
          <div className="output-header">
            <span>Translation</span>
            {translatedText && (
              <button
                className="speak-button"
                onClick={() => speakText(translatedText, targetLanguage)}
                title="Listen to translation"
              >
                🔊
              </button>
            )}
          </div>
          
          <div className="translated-text">
            {translatedText || 'Translation will appear here...'}
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {/* Emergency Phrases */}
      <div className="emergency-phrases">
        <h3>🚨 Quick Emergency Phrases</h3>
        <div className="phrase-grid">
          {emergencyPhrases.map((phrase, index) => (
            <button
              key={index}
              className="phrase-button"
              onClick={() => handleQuickTranslate(phrase)}
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>

      {/* Translation History */}
      {translationHistory.length > 0 && (
        <div className="translation-history">
          <h3>📝 Recent Translations</h3>
          <div className="history-list">
            {translationHistory.map((item) => (
              <div key={item.id} className="history-item">
                <div className="history-header">
                  <span className="language-pair">
                    {item.fromLang} → {item.toLang}
                  </span>
                  <span className="timestamp">{item.timestamp}</span>
                </div>
                <div className="history-content">
                  <div className="source-text">{item.source}</div>
                  <div className="target-text">{item.target}</div>
                </div>
                <div className="history-actions">
                  <button onClick={() => speakText(item.source, sourceLanguage)}>🔊</button>
                  <button onClick={() => speakText(item.target, targetLanguage)}>🔊</button>
                  <button onClick={() => setSourceText(item.source)}>📝</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslatorScreen;
