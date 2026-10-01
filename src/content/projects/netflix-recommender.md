---
title: Movie recommender on the Netflix Prize dataset
summary: An implicit-feedback collaborative filtering recommender trained with ALS, tuned with Optuna and evaluated with ranking metrics.
tags: [Recommender systems, ALS, Optuna]
accent: coral
cool: violet
order: 4
illustration: rating-matrix
github: https://github.com/jameVee/Collaborative-Filtering-Based-Movie-Recommendation-System-Netflix-Prize-Dataset-
---

## Overview

A notebook-based recommender systems project that builds and evaluates an **implicit-feedback collaborative filtering** model on data from the Netflix Prize dataset.

## Workflow

1. Parse user–movie interactions from the Netflix ratings files.
2. Prepare train/test splits with warm-start evaluation.
3. Train an **ALS (Alternating Least Squares)** recommender.
4. Tune hyperparameters with **Optuna**.
5. Evaluate with ranking metrics.
6. Generate movie recommendations for a sample user profile.
