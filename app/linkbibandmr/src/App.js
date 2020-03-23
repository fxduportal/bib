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


function App() {
  return (
    <div className="App">
    <Table columns={columns} dataSource={bibAndmr} />
    </div>
  );
}

export default App;
