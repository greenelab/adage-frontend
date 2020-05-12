import React from 'react';
import { createContext } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { connect } from 'react-redux';

import { unique } from '../../../util/object';
import { isArray } from '../../../util/types';
import { useDiff } from '../../../util/hooks';

export const OrderContext = createContext({});

// sample and signature order, shared across sections of experiments page

let Order = ({ activities, children }) => {
  const [sampleOrder, setSampleOrder] = useState([]);
  const [signatureOrder, setSignatureOrder] = useState([]);
  const tableRef = useRef();
  const activitiesChanged = useDiff(JSON.stringify(activities));

  const changeSampleOrder = useCallback((order) => setSampleOrder(order), []);

  const changeSignatureOrder = useCallback(
    (order) => setSignatureOrder(order),
    []
  );

  const resetOrders = useCallback(() => {
    if (isArray(activities)) {
      const map = (key) => unique(activities.map((activity) => activity[key]));
      changeSampleOrder(map('sample'));
      changeSignatureOrder(map('signature'));
    } else {
      changeSampleOrder([]);
      changeSignatureOrder([]);
    }
  }, [activities, changeSampleOrder, changeSignatureOrder]);

  const resetTableSort = useCallback(() => {
    if (tableRef.current)
      tableRef.current.resetSort();
  }, []);

  // reset orders when activities change
  useEffect(() => {
    if (!activitiesChanged)
      return;

    resetOrders();
  }, [activitiesChanged, resetOrders]);

  return (
    <OrderContext.Provider
      value={{
        sampleOrder,
        signatureOrder,
        changeSampleOrder,
        changeSignatureOrder,
        resetOrders,
        resetTableSort,
        tableRef
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
