import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import { humanizeKeys } from '../../util/object';
import { parseObject } from '../../util/object';

import './index.css';

const defaultSpeed = 250;
const padding = 5;

// tooltip singular component

const Tooltip = () => {
  // internal state
  const [anchor, setAnchor] = useState(null);
  const [hAlign, setHAlign] = useState();
  const [vAlign, setVAlign] = useState();
  const timer = useRef();

  // set tooltip to open
  const openTooltip = useCallback((event) => {
    const newSpeed = Number(event.target?.dataset.tooltipSpeed) || defaultSpeed;
    setHAlign(event.target?.dataset.tooltipHAlign);
    setVAlign(event.target?.dataset.tooltipVAlign);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setAnchor(event.target);
    }, newSpeed);
  }, []);

  // set tooltip to close
  const closeTooltip = useCallback(() => {
    window.clearTimeout(timer.current);
    setAnchor(null);
  }, []);

  // when any dom node changes
  const onMutation = useCallback(
    (records = []) => {
      // get all nodes with an aria-label that haven't been processed yet
      // MutationRecord's "addedNodes" doesn't seem to play nice with react
      const nodes = document.querySelectorAll(
        '[aria-label]:not([data-tooltipped])'
      );

      // if the dom change does not include the tooltip, close tooltip
      if (
        records.every((record) => !record.target.classList.contains('tooltip'))
      )
        closeTooltip();

      // attach tooltip triggers to each node, and mark as processed
      for (const node of nodes) {
        node.addEventListener('mouseenter', openTooltip);
        node.addEventListener('mouseleave', closeTooltip);
        node.setAttribute('data-tooltipped', 'true');
      }
    },
    [openTooltip, closeTooltip]
  );

  // run on mutation first time page loads
  useEffect(() => {
    onMutation();
  }, [onMutation]);

  // set up mutation observer to watch for dom node additions/changes
  useEffect(() => {
    const observer = new MutationObserver(onMutation);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    return () => {
      observer.disconnect();
    };
  }, [onMutation]);

  const content = useMemo(() => {
    const stringLabel = anchor?.getAttribute('aria-label');
    const objectLabel = parseObject(stringLabel);
    const innerText = anchor?.innerText;

    if (objectLabel) {
      const fields = humanizeKeys(objectLabel);
      return (
        <table className='tooltip_table size_tiny'>
          <tbody>
            {Object.entries(fields).map(([key, value], index) => (
              <tr key={index}>
                <td className='nowrap'>{key}</td>
                <td className='nowrap'>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else
      return stringLabel || innerText;
  }, [anchor]);

  return createPortal(
    <div
      className='tooltip size_tiny'
      style={{
        ...computeStyle({ anchor, content, hAlign, vAlign })
      }}
    >
      {content}
    </div>,
    document.body
  );
};
export default Tooltip;

// position tooltip relative to anchor/target
const computeStyle = ({ anchor, content, hAlign = 'left', vAlign = 'top' }) => {
  const anchorBbox = anchor?.getBoundingClientRect();

  if (!content || !anchorBbox?.width || !anchorBbox?.height)
    return { left: '-100000px', top: '-100000px' };

  const bodyBbox = document.body.getBoundingClientRect();
  const bbox = {
    left: anchorBbox.left - bodyBbox.left,
    top: anchorBbox.top - bodyBbox.top,
    right: bodyBbox.right - (anchorBbox.left + anchorBbox.width),
    bottom: bodyBbox.bottom - (anchorBbox.top + anchorBbox.height),
    width: anchorBbox.width,
    height: anchorBbox.height
  };
  const style = { transform: '' };

  // calculate horizontal position
  switch (hAlign) {
    case 'center': {
      style.left = bbox.left + bbox.width / 2 + 'px';
      style.transform += 'translateX(-50%) ';
      break;
    }

    case 'left': {
      style.left = bbox.left + 'px';
      break;
    }

    case 'right': {
      style.right = bbox.right + 'px';
      break;
    }

    default: {
      break;
    }
  }

  // calculate vertical position
  switch (vAlign) {
    case 'center': {
      style.top = bbox.top + bbox.height / 2 + 'px';
      style.transform += 'translateY(-50%) ';
      break;
    }

    case 'top': {
      style.bottom = bbox.bottom + bbox.height + padding + 'px';
      break;
    }

    case 'bottom': {
      style.top = bbox.top + bbox.height + padding + 'px';
      break;
    }

    default: {
      break;
    }
  }

  return style;
};
