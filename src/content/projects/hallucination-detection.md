---
title: Hallucination detection in tool-calling dialogues
summary: End-to-end pipeline that generates synthetic annotated data, compares BERT- and attention-based baselines, and trains a span-level classifier that beat existing methods across three hallucination categories.
tags: [LLMs, BERT, Synthetic data]
accent: gold
cool: indigo
order: 1
illustration: hallucination-span
---

## The problem

When an LLM agent calls a tool, a single wrong argument, such as a city the user never mentioned, can send the whole conversation in the wrong direction. Flagging the whole answer as "hallucinated" isn't precise enough to act on. We wanted to find the exact **span** inside the tool call that isn't supported by the dialogue.

## What I built

- **Synthetic, annotated data.** A generator that produces tool-calling dialogues and marks which spans of each call are grounded and which are hallucinated, so there was labelled data to train and evaluate on.
- **Baselines.** BERT-based and attention-based detectors, run on the same data so the comparison is fair.
- **A span-level classifier** that points to the hallucinated part of a tool call, trained on the synthetic set.

## Result

The span-level classifier beat the existing methods across all three hallucination categories we evaluated.

*Research project at Skoltech.*
