const Router = require("express");
const router = new Router();
const axios = require("axios");

const { v4: uuidv4 } = require('uuid');

function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function extractJson(responseText) {
    try {
        // Удаляем все, что находится до первой '{' или '['
        const thinkEndIndex = responseText.indexOf("</think>");
        const startIndex = thinkEndIndex === -1 ? 0 : thinkEndIndex + "</think>".length;

        const jsonStartIndex = responseText.indexOf('[', startIndex);
        const jsonStartIndexObject = responseText.indexOf('{', startIndex);
        const finalJsonStartIndex = Math.min(
            jsonStartIndex === -1 ? Infinity : jsonStartIndex,
            jsonStartIndexObject === -1 ? Infinity : jsonStartIndexObject
        );

        if (finalJsonStartIndex === Infinity) {
            console.error("Не удалось найти начало JSON (открывающую квадратную или фигурную скобку) после </think>.");
            return null;
        }
        const jsonString = responseText.substring(finalJsonStartIndex);
        const json = JSON.parse(jsonString);
        return json;
    } catch (error) {
        console.error("Ошибка парсинга JSON:", error);
        return null;
    }
}

function generateValidUUID() {
    return uuidv4();
}

function fixItem(item, idField, nameField) {
    if (!item) return null; // Добавлена проверка на null

    const newItem = { [idField]: generateValidUUID() }; // Генерируем ID

    // Копируем название, исправляя опечатки (если нужно)
    let itemName = item[nameField];

    console.log(item, idField, nameField)

    if (item.topic7) { // Пример исправления опечатки (как в вашем коде)
        itemName = item.topic7
    }

    if (!itemName) {
        console.warn(`Не найдено поле с названием темы/лекции (${nameField}) в элементе:`, item);
        return null;
    }

    newItem[nameField] = itemName;


    return newItem;
}

async function generateTopics(prompt) {
    try {
        const response = await axios.post('http://localhost:11434/api/generate', {
            prompt: prompt,
            model: 'qwen3:4b',
            stream: false,
        });

        const responseText = response.data.response;
        console.log("Response Text:", responseText); // Вывод всего ответа для отладки
        const data = extractJson(responseText);

        if (!data) {
            console.error('Не удалось извлечь JSON из ответа.');
            return null;
        }
        if (Array.isArray(data)) {
            return data.map(item => fixItem(item, "topicId", "topicName")).filter(item => item !== null);
        } else if (isObject(data)) {
            // Формат: объект с массивами
            const result = {};
            for (const key in data) {
                if (Array.isArray(data[key])) {
                    let idPrefix = key.slice(0, -1); // Убираем последний символ (предполагаем, что это "s")
                    let idField;
                    let nameField;

                    if (key === 'practicalClasses') {
                        idField = 'practicalClassId';
                        nameField = 'practicalClassName';
                    } else if (key === 'laboratoryClasses') {
                        idField = 'laboratoryClassId';
                        nameField = 'laboratoryClassName';
                    } else if (key === 'lections') {
                        idField = 'lectionId';
                        nameField = 'lectionName';
                    } else if (key === 'examQuestions') {
                        idField = 'examQuestionId';
                        nameField = 'examQuestionText'
                    }
                    else {
                        console.warn('Неожиданный ключ:', key);
                        continue; // Пропускаем неизвестные ключи
                    }


                    result[key] = data[key].map(item => fixItem(item, idField, nameField)).filter(item => item !== null);
                } else {
                    console.warn("Неожиданный формат данных: ключ", key, "не является массивом.");
                }
            }
            return result;
        } else {
            console.error("Неподдерживаемый формат JSON: не массив и не объект.");
            return null;
        }
    } catch (error) {
        console.error('Ошибка при запросе к Ollama API:', error);
        return null;
    }
}

router.post('/ollama', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const response = await generateTopics(prompt)

        res.json(response);

    } catch (error) {
        console.error('Ollama API error:', error.message); // Log the error message
        console.error('Ollama API error response:', error.response?.data); // Log the response data, if available

        // Send a more informative error message to the client
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            res.status(error.response.status).json({
                error: `Ollama API error: ${error.response.status} - ${error.response.data.error || error.response.data}`
            });
        } else if (error.request) {
            // The request was made but no response was received
            res.status(500).json({ error: 'Ollama API error: No response received' });
        } else {
            // Something happened in setting up the request that triggered an Error
            res.status(500).json({ error: `Ollama API error: ${error.message}` });
        }
    }
});

module.exports = router;