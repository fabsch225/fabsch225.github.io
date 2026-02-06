'use client';

export const dynamic = 'force-static'

import '@root/global.scss';

import * as Utilities from '@common/utilities';

import Accordion, { AccordionContext } from '@components/Accordion';
import ActionListItem from '@components/ActionListItem';
import Avatar from '@components/Avatar';
import Button from '@components/Button';
import Card from '@components/Card';
import Grid from '@components/Grid';
import ListItem from '@components/ListItem';
import Row from '@components/Row';
import Table from '@root/components/Table';
import TableColumn from '@root/components/TableColumn';
import TableRow from '@root/components/TableRow';
import Text from '@components/Text';
import DefaultLayout from '@components/page/DefaultLayout';

import { useEffect, useState, useRef, use } from 'react';
import ButtonStack from '@root/components/custom/ButtonStack';
import CodeBlock from '@root/components/CodeBlock';

//cv link 
const cv_link = "https://www.dropbox.com/scl/fo/412zx36yzivnz03928t6h/AAUFRQ-MKoDo_CkxZYf3y4c?rlkey=l4b0r5mmzfr0p1mqqurx8jhkr&st=dlfpkqb0&dl=1";

const ProjectCard = ({ title, children, githubLink = null, demoLink = null }: any) => (
  <div style={{ marginTop: '1ch' }}>
    <Card style={{ textAlign: 'justify' }} title={title}>
      {children}
      <br></br>
      {(githubLink || demoLink) && <br />}
      {githubLink && (
        <Row>
          <ActionListItem icon={'->'} href={githubLink} target="_blank">
            View the Project on Github
          </ActionListItem>
        </Row>
      )}
      {demoLink && (
        <Row>
          <ActionListItem icon={'->'} href={demoLink} target="_blank">
            View a Demonstration in the Browser
          </ActionListItem>
        </Row>
      )}
    </Card>
    <br />
  </div>
);


function closeAllAccordions() {
  const accordions = document.querySelectorAll('[aria-expanded="true"]');
  accordions.forEach((accordion) => {
    (accordion as HTMLElement).click();
  });
}

//Utilities.onHandleThemeChange('')
//Utilities.onHandleThemeChange('theme-dark')

export default function Portfolio() {
  const [openAccordions, setOpenAccordions] = useState<number>(0);
  const buttonStackRef = useRef<HTMLDivElement>(null);
  const prevOpenAccordionsRef = useRef<number>(0);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (darkModeMediaQuery.matches) {
      Utilities.onHandleThemeChange('theme-dark');
    } else {
      Utilities.onHandleThemeChange('');
    }
    const themeChangeHandler = (e: MediaQueryListEvent) => {
      Utilities.onHandleThemeChange(e.matches ? 'theme-dark' : '');
    };

    darkModeMediaQuery.addEventListener('change', themeChangeHandler);

    const countAccordions = () => {
      const accordions = document.querySelectorAll('[aria-expanded="true"]');
      setOpenAccordions(accordions.length);
    };

    window.addEventListener('click', countAccordions);

    const handleScroll = () => {
      const closeButton = document.getElementById('close-all-button');
      const buttonStack = buttonStackRef.current;

      if (closeButton && buttonStack) {
        const buttonStackRect = buttonStack.getBoundingClientRect();
        const buttonStackTop = buttonStackRect.top + window.scrollY;
        const buttonStackRight = buttonStackRect.right;

        // If button stack is above viewport, make it sticky at the top
        if (buttonStackRect.top < 0) {
          closeButton.style.position = 'fixed';
          closeButton.style.top = '20px';
          closeButton.style.left = `${buttonStackRight + 20}px`;
        } else {
          // Otherwise, position it aligned with the button stack
          closeButton.style.position = 'absolute';
          closeButton.style.top = `${buttonStackTop}px`;
          closeButton.style.left = `${buttonStackRight + window.scrollX + 20}px`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('click', countAccordions);
      darkModeMediaQuery.removeEventListener('change', themeChangeHandler);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const prevCount = prevOpenAccordionsRef.current;
    if (openAccordions === 2 && prevCount < 2) {
      const closeButton = document.getElementById('close-all-button');
      const buttonStack = buttonStackRef.current;

      if (closeButton && buttonStack) {
        const buttonStackRect = buttonStack.getBoundingClientRect();
        const buttonStackTop = buttonStackRect.top + window.scrollY;
        const buttonStackRight = buttonStackRect.right;

        closeButton.style.position = 'absolute';
        closeButton.style.top = `${buttonStackTop}px`;
        closeButton.style.left = `${buttonStackRight + window.scrollX + 20}px`;
        closeButton.style.opacity = '0';
        closeButton.style.height = buttonStackRect.height + 'px';

        setTimeout(() => {
          closeButton.style.opacity = '1';
        }, 400);
      }
    }
    prevOpenAccordionsRef.current = openAccordions;
  }, [openAccordions]);


  return (
    <DefaultLayout previewPixelSRC="null">
      <Grid>
        <Row>
          <Table>
            <TableColumn>
              <TableRow>
                <Avatar src="./1710766869672_black.jpeg" href='mailto:fbn.schllr@gmail.com' />
              </TableRow>
            </TableColumn>
            <TableColumn>
              <TableRow>
                <h1>Fabian Alexander Schuller</h1>
              </TableRow>
            </TableColumn>
          </Table>
          <Text>Student of Mathematics & Computer Science.</Text>
        </Row>
        <Row>
          <div ref={buttonStackRef}>
            <ButtonStack>
              <Button onClick={() => window.open(cv_link)}>
                Download CV
              </Button>
              <Button onClick={() => window.open('https://github.com/fabsch225')}>
                GitHub
              </Button>
              <Button onClick={() => window.open('https://www.linkedin.com/in/fabian-schuller/')}>
                LinkedIn
              </Button>
            </ButtonStack>
          </div>
        </Row>
        <Row><br /><Text>Below there are hobbyist and academic programming projects I undertook during secondary school and uni. For professional experience, please refer to my CV.</Text></Row>
      </Grid>
      <Grid>
        {openAccordions >= 2 && (
          <Button
            id="close-all-button"
            theme={"SECONDARY"}
            onClick={closeAllAccordions}
            style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              fontSize: '0.8em',
              padding: '0.5em 1em',
              zIndex: 1000,
              width: 'fit-content',
              opacity: 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            Close All
          </Button>
        )}
        <Accordion title="SQLite Clone">
          <ProjectCard
            title="SQLite Clone"
            githubLink="https://github.com/fabsch225/rustql"
          >
            <p>During a Course on Databases, I got interested in the "internals" of
              relational databases, like query-planning and
              transaction-management. Therefore I started implementing a
              rudimentary SQLite-clone in Rust. The database supports CRUD queries
              and transactions, indices, views and permanent storage on disk. The architecture is strongly inspired by SQLite, for example
              the database is stored in a single file, and the schema is stored in a system-table. <br />
              Components:</p>
            <br />
            <CodeBlock>
              {`IO in/out
Parser -> Planner -> Executor
Dataframe
Cursor -> B-Tree
PagerFrontend <-> PagerAccessor <-> PagerCore
File on Disk`}
            </CodeBlock>
            <br />
            The project is still in development and can be found on GitHub.
          </ProjectCard>
        </Accordion>
        <Accordion title="3D Graphics Engine">
          <ProjectCard
            title="3D Graphics Engine"
            githubLink="https://github.com/fabsch225/rust3d"
          >
            This is a CPU-based graphics engine in memory-safe Rust. It supports
            both rasterization and raymarching. It is programmed in a modular
            way and is object oriented. One can load 3D models from .obj files
            and apply textures to them. Both multithreaded rendering and
            rendering at a fixed framerate is supported. The project is still
            in development and can be found on GitHub.
          </ProjectCard>
        </Accordion>

        <Accordion title="Chess Engine">
          <ProjectCard
            title="Chess Engine"
            githubLink="https://github.com/fabsch225/Wombat"
          >
            This is a Chess Engine written in C++. It uses a bitboard
            representation and a negamax search with alpha-beta pruning.
            The engine also implements quiescence search, iterative deepening,
            transposition tables and a simple evaluation function. The project is still
            in development and can be found on GitHub, under the name "Wombat".
            <a href="https://de.wikipedia.org/wiki/Wombats">Wombats</a> are really cute animals, and i
            imagine them to be pretty good at chess.
          </ProjectCard>
        </Accordion>

        <Accordion title="Unity: Visualizing Architectural Plans">
          <ProjectCard
            title="Architecture in VR"
            CarouselKey="unity-vr"
          >
            The goal of the project is to visualize architectural plans in
            Virtual Reality. Instead of implementing an API to "real"
            architectural software, the project uses a web-editor to create the
            plans. The tech-stack consists of Unity Engine and Nuxt. Nuxt both
            serves as the web-editor and the backend. The plans are loaded using
            a REST-API, and a websocket is used to communicate updates to the
            unity-client, so changes are reflected in real-time. Some
            gamification is implemented, for example procedurally generated
            labyrinths and collectible coins. The project is meant as a proof of
            concept for VR / external interaction and was developed with fellow
            students for uni.
          </ProjectCard>
        </Accordion>

        <Accordion title="Javascript Visualizer">
          <ProjectCard
            title="Javascript Visualizer"
            demoLink="https://fabsch225.github.io/Nassi-Shneiderman-Compiler/"
            CarouselKey="js-nsd"
          >
            This is a tool which takes in JS, and then creates a Nassi
            Shneiderman Diagram based on the Source-Code. The functionality is
            limited to basic syntax, for example object-oriented js is not
            supported.
          </ProjectCard>
        </Accordion>

        <Accordion title="Leela Chess 0 Microservice">
          <ProjectCard
            title="LeelaDocker"
            githubLink="https://github.com/fabsch225/ldocker"
            CarouselKey="lc0-docker"
          >
            This is a Docker Image, which runs Google's Lc0 Chess Engine. It
            exposes a Websocket to access the Chess-Engine using the Universal Chess Interface. A Loadbalancer is
            not included. A Nvidia GPU with PCI Passthrough is required to run the Docker Image. WSL2 works also.
          </ProjectCard>
        </Accordion>

        <Accordion title="Curve25519">
          <ProjectCard
            title="Curve25519 Implementation (ECDH, Java)"
            githubLink="https://gist.github.com/fabsch225/a68ffebfa4e278be0eb6f721a7a6c37e"
            CarouselKey="ecdh-curve25519"
          >
            I implemented the Curve25519 Elliptic Curve in Java, following a <a href="https://martin.kleppmann.com/papers/curve25519.pdf">tutorial-paper</a> by Martin Kleppmann.
            In a seminar, i presented a mathematical proof of the correctness of the procedure (Associativity of the Group Law). The implementation supports the ECDH key-exchange and encryption.
            The seminar-paper (in German) can be found <a href="https://www.dropbox.com/scl/fi/dj23bairk36xifb5n136n/Seminar_Thesis_ECC.pdf?rlkey=8j6kxokit980vxwe2kvz8hjbh&dl=0">here</a>.
          </ProjectCard>
        </Accordion>

        <Accordion title="Oauth Client from Scratch">
          <ProjectCard
            title="Oauth Client"
            githubLink="https://github.com/fabsch225/OAuth-Client-in-GO"
            CarouselKey="oauth"
          >
            This is a simple Oauth Client in written Go. This was a demonstration for an accompanying <a href="https://www.dropbox.com/scl/fi/xy7twfo5k2jzq3ix7brm4/Oauth-2.pdf?rlkey=w401s2anw4hu7d0zwws48u9dm&dl=0">seminar presentation</a> on the OAuth2.0 Protocol. I followed a microservice architecture, in so far as
            we seperate the buisness logic and the interface to an identity server (for example Authentik).
            In the repo, an example setup is included using Docker Compose.
            As per the microservice architecture, there are 3 components: Authentik, the Oauth client,
            and a generic note-taking app.
          </ProjectCard>
        </Accordion>

        <Accordion title="Advent of Code">
          <ProjectCard
            title="Advent of Code"
            CarouselKey="aoc"
          >
            <p>
              The <a href="https://adventofcode.com/">Advent of Code</a> is an annual event where participants solve programming puzzles.
              So far, i have participated in the years 2023 and 2024 and 2025. I did some experiments with the Challenges from 2022 also.
            </p>
          </ProjectCard>
        </Accordion>

        <Accordion title="Advent of Code 2022 in APL" tabbed={true}>
          <ProjectCard
            title="Advent of Code 2022 in APL"
            CarouselKey="aoc2022"
          >
            In 2022, I participated in the <a href="https://adventofcode.com/2022">Advent of Code</a>.
            I used <a href="https://en.wikipedia.org/wiki/APL_(programming_language)">APL (A Programming Language)</a> to solve the puzzles from Day 1 to 7.
          </ProjectCard>
        </Accordion>

        <Accordion title="Advent of Code 2023" tabbed={true}>
          <ProjectCard
            title="Advent of Code 2023: Trying new Languages"
            CarouselKey="aoc2023"
          >
            In 2023, I participated in the <a href="https://adventofcode.com/2023">Advent of Code</a>.
            The goal was to use a different language for each day.
            This proved too time consuming, and I only made it to Day 10.
          </ProjectCard>
        </Accordion>

        <Accordion title="Advent of Code 2024 in C++" tabbed={true}>
          <ProjectCard
            title="Advent of Code 2024 C++"
            githubLink="https://github.com/fabsch225/AOC24"
            CarouselKey="aoc2024"
          >
            This is my complete solution to the <a href="https://adventofcode.com/2024">Advent of Code 2024</a> in C++.
            The code is written in a functional style, using the STL and some custom algorithms.
          </ProjectCard>
        </Accordion>

        <Accordion title="Advent of Code 2025" tabbed={true}>
          <ProjectCard
            title="Advent of Code 2025"
            CarouselKey="aoc2025"
            githubLink="https://github.com/fabsch225/advent-2025"
          >
            In 2025, I participated in the <a href="https://adventofcode.com/2025">Advent of Code</a>.
            I used only functional programming languages to solve the puzzles. This Year, there were only 12 Days of Challenges.
          </ProjectCard>
        </Accordion>

        <Accordion title="Video Games">
          <ProjectCard
            title="Video Games"
            CarouselKey="video-games"
          >
            Mainly in Secondary School, i developed some Video Games. Some of them are presented here.
          </ProjectCard>
        </Accordion>


        <Accordion title="Overnight Odyssey" tabbed={true}>
          <ProjectCard
            title="Overnight Odyssey"
            githubLink="https://github.com/fabsch225/ds2d"
            demoLink="https://fabsch225.itch.io/overnight-odyssey"
            CarouselKey="video-games-ds2d"
          >
            <p>Overnight Odyssey is a 2D adventure game inspired by Dark Souls. The
              player fights various monsters and can customize their character.
              The Game can be finished in 3-4 hours (therefore the name), but is
              rather difficult. It runs on Windows, Linux and Mac, as well as in
              the browser.</p><br />

            <iframe frameBorder="0" src="https://itch.io/embed/1429619" width="552" height="167"><a href="https://fabsch225.itch.io/overnight-odyssey">Overnight Odyssey by fabsch225</a></iframe>
          </ProjectCard>
        </Accordion>

        <Accordion title="Project Extinction" tabbed={true}>
          <ProjectCard
            title="Project Extinction"
            demoLink="https://fabsch225.itch.io/project-exctinction"
            CarouselKey="video-games-doom"
          >
            <p>This is a doom-clone, set in a zombie apocalypse. It can be finished
              in an hour.</p> <br />

            <iframe frameBorder="0" src="https://itch.io/embed/2089147" width="552" height="167"><a href="https://fabsch225.itch.io/project-exctinction">Project Exctinction by fabsch225</a></iframe>
          </ProjectCard>
        </Accordion>

        <Accordion title="HNoir" tabbed={true}>
          <ProjectCard
            title="HNoir"
            CarouselKey="video-games-hnoir"
          >
            This is a Topdown-Shooter / Detective Game inspired by Hotline Miami.
          </ProjectCard>
        </Accordion>

        <Accordion title="Others" tabbed={true}>
          <ProjectCard
            title="Others"
            CarouselKey="video-games-others"
          >
            <p>Other (earlier) Games include Clones of</p>
            <ul>
              <li>Asteroids</li>
              <li>Space Invaders</li>
              <li>Flappy Bird</li>
              <li>2048</li>
              <li>Pacman</li>
              <li><a href="https://play.google.com/store/apps/details?id=com.ChillyRoom.DungeonShooter&hl=en">Soul Knight</a></li>
              <li>Geometry Dash</li>
            </ul>
            <p>I used technology like Pygame, p5.js, p5 (java) and the Godot game engine</p>
          </ProjectCard>
        </Accordion>
      </Grid>
    </DefaultLayout>
  );
}