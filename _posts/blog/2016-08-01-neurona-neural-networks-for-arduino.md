---
layout: post
title: "Neurona - Artificial Neural Networks for Arduino"
modified:
categories: blog
excerpt: Neurona is an Arduino library which allows boards to feed Artificial Neural Network (ANN) structures in order to perform tasks such as pattern recognition (classification), function approximation and time-series predictions.
author: caio
tags: [machine-learning,projects]
share: true
image:
  feature: neuronaCapa.png
date: 2016-08-01W00:42:05-04:00
modified: 2016-06-01T14:19:19-04:00
---
Neurona is an Arduino library which allows boards to feed Artificial Neural Network (ANN) structures in order to perform tasks such as pattern recognition (classification), non-linear regression, function approximation and time-series prediction from the implemented architectures:

* [Multi-Layer Perceptron (MLP)][MLPTraining]
* ~~Perceptron~~ (to be implemented)
* ~~Learning Vector Quantization (LVQ-1)~~ (to be implemented)

Since only the operation mode of these architectures are deployable in microcontrollers, you should also check the respective full implementations (training and operation modes) of the involved architectures; the links in the list above bring more details and the codes available to download. From these programs, it is possible to train topologies of an archictecture, so its output (an array of adjusted weights) constitutes the trained network to be embedded along with an Arduino program.

## Download and installation

If you want to install Neurona, you can either search for Neurona in Arduino’s Library Manager or download by clicking the button below:

<div markdown="0"><a href="http://www.github.com/MorettiCB/Neurona" class="btn">Download Neurona</a></div>

Check also [Neurona documentation][NeuronaDocs] for code reference. [Click here][ArduinoInstallHelp] if you need aditional help in the installation step.

## Projects

An usage example of this library can be seen in the **[<u>Color sensor prototype</u>][ColorSensorProj]** project; Neurona performs classification of color patterns, given RGB values as input, retrieving the name of the recognized color.

[MLPTraining]: /blog/multilayer-perceptron-implementation-in-c/
[NeuronaDocs]: /Neurona
[ArduinoInstallHelp]: http://www.arduino.cc/en/guide/libraries
[ColorSensorProj]: /blog/color-sensor-prototype-using-neural-networks/
