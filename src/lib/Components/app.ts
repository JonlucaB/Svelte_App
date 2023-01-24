// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
export const requestOneAnime = new Object();
export const requestReccomendedAnime = new Object();

export class AnimeCard {
	animeTitle: string;
	imgurl: string;
	//rating?
	//release date?
	//Popularity?

	constructor(title = "", url = "") {
		this.animeTitle = title;
		this.imgurl = url;
	}

	display() {
		return "we are displaying the anime";
	}
	
	getTitle(): string {
		return this.animeTitle;
	}
}

// export function getSingleAnime(search: String, option: Object) {
// 	return fetchAnime(search, option).then(e => e.data.Media).then(r => {
// 		new AnimeCard(r.title.english, r.coverImage)});
// }

function getUserReccomendations(ids = Array<number>) {

}

export async function fetchAnime(search: String, option: Object, id: Number) {
	let source = 'https://graphql.anilist.co';

	let variables = {
		search: search,
		id: id,
	}

	const data = await window.fetch(source, {
		method: 'POST',
		headers: {
		  'content-type': 'application/json;charset=UTF-8',
		  'Accept': 'application/json',
		},
		body: JSON.stringify({
		  query: (option == requestOneAnime) ? userAnimeQuery : userReccomendationQuery,
		  variables: variables,
		}),
	  }).then(handleResponse)
	return data;
}

function handleResponse(response: Response) {
	return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

//for when the user inputs their anime title they like
const userAnimeQuery = `
query($search: String) {              
	Media(search: $search, type: ANIME, sort: SCORE_DESC) {
		title {
			english
		}
		siteUrl
		coverImage {
			medium
		}
		recommendations(sort: RATING_DESC, page: 1, perPage: 20) {
			edges {
				node {
					id
					rating
				}
			}
		}
	}
}`;

//for when we need to request all the info about the reccomended animes we have for the use 
//all we have is ID for this one
const userReccomendationQuery = `
query($id: Int) {              
	Media(id: $id, type: ANIME, sort: SCORE_DESC) {
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