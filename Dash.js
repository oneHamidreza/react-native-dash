/*
* Draws fully customizable dashed lines vertically or horizontally
*
* @providesModule Dash
*/

import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet} from 'react-native'
import MeasureMeHOC from 'react-native-measureme'
import {getDashStyle, isStyleRow} from '../util'

const Dash = (
  {
    width,
    height,
    dashGap = 2,
    dashLength = 4,
    dashThickness = 2,
    dashColor = 'black',
    dashStyle,
    style,
    ...props
  }) => {
  const isRow = isStyleRow(style)
  const length = isRow ? width : height
  const n = Math.ceil(length / (dashGap + dashLength))
  const calculatedDashStyles = getDashStyle({dashGap, dashLength, dashThickness, dashColor, style})
  let dash = []
  for (let i = 0; i < n; i++) {
    dash.push(
      <View
        key={i}
        style={[
          calculatedDashStyles,
          dashStyle,
        ]}
      />
    )
  }
  return (
    <View
      style={[style, isRow ? styles.row : styles.column]}
      {...props}
    >
      {dash}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row'},
  column: {flexDirection: 'column'},
})

Dash.propTypes = {
  style: PropTypes.any,
  dashGap: PropTypes.number.isRequired,
  dashLength: PropTypes.number.isRequired,
  dashThickness: PropTypes.number.isRequired,
  dashColor: PropTypes.string,
  dashStyle: PropTypes.any,
}

export default MeasureMeHOC(Dash)
