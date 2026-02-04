---
tags:
  - MyBlog/Learning
  - MyBlog/Chess
---
Before starting Uni, I tried coding a chess-engine to ready my programming skills. Now, in my last semester, I want to revisit the challenge. There I can reflect upon skills gained in software engineering and algorithm design. This time, im programming the engine in CPP instead of java.

Here is an overview of the components of a chess-engine:

| Component       | Purpose                                                                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Move-generation | Generate legal moves for a position. Rules like en-passant and castling are to be considered. Move-generation can be done very efficiently using Bitboards. |
| Search          | Search the game-tree. Optimization and parralelisation are major challenges                                                                                 |
| Evaluation      | Evaluating a position. Both material value and strategy and tactics are considered. Here, neural networks can be used effectively                           |
| Databases       | Probing opening and endgame databases during the game                                                                                                       |
| Interfaces      | Interacting with other chess programs using standard protocols like UCI                                                                                     |

In my implementation, i used the [surge](https://github.com/nkarve/surge) as a library for move-generation and [Fathom](https://github.com/jdart1/Fathom) for probing of the Syzygy tablebases (endgame-databases). In the  following post I want to cover interesting details of my chess-engine. The (wip) engine is published on github under the name [Wombat](https://github.com/fabsch225/Wombat).

To be continued.

