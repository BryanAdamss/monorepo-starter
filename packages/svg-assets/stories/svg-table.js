/**
 * @author GuangHui
 * @description svg表格
 */

// eslint-disable-next-line
import React from 'react'

import svgList from '../src'

export const SvgComp = ({ svgId }) => (
<svg aria-hidden="true" version="1.1" style={{ width: '20px', height: '20px', display: 'inline-block' }}>
  <use xlinkHref={svgId} />
</svg>
)

export default () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {
      svgList.map(name => {
        return (
          <div key={name} title={name} style={{
            textAlign: 'center',
            padding: '6px 4px',
            border: '1px solid #ccc',
            marginLeft: '4px',
            width: '60px',
            height: '60px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box',
            justifyContent: 'center'
          }}>
            <SvgComp svgId={`#hw-${name}`} ></SvgComp>
            <p style={{
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              fontSize: '14px',
              margin: 0,
              width: '100%'
            }}>{name}</p>
          </div>
        )
      })
      }
    </div>
  )
}
