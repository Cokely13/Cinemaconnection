import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchActors} from '../store/allActorsStore'

function Image() {
  const dispatch = useDispatch();
  const allActors= useSelector((state) => state.allActors);

  useEffect(() => {
    dispatch(fetchActors());
  }, []);



  return (
    <div>
      {allActors.map((qb) => (
        <div key={qb.id}>
          <h3>{qb.name}</h3>
          <img src={qb.imagePath} alt={qb.name} style={{ width: '100px', height: '100px' }}/>
        </div>
      ))}
    </div>
  );
};

export default Image;
