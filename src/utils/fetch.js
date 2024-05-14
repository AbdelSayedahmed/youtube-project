const tokens = [
  import.meta.env.VITE_ABDEL_API_KEY,
  import.meta.env.VITE_ARI_API_KEY,
  import.meta.env.VITE_SHANEL_API_KEY
];

function createKeyCycler(tokens) {
  let currentIndex = 0;

  return function getNextKey() {
    const key = tokens[currentIndex];
    currentIndex = (currentIndex + 1) % tokens.length;
    return key;
  };
}

const getNextApiKey = createKeyCycler(tokens);

export async function getRandomVideos() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${getNextApiKey()}&part=snippet&chart=mostPopular&maxResults=10`
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

export async function searchVideos(query) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${getNextApiKey()}&part=snippet&q=${query}&maxResults=10`
    );
    const data = await response.json();
    const videos = data.items.map((item) => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.high.url,
    }));
    return videos;
  } catch (error) {
    console.error("Error searching videos:", error);
    return [];
  }
}

// Function to show a specific video
export function showVideo(videoId) {
  const iframe = document.createElement("iframe");
  iframe.width = "560";
  iframe.height = "315";
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.allowFullscreen = true;
  document.body.appendChild(iframe);
}
