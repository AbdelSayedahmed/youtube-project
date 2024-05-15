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
export async function getRandomVideos() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${getNextApiKey()}&part=snippet&chart=mostPopular&maxResults=12`
    );
    const data = await response.json();
    const videos = data.items.map((item) => ({
      title: item.snippet.title,
      videoId: item.id,
      thumbnail: item.snippet.thumbnails.standard.url,
    }));
    return videos;
  } catch (error) {
    console.error("Error fetching random videos:", error);
    return [];
  }
}

// Function to show 12 videos on search
export async function searchVideos(query) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${getNextApiKey()}&part=snippet&q=${query}&maxResults=25`
    );
    const data = await response.json();
    const videos = data.items
      .map((item) => ({
        title: item.snippet.title,
        videoId: item.id.videoId,
        thumbnail: item.snippet.thumbnails.high.url,
        description: item.snippet.description,
        kind: item.id.kind
      }))
      .filter(
        (item) =>
          item.kind !== "youtube#channel" && item.description !== ""
      );
    return videos;
  } catch (error) {
    console.error("Error searching videos:", error);
    return [];
  }
}

// Function to show a specific video
export async function getVideoDetails(videoId) {
  try {
    const apiKey = getNextApiKey();
    console.log(`Using API Key: ${apiKey}`);
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,contentDetails,statistics&id=${videoId}`
    );
    const data = await response.json();
    console.log(`Response Data:`, data);

    if (data.items.length === 0) {
      throw new Error("Video not found");
    }

    const video = data.items[0];
    return {
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.high.url,
      videoId: video.id,
      statistics: video.statistics,
      publishedAt: video.snippet.publishedAt,
    };
  } catch (error) {
    console.error("Error fetching video details:", error);
    return null;
  }
}
