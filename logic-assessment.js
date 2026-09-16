// Task 1.1 — Character Frequency Counter
function countCharacterFrequency(text) {
    const result = {};

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (/[a-zA-Z]/.test(char)) {
            const lowerChar = char.toLowerCase();
            result[lowerChar] = (result[lowerChar] || 0) + 1;
        }
    }

    return result;
}

// Task 1.2 — Data Aggregation
function processUserData(users) {
    const result = {};

    if (!Array.isArray(users)) {
        return result;
    }

    const adults = users.filter((user) => typeof user.age === "number" && user.age >= 18);

    adults.forEach((user) => {
        const gender = user.gender || "unknown";

        if (!result[gender]) {
            result[gender] = { count: 0, averageAge: 0, users: [] };
        }

        result[gender].count += 1;
        result[gender].users.push(user);
    });

    Object.keys(result).forEach((gender) => {
        const group = result[gender];
        const totalAge = group.users.reduce((sum, user) => sum + user.age, 0);
        group.averageAge = Math.round((totalAge / group.count) * 10) / 10;
    });

    return result;
}

/* global module */
module.exports = { countCharacterFrequency, processUserData };
