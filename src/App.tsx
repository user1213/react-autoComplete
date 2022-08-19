import React, { FC, useState, ChangeEvent } from 'react';

import './App.css';
import { searchData } from './data/data';
import { SearchList } from './interface';

const App: FC = (): JSX.Element => {

  const[searchTxt, setSearchTxt] = useState<string>('');
  const[list, setList] = useState<any>([]);
  const[filtered, setFiltered] = useState<any>([]);

  const update = (e: ChangeEvent<HTMLInputElement>): void => {
    const item = e.target.value.toLowerCase();
    setSearchTxt(e.target.value);
    const newList = searchData.data.filter(obj => {
      return obj.title.toLowerCase().indexOf(item) === 0;
    });
    setList(newList);
    setFiltered([]);
  }

  const search = (): void => {

  }

  const setSearch = (str: string): void => {
    setSearchTxt(str);
    setList([]);
    const newList = searchData.data.filter(obj => {
      return obj.title.toLowerCase().indexOf(str.toLowerCase()) === 0;
    })
    setFiltered(newList);
  }

  return (
    <div>
      <div className='content'>
        <div>
          <input type="text" placeholder="Search...." name="search" value={searchTxt} onChange={update} />
          <button onClick={search}>Search</button>
        </div>
      </div>
      <div className='listing'>
        {list.length > 0 ? <div className='searchWrapper'>
          {
            list.map((obj: SearchList, key: number) => {
              return (
                <div key={key} className="searchItem" onClick={() => {setSearch(obj.title)}}>
                  {obj.title}
                </div>
              )
            })
          }
        </div>: null}
       {filtered.length ? <div className='results'>
          <h4>Search Results: </h4>
          {
            filtered.map((item: SearchList, key: number) => {
              return (
                <>
                <div className='title'>
                  {item.title}
                </div>
                <div className='description'>
                  {item.desc}
                </div>
                </>
              )
            })
          }
        </div>: null }
      </div>
    </div>
  );
}

export default App;
