const canvas = document.getElementById("gasCanvas");
const ctx = canvas.getContext("2d");

const NUM_PARTICLES = 100;        // 分子数量
const PARTICLE_RADIUS = 5;        // 分子半径
const MAX_SPEED = 2;              // 初始最大速度
const particles = [];             // 用于存储分子

// 定义分子类
class Particle {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }

    // 更新分子位置
    update() {
        this.x += this.vx;
        this.y += this.vy;

        // 碰撞检测 - 壁碰撞
        if (this.x - PARTICLE_RADIUS < 0 || this.x + PARTICLE_RADIUS > canvas.width) {
            this.vx *= -1; // 反弹
        }
        if (this.y - PARTICLE_RADIUS < 0 || this.y + PARTICLE_RADIUS > canvas.height) {
            this.vy *= -1; // 反弹
        }
    }

    // 绘制分子
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, PARTICLE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }
}

// 初始化分子
function initParticles() {
    for (let i = 0; i < NUM_PARTICLES; i++) {
        const x = Math.random() * (canvas.width - 2 * PARTICLE_RADIUS) + PARTICLE_RADIUS;
        const y = Math.random() * (canvas.height - 2 * PARTICLE_RADIUS) + PARTICLE_RADIUS;
        const vx = (Math.random() * 2 - 1) * MAX_SPEED;
        const vy = (Math.random() * 2 - 1) * MAX_SPEED;
        particles.push(new Particle(x, y, vx, vy));
    }
}

// 碰撞检测 - 分子之间的碰撞
function checkCollisions() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 2 * PARTICLE_RADIUS) {
                // 简单的弹性碰撞，交换速度
                const tempVx = p1.vx;
                const tempVy = p1.vy;
                p1.vx = p2.vx;
                p1.vy = p2.vy;
                p2.vx = tempVx;
                p2.vy = tempVy;
            }
        }
    }
}

// 绘制速度分布直方图
function drawSpeedDistribution() {
    const speeds = particles.map(p => Math.sqrt(p.vx * p.vx + p.vy * p.vy));
    const maxSpeed = Math.max(...speeds);
    const histogram = new Array(10).fill(0);

    for (let speed of speeds) {
        const index = Math.floor((speed / maxSpeed) * histogram.length);
        histogram[Math.min(index, histogram.length - 1)]++;
    }

    // 绘制直方图
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    const barWidth = canvas.width / histogram.length;
    for (let i = 0; i < histogram.length; i++) {
        const barHeight = (histogram[i] / NUM_PARTICLES) * canvas.height * 0.3;
        ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 1, barHeight);
    }
}

// 更新并绘制模拟
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 更新并绘制所有分子
    for (let particle of particles) {
        particle.update();
        particle.draw();
    }

    checkCollisions();
    drawSpeedDistribution();  // 绘制速度分布图

    requestAnimationFrame(animate);
}

// 初始化并启动动画
initParticles();
animate();
