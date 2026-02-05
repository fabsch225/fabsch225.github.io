---
date: 2025-12-06
tags:
 - MyBlog/Technology
 - MyBlog/APL
 - MyBlog/Programming
 - MyBlog/Advent-Of-Code
---

The [Advent of Code](https://adventofcode.com) is a yearly series of (christmas-themed) programming challenges. To learn a new programming languages, solving these is a great start; As i am doing here with APL.

[APL](https://en.wikipedia.org/wiki/APL_(programming_language)) is a programming Language from the 60s, originally intended to replace mathematical syntax. For example, instead of a sum

$$\sum_{k=1}^N \frac{1}{k^2}$$

one would write
```APL
+/1÷⍳N*2
```

Explanation:

| Symbols  | Meaning                                                                    |
| -------- | -------------------------------------------------------------------------- |
| `⍳N`     | is a vector of natural numbers $(1, \dots, N)$                             |
| `1÷⍳N*2` | then is the vector  $\left( 1, \frac{1}{4}, \dots, \frac{1}{N^2} \right)$  |
| `+/`     | is a sum-reduction, i.e. every element of the argument-vector is summed-up |

I am currently on day 8 of Year 2022 in APL. The current state is on [Github](https://github.com/fabsch225/apl).
# Day 1
Credit: https://adventofcode.com/2022/day/1

### Challenge
We must find the Elf carrying the most Calories and report (output) that maximum total Calorie count.
The input is a list of numbers, where each number represents the Calories of a food item. Blank Lines seperate the Elves. Example:

```TXT
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
```

#### Part 2
In the Advent Of Code, there is always a second challenge, which introduces a complication:
Now, we need to find the top-3 elves and compute the total calories between them.

### Implementation
We read the input into a vector of vectors, where each entry in the outer vector is an elve, and the inner vectors contain the calories.

```APL
input ← ⊃⎕NGET '/home/fabian/misc/apl/aoc2022/d1_input.txt' 1   ⍝ Lines as a vector
mask ← (≢¨ input) ≠ 0                                           ⍝ Detect emptys 1 for value else 0
nums ← {⍵≡'' : 0 ⋄ ⍎⍵}¨ input                                   ⍝ Convert to flat vector of numeric values
diffMask ← mask ∧ ~0,¯1↓mask                                    ⍝ Diffs
grouped ← diffMask ⊂ nums                                       ⍝ After each 1 in the diff, split into sub vector
sums ← +/¨grouped                                               ⍝ Sum each sub vector
⌈/sums                                                          ⍝ Get and print maximum
+/ 3↑sums[⍒sums]                                                ⍝ Sum of Top 3 Values
```

Explanation:

| Symbol / Expression            | Meaning                                                                                                               |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `≢`                            | Tally. Returns the number of elements in a vector. For character vectors, this is the string length.                  |
| `(≢¨ input)`                   | Applies `≢` to each element of `input`, producing a vector of string lengths.                                         |
| `(≢¨ input) ≠ 0`               | Compares each length to 0. Produces `1` for non-empty strings and `0` for empty strings.                              |
| `mask ← (≢¨ input) ≠ 0`        | Creates a boolean mask indicating where `input` elements are non-empty.                                               |
| `~`                            | Logical NOT. Flips 0 ↔ 1.                                                                                             |
| `↓`                            | Drop. Removes elements from the beginning (positive) or end (negative) of a vector.                                   |
| `¯1↓mask`                      | Drops the last element of `mask`.                                                                                     |
| `0,¯1↓mask`                    | Prepends a `0` to the shortened mask, shifting it right by one position.                                              |
| `~0,¯1↓mask`                   | Logical NOT of the shifted mask.                                                                                      |
| `mask ∧ ~0,¯1↓mask`            | Logical AND. True where a non-empty element follows an empty one (or the start). This marks the start of a new group. |
| `diffMask ← mask ∧ ~0,¯1↓mask` | A “difference mask” identifying the first element of each contiguous run of values.                                   |
| `⊂`                            | Partitioned Enclose. Groups elements of the right argument based on markers in the left argument.                     |
| `diffMask ⊂ nums`              | Groups `nums` into sub-vectors, starting a new group wherever `diffMask` is 1.                                        |
| `grouped ← diffMask ⊂ nums`    | Result: a nested vector where numeric values are grouped according to runs of non-empty input entries.                |
| `sums ← +/¨grouped  `          | Now we can apply the sum-reduction to each group                                                                      |
| `⌈/sums`                       | Finally we use a maximum reduction to get the result for part 1                                                       |
| `⍒sums`                        | Returns the indices, which would sort the vector `sums` descending                                                    |
| `sums[⍒sums]`                  | So this is the sorted vector                                                                                          |
| `+/ 3↑sums[⍒sums] `            | And we get part 2 by applying a sum-reduction to the top-3 (`3↑`) elements                                            |
# Day 2
Credit: https://adventofcode.com/2022/day/2

### Challenge
The task involves calculating your total score in a multi-round Rock Paper Scissors tournament based on an encrypted Strategy Guide. This guide is interpreted in two different ways (Part One and Part Two). Our Input is the result of each game as lines in a file:

```TXT
A Y
B X
C X
...
```
#### Part One: Simple Mapping (Shape-to-Shape)

In this interpretation, the second column directly indicates the shape you should play.

| Column 1 (Opponent)      | Column 2 (You)           |
| ------------------------ | ------------------------ |
| A = Rock (1 pt)      | X = Rock (1 pt)      |
| B = Paper (2 pts)    | Y = Paper (2 pts)    |
| C = Scissors (3 pts) | Z = Scissors (3 pts) |

Scoring Rules:
- Outcome: Loss (0 pts), Draw (3 pts), Win (6 pts).
- Total Score: Sum of Your Shape Score + Outcome Score for every round.
#### Part Two: Decrypted Mapping (Opponent + Required Outcome)

The second column is re-interpreted to indicate the required outcome of the round, meaning you must choose the shape that achieves that result.

| Column 1 (Opponent) | Column 2 (Required Outcome) |
| ------------------- | --------------------------- |
| A = Rock        | X = Loss (0 pts)        |
| B = Paper       | Y = Draw (3 pts)        |
| C = Scissors    | Z = Win (6 pts)         |

Scoring Rules:
- You must first determine the correct shape to play (Rock, Paper, or Scissors) to get the required outcome.
- Total Score: Sum of Your Chosen Shape Score + Outcome Score for every round.
### Implementation
The implementation plays into APLs strengths: We create a function `Score`, which we apply to the input-vector; then we take the sum.


```APL
input ← ⊃⎕NGET '/home/fabian/misc/apl/aoc2022/d2_input.txt' 1    ⍝ Lines as a vector

Score ← {
    o ← 'ABC'⍳⊃⍵[1]
    m ← 'XYZ'⍳⊃⍵[3]
    shape ← m
	outcome ← (m=o)×3                                           ⍝ Draw
    outcome +← ((m-o)∊1 ¯2)×6                                   ⍝ Win
    shape + outcome
}

+/ Score ¨ d2_input                                             ⍝ Apply to vec and sum

Score2 ← {
    o ← 'ABC'⍳⊃⍵[1]
    outcome ← 'XYZ'⍳⍵[3]
    m ← (outcome=2) × o                                         ⍝ Draw => same shape
    m +← (outcome=3) × 1+3|o                                    ⍝ Win => next shape
    m +← (outcome=1) × 1+3|o-2                                  ⍝ Lose => previous shape
    shape ← m
    outcome ← (outcome-1) × 3
    shape + outcome
}

+/ Score2 ¨ input
```
# Day 3
Credit: https://adventofcode.com/2022/day/1
### Challenge
The first task is to identify the single item type that was incorrectly packed into both compartments of each individual rucksack. Each line in the input represents one rucksack. The line is split exactly in half to form Compartment 1 (first half) and Compartment 2 (second half).
Goal: Find the only item type (single letter) that exists in both Compartment 1 and Compartment 2 for that rucksack.
The output is the sum the priorities of all these common item types across every rucksack.

The priority value for an item type is defined as:
- Lowercase (a-z): Priorities 1 through 26
- Uppercase (A-Z): Priorities 27 through 52

#### Part Two: Group Badges
In Part Two, the objective changes from finding a misplaced item within a single rucksack to identifying a unique Group Badge item that is common among the rucksacks of a group of three Elves. While Part One involves finding the intersection between two equal compartments of one rucksack, Part Two requires finding the item type present in the intersection of the contents of three full rucksacks.
### Implementation
The APL implementation leverages set operations to efficiently find the required common characters. We first create the `Score` function, which maps any item character (a-z, A-Z) to its numerical priority using the Index Of primitive (`⍳`). For Part One, we apply the `ProcessRucksack` function to each line, which splits the string into two halves using dyadic slicing, finds the single common element with the Intersection primitive (`∩`), and applies the `Score` function before summing the results using Reduction (`+/`). For Part Two, we structure the input into three-line groups using the Partition operator (`⊂`), and the `ProcessGroup` function then uses Intersection Reduction (`∩/`) to quickly find the common badge character among the three rucksacks before we sum all the badge priorities.

```APL
⎕IO ← 0

input ← ⊃⎕NGET '/home/fabian/misc/apl/aoc2022/d3_input.txt' 1       ⍝ Lines as a vector

Score ← {
	1 + 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'⍳⊃⍵   ⍝ Maps a->1, b->2 ... z->26, A->27 ... Z->52
}

ProcessRucksack ← {
	len ← ⍴⍵
	mid ← len ÷ 2
    dupes ← ∪ (mid↑⍵) ∩ (mid↓⍵)                                     ⍝ Substring: First Half mid↑⍵; Intersection
    +/ ¨ Score +/ ¨ dupes
}

⎕ ← output ← +/ ProcessRucksack ¨ input                             ⍝ Apply to each Rucksack

mask ← (⍴ input) ⍴ 1 0 0                                            ⍝ Create mask = 1 0 0 1 0 0 ... for grouping
groups ← mask ⊂ input                                               ⍝ Put 3 rucksacks into one group
		
ProcessGroup ← {
	code ← ∪ ⊃ ∩/ ⍵                                                 ⍝ Intersect and get character
	Score code                                                      ⍝ Evaluate character								
}

⎕ ← output2 ← +/ ProcessGroup ¨ groups                              ⍝ Sum evaluation for each group	

```