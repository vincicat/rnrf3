import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ViewPropTypes as NewViewPropTypes } from 'react-native';
import StaticContainer from 'react-static-container';
var ViewPropTypes;
if (NewViewPropTypes) {
  ViewPropTypes = NewViewPropTypes;
} else {
  ViewPropTypes = View.propTypes;
}
const styles = StyleSheet.create({
  scene: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

class TabbedView extends Component {

  static propTypes = {
    navigationState: PropTypes.object.isRequired,
    renderScene: PropTypes.func.isRequired,
    style: ViewPropTypes.style,
  };

  constructor(props, context) {
    super(props, context);
    this.renderedSceneKeys = {};
    this.renderScene = this.renderScene.bind(this);
  }

  renderScene(navigationState, index) {
    const isSelected = index === this.props.navigationState.index;
    return (
      <View
        key={navigationState.key}
        pointerEvents={isSelected ? 'auto' : 'none'}
        removeClippedSubviews={!isSelected}
        importantForAccessibility={isSelected ? 'yes' : 'no-hide-descendants'}
        style={[
          styles.scene,
          { opacity: isSelected ? 1 : 0 },
        ]}
      >
        <StaticContainer shouldUpdate={isSelected}>
          {this.props.renderScene(navigationState, index)}
        </StaticContainer>
      </View>
    );
  }

  render() {
    const scenes = [];
    const { index, children } = this.props.navigationState;
    children.forEach((item, i) => {
      const key = item.key;
      if (i !== index && !this.renderedSceneKeys[key]) {
        return;
      }
      this.renderedSceneKeys[key] = true;
      scenes.push(this.renderScene(item, i));
    });
    return (
      <View style={this.props.style}>
        {scenes}
      </View>
    );
  }

}

export default TabbedView;
