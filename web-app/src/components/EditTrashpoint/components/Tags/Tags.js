import React from 'react';
import { If } from 'react-if';
import PropTypes from 'prop-types';

import Tag from './Tag';

class Tags extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTag: '',
    };
  }
  handleTagChange = ev => {
    this.setState({
      newTag: ev.target.value,
    });
  };
  handleTagAdd = () => {
    if (!this.state.newTag) {
      return;
    }
    const newTag = `#${this.state.newTag.replace(/[^0-9a-z]/gi, '')}`;
    const hashtagAlreadyExists = this.props.tags.find(
      hashtag => hashtag.label === newTag,
    );
    if (hashtagAlreadyExists) {
      return;
    }

    this.props.onTagAdd(newTag);
    this.setState({
      newTag: '',
    });
  };
  render() {
    const {
      composition,
      tags,
      onTagSelect,
      onTagAdd,
      onTagDelete,
      header,
    } = this.props;
    return (
      <div className="Tags-container">
        <span className="Tags-title">{ header }</span>
        <div className="Tags-Composition-container">
          {composition.map(tag =>
            (<Tag
              key={tag.label}
              selected={tag.selected}
              label={tag.label}
              onSelect={() => onTagSelect(tag)}
            />),
          )}
        </div>
        <If condition={tags.length > 0}>
          <div className="Tags-title">Additionally selected tags</div>
        </If>
        <If condition={!!onTagAdd}>
          <div className="Tags-custom-container">
            {tags.map((tag) =>
              (<Tag
                key={tag.label}
                label={tag.label}
                selected
                onDelete={() => onTagDelete(tag)}
              />),
            )}
          </div>
        </If>
        <If condition={!!onTagAdd}>
          <div className="Tags-add-container">
            <input
              className="Tags-add-input"
              value={this.state.newTag}
              onChange={this.handleTagChange}
              type="text"
              placeholder="ie. #brandname, #cans"
            />
            <div onClick={this.handleTagAdd} className="Tags-add-button">
              <p className="Tags-add-button-text">Add tag</p>
            </div>
          </div>
        </If>
      </div>
    );
  }
}

Tags.propTypes = {
  composition: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool,
    }),
  ).isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool,
    }),
  ).isRequired,
  onTagSelect: PropTypes.func.isRequired,
  onTagAdd: PropTypes.func,
  onTagDelete: PropTypes.func,
  header: PropTypes.string.isRequired,
};

Tags.defaultProps = {
  onTagAdd: null,
  onTagDelete: null,
};

export default Tags;
