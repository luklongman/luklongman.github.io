---
title: Using SvelteKit to make a blog with Obsidian Notes
source: https://www.youtube.com/watch?v=I_txYtmDcdo
author:
  - "[[Frank Johnson]]"
published: 2022-06-10
created: 2026-07-21
description: "Let's walk through a proof-of-concept I've built for a personal blog and library website powered by Obsidian notes and SvelteKit and buzzwords!Demos:Live demo site: https://obsidian-sveltekit-blog."
tags:
  - clippings
  - youTube
updated: 2026-07-21T10:01
type:
---
[[2026-07-21#^impression]]
![](https://www.youtube.com/watch?v=I_txYtmDcdo)




Let's walk through a proof-of-concept I've built for a personal blog and library website powered by Obsidian notes and SvelteKit and buzzwords!  
  
Demos:  
Live demo site: https://obsidian-sveltekit-blog.netlify.app/  
GitHub repo: https://github.com/franknoirot/obsidian-sveltekit-blog  
  
Chapters:  
00:00 Introduction  
00:49 Demo Site Walkthrough  
01:53 Obsidian Vault Walkthrough  
02:36 SvelteKit Code Walkthrough  
06:39 Note Taking & Post Publishing  
10:08 Book Publishing  
13:15 Conclusion  
  
  
  
My other sites:  
personal portfolio (11ty and Markdown): https://franknoirot.co  
personal library site (Svelte + Google Sheets): https://bookshelf-network-svelte-sheets.netlify.app/

## Transcript

**0:00** · hey there i'm frank and i build things for the web and i like to read so what i want to show you today is a combination of those two passions of mine in one little project i really like using obsidian notes for my note-taking and i'm learning how to connect my knowledge through its graph based approach and i also maintain a personal website with a library i've typically

**0:23** · housed that in a google sheet that publishes a static site that you can search i'll put the link in the description but i want to connect those two things together so i've created this proof of concept that lets me have a spelt kit site with an obsidian vault within it and by taking notes within that obsidian vault we can then move items into

**0:46** · specific folders in our vault and publish them so let me show you what that looks like all right so i'm sharing my macbook here and this is the demo site i've left the styling really really sparse right now because i want to just focus on the functionality as you can see we have some books and we have some posts in these posts i've exposed the metadata and if i go back to the posts page i have a landing page where they're all listed individually they link to

**1:16** · other items so this links to a book and this links to that other post and i'll show you that what i've had to do is handle the way that obsidian does internal links and parse those correctly and then if we go back to the book section you can see i'm getting the covers of those books and whenever you go in there's a bit more styling because i was interested in how the book thing would work you can see the metadata is actually formatted here we've got the cover and then all of my notes so i like to put the citation the big ideas my

**1:46** · thoughts on it it's not really a review and then uh my totalized rough notes so that's all collected in here so if i switch over to my obsidian notebook and this is the demo that just has the bare bones of what we need here you can see i have a folder let me actually make this a little bit bigger so you have a folder here for books a folder for posts and

**2:08** · then one loose note here i have a template for each of those hosts and book and then i have an underscore assets folder you can set up an assets folder in your obsidian notebook so that whenever you paste in an image it knows where to look and this

**2:24** · is it so i'll show you what a book looks like so this is philosophy of software design these are all my notes and then all of that stuff including the cover image is held in the metadata if i switch over now to the code if i collapse all of these this is a typical svelt kit project you can see i've already built the site so there's an output directory here it's dot svelt dash kit all my node modules then the source is the interesting thing i have my fault right here just in my source

**2:53** · and that allows me to import stuff and treat it as a content at build time so that's why i needed to put it in source i am looking for ways to have those in separate repositories even or at the very least in separate folders so i can have my source and my vault separated but if you have any ideas on that feel free to comment below i like to put my all the things i use in site including components in a lib folder there's some nice things that felt kit allows you to do to do a dollar sign lib on imports if

**3:24** · you use a lib folder you can see i have my basic header in here but the interesting thing is the routes and i have a home page a layout that isn't used by all of the pages below it so this just puts a little bit of padding on the page nothing major and just puts my header on all the pages dot ts file here you can actually make any page have an end point that is kind of like a serverless function right next to your your page your root file so

**3:53** · there are two ways to like do loading on the server side install one i could have a another script tag above this or you know anywhere in this file that says uh context equals module in it and that would just run once and in sveltkit's case it would run on the server when the page is first loaded but by breaking this out into its own file it allows you to do some things like this allows me to do all any http

**4:19** · method so i could make a post function in this file and then whenever i hit the home page with the host request i could have it do something different rather than feed me a web page i can have it feed me like the api data for books and post so that allows you to do some pretty clever things right in the same code base as your like front end website what i'm doing is i'm collecting up all of those books and posts and building

**4:44** · links to them so that i can display them on the home page and whatever you pass from this get function in the body will be fed into the component so in this component i have that export let which allows it to consume those things that are returned by the page endpoint and then i can go on and use them and i know the structure of them so i can build those links accordingly and then within the books page just bit more styling going on in here but above let me just

**5:12** · get rid of this oh so actually this is a good example i am also doing some of that script context module i also have a page endpoint for this but i'm doing some stuff on first load here as well so this is how i'm importing the cover image because as you saw in the obsidian notebook i only have

**5:31** · final slug with the file extension for those so i need to import those otherwise the assets won't at build time get into the page this is actually the trickiest part that i've run into i'd love for these assets to just be in the static directory but i couldn't figure out a way to at build time just copy my assets directory into my static directory so if anyone knows veet really well i'm looking for a way to just get the assets into the static directory at

**6:00** · build time so that i can just reference images with like a slash assets or slash book covers for example as of right now i'm doing a dynamic import using v and then passing it in this works the same way as that index page endpoint i had shown you before whatever you pass in in this case it's props but if you use a page endpoint in a separate file it has to be within the body key value gets passed into client side so all of these

**6:26** · can get pulled in then i am filtering out the title and the cover image so that i can display everything except those in those styled key value pairs at the top of the page and that's about it so i want to walk through what taking notes in this feels like because i think that's what has got me excited about it it does feel a little tedious still but what is promising to me is that this allows me to continue to take loose notes the way the obsidian likes and the way that

**6:57** · still feels powerful and at my hands and then promote that content into published thought or publish reviews of books for example so here's a private thought this isn't appearing on the site that we just looked at but i can promote it to a published thought by

**7:13** · running a command that i just how did i do that did i make that i want to insert a template make this a post so i think i broke my keyboard shortcut here but you can set a hotkey for applying any templates so what i just did is insert that template text which is just the metadata for a post and now i can

**7:35** · my template actually already has this in it so i was lucky there but normally i'd have to edit the title and you might notice over here as of right now i have to refer to posts and books whenever they're published by their slug and that makes things a little bit easier as far as on the code side generating pages it's a lot easier if the thing that i'm generating is a slug already and then i'm pulling in the title as metadata normally whenever i'm taking notes in obsidian i like to have the titles of my notes be sentence flow like phrases

**8:07** · because then when i'm writing i can actually use it in a sentence have a full thought but this is one compromise i had to make here so next thing i'll do is now say retitle this to a formerly formerly privatish thought and now i'm going to make this the slug so we're going to call this formerly private ish bot and it was published is that

**8:30** · today oh yeah i have it set up to this is cool if it's set up to take the date and the time so that is accurate it is late and now this should just work ideally so if let's just check out the site only have the two posts but whenever i pull this into my posts folder should see is that correct did i miss something oh i know what i'm doing ah right that's because i am not

**8:57** · running the dev server so whenever you publish by dragging it into the folder you can see it live as long as you're looking at the dev server there we go so a formerly privatish thought and now this has its own page at uh an appropriate url that was pretty smooth right so i can take a note have it living privately in my github repo in my

**9:21** · notes vault and then whenever that is ready i can just drag it into my posts and say this is ready to show the world and any links i i don't believe i've actually implemented this but i could make it so that any links that are attached to things that aren't yet published are just ignored because i have a i have code that is recognizing those links and choosing what to do with them those obsidian flavored links so i could just choose to ignore anything that isn't in those folders but as of right now i am correctly parsing this

**9:52** · book link which is in the obsidian flavor and it's got an alias so i even managed to handle aliases so let's just look at that what book is that oh this is the post on the large hadron collider so this book as you can see is actually linking to the correct destination the last thing i want to do is just show what it would look like to make a book so let's make a new book what book was i

**10:16** · interested in i have this atomic habits which is the first book i read whenever i bought my kindle because this is a new way of taking notes that i was really excited about i could take notes with my kindle dump them into this file in obsidian rough notes and then format them and then take my own thoughts on them and then eventually those big ideas that i really liked out of quotes i can make them into their own full ideas

**10:40** · elsewhere so i really like this workflow but i'm just going to use this as an example so let's steal this content and we will we will make a new thing called i'm not going to put it into books yet so this will be called atomic habits and i'll just refer to it in sentence case until it's time to publish it and then i can transfer it over to a slug so this is that i think i don't parse tags right now

**11:12** · you'd have to do that on your own so i could be taking notes polishing this up getting it ready to display to the world and then whenever i'm ready i'm going to just insert that template i already have all that content but if i wanted to start a fresh one i could also just include that and i was already using atomic habits for this so i can now rename this atomic habits which is by james clear

**11:39** · it was published in 2018 i think the version i read was also 2018 it was digital and let's call this atomic habits i'll go fetch a cover of it real quick let's drop this in there so this is a dot j p e g and this is dot j p e g so we should be all good all that remains just to show let's

**12:04** · collapse this all return to the site i only got three books in here now if i publish this by dragging and dropping oh broke it i think what i might be doing is not handling these links correctly so that's i'm not ignoring those it's looking them up and then saying where where is this idea that you're telling me about i want to keep like two of them so let's just convert them from links to

**12:33** · ideas in their own right and this should just fix that problem cool so now we have atomic habits published and that means that if i was writing another post and somehow this is connected to and i can refer to it as atomic habits i can alias it as atomic habits

**12:56** · that's a little tedious to me but it's something that can be optimized later that doesn't slow me down in my note-taking and if i happen to publish a blog post that's like that it's not gonna kill me that's that's totally fine so now if i go over to here i got links nice okay so that's been a tour of my obsidian and svelte kit demo i will publish the source code for this little site on my github and post a link to a

**13:26** · netlify demo site in the description as well so comment if you have any ideas for how to make this better if it sparks any excitement for you about note-taking i know i'm still working on getting my habits of literature notes especially down and those like longer term notes where you consolidate your fleeting notes i'm still working on that so i'd love to hear what you have to say about that thanks