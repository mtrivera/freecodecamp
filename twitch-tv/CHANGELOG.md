# CHANGELOG

03-19-2018
==========
Major refactor (main.js):

Remove promise implementation and use native ES6 promises  
Remove excess variables in `isUserValid` function  
Remove excess variables in `getStreamData` function  
Remove unused `name` parameter from addElm function  
Change values in `users` array (No longer play Dota 2)  
Implement `fetch` API for twitch api requests  
Cleanup `userData` and `streamData` array creation declarations  
Use `map` method for userData iteration instead of `forEach`  
Create a `streamer` object to pass along if/else logic  

03-30-2017
==========
Initial working release