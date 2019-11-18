export default function loadClient() {
    gapi.client.setApiKey("AIzaSyC_A5TJ5dYTWbhoaPwiB16fU9raHtKbL64");
    return gapi.client
      .load(
        "https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest", ""
      )
      .then(
        () => {
          console.log("GAPI client loaded for API");
        },
        (err: any) => {
          console.error("Error loading GAPI client for API", err);
        }
      );
};