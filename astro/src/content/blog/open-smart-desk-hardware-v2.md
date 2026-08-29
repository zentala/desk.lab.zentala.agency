---
title: "Open Smart Desk Hardware v2: Making the Sensor Small Enough to Build"
description: "Why I am replacing an overcomplicated prototype with a tiny USB desk-height sensor built from an RP2040-Zero and a VL53L0X."
date: "2026-08-29"
author: "zentala"
tags: ["open-source", "hardware", "standing-desk", "project-update"]
image: "https://ae-pic-a1.aliexpress-media.com/kf/Sfdc474a44c394a92aff2c005183a32f3g.jpg_960x960q75.jpg_.avif"
---

The first version of Open Smart Desk taught me an important lesson: the hardware had become more complicated than the problem it was supposed to solve.

The product is not meant to move a desk. A person still presses the desk's own up/down button. The useful thing is much smaller: knowing whether the desk is low or high, then helping the person remember to change position during the day.

So I made a deliberate decision to simplify the next iteration.

## What hardware v2 does

The new device is a USB desk-height sensor. It mounts under the desktop and points at the floor.

```text
floor distance → desk height → sitting or standing state → desktop reminder
```

When the desk is low, the sensor is closer to the floor. When the desk is raised, the distance is greater. A small microcontroller sends the measurement to the computer over USB Serial. The desktop application can combine this with local mouse and keyboard activity and decide when a reminder is helpful.

There are no relays, no motor wiring, no power supply, and no mains voltage in this iteration. The device is powered by the same USB cable that carries its data.

## The components I selected

I bought several units of two inexpensive, readily available modules from AliExpress.

### RP2040-Zero

The RP2040-Zero is a compact development board based on Raspberry Pi's RP2040 microcontroller. The version I have is approximately 18 × 23.5 mm, includes USB and 2 MB of Flash memory, and was purchased without pin headers so it can be soldered directly to a carrier PCB.

It is more than capable of reading a sensor and exposing a simple USB Serial interface. Just as importantly, it keeps the prototype cheap and easy to replace.

![RP2040-Zero module selected for the v2 prototype](https://ae-pic-a1.aliexpress-media.com/kf/Sfdc474a44c394a92aff2c005183a32f3g.jpg_960x960q75.jpg_.avif)

### VL53L0X time-of-flight sensor

The distance sensor is a VL53L0X breakout board. It uses time-of-flight (ToF): it emits invisible infrared light and measures the time until the reflected signal returns. The module talks over I2C and is intended to measure the absolute distance to the floor.

The VL53L0X is specified by ST for ranges up to 2 m in favourable conditions, but the usable range depends on the floor's reflectivity and ambient infrared light. A real under-desk test at the target standing height is therefore part of the work, not an assumption to be made from a marketplace listing.

![Example VL53L0X breakout-board family](https://ae-pic-a1.aliexpress-media.com/kf/Sea00ee5573da4cbd90d73f2f597e1225E.jpg)

## Why this version is different

The previous prototypes explored more possibilities than the product needs. For this stage, complexity is a liability: every additional board, connector, cable, or enclosure part increases cost, assembly time, and the chance that a test user will have trouble.

Hardware v2 has one job:

1. measure distance to the floor;
2. send a stable reading to a computer over USB;
3. survive under a desk for a long time.

That makes it suitable for a small open-source test kit. It also makes it realistic to build a few units, give them to early users, learn from them, and make the next iteration from evidence rather than assumptions.

## The next step: a proper carrier PCB

The two modules work, but loose jumper wires are not a product. The next task is a small carrier PCB that permanently joins the RP2040-Zero and VL53L0X, provides sensible mounting, and protects the assembly from cable pulls and accidental knocks.

I am now looking for a person who can either design and validate that PCB, or help turn the resulting project into a repeatable small batch. The deliverables are intentionally practical: editable KiCad source, Gerbers, BOM, a first tested unit, and enough documentation for someone else to make another batch.

The full commission brief, including acceptance criteria and manufacturing deliverables, lives with the project documentation.

## What comes after the PCB

Once the PCB is proven, the next improvements are straightforward:

- a small protective enclosure, likely 3D printed;
- mounting suitable for strong double-sided tape and, where useful, screws;
- a simple calibration flow for each desk;
- a few test kits for people willing to use the system day to day;
- iterative improvements based on real reliability and usability feedback.

The goal is not a clever gadget. It is a quiet, durable measuring device that disappears under a desk and makes changing posture easier to remember.
