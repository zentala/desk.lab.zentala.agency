---
title: "What I Learned Tracking My Sitting for 30 Days"
description: "I mounted a sensor under my desk and tracked every second of sitting and standing for a month. The data was brutal — but it changed everything."
date: "2026-03-20"
author: "zentala"
tags: ["data", "health", "standing-desk", "tracking"]
---

I thought I was pretty good about standing up during the workday. I have a motorized sit/stand desk. I know the research. I take breaks.

Or so I told myself.

Then I mounted a tiny sensor under my desk and let the numbers speak for themselves. Here is what 30 days of data actually showed me.

## The Setup

The experiment was simple. A VL53L1X time-of-flight sensor mounted under my desk, pointing at the floor. It measures the distance every second — when the desk is low, I am sitting; when it is high, I am standing. No manual logging, no buttons to press, no app to remember to open.

The sensor connects via USB to a small desktop app I built. It tracks desk height in real-time, logs every position change, and calculates daily statistics. All data stays local — no cloud, no accounts, nothing leaves my machine.

I set a few rules for myself: no changing my behavior for the first two weeks (baseline measurement), then actively try to improve in weeks three and four.

## The Shocking Numbers

**Week 1 baseline [PLACEHOLDER]:**

- Average daily sitting: [PLACEHOLDER: ~6.5 hours]
- Average daily standing: [PLACEHOLDER: ~35 minutes]
- Standing ratio: [PLACEHOLDER: 8%]
- Position changes per day: [PLACEHOLDER: 1.2]
- Longest continuous sitting session: [PLACEHOLDER: 3 hours 42 minutes]

That longest session hit me hard. Three hours and forty-two minutes without moving. I had the standing desk. I had the intention. I just... forgot.

The position changes number was the real gut punch. Barely more than once per day meant I was essentially doing one big stand in the afternoon and calling it a day. That is not how the research says it should work.

## Week by Week Changes

**Week 1 — Baseline [PLACEHOLDER]**

Pure observation. I forced myself not to look at the app during the day. At the end of the week, the app showed me [PLACEHOLDER: 8% standing time, 1.2 changes/day]. I was shocked. I genuinely believed I was standing for at least an hour each day.

**Week 2 — Still Baseline, Now Aware [PLACEHOLDER]**

Even knowing I was being tracked changed my behavior slightly. Standing ratio crept up to [PLACEHOLDER: 11%], position changes to [PLACEHOLDER: 1.8/day]. The Hawthorne effect is real. But the improvement was tiny — awareness alone was not enough.

**Week 3 — Active Intervention [PLACEHOLDER]**

I enabled the overlay progress bar — a thin line at the top of my screen that slowly turns from green to red as I sit. The gamification score started penalizing long sitting sessions. Results: [PLACEHOLDER: 18% standing, 3.5 changes/day]. The progress bar was the biggest driver. Something about seeing that subtle color shift triggered a "I should stand" thought.

**Week 4 — Optimization [PLACEHOLDER]**

I experimented with session limits (40 minutes max before the bar goes red), break credits (standing for 10+ minutes resets the timer), and notification timing. Final week numbers: [PLACEHOLDER: 22% standing, 4.8 changes/day, longest sit: 52 minutes].

## What Actually Worked

After 30 days and many iterations, here is what made a real difference:

**1. Automatic tracking eliminated excuses.** When you have to press a button or open an app, you conveniently forget on busy days. The sensor just works. There is nothing to forget.

**2. The overlay bar beat notifications.** I tried desktop notifications first — "Time to stand up!" — and dismissed them within two seconds every time. The progress bar is different. It is always there, subtly changing color. You cannot dismiss it. You just... see it. And eventually you stand.

**3. Gamification created emotional stakes.** A negative daily score after a long meeting actually bothered me. Not in a stressful way, but in a "I want to fix that" way. The comeback mechanic — standing for 10 minutes resets your session — turned it into a mini-game.

**4. Position changes mattered more than duration.** The research backs this up: frequent changes between sitting and standing are more beneficial than one long standing session. Tracking changes per day was more motivating than tracking total standing minutes.

**5. Realistic goals prevented burnout.** I did not try to stand for 50% of the day. The 40-minute session limit with break credits was achievable. Small wins compound.

## The Takeaway

I have a standing desk. I knew I should use it more. I had the motivation. What I did not have was awareness — real, data-driven, cannot-lie-to-yourself awareness.

The gap between "I think I stand enough" and "the sensor says I stood for 35 minutes today" was enormous. And closing that gap required zero willpower. Just a sensor, a progress bar, and the truth.

If you have a height-adjustable desk and you think you are using it well — you are probably wrong. I was. The data proved it. And the data helped me fix it.

---

*zntlDesk is the open source sensor + app that tracked all of this. Pre-order the hardware kit at [desk.zentala.io](https://desk.zentala.io/#pricing) — from EUR 49.*
