document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://open.er-api.com/v6/latest/AED';
    const VAT_RATE = 0.05; // 5% VAT

    // Element selectors
    const liveRateDisplay = document.getElementById('live-rate-display');
    const aedAmountInput = document.getElementById('aedAmount');
    const serviceCards = document.querySelectorAll('.service-card');
    const midMarketValueDisplay = document.getElementById('mid-market-value-display');
    
    let midMarketRate = 0;

    // --- Main Calculation Function ---
    function calculate() {
        const aedToSend = parseFloat(aedAmountInput.value) || 0;
        let lowestCost = Infinity;
        let bestCard = null;

        const midMarketValue = aedToSend * midMarketRate;

        if (midMarketValue > 0) {
            midMarketValueDisplay.innerHTML = `Value at Market Rate: <strong>${midMarketValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })} INR</strong>`;
        } else {
            midMarketValueDisplay.innerHTML = '';
        }

        serviceCards.forEach(card => card.classList.remove('best'));

        serviceCards.forEach(card => {
            const feeInput = card.querySelector('.fee');
            const taxInput = card.querySelector('.tax');
            const vatCheckbox = card.querySelector('.vat-checkbox');
            if (vatCheckbox.checked) {
                const fee = parseFloat(feeInput.value) || 0;
                taxInput.value = (fee * VAT_RATE).toFixed(2);
            }

            const exchangeRate = parseFloat(card.querySelector('.exchange-rate').value) || 0;
            const fee = parseFloat(feeInput.value) || 0;
            const tax = parseFloat(taxInput.value) || 0;
            const finalInrSpan = card.querySelector('.final-inr');
            const costInrSpan = card.querySelector('.cost-inr');
            const totalDeductions = fee + tax;

            if (aedToSend > 0 && exchangeRate > 0) {
                const amountAfterDeductions = aedToSend - totalDeductions;
                if (amountAfterDeductions >= 0) {
                    const finalInr = amountAfterDeductions * exchangeRate;
                    finalInrSpan.textContent = finalInr.toLocaleString('en-IN', { maximumFractionDigits: 2 });
                    
                    const realCost = midMarketValue - finalInr;
                    costInrSpan.textContent = realCost.toLocaleString('en-IN', { maximumFractionDigits: 2 });

                    if (realCost < lowestCost) {
                        lowestCost = realCost;
                        bestCard = card;
                    }
                } else {
                    finalInrSpan.textContent = '0.00';
                    costInrSpan.textContent = '...';
                }
            } else {
                finalInrSpan.textContent = '0.00';
                costInrSpan.textContent = '...';
            }
        });

        if (bestCard) {
            bestCard.classList.add('best');
        }

        saveData();
    }

    // --- Fetch Live Rate ---
    async function fetchLiveAedToInrRate() {
        liveRateDisplay.innerHTML = '<span class="loader"></span>';
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Network response was not ok.');
            
            const data = await response.json();
            midMarketRate = data.rates.INR; 
            
            liveRateDisplay.innerHTML = `1 AED = <strong>${midMarketRate.toFixed(4)}</strong> INR`;
            
            calculate();
        } catch (error) {
            console.error("Failed to fetch live rate:", error);
            liveRateDisplay.textContent = 'Could not load rate.';
        }
    }

    // --- Save and Load Data ---
    function saveData() {
        const dataToSave = {
            aedAmount: aedAmountInput.value,
            services: []
        };
        serviceCards.forEach(card => {
            dataToSave.services.push({
                id: card.id,
                rate: card.querySelector('.exchange-rate').value,
                fee: card.querySelector('.fee').value,
                tax: card.querySelector('.tax').value,
                vatChecked: card.querySelector('.vat-checkbox').checked
            });
        });
        // Using a new key to avoid conflicts with old saved data
        localStorage.setItem('remittanceComparatorDataV4', JSON.stringify(dataToSave));
    }

    function loadData() {
        const savedData = JSON.parse(localStorage.getItem('remittanceComparatorDataV4'));
        if (savedData) {
            aedAmountInput.value = savedData.aedAmount;
            savedData.services.forEach(serviceData => {
                const card = document.getElementById(serviceData.id);
                if (card) {
                    card.querySelector('.exchange-rate').value = serviceData.rate;
                    card.querySelector('.fee').value = serviceData.fee;
                    card.querySelector('.tax').value = serviceData.tax;
                    card.querySelector('.vat-checkbox').checked = serviceData.vatChecked;
                }
            });
        }
    }

    // --- Event Listeners ---
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keyup', calculate);
        input.addEventListener('change', calculate);
    });

    // --- Initial Page Load ---
    loadData();
    fetchLiveAedToInrRate();
});