const tokens = [
  import.meta.env.VITE_ABDEL_API_KEY,
  import.meta.env.VITE_ARI_API_KEY,
  import.meta.env.VITE_SHANEL_API_KEY,
];

// Function to cycle through all keys
function createKeyCycler(tokens) {
  let currentIndex = 0;

  return function getNextKey() {
    const key = tokens[currentIndex];
    currentIndex = (currentIndex + 1) % tokens.length;
    return key;
  };
}

const getNextApiKey = createKeyCycler(tokens);

// Function to show 12 random videos on load
export function getRandomVideos() {
  return fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${getNextApiKey()}&part=snippet&chart=mostPopular&maxResults=15`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.items
        .map((item) => ({
          title: item.snippet.title,
          videoId: item.id,
          thumbnail: item.snippet.thumbnails.standard.url,
          description: item.snippet.description,
          kind: item.id.kind,
        }))
        .filter(
          (item) => item.kind !== "youtube#channel" && item.description !== ""
        );
    })
    .catch((error) => {
      console.log("Error fetching random videos:", error);
      return [];
    });
}

// Function to show 12 videos on search
export function searchVideos(query) {
  return fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${getNextApiKey()}&part=snippet&q=${query}&maxResults=25`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.items
        .map((item) => ({
          title: item.snippet.title,
          videoId: item.id.videoId,
          thumbnail: item.snippet.thumbnails.high.url,
          description: item.snippet.description,
          kind: item.id.kind,
        }))
        .filter(
          (item) => item.kind !== "youtube#channel" && item.description !== ""
        );
    })
    .catch((error) => {
      console.error("Error searching videos:", error);
      return [];
    });
}

// Function to show a specific video
export function getVideoDetails(videoId) {
  return fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${getNextApiKey()}&part=snippet,contentDetails,statistics&id=${videoId}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.items.length === 0) {
        throw new Error("Video not found");
      }
      const video = data.items[0];
      return {
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail:
          video.snippet.thumbnails?.high?.url ||
          video.snippet.thumbnails?.default?.url,
        videoId: video.id,
        statistics: video.statistics,
        publishedAt: video.snippet.publishedAt,
      };
    })
    .catch((error) => {
      console.error("Error fetching video details:", error);
      return null;
    });
}
