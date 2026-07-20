---
title: Understanding is the new bottleneck — Geoffrey Litt, Notion
source: https://www.youtube.com/watch?v=WkBPX-oDMnA&t=955s
author:
  - "[[AI Engineer]]"
published: 2026-07-11
created: 2026-07-19
description: Autonomous loops are hot, but the reality is that most agentic tasks still require human judgement. And to guide your agents well, it's not enough to just verify correctness -- you actually need to un
tags:
  - clippings
  - AI
updated: 2026-07-19T11:44
---
![](https://www.youtube.com/watch?v=WkBPX-oDMnA)

Autonomous loops are hot, but the reality is that most agentic tasks still require human judgement. And to guide your agents well, it's not enough to just verify correctness -- you actually need to understand the work they're doing.  
  
In this talk, I'll share some techniques for staying in the loop and efficiently developing understanding, combining old ideas from education and cognitive science with modern agent capabilities. You'll walk away with some practical tips for moving faster with agents by understanding more, not less.

## Transcript

**0:01** · \[music\] What's up? Yeah, thank you for coming to the design engineering track at AI. Is everyone having fun?

**0:18** · Yeah, I think this is going to be a great track, so get excited.

**0:22** · All right, let's get going. Um, my name's Jeffrey Litt. I'm a design engineer at Notion currently.

**0:28** · And I'm here to drop a hot take for this room, maybe.

**0:34** · I think it is still important for people to understand how code works.

**0:39** · \[applause and cheering\] Now, some of you might agree, some of you might disagree. Let's actually Let's do Let's try a poll. I'm curious for this room. Raise your hand if you agree with that opinion. Okay, maybe some selection bias. Any brave Okay, raise your hand if you disagree with this opinion.

**0:55** · Wow, okay. We have \[laughter\] Maybe we'll do a debate later, yeah. I was hoping we'd be at the AI engineer conference, so we'd have more bull Okay. I might be preaching to the choir here.

**1:06** · You know, I think we The reality is though we are entering an era where this is a legitimate question that people are debating, right?

**1:13** · Agents are writing tons of code for us. They're landing 50,000 line PRs. And it is getting harder to keep up. We all feel this. Now, I think the good news is there are lots of ways to understand. Be, you know, the days of just reading code line by line and that's not the only way anymore.

**1:32** · And what the point of this talk is about is I want to share with you a bunch of the practices that I use to understand the code that my agents are writing for me. This includes things like explainer docs, teaching me about how my code works.

**1:47** · My agents write quizzes for me to to test my understanding. Am I still really in the loop? Am I keeping up?

**1:55** · I have agents build me micro worlds that I can inhabit to get this intuitive sense of how my code works that's deeper and richer than just a written document.

**2:05** · And I think all of these are really exciting new possibilities that are opening opening up for AI to help us understand better, not worse. And so that's what the point of this talk is going to be about and I hope I can leave you with some techniques that you can take home and use yourself. By the way, my timer isn't running. If you could get that running, that'd be great so I know blabbering.

**2:28** · Okay, but let's start let's back up for a sec. Before we talk about how, let's talk about why.

**2:33** · Why bother understanding? This is again, it's a question now, right?

**2:37** · And I think a lot of people get this subtly wrong. So what a lot of people think of why do humans still have to understand, they think we understand to verify. The agents do dumb stuff, we've all seen it, and your job as the human is to keep them in line, right? Make sure they don't screw up.

**2:56** · When people say things like code review is the new bottleneck, I think that's the first thing that pops into people's heads is correctness checking.

**3:05** · There's this mental model that's like, "Hey, the agent's going to give you something, and what's your job? It's to ask, is this correct?"

**3:13** · Now, correctness can have lots of definitions. Does it match the spec doc you gave it? Does it take down production? Is it well architected?

**3:21** · But fundamentally, those are all kind of thumbs up, thumbs down decisions, right?

**3:26** · And the thing is, over time, we've all seen it, the agents are also able to ask these questions and they're getting better at it. You give it the right verification loop, and over time, this is the reality. The the role of humans in correctness checking is decreasing. And you know what? I actually don't hate that.

**3:45** · If I have a clear idea of what I want to do, and the agent does it correctly, instead of coming back to me with an incorrect thing, that's great. I'm I'm into it. So then I think people extend this and say, "You know what? That means as the agents get smarter and smarter and smarter, we we don't have to understand it all, right? Get out of the loop, man. Run the loop."

**4:04** · And that's where I think people miss something really important. There is a deeper reason to understand what's going on, and that's understanding to participate. Because here's the thing, it's not just one loop. When you review what's happening and get in the loop, you come away changed. You understand something, and that understanding is what you take to the next loop, and the next, and the next.

**4:32** · Your understanding of what's going on is the foundation for you having that next idea and being an active creative participant in a project. I think probably you've all you've all felt even before AI, you know, the difference of the kinds of ideas someone can have when they really understand what's going on versus when they're a few layers removed are different.

**4:51** · Because when you have rich conceptual structures in your head that you can fluently recombine really fast without going out to like ask some some agent or some human how it works, that gives you the ability to fluidly take creative leaps. And that's the human part of the work, coming up with the next idea and the next idea.

**5:10** · So this is actually the real reason I think understanding matters, and this is not something that we can just wash away with better agents. Because if we want to be active participants, you still got to do this. There's a great term maybe some of you have heard called cognitive debt that I think really captures the spirit well. It's an analogy to technical debt, popularized by the scholar Margaret Stories. Simon Willison also blogged about it.

**5:33** · And I love this idea because similarly to tech debt, you might get away with it for a little bit, but at some point you get burned if your understanding degrades. And maybe you felt this. I know I felt it. You're vibe coding, things are going well, and then at some point you realize, wait, I've no idea what's going on. I basically can't participate anymore, right? You've built up too much cognitive debt.

**5:56** · Okay, so maybe it sounds like all of you were already convinced. We agree. We need to understand.

**6:02** · But how?

**6:04** · Right?

**6:05** · We don't want to live in 2023. We are using agents to move fast, and it is harder and harder to keep up. How do we do it?

**6:13** · I think to answer this question, we should actually take a step back and ask a more fundamental question, which is how do we understand stuff in general?

**6:25** · Plot twist, this is not the first time that any human has asked this question. There is a field. It's called education. Now, when you think education, you might think of bad memories from sitting in lectures or whatever, but I think we can do better. We can take inspiration from the best ideas that have ever been invented in education and use them to stay in the loop and understand. So, that's what this talk is about.

**6:46** · We're going to talk about three techniques.

**6:50** · First, explanations.

**6:53** · So, when an agent writes some code, it's an opportunity for it to explain the work to you, right? And the most naive explanation is, hey, here's the code diff. That's the raw change, the material of what happened. But we can do, I think, much, much better.

**7:06** · What would the best possible explanation be? Like if you sent a team away for a year to come up with a personalized curriculum just to explain this one code change to you, what would that look like? I think this is a very generative question to ask.

**7:20** · So, I've done a bunch of attempts at this. One is this skill I wrote called explainedif, which I use every day, and a lot of my co-workers do as well, and I want to walk you through it. So, we're going to go through a little example here. I'm working on a video game where you draw Zen gardens, kind of de-stress, you know. We can all use that these days.

**7:39** · And we made a code change to change the perspective of the game from top-down to isometric. And I when I run my skill, it produces a code explainer doc. This can be an HTML file, it can be markdown. I like to put them in Notion because I work there, but also because it's then collaborative, so my team can comment on it and talk about it. And here's how it looks.

**8:00** · We start with background. We do not start with what happened in this change. It starts by teaching me, "Hey, here's how the system works. Here's the game engine we're using.

**8:08** · Here's the coordinate system, right?

**8:09** · Here's the subsystems."

**8:11** · It makes sure that I'm sort of being led up to the point where I can even begin to understand what's going on here. Obviously, you can skip this if you already know. You can personalize it to what you already know. Second important principle is intuition before details. So, before we start, you know, looking at code and stuff, it says, "Hey, the goal of this commit is to make the garden feel three-dimensional using only 2D drawing tricks."

**8:36** · You can think of this sort of as like a well-written commit message, a little deeper.

**8:39** · Give me examples. Give me a feel for the essence before, you know, you throw a bunch of code at me, right?

**8:45** · This, by the way, this is good teaching. This is what like good math teachers do. Third, interactive figures. So, where it makes sense, give me things to fiddle with and try. So, with this change, it was like changing how we draw rocks. So, I can drag around rocks in this little simulation, and it shows me the coordinates that are happening, how the Z layers of the painting are changing.

**9:07** · This, by the way, is actually using a new feature that Notion literally launched this morning of HTML blocks in Notion pages. So, agents can put interactive simulations into your Notion pages. Pretty cool. I think you have to be careful with interactivity. It can just be a crutch, and it can be kind of slop, to be honest. But used tastefully, it can provide understanding that's hard to achieve with just static pictures.

**9:30** · Okay, then we finally get to the code, right? Show me the code. But we don't just throw a list of files in order. We do what we what I call literate code diffs. Give me prose. Explain it to me in the right order. Tell me before each file what's going on. And when you accumulate all this stuff, it's much much easier to follow than just a raw diff.

**9:50** · Oops.

**9:51** · In fact, I print these out and take them to the coffee shop sometimes and just read them. I find it really beautifully ironic that AI has actually taken this process where I was used to be like glued to my computer my IDE, and now I can go to the cafe and it's like I'm reading a textbook about this PR. It's really cool. Okay, so there is one problem, which is that reading is hard.

**10:11** · And I am lazy.

**10:13** · People are lazy.

**10:15** · You know, there's this one time when I sent a PR to my coworker that I thought I had read the thing. I thought I understood, and she asked me the most basic question. And I was like, "Oh, no.

**10:24** · I don't know."

**10:25** · I clearly hadn't understood, right? I had fooled myself. So, I thought, "How can I create a system where that never happens again?"

**10:32** · For inspiration, I look to the work of the researcher Andy Matuschak, who has this great line, "Books don't work." What he means by that is it's really easy to read a book and not realize you didn't understand it. So, that So, he and his collaborator Michael Nielsen tried this thing where in an essay, there are interactive spaced repetition quizzes that test whether you actually remember what you just read.

**10:52** · And this is cool. It actually keep emailing you the quiz to make sure you remember it forever. But, this is nice because you cannot get through this essay without understanding it, or at least without remembering it.

**11:03** · That's what I do with my code explainers. At the very bottom, there's a quiz. Five questions, medium difficulty. And my rule is I don't send code to uh others on my team to review unless I can pass the quiz about what my agents wrote. And it might sound kind of silly, but you should try it. It really is shocking the number of times this has caught me and made me and made me realize I didn't understand.

**11:26** · I think of it as sort of a speed regulator. Everything AI is speed up, speed up, speed up. There's all these incentives to go faster. How do we make sure we're not just moving at the speed of correctness, but also of understanding? And the quiz is that speed regulator, that's a system I can use for that.

**11:41** · I did uh just put the scale on the internet. So, yeah, photo moment. If you want the Explain Diff scale, uh take that QR code, try it out, make it your own. It's really simple, actually. There's two versions at that QR code, one that outputs HTML, one that outputs Notion.

**11:57** · Okay.

**11:59** · Second technique, microworlds. What does that mean?

**12:02** · So, this takes inspiration from the educator Seymour Papert, real visionary, who had this idea of living in Mathland. And what that meant was, "Hey, kids learn French from living in France, where do they go to learn math?

**12:15** · Is there a Mathland where you can learn intuitively math just by being there?"

**12:19** · So, he did these great things with this is a a robot called the turtle that kids program to draw stuff. But the point isn't making robots, the point is they actually learn math by doing that programming. But the point isn't the robot, it's the kids that are changed.

**12:34** · So, how could we apply this to understanding code?

**12:38** · Here's one example. Last year, I was trying to implement um for my own learning this interpreter for a programming language Prolog, which is think of it a little bit like a database query language.

**12:47** · And there's all these parts of it that look like this, where when you read them on Wikipedia, they seem really complicated. And then when you actually get what's going on, it's like, "Wait a second, that wasn't that hard to understand, it just felt hard when I read it that way, right?" How could we make it click more for my brain?

**13:02** · So, I had Claude make me a microworld. This is a debugger, ephemeral UI that was built specifically to visualize the internal implementation of my programming language.

**13:13** · What's happening here is that I'm scrubbing through a timeline that's running step-by-step what's my interpreter doing. It's visualizing all the state at every step. So, I can kind of open the hood and see what's going on and start feeling it, you know?

**13:25** · And yes, I can use I used this to fix bugs. I even had a little hard to see here, but there's a commenting feature where I can leave comments for myself on the timeline so I remember what I was thinking.

**13:36** · And I use this to fix fix narrow bugs, but also as I was fixing the bugs, I was getting a feel for the machine, right?

**13:42** · That's something that if you just have an agent go fix the bug, you don't get that peripheral vision. If you live in a micro world, you do. Another example, um I was migrating my personal website from one framework to another. And first thing I did, I had I said, "Claude, write me a script to do."

**13:58** · It did this.

**14:00** · It seemed like it worked, and I read the script and I was like, "Ah, I don't know." Like I I just don't have a feel for what it's doing. A bunch of files went a bunch of places. It seems right.

**14:10** · So, what I did is I said, "Hey Claude, make me essentially a video game where I do the port myself." And the way this works is old website on the left, new website on the right. I just click a button, next, next, next. And at each step, it says, "Here's the commands I'm running. Your new website's coming to life step by step. You see it." There's actually file trees down there where I can see files moving.

**14:29** · And it's the the result is it's kind of like if I did it manually, but I'm just clicking a button. So, I'm getting some of the benefit of doing it iteratively without the pain.

**14:42** · And I think the big takeaway here is agents can write code to help us understand code. Where the point isn't building software to ship, it's building these little micro worlds for us. It's the math land, right? It's It's a It's a simulation of just this thing.

**14:58** · Okay.

**15:00** · Quickly, the last topic, shared spaces. So far, we've This has all been about me, solo understanding. But a lot of the time, I think the challenge is actually you're working on a team. And your whole team needs to understand together so you can actually jam and have creative ideas together. We think a ton about this at Notion.

**15:19** · We believe that, you know, the shared understanding that exists between you and someone else is what lets you communicate effectively.

**15:25** · Whether that's names for parts of a system, it could be names for UI elements or concepts, right?

**15:33** · So, we we think a lot of Notion about how do you make tools that enable collective understanding.

**15:37** · Some things we're exploring, can you have multiplayer chat threads between multiple humans and agents together?

**15:43** · So, here, you know, I might ask a product manager on my team, "Hey, you know, what what are users asking for with this feature?"

**15:51** · And she might say, "Hey, I don't know. Let's ask a different agent." And that agent comes in and talks to us. What's happening here is that instead of me and my PM both talking to our own agents, we're in a shared space, we can see each other's communication. It's kind of like, you know, going from one-on-one conversations to Slack channels, you know? You see more of the behavior happening together and you understand together.

**16:14** · Also, having documents that you can talk about together is a really powerful primitive. Here, you know, Claude made us a plan. What if I have a question about that that I want to discuss with my team? I can just leave a comment because this isn't a collaborative space, not on my computer locally.

**16:29** · And then I can ask, "Hey, you know, what do you think about this?"

**16:32** · And my teammate can chime in and and we can talk about it right there, right? I think having these spaces for shared discussion around ideas with our agents is really powerful for building up that collective understanding.

**16:44** · This, by the way, um we just launched last week the ability to bring coding agents into Notion. So, Claude and Cursor can now live in Notion. And our team actually builds a lot of our code in Notion itself, mainly because of these benefits, because having it in a shared space is just so valuable. Okay, so we've talked about these three techniques. I want to bring it back to the beginning.

**17:06** · You know, I think at the beginning I said, "It's important for humans to still understand how the code works, right?"

**17:12** · But I actually think it's much bigger than that. I kind of think it's just important for humans to still understand how everything works. And maybe, you know, you all agree it sounds like. But this I think is being called into question now and is something we actually have to actively fight for. The thing is this is not a new battle. It actually hearkens back to the very origins of our field.

**17:36** · Alan Kay is one of the pioneers of personal computing, co-inventor of the modern GUI. And literally 50 years ago he wrote this essay that I find very prescient, called a personal computer for children of all ages.

**17:48** · It looks like two kids on iPads watching YouTube or something, right? It's kind of crazy. This is 50 years ago his vision. But that's not YouTube on the iPads. What he envisioned is, "Hey, these kids, they're playing a video game and they're modifying the code as they play it to learn physics." So the point isn't the computer, it's the kids.

**18:06** · The point of computers was to level us up as humans, right?

**18:09** · And Alan has talked a lot about how it kind of feels like at some point computers detoured a bit from that vision. But I think the exciting thing is maybe now's the time to bring that back. Here's kind of the meme version of that. I think with AI, a lot of people are waking up to, "Oh my gosh, code is free. We can make ephemeral UIs, dynamic simulations to understand concepts. We can make debuggers, playgrounds."

**18:34** · And it's like, "Yes, that's great." And it's actually not a new idea. Like this was the goal all along. And so I think the optimistic thing that I find really exciting is hey, it's still really important to understand how things work.

**18:48** · And with the right tools and the right mindset and the right creativity, we can actually understand better than ever before, not less. With AI, we can kind of empower ourselves more, not just taking ourselves out of loops, but actually putting ourselves more deeply in loops than we ever have before. And I think that's a really exciting prospect and I hope it's something that we all, together as an industry, figure out.

**19:12** · That's all I have for you today. Thank you so much.

**19:15** · \[applause\] \[music\]