---
tags:
  - MyBlog/Math
date: 2025-09-02
draft: true
---

Mathematics is full of puzzles that appear contradictory at first sight. Often, the resolution comes from taking a closer look at how limits work. Limits are subtle: rules that apply to finite sums, finite shapes, or finite processes often change once we let the number of steps go to infinity. This shift is where paradoxes arise, two of which a covered in this post.
# Zeno's Turtle
The Greek philosopher [Zeno of Elea](https://en.wikipedia.org/wiki/Zeno_of_Elea) is famous for formulating paradoxes that challenge our intuition about motion and infinity. His most iconic thought experiment imagines Achilles chasing a turtle. Even though Achilles runs faster, Zeno argues he can never catch the turtle: by the time Achilles reaches where the turtle was, the turtle has moved a little further ahead, and so on, ad infinitum.
Formally, we can write Achilles’ path as a [geometric series](https://en.wikipedia.org/wiki/Geometric_series). 

Suppose Achilles runs ten times faster than the turtle, and the turtle has a head start of distance $d$. The sequence of distances Achilles runs to reach the turtle’s successive positions is:

$$d, \tfrac{d}{10},\; \tfrac{d}{100},\; \tfrac{d}{1000}, \ldots$$

This is an infinite sum:
$$S = d + \frac{d}{10} + \frac{d}{100} + \frac{d}{1000} + \cdots$$
At first glance, it seems Achilles must complete infinitely many tasks, therefore he will never reach the turtle. But the infinite series has a finite limit:

$$S = \sum_{k=0}^{\infty} \frac{d}{10^k} = \frac{d}{1 - \tfrac{1}{10}} = \frac{10}{9} d.$$

Achilles needs to run only a finite distance, slightly larger than $d$, to overtake the turtle. This is intuitive: The larger the speed-ratio of the both, the smaller the distance. The paradox dissolves once we accept that an infinite process can converge to a finite outcome.

# The Squaring of the Circle
Jumping from ancient paradoxes to modern misadventures, we find another famous impossibility: _squaring the circle_. The goal is to construct, with straightedge and compass alone, a square with the same area as a given circle. For centuries, mathematicians tried and failed, until the problem was finally settled in the 19th century.

## The Indiana PI Bill and its Misassumptions
One of the more curious episodes is the story of Edward J. Goodwin, an amateur mathematician from Indiana. In 1897 he [proposed a bill to the Indiana legislature](https://en.wikipedia.org/wiki/Indiana_pi_bill), attempting to legislate a new value of $\pi$ by redefining certain geometric constructions. The bill passed the House before it was quietly buried in the Senate, saved by the intervention of a visiting Purdue professor.

One version of Goodwin’s claim concerned the diagonal of a square. If a square has side length $a$, its diagonal is $\sqrt{2} \cdot a$. Goodwin’s proposition effectively assumed that ratios involving $\sqrt{2}$ could be expressed using only rational relations, which is false.

We can formalize this idea by looking at [length as a functional](https://en.wikipedia.org/wiki/Arc_length): assigning to each geometric object its length. However, this functional is not continuous in the sense Goodwin required. The staircase approximation to a diagonal illustrates this point:

![[staircases.png]]

Each staircase has length equal to the sum of its horizontal and vertical steps, always greater than the diagonal. Yet as the steps become finer, the staircase visually converges to the diagonal. The paradox is that the length functional does not behave continuously under this limiting process. 

Length can be expressed as a map from the Set of continuous functions $f : \Bbb R \to \Bbb R^2$ to the $\Bbb R$. This map assigns each of these functions the length of their graph.

$$L : C^1(\Bbb R, \Bbb R^2) \to \Bbb R, f \mapsto L(f)$$

From the example above, we can conclude that $L$ itself is *not continuous*, because the sequence of staircase-functions $f_n$ does converge (uniformly) against the diagonal $f$, but

$$L(\lim_{n \to \infty} f_n) = L(f)  = \sqrt{2} \cdot \alpha \neq 2 \cdot \alpha = \lim_{n \to \infty} L(f_n).$$

This is a counter-example to the limit-version of continuity.

Goodwin's error was to assume some statement to hold for an approximation of the circle. Even though the approximation's error is arbitrarily small, his statement cant be applied to circle (the limit). 
## The irrationality of PI

To fully understand why squaring the circle is impossible, we must confront the nature of $\pi$.

One classical proof of $\pi$’s irrationality (due to Lambert[^1], 1768) uses continued fractions for the tangent function. He showed that $\tan x$ has an infinite continued fraction expansion, and from this it follows that if $\pi/4$ were rational, then $\tan(\pi/4)=1$ could not be represented correctly. This contradiction implies $\pi$ is irrational.

Modern proofs refine and extend these arguments, some even proving that $\pi$ is transcendental (not the root of any polynomial with integer coefficients).

Since straightedge-and-compass constructions can only generate numbers obtained through a finite sequence of rational operations and square roots, constructing a square with area exactly equal to a circle’s area would require $\pi$ to be algebraic. But $\pi$ is transcendental. Thus, the ancient dream of squaring the circle is not just difficult, it is *mathematically impossible*.


[^1]: https://kconrad.math.uconn.edu/blurbs/analysis/irrational.pdf
