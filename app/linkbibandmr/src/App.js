import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Tag } from 'antd';
import bibList from './bibList.json'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'experience',
    dataIndex: 'experience',
    key: 'experience',
  },
    {
    title: 'street',
    dataIndex: 'street',
    key: 'street',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'confortable') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  ];

const data = [
   {
       key:'1',
        name: "Le Rousseau",
        "experience": "Assez confortable",
            "street": "3 rue Jean-Jacques-Rousseau",
            "city": " Grenoble",
            "zipcode": " 38000",
            "country": " France",
           tags: ['confortable'],
    },
     {
       key:'2',
        name: "Le Rousseau",
        "experience": "Assez confortable",
            "street": "3 rue Jean-Jacques-Rousseau",
            "city": " Grenoble",
            "zipcode": " 38000",
            "country": " France",
             tags: ['Assez confortable', 'COSY'],
    },
  
];

function App() {
  return (
    <div className="App">
    <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default App;
