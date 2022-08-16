&nbsp;
<p align="center">
  <a href="https://spin.jerrytq.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="docs/images/logo-darkmode.png">
      <img alt="Logo" src="docs/images/logo-lightmode.png">
    </picture>
  </a>
</p>
&nbsp;

## Introduction
Spin is a full stack web application built primarily with React and Django. It aims to emulate a basic online economy by allowing players to spin a wheel to obtain collectibles, which can later be sold on the market to other players using a fictional currency called *SP* (Spin Points).

Try it out at [spin.jerrytq.com](https://spin.jerrytq.com)!

## Schematics
Spin consists of 3 major components: 
1. A frontend built using React and hosted on Vercel
2. A backend built using Django and hosted on Heroku
3. An independent Socket.IO server hosted on Replit

## Demonstrations
&nbsp;
<p align="center">
  <kbd>
    <img alt="Spinning a common item" src="docs/gifs/spinning-common.gif" width="700"/>
  </kbd>
</p>
<p align="center">
  Spinning a common item
</p>
&nbsp;
<p align="center">
  <kbd>
    <img alt="Spinning a ??? item" src="docs/gifs/spinning-tq.gif" width="700"/>
  </kbd>
</p>
<p align="center">
  Spinning a ??? item
</p>
&nbsp;
<p align="center">
  <kbd>
    <img alt="Spinning a ??? item" src="docs/gifs/listing-item.gif" width="700"/>
  </kbd>
</p>
<p align="center">
  Listing an item onto the market for sale<br/>
  (The market updates in real time with Socket.IO.)
</p>
&nbsp;
<p align="center">
  <kbd>
    <img alt="Spinning a ??? item" src="docs/gifs/buying-item.gif" width="700"/>
  </kbd>
</p>
<p align="center">
  Buying an item off the market<br/>
  (The market and the seller's SP both update in real time with Socket.IO.)
</p>
&nbsp;

## Upcoming Features
- Market info for each item (historical sale price, units sold, etc.)
- Market and inventory filtering 
- Profile customization 
- Options menu
- Leaderboard
- More items 
- More stats
- Trading
- Sound
