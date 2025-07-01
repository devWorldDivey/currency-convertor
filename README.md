# Remittance Comparator - UAE to India

A personal web dashboard built to compare money transfer services for sending money from the UAE (AED) to India (INR). This tool helps find the most cost-effective option by calculating the "Real Cost" of each transfer.

---

### 🚀 Live Demo

The live version of this project is hosted on GitHub Pages:

**[https://devworlddivey.github.io/currency-convertor/](https://devworlddivey.github.io/currency-convertor/)**

---

### 🌟 Key Features

* **Live Mid-Market Rate:** Automatically fetches and displays the live mid-market exchange rate (the "real" rate) to use as a fair benchmark.
* **Benchmark Value Display:** Instantly calculates what the sending amount is worth at the live market rate, before any fees are applied.
* **Pre-configured Service Cards:** Includes dedicated sections for 6 popular remittance services: Remitly, Western Union, LuLu Money, Al Ansari Exchange, Hubpay, and Emirates NBD.
* **Real-Time Calculations:** As you type in the exchange rates and fees, the "Recipient Gets" amount is calculated instantly.
* **"Real Cost" Analysis:** The most important feature, this shows the true amount you are paying for the service in INR. This is calculated by finding the difference between the benchmark value and the final amount the recipient gets.
* **VAT Calculation:** Includes a field for the 5% VAT on service fees, with a checkbox to auto-calculate it for convenience.
* **Best Option Highlighting:** The service card with the lowest "Real Cost" is automatically highlighted with a green border, making it easy to spot the best value.
* **Persistent Data:** The values you enter for each service are automatically saved in your browser's local storage, so they will be there the next time you visit.

---

### 🛠️ Technology Stack

* **Front-End:** HTML5, CSS3, Modern JavaScript (ES6+)
* **Live Exchange Rates API:** [ExchangeRate-API](https://www.exchangerate-api.com/) (using their free, open endpoint)
* **Hosting:** GitHub Pages
* **Version Control:** Git & GitHub

---

### 🧠 How It Works

The core logic of this tool is to provide transparency beyond just the transfer fees.

1.  **Fetching the Benchmark:** On page load, the app makes an API call to get the latest mid-market exchange rate for AED to INR.
2.  **Calculating the Real Cost:** The "Real Cost" is the most crucial metric and is calculated with the following formula:
    `Real Cost = (Amount_to_Send × Mid_Market_Rate) - Final_Amount_Received`
    This shows the combined cost of the service's fee, VAT, and the margin they take on the exchange rate.
3.  **Saving Data:** All values entered into the input fields are saved to your browser's `localStorage`, so your last-used rates and fees are remembered for the next session.

---

### 📝 How to Use the Portal

1.  Enter the amount in **AED** you wish to send in the top input box.
2.  In separate browser tabs, visit the websites/apps of the services you want to compare (e.g., Remitly, Western Union).
3.  Get a quote from each service for the amount you are sending.
4.  Enter the **Exchange Rate** and **Fee (AED)** each service provides into the corresponding card on this portal.
5.  The portal will instantly update and highlight the service that offers the best value (lowest real cost).

---

### 👨‍💻 Author

Made by **Divey Anand**