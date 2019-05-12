import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import './css/ResultItem.css';

function ResultItem(props) {
  const {
    posterPath,
    title,
    originalTitle,
    adult,
    video,
    rating,
    votes,
    overview,
  } = props;
  return (
    <article className="item">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4">
            <img
              className="poster"
              src={posterPath}
              alt={`${title} poster`}
            />
          </div>
          <div className="col-12 col-sm-6 col-md-8">
            <section><b className="em2">{title}</b></section>
            <section><b className="em1-5"><em>{originalTitle}</em></b></section>
            {adult && (
              <section><b className="text-danger">Adult</b></section>
            )}
            {video && (
              <section><b>Video</b></section>
            )}
            <section>
              {/* avoiding es-lint error */}
              <span>Rating: </span>
              <em>{rating}</em>
              {/* <span>(</span> */}
              <em>{`(${votes} votes)`}</em>
              {/* <span> votes)</span> */}
            </section>
            <section><em>{overview}</em></section>
          </div>
        </div>
      </div>
    </article>
  );
}

ResultItem.propTypes = {
  posterPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  originalTitle: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  adult: PropTypes.bool.isRequired,
  video: PropTypes.bool.isRequired,
  rating: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.number,
  ]).isRequired,
  votes: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.number,
  ]).isRequired,
};

export default ResultItem;
