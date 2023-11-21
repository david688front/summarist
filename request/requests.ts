const BASE_URL = `https://us-central1-summaristt.cloudfunctions.net/getBooks?`;
const BASE_URL_BOOK = `https://us-central1-summaristt.cloudfunctions.net/getBook?`;
const BASE_URL_SEARCH_BOOK = `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?`;
const requests = {
  fetchSelectedBook: `${BASE_URL}status=selected`,
  fetchRecommendedBooks: `${BASE_URL}status=recommended`,
  fetchSuggestedBooks: `${BASE_URL}status=suggested`,
  fetchBook: (id: string) => `${BASE_URL_BOOK}id=${id}`,
  fetchSearchBook: (search: string) => `${BASE_URL_SEARCH_BOOK}search=${search}`,
};
export default requests;