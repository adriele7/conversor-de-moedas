import React, { useState, useEffect } from 'react';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => {
        setCurrencies(Object.keys(data.rates));
        setExchangeRate(data.rates[toCurrency]);
      });
  }, [toCurrency]);

  useEffect(() => {
    if (fromCurrency !== toCurrency) {
      fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  const convert = (amount * exchangeRate).toFixed(2);

  return (
    <div className="converter-container">
      <h1>Conversor de Moedas</h1>
      <div className="converter-inputs">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span>para</span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <h2>{amount} {fromCurrency} = {convert} {toCurrency}</h2>
    </div>
  );
};

export default CurrencyConverter;
