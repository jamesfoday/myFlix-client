**myFlix**  
This application is a client-side solution developed using React for the myFlix movie platform, enabling users to access detailed information about movies, directors, and genres.

Setup Instructions

1. **Clone the Repository:**
   
   
   cd myFlix-client
   ```

2. **Install Dependencies:**
 
   npm install
   ```

   *(Optional)* If the Parcel build tool is not installed globally, it can be installed by executing:
   ```bash
   npm install -g parcel
   ```

How to Run the Project

To initiate the development server utilizing Parcel, please execute the following command:

parcel src/index.html
```

Afterward, open your web browser and navigate to:
```
http://localhost:1234
```

You should see a greeting message, "Good morning," displayed in blue. Parcel will automatically rebuild and refresh the page when changes are made, facilitating live reloading.

 File Structure

```
myFlix-client/
├── .gitignore
├── package.json
├── README.md
├── src/
│   ├── index.html       # Application entry point
│   ├── index.jsx        # Primary React component
│   └── index.scss       # Sample SCSS styles
```

 Tools Utilized

- **React** - A JavaScript library utilized for constructing user interfaces
- **ReactDOM** - Facilitates interaction between React and the Document Object Model (DOM)
- **Parcel** - A zero-configuration build tool for efficient bundling, transpiling, and serving of the application
- **SCSS** - A CSS preprocessor providing cleaner and more flexible styling options
- **Babel** (as employed by Parcel) - Transpiles JSX and ES6+ into JavaScript that is compatible with web browsers