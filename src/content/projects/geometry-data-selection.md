---
title: Geometry-based data selection
summary: Intrinsic Dimensionality scoring and sample selection inside a data-pruning pipeline, removing redundant samples while keeping model performance.
tags: [Data pruning, Intrinsic dimension]
accent: gold
cool: indigo
order: 2
illustration: point-cloud-pruning
---

## The problem

Large training sets often contain many samples that teach the model almost nothing new. Training on all of them costs time and compute. The question was whether the **geometry** of the data can tell us which samples are redundant.

## What I built

- **Intrinsic Dimensionality scoring**, used as a signal for how much new structure a sample adds to the dataset.
- **Sample selection** that uses these scores to decide which samples to keep.
- Both pieces plugged into a **data-pruning pipeline**, so a pruned dataset can be compared directly with the full one.

## Result

The pipeline removes redundant samples while keeping model performance.

*Coursework at Skoltech.*
