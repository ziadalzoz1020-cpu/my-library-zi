const express = require('express');

const { GoogleGenerativeAI } = require("@google/generative-ai");

const cors = require('cors'); // مهم للسماح للموقع بالاتصال بالخادم

const app = express();

app.use(cors());

app.use(express.json());

// استبدل هذا بمفتاحك الذي حصلت عليه من Google AI Studio

const genAI = new GoogleGenerativeAI("ضغ_مفتاحك_هنا");

app.post('/api/chat', async (req, res) => {

    try {

        const { message } = req.body;

        const model = genAI.getGenerativeModel({ 

            model: "gemini-1.5-flash",

            systemInstruction: "أنت مساعد مكتبة زياد، رد بروقان وعاميّة مصرية." 

        });

        const result = await model.generateContent(message);

        const response = await result.response;

        res.json({ reply: response.text() });

    } catch (error) {

        res.status(500).json({ error: "حصلت مشكلة في السيرفر يا نجم" });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`الخادم شغال على بورت ${PORT}`));