import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createLinkForGet from '../misc/createLinkForGet';
import './css/Paginator.css';

class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disablePaginator: false,
    };
    this.disableFirst = this.disableFirst.bind(this);
    this.disableLast = this.disableLast.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   let response = false;
  //   const nextPropsCopy = { ...nextProps };
  //   delete nextPropsCopy.requestParams;
  //   delete nextPropsCopy.result;
  //   // ignoring requestParams and result for component update
  //   const nextPropsCopyKeys = Object.keys(nextPropsCopy);
  //   for (let i = 0; i < nextPropsCopyKeys; i += 1) {
  //     if (nextPropsCopy[nextPropsCopyKeys[i]] !== { ...this.props }[nextPropsCopyKeys[i]]) {
  //       response = true;
  //       break;
  //     }
  //   }
  //   // assumed to never mutate state
  //   if (!response) {
  //     if (nextState !== this.state) {
  //       response = true;
  //     }
  //   }
  //   return response;
  //   // nextPropsCopyKeys.forEach(x => {
  //   //   // if (nextPropsCopy[x] === this.props[x])
  //   // });
  // }

  disableFirst() {
    const { paginator } = this.props;
    const { disablePaginator } = this.state;
    // const { currentPage } = paginator;
    return !!(paginator.currentPage <= 1 || !paginator.currentPage || disablePaginator);
  }

  disableLast() {
    const { paginator } = this.props;
    const { disablePaginator } = this.state;
    // const { currentPage } = paginator;
    return !!(paginator.currentPage >= paginator.maxPage
       || !paginator.currentPage || !paginator.maxPage || disablePaginator
       || paginator.currentPage >= 1000);
  }

  goToPage(page) {
    this.setState({ disablePaginator: true });
    const { startPage, loadedPage, errPage } = this.props;
    // sorry for piece of code named getParams, avoiding es-lint error
    const getParams = () => {
      const { requestParams } = this.props;
      return { ...requestParams };
    };
    const requestParams = getParams();
    requestParams.page = page;
    console.log(requestParams);
    startPage();
    fetch(createLinkForGet('https://api.themoviedb.org/3/discover/movie', requestParams),
      { headers: { Accept: 'application/json' } })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
        throw (new Error(`Response not OK! Response status: ${res.status}: ${res.statusText}`));
      })
      .then((result) => {
        console.log(result);
        loadedPage({ result, requestParams });
        this.setState({ disablePaginator: false });
      })
      .catch((e) => {
        console.log(e);
        errPage();
      });
  }

  render() {
    // const { paginator } = this.props;
    // const { disablePaginator } = this.state;
    const { paginator } = this.props;
    return (
      <div className="outside-paginator">
        <div id="paginator">
          <button
            type="button"
            className="btn btn-outline-dark"
            disabled={this.disableFirst()}
            onClick={() => {
              this.goToPage(1);
            }
            }
          >
            {'<< 1'}
          </button>
          <button
            type="button"
            className="btn btn-outline-dark"
            disabled={this.disableFirst()}
            onClick={() => {
              this.goToPage(Math.min(Math.max((paginator.currentPage - 1), 1),
                paginator.maxPage, 1000));
            }
            }
          >
            {`< ${Math.min(Math.max((paginator.currentPage - 1), 1),
              paginator.maxPage, 1000)}`}
          </button>
          <span>
            {` ${paginator.currentPage} `}
          </span>
          <button
            type="button"
            className="btn btn-outline-dark"
            disabled={this.disableLast()}
            onClick={() => {
              this.goToPage((Math.max(Math.min((paginator.currentPage + 1),
                paginator.maxPage, 1000), 1) || 1));
            }
            }
          >
            {`${(Math.max(Math.min((paginator.currentPage + 1), paginator.maxPage, 1000), 1) || 1)} >`}
          </button>
          <button
            type="button"
            className="btn btn-outline-dark"
            disabled={this.disableLast()}
            onClick={() => {
              this.goToPage((Math.min(paginator.maxPage, 1000) || 1));
            }
            }
          >
            {`${(Math.min(paginator.maxPage, 1000) || 1)} >>`}
          </button>
        </div>
      </div>
    );
  }
}

Paginator.propTypes = {
  // result: PropTypes.instanceOf(Object).isRequired,
  paginator: PropTypes.shape({
    currentPage: PropTypes.number,
    maxPage: PropTypes.number,
  }).isRequired,
  requestParams: PropTypes.instanceOf(Object).isRequired,
  startPage: PropTypes.func.isRequired,
  loadedPage: PropTypes.func.isRequired,
  errPage: PropTypes.func.isRequired,
};

export default Paginator;
