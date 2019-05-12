import React from 'react';
import PropTypes from 'prop-types';
import ResultItem from './ResultItem';

function ShowResults(props) {
  const { results, mute, conf } = props;
  return (
    <div className={mute ? 'text-muted' : ''}>
      {results.map(x => (
        <ResultItem
          posterPath={`${conf.secure_base_url}${conf.poster_sizes[(conf.poster_sizes.length - 1)]}${x.poster_path}`}
          title={x.title}
          originalTitle={x.original_title}
          adult={x.adult}
          video={x.video}
          rating={x.vote_average}
          votes={x.vote_count}
          overview={x.overview}
          key={`${x.title} ${x.original_title}`}
        />
      ))}
    </div>
  );
}

ShowResults.propTypes = {
  // result: PropTypes.shape({
  //   page: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.number,
  //   ]).isRequired,
  //   total_pages: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.number,
  //   ]).isRequired,
  //   total_results: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.number,
  //   ]).isRequired,
  //   results: PropTypes.arrayOf(PropTypes.object).isRequired,
  // }).isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  mute: PropTypes.bool.isRequired,
  conf: PropTypes.shape({
    base_url: PropTypes.string.isRequired,
    secure_base_url: PropTypes.string.isRequired,
    backdrop_sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    logo_sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    poster_sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    profile_sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    still_sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ShowResults;
