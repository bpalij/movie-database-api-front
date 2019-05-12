import React, { Component } from 'react';
import './css/ReduxApp.css';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import initYearArray from '../misc/initYearArray';
// import { getConf, errConf } from '../redux/actions';
// changed that approach to '* as' to avoid eslint error
import * as dispatches from '../redux/actions';
import LoadForm from './LoadForm';
import ShowForm from './ShowForm';
import ErrorForm from './ErrorForm';
import SpecifySearch from './SpecifySearch';
import LoadResult from './LoadResult';
import ErrorResult from './ErrorResult';
import Paginator from './Paginator';
import store from '../redux/store';

// const yearsOptions = initYearArray(1850);


class ReduxApp extends Component {
  componentDidMount() {
    const { getConf, errConf } = this.props;
    fetch(`https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`,
      { headers: { Accept: 'application/json' } })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw (new Error(`Response not OK! Response status: ${res.status}: ${res.statusText}`));
      })
      .then(data => getConf(data.images))
      .catch(() => errConf());
  }

  render() {
    const {
      showHide,
      conf,
      startQuery,
      requestParams,
      loadedQuery,
      errQuery,
      paginator,
      startPage,
      loadedPage,
      errPage,
      // result,
    } = this.props;
    return (
      <div>
        <div className="not-footer-full-height">
          <div className="container">
            <header>
              {showHide.loadForm && <LoadForm />}
              {showHide.showForm && (
                <ShowForm
                  disabled={showHide.disableForm}
                  conf={conf}
                  startQuery={startQuery}
                  // requestParams={requestParams}
                  loadedQuery={loadedQuery}
                  errQuery={errQuery}
                />
              )}
              {showHide.errorForm && <ErrorForm />}
            </header>
            {showHide.showParams && (<div>Params placeholder</div>)}
            <main>
              {showHide.specifySearch && <SpecifySearch />}
              {showHide.loadResult && <LoadResult />}
              {showHide.showResult && (<div>Result placeholder</div>)}
              {showHide.errorResult && <ErrorResult />}
            </main>
            <nav>
              {showHide.showPagination && (
              <Paginator
                paginator={paginator}
                requestParams={requestParams}
                startPage={startPage}
                loadedPage={loadedPage}
                errPage={errPage}
              />
              )}
            </nav>
          </div>
        </div>
        <footer id="footer" className="bg-primary">
          Palii Bohdan
        </footer>
      </div>

    );
  }
}

ReduxApp.propTypes = {
  showHide: PropTypes.shape({
    loadForm: PropTypes.bool.isRequired,
    showForm: PropTypes.bool.isRequired,
    errorForm: PropTypes.bool.isRequired,
    disableForm: PropTypes.bool.isRequired,
    showParams: PropTypes.bool.isRequired,
    specifySearch: PropTypes.bool.isRequired,
    loadResult: PropTypes.bool.isRequired,
    showResult: PropTypes.bool.isRequired,
    errorResult: PropTypes.bool.isRequired,
    showPagination: PropTypes.bool.isRequired,
    // disablePagination: PropTypes.bool.isRequired,
  }).isRequired,
  conf: PropTypes.instanceOf(Object).isRequired,
  paginator: PropTypes.shape({
    currentPage: PropTypes.number,
    maxPage: PropTypes.number,
  }).isRequired,
  // result: PropTypes.instanceOf(Object).isRequired,
  requestParams: PropTypes.instanceOf(Object).isRequired,
  getConf: PropTypes.func.isRequired,
  errConf: PropTypes.func.isRequired,
  startQuery: PropTypes.func.isRequired,
  loadedQuery: PropTypes.func.isRequired,
  errQuery: PropTypes.func.isRequired,
  startPage: PropTypes.func.isRequired,
  loadedPage: PropTypes.func.isRequired,
  errPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  showHide: state.showHide,
  conf: state.conf,
  requestParams: state.requestParams,
  paginator: state.paginator,
  result: store.result,
});

const mapDispatchToProps = (dispatch) => {
  const {
    getConf,
    errConf,
    startQuery,
    loadedQuery,
    errQuery,
    startPage,
    loadedPage,
    errPage,
  } = dispatches;
  return {
    getConf: data => dispatch(getConf(data)),
    errConf: e => dispatch(errConf(e)),
    startQuery: state => dispatch(startQuery(state)),
    loadedQuery: data => dispatch(loadedQuery(data)),
    errQuery: () => dispatch(errQuery()),
    startPage: state => dispatch(startPage(state)),
    loadedPage: data => dispatch(loadedPage(data)),
    errPage: () => dispatch(errPage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxApp);
