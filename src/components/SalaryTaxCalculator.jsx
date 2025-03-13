import React, { useState } from 'react';

const taxRange = [
  { min: 0, max: 24000000, rate: 0 },
  { min: 24000000, max: 30000000, rate: 0.1 },
  { min: 30000000, max: 38000000, rate: 0.15 },
  { min: 38000000, max: 50000000, rate: 0.2 },
  { min: 50000000, max: 66700000, rate: 0.25 },
  { min: 66700000, max: Infinity, rate: 0.3 },
];

const INSURANCE_RATE = 0.07; // 7% بیمه تامین اجتماعی

const SalaryTaxCalculator = () => {
  const [salary, setSalary] = useState('');
  const [tax, setTax] = useState(0);
  const [insurance, setInsurance] = useState(0);

  const calculateTax = (salary) => {
    let taxAmount = 0;
    for (const range of taxRange) {
      if (salary > range.min) {
        const taxableIncome = Math.min(salary, range.max) - range.min;
        taxAmount += taxableIncome * range.rate;
      }
    }
    return taxAmount;
  };

  const handleCalculate = () => {
    const taxAmount = calculateTax(salary);
    const insuranceAmount = salary * INSURANCE_RATE;
    setTax(taxAmount);
    setInsurance(insuranceAmount);
  };

  const handleReset = () => {
    setTax(0);
    setInsurance(0);
    setInsurance(0);
    setSalary('');
  };

  return (
    <div className="module">
      <h2>محاسبه حقوق خالص 1404</h2>
      <div className="input-wrapper">
        <input
          className="input"
          onChange={(e) => setSalary(Number(e.target.value.replace(/\D/g, '')))}
          placeholder="میزان حقوق را وارد کنید"
          value={salary.toLocaleString()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCalculate(); // اجرای تابع محاسبه هنگام زدن Enter
            }
          }}
        />
      </div>
      <button onClick={handleCalculate}>محاسبه</button>
      <button onClick={handleReset}>بازیابی</button>

      <h3>مالیات: {tax.toLocaleString()} تومان</h3>
      <h3>بیمه: {insurance.toLocaleString()} تومان</h3>
      <h3>کل کسورات : {(insurance + tax).toLocaleString()} تومان</h3>
      <h3 style={{ color: '#646cff' }}>
        خالص دریافتی: {(salary - (insurance + tax)).toLocaleString()} تومان
      </h3>
    </div>
  );
};

export default SalaryTaxCalculator;
