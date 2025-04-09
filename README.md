(auth)-> next js isko route consider nhi krta hai () isko ();

huma header chaiya throughout the application isiliya usko hum dashboardLayout  mei rakhege 
userButton hota hai jismei user image dikhti hai aur click krke hum logout kr skte hai

WORKFLOW::
1. generate questions and answers from AI (GEMENIE AI).
2. show questions one by one
3. Record user's answers
4. convert user answers (speech to text);
5. save questions with user anser in database for final report.

BACKEND SETUP:
backend ke liya hum postgrey sql ka use krege aur uske liya hume query likhni pdti hai toh query ke liya hum 
DRIZZLE ORM ka use krege (DRIZZLE ORM) it help us to insert a record or to retrive a record from the postgrey sql without writting a query.

drizzle mei jake neon db use krege aur uska url milega  (neon.tech) mei  

npm run db:push -> to push the data to the neon database
npm run db:studio -> with this the studio will open via link in the terminal and after opening .. the tables will be visible 

next jo hai bo folder wise routing leta hai auppose meina folder baanaya for dynamic routing ---> interview[interviewId] aur ab muje router mei  start (dashboard/interview/51564165/start) chaiya  toh iss interview folder ke andr folder baanayuga start ka which means dynamic id of interview ke baad start aayega.

for webcam we are using react library and for to record our answer we are also using react library that is 
npm i react-hook-speech-to-text


