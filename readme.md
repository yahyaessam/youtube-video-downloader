# YouTube Video Downloader

This project is a simple web application that allows users to download YouTube videos by providing a URL. The application is built with Node.js and Express for the backend and plain HTML, CSS, and JavaScript for the frontend.

## Features

- Download YouTube videos by entering a URL
- Display multiple download links with different video formats
- Loading spinner while fetching the download links
- Modern and user-friendly interface

## Getting Started

### Prerequisites

Make sure you have the following installed on your local development environment:

- [Node.js](https://nodejs.org/) (v12.x or later)
- [npm](https://www.npmjs.com/)

### Installation


1. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

2. Start the server:
    ```sh
    node server.js
    ```

3. Open your web browser and navigate to `http://localhost:3000`.

### Usage

1. Enter the URL of the YouTube video you want to download in the input field.
2. Click the "Download" button.
3. Wait for the download links to be generated. A loading spinner will be displayed while the links are being fetched.
4. Click on the desired format link to start the download.

## File Structure

- `server.js`: The main server file that handles incoming requests and fetches video information using the `ytdl-core` library.
- `index.html`: The frontend HTML file that contains the user interface.
- `styles.css`: The CSS file that styles the application (embedded within `index.html` for simplicity in this example).
- `README.md`: This file, providing an overview and usage instructions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [ytdl-core](https://github.com/fent/node-ytdl-core)
- [Font Awesome](https://fontawesome.com/)
