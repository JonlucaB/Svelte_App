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

export async function fetchAnime(title: String) {
	let source = 'https://graphql.anilist.co';
	var { graphql, buildSchema } = require('graphql');

	let query = `
	query = type Query {              
		Media(type: ANIME, sort: SCORE_DESC) {
			title {
				english
			}
			averageScore
			siteUrl
			coverImage {
				medium
			}
			recommendations(sort: RATING_DESC, page: 1, perPage: 20) {
				edges {
					node {
						id
					}
				}
			}
		}
	`;
	const response = await window.fetch(source, {
		method: 'POST',
		headers: {
		  'content-type': 'application/json;charset=UTF-8',
		},
		body: JSON.stringify({
		  query: query,
		  variables: {name: title.toLowerCase()},
		}),
	  })
	
	  const {data, errors} = await response.json()

	  if (response.ok) {
		const anime = data?.Media;
		if (anime) {
		  // add fetchedAt helper (used in the UI to help differentiate requests)
		  return anime;
		} else {
		  return Promise.reject(new Error(`No anime with the title "${title}"`))
		}
	  } else {
		// handle the graphql errors
		const error = new Error(errors?.map((e: { message: any; }) => e.message).join('\n') ?? 'unknown')
		return Promise.reject(error)
	  }

}

// 	var url = 'https://graphql.anilist.co',    
// 	options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         body: JSON.stringify({
//             query: query,
// //            variables: variables -add when we do user input stuff
//         })
// 	};

// 		fetch(url, options).then(handleResponse)
//                    .then(handleData)
//                    .catch(handleError);
//     };

// 	function handleResponse(response: Response) {
// 		return response.json().then(function (json) {
// 			return response.ok ? json : Promise.reject(json);
// 		});
// 	}
	
// 	function handleData(data: JSON) {
// 		console.log(data);
// 	}
	
// 	function handleError(error: Error)
// 	{
// 		return alert('error, check console');
// 	}