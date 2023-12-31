import React from 'react';
import { Marker as LeafletMarker } from 'leaflet';
import { LeafletProvider } from '@react-leaflet/core';
import 'leaflet-rotatedmarker';
import { MapContainer, withLeaflet } from 'react-leaflet';

class RotatedMarker extends React.Component {
  static defaultProps = {
    rotationOrigin: 'center'
  };
  componentDidUpdate(prevProps) {
    const {
      position,
      icon,
      zIndexOffset,
      opacity,
      draggable,
      rotationAngle,
      rotationOrigin
    } = this.props;
    const {
      position: prevPosition,
      icon: prevIcon,
      zIndexOffset: prevZIndexOffset,
      opacity: prevOpacity,
      draggable: prevDraggable,
      rotationAngle: prevRotationAngle,
      rotationOrigin: prevRotationOrigin
    } = prevProps;

    if (this.leafletElement) {
      if (
        position !== prevPosition ||
        icon !== prevIcon ||
        zIndexOffset !== prevZIndexOffset ||
        opacity !== prevOpacity ||
        draggable !== prevDraggable ||
        rotationAngle !== prevRotationAngle ||
        rotationOrigin !== prevRotationOrigin
      ) {
        this.updateLeafletElement(prevProps, this.props);
      }
    }
  }
  createLeafletElement(props) {
    const el = new LeafletMarker(props.position, this.getOptions(props));
    this.contextValue = { ...props.leaflet, popupContainer: el };
    return el;
  }

  updateLeafletElement(fromProps, toProps) {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setLatLng(toProps.position);
    }
    if (toProps.icon !== fromProps.icon) {
      this.leafletElement.setIcon(toProps.icon);
    }
    if (toProps.zIndexOffset !== fromProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(toProps.zIndexOffset);
    }
    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity);
    }
    if (toProps.draggable !== fromProps.draggable) {
      if (toProps.draggable === true) {
        this.leafletElement.dragging.enable();
      } else {
        this.leafletElement.dragging.disable();
      }
    }
    if (toProps.rotationAngle !== fromProps.rotationAngle) {
      this.leafletElement.setRotationAngle(toProps.rotationAngle);
    }
    if (toProps.rotationOrigin !== fromProps.rotationOrigin) {
      this.leafletElement.setRotationOrigin(toProps.rotationOrigin);
    }
  }

  render() {
    const { children } = this.props;
    return children == null || this.contextValue == null ? null : (
      <LeafletProvider value={this.contextValue}>{children}</LeafletProvider>
    );
  }
}

export default RotatedMarker;
