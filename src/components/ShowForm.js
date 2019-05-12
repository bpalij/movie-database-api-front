import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import initYearArray from '../misc/initYearArray';
import sortOptions from '../misc/sortOptions';
import createLinkForGet from '../misc/createLinkForGet';
import createParamsFromState from '../misc/createParamsFromState';
import 'react-input-range/lib/css/index.css';
// import { handleValue, handleSwitch } from '../misc/handlers';
import 'bootstrap/dist/css/bootstrap.css';
import './css/ShowForm.css';


// const handleValue = stateField => (event) => {
//   // const returned = (event) => {
//   const setStateObject = {};
//   setStateObject[stateField] = event.target.value;
//   this.setState(setStateObject);
//   // };
//   // return returned;
// };

const yearsOptions = initYearArray(1850);

class ShowForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      adult: false,
      video: false,
      sort: 'popularity.desc',
      rating: { min: 0, max: 10 },
      votes: { min: 0, max: 25000 },
    };
    this.handleEvent = this.handleEvent.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.search = this.search.bind(this);
  }

  handleEvent(stateField) {
    return (event) => {
      // const returned = (event) => {
      const setStateObject = {};
      setStateObject[stateField] = event.target.value;
      this.setState(setStateObject);
      // };
      // return returned;
    };
  }

  handleValue(stateField) {
    return (value) => {
      // const returned = (event) => {
      const setStateObject = {};
      setStateObject[stateField] = value;
      this.setState(setStateObject);
      // };
      // return returned;
    };
  }

  handleSwitch(stateField) {
    return () => {
      // const returned = () => {
      const setStateObject = {};
      setStateObject[stateField] = !{ ...this.state }[stateField];
      this.setState(setStateObject);
      // };
      // return returned;
    };
  }

  search() {
    const { startQuery, loadedQuery, errQuery } = this.props;
    const requestParams = createParamsFromState({ ...this.state });
    // console.log(requestParams);
    startQuery();
    fetch(createLinkForGet('https://api.themoviedb.org/3/discover/movie', requestParams),
      { headers: { Accept: 'application/json' } })
      .then((res) => {
        // console.log(res);
        if (res.ok) {
          return res.json();
        }
        throw (new Error(`Response not OK! Response status: ${res.status}: ${res.statusText}`));
      })
      .then((result) => {
        // console.log(result);
        loadedQuery({ result, requestParams });
      })
      .catch((/* e */) => {
        // console.log(e);
        errQuery();
      });
  }

  render() {
    const {
      year,
      adult,
      video,
      sort,
      rating,
      votes,
    } = this.state;
    const { disabled } = this.props;
    // const yearHandle = e => this.setState({ year: e.target.value });
    // const { yearsOptions } = this.props;
    // const universalHandle = (stateField) => {
    //   const setStateObject = {};
    //   setStateObject[stateField] = event.target.value;
    //   return event => this.setState(setStateObject);
    // };
    return (
      <form id="main-form">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <div>
                <div>Rating:</div>
                <div className="height-hack" />
                <InputRange
                  minValue={0}
                  maxValue={10}
                  value={rating}
                  step={0.1}
                  formatLabel={value => value.toFixed(1)}
                  allowSameValues={(+'1') === 1}
                  // workaround to avoid errors in es-lint and console
                  onChange={this.handleValue('rating')}
                  onChangeComplete={this.handleValue('rating')}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <div>
                <div>Vote count:</div>
                <div className="height-hack" />
                <InputRange
                  minValue={0}
                  maxValue={25000} // most voted had 21844
                  value={votes}
                  step={100}
                  // formatLabel={value => value.toFixed(1)}
                  allowSameValues={(+'1') === 1}
                  // workaround to avoid errors in es-lint and console
                  onChange={this.handleValue('votes')}
                  onChangeComplete={this.handleValue('votes')}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <label htmlFor="year-select">
                <div>Year:</div>
                <select
                  id="year-select"
                  className="form-control"
                  value={year}
                  onChange={this.handleEvent('year')}
                  onBlur={this.handleEvent('year')}
                  /*
                    onBlur is required by airbnb eslint for accessibility
                    (keyboard-only, screen readers)
                    checked by myself - the keyboard input works without onBlur
                    so probably no real need and it is here only for eslint
                    also using only onBlur and value (not defaultValue) causes unintuitive behaviour
                    in order to be updated, other element must get focused
                    using defaultValue (instead of value) with only onBlur causes another problem
                    I am not sure the state will update before the onCLick button handler starts
                    this can break the correct app work
                  */
                >
                  {yearsOptions.map(option => (
                    <option value={option.value} key={`${option.value}:${option.text}`}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <label htmlFor="adult-button">
                <div className="text-danger">Adult:</div>
                {/*
                  would like use button instead of input
                  button is better for code semantics and understanding
                  but then eslint shows error in label htmlFor if button, not input
                  label should be good for accessability
                */}
                <input
                  id="adult-button"
                  type="button"
                  className={adult ? 'btn btn-success btn-full-width' : 'btn btn-outline-dark btn-full-width'}
                  value={adult ? 'Include' : 'Do not include'}
                  onClick={this.handleSwitch('adult')}
                />
              </label>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <label htmlFor="video-button">
                <div>Video:</div>
                {/*
                  would like use button instead of input
                  button is better for code semantics and understanding
                  but then eslint shows error in label htmlFor if button, not input
                  label should be good for accessability
                */}
                <input
                  id="video-button"
                  type="button"
                  className={video ? 'btn btn-success btn-full-width' : 'btn btn-outline-dark btn-full-width'}
                  value={video ? 'Include' : 'Do not include'}
                  onClick={this.handleSwitch('video')}
                />
              </label>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <label htmlFor="sort-select">
                <div>Sort:</div>
                <select
                  id="sort-select"
                  className="form-control"
                  value={sort}
                  onChange={this.handleEvent('sort')}
                  onBlur={this.handleEvent('sort')}
                  /*
                    onBlur is required by airbnb eslint for accessibility
                    (keyboard-only, screen readers)
                    checked by myself - the keyboard input works without onBlur
                    so probably no real need and it is here only for eslint
                    also using only onBlur and value (not defaultValue) causes unintuitive behaviour
                    in order to be updated, other element must get focused
                    using defaultValue (instead of value) with only onBlur causes another problem
                    I am not sure the state will update before the onCLick button handler starts
                    this can break the correct app work
                  */
                >
                  {sortOptions.map(option => (
                    <option value={option.value} key={`${option.value}:${option.text}`}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="col-0 col-sm-6 col-md-8" />
            <div className="col-12 col-sm-6 col-md-4">
              <button
                type="button"
                className="btn btn-primary btn-full-width"
                disabled={disabled}
                onClick={this.search}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

ShowForm.propTypes = {
  // yearsOptions: PropTypes.arrayOf(PropTypes.shape({
  //   value: PropTypes.string.isRequired,
  //   text: PropTypes.string.isRequired,
  // })),
  disabled: PropTypes.bool.isRequired,
  // requestParams: PropTypes.instanceOf(Object).isRequired,
  startQuery: PropTypes.func.isRequired,
  loadedQuery: PropTypes.func.isRequired,
  errQuery: PropTypes.func.isRequired,
};

ShowForm.defaultProps = {
  // yearsOptions: initYearArray(1850),
};

export default ShowForm;
