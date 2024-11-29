// Default daily goal
let dailyGoal = 2000;
let currentIntake = 0;
const log = [];
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const logTableBody = document.getElementById("logTableBody");
const weeklyChartCanvas = document.getElementById("weeklyChart");

function updateProgress() {
    const percentage = (currentIntake / dailyGoal) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${currentIntake} / ${dailyGoal} ml`;
}

function addDrink() {
    const drinkType = document.getElementById("drinkType").value;
    const amount = parseInt(document.getElementById("customAmount").value);

    if (!amount || amount <= 0) return alert("Enter a valid amount.");

    const time = new Date().toLocaleTimeString();
    log.push({ time, drinkType, amount });
    currentIntake += amount;
    updateProgress();
    updateLogTable();
}

function updateLogTable() {
    logTableBody.innerHTML = "";
    log.forEach((entry, index) => {
        const row = `
            <tr>
                <td>${entry.time}</td>
                <td>${entry.drinkType}</td>
                <td>${entry.amount}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removeLog(${index})">Remove</button>
                </td>
            </tr>
        `;
        logTableBody.innerHTML += row;
    });
}

function removeLog(index) {
    currentIntake -= log[index].amount;
    log.splice(index, 1);
    updateProgress();
    updateLogTable();
}

function setDailyGoal() {
    const newGoal = parseInt(prompt("Enter new daily goal (ml):", dailyGoal));
    if (newGoal && newGoal > 0) {
        dailyGoal = newGoal;
        updateProgress();
    }
}

function resetTracker() {
    currentIntake = 0;
    log.length = 0;
    updateProgress();
    updateLogTable();
}

// Weekly Analytics
const weeklyData = [1200, 1800, 2000, 1500, 1700, 2000, 1300];

function drawWeeklyChart() {
    new Chart(weeklyChartCanvas, {
        type: "bar",
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{
                label: "Water Intake (ml)",
                data: weeklyData,
                backgroundColor: "rgba(75, 192, 192, 0.6)"
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

drawWeeklyChart();
