---
title: Hallucination detection in tool-calling dialogues
summary: Span-level detection and classification of hallucinations in LLM answers that use tool calls, with new datasets and a model that beat both baselines.
highlight: Outperformed both baselines on all three hallucination types
tags: [LLMs, Span classification, ToolACE, Hugging Face]
accent: sky
cool: violet
order: 2
illustration: hallucination-span
github: https://github.com/hrbaruri/Hallucination-Detection
links:
  - label: Datasets on Hugging Face
    url: https://huggingface.co/datasets/jameVee/ToolACE-Hallucination
  - label: Detector model on Hugging Face
    url: https://huggingface.co/jameVee/ToolACE-Hallucination-Detector
---

## The problem

AI assistants increasingly answer by calling tools. When the final answer doesn't match what the tools returned, the assistant becomes unreliable in ways that are hard to spot. We built a pipeline for detecting and classifying these hallucinations at the span level.

## What my teammates and I did

- **Built three annotated datasets** from the ToolACE dialogue corpus by programmatically injecting span-level hallucinations of three types:
  - **Tool output contradictions:** the model states facts that conflict with the tool's response.
  - **Overgeneration:** the model adds information that isn't in the tool output.
  - **Missing tool references:** the model suggests actions that need tools it doesn't have.
- **Formatted every dataset in a RAGTruth-compatible schema**, so it works with existing evaluation frameworks.
- **Evaluated two baseline detectors:** LettuceDetect (BERT-based token classification) and LookBackLens (an attention-signal-based LLM classifier).
- **Trained an improved span classification model** that outperformed both baselines on all three hallucination types.

The datasets and the detector model are published on Hugging Face (links above).
