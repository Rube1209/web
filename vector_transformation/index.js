// 初始化画布
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// 初始向量
let vector = [100, 50];

// 绘制坐标轴
function drawAxes() {
    ctx.strokeStyle = "#aaa";
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();
}

// 绘制向量
function drawVector(vec, color = "blue") {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + vec[0], centerY - vec[1]);
    ctx.stroke();
}

// 清空画布并重新绘制
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes();
}

// 拉伸变换
function applyScale() {
    clearCanvas();

    const scaleX = parseFloat(document.getElementById("scaleX").value);
    const scaleY = parseFloat(document.getElementById("scaleY").value);

    // 应用拉伸矩阵
    let scaledVector = [
        vector[0] * scaleX,
        vector[1] * scaleY
    ];

    // 绘制原始和拉伸后的向量
    drawVector(vector, "blue");
    drawVector(scaledVector, "red");
}

// 旋转变换
function applyRotation() {
    clearCanvas();

    const angleDegrees = parseFloat(document.getElementById("angle").value);
    const angleRadians = angleDegrees * Math.PI / 180;

    // 应用旋转矩阵
    let rotatedVector = [
        vector[0] * Math.cos(angleRadians) - vector[1] * Math.sin(angleRadians),
        vector[0] * Math.sin(angleRadians) + vector[1] * Math.cos(angleRadians)
    ];

    // 绘制原始和旋转后的向量
    drawVector(vector, "blue");
    drawVector(rotatedVector, "green");
}

// 初始化画布
clearCanvas();
drawVector(vector, "blue");
