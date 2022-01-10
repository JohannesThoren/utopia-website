# Utopia Forums
**Utopia Forums is a part of my examination work in my 3 year at NTI Karlstad.**

Utopia Forums is an open source and Free forum, where freedom of is our main goal. This is the front end part of the forums which is not needed to browse the forum, but it is a helpful tool. The front end build upon the [Utopia Api](https://github.com/JohannesThoren/Utopia-Api).

**Utopia Forums is this repo is copyrighted under the MPL v2 license for more info see the license file.**


# Setup and installation
DO the following in order
### Clone the repo
```
git clone https://github.com/JohannesThoren/Utopia-Website
```

### Set Up
```
yarn install
```

### Set Api Root Url
to set the api root url go to src > store > index.js and change the `api_root` variable.
# building production and running development build 
### Compile / Build for production
```
yarn build
```

### Compile and hot reload for development
```
Yarn serve
```