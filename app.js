const mockUsers = [
    {
        id: 1,
        name: "小雨",
        gender: "female",
        age: 26,
        intro: "热爱生活，喜欢阅读、旅行和美食。性格温柔开朗，希望找到一位真诚、有责任感的伴侣。",
        preference: "希望对方性格阳光，有稳定工作，喜欢运动和旅行。"
    },
    {
        id: 2,
        name: "阿杰",
        gender: "male",
        age: 28,
        intro: "程序员一枚，喜欢科技、电影和健身。性格内敛但真诚，希望遇到一位善解人意的女生。",
        preference: "希望对方温柔体贴，有共同话题，热爱生活。"
    },
    {
        id: 3,
        name: "小雅",
        gender: "female",
        age: 25,
        intro: "设计从业者，喜欢艺术、音乐和摄影。追求有品质的生活，相信缘分。",
        preference: "希望对方有艺术感，成熟稳重，有上进心。"
    }
];

function generateMatchReason(user, candidate) {
    const reasons = [
        `你们都热爱生活，有着相似的生活态度，这会让你们的相处充满乐趣。`,
        `从你们的介绍来看，性格互补，一个开朗一个稳重，是很好的组合。`,
        `你们都提到了喜欢旅行，共同的爱好会成为你们感情的催化剂。`,
        `从择偶偏好来看，你们对彼此的期待很匹配，这是一个很好的开始。`
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
}

function generateScore() {
    return Math.floor(Math.random() * 40) + 60;
}

function showStep(stepNumber) {
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(`step${stepNumber}`).classList.add('active');
}

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userData = {
        name: document.getElementById('name').value,
        gender: document.getElementById('gender').value,
        age: parseInt(document.getElementById('age').value),
        intro: document.getElementById('intro').value,
        preference: document.getElementById('preference').value
    };
    
    const targetGender = userData.gender === 'male' ? 'female' : 'male';
    const candidates = mockUsers.filter(u => u.gender === targetGender);
    
    const resultsHtml = candidates.map(candidate => {
        const score = generateScore();
        const reason = generateMatchReason(userData, candidate);
        return `
            <div class="match-card">
                <div class="match-header">
                    <div class="match-name">${candidate.name} (${candidate.age}岁)</div>
                    <div class="match-score">${score}% 匹配度</div>
                </div>
                <div class="match-reason">${reason}</div>
                <p><strong>自我介绍：</strong>${candidate.intro}</p>
                <div class="match-actions">
                    <button class="btn-confirm" onclick="confirmMatch('${candidate.name}')">确认配对</button>
                    <button class="btn-pass" onclick="passMatch()">跳过</button>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('matchResults').innerHTML = resultsHtml;
    showStep(2);
});

document.getElementById('backToRegister').addEventListener('click', function() {
    showStep(1);
});

function confirmMatch(name) {
    document.getElementById('confirmContent').innerHTML = `
        <div class="success-icon">🎉</div>
        <h3>恭喜！你和 ${name} 已确认配对！</h3>
        <p>双方都确认后，就可以交换联系方式啦！</p>
        <div class="contact-info">
            <p><strong>模拟联系方式：</strong></p>
            <p>📱 微信号：lovematch_${Date.now()}</p>
            <p>📧 邮箱：match_${Date.now()}@example.com</p>
        </div>
    `;
    showStep(3);
}

function passMatch() {
    alert('已跳过，继续查看其他匹配对象吧！');
}

document.getElementById('startOver').addEventListener('click', function() {
    document.getElementById('registerForm').reset();
    showStep(1);
});