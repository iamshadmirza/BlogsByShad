# Podcast - Raw Talent - Episode 1 | Ft. Mohd Shad Mirza = Hashnode, Tech Industry & Full Stack Development

Hey everyone, I got invited to a podcast by [Developer Student Club of Thapar Institute of Engineering and Technology](https://twitter.com/dsctiet) and it's been an amazing opportunity for me to share my experience. After the podcast session got over, I wished that I could have added more value to it and provided clearer detailed answers which I couldn't because of the time and the fact that it was my first podcast. This article is an effort to fill up the gaps. Let's start.

## Topics of discussion

* Introduction and about yourself.
* Where do you work, and what kind of work do you do.
* About your journey, how you got here, and some insights and secret tips.
* Preferred Tech stack.
* Views on GraphQl (vs RestFUL APIs)
* What are the aspects to decide which one should you choose for your application
* Flutter vs React native?
* Future of RN.
* More about the RN design system.
* Your tips to survive in the tech world, and how to get project ideas for newbies.

## Let's start with the introduction and about yourself.

First of all, it's great to see that college students are doing such activities to engage more students in tech. About me, My name Shad and I'm a Full Stack Developer at Hashnode. I graduated in 2018 from a private college in Lucknow. After that, I was a React Native Developer for one and a half years. I do some Open Source and I like writing technical articles. Other than coding that I'm interested in literature and art. I do sketching and all.

## Can you tell us more about work at Hashnode and what Hashnode is all about?

Hashnode is a platform and more importantly, it's a community that's empowering developers to share their stories and grow their careers. You can ask a question, you can share your blog and one of the key features is "Devblog", you can get your blog running in a second with your own custom domain. You can sync your content to your private repo on GitHub as well. Whatever you post on hashnode is truly yours not like another platform. There are other things happening in the community like AMAs and She Inspires where we interview women from tech. You should check it out.

## How is it different from other platforms like Medium or Devto or any other blogging platform?

The difference is that you truly own your content at [Hashnode](https://hashnode.com). Medium or Dev doesn't let you own your content. The canonical still points to their platform, not your domain and it's making a profit out of your content. We are not doing that here. We are not putting ads on your blog. Dev.to is a lot similar to Hashnode but it's again a blogging platform. Hashnode is a community and many other things are happening than just blogging. And there is Devblog which you can say is a separate product which you get with Hashnode. A lot of people are using Gatsby to build their blog, here you get an SEO customized, markdown supported blog out of the box. You can add your domain, add extra pages, add a widget, etc. Even I'm using my Devblog as [my portfolio](iamshadmirza.com), I added an About page which has all my information and that is my portfolio.

## Can you tell us more about your journey, how you got here, and some insights and secret tips?

Tbh, I wasn't a great student in college, the tech culture in my college was not that good. Most of the things were copy-pasting stuff, complete your assignment, and get some marks.
After the college got over in May 2018, I knew just the JSP pages and we are not using it anywhere in tech. Most of the colleges will teach you some Java and tell you to build a portfolio. When you go to the market, it's not being used anywhere.
I planned to learn a few things first, build a project, and then go to Bangalore or Noida for off-campus interviews instead of going with a little bit of Java and JSP pages.
So I started learning from Youtube after college ended, you might be aware of [thenewboston](https://www.youtube.com/user/thenewboston) and Bucky Roberts. I learned Java and Android Development from that channel in about 3 months and built a small app.
I recorded a video of that app and put it on WhatsApp. Someone took that video and sent it to a startup in Bangalore. They called me for an interview and I got hired in October 2018. I had a job before even coming to Bangalore.

## You would say that showing your work makes a lot of difference. Personally, I started a page on Instagram where I'm posting daily updates on what I'm doing. I got this idea from the community that if you start showing your work or whatever you're learning, people will notice or in your case, you might get a job.

You won't believe what happened. I was working on this project React Native Design System and the day I released it or tweeted about it, it got a really good response and I got 5 job offers within 24 hours of that tweet. So building something can have a huge impact.

## Can you tell us more about the app you built?

There was an ongoing project in Lucknow for Lucknow Metro and I built an all in one app for that. It was fairly simple, you can check fair, the number of stops and total stops in your journey, etc.  
Suppose you are writing an article about functions in javascript, whoever reads that article will know that this guy knows about functions really well. That's the main benefit you will get from putting yourself out there.

## What is your preferred tech stack?

I shifted from React Native to React with Nextjs so that's on the frontend. For state management I prefer MobX, it's a lot less code and works flawlessly. We are using MobX at Hashnode too.  For databases, I prefer, MongoDB and PostgreSQL. And yes GraphQL of course.

## Coming to GraphQL, can you tell us more about the benefit of GraphQL and REST over one another and when to use which one. 

What do you think when you hear the word "Perfect API". 
Better documentation, better performance, and usability.
GraphQL has got you covered.
* Documentation out of the box.
* Single endpoint
* No over/under fetching
* Avoid error because of typed system
* You don't need to version your API

There are a few disadvantages but you will only face them if you are working on a big production level app. They are:
* Difficult to monitor requests.
* Cache management
* Queries become complex as the system grows.

There are tools available to handle them but you have to put some extra effort. Don't think about these a lot if you're building a side-project.

## React vs Flutter

Both are good, I have tried Flutter but for a very small time. Flutter has much better Developer Experience and faster development. It's much more performant since it uses dart which supports Ahead of Time compilation.  
On the other hand, React Native has a much bigger community so there will always be some help available if you get stuck somewhere and since it is JavaScript and it is widely used by developers so React Native is much easy to adopt in comparison with Flutter. You don't have to learn a whole new language.  
Flutter engine has everything it needs for development so it doesn't have to go through bridge back and forth. And the rich ecosystem of widget makes your job as a developer a lot easier. No doubt Flutter is growing so fast and has a very bright future but if you ask that will people stop using React Native then I hardly doubt that.

## What are your thoughts on the future of React Native.

Right now the only place it's lacking is performance. It's a near-native experience not purely native when it comes to a huge app with complex animation. So what's happening under the hood are you write React code which gets converted to javascript then there is an asynchronous bridge which lets you communicate with the native side of components written in C++. It has to go through the bridge every time a change occurs which is as I mentioned "asynchronous".

This Javascript part of the code is not aware of the native side. They have to rely on this bridge to communicate. 

The Javascript code you write gets interpreted by the JavaScriptCore engine. The React Native team introduced a third element called JavaScript Interface, you may call this JSI. The main advantage of JSI is that it can hold a reference to C++  Host Objects and invoke method on them. With this, the JavaScript and Native sides can be aware of each other eliminating the need to go through the bridge.

Native android code is written in C++, you write Java or Kotlin and it gets transpiled to C or C++. Similarly, iOS is objective-C. It means we can leverage the JSI to share code between iOS and Android. 

This takes us to the most important part of the re-architecture.

### Fabric and Turbo Modules.

Two things are happening in app development.

One is calculating how the UI will look and second is managing the Native side by communicating via Bridge back and forth.

The re-architecture says the UI or rendering part will be managed by Fabric while Turbo Module will take care of the Native side. 

With the help of Fabric, the virtual dom or shadow tree which is used to calculate the part which needs to be re-rendered can be created directly in C++. So no need to go through back and forth.

Turbo Modules help in holding a direct reference to the native module that is being used. Also, there is no need to load all modules at once, it is possible the module when it's needed.

## Can you tell us more about React Native Design System?

I am a technical writer which means I usually find myself creating demos for my articles and I work on side projects a lot.

If you’re someone who works on freelance gigs so this library can be really helpful for you. You just have to tweak the theme according to the project and you’re good to go.

Few of the key points that were in my mind while creating this were

* I wanted to avoid copy-pasting
* I wanted to avoid remembering a lot of props
* Which means having a lower API surface area. API is just props you use to interact with components
* I wanted to make it simple, so simple that you can get started in 10 minutes or less.
* Speed by separating the concerns of design and padding of the component. The idea is taken from [Braid Design System](https://github.com/seek-oss/braid-design-system).
* Enough freedom to work on any project and have some restrictions to enforce consistency.


## Your tips to survive in the tech world, and how to get project ideas for newbies.

1. Be a part of the community. Follow good people that motivate to do better. Be vulnerable, don't hesitate to showcase your work and ask for feedback. Being part of a community also helps you in project ideas. Some projects will inspire you with a new idea. More importantly, build something that you need. An example can be a variation of a todo list that is specific to your requirements. Don't focus that much on the impact, just try a lot and good things will eventually come out of it.
2. For survival in the tech world, keep learning, and keep documenting what you learn.
3. By document, I mean to write a blog or a youtube video or even a LinkedIn post that can share your learning. Teaching is learning twice, the extra effort you put in research will get you a far more understanding of the topic then just learning.  
Writing is one of the biggest reasons that I was able to grab an offer in such a good company. I would recommend you to do it too. I and few other folks from community are running a free mentorship program on technical writing. You are most welcome to join if you need help in getting started. It's called [TheNextBigWriter](https://thenextbigwriter.tech)

4. Dare to fail. If you find a project interesting, don't hesitate to try. There are two kinds of thought you can have after seeing a problem or a task. 
    1. I can do that
    2. I don't know if I can do that. 
The second will make you uncomfortable and will help you grow. So dare to fail but try.

5. Make small goals and stick to them. By small I mean extremely small. An example could be that I will read 25 pages today instead of I will read a book this month or I will read 12 books this year. Read Atomic Habits by James Clear. It's a really good book on habit building.
6. Treat your work as sacred. If you working on something, dedicate your full attention to it. No messaging, memes, games. Divide your time and do one activity at a time. Don't think about assignments when you're playing a game. Don't think about the game when you're doing your assignment. One activity at a time. Multitasking is a myth, try to give your undivided attention to the task at hand.
7. Practice focus. Focus is a skill and you can get better by practicing it daily. We need for that "giving unavoided attention" thing we talked about earlier. Listening to a podcast or reading a book for 30-45 min daily without getting distracted is a nice exercise that I follow and you can try. Don't touch your phone or tv or anything in these 45 minutes, be extremely present in the activity you're doing.
8. I follow this 15-minute problem rule. It means you do not search for a solution online unless you've tried for 15 minutes at least on your own. After that time, you're allowed to go and search for a solution. We have every information at our fingertips, thanks to the internet. That's why our problem-solving ability is decreasing. Exercises like these help us keep up the pace.
9.  If you're coding something, never jump to code if you don't know what you're going to code. Have a pen-paper nearby, write down the steps and in the exact order. Then sit to code.
10. If you're learning on udemy or any online platform, building the exact same project will not help you. Build something different from what the instructor is building and apply the knowledge you learned from the course. Always go back to revise after a week or two.

It was an amazing experience to have a podcast session and share my learnings. I covered a lot of things here in this article which I wished to cover in the session. Thanks again for having me.