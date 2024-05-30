# Gmail File Sharing Application

## Overview

This application allows users to upload files, generate unique download links, and share these files via email using Gmail. The app is built with Node.js, Express, MongoDB, and Nodemailer, utilizing Multer for file uploads.

## Images

![Gmail](Screenshot%202024-05-30%20175921.png)

## Features

* `File Upload`: Upload files to the server.

* `Generate Download Link`: Create unique links for downloading files.

* `File Download`: Download files via generated links.

* `Send File via Email`: Share files through email with a downloadable link.

## Prerequisites

* Node.js and npm installed

* MongoDB installed and running locally

* Gmail account for sending emails


## Installation

1. Clone the repository:
```sh
git clone https://github.com/chouhanmahima/file_sharing_application-.git
cd gmail-file-sharing-app
```
2. Install dependencies
```sh
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

```env
userEmail = your-email@gmail.com
userPassword = your-email-password
```

## Usage

1. Start MongoDB:

    Ensure MongoDB is running locally on `mongodb://localhost:27017`.

2. Run the application:

    ```sh
    npm start
    ```

3. Upload a file:

    Send a POST request to `/api/files/` with a file attached.

4. Generate a download link:

    Send a GET request to `/files/:uuid` with the file ID to get a unique download link.

5. Download a file:

    Access the generated link or send a GET request to `/files/download/:uuid`.

6. Send a file via email:

    Send a POST request to `/api/files/send` with fileId and shareTo (recipient's email address) in the request body.


## API Endpoints

### Upload File

* URL: `/api/files/`

* Method: `POST`

* Body: Form-data with a file field named file.

### Generate Download Link

* URL: `/files/:uuid`

* Method: `GET`

* Params: `uuid` - The file ID

### Download File

* URL: `/files/download/:uuid`

* Method: `GET`

* Params: `uuid` - The file ID

### Send File via Email

* URL: `/api/files/send`

* Method: `POST`

* Body:
    ````json
    {
        "fileId": "file_id",
        "shareTo": "recipient_email"
    }
    ````

## File Structure

```plaintext
gmail-file-sharing-app
│   .env
│   app.js
│   package.json
├───controllers
│       file.js
├───models
│       file.js
├───routes
│       file.js
├───services
│       mailServices.js
│       uploadServices.js
└───files
        (uploaded files)
```

## Dependencies

```json
{
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "mongoose": "^8.4.0",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.13",
    "uuid": "^9.0.1"
}
```

* `express`: Web framework for Node.js

* `mongoose`: MongoDB object modeling tool

* `nodemailer`: Send emails from Node.js applications

* `multer`: Middleware for handling multipart/form-data (file uploads)

* `dotenv`: Load environment variables from `.env` file

## License

This project is licensed under the MIT License.