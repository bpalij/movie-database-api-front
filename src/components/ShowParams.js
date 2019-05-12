import React from 'react';
import PropTypes from 'prop-types';
import sortOptions from '../misc/sortOptions';
import 'bootstrap/dist/css/bootstrap.css';

const sortObj = {};
sortOptions.forEach((x) => {
  sortObj[x.value] = x.text;
});

function ShowParams(props) {
  const { requestParams, result, mute } = props;
  // console.log(requestParams);
  // making such a retarded markup to avoid es-lint errors
  return (
    <article className={mute ? 'text-muted' : ''}>
      {/* <strong>Your search: </strong> */}
      <strong>Rating: </strong>
      <span>from </span>
      <strong>{+(requestParams['vote_average.gte']).toFixed(2)}</strong>
      <span> to </span>
      <strong>{+(requestParams['vote_average.lte']).toFixed(2)}</strong>
      <span>; </span>
      <strong>Vote count: </strong>
      <span>from </span>
      <strong>{requestParams['vote_count.gte']}</strong>
      <span> to </span>
      <strong>{requestParams['vote_count.lte']}</strong>
      <span>; </span>
      {requestParams.include_adult && (<strong className="text-danger">Adult included; </strong>)}
      {requestParams.include_video && (<strong>Videos included; </strong>)}
      {requestParams.year && (
      <span>
        <span>Year: </span>
        <strong>{requestParams.year}</strong>
        <span>; </span>
      </span>
      )}
      <span>Sort: </span>
      <strong>
        {sortObj[requestParams.sort_by]}
        .
      </strong>
      <div>
        <span>Total results: </span>
        <strong>{result.total_results}</strong>
        <span>; Total pages: </span>
        <strong>{result.total_pages}</strong>
        <span>; Your page: </span>
        <strong>
          {result.page}
          .
        </strong>
      </div>
      {(result.total_pages > 1000) && (
        <div>
          <strong>Only first 1000 pages are available due to server-side API limitations.</strong>
        </div>
      )}
    </article>
  );
}

ShowParams.propTypes = {
  requestParams: PropTypes.instanceOf(Object).isRequired,
  result: PropTypes.shape({
    page: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    total_pages: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    total_results: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  mute: PropTypes.bool.isRequired,
};

export default ShowParams;
