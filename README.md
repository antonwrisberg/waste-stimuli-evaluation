# Waste Stimuli Evaluation

This repository currently contains pilot/beta versions of my setup to evaluate waste items prior to experiments evaluating waste signage.

You can see an overview of the 250 waste items currently in the beta version of the stimuli set **[here](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=showcase.0.0.1)**.

## Current challenge

The current challenge in developing these evaluations is to **make sure that participants answer the quesiton we want answered**. To evaluate this, we must bring the setups to the users and ask them to take part while thinking aloud. By asking questions to their reasoning and logic, we might be able to tell when they substitute our questions for other (sometimes easier) quesitons.

To develop new questions to ask that better foster the reasoning we are interested in, we must keep the aim of the study in mind:

## Aim of Evaluation Study

This study aims to evaluate (quantify) waste items along a number of dimensions. These dimensions will ensure that we can select a stimuli set to use in out upcoming experiments that span the dimensions in statistically useful ways.

The dimensions that we expect to consider in the waste sorting experiment are:

- Familiarity (is the waste item recognisable?)
- Frequency (how often is the waste item disposed of?)
- Prototypicality (how well does the waste item align with individuals' instantions of waste fraction prototypes?)
- Conceptual centrality

## Directly measureable dimensions

The first three dimensions above can (somewhat easily) be measured "directly" (or at least by asking participants similar questions).

The links below take you to examples of different versions of implementations of such measures.

### Familiarity

- **[v0.0.1](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=familiarity.0.0.1)**. This setup asks participants to evaluate how familiar waste items are on a scale of familiarity. It is not very intuitive how to map items onto the scale and it is quite slow to interact with (and in pilot tests, multiple participants had difficulties dragging the slides along the scale).
- **[v0.0.2](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=familiarity.0.0.2)**. ==**Current favourite**==. This setup asks participants if they can explain what the displayed items are to other people giving them answer options "yes", "no", and "mayb". I changed the framing to this focus on explainability after pilot tests with students in which they confused questions such as "Can you see what this is?" and "Do you recognise this item?" with whether they where familiar with the brand or specific item. As the important bit in the sortin gexperiments is not familiarity with specific brands but rather that people can identify the waste items, this framing occurs to do the job. The idea is to set some cut-off value for the percentage of "no"s an item is allowed to be included in the final stimuli set.
 
### Frequency

- **[v0.0.1](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=frequency.0.0.1)**. This setup asks participants how often they dispose of items giving them the answer options "once daily", "once weekly", "once monthly", and "once yearly". It is not particularly well-desgined as it is not clear whether it asks for sorting actions or the number of items sorted. Furthermore, what should you answer, if you dispose of, say, 12 batteries one day a year? "Once monthly"? "Once yearly"?
- **[v0.0.2](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=frequency.0.0.2)**. ==**Current favourite**==. This setup asks participants to fill in the blank in the sentence "In the past week, I have disposed of this item __ times". While the format is good in that it offers a simple input and concrete context, it might be too difficult to remember past waste actions.

### Prototypicality

- **[v0.0.1](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=prototypicality.0.0.1)**. This setup asks participants to judge the examplesness of a waste item of a waste fraction on a sliding scale. While it asks participants directly about exampleness it has multiple drawbacks: 1) it is difficult to map exampleness onto the scale, and 2) it might induce the fraction piktogram as the prototype of the fraction against which the waste item is judged.
- **[v0.0.2](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=prototypicality.0.0.2)**. ==**Current favourite**==. This setup first asks participants to create a mental image of (a) waste item(s) that they would categorise as a given waste fraction. Then, the setup presents various waste items to participants and asks them to judge how well the item resembles their mental image on a sliding scale ranging from "looks nothing like my mental image" to "looks exactly like my mental image". Note that the setup is programmed to show a waste item from a different waste fraction as the first item to evaluate to make sure that participants grasp the width of the scale.

## Indirectly measurable dimension

The last of the dimensions presented above (conceptual centrality) cannot be measured directly, but must rather be infered by other dimensions.

My current favourite version of the prototypicality above should, with enough participants, be able to measure all waste items against all fractions (currently, it shows six fraction-congruent and six fraction-incongruent waste items, but these numbers could readily by increased). These measures should allow us to build a conceptual centrality map.

However, I have also considered a few other dimensions that could allow us to evaluate the items conceptual centrality. These include:

- Categorisation (measuring how long it takes to categorise items with default signage)
- Odd-one-out (in triads, which item stands out)

The links below take you to examples of different versions of implementations of such measures.

### Categorisation

| version | comments |
| --- | --- |
| **[v0.0.1](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=categorisation.0.0.1)** | ==**Current favourite**==. This setup shows the participant a waste items and nine waste fractions and asks the participant to click the fraction they believe the item belongs in. *This measure might be relevant as a baseline-measure of the ease of sorting of various waste items regardless of whether it is used to evaluate conceptual centrality*. *Has not been tested on participants yet*. |
| **[v0.0.2](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=categorisation.0.0.2)** | Same as v0.0.1 but also asking participants to evaluate their certainty in the selection. This is interesting, but we might be able to judge this from the response time alone, so no need to burden the participants with this extra questions. Furthermore, it makes the task more cumbersome as you have to move your mouse from the area showing th efractions to the sliding scale with each trial. *Has not been tested on participants yet*. |
| **[v0.0.3](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=categorisation.0.0.3)** | Same as v0.0.1 but where only a random subset of four of the waste fractions are shown. The idea behind this was to also infer a bit about prototypicality of items by measuring how often they select other categories when the obvious(ly correct) category is not present. *Has not been tested on participants yet* |
| **[v0.0.4](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=categorisation.0.0.4)** | Same as v0.0.3, but asking participants which of the subset of four fractions the item fits the worst into. *Has not been tested on participants yet*. |
| **[v0.0.5](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=categorisation.0.0.5)** | A variant of v0.0.1 with more text and arrows. Appears "too much" to me. *Has not been tested on participants yet*. |
| **[v0.0.6](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=categorisation.0.0.6)** | A variant of v0.0.1 but with monocolour waste fraction signs. Just here to show how difficult it becomes when you cannot identify the signs by colour (that you learn after a few trials). *Has (and should maybe) not been tested on participants yet*. |

### Odd-one-out

- **[v0.0.1](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=odd-one-out.0.0.1)**. This setup shows participants three images of waste items and asks participants to find a dimensions in which one of them differs and the two others align. After clicking that item, participants are asked to write down the dimension. The idea behind this setup was to ensure that we understand the dimensions that people use to distinguish waste. However, we might not be interested in more dimensions as that will not be likely to ease our analysis. Furthermore, the concept of a "dimension" might not be comprehensible to people so it might not be very informative. Lastly, the task is quite time-consuming as it shifts from clicking to text-input with each trial (and many trials are necessary for the input to be useful). *Has not been tested on participants yet*.
- **[v0.0.2](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=odd-one-out.0.0.2)**. ==**Current favourite**==. This setup shows participants three images of waste items and asks them to click the one that differs the most. While we still need quite a few trials per participants (as there are many, many combinations of waste items into triads), it is much faster than v0.0.1. Furthermore, it is quite fun (or at least I think so). *Has not been tested on participants yet*.

## Other measures

Finally, I have developed a few measurement setups for measuring other aspects that might be relevant later on and can be useful in our shenanigans.

- Commonality (which items often occur in people's trash by recall)
- Signage familiarity (evaluating the familiarity of the waste fraction signs)

The links below take you to examples of different versions of implementations of such measures.

### Commonality

- **[v0.0.1](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=common-uncommon.0.0.1)**. This setup asks participants to list items they have recently disposed off that often and rarely occur in their waste (by fraction). It was intended to make sure that we take images of waste items that people actually dispose off (in case we do not stumble upon them by chance by sampling from various waste bins). It might not be needed and it turned out to be very difficult to anser!

### Signage familiarity

- **[v0.0.1](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=signage-familiarity.0.0.1)**. This setup is a mirroring of the v0.0.1 of the waste item familiarity evaluation presented above using waste fractions instead of waste items as stimuli. While it might be smart to have a measure of signage familiarity, I am not sure if this way of asking is very good. It would be nice to have a somewhat more concrete answer scale (or even, and preferably, buttoned options).

# Version of current favourites

This is at the bottom, so that PP finds this bit quickly 😇

Currently, I would like to run studies using these measures:

- Familiarity v**0.0.2** [ [example](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=familiarity.0.0.2) &#124; [context](#familiarity) ]
- Frequency v**0.0.2** [ [example](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=frequency.0.0.2) &#124; [context](#frequency) ]
- Prototypicality v**0.0.2** [ [example](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=prototypicality.0.0.2) &#124; [context](#prototypicality) ]
- Odd-one-out v**0.0.2** [ [example](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=odd-one-out.0.0.2) &#124; [context](#odd-one-out) ]

I am not yet sure, if all should be run with the same participants.

Potentially, the study could also include:

- Categorisation v**0.0.1** [ [example](https://antonwrisberg.github.io/waste-stimuli-evaluation/dist/experiment/index.html?version=categorisation.0.0.1) &#124; [context](#categorisation) ]