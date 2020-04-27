import React from 'react';
import { createContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { connect } from 'react-redux';

import { unique } from '../../../util/object';
import { isArray } from '../../../util/types';
import { useDiff } from '../../../util/hooks';

export const OrderContext = createContext({});

// context controller to share sample order across sections

let Order = ({ activities, children }) => {
  const [sampleOrder, setSampleOrder] = useState([]);
  const [signatureOrder, setSignatureOrder] = useState([]);
  const activitiesChanged = useDiff(JSON.stringify(activities));

  const reset = useCallback(() => {
    if (isArray(activities)) {
      const map = (key) => unique(activities.map((activity) => activity[key]));
      setSampleOrder(map('sample'));
      setSignatureOrder(map('signature'));
    } else {
      setSampleOrder([]);
      setSignatureOrder([]);
    }
  }, [activities]);

  useEffect(() => {
    if (!activitiesChanged)
      return;

    reset();
  }, [activitiesChanged, reset]);

  return (
    <OrderContext.Provider
      value={{
        sampleOrder,
        signatureOrder,
        setSampleOrder,
        setSignatureOrder,
        reset
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

const mapStateToProps = (state) => ({
  activities: state.samples.activities
});

Order = connect(mapStateToProps)(Order);

export default Order;
