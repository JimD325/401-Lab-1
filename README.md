# 401-Lab-1

### 7/9/2022

This purpose of the work done today was to implement automated testing and ensure that the testing is also done on the github side. This should allow for testing to be done automatically, both on my machine and on Github. Once the tests are passed, the app will be automatically updated. 

[Deploy-prod](https://hard-times-server-deploy-prod.herokuapp.com/)<br>
[Deploy-dev](https://hard-times-server-deploy-dev.herokuapp.com/)<br>


# 401-Lab-2

The purpose of this lab was to add some automated testing with error handlers which we created. There were some struggles getting the proper tests to work, but I did eventually get them able to work after some help from Luis Sandoval and Derek Douglas. 

# 401-Lab-3

For this lab, the goal were two-fold. The first was to properly implement CRUD fuctionality. This got done relatively quickly. The automatic testing for the CRUD functionality was a little more difficult. However, I was able to get it implement. 

For this assignment, I collaborated with Luis Sandoval, Zayah Lang, Hugo Thompson, and Danny Castro. 

# 401 Lab-4

The primary goal for this lab was to create a class constructor for any models that might be used, so that code will not need to be repeated as new models are added. 

Lab 4 Pull Request
### Models
  - Survivor: /survivor
  - Survivor Params: ```{"username": "string", "strengths": "string", "weaknesses": "string", "abilities": "string", "powerLevel": "integer"}```
  - Calamity: /calammity
  - Calamity Params: ```{"type": "string",
  "intensity": "integer",
  "location": "string"}```<br>
  - ```.env``` PORT <br>
  - ```PORT```- 3000

  ### To Run the App
  ```npm start```

  ### To Test the App
  Unit test: ```npm test```
