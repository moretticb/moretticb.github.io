---
layout: page
title: Knowledge Discovery and Rehabilitation Robotics data
excerpt: "Data Mining and Knowledge Discovery strategies over the performance of patients enrolled in physical rehabilitation programs, under the rehabilitation robotics paradigm."
modified: 2017-06-11T19:44:38.564948-04:00
image:
  feature: 
---

This project encompasses Data Mining and Knowledge Discoery strategies over the performance of patients enrolled in physical rehabilitation programs, under the rehabilitation robotics paradigm. Check the video below for an overview, or check the sections below. Check also [publications](#publications) section for specific details.

<iframe width="560" height="315" src="//www.youtube.com/embed/LTJLwk6wPh0" frameborder="0"> </iframe>

* Sections
{:toc}

## Introduction and motivation
The motivation of patients enrolled in physical rehabilitation programs may significantly contribute to ultimate outcomes.

Robotic rehabilitation affords a significantly higher number of repetitions per treatment session keeping patients motivated. This approach consists of a robotic device being used as an interface to a computer game. This virtual environment enhances patient’s attention, turning physical effort to an engaging activity.

Since robotic devices are coupled to computers and sensors, there comes up the ability to store and analyze the motor behavior of patients during sessions for the detection of potential patterns related to particular pathologies. However, despite of this rich potential of data analysis, a lack of such practices is still quite noticeable, and is just starting to be filled, as more related work, concerning data, arise.

## Objectives
Part of the demand of rehabilitation services comes from patients who suffered a stroke. My research project takes place over this contingent aiming to raise a performance indicator as a function of patient behavior and time.

Another goal of this project, which comes as a consequence of the first one, is to build a dataset, from real patient data, suitable for data science and machine learning, in order to establish substantial means for comparison of related work, due to the lacking data analysis strategies in this field.

## Methods

Even with a variety of robotic devices, as well as ways to generate data, analysis strategies tend to be similar, in a very abstract sense, since everything is about collecting representations of motor behavior over time.

Analysis approaches take place either at a restricted scope, within sessions, or at its widest, over the course of the entire treatment. This project encompasses both of them.

A device called InMotion Arm, for the rehabilitation of upper limbs, was used to collected data describing the performance of eight male and eight female patients diagnosed with left or right hemiparesis. No data regarding non-paretic sides were considered. It is important to point out that the identity of patients were preserved and the interactions, be human or robotic, comply to requirements of an ethics committee.

Displaying eight targets arranged around the edge, and a central target, the goal of the game is to perform reaching movements towards the indicated target and the whole cycle of movements traces a star-like pattern.

A single file represents a single reaching movement. Each movement is represented by time offsets, positions, velocities and forces being collected at 200Hz.

Given some performance data, a preliminary goal was to distinguish between left and right hemiparesis. Towards such a goal, an entire cycle was considered an instance of the dataset, having left or right as the desired output, also called a label. However, since each patient have a particular physical condition to perform the exercise, there is time dependency, entailing instances with variable sizes.

With the purpose of eliminating such an issue, for each instance, statistical moments were calculated over the distribution of each column for feature extraction. Composed by mean, standard deviation, skewness and kurosis of positions, velocities and forces, instances now have a fixed size, no longer leaning on time domain.

Through visual inspections of the subspaces, some attributes presented a quite good discriminative aspect related to left and right hemiparesis. Even in single dimensions there can be observed a proneness to separability.

Before submitting the dataset to classification algorithms, some attributes were selected based on its entropies, as well as correlations to the labels. The final dataset is composed of eight attributes, and the label. It encompasses 257 instances of the sixteen patients, being 132 and 125 instances respectively labeled as left and right hemiparesis.

Regarding classification, some candidate algorithms were selected and ranges were assigned to each of its parameters, performing a grid search in order to fetch the model that best fits the dataset. A 10-fold cross validation was performed at each search iteration, avoiding to fetch an overfitted model.

## Results and discussion

The best model fitted data with an accuracy of 94%, which is a considerable outcome. However, the interesting part lies in the number of hyperplanes of the model. A single neuron was able to perform a good classification, which gives a core insight: This strong evidence of linear separability leads to the use of a Support Vector Machine that will certainly perform better generalization.

From a not-so-thorough inspection of some subspaces, one observes an intersection between instances of different labels, which leads to an uncertainty in classification, since the model output at the background has a smooth change between classes along the space.

So far, improvements towards sharpening this change would bring no considerable benefits. In fact, uncertainty can be interpreted as the state of rehabilitation, when an individual recovered so well that it is no longer wise to assure regarding paresis impairments.

Now this uncertainty carries the core of this research project, raising an initial hypothesis: There is a space whose components, arising from kinematic and dynamic measures, allows the mapping of the state of rehabilitation.

When isolating patients, for example, there can be seen performance, in the obtained space, given by points, which are the aforementioned cycle of movements performed on one or more sessions. A hypothesis will be formally defined along the study of the convergence of these points towards the hyperplane, or in other words, whether the distance from instances to the hyperplane decreases over time.


## Publications

**C. B. Moretti**, R. C. Joaquim, T. T. Terranova, L. R. Battistella, S. Mazzoleni and G. A. P. Caurin, "[Knowledge Discovery strategy over patient performance data towards the extraction of hemiparesis-inherent features: A case study][BioRob2016]," *2016 6th IEEE International Conference on Biomedical Robotics and Biomechatronics (BioRob)*, Singapore, 2016, pp. 717-722.

**C. B. Moretti**, R. C. Joaquim, G. A. P. Caurin, H. I. Krebs and J. Martins, "[Knowledge discovery, rehabilitation robotics, and serious games: Examining training data][BioRob2014]," *5th IEEE RAS/EMBS International Conference on Biomedical Robotics and Biomechatronics*, Sao Paulo, 2014, pp. 567-572.

**Moretti, C. B.** (2016). [Análise de grandezas cinemáticas e dinâmicas inerentes à hemiparesia através da descoberta de conhecimento em bases de dados][MasterThesis]. Master's Dissertation, Escola de Engenharia de São Carlos, University of São Paulo, São Carlos. 

[MasterThesis]: http://www.teses.usp.br/teses/disponiveis/18/18149/tde-13062016-184240/en.php
[BioRob2016]: http://ieeexplore.ieee.org/document/7523711/
[BioRob2014]: http://ieeexplore.ieee.org/document/6913838/
