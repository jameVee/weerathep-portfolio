---
title: "SmurfCat at SHROOM-Visions: multilingual span-level hallucination detection"
summary: A system for the SHROOM-Visions 2026 shared task that finds and classifies hallucinated spans in vision-language model answers, in four languages.
highlight: Ranked 5th in French and Chinese, 6th in Italian, 7th in English
tags: [Vision-language models, Qwen3-VL, LoRA, Synthetic data]
accent: violet
cool: coral
order: 1
illustration: multilingual-spans
links:
  - label: System paper
    url: https://openreview.net/forum?id=v2sXul3MPv&nesting=2&sort=date-desc
  - label: Shared task
    url: https://helsinki-nlp.github.io/shroom/2026.html
---

## The task

The SHROOM-Visions 2026 shared task is about hallucinations in vision-language model outputs. Given an image, a question about it and a model's answer, the system has to **localize the hallucinated spans at the character level** and **classify each one into five categories**. Answers come in English, French, Italian and Chinese.

## What we built

- **A synthetic data augmentation pipeline** that combines annotator-agreement- and class-rarity-aware upsampling with controlled hallucination injection, conditioned on image and response signals.
- **A fine-tuned Qwen3-VL-8B-Instruct (LoRA)** that generates hallucination spans, confidence scores and category labels as structured JSON.
- **An analysis of language-dependent effects** of the augmentation across the validation and test sets.

## Results

Official Cor+Lbl ranking:

- **English:** 7th of 28
- **French:** 5th of 21
- **Italian:** 6th of 21
- **Chinese:** 5th of 22

Our team's system description paper is on OpenReview (link above).
