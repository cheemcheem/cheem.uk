(this.webpackJsonptest=this.webpackJsonptest||[]).push([[6],{16:function(e,t,s){"use strict";s.r(t),s.d(t,"default",(function(){return o}));s(0);var a=s(1);function n(e){return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)("div",{id:e.headerTitle,className:"card-deck",children:Object(a.jsxs)("div",{className:"card mb-3",children:[Object(a.jsxs)("div",{className:"card-header mb-1",children:[Object(a.jsx)("h1",{className:"card-title",children:e.headerTitle}),Object(a.jsx)("h4",{className:"card-title",children:e.headerSubtitle})]}),Object(a.jsx)("div",{className:"card-footer",children:Object(a.jsx)("span",{className:"text-muted",children:e.footer})})]})})})}var c=s(17);function r(e){return Object(a.jsx)(c.a,{link:"https://github.com/cheemcheem/".concat(e.link),children:"GitHub"})}var i=s(19);function o(){function e(e){return Object(a.jsx)("ul",{className:"hashtags",children:e.hashtags.map((function(e){return Object(a.jsx)("li",{children:e})}))})}var t=Object(a.jsx)(c.a,{mono:!0,link:"https://reactjs.org/",children:"react"}),s=Object(a.jsx)(c.a,{mono:!0,link:"https://www.typescriptlang.org/",children:"typescript"}),o=Object(a.jsx)(c.a,{mono:!0,link:"https://github.com/brianzinn/react-babylonjs",children:"react-babylonjs"}),h=Object(a.jsx)(c.a,{mono:!0,link:"https://github.com/BabylonJS/Babylon.js",children:"babylonjs"}),l=Object(a.jsx)(c.a,{mono:!0,link:"https://get.webgl.org/",children:"webgl"}),d=Object(a.jsx)(c.a,{mono:!0,link:"https://spring.io/projects/spring-boot",children:"spring-boot"}),j=Object(a.jsx)(c.a,{mono:!0,link:"https://openjdk.java.net/projects/jdk/13/",children:"jdk-13"}),b=Object(a.jsx)(c.a,{mono:!0,link:"https://openjdk.java.net/projects/jdk/12/",children:"jdk-12"}),u=Object(a.jsx)(c.a,{mono:!0,link:"https://www.java.com/en/",children:"java"}),m=Object(a.jsx)(c.a,{mono:!0,link:"https://cube.cheem.uk",children:"cube.cheem.uk"}),p=Object(a.jsx)(c.a,{mono:!0,link:"https://maven.apache.org/",children:"maven"}),x=Object(a.jsx)(c.a,{mono:!0,link:"https://gradle.org/",children:"gradle"}),g=Object(a.jsx)(c.a,{mono:!0,link:"https://projectlombok.org/",children:"lombok"}),O=Object(a.jsx)(c.a,{mono:!0,link:"https://oauth.net/2/",children:"oauth2"}),k=Object(a.jsx)(c.a,{mono:!0,link:"https://aws.amazon.com/s3/",children:"s3"}),f=Object(a.jsx)(c.a,{mono:!0,link:"https://www.postgresql.org",children:"postgresql"}),v=Object(a.jsx)(c.a,{mono:!0,link:"https://material-ui.com",children:"material-ui"}),w=Object(a.jsx)(c.a,{mono:!0,link:"https://www.ag-grid.com",children:"ag-grid"}),y=Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("p",{children:"This is a minimalistic pixel art maker that works on mobile and desktop."}),Object(a.jsxs)("p",{children:["It stores the state of the grid in ",t," and uses library called ",o," that provides ",t," components for the WebGL library ",h," which is used to render on the canvas."]}),Object(a.jsx)(e,{hashtags:[l,t,s,o,h]})]}),T=Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("p",{children:["I created this web app to store invoices for different people. It uses ",O," for authentication, an ",k," bucket for object storage, and ",f," for database storage."]}),Object(a.jsxs)("p",{children:["The app runs using a ",v," on a ",t," front-end with a ",d," back-end."]}),Object(a.jsx)(e,{hashtags:[d,j,u,l,t,s,p,g,O,k,f,v]})]}),I=Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("p",{children:"I set out on this project to create a Rubik's cube game that works from within the browser. My motivations came from playing with my Rubik's cube and wanting to programmatically solve my cube using software that I wrote."}),Object(a.jsx)("p",{children:"I ended up creating a full-stack app, with a front-end for rendering the cube state and a back-end for handling user requests and updating the state of the cube."}),Object(a.jsxs)("p",{children:["Seeing as the front-end seemed very state-dependant, I thought this would be a good opportunity to learn ",t,", so I used a library called ",o," that provided ",t," components for the WebGL library ",h,"."]}),Object(a.jsxs)("p",{children:["For the back end, I used ",d," running on ",j," with an in-memory Hibernate database for handling sessions storage and cube state storage."]}),Object(a.jsxs)("p",{children:["As it stands now, I achieved most of my goals going into this project. You can browse to ",m," and see a 3D, manipulable, interactive Rubik's cube! It currently does not solve the cube by performing any special actions, it merely reverses the moves made so far until it reaches the last solved state!"]}),Object(a.jsx)("br",{}),Object(a.jsx)("iframe",{title:"cube",src:"https://cube.cheem.uk",width:"100%",height:500,frameBorder:0}),Object(a.jsx)(e,{hashtags:[d,j,u,l,t,s,p,g,o,h]})]}),N=Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(e,{hashtags:[d,j,u,p,g,"game-dev"]})}),F=Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("p",{children:["This is a ",d," app that runs on ",j," and provides a RESTful API for tracking your household energy usage! I created this to get a grasp of how much energy I am spending on a monthly basis, as I still have one of those old top-up meters and have not yet been upgraded to a smart meter. The front-end runs on ",t," using ",w,"."]}),Object(a.jsx)("p",{children:"To use this app, you are required to have a csv of date and balance columns. Once that csv is loaded into the app, it will show you information like average or total spending across a range of days, weeks, months, or years!"}),Object(a.jsxs)("p",{children:["This can be useful if you would like to determine your summer month spending, you could give a query like this ",Object(a.jsx)("span",{className:"mono",children:"curl -X POST 'http://localhost:8080\u200b/api\u200b/average\u200b/monthly\u200b/between\u200b?startDate=01/06/2020 00:00\u200b&endDate=31/08/2020 23:59'"}),"."]}),Object(a.jsxs)("p",{children:["Future plans for this project include allowing multiple users to use it at once and creating a ",t,"-based front-end interface."]}),Object(a.jsx)(e,{hashtags:[d,j,u,p,g,t,w]})]}),S=Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(e,{hashtags:[u,x,b,g]})}),L=Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(e,{hashtags:[t,s]})});return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(i.a,{header:"Projects",children:Object(a.jsxs)("p",{children:["Here are a few fun projects that I've worked on, the rest can be found on my ",Object(a.jsx)(c.a,{link:"https://github.com/cheemcheem",children:"GitHub"}),"."]})}),Object(a.jsx)(n,{headerTitle:"pixel art",headerSubtitle:Object(a.jsxs)("div",{className:"card-deck space-between",children:[Object(a.jsx)(r,{link:"pixel-art"}),Object(a.jsx)(c.a,{link:"https://pixel.cheem.uk",children:"Live"})]}),footer:y}),Object(a.jsx)(n,{headerTitle:"invoice store",headerSubtitle:Object(a.jsxs)("div",{className:"card-deck space-between",children:[Object(a.jsx)(r,{link:"invoice-store"}),Object(a.jsx)(c.a,{link:"https://invoice.cheem.uk",children:"Live"})]}),footer:T}),Object(a.jsx)(n,{headerTitle:"rubik's cube solver",headerSubtitle:Object(a.jsxs)("div",{className:"card-deck space-between",children:[Object(a.jsx)(r,{link:"rubiks-cube-solver"}),Object(a.jsx)(c.a,{link:"https://cube.cheem.uk",children:"Live"})]}),footer:I}),Object(a.jsx)(n,{headerTitle:"card games",headerSubtitle:Object(a.jsxs)("div",{className:"card-deck space-between",children:[Object(a.jsx)(r,{link:"card-games"}),Object(a.jsx)(c.a,{link:"https://cards.cheem.uk",children:"Live"})]}),footer:N}),Object(a.jsx)(n,{headerTitle:"energy usage tracker",headerSubtitle:Object(a.jsx)(r,{link:"energy-usage"}),footer:F}),Object(a.jsx)(n,{headerTitle:"vcs visualiser",headerSubtitle:Object(a.jsx)(r,{link:"vcs-history"}),footer:S}),Object(a.jsx)(n,{headerTitle:"cheem.uk",headerSubtitle:Object(a.jsxs)("div",{className:"card-deck space-between",children:[Object(a.jsx)(r,{link:"cheem.uk"}),Object(a.jsx)(c.a,{link:"https://cheem.uk",children:"Live"})]}),footer:L})]})}},17:function(e,t,s){"use strict";s.d(t,"a",(function(){return n}));s(0);var a=s(1);function n(e){return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)("a",{className:"no-a".concat(e.mono?" mono":""),target:"_blank",rel:"noopener noreferrer",title:e.title?e.title:e.children,href:e.link,children:e.children})})}},19:function(e,t,s){"use strict";s.d(t,"a",(function(){return n}));s(0);var a=s(1);function n(e){return Object(a.jsxs)("div",{className:"card normal-background mt-3",children:[Object(a.jsx)("h1",{children:e.header}),Object(a.jsx)("span",{children:e.children})]})}}}]);
//# sourceMappingURL=6.3d7837db.chunk.js.map