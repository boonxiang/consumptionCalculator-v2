function calculateEnergyConsumption() {
    const importThisMonth = parseFloat(document.getElementById("ReadImport_ThisMonth").value);
    const exportThisMonth = parseFloat(document.getElementById("ReadExport_ThisMonth").value);
    const importLastMonth = parseFloat(document.getElementById("ReadImport_LastMonth").value);
    const exportLastMonth = parseFloat(document.getElementById("ReadExport_LastMonth").value);
    const generationThisMonth = parseFloat(document.getElementById("ReadGeneration_ThisMonth").value);
    const generationLastMonth = parseFloat(document.getElementById("ReadGeneration_LastMonth").value);

    const errorDiv = document.getElementById("EnergyConsumptionError");
    const outputDiv = document.getElementById("EnergyConsumptionOutput");

    errorDiv.textContent = "";
    outputDiv.textContent = "";

    // Validate inputs
    if ([importThisMonth, exportThisMonth, importLastMonth, exportLastMonth, generationThisMonth, generationLastMonth].some(isNaN)) {
        errorDiv.textContent = "⚠ Please enter all Import, Export, and Solar Generation values.";
        errorDiv.style.color = "red";
        return;
    }

    // New calculations
    const directConsumptionThisMonth = generationThisMonth - exportThisMonth;
    const directConsumptionLastMonth = generationLastMonth - exportLastMonth;

    const totalConsumptionThisMonth = directConsumptionThisMonth + importThisMonth;
    const totalConsumptionLastMonth = directConsumptionLastMonth + importLastMonth;

    // Differences
    const genDiff = generationThisMonth - generationLastMonth;
    const totalConsDiff = totalConsumptionThisMonth - totalConsumptionLastMonth;

    // Solar Generation sentence
    let genSentence = "";
    let genColor = "";
    if (genDiff > 0) {
        genSentence = `Your solar system produced ${genDiff.toFixed(2)} kWh more than last month! 🌞`;
        genColor = "green";
    } else if (genDiff < 0) {
        genSentence = `Your solar generation dropped by ${Math.abs(genDiff).toFixed(2)} kWh compared to last month.`;
        genColor = "red";
    } else {
        genSentence = `Your solar generation was the same as last month.`;
        genColor = "gray";
    }

    // Total Consumption sentence
    let consSentence = "";
    let consColor = "";
    if (totalConsDiff > 0) {
        consSentence = `Your total energy consumption increased by ${totalConsDiff.toFixed(2)} kWh compared to last month, which may increase your bill. ⚡`;
        consColor = "red";
    } else if (totalConsDiff < 0) {
        consSentence = `Your total energy consumption decreased by ${Math.abs(totalConsDiff).toFixed(2)} kWh compared to last month, which may lower your bill. ✅`;
        consColor = "green";
    } else {
        consSentence = `Your total energy consumption is unchanged compared to last month.`;
        consColor = "gray";
    }

    // Output table
    outputDiv.innerHTML = `
        <div style="text-align: center; font-family: Arial, sans-serif;">
            <h3 style="color: #142850; font-size: 26px;">Solar & Consumption Comparison</h3>
            <table style="border-collapse: collapse; margin: 0 auto; font-size: 18px; box-shadow: 0 0 15px rgba(0,0,0,0.15); min-width: 500px;">
                <thead>
                    <tr style="background-color: #142850; color: white;">
                        <th style="padding: 12px 20px;">Month</th>
                        <th style="padding: 12px 20px;">Solar Generation (kWh)</th>
                        <th style="padding: 12px 20px;">Export Value (kWh)</th>
                        <th style="padding: 12px 20px;">Import Value (kWh)</th>
                        <th style="padding: 12px 20px;">Direct Consumption (kWh)</th>
                        <th style="padding: 12px 20px;">Total Consumption (kWh)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 12px 20px;">Previous Month</td>
                        <td style="padding: 12px 20px;">${generationLastMonth.toFixed(2)}</td>
                        <td style="padding: 12px 20px;">${exportLastMonth.toFixed(2)}</td>
                        <td style="padding: 12px 20px;">${importLastMonth.toFixed(2)}</td>
                        <td style="padding: 12px 20px;">${directConsumptionLastMonth.toFixed(2)}</td>
                        <td style="padding: 12px 20px;">${totalConsumptionLastMonth.toFixed(2)}</td>
                    </tr>
                    <tr style="background-color: #ffffff;">
                        <td style="padding: 12px 20px;">This Month</td>
                        <td style="padding: 12px 20px;">${generationThisMonth.toFixed(2)}</td>
                        <td style="padding: 12px 20px;">${exportThisMonth.toFixed(2)}</td>
                        <td style="padding: 12px 20px;">${importThisMonth.toFixed(2)}</td>
                        <td style="padding: 12px 20px;">${directConsumptionThisMonth.toFixed(2)}</td>
                        <td style="padding: 12px 20px;">${totalConsumptionThisMonth.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <br>
            <h4 style="margin-bottom: 8px; font-size: 20px;">Conclusion</h4>
            <p style="color:${genColor}; font-weight: bold; font-size: 16px;">${genSentence}</p>
            <p style="color:${consColor}; font-weight: bold; font-size: 16px;">${consSentence}</p>
            <br>
            <div style="max-width: 600px; margin: 0 auto; text-align: left; font-size: 14px; color: #333;">
                <p><strong>📌 Explanation:</strong></p>
                <ul>
                    <li><strong>Direct Consumption</strong> = Solar Generation − Export Value. <hr> 
                        This represents the solar energy you used <strong>directly during the daytime</strong> while your panels were producing electricity.
                        </li> <hr><hr>
                    <li><strong>Total Consumption</strong> = Direct Consumption + Import Value. <hr>
                        This represents your <strong>total energy usage for both daytime and nighttime</strong>, combining the energy you used from solar during the day and the energy you drew from the grid at night.</li>
                </ul>
            </div>
        </div>
    `;
}
