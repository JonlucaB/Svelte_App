// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
export class AnimeCard {
	animeTitle: String;
	imgurl: String;
	//rating?
	//release date?
	//Popularity?

	constructor(title: String, url: String) {
		this.animeTitle = title;
		this.imgurl = url;
	}

	display() {
		return "we are displaying the anime";
	}

	getTitle() {
		return this.animeTitle;
	}
}

export async function fetchAnime(search: String) {
	let source = 'https://graphql.anilist.co';

	let variables = {
		search: search
	}
	// let query = `query {
 
	// 	Media(search:"Cowboy Bebop") {
	// 	  title {
	// 		romaji
	// 		english
	// 		native
	// 		userPreferred
	// 	  }
	// 	} 
	// 	}`

	let query = `
	query($search: String) {              
		Media(search: $search, type: ANIME, sort: SCORE_DESC) {
			title {
				english
			}
			averageScore
			siteUrl
			coverImage {
				medium
			}
		}
	}`;
		
		// recommendations(sort: RATING_DESC, page: 1, perPage: 20) {
		// 	edges {
		// 		node {
		// 			id
		// 		}
		// 	}
		// }
	//let query = "";
	const response = await window.fetch(source, {
		method: 'POST',
		headers: {
		  'content-type': 'application/json;charset=UTF-8',
		  'Accept': 'application/json',
		},
		body: JSON.stringify({
		  query: query,
		  variables: variables,
		}),
	  })
	
	  const {data, errors} = await response.json()

	  if(response.ok) return data;
	  else return errors;
	//   if (response.ok) {
	// 	const anime = data?.Media;
	// 	if (anime) {
	// 	  // add fetchedAt helper (used in the UI to help differentiate requests)
	// 	  return anime;
	// 	} else {
	// 	  return Promise.reject(new Error(`No anime with the title "${title}"`))
	// 	}
	//   } else {
	// 	// handle the graphql errors
	// 	const error = new Error(errors?.map((e => e.message)?? 'unknown'))
	// 	return Promise.reject(errors)
	//   }
}