---
title: Geometry-based data selection
summary: Data pruning with geometric and statistical scores, showing that a large share of training data can be removed without hurting accuracy.
tags: [Data pruning, Intrinsic dimension]
accent: teal
cool: gold
order: 3
illustration: point-cloud-pruning
github: https://github.com/AndreyMymrin/Geometry-Based-Data-Selection-ML-project-
---

## The idea

Not every training sample is worth keeping. This project scores each sample by its **difficulty or redundancy** using geometric and statistical methods, removes the easiest or most redundant ones, retrains the models on the reduced dataset and measures the effect on performance.

## My part

I implemented the **Intrinsic Dimensionality (ID)–based method** for scoring and selecting samples.

## Result

A significant portion of the training data can be removed without degrading model accuracy.
