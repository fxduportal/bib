import React from 'react';
import './App.css';
import ListRestau from './data/list'
import {Table }from 'antd'

function App() {
 
  return (
    <div className="Link Bib and Maitre Restaurateur" >
      <header className="Bib&MaitreRestaurateur">
        <div style = {{position : 'relative', alignContent:'center', alignItems:'center'}}>
        <h1>Here are the restaurants</h1>
        <ListRestau/>
        </div>
      </header>
    </div>
  );
}

export default App;
