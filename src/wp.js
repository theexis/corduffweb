class wp {

  static fetchPage(pageId) {
    return fetch(`http://corduffweb.azurewebsites.net/wp-json/wp/v2/pages/${pageId}`)
  }

  static fetchPosts(catId, perPage) {
    return fetch(`http://corduffweb.azurewebsites.net/wp-json/wp/v2/posts?categories=${catId}&per_page=${perPage}`);
  }
}

export default wp;