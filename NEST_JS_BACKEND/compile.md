
# { Note GUI->star-gui is folder of frontend App ,  api->star-api is folder of nestJsbackend}

# A- DEPLOY GUI & API ON SAME PORT ON SERVER 
# !- To Download the node_modules package for GUI and api
# navigate to root folder of GUI run command 
npm i --legacy-peer-deps or npm i --force
# navigate to root folder of API and repeat same command 
npm i --legacy-peer deps 

# !!- Now node_modules necessary to run srcipts are downloaded 

# {Note :- Navigate to GUI src/app/config/siteConfig.js and change IP/URL to respective server IP/URL to be used}
# For database connectivity naviagte to .env file and change database info 
# .env consist these variables to make connection to database and assign PORT for app
{
   # Database connectivity settings 
DATABASE_HOST=103.10.234.158
DATABASE_PORT=5432
DATABASE_USERNAME=star
DATABASE_PASSWORD=Admin@123
DATABASE_DBNAME=starapi
    
# Port at which App should run
 APP_PORT=3355
}
# Navigate to GUI folder , Build the GUI using command 
npm run build 


# Navigate to nestJsBackend/api folder , Build the api using command 
npm run build

# 1
# Create new folder , which will have GUI and API running at same port {Let's call it "star" folder for guide}
# Inside star folder create a new folder named "client"    
# Navigate to GUI{star-gui} folder copy all the contents of build folder
#  Paste the copied content inside star/client   {new folder which was created}

# 2
# Navigate to {nestJsBackend or star-api} folder locate   dist folder 
# Inside dist/apps/../  {the name of api folder }
# copy assets, main.js , main.js.map to root path of star folder {navigate to star}

# 3 Merging package.json->dependency  of GUI and API

# {Note : Can use package.json from existing running APP folder from bailiwick  }
# else follow these steps ->
# Navigate to nestJsBackend/ api folder 
# copy {package.json and package-lock.json } to root  of "star" folder
# Navigate to GUI folder copy all the contents of dependencies and dev-dependencies from package.json file of GUI
# paste this copied content of dependenices in star folder inside the package.json dependency on last of dependency tree  {inside respective dependency and dev-dependency}



# Can deploy this on server 

## Now have to set the path of client folder inside main.js to render GUI from client folder
## Open main.js 
## Navigate to this 
AppModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                serveRoot: '/',
                rootPath: (0, path_1.join)('/home/star/stardocs/', 'client'),
             }),
## In the above code change rootPath :(0,path_1.join)('path/to/client/folder/onServer/', 'client')

# after deployment to server , install the packages 

# To install the dependencies run this command on root  folder 
 npm i --legacy-peer-deps
# Once all node_modules are installed , can run the app by running "main.js" : file either  by 
node main.js {node must be installed on server }

 # Existing code contains sh to run app 
# 1- To start
 sh run.sh start
# 2- To stop 
sh run.sh stop 
# 3- To restart 
 sh run.sh restart
 
 # Existing code contains .env file for making connection to database change connectivity according to new database info 


# Documents for api and gui is already generated 
# For GUI Docs naviagate to 
/star-gui/docs
# Open index.html to view the docs for gui  
# also running at
http://103.10.234.158:3355/gui-docs/ 
# For API Docs naviagte to 
/star-api/documentation
# Open index.html file to view docs for api 
# also running at
http://103.10.234.158:3355/api-docs/
 # {Note Existing code contains package.json-> script to execute commands to generate docs for gui and api}
 npm run api-docs
 npm run gui-docs
    

    ####################################################################################################


## B ->To run GUI and API seperate on local environment 

# Navigate to GUI folder 
# Install node_modules running the command 
npm install --legacy-peer-deps 
# if error while installing ,  try npm install --force 
# Once installed the packages , run the app using 
npm run start
# IF any ssl unsupported  error , run this $env:NODE_OPTIONS = "--openssl-legacy-provider"  or 
# open package.json file and edit "scripts"-> "starts":""react-scripts--openssl-legacy-provider start""
# run the app again with npm run start 
# Navigate to API 
# install package using command 
npm install --legacy-peer-deps
# Configure database connectivity inside .env 
# Once complete run the app using command 
npm run start 


**Please revert back if any issue**
