&nbsp;
<p align="center">
  <a href="https://spin.jerrytq.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://starship.jerrytq.com/spin/docs/logo-darkmode.png">
      <source media="(prefers-color-scheme: light)" srcset="https://starship.jerrytq.com/spin/docs/logo-lightmode.png">
      <img alt="Logo" src="https://starship.jerrytq.com/spin/docs/logo-darkmode.png">
    </picture>
  </a>
</p>
&nbsp;

## Introduction
Spin is a full-stack web application built primarily with React and Django. It aims to emulate a basic online economy by allowing players to spin a wheel to obtain collectibles, which can later be sold on the market to other players using a fictional currency called *SP* (Spin Points).

Try it out at [spin.jerrytq.com](https://spin.jerrytq.com)!

## Schematics
Spin consists of 3 major components: 
1. A frontend built using React and hosted on Vercel
2. A backend built using Django and hosted on Heroku
3. A Socket.IO server hosted on Replit

## Demonstrations
&nbsp;
<p align="center">
  <img alt="Spinning a common item" src="https://starship.jerrytq.com/spin/docs/spinning-common.gif" width="700"/>
</p>
<p align="center">
  Spinning a common item
</p>
&nbsp;
<p align="center">
  <img alt="Spinning a ??? item" src="https://github.com/jerrytqz/public/blob/master/spin/spinning-tq.gif" width="700"/>
</p>
<p align="center">
  Spinning a ??? item
</p>
&nbsp;
<p align="center">
  <img alt="Listing an item" src="https://starship.jerrytq.com/spin/docs/listing-item.gif" width="700"/>
</p>
<p align="center">
  Listing an item onto the market for sale<br/>
  (The market updates in real time with Socket.IO.)
</p>
&nbsp;
<p align="center">
  <img alt="Buying an item" src="https://starship.jerrytq.com/spin/docs/buying-item.gif" width="700"/>
</p>
<p align="center">
  Buying an item off the market<br/>
  (The market and the seller's SP both update in real time with Socket.IO.)
</p>
&nbsp;

## Upcoming Features
- Market info for each item (historical sale price, units sold, etc.)
- Leaderboard
- More items 
- More stats
- Trading
