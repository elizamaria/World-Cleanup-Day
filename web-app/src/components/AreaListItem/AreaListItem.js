import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import _ from 'lodash';
import FlagIcon from 'react-flag-kit/lib/FlagIcon';
import { COUNTRIES_HASH } from '../../shared/countries';
import { getCountryFromStr } from '../../shared/helpers';

class AreaListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  getToggleStyle = () => {
    const { area } = this.props;
    const hasChildren = area.children && area.children.length > 0;
    if (hasChildren) {
      return { cursor: 'pointer' };
    }
    return {};
  };

  handleCollapseToggleClick = () => {
    if (!this.props.area.children || this.props.area.children.length === 0) {
      return;
    }
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  renderRightLabel = () => {
    const { area, rightLabel } = this.props;
    if (rightLabel) {
      if (_.isFunction(rightLabel)) {
        return rightLabel(area);
      }
      return rightLabel;
    }
    if (!area || !area.trashCount) {
      return 'View';
    }
    return String(area.trashCount);
  };

  render() {
    const { onClick, onBodyClick, area, match } = this.props;
    const hasChildren = area.children && area.children.length > 0;
    const isUserAreas = match && match.path && match.path === '/user-areas';
    let areaName = area.name;
    let areaId;
    const arrayOfDeprecatedIds = ['AN', 'SH', 'EH', 'AQ', '-'];
    if (arrayOfDeprecatedIds.indexOf(area.id) !== -1) {
      areaId = 'WW';
    } else {
      areaId = area.id;
    }
    if (isUserAreas) {
      const name = COUNTRIES_HASH[getCountryFromStr(area.parentId ? area.parentId : area.id)];
      if (name) {
        areaName = name;
      }
    }

    return (
      <div
        className="AreaListItem"
        onClick={
          onBodyClick ?
          () => onBodyClick(area) :
          null
        }
      >
        <div
          onClick={this.handleCollapseToggleClick}
          className="AreaListItem-plot"
          style={this.getToggleStyle()}
        >
          <div
            className="AreaListItem-left-padding"
            style={{ width: this.props.leftPadding }}
          />
          {/*
          <div className="AreaListItem-collapse-toggle">

            hasChildren &&
            <div
              className=
                this.state.isOpen
                  ? 'AreaListItem-triangle-up'
                  : 'AreaListItem-triangle-down'
            />
          </div>
          */}
          <FlagIcon code={areaId} size={40} />
          <div className="AreaListItem-text-container">
            <span
              className="AreaListItem-header"
            >
              {areaName}
            </span>
          </div>
          {
            onClick &&
            <div
              onClick={() => onClick(area)}
              className="AreaListItem-trashlist-button"
            >
              {this.renderRightLabel()}
            </div>
          }
        </div>
      </div>
    );
  }
}

AreaListItem.defaultProps = {
  leftPadding: 0,
  rightLabel: undefined,
};

AreaListItem.propTypes = {
  onClick: PropTypes.func,
  onBodyClick: PropTypes.func,
  area: PropTypes.any.isRequired,
  index: PropTypes.number.isRequired,
  leftPadding: PropTypes.number,
  rightLabel: PropTypes.any,
};

AreaListItem.defaultProps = {
  onClick: null,
  onBodyClick: null,
};

export default AreaListItem;

/*
hasChildren && !isUserAreas &&
<Collapse isOpened={this.state.isOpen}>
{area.children.map((a, i) =>
  (<AreaListItem
    leftPadding={this.props.leftPadding + 10}
    rightLabel={this.props.rightLabel}
    key={a.id}
    index={i + 1}
    area={a}
    onClick={onClick}
  />),
)}
</Collapse>
*/
