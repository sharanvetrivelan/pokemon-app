Tech Stack:

1.Node.js --FOR BACKEND SERVER

2.React.js (Vite Template) --FOR FRONT END SERVER

3.PostGres Database --FOR STORING DATA

Pre-requisites: (for the app to run locally)

   1.Download Node.js from respective website.
   
   2.Download Git from respective website.
   
   3.Download PostGres database from respective website.
   
   Packages that need to be installed For Backend (npm install):
		    
  1.axios
        
  2.body-parser
      
  3.cors
    		
  4.dotenv
    		
  5.express
    		
  6.pg
  
   Packages that need to be installed For Frontend (npm install):
		
  1.React App with Vite Template (npm create vite@latest frontend -- --template react)
		
  2.@radix-ui/react-select 
		
  3.@radix-ui/react-slot 
		
  4.lucide-react 
		
  5.react-router-dom 
		
  6.clsx 
		
  7.tailwindcss-animate 
		
  8.class-variance-authority 
		
  9.tailwind-merge
		
  10.axios

Migration and Seeding Steps: (for the app to run locally)
   
   1.Create a new Database in the Postgres Admin.
   
   2.Create a new Table in the Database with the Name,Type declarations specified in the tablecreation.sql file in the backend folder.
   
   3.Access every single Pokemon API page from PokeAPI, fetch necessary data using 'axios' and seed the fetched data into PostGres database using 'pg'. (Just run seed.js file)
   
   4.Add frontend server web address into 'app.use(cors{origin:" "})' function call since 'cors' package allows frontend server to access the data during its API call.

Running the App: (for the app to run locally)
   
   1.Save all the files in the same directory path as in the repository.
   
   2.Go to 'backend' directory in Command Prompt and type "node server.js".
   
   3.Open a new Command Prompt, go to 'frontend' directory and type "npm run dev".
   


		
                                   
