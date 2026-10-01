---
title: Movie recommender on the Netflix Prize dataset
summary: Matrix factorization with Alternating Least Squares, with pipelines that produce top-10 personalized recommendations for warm-start and hot-start users.
tags: [Recommender systems, ALS]
accent: gold
cool: indigo
order: 3
illustration: rating-matrix
---

## The problem

The Netflix Prize data is a huge, very sparse user-by-movie rating matrix: most users have rated only a tiny share of the catalogue. A recommender has to fill in the missing cells well enough to rank the movies each user hasn't seen.

## What I built

- **Matrix factorization with Alternating Least Squares (ALS)**, which learns a short vector for every user and every movie and predicts a rating from their dot product.
- **Recommendation pipelines** that turn the predicted ratings into a **top-10 list** per user.
- Separate handling for **warm-start** users, who already have history in the training data, and **hot-start** users, who arrive with only a few fresh ratings.

*Coursework at Skoltech.*
