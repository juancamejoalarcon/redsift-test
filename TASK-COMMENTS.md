# BACKEND

I added two services:

- get-auth-results.js to get an object with DMARC, SPF and DKIM
- get-ip.js to get the sender IP from the header

I also added some tests that can be run using:

```
npm run test
```

from the server folder.

Apart from that, I modified the parse.js file so that it can send more properties to the frontend such as the 'date' of the email


# FRONTEND

I added a summary chart that can be seen by clicking on the summary tab. 
For styling I used pure css, creating one new file for every component. I tried adding post-css nested to do a similar syntax as SASS but I kept having errors with the postcss config