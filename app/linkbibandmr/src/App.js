import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Tag } from 'antd';
import bibAndmr from './data/bibAndmr.json'
console.log(bibAndmr)
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Experience',
    dataIndex: 'experience',
    key: 'experience',
  },
    {
    title: 'Street',
    dataIndex: 'street',
    key: 'street',
  },
  {
    title: 'City',
    dataIndex: 'city',
    key:'city'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'Standing simple') {
            color = 'volcano';
          }
          else if(tag == 'Bon standing'){
            color = 'green';
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

  const contentStyle1 = {
    backgroundColor: '#ffffff',
    boxShadow: '0px 2px 16px 1px rgba(0, 0, 0, 0.1)',
    width: '70%',
    overflow: 'scroll',
  };
  const contentStyle2 = {
    backgroundColor: '#ffffff',
    boxShadow: '0px 2px 16px 1px rgba(0, 0, 0, 0.1)',
    width: '100%',
    overflow: 'none',
  };
function App() {
  return (
    
    <div style={contentStyle1} >
    <h1>Best restaurants in France !</h1>
    <h2>With Bib and Maitre restaurateur distinctions</h2>
    <Table style={contentStyle2}  columns={columns} dataSource={bibAndmr} />
    </div>
  );
}

export default App;
