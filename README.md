# CV OS - A Résumé OS-like GUI Interface

CV OS is an open-source project designed to present résumés in the appearance of an operating system. It offers navigation through directories and files via a desktop environment and a command-line interface through the Terminal app.

This project was built as PWA using React. Furthermore, it can also be installed on any device via browser. Its content is easily configurable, allowing for easy reuse by the community. It is designed to be easily deployed using GitHub Pages. To reuse it, simply fork the project and follow the instructions below.

## Reusing the Project

1. Fork the project. If the intention is to deploy using GitHub Pages, GitHub requires that the repository's name follows this format: {username}.github.io (e.g., gitname.github.io).

2. Clone the project locally.

3. Download dependencies:

    ```sh
    npm install
    ```

4. Edit the `homepage` property in the package.json file. If you plan to deploy it on GitHub Pages, the `homepage` property should have this format: `https://{username}.github.io/{repo-name}`. Example:

    ```json
    {
      "version": "0.1.0",
      "homepage": "https://<git-name>.github.io/<project-name>",
      "private": true
    }
    ```

5. Configure the data to be displayed as desired. See the section on configuring app data for more information.

6. Deploy it:

    ```sh
    npm run deploy
    ```

    This will build and deploy the project.

7. Configure GitHub Pages:

    If the project is going to be deployed using GitHub Pages, follow these steps:

    7.1. Navigate to the **GitHub Pages** settings page:
    - In your web browser, navigate to the GitHub repository.
    - Above the code browser, click on the tab labeled "Settings."
    - In the sidebar, in the "Code and automation" section, click on "Pages."

    7.2. Configure the "Build and deployment" settings like this:
    - **Source**: Deploy from a branch
    - **Branch**: 
        - Branch: `gh-pages`
        - Folder: `/ (root)`

    7.3. Click on the "Save" button.

## Configure App Data

The files that allow content to be displayed and navigated as folder/file in the desktop environment and via the command-line interface are located in the `src/data/files` folder. The presented content is merely demonstrative and it is possible to easily add new files and folders.

### Files

To add new files (visually), follow these steps:

1. Create a new JSON file. To create a single file, a file with a single JSON object must be created. Example (`src/data/files/professional_experience.json`):

    ```json
    {
        "title": "Front-end Developer", 
        "filename": "front_end_1", 
        "company": "Company 1", 
        "location": "Location 1",
        "dates": "2015 - 2016",
        "tech_stack": ["JS", "HTML"]
    }
    ```

    Files described this way will be printed in simple text format. It is also possible to reference remote files and/or render markdown files. Example:

    ```json
    {
        "title": "Contributing.md",
        "type": "markdown",
        "filepath": "/data/files/contributing.md", 
        "description": "An example of a markdown file that is loaded from public/data/files/contributing.md"
    }
    ```

    Files to be referenced this way and that are present locally must be placed in the `public/data/files` folder.

2. Load the file into the `data.js` object (`src/data/data.js`). To do this, the `loadAppData` function must be edited to import the new file and place it in the desired hierarchy. Example:

    ```javascript
    import professional_experience from './files/professional_experience.json';

    function loadAppData(){
        let data = new Directory('root', null);
        data.addContent(loadData('Professional Experience', professional_experience, data));
        return data;
    }
    ```

### Folders

1. To create directories, JSON files must be created with content that is a list of objects or a single object containing nested objects. The keys of this object will be subdirectories of the main directory. For both alternatives, there are examples in the repository illustrating these possibilities: `src/data/files/certifications` and `src/data/files/skills.json`. To add new directories, simply replicate the desired structure and integrate it into the existing structure in the `loadAppData` function, as done previously for files.

    ```javascript
    import custom_dir from './files/custom_dir.json';

    function loadAppData(){
        let data = new Directory('root', null);
        data.addContent(loadData('Your custom directory', custom_dir, data));
        return data;
    }
    ```

## Contributing

See `Contributing.md`.