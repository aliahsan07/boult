import React, { useEffect, useState } from "react";
import logo from './kfc.png';
import './App.css';
import reactQuery from './react-query.svg'
import countries from './countries';
import { useQuery } from 'react-query';


function App() {

  const [addCountry, setAddCountry ] = useState('')
  const [addCity, setAddCity ] = useState('')
  const [removeCountry, setRemoveCountry ] = useState('')
  const [removeCity, setremoveCity ] = useState('')
  const [ viewBranches, setViewBranches ] = useState('')

  const { isLoading, error, data } = useQuery('list-branches', async() => {
    const count = await(await fetch("http://127.0.0.1:8080/count")).json();
    return count;
  })



  const openKFCBranch = async () => {
    if (!!addCountry && !!addCity){
      const res = await fetch("http://127.0.0.1:8080/count");
      setAddCity("");
      setAddCountry("")
      return;
    }

    alert("Oops! You have to put in details for both country and city")
  }

  const closeKFCBranch = async () => {
    if (!!removeCountry && !!removeCity){
      const res = await fetch("http://127.0.0.1:8080/count");
      setremoveCity("");
      setRemoveCountry("")
      return;
    }
    alert("Oops! You have to put in details for both country and city")
  }


  return (
    <div className="App">
      <header className="App-header">
        <h2>It’s Finger Lickin’ Good</h2>
        {isLoading ? 'Loading Stats...' : error ? 'Error Loading Data' : `Total worldwide branches: ${data}`}
        <hr/>
        <h4 style={{display: "inline-block"}}>This stat is powered by <img style={{width: 250, transform:"translate(0px, 13px)"}} src={reactQuery} alt="react-query" /></h4>
        
        <img src={logo} className="App-logo" alt="logo" style={{marginTop: "20px"}}/>
        <div style={{fontSize: "20px", marginTop: "50px", display:"flex", flexDirection:"column"}} >
        <div>
          Open Branch
          <br/>
          <label htmlFor="op-country">Country</label>
          <select id="op-country" name="op-country" value={addCountry} onChange={ e => setAddCountry(e.target.value)}>{countries.map(x => <option key={x}>{x}</option>)}</select>
          <label htmlFor="op-city">City</label>
          <input type="text" id="op-city" name="op-city" value={addCity} onChange={ e => setAddCity(e.target.value)} />
          <input type="submit" value="Open Branch" onClick={openKFCBranch} />
        </div>
        <br/>
        <div>
          Close Branch
          <br/>
          <label htmlFor="cl-country">Country</label>
          <select id="cl-country" name="cl-country" value={removeCountry} onChange={ e => setRemoveCountry(e.target.value)}>{countries.map(x => <option key={x}>{x}</option>)}</select>
          <label htmlFor="cl-city">City</label>
          <input type="text" id="cl-city" name="cl-city" value={removeCountry} onChange={ e => setRemoveCountry(e.target.value)} />
          <input type="submit" value="Close Branch" onClick={closeKFCBranch} />
        </div>
        <br/>
        <div>
          List branches by country
          <br/>
          <select>{countries.map(x => <option key={x}>{x}</option>)}</select>
          <input type="submit" value="List Branches by Country" onChange={ e => setViewBranches(e.target.value)}/>
        </div>  

        </div>
      </header>
    </div>
  );
}

export default App;
