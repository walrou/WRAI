// تكامل DeepSeek AI
const DEEPSEEK_API_KEY = "YOUR_DEEPSEEK_API_KEY"; // استبدل بمفتاح API الخاص بك

async function getDeepSeekResponse(userMessage, conversationHistory) {
    // إذا كان السؤال عن المطور
    if (userMessage.includes("من صنعك") || userMessage.includes("من طورك")) {
        return "تم تطويري بواسطة وليد رويبح من مواليد 2005 في منطقة آمبد";
    }
    
    // إذا كان السؤال عن وليد رويبح
    if (userMessage.includes("وليد") || userMessage.includes("رويبح")) {
        return "وليد رويبح هو مطور برمجيات من منطقة آمبد جنوب ولاية المسيلة";
    }
    
    try {
        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    ...conversationHistory.map(msg => ({
                        role: msg.role,
                        content: msg.content
                    })),
                    {
                        role: "user",
                        content: userMessage
                    }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
        
    } catch (error) {
        console.error("Error calling DeepSeek API:", error);
        return "منيش قادر نرد عليك دابا، جرب مرة أخرى بعد شوية 😑";
    }
}