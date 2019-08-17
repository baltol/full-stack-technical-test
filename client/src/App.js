import React, { useState, useEffect } from 'react'
import { Card, Table } from 'antd'
import './App.css'
import { format, columns } from './lib.js'

const BASE_URL = 'http://localhost:3000/api/data';
const url = ({ current, pageSize }) => `${BASE_URL}?current=${current}&pageSize=${pageSize}`;

function App() {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const fetchNumbers = ({ current, pageSize } = {}) => {
        if (!current || !pageSize) {
            current = 1;
            pageSize = 5;
        }
        return fetch(url({current, pageSize}))
            .then(res => res.json())
            .then(array => {
                const [doc] = array;
                setData(array.map(format));
                setCount(doc.count);
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchNumbers();
    }, []);

    return (
    <main className="App">
      <section className="App-header">
        <h1>Numbers</h1>
        <div className="auto" />
        <span>AVOXI Take-Home</span>
      </section>
      <section className="App-card">
        <Card
          className="App-card__inner"
          title="Available Numbers"
          bordered={true}
        >
        <Table
          dataSource={data}
          columns={columns}
          onChange={fetchNumbers}
        pagination={{ pageSize: 5, total: count, defaultCurrent: 1 }}
        />
        </Card>
      </section>
    </main>
  )
}

export default App
