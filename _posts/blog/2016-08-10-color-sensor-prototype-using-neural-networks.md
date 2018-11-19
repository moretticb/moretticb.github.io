---
layout: post
title: "Color sensor prototype using artificial neural networks"
modified:
categories: blog
excerpt: This project encompasses the development of an initial architecture of a color sensor for colorblind using artificial neural networks. A Multi-Layer Perceptron topology, properly trained with backpropagation algorithm performs mapping in the RGB color space and the recognition of 10 different colors.
author: caio
tags: [machine-learning,projects]
share: true
image:
  feature: colorSensorCapa.png
date: 2016-08-10W21:16:45-04:00
---
Colors play a very important role in human daily activities, being tied to several connotations, such as its functions in traffic lights, raiment of a particular profession, entity representation through geometric shapes, human-computer interaction concepts, and others. Such examples denote an universal language that does not sit well with idiomatic languages. Color blindness, however, affects (or even ceases) this sort of asset in communication, which can be [explained][PubMedLink]{:target="_blank"} as abnormal photopigments, located in cone-shaped cells within the retina, called *cone cells*.

* Sections
{:toc}

This article is divided in the sections listed above. If you wanna jump to the technical details, check [implementation details](#implementation-details) or download the code at the [GitHub][ColorSensorRepo]{:target="_blank"} repository. Before continuing your reading, check the project video to see what this project is really about :)

<iframe width="560" height="315" src="//www.youtube.com/embed/pc4IlCQ8TZM" frameborder="0"> </iframe>

## Project overview

Similar to color vision of the human eye, as well as based in light, the RGB model comprises more than 16 million colors, which are arranged in a 3d space, where integer values of components R (Red), G (Green) and B (Blue), ranging from 0 to 255, constitute coordinates of this space. From this model, color detection and recognition were performed with light-related electronic components and machine learning mechanisms; it is essentially the combination of an RGB LED and a CdS Cell (light sensor, or LDR), both isolated from ambient light. Such components, respectively, emit and sense the intensity of each light (red, green and blue) which was reflected from an object of a particular color.

Color recognition can be performed with machine learning algorithms, such as [Multi-Layer Perceptron][MLPLink] (MLP) - an architecture of Artificial Neural Networks (ANN). It allows classification and recognition of spatially separable patterns - very useful in this case.

It is important to consider situations when the human eye unsuccessfully attempts to recognize colors due to poor ambient conditions, or even difficulties in distinguishing particular shades of colors. This is comparable to outliers or distorted patterns, which may affect precision in the recognizing task; regarding feature (RGB) space, a misclassified color should be interpreted as a coordinate located at spatial regions associated to another color (sometimes due to poor generalization, overfitting, and many other possibilites).

An MLP, during training, should perform mapping of regions in the RGB color space illustrated below. Each region isolated by hyperplanes represent a color, so every new color pattern located in a particular region is classified as its respective color.

<figure class="half">
	<a href="/images/colorSensorRgbCube1.png"><img src="/images/colorSensorRgbCube1.png" alt="image"></a>
	<a href="/images/colorSensorRgbCube2.png"><img src="/images/colorSensorRgbCube2.png" alt="image"></a>
	<figcaption>RGB color space.</figcaption>
</figure>

### Multi-Layer Perceptron

Multi-Layer Perceptron is a feedforward architecture of ANNs, having an input (non-neural) layer, hidden layers and an output layer. This network is trained by backpropagation algorithm, performing supervised learning (learning by examples).

Topology configuration (i.e., size of each layer) is defined according to a specific problem to be worked on. For this color sensor, as indicated in the [MLP Topology Workbench][MTWPost]{:target="_blank"} below, the neural network receives 3 inputs (RGB values), having one hidden layer with 6 neurons and an output layer with 10 neurons - just recalling: the output layer must have the same number of classes (colors, in this case), for a binarized output. Hidden-layer sizes are empirically obtained, establishing ranges of values for each topological parameter, so that approaches for [Hyperparameter optimization](https://en.wikipedia.org/wiki/Hyperparameter_optimization) may find potentially good results (this can be a bit difficult and slow sometimes). The network below is already trained and interactive, so it is possible to input values at training tab and check the outputs.

<iframe width="600" height="560" src="http://www.moretticb.com/MTW/Tool/embed.html#3,6,10,s,s,e1e-7,r0.1,w2.75309|-11.47226|-3.31174|16.48123|19.50701|20.83178|7.11333|-6.42349|1.90722|6.49539|-27.71213|26.22820|-0.20637|-5.72456|-22.27807|30.06561|6.13926|-10.81428|28.51313|-9.78495|6.46702|0.05500|3.73036|4.14509|2.47902|0.01300|-3.58242|-16.36439|14.13336|-5.08929|1.63749|5.89483|1.41576|-3.31553|14.81429|-20.90657|-1.56866|1.91766|4.91018|4.03942|-10.84847|-5.64168|-4.13243|10.71144|3.75994|19.50770|17.72872|-3.21024|-2.47699|8.98845|5.19683|2.63604|17.35721|2.00543|11.71339|-5.45325|-6.94032|10.75201|0.66661|-7.26608|-3.58712|-9.92182|-12.68206|-15.45614|-13.74093|0.50826|15.17941|-11.14318|-19.08512|1.25124|22.00649|-4.22733|-0.44452|3.58902|0.64966|13.67560|-13.02688|-11.22907|-15.30070|-1.71819|6.73797|-28.17680|-2.50547|5.19797|7.00798|-2.86927|3.65035|18.02920|4.09836|10.48119|-2.56631|9.92777|2.34494|4.52433|" style="max-width: 600px; width: 100%; height: 568px;" frameborder="0"></iframe>

### Color recognition

With the purpose of obtaining generalization with an MLP for a good recognition of RGB patterns, a training set (examples of colors with the desired output) must be presented to the network for the training step ([download][MLPGitHubLink]{:target="_blank"} the implemented architecture to perform training). The training set used in this project is available at the project's [GitHub][ColorSensorRepo]{:target="_blank"} repository.

Generalization will happen within the domain that the training set comprises, so it is worth to pay attention to minimum and maximum values of each component of the space! Do not feed the network with patterns outside this domain, otherwise it would output an unexpected behavior.

The dataset (all examples) contains 75 instances of color patterns ranging from 0 to 1 (logistic activation function was used). Initially ranging from 0 to 255, these instances were rescaled by simply dividing each value by 255, such that \\( 0 \leq x_1, x_2, x_3 \leq 1 \\). It is important to point out that only one neuron at the output layer must output 1, whereas the remaining ones must output zero. Of course this is not possible using a sigmoid activation function; that's when post-processing takes place:

$$ y_i^{post} = \begin{cases} 1 & \text{, if }y_i=\max(y)\\ 0 & \text{, otherwise} \end{cases} $$

where \\( y_i \\) is the output of the \\( i^{th} \\) neuron and \\( \max(y) \\) is the is the greatest output value. In practical terms, the neuron with the greatest output gives 1 as output and the remaining ones give 0. Simple as that.

A trained MLP should create regions in the color space, separating color patterns, as shown below the [visualization][p3dLink]{:target="_blank"} of the instances of the dataset. Gray color instances are also included for another version of the trained network - but pretend gray instances are not there.

<iframe src="https://p3d.in/e/7DJDC+spin+load" width="100%" height="480" frameborder="0" seamless allowfullscreen webkitallowfullscreen></iframe>

## Implementation details

This section is divided in three parts: [electronic circuit](#electronic-circuit), [color theory](#color-theory) and [programming](#programming). Click the links if you want to jump to a specific part.

### Electronic circuit

Arising from objects, all the detection procedure happens in the electronic circuit, encompassing computational activity running in an Atmega328, which is hooked up in an Arduino Uno. Check the scheme below to see the wiring.

<figure class="half">
	<a href="/images/colorSensorSchemeAnode.png"><img src="/images/colorSensorSchemeAnode.png" alt="image"></a>
	<a href="/images/colorSensorSchemeCathode.png"><img src="/images/colorSensorSchemeCathode.png" alt="image"></a>
	<figcaption>Electronic circuit schemes using respectively common anode and cathode RGB LED.</figcaption>
</figure>

The code follows the scheme that uses a common anode RGB LED, so check whether your RGB LED is also a common anode, otherwise just invert the logic in the code.

Another important detail is that I am using only one resistor with the RGB LED. Since one color at a time will be lit, I put the resistor in the common anode, with an average resistance of the resistors that **should have been** with the cathodes - it is lazy, I know and I am sorry! When I went to buy project parts, they didn't have everything I needed - but it is however very important to use the correct resistors with the cathodes in order to have fidelity in the collected RGB values in relation to RGB values in the computer. The way I did is not that bad, since the patterns are not distorted; they are just not the same colors we see in a computer screen.

It can be observed from the scheme an adjacency between the RGB LED and the CdS Cell. That is because they must be isolated from ambient light (an oldie black film tube is the perfect piece), so calibration (explained in [Programming](#programming)) and recognition can be performed.


### Color theory

Color perception performed by the electronic circuit is based in color theory concepts. Since there are no lenses (yet) involved, only objects with opaque (and matte) material should be considered, avoiding to deal with specular reflection of the LED. Diffuse reflection on the other hand is the key to perform color detection with lights. From an incident light, it is reflected in irregular surfaces, not creating that glowish effect that ruins the function of the CdS Cell.

Back to actual color theory, when light (of a certain color) reaches an object, it is reflected according to properties of that object's color. For example, a red light reaching a yellow object will be reflected according to how much red exists in the composition of that yellow color - remember, we are talking about lights! - so it is expected to have a lot of red light being reflected, what makes sense when we think of the RGB composition of yellow (essentially red and green). However, when a blue light reaches the yellow object, no strong reflection is expected due to low presence of blue in the color composition.

<figure>
	<a href="/images/colorSensorDetection.png"><img src="/images/colorSensorDetection.png" alt="image"></a>
	<figcaption>Acquisition of RGB values for detection and calibration.</figcaption>
</figure>

Considering an additive color system, in which white and black are respectively presence and absence of every colors (more details [here][KodakLink]{:target="_blank"}), there can be measured (with the CdS Cell) maximum and minimum reflections of each light from the RGB LED which will reach colored objects. That said, it is possible to perform the calibration in electronic components involved in the circuit. This is another key to get fidelity in detection, as well as to ensure a stable detection of patterns (avoiding outliers) - here is a golden tip: after calibrating, try (hard!) not to move or touch neither the electronic components (specially when they are placed in a breadboard), nor the piece you are using (you must use) to isolate components from ambient light.

### Programming

For calibration and recognition, the color sensor executes three iterations, once a colored object is exposed to the RGB LED and the CdS Cell. In the first iteration, red light hits the object and the program waits CdS cell to stabilize its sensing; the analog input is then read and the reflection of the red light is stored. The program iterates twice more for green and blue colors. The figure shown in [Color theory](#color-theory) gives a good visual explanation of this iterative process.

Concerning calibration, the iterative process mentioned above is performed twice: once for black color and once for white color. As explained in [Color theory](#color-theory), this is for the detection of maximum and minimum - initially from *near zero* to *near 1024*, according to the reading resolution - reflections of red, green and blue lights, obtaining a true range to properly rescale to intervals \\( [0,255] \\) (for informative purpose) and \\( [0,1] \\) (the actual input to feed the neural network).

The waiting time to establish reading of the light sensor can vary according to each electronic component, so it is good to give a good delay to ensure a steady sensing. In my case, I gave a 500-millisecond delay, but it is worth to initially use a bigger value and then decreasing it until the verge of a non steady behavior.

In detection, the collected RGB values - ranging from 0 to 1 - feed an MLP, performing the actual color recognition. For the MLP running in Arduino, I am using [Neurona][NeuronaDocs]{:target="_blank"} - a library I wrote to easily use ANNs in arduino. Check also [this post][NeuronaPost] for more details; for training MLPs, I am using [an implementation][MLPLink] in C language (The [MLP Topology Workbench][MTWPost] also does the job), giving the adjusted weights to use with Neurona. Still regarding training, it was used \\( \alpha=0.8 \\), \\( \eta=0.1 \\) and \\( \epsilon=10^{-7} \\).

Given topologic configuration and the dataset, five trainings were performed (with cross-validation), each one with a random initial state of the synaptic weights:

| Training # | Epochs   | Accuracy |
|:----------:|:--------:|:--------:|
| 1          | 1565     | 67%      |
| **2**      | **2353** | **95%**  |
| 3          | 3315     | 80%      |
| 4          | 4239     | 93%      |
| 5          | 680      | 40%      |
{: .table}

From a balanced dataset, accuracy was considered to compare training results. Training #2 presented best generalization, being the one to have its weights embedded along with Neurona and the Arduino program.

## Tests

Bringing a more practical perspective, some colors were extracted from the dataset to perform some recognition tests:

<figure>
	<a href="/images/colorSensorTest.png"><img src="/images/colorSensorTest.png" alt="image"></a>
	<figcaption>Printed samples for testing the color sensor.</figcaption>
</figure>

Numbers outside the figure are used for identification and numbers inside the figure indicate misclassifications, referencing which colors were classified instead. These colors were printed in sulfite paper with an inkjet printer - check the tiny paper squares in the video in the beginning of this post - so the *objects* consist of opaque material, proper for color detection.

[PubMedLink]: http://www.ncbi.nlm.nih.gov/pubmedhealth/PMHT0024265/
[ColorSensorRepo]: http://www.github.com/moretticb/ColorSensor
[MLPLink]: /blog/multilayer-perceptron-implementation-in-c/
[MLPGitHubLink]: https://github.com/moretticb/ML-Implementations/tree/master/MLP
[KodakLink]: http://motion.kodak.com/KodakGCG/uploadedfiles/motion/US_plugins_acrobat_en_motion_education_colorTheory.pdf
[NeuronaDocs]: /Neurona
[NeuronaPost]: /blog/neurona-neural-networks-for-arduino/
[p3dLink]: https://p3d.in/e/7DJDC+spin+load
[MTWPost]: /MTW
