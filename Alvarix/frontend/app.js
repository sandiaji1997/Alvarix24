async function checkRisk() {
    const amount = document.getElementById("amount").value;
    const location = document.getElementById("location").value;
    const device = document.getElementById("device").value;

    try {
        const response = await fetch("http://localhost:3000/risk-score", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: Number(amount),
                location,
                device
            })
        });

        const data = await response.json();

        document.getElementById("result").innerText =
            `Risk Level: ${data.level}\nScore: ${data.score}\nReasons: ${data.reasons.join(", ")}`;

    } catch (error) {
        console.error("ERROR:", error);
        document.getElementById("result").innerText = "Error connecting to API";
    }
}