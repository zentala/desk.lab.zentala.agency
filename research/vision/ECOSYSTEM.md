# Ecosystem & Business Model

## Vision: Open Smart Desk Standard

The end goal is not a product. It is a **market standard**.

> 70% of height-adjustable desks ship with an interface compatible with
> the Open Smart Desk Standard. 20%+ ship with a laser sensor pre-installed.
> The rest offer it as an option.

This is what success looks like in 5-10 years.
We get there by making the standard open, the software free, and the value
proposition undeniable for manufacturers.

---

## The Ecosystem

```
┌─────────────────────────────────────────────────────┐
│                  OPEN SMART DESK                    │
│                  (open standard)                    │
└──────────┬──────────────────┬───────────────────────┘
           │                  │
    ┌──────▼──────┐    ┌──────▼──────────────┐
    │  Smart Desk  │    │   Smart Move        │
    │  (app v1)    │    │   (app v2)          │
    │              │    │                     │
    │ desk sensor  │    │ full body activity  │
    │ sit/stand    │    │ smartwatch + steps  │
    │ nudges       │    │ lifestyle coaching  │
    └──────┬───────┘    └──────┬──────────────┘
           │                  │
    ┌──────▼──────────────────▼──────────────┐
    │         User data layer                 │
    │   (local first, user-owned, private)    │
    └──────────────────┬──────────────────────┘
                       │
    ┌──────────────────▼──────────────────────┐
    │      Manufacturer API integrations      │
    │  FlexiSpot / IKEA / Uplift / Linak...   │
    │  "Open Smart Desk Certified" label      │
    └─────────────────────────────────────────┘
```

---

## Smart Desk → Smart Move progression

**Smart Desk** (current): desk-centric
- Tracks sitting vs. standing at desk
- Sends nudges to change position
- Shows daily timeline

**Smart Move** (future): life-centric
- Extends beyond the desk
- Integrates with smartwatch (steps, heart rate, activity)
- Guides user toward gradually increasing physical activity
- Personalized: meets you where you are, not where you "should" be
- Same philosophy: no punishment, positive progression, habit building

The name "Smart Move" is intentional — it's a pun (smart move = good decision, smart = intelligent, move = movement).

---

## Why manufacturers should adopt the standard

**The problem for manufacturers:**
Customers buy a $600-1500 motorized desk. They use the motor once a week.
They feel vaguely disappointed. They don't recommend the desk to friends.
The "smart" part of a height-adjustable desk is invisible and unused.

**What we offer manufacturers:**
- Users who engage with their desk daily (app + gamification = habit)
- Data: "users of our certified desks stand 2h/day vs. 15min average"
- Differentiation: "Open Smart Desk Certified" badge = premium positioning
- Sales channel: users who want the sensor buy it from manufacturer's shop

**Format of manufacturer partnership:**
- Provide open API spec (free, published)
- "Open Smart Desk Certified" certification process (consortium fee)
- Optional: laser sensor pre-installed or as official accessory
- Optional: co-branded experience ("Powered by Open Smart Desk")

---

## Revenue model

### Phase 1: Zero revenue (now → first 1000 users)
- Open source software, free
- DIY hardware kit instructions (free)
- Goal: users, data, proof of concept

### Phase 2: Hardware kit (~1000 users)
- Sell pre-assembled sensor kit (RP2040-Tiny + VL53L0X + PCB + enclosure)
- Price: 150-200 PLN
- Made in Poland (PCB assembly + laser cutting), components from China
- Revenue: breaks even on hardware, builds supply chain experience

### Phase 3: Consortium — the real revenue engine

**Key insight:** Annual membership fee is NOT enough. Consortium must have
ongoing financial interest — they need to keep paying because the value keeps flowing.

**Model: per-unit OEM supply**

Manufacturers don't just pay to join — they **buy the sensor module from us**
as an OEM component for their desks:

```
We design + manufacture sensor PCB
    → Manufacturers buy it as OEM component (per unit, ongoing)
    → Goes into their desk as "Open Smart Desk Sensor"
    → Every desk sold = revenue for us
    → More desks sold = more recurring revenue
```

Revenue per unit: even 5-15 PLN per desk × 10,000 desks/year = sustains project.

**Additional consortium revenue:**
- Certification fee (one-time, per product model) — covers our testing cost
- Priority support / custom integration work — billed separately
- "Powered by Open Smart Desk" co-marketing — included in OEM contract

**Why manufacturers accept this:**
- They get a certified, tested, working sensor — no R&D cost
- We handle firmware + app compatibility — zero maintenance for them
- "Open Smart Desk Certified" = marketing differentiator they can charge for
- Their desk becomes stickier (user engagement daily, not once a week)

### Phase 4: Smart Move (ecosystem play)
- Smart Move app expands addressable market beyond desk owners
- Anyone with a smartwatch can use it
- Freemium: basic free, advanced coaching subscription
- B2B: companies pay for team wellness dashboards (opt-in, employee-controlled data)

### Phase 5: EU Grants (optional, not relied upon)
- Possible after academic study is published
- Horizon Europe / EIT Health / NCBR
- Requires academic partner (PW contact)
- High overhead, long timelines — pursue only if consortium is established
- Not a primary funding source

---

## The flywheel

```
More users
    → More data
        → Better algorithm
            → Better results
                → More word of mouth
                    → More users

More manufacturers certified
    → More users discover via desk purchase
        → More users
            → More data
                → Better algorithm
```

---

## Open questions (TBD)

- [ ] Exact consortium membership fee model
- [ ] Which manufacturers to approach first (FlexiSpot? Linak? IKEA?)
- [ ] Legal structure for the standard (foundation? nonprofit? LLC?)
- [ ] EU grant programs relevant to workplace ergonomics (Horizon Europe? EIT Health?)
- [ ] B2B model: how to ensure employee data privacy while providing company value
