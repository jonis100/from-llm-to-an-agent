# Presentation Style Guide
## The Agentic Era: From LLM to a Superpower Agent

---

## Theme Name: Bold Editorial / Magazine

> Confident. Striking. Built like a cover story.

---

## Core Concept

This presentation borrows from the visual language of **premium print magazines** — think *Wired*, *MIT Technology Review*, or *Fast Company*. Every slide feels like a spread: bold type, strong accents, generous white space, and a clear hierarchy that respects the audience's attention.

The subject — AI agents — deserves a presentation that *feels* intelligent and purposeful, not a deck of generic bullet points.

---

## Color Palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary accent | Terracotta | `#D85A30` | Accent bar, headings, highlights |
| Accent light | Peach | `#F0997B` | Large background type, dividers |
| Dark neutral | Charcoal | `#2C2C2A` | Body text, primary headings |
| Mid neutral | Slate | `#5F5E5A` | Subheadings, captions |
| Light neutral | Muted gray | `#888780` | Footnotes, secondary labels |
| Background warm | Cream | `#F7F4EF` | Slide backgrounds |
| Background pure | White | `#FFFFFF` | Content sections, cards |
| Divider | Stone | `#D3D1C7` | Horizontal rules, borders |

### Usage Rules

- **Terracotta is sacred** — use it sparingly for the single most important element on each slide (a bar, a number, a word).
- The warm cream background `#F7F4EF` must be consistent across all slides. Never use pure white as the slide background.
- Never use more than 2 accent colors on a single slide.
- The large ghost/watermark type (oversized, low opacity) uses Peach `#F0997B` at ~25–35% opacity.

---

## Typography

### Font Pairing

| Role | Font | Weight | Size Range |
|---|---|---|---|
| Display / Slide Title | **Playfair Display** | 700–800 | 42–72px |
| Section Label / Eyebrow | **Barlow Condensed** | 600 | 10–12px, letter-spacing: 2–3px |
| Body / Bullets | **Libre Baskerville** | 400 | 16–20px |
| Code / Data | **IBM Plex Mono** | 400 | 14–16px |
| Caption / Footnotes | **Barlow Condensed** | 400 | 11–13px |

> **Google Fonts imports:** Playfair Display, Barlow Condensed, Libre Baskerville, IBM Plex Mono

### Typography Rules

- **Eyebrow labels** always UPPERCASE, letter-spacing 2–3px, Terracotta color, Barlow Condensed.  
  *Example:* `KEY CONCEPT` · `ARCHITECTURE` · `LESSON 03`
- **Slide titles** use Playfair Display — mixed case, never all caps.
- **Never use bold inside body text.** Emphasis comes from layout and size contrast, not inline bolding.
- **Line height:** 1.3 for display text, 1.7 for body text.
- **One serif, one sans** — do not introduce a third typeface.

---

## Layout System

### The Accent Bar

Every slide features a **vertical terracotta bar** on the left edge:

```
Width:   10px
Height:  100% of slide height
Color:   #D85A30
Position: Left edge, flush to slide border
```

This bar is the visual anchor. It appears on every slide without exception.

### The Ghost Type

A large, low-opacity word sits in the background of key slides, providing depth:

```
Font:    Playfair Display, 800 weight
Size:    120–160px
Color:   #F0997B
Opacity: 25–35%
Content: A single word that represents the slide theme
         (e.g., AGENT · MEMORY · PLAN · TOOL · LOOP)
```

### Slide Zones

```
┌──┬──────────────────────────────────────────┐
│  │  EYEBROW LABEL (top-left, 40px from top) │
│  │                                          │
│  │  Slide Title                             │
│  │  (Playfair Display, 48–64px)             │
│  │                                          │
│  │  ─────────── divider ─────────────       │
│  │                                          │
│  │  Body content / diagram / key points     │
│  │                                          │
│  │                                          │
│  │  Caption or footnote (bottom-right)      │
└──┴──────────────────────────────────────────┘
 ↑
10px terracotta bar
```

### Grid

- **Margins:** 60px left (after bar), 60px right, 48px top/bottom
- **Column grid:** 12 columns, 24px gutter
- **Content area:** spans columns 2–12 (column 1 is the accent bar zone)
- **Two-column layouts** (diagram + text): 5 cols content / 7 cols diagram, or 6/6

---

## Slide Types

### 1. Title / Cover Slide

- Full-width cream background
- Terracotta bar on left
- Eyebrow: `MASTERCLASS · [YEAR]`
- Ghost type: large `AI` or `AGENT` in background
- Title: 2-line max, Playfair Display 64px
- Subtitle: 20px, Slate color
- Thin terracotta rule between title and subtitle

### 2. Section Divider Slide

- Split layout: left half cream, right half Charcoal (`#2C2C2A`)
- Section number in large Playfair on the right half, Peach color
- Section title below in white Playfair

### 3. Content / Concept Slide

- Standard layout with accent bar
- Ghost word in background
- Eyebrow label + title at top
- 2–4 key points below the divider line
- No more than 40 words of body text per slide

### 4. Diagram / Architecture Slide

- Minimal text, diagram fills the right 60% of the slide
- Left 40%: title + 1-sentence explanation
- Diagram uses the color palette — terracotta for active/key components, slate for passive ones

### 5. Quote / Big Idea Slide

- One sentence, maximum 15 words
- Playfair Display, 36–48px
- Opening quotation mark in Terracotta, 120px
- Speaker attribution in Barlow Condensed below, Slate color

---

## Visual Details

### Divider Lines

```
Height:  1.5px
Color:   #D85A30  (primary) or #D3D1C7 (secondary)
Width:   variable — from title to ~60% of slide width
```

### Bullet Points

Replace standard bullets with:
- A small filled square `■` in Terracotta (`#D85A30`), 8px
- Or a short terracotta left-border on each item (`border-left: 3px solid #D85A30`)

### Numbering

Section and slide numbers use:
- Barlow Condensed, 10px, uppercase, letter-spacing 2px
- Format: `01 / 07`, `02 / 07`, etc.
- Position: bottom-right corner of every slide

### Diagrams & Illustrations

- Flat, no drop shadows or gradients
- Stroke-based components with 1px borders in Slate or Stone
- Active/highlighted nodes: Terracotta fill, white label
- Arrows: 1px, Slate color, simple open arrowhead
- Label text: IBM Plex Mono, 12px

---

## Slide Sequence (Recommended Structure)

| # | Type | Eyebrow | Ghost Word | Purpose |
|---|---|---|---|---|
| 01 | Cover | MASTERCLASS | `AI` | Hook the room |
| 02 | Section divider | PART ONE | — | What is an agent? |
| 03 | Content | DEFINITION | `AGENT` | LLM vs Agent distinction |
| 04 | Diagram | ARCHITECTURE | `LOOP` | The agent reasoning loop |
| 05 | Content | MEMORY | `MEMORY` | Short vs long-term memory |
| 06 | Content | TOOLS | `TOOL` | Tool use and function calling |
| 07 | Content | PLANNING | `PLAN` | Chain-of-thought & planners |
| 08 | Diagram | MULTI-AGENT | `NETWORK` | Orchestration patterns |
| 09 | Quote | SUPERPOWER | — | Big idea moment |
| 10 | Content | CHALLENGES | `RISK` | Failures, guardrails, evals |
| 11 | Section divider | PART TWO | — | Live demo / examples |
| 12 | Cover (end) | THANK YOU | — | Close |

---

## Do's and Don'ts

### Do
- Use the accent bar on every single slide
- Let white space breathe — don't fill every corner
- Use ghost type to add depth on concept slides
- Keep diagrams flat and structural
- Mix slide types to maintain rhythm

### Don't
- Use more than 2 colors per slide (accent + neutral)
- Put more than 4 bullets on any slide
- Use gradients or drop shadows anywhere
- Use bold inside body paragraphs
- Use pure white `#FFFFFF` as the slide background

---

## Quick Reference Card

```
Background:    #F7F4EF  (warm cream)
Accent:        #D85A30  (terracotta)
Accent light:  #F0997B  (peach — ghost type only)
Text primary:  #2C2C2A  (charcoal)
Text secondary:#5F5E5A  (slate)
Text muted:    #888780  (gray)
Border:        #D3D1C7  (stone)

Fonts:
  Display   → Playfair Display 700–800
  Labels    → Barlow Condensed 600, UPPERCASE, ls: 2px
  Body      → Libre Baskerville 400
  Code      → IBM Plex Mono 400

Accent bar: 10px wide, full height, left edge, #D85A30
Ghost type: Playfair Display 800, #F0997B, 30% opacity
Divider:    1.5px, #D85A30, partial width under title
```

---

*Style guide for "The Agentic Era: From LLM to a Superpower Agent" — Bold Editorial / Magazine theme*
