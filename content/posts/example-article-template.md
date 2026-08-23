---
title: "Article template - delete this file once you have written a real one"
metaTitle: "Article template | tryACOwork"
description: "A working example of every front-matter field, kept as a draft so it never appears on the site. Copy it, rename it, replace the words."
date: 2026-08-23
updated: 2026-08-23
author: Naveen Gupta
authorRole: Co-founder
category: how-to
draft: true
---

This file exists so the blog has a working example of every field, and so the
build has something to prove itself against. **It is a draft**, so it is not
published, not listed on /blog, not in the sitemap and not in the RSS feed. You
can leave it here or delete it.

To write a real article: copy this file, rename it to the phrase you want to rank
for, and set `draft: false` when it is ready. The file name becomes the URL, so
`offshore-bookkeeper-cost-for-cpa-firms.md` becomes
`/blog/offshore-bookkeeper-cost-for-cpa-firms`. Never rename a file after
publishing - a published URL must not move without a redirect.

## What the front matter does

`title` is the H1. `metaTitle` overrides the browser and search-result title, and
is optional - leave it out and the article uses the title plus the brand name.
`description` is the sentence people read in Google, so aim for 150 to 158
characters and write it to be clicked. `category` is stored but nothing displays
it yet, so it is safe to leave blank.

`related` takes the slugs of two other articles, shown as "Read next" at the end.
Leave it out and the two most recent articles are used instead.

## Headings, and why the levels matter

Use `##` for main sections and `###` for sub-points, in order, never skipping a
level. Any article over 1,200 words gets a table of contents built automatically
from its `##` headings, so those headings are doing double duty as navigation.

### A sub-point looks like this

And nests under the section above it rather than starting a new one.

## The one rule that separates this blog from its competitors

Every statistic carries its source and the year, named in the text. Not a
footnote, not a link - in the sentence. "The US median annual wage for
bookkeeping, accounting and auditing clerks is $49,210 (US Bureau of Labor
Statistics, May 2024)" is credible. "Bookkeepers are expensive" is not.

The content plan in section 12 of the build specification lists 24 articles in
priority order, each with its target phrase and what has to be in it. Article
one - what an offshore bookkeeper actually costs a CPA firm - is the
highest-intent search in the category, and most competitors write it without
ever naming a number.

> A pull quote looks like this. Sand background, fern rule down the left. One or
> two per article at most.

## Things you can use

Ordinary markdown works: **bold**, *italic*, [links](/bookkeeping-services-for-cpa-firms),
lists, and tables. Tables scroll inside their own box on a phone rather than
making the page scroll sideways.

| What | Detail |
| --- | --- |
| Body text | 18px, looser leading than the rest of the site, because articles are read rather than scanned |
| Measure | Held to 720px, no sidebar |
| Images | Full content width, 12px corners, with an optional caption |

Every article ends with the same call-to-action block and links to the services
page and the booking page. You do not need to add those - they are part of the
template.
