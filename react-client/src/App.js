import React, { useState } from "react";
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
  const [cities, setCities] = useState([])

  const { isLoading, error, data } = useQuery('list-branches', async() => {
    const count = await(await fetch("http://127.0.0.1:8080/count")).json();
    return count;
  })



  const openKFCBranch = async () => {
    if (!!addCountry && !!addCity){
      const res = await (await fetch(`http://127.0.0.1:8080/open-branch?country=${addCountry}&city=${addCity}`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })).json();
      setAddCity("");
      setAddCountry("")
      if (res){
        alert("Branch opened succesfully!")
      }else{
        alert("Oops! Unable to approve the request. Possibly because a branch already exists in that city.")
      }
      return;
    }

    alert("Oops! You have to put in details for both country and city")
  }

  const closeKFCBranch = async () => {
    if (!!removeCountry && !!removeCity){
      const res = await (await fetch(`http://127.0.0.1:8080/close-branch?country=${removeCountry}&city=${removeCity}`, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })).json();
      setremoveCity("");
      setRemoveCountry("")
      if (res){
        alert("Branch closed succesfully!")
      }else{
        alert("Oops! Unable to approve the request. Possibly because a branch doesn't exist in this city.")
      }
      return;
    }
    alert("Oops! You have to put in details for both country and city")
  }

  const viewBranchesByCountry = async () => {
    if (!!viewBranches){
      const res = await (await fetch(`http://127.0.0.1:8080/branches?country=${viewBranches}`)).json();
      if (res){
        setCities(res);
      }
      return;
    }

    alert("Oops! You have to put in details for both country and city")
  }


  return (
    <div className="App">
      <header className="App-header">
        <h2>It’s Finger Lickin’ Good</h2>
        {isLoading ? 'Loading Stats...' : error ? 'Error Loading Data' : `Total worldwide branches: ${data}`}
        <h6 style={{display: "inline-block", marginTop: 0}}>This stat is powered by <img style={{width: 250, transform:"translate(0px, 13px)"}} src={reactQuery} alt="react-query" /></h6>
        <img src={logo} className="App-logo" alt="logo" style={{marginTop: "20px"}}/>
        <div style={{fontSize: "20px", marginTop: "50px", display:"flex", flexDirection:"column"}} >
        <div>
          <strong>Open Branch</strong>
          <br/>
          <label htmlFor="op-country">Country</label>
          <select id="op-country" name="op-country" value={addCountry} onChange={ e => setAddCountry(e.target.value)}>{countries.map(x => <option key={x}>{x}</option>)}</select>
          <label htmlFor="op-city">City</label>
          <input type="text" id="op-city" name="op-city" value={addCity} onChange={ e => setAddCity(e.target.value)} />
          <input type="submit" value="Open Branch" onClick={openKFCBranch} />
        </div>
        <br/>
        <div>
          <strong>Close Branch</strong>
          <br/>
          <label htmlFor="cl-country">Country</label>
          <select id="cl-country" name="cl-country" value={removeCountry} onChange={ e => setRemoveCountry(e.target.value)}>{countries.map(x => <option key={x}>{x}</option>)}</select>
          <label htmlFor="cl-city">City</label>
          <input type="text" id="cl-city" name="cl-city" value={removeCity} onChange={ e => setremoveCity(e.target.value)} />
          <input type="submit" value="Close Branch" onClick={closeKFCBranch} />
        </div>
        <br/>
        <div>
          <strong>List branches by Country</strong>
          <br/>
          <select onChange={ e => setViewBranches(e.target.value)} value={viewBranches}>{countries.map(x => <option key={x}>{x}</option>)}</select>
          <input type="submit" value="List Branches by Country" onClick={viewBranchesByCountry}/>
          {!!cities && cities.map(city => <li key={city}>{city}</li>)}
        </div>  
        </div>
      </header>
    </div>
  );
}

export default App;
