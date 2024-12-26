var bh1 = document.getElementById("b1");
bh1.addEventListener("click", () => {
    alert("This website is to track all your expenses by grouping them in a simple category and showing the summary of your total expense");
});

var bh2 = document.getElementById("b2");
bh2.addEventListener("click", () => {
    var output = document.getElementById("output");
    if (output.style.display === "none") {
        output.style.display = "block";
    } else {
        output.style.display = "none";
    }
});

const daysInput = document.getElementById("days");
const incomeInput = document.getElementById("income");
const generateFormButton = document.getElementById("generateForm");
const expenseForm = document.getElementById("expenseForm");
const formContainer = document.getElementById("formContainer");
const tableContainer = document.getElementById("tableContainer");
const memeContainer = document.getElementById("memeContainer");

generateFormButton.addEventListener("click", () => {
    const days = parseInt(daysInput.value);
    if (isNaN(days) || days <= 0) {
        alert("Please enter a valid number of days!");
        return;
    }

    formContainer.innerHTML = "";

    for (let i = 1; i <= days; i++) {
        const formRow = document.createElement("div");
        formRow.classList.add("form-row");
        formRow.innerHTML = `
            <h3>Day ${i}</h3>
            <label>Food: <input type="number" name="foodDay${i}" min="0" step="0.01" required></label>
            <label>Travel: <input type="number" name="travelDay${i}" min="0" step="0.01" required></label>
            <label>Entertainment: <input type="number" name="entertainmentDay${i}" min="0" step="0.01" required></label>
            <label>Others: <input type="number" name="othersDay${i}" min="0" step="0.01" required></label>
        `;
     formContainer.appendChild(formRow);
    }

    expenseForm.style.display = "block";
});

expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(expenseForm);
    const days = parseInt(daysInput.value);
    const income = parseFloat(incomeInput.value);

    if (isNaN(income) || income <= 0) {
        alert("Please enter a valid income!");
        return;
    }

    const tableData = [];
    let totalFood = 0, totalTravel = 0, totalEntertainment = 0, totalOthers = 0;

    for (let i = 1; i <= days; i++) {
        const food = parseFloat(formData.get(`foodDay${i}`)) || 0;
        const travel = parseFloat(formData.get(`travelDay${i}`)) || 0;
        const entertainment = parseFloat(formData.get(`entertainmentDay${i}`)) || 0;
        const others = parseFloat(formData.get(`othersDay${i}`)) || 0;

        tableData.push({
            Day: `Day ${i}`,
            Food: food,
            Travel: travel,
            Entertainment: entertainment,
            Others: others
        });

        totalFood += food;
        totalTravel += travel;
        totalEntertainment += entertainment;
        totalOthers += others;
    }

    const totalExpense = totalFood + totalTravel + totalEntertainment + totalOthers;
    const savings = income - totalExpense;

    let tableHTML = `<table>
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Food</th>
                                <th>Travel</th>
                                <th>Entertainment</th>
                                <th>Others</th>
                            </tr>
                        </thead>
                        <tbody>`;
    tableData.forEach(data => {
        tableHTML += `<tr>
                        <td>${data.Day}</td>
                        <td>${data.Food}</td>
                        <td>${data.Travel}</td>
                        <td>${data.Entertainment}</td>
                        <td>${data.Others}</td>
                      </tr>`;
    });

    tableHTML += `<tr style="font-weight: bold; background-color: #f4f4f4;">
                    <td>Total Expense:</td>
                    <td colspan="4">${totalExpense.toFixed(2)}</td>
                  </tr>`;
    tableHTML += `<tr style="font-weight: bold; background-color: #dff0d8;">
                    <td>Savings:</td>
                    <td colspan="4">${savings.toFixed(2)}</td>
                  </tr>`;
    tableHTML += `</tbody></table>`;
    tableContainer.innerHTML = tableHTML;

    let memeHTML = `<h3>Your Financial Status</h3>`;
    
    if (savings > income * 0.5) {
        memeHTML += `<img src="wealth.jpeg" alt="You're a saver!" class="meme">`;
    } else if (savings > 0) {
        memeHTML += `<img src="neutral.jpeg" alt="Balanced spender!" class="meme">`;
    } else {
        memeHTML += `<img src="broke.jpeg" alt="Overspending alert!" class="meme">`;
    }
    memeContainer.innerHTML = memeHTML;

    expenseForm.style.display = "none";
    formContainer.innerHTML = "";
    daysInput.value = "";
    incomeInput.value = "";
});
