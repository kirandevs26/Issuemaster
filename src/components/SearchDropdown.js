import React from "react";
import PropTypes from 'prop-types';
// import './IssueDetails';
import "./SearchDropdown.css";

class SearchComponent extends React.Component {
    state = {
      searchTerm: "",
      selectedObj: "",
      listActive: false
    };

    componentDidMount(){
      let {options, value, defaultValue} = this.props;
      if(value || defaultValue){
        const selectedObj = this.getSelectedOption(options, defaultValue || value);
        this.setState({selectedObj});
      }
    }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (true) {
      return nextProps.value;
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps) {
    let { options, value, } = this.props;
    if (value !== prevProps.value) {
      const selectedObj = this.getSelectedOption(options, value);
      this.setState({ selectedObj });
    }
  }

  getSelectedOption = (options, value) => {
      const selectedObj = options.find(item => item.value === value);
      return selectedObj;
  }  

  toggleList = () => {
    this.setState({ listActive: !this.state.listActive });
  }

  handleChangeInput = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        this.handleFilter(this.props.options[0]);
    }
  }

  handleClose = () => {
    this.props.closeSelection && this.props.closeSelection()
  }

  handleFilter = (option) => {
    let stateToUpdate = { selectedObj: option, searchTerm: '', listActive: false };
    this.setState(stateToUpdate, () => {
      this.props.onChange(option);
    });
  }

  onFocusSearch = (e) => {
      this.setState({ listActive: true })
  }

  onBlurSearch = (e) => {
      this.setState({ listActive: false })
  }

  renderList = () => {
    let list;
    const { listActive, searchTerm, selectedObj } = this.state;
    const {options} = this.props;
    const filteredOptions = options.filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()))
    if (filteredOptions.length && listActive) {
     list = (
        <div className="psDropdown active">
          {
            filteredOptions.map((option, i) => {
              const selected = selectedObj&& selectedObj.value === option.value;
              return (
                <label
                  htmlFor={option}
                  className={`psLabel ${(selected || i==0) ? 'selected' : ''}`}
                  style={{ "textTransform": this.props.textStyle }}
                  key={option.value}
                  data-value={i}
                  onMouseDown={() => this.handleFilter(option)} >
                  {option.label}
                </label>
              );
            })
          }
        </div>
      );
    } else if (listActive && filteredOptions.length === 0) {
      list = <div className="psDropdown active"><label className="psLabel">No records found</label></div>;
    } else {
      list = <div className="psDropdown" />
    }
    return list;
  }

  render() {
    const {
      placeholder,
      autoFocus,
      loading
    } = this.props;
    const {listActive, searchTerm, selectedObj} = this.state;
    let { textStyle } = this.props;
    const value = listActive ? searchTerm : selectedObj ? selectedObj.label : searchTerm || '';
    return (
      <div className="clear">
        <fieldset className="search_dropdown pfSelect">
          <input type="text" name="search-dropdown"
            className={"Search term "}
            onBlur={this.onBlurSearch}
            onFocus={this.onFocusSearch}
            autoFocus={autoFocus}
            style={{ "textTransform": textStyle }}
            value={value}
            placeholder={placeholder}
            onChange={this.handleChangeInput}
            onKeyPress={this.handleKeyPress}
          />
          {/* <span className={`motif-icon-text blue ${loading ? 'motif-circle-notch' : 'motif-search-1'}`}/> */}
          {this.renderList()}
        </fieldset>
      </div>
    );
  }
};


// ********************************* Props documentation ****************************
SearchComponent.propTypes = {
  //Options to be passed to component to select
  options: PropTypes.arrayOf({
    label: PropTypes.oneOf([
      PropTypes.string, PropTypes.number
    ]),
    value: PropTypes.oneOf([
      PropTypes.string, PropTypes.number
    ])
  }),

  // A function that triggers when select the option
  onChange: PropTypes.func,

  // value of the drodown 
  value: PropTypes.string,

  // defalut selection value of the option in dropdown
  defaultValue: PropTypes.string,

  // A booelan that decides autofocus of input
  autoFocus: PropTypes.bool,

  // A boolean that decides search icon to show
  showSearchIcon: PropTypes.bool,

  // A number which we can initiate search Process
  maxCharLength: PropTypes.number,  //TODO: need to implement min char search

  // Textstyle for options
  textStyle: PropTypes.string
}

SearchComponent.defaultProps = {
  options: [],
  onChange: ()=>{},
  value: '',
  defaultValue: '',
  autoFocus: false,
  showSearchIcon: false,
  maxCharLength: 3,
  textStyle: "capitalize"
}
export default SearchComponent;
