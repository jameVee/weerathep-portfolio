---
title: Treasure collection with dynamic programming
summary: A reinforcement learning agent that uses dynamic programming to find the best route for collecting treasures in a GridWorld, with a limited backpack.
tags: [Reinforcement learning, Dynamic programming, GridWorld]
accent: gold
cool: teal
order: 5
illustration: gridworld-policy
links:
  - label: Open in Google Colab
    url: https://colab.research.google.com/drive/1RgaK3ihWWIeZzcFFMcLqQYIfdkbUF9UE?usp=sharing
---

## Overview

This project implements a **reinforcement learning** solution that uses **dynamic programming (DP)** algorithms to find an optimal policy for an agent navigating a GridWorld environment to collect treasures.

## The challenge

The agent has to **maximize its cumulative reward** while respecting its **limited backpack capacity**, so the best policy depends not only on where the treasures are but also on how much the agent is already carrying.
