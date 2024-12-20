const express = require('express');
const axios = require('axios');
const app = express();

app.get('/proxy', async (req, res) => {
    const fileUrl = req.query.url; // URL до файлу
    if (!fileUrl) {
        return res.status(400).send({ error: 'URL не вказано' });
    }

    try {
        // Виконання GET-запиту для отримання заголовків
        const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
        const mimeType = response.headers['content-type'];
        
        // Повернення MIME-типу або вмісту файлу
        res.setHeader('Content-Type', 'application/json');
        res.send({ mimeType: mimeType });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: 'Не вдалося отримати MIME-тип' });
    }
});

// Запуск сервера на порті 3000
const PORT = 3000;
app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));



// const express = require('express');
// const axios = require('axios');
// const app = express();

// // Проксі-ендпоінт для отримання MIME-типу файлу
// app.get('/proxy', async (req, res) => {
//     const fileUrl = req.query.url; // URL до файлу
//     if (!fileUrl) {
//         return res.status(400).send({ error: 'URL не вказано' });
//     }

//     try {
//         // Виконання HEAD-запиту для отримання заголовків
//         const response = await axios.head(fileUrl);
//         const mimeType = response.headers['content-type'];
//         res.setHeader('Content-Type', 'application/json');
//         res.send({ mimeType });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send({ error: 'Не вдалося отримати MIME-тип' });
//     }
// });

// // Запуск сервера на порті 3000
// const PORT = 3000;
// app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));