import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  const [filter, setFilter] = useState({
    stone: false,
    iron: false,
    gold: false,
    diamond: false,
    netherite: false,
  });

  const handleCheckboxChange = (category) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [category]: !prevFilter[category],
    }));
  };
  

  useEffect(() => {
    fetch('https://minecraft-api.vercel.app/api/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error(error));
  }, []);
  return (
    <div className="App">
      <h1>Itens do Minecraft</h1>
      <table id="filter">
        <thead>
          <tr>
            <th>stone</th>
            <th>iron</th>
            <th>gold</th>
            <th>diamond</th>
            <th>netherite</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="checkbox"
                checked={filter.stone}
                onChange={() => handleCheckboxChange('stone')}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={filter.iron}
                onChange={() => handleCheckboxChange('iron')}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={filter.gold}
                onChange={() => handleCheckboxChange('gold')}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={filter.diamond}
                onChange={() => handleCheckboxChange('diamond')}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={filter.netherite}
                onChange={() => handleCheckboxChange('netherite')}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>ícone</th>
            <th>nome</th>
            <th>ID</th>
            <th>quantidade</th>
            <th>descrição</th>
          </tr>
        </thead>
        <tbody>
          {filter.stone || filter.iron || filter.gold || filter.diamond || filter.netherite
            ? items
                .filter((item) => {
                  if (filter.stone && item.namespacedId.includes('stone')) return true;
                  if (filter.iron && item.namespacedId.includes('iron')) return true;
                  if (filter.gold && item.namespacedId.includes('gold')) return true;
                  if (filter.diamond && item.namespacedId.includes('diamond')) return true;
                  if (filter.netherite && item.namespacedId.includes('netherite')) return true;
                  return false;
                })
                .map((item) => (
                  <tr key={item}>
                    <td><img src={item.image} alt={item.name} /></td>
                    <td>{item.name}</td>
                    <td>{item.namespacedId}</td>
                    <td>{item.stackSize}</td>
                    <td>{item.description}</td>
                  </tr>
                ))
            : 
              items.map((item) => (
                <tr key={item}>
                  <td><img src={item.image} alt={item.name} /></td>
                  <td>{item.name}</td>
                  <td>{item.namespacedId}</td>
                  <td>{item.stackSize}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
