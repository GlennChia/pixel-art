import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

class SketchPickerCustom extends Component {
  render() {
    return (
      <SketchPicker
        color={ this.props.selectedColor }
        onChangeComplete={ this.props.handleChangeComplete }
        presetColors={ [] }
        disableAlpha={ true }
      />
    );
  }
}

export default SketchPickerCustom;