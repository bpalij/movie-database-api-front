export default function (state) {
  const requestParams = {
    api_key: process.env.REACT_APP_MOVIE_API_KEY,
    language: 'en-US',
    page: 1,
    sort_by: state.sort,
    include_adult: state.adult,
    include_video: state.video,
    'vote_count.gte': state.votes.min,
    'vote_count.lte': state.votes.max,
    'vote_average.gte': state.rating.min,
    'vote_average.lte': state.rating.max,
  };
  if (state.year) { requestParams.year = state.year; }
  return requestParams;
}
