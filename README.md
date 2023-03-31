# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Links

- Solution URL: https://github.com/anwari-fikri/ip-address-tracker
- Live Site URL: https://anwari-fikri.github.io/ip-address-tracker/

## My process

### Built with

- React
- React Leaflet
- ipify (API)
- Tailwind
- Mobile-first workflow

### What I learned

## 1. Setting up secrets for github pages

I just learned that you can put your secrets in the settings of your repository. I use this feature to hide my API key for ipify.

I was just about to move this project to use Vercel & NextJS because I did a similar project regarding hiding my API key and luckily I don't have to do that.

## 2. Learn new React Hooks

I get to use some React Hooks that I have not used before.

I only used **useState** and **useEffect** hooks in my previous projects and in this project I get to learn to use **useCallback** and **useMemo** which I haven't fully understood 100% but I get the gist of when to use them.

## 3. Learn new libraries

Using external libraries is always an exciting experience as I get to read the libraries documentation and apply it to my project.

This time I am using leaflet for the map, specifically react-leaflet. It is fairly easy to use and the example in the documentation really helped me a lot.

### Useful resources

- [React Leaflet - External state](https://react-leaflet.js.org/docs/example-external-state/) - This helped me with making the map change based on the IP address from user input

## Author

- Website - [Anwari Fikri](https://www.anwarifikri.com/)
- Frontend Mentor - [@anwari-fikri](https://www.frontendmentor.io/profile/anwari-fikri)
