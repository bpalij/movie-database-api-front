import React, { Component } from 'react';
import './ReduxApp.css';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getConf, errConf } from '../redux/actions';
import LoadForm from './LoadForm';
import ErrorForm from './ErrorForm';
import SpecifySearch from './SpecifySearch';
import LoadResult from './LoadResult';
import ErrorResult from './ErrorResult';


class ReduxApp extends Component {
  componentDidMount() {
    // bypass es-lint error
    // I must use functions connected with mapDispatchToProps, not the imported
    // eslint-disable-next-line no-shadow
    const { getConf, errConf } = this.props;
    fetch(`https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`,
      { headers: { Accept: 'application/json' } })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw (new Error(`Response not OK! Response status: ${res.status}: ${res.statusText}`));
      })
      .then(data => getConf(data))
      .catch(() => errConf());
  }

  render() {
    const { showHide } = this.props;
    return (
      <div>
        <div className="not-footer-full-height container">
          <header>
            {showHide.loadForm && <LoadForm />}
            {showHide.showForm && (<div>form placeholder</div>)}
            {showHide.errorForm && <ErrorForm />}
          </header>
          <main>
            {showHide.specifySearch && <SpecifySearch />}
            {showHide.loadResult && <LoadResult />}
            {showHide.showResult && (<div>Result placeholder</div>)}
            {showHide.errorResult && <ErrorResult />}
          </main>
          <nav>
            {showHide.showPagination && (<div>Pagination placeholder</div>)}
          </nav>
        </div>
        <footer className="bg-primary">
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
    specifySearch: PropTypes.bool.isRequired,
    loadResult: PropTypes.bool.isRequired,
    showResult: PropTypes.bool.isRequired,
    errorResult: PropTypes.bool.isRequired,
    showPagination: PropTypes.bool.isRequired,
    disablePagination: PropTypes.bool.isRequired,
  }).isRequired,
  getConf: PropTypes.func.isRequired,
  errConf: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  showHide: state.showHide,
});

const mapDispatchToProps = dispatch => ({
  getConf: data => dispatch(getConf(data)),
  errConf: e => dispatch(errConf(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxApp);
