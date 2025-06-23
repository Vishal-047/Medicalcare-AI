"use client";
import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Clock, Users, Activity, Paperclip, Loader2, Settings } from "lucide-react";
import { useRouter } from "next/navigation"

const ChatBot = () => {
  const [step, setStep] = React.useState<'welcome'|'analyzing-records'|'upload'|'analyzing-upload'|'plan'|'daily-checkin'|'log-metric'|'wellness'|'mood'|'done'|'helper'>('welcome');
  const [messages, setMessages] = React.useState<any[]>([{
    from: 'bot',
    text: "Welcome! I am ASHA, your personal AI Health Companion. My goal is to help you follow a wellness plan tailored just for you. To create your personalized plan, I need to understand your health profile. How should I proceed?"
  }]);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [metric, setMetric] = React.useState<string>("");
  const [wellness, setWellness] = React.useState<string>("");
  const [mood, setMood] = React.useState<string>("");
  const [showHelper, setShowHelper] = React.useState(false);
  const [helperInput, setHelperInput] = React.useState("");
  const [helperChat, setHelperChat] = React.useState<any[]>([{
    from: 'bot',
    text: "Welcome to Helper Mode. You can ask me detailed questions on behalf of the patient."
  }]);
  const helperTimeout = React.useRef<any>(null);
  const helperPressStart = React.useRef<number | null>(null);

  // Helper Mode Q&A (hardcoded for demo)
  const getHelperResponse = (q: string) => {
    if (q.toLowerCase().includes("metformin")) {
      return "Long-term use of Metformin is generally considered safe, but it can lead to Vitamin B12 deficiency in some individuals. It's good to have B12 levels checked periodically. Please ensure this is discussed with the doctor during the next visit.";
    }
    if (q.toLowerCase().includes("foods")) {
      return "To help manage blood sugar, it is best to avoid sugary drinks (like soda and packaged juices), sweets (mithai), and foods made with white flour (maida) like white bread and biscuits.";
    }
    return "I'm here to help! Please ask any health-related question on behalf of the patient.";
  };

  const handleHelperSend = (e: React.FormEvent) => {
    e.preventDefault();
    setHelperChat((c: any[]) => [...c, { from: 'user', text: helperInput }]);
    setTimeout(() => {
      setHelperChat((c: any[]) => [...c, { from: 'bot', text: getHelperResponse(helperInput) }]);
    }, 900);
    setHelperInput("");
  };

  const handleChoice = (choice: string) => {
    if (choice === 'records') {
      setMessages(m => [...m, { from: 'user', text: 'Analyze My Saved Records' }]);
      setStep('analyzing-records');
      setTimeout(() => {
        setMessages(m => [...m, { from: 'bot', text: 'Excellent choice. I will access the documents stored securely in your Medical Records section to build your plan. Analyzing your saved medical history now. This may take a moment...' }]);
        setTimeout(() => setStep('plan'), 1800);
      }, 400);
    } else if (choice === 'upload') {
      setMessages(m => [...m, { from: 'user', text: 'Upload a New Report' }]);
      setStep('upload');
    } else if (choice === 'yes-ready') {
      setMessages(m => [...m, { from: 'user', text: "Yes, I'm Ready!" }]);
      setStep('daily-checkin');
      setTimeout(() => setStep('log-metric'), 600);
    } else if (choice === 'lets-do-it') {
      setMessages(m => [...m, { from: 'user', text: "Let's Do It" }]);
      setStep('log-metric');
    } else if (choice === 'wellness-yes' || choice === 'wellness-no') {
      setWellness(choice === 'wellness-yes' ? 'yes' : 'no');
      setMessages(m => [...m, { from: 'user', text: choice === 'wellness-yes' ? '✅ Yes, I Did!' : 'Not Yet' }]);
      setStep('mood');
    } else if (choice.startsWith('mood-')) {
      const moodVal = choice.replace('mood-', '');
      setMood(moodVal);
      setMessages(m => [...m, { from: 'user', text: moodVal === 'good' ? '🙂 Good' : moodVal === 'okay' ? '😐 Okay' : '🙁 Unwell' }]);
      setStep('done');
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setMessages(m => [...m, { from: 'bot', text: 'Thank you. I have received your report. Analyzing...' }]);
      setStep('analyzing-upload');
      setTimeout(() => setStep('plan'), 1800);
    }
  };

  const handleMetric = (e: React.FormEvent) => {
    e.preventDefault();
    setMessages(m => [...m, { from: 'user', text: metric }]);
    setStep('wellness');
  };

  // Plan messages
  const planMsgs = [
    { from: 'bot', text: 'Analysis complete! Based on your report, it looks like our primary focus should be on managing blood sugar levels and reducing stress. I have created your personalized Wellness Plan. Here it is:' },
    { from: 'bot', text: '1. Medication Schedule:\nTo manage blood sugar, you should take Metformin (500mg) once daily. For best results, the ideal time is right after your breakfast.' },
    { from: 'bot', text: '2. Wellness & Yoga Routine:\nTo help reduce stress, which can affect blood sugar, I recommend 10 minutes of Anulom Vilom (Alternate Nostril Breathing) each morning.' },
    { from: 'bot', text: '3. Key Metric to Monitor:\nWe will need to track your Blood Sugar level every evening to see how well our plan is working.' },
    { from: 'bot', text: 'This personalized plan is now active. I will help you follow it every day. Are you ready to begin?' }
  ];

  // Daily check-in messages
  const checkinMsgs = [
    { from: 'bot', text: 'Good evening! 👋 Ready for your daily check-in based on your Personalized Wellness Plan?' }
  ];

  // Long-press logic for Helper Mode
  const handleHelperPressStart = () => {
    helperPressStart.current = Date.now();
    helperTimeout.current = setTimeout(() => {
      setShowHelper(true);
      setStep('helper');
    }, 3000);
  };
  const handleHelperPressEnd = () => {
    clearTimeout(helperTimeout.current);
    helperPressStart.current = null;
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-2xl p-4 sm:p-8 h-96 flex flex-col justify-end max-w-lg mx-auto relative">
      {/* Helper Mode Gear Icon */}
      <button
        className="absolute top-3 right-3 p-2 rounded-full hover:bg-blue-200 transition-colors"
        onMouseDown={handleHelperPressStart}
        onMouseUp={handleHelperPressEnd}
        onMouseLeave={handleHelperPressEnd}
        onTouchStart={handleHelperPressStart}
        onTouchEnd={handleHelperPressEnd}
        aria-label="Open Helper Mode"
      >
        <Settings className="w-6 h-6 text-blue-600" />
      </button>
      {/* Main Chatbot UI */}
      {!showHelper ? (
        <>
          <div className="flex-1 overflow-y-auto pr-2">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 flex ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-[80%] text-sm ${msg.from === 'bot' ? 'bg-white text-gray-800' : 'bg-blue-600 text-white'}`}>{msg.text.split('\n').map((t: string, idx: number) => <div key={idx}>{t}</div>)}</div>
              </div>
            ))}
            {/* Plan presentation */}
            {step === 'plan' && planMsgs.map((msg, i) => (
              <div key={i} className="mb-2 flex justify-start">
                <div className="rounded-lg px-4 py-2 max-w-[80%] text-sm bg-white text-gray-800">{msg.text.split('\n').map((t, idx) => <div key={idx}>{t}</div>)}</div>
              </div>
            ))}
            {/* Daily check-in presentation */}
            {step === 'daily-checkin' && checkinMsgs.map((msg, i) => (
              <div key={i} className="mb-2 flex justify-start">
                <div className="rounded-lg px-4 py-2 max-w-[80%] text-sm bg-white text-gray-800">{msg.text}</div>
              </div>
            ))}
          </div>
          {/* Choices and Inputs */}
          <div className="mt-2">
            {step === 'welcome' && (
              <div className="flex gap-2">
                <Button onClick={() => handleChoice('records')} variant="default">Analyze My Saved Records</Button>
                <Button onClick={() => handleChoice('upload')} variant="outline">Upload a New Report</Button>
              </div>
            )}
            {step === 'upload' && (
              <div className="flex flex-col items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Paperclip className="w-5 h-5 text-blue-600" />
                  <span className="underline">Upload Medical Report</span>
                  <input type="file" className="hidden" onChange={handleFile} />
                </label>
                {fileName && <span className="text-xs text-slate-600">{fileName}</span>}
              </div>
            )}
            {(step === 'analyzing-records' || step === 'analyzing-upload') && (
              <div className="flex items-center gap-2 text-blue-600 font-medium mt-2"><Loader2 className="animate-spin" /> ASHA is analyzing your report...</div>
            )}
            {step === 'plan' && (
              <Button className="mt-2" onClick={() => handleChoice('yes-ready')}>Yes, I'm Ready!</Button>
            )}
            {step === 'daily-checkin' && (
              <Button className="mt-2" onClick={() => handleChoice('lets-do-it')}>Let's Do It</Button>
            )}
            {step === 'log-metric' && (
              <form onSubmit={handleMetric} className="flex gap-2 items-center">
                <span className="text-sm">Enter your Blood Sugar for today:</span>
                <input type="number" className="border rounded px-2 py-1 w-20" value={metric} onChange={e => setMetric(e.target.value)} required />
                <Button type="submit">Log</Button>
              </form>
            )}
            {step === 'wellness' && (
              <div className="flex gap-2 mt-2">
                <Button onClick={() => handleChoice('wellness-yes')} variant="default">✅ Yes, I Did!</Button>
                <Button onClick={() => handleChoice('wellness-no')} variant="outline">Not Yet</Button>
              </div>
            )}
            {step === 'mood' && (
              <div className="flex gap-2 mt-2">
                <Button onClick={() => handleChoice('mood-good')} variant="default">🙂 Good</Button>
                <Button onClick={() => handleChoice('mood-okay')} variant="outline">😐 Okay</Button>
                <Button onClick={() => handleChoice('mood-unwell')} variant="destructive">🙁 Unwell</Button>
              </div>
            )}
            {step === 'done' && (
              <div className="text-green-700 font-medium mt-2">You've completed your check-in for today. Following the plan consistently is the key to success. Talk to you tomorrow!</div>
            )}
          </div>
        </>
      ) : (
        // Helper Mode
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto pr-2 mb-2">
            {helperChat.map((msg, i) => (
              <div key={i} className={`mb-2 flex ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-[80%] text-sm ${msg.from === 'bot' ? 'bg-white text-gray-800' : 'bg-blue-600 text-white'}`}>{msg.text}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleHelperSend} className="flex gap-2 items-center mt-2">
            <input
              type="text"
              className="border rounded px-2 py-1 flex-1"
              placeholder="Type your question..."
              value={helperInput}
              onChange={e => setHelperInput(e.target.value)}
              required
              autoFocus
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      )}
    </div>
  );
};

const Hero = () => {
  const navigate = useRouter();
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              AI-Powered
              <span className="text-blue-600 block">Medical Care</span>
              at Your Fingertips
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Get instant medical insights with speech recognition, find nearby
              healthcare providers, and manage your medical records with our
              advanced AI-powered platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                onClick={() => navigate.push("/speech-analysis")}
              >
                Start Voice Analysis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate.push("/find-care")}
                className="cursor-pointer"
              >
                Find Care Nearby
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium text-muted-foreground">
                  DISHA Compliant
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium text-muted-foreground">
                  24/7 Available
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-purple-600" />
                <span className="text-sm font-medium text-muted-foreground">
                  Expert Network
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <ChatBot />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
