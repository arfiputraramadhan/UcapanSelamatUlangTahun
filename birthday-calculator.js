// Birthday calculation utilities

// Calculate age and days until next birthday
function calculateBirthdayInfo(day, month, year) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    
    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Adjust age if birthday hasn't occurred this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    // Calculate next birthday
    const nextBirthday = new Date(today.getFullYear(), month - 1, day);
    
    // If birthday already passed this year, set to next year
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    // Calculate days until next birthday
    const timeDiff = nextBirthday.getTime() - today.getTime();
    const daysUntilNextBirthday = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    // Format birth date string
    const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const birthDateString = `${day} ${monthNames[month - 1]} ${year}`;
    
    // Calculate zodiac sign
    const zodiacSign = calculateZodiac(day, month);
    
    // Calculate birth day of the week
    const dayOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const birthDayOfWeek = dayOfWeek[birthDate.getDay()];
    
    return {
        age,
        daysUntilNextBirthday,
        birthDateString,
        zodiacSign,
        birthDayOfWeek,
        nextBirthday: nextBirthday.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    };
}

// Calculate zodiac sign based on birth date
function calculateZodiac(day, month) {
    const zodiacDates = [
        { sign: "Capricorn", start: [1, 1], end: [1, 19] },
        { sign: "Aquarius", start: [1, 20], end: [2, 18] },
        { sign: "Pisces", start: [2, 19], end: [3, 20] },
        { sign: "Aries", start: [3, 21], end: [4, 19] },
        { sign: "Taurus", start: [4, 20], end: [5, 20] },
        { sign: "Gemini", start: [5, 21], end: [6, 20] },
        { sign: "Cancer", start: [6, 21], end: [7, 22] },
        { sign: "Leo", start: [7, 23], end: [8, 22] },
        { sign: "Virgo", start: [8, 23], end: [9, 22] },
        { sign: "Libra", start: [9, 23], end: [10, 22] },
        { sign: "Scorpio", start: [10, 23], end: [11, 21] },
        { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
        { sign: "Capricorn", start: [12, 22], end: [12, 31] }
    ];
    
    for (const zodiac of zodiacDates) {
        const [startMonth, startDay] = zodiac.start;
        const [endMonth, endDay] = zodiac.end;
        
        if (
            (month === startMonth && day >= startDay) ||
            (month === endMonth && day <= endDay)
        ) {
            return zodiac.sign;
        }
    }
    
    return "Unknown";
}

// Calculate Chinese zodiac based on birth year
function calculateChineseZodiac(year) {
    const zodiacAnimals = [
        "Tikus", "Kerbau", "Harimau", "Kelinci", "Naga", "Ular",
        "Kuda", "Kambing", "Monyet", "Ayam", "Anjing", "Babi"
    ];
    
    // Chinese zodiac starts from 1900 (Year of the Rat)
    const startYear = 1900;
    const index = (year - startYear) % 12;
    
    // Handle negative index (for years before 1900)
    return index >= 0 ? zodiacAnimals[index] : zodiacAnimals[12 + index];
}

// Get fun fact based on birth year
function getBirthYearFact(year) {
    const facts = {
        1990: "Tahun ini, Tim Berners-Lee menciptakan World Wide Web.",
        1995: "Tahun ini, JavaScript pertama kali diperkenalkan.",
        2000: "Millenium baru dimulai! Tahun kabisat dengan 2 nol di akhir.",
        2005: "YouTube diluncurkan pada tahun ini.",
        2010: "Instagram diluncurkan pada tahun ini.",
        2015: "Windows 10 diluncurkan oleh Microsoft.",
        2020: "Tahun yang penuh tantangan dengan pandemi global.",
        2022: "ChatGPT diperkenalkan ke publik oleh OpenAI."
    };
    
    // Find the closest year fact
    const years = Object.keys(facts).map(Number);
    let closestYear = years[0];
    let minDiff = Math.abs(year - closestYear);
    
    for (const y of years) {
        const diff = Math.abs(year - y);
        if (diff < minDiff) {
            minDiff = diff;
            closestYear = y;
        }
    }
    
    return facts[closestYear] || `Tahun ${year} adalah tahun yang spesial!`;
}

// Get motivational quote based on age
function getMotivationalQuote(age) {
    const quotes = [
        "Hidup bukan tentang menemukan dirimu sendiri, hidup adalah tentang menciptakan dirimu sendiri.",
        "Masa depan tergantung pada apa yang kamu lakukan hari ini.",
        "Jangan pernah menyerah pada mimpi hanya karena butuh waktu lama untuk mencapainya.",
        "Usia hanyalah angka, yang penting adalah semangat dan jiwa muda yang tetap membara.",
        "Kesempatan tidak datang begitu saja, kamu yang harus menciptakannya.",
        "Hidup adalah petualangan yang berani atau tidak sama sekali.",
        "Kebahagiaan bukanlah sesuatu yang ditunda; kebahagiaan adalah sesuatu yang dirancang untuk masa kini.",
        "Jadilah versi terbaik dari dirimu sendiri, bukan versi terbaik dari orang lain.",
        "Masa lalu tidak dapat diubah, masa depan masih dalam kekuasaanmu.",
        "Hal-hal hebat tidak pernah datang dari zona nyaman."
    ];
    
    // Use age to select quote (modulo to ensure valid index)
    const index = age % quotes.length;
    return quotes[index];
}
