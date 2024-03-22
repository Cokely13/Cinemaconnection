import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchQuarterbacks} from '../store/allQuarterbacksStore'

function Image() {
  const dispatch = useDispatch();
  const allQuarterbacks = useSelector((state) => state.allQuarterbacks);

  useEffect(() => {
    dispatch(fetchQuarterbacks());
  }, []);



  return (
    <div>
      {allQuarterbacks.map((qb) => (
        <div key={qb.id}>
          <h3>{qb.name}</h3>
          <img src={qb.imagePath} alt={qb.name} style={{ width: '100px', height: '100px' }}/>
        </div>
      ))}
    </div>
  );
};

export default Image;
