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

	display(): Element {
		const card = document.createElement('card');

		card.innerHTML = `
			<div class='card'>
				<h1>${this.animeTitle}</h1>
				<img src=${this.imgurl} class="img-fluid img-center img-round img-featured" data-v-0f11a864=""/>
				<a href= class="button">See More</a>
			</div>`

		return card;
	}
	
	getTitle(): string {
		return this.animeTitle;
	}

	getImgUrl(): string {
		return this.imgurl;
	}
}

function getUserReccomendations(ids = Array<number>) {

}

export async function fetchAnime(search: String, option: Object, id: Number): Promise<AnimeCard> {
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
	  }).then(handleResponse).then(function (data) {
            console.log(data)
            return new AnimeCard(data.data.Media.title.english, data.data.Media.coverImage.medium)}).catch(function (error) {
                console.log("There was an error in fetching the anime Title: "+search+" ID: "+id);
                console.log(error);
                return new AnimeCard("No Anime Found :(", "https://www.cambridge.org/elt/blog/wp-content/uploads/2019/07/Sad-Face-Emoji.png")
	  })
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